#!/usr/bin/env node

/**
 * Add n8n Healer error monitoring to all workflow packages
 *
 * This script:
 * 1. Extracts each workflow package
 * 2. Adds healer error monitoring nodes if not present
 * 3. Re-packages the workflow
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATALOG_DIR = path.join(__dirname, '../gumroad-catalog');
const TEMP_DIR = path.join(__dirname, '../temp-workflow-extract');

// Healer error monitoring nodes template
const HEALER_NODES = {
  errorTrigger: {
    parameters: {},
    id: "error-trigger-healer",
    name: "Error Trigger",
    type: "n8n-nodes-base.errorTrigger",
    typeVersion: 1,
    position: [240, 500]
  },
  sendToHealer: {
    parameters: {
      method: "POST",
      url: "https://n8n-healer.gentic.pro/webhook/error/{{CLIENT_ID}}",
      sendHeaders: true,
      headerParameters: {
        parameters: [
          {
            name: "Content-Type",
            value: "application/json"
          }
        ]
      },
      sendBody: true,
      bodyParameters: {
        parameters: [
          {
            name: "workflow_id",
            value: "={{ $workflow.id }}"
          },
          {
            name: "workflow_name",
            value: "={{ $workflow.name }}"
          },
          {
            name: "execution_id",
            value: "={{ $execution.id }}"
          },
          {
            name: "error_message",
            value: "={{ $json.error.message }}"
          },
          {
            name: "error_node",
            value: "={{ $json.error.node.name }}"
          },
          {
            name: "timestamp",
            value: "={{ $now.toISO() }}"
          }
        ]
      },
      options: {}
    },
    id: "send-error-to-healer",
    name: "Send Error to Healer",
    type: "n8n-nodes-base.httpRequest",
    typeVersion: 4,
    position: [460, 500]
  },
  logLocally: {
    parameters: {
      jsCode: `// Log error locally for debugging
const error = $json.error || {};
console.log('[ERROR]', {
  workflow: $workflow.name,
  execution: $execution.id,
  message: error.message,
  node: error.node?.name,
  timestamp: new Date().toISOString()
});

return { json: { logged: true } };`
    },
    id: "log-error-locally",
    name: "Log Error Locally",
    type: "n8n-nodes-base.code",
    typeVersion: 2,
    position: [680, 500]
  }
};

const HEALER_CONNECTIONS = {
  "Error Trigger": {
    main: [[{
      node: "Send Error to Healer",
      type: "main",
      index: 0
    }]]
  },
  "Send Error to Healer": {
    main: [[{
      node: "Log Error Locally",
      type: "main",
      index: 0
    }]]
  }
};

function hasHealerIntegration(workflow) {
  return workflow.nodes.some(node =>
    node.name === "Send Error to Healer" ||
    node.id === "send-error-to-healer"
  );
}

function addHealerToWorkflow(workflow) {
  if (hasHealerIntegration(workflow)) {
    console.log('  ✓ Healer already integrated');
    return { modified: false, workflow };
  }

  console.log('  + Adding healer error monitoring...');

  // Add healer nodes
  workflow.nodes.push(HEALER_NODES.errorTrigger);
  workflow.nodes.push(HEALER_NODES.sendToHealer);
  workflow.nodes.push(HEALER_NODES.logLocally);

  // Add connections
  workflow.connections = {
    ...workflow.connections,
    ...HEALER_CONNECTIONS
  };

  return { modified: true, workflow };
}

async function processWorkflowPackage(zipPath) {
  const zipName = path.basename(zipPath, '.zip');
  console.log(`\n📦 Processing: ${zipName}`);

  const extractDir = path.join(TEMP_DIR, zipName);

  // Clean temp dir
  if (fs.existsSync(extractDir)) {
    fs.rmSync(extractDir, { recursive: true });
  }
  fs.mkdirSync(extractDir, { recursive: true });

  try {
    // Extract zip
    console.log('  Extracting...');
    await execAsync(`powershell -command "Expand-Archive -Path '${zipPath}' -DestinationPath '${extractDir}' -Force"`);

    // Find workflow.json (search recursively)
    function findWorkflowJson(dir) {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          const found = findWorkflowJson(fullPath);
          if (found) return found;
        } else if (file === 'workflow.json') {
          return fullPath;
        }
      }
      return null;
    }

    const workflowPath = findWorkflowJson(extractDir);

    if (!workflowPath) {
      console.log('  ⚠️  No workflow JSON found, skipping');
      return { processed: false };
    }

    console.log(`  Found: ${path.relative(extractDir, workflowPath)}`);

    // Read and update workflow
    const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
    const { modified, workflow: updatedWorkflow } = addHealerToWorkflow(workflow);

    if (!modified) {
      return { processed: false };
    }

    // Write updated workflow
    fs.writeFileSync(workflowPath, JSON.stringify(updatedWorkflow, null, 2), 'utf8');

    // Re-create zip
    console.log('  Re-packaging...');
    const tempZip = path.join(TEMP_DIR, `${zipName}-updated.zip`);

    await execAsync(`powershell -command "Compress-Archive -Path '${extractDir}\\*' -DestinationPath '${tempZip}' -Force"`);

    // Replace original
    fs.copyFileSync(tempZip, zipPath);
    fs.unlinkSync(tempZip);

    console.log('  ✅ Updated successfully');
    return { processed: true, modified: true };

  } catch (error) {
    console.error(`  ❌ Error processing ${zipName}:`, error.message);
    return { processed: false, error: error.message };
  } finally {
    // Cleanup
    if (fs.existsSync(extractDir)) {
      fs.rmSync(extractDir, { recursive: true });
    }
  }
}

async function main() {
  console.log('🩺 n8n Healer Integration Script\n');

  // Create temp dir
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }

  // Get all zip files
  const zipFiles = fs.readdirSync(CATALOG_DIR)
    .filter(f => f.endsWith('.zip'))
    .map(f => path.join(CATALOG_DIR, f));

  console.log(`Found ${zipFiles.length} workflow packages\n`);

  let processed = 0;
  let modified = 0;
  let skipped = 0;
  let errors = 0;

  for (const zipPath of zipFiles) {
    const result = await processWorkflowPackage(zipPath);

    if (result.error) {
      errors++;
    } else if (result.modified) {
      modified++;
      processed++;
    } else if (result.processed === false) {
      skipped++;
    } else {
      processed++;
    }
  }

  // Cleanup temp dir
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true });
  }

  console.log(`\n✨ Complete!`);
  console.log(`   Modified: ${modified}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${zipFiles.length}`);
}

main();

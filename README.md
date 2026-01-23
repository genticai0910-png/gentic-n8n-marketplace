# Claude CLI MCP Integration

✅ **Status: Fully Functional**

Bidirectional MCP setup for Claude CLI - expose Claude as an MCP server and connect to other MCP servers.

## 🎯 What This Does

This project enables two-way MCP (Model Context Protocol) integration with Claude CLI:

1. **Claude CLI as MCP Server**: Other applications can call Claude programmatically
2. **Claude CLI as MCP Client**: Claude can use external tools (filesystem, git, databases, APIs)

## 🚀 Quick Start

```bash
# Setup (one time)
bash setup.sh

# Method 1: Command Line
claude --mcp-config mcp-config.json

# Method 2: Browser Access
npm run bridge
# Then open: http://localhost:8080

# Method 3: Claude Desktop
# See CLAUDE_DESKTOP_SETUP.md
```

## ✨ What's Working

**Three Integration Methods:**
- ✅ **Claude Desktop** - Native app integration
- ✅ **Browser Access** - WebSocket bridge with Web UI
- ✅ **Command Line** - Direct CLI usage

**MCP Capabilities:**
- ✅ Claude connects to filesystem MCP (13 tools)
- ✅ Claude connects to Brave Search MCP (2 tools)
- ✅ Claude connects to Git MCP
- ✅ Claude connects to SQLite MCP
- ✅ Your MCP server exposes 3 Claude tools to other apps
- ✅ WebSocket bridge for browser/remote access

## Architecture

This project provides:

1. **Claude CLI as MCP Server**: Exposes Claude CLI functionality via MCP protocol for other applications
2. **Claude CLI as MCP Client**: Connects Claude to external MCP servers (filesystem, git, search, etc.)

## Setup

### Prerequisites
- Node.js 18+ installed
- Claude CLI installed and authenticated
- Git (optional, for git MCP server)

### Installation

```bash
# Run the setup script
bash setup.sh

# Or manually:
npm install
chmod +x src/index.js
```

## Usage

### 1. Using Claude with External MCP Servers

Connect Claude CLI to filesystem, git, and other MCP servers:

```bash
claude --mcp-config mcp-config.json
```

Then in the interactive session, Claude will have access to:
- Filesystem operations via MCP
- Git operations via MCP
- SQLite database access
- Brave Search (if API key configured)

**Print mode example:**
```bash
claude --mcp-config mcp-config.json --print "List files in current directory using MCP"
```

### 2. Running Claude CLI as an MCP Server

Other MCP clients can connect to Claude CLI:

```bash
# Start the MCP server
npm start
```

Or configure it in your MCP client:

```json
{
  "mcpServers": {
    "claude-cli": {
      "command": "node",
      "args": ["c:/Users/jga07/Projects/auto-claude-demo/src/index.js"]
    }
  }
}
```

### 3. Available MCP Tools (when Claude CLI is MCP server)

When running as an MCP server, Claude CLI exposes:

- **claude_prompt**: Send prompts to Claude CLI
  ```json
  {
    "prompt": "Hello, Claude!",
    "model": "sonnet",
    "output_format": "text"
  }
  ```

- **claude_continue**: Continue the most recent conversation
  ```json
  {
    "prompt": "Tell me more about that"
  }
  ```

- **claude_session_info**: Get session information
  ```json
  {
    "action": "status"
  }
  ```

## Configuration Files

### mcp-config.json
Configuration for Claude CLI to connect to external MCP servers. Edit this to add/remove MCP servers or configure API keys.

**Example: Adding Brave Search API key**
```json
{
  "mcpServers": {
    "brave-search": {
      "env": {
        "BRAVE_API_KEY": "your-actual-api-key-here"
      }
    }
  }
}
```

### claude-mcp-client-config.json
Configuration for other MCP clients to connect to your Claude CLI MCP server.

## Testing

Run the test script:
```bash
bash test-mcp.sh
```

Or test manually:
```bash
# Test Claude with MCP
claude --mcp-config mcp-config.json --print "What tools do you have access to?"

# Test in interactive mode
claude --mcp-config mcp-config.json
```

## Tunnel Access (Optional)

To expose the MCP server over the network:

### Using ngrok
```bash
# Install ngrok
# Windows: choco install ngrok
# Mac: brew install ngrok

# Expose on port (MCP uses stdio, so you'd need a wrapper)
# This is more complex - MCP is designed for local stdio communication
```

### Alternative: SSH Tunnel
```bash
# On remote machine, create SSH tunnel to your local machine
ssh -L 8080:localhost:8080 user@your-machine
```

**Note**: MCP protocol uses stdio (stdin/stdout) by default, which is designed for local process communication. For remote access, you'd need to:
1. Wrap the MCP server with a WebSocket or HTTP server
2. Use SSH tunneling for secure remote access
3. Or use a service like VS Code Remote to run Claude CLI remotely

## Troubleshooting

### "claude: command not found"
Ensure Claude CLI is installed and in your PATH:
```bash
claude --version
```

### MCP server connection errors
Check that Node.js dependencies are installed:
```bash
npm install
```

### Permission denied on scripts
Make scripts executable:
```bash
chmod +x setup.sh test-mcp.sh src/index.js
```

## Project Structure

```
auto-claude-demo/
├── src/
│   └── index.js                      # MCP server implementation
├── mcp-config.json                   # MCP servers for Claude CLI to use
├── claude-mcp-client-config.json     # Config for clients to use Claude MCP server
├── package.json                      # Node.js dependencies
├── setup.sh                          # Setup script
├── test-mcp.sh                       # Test script
└── README.md                         # This file
```

## Advanced Usage

### Custom MCP Server
Add custom MCP servers to `mcp-config.json`:

```json
{
  "mcpServers": {
    "custom-server": {
      "command": "node",
      "args": ["path/to/your/server.js"],
      "env": {
        "CUSTOM_VAR": "value"
      }
    }
  }
}
```

### Multiple Configurations
Create environment-specific configs:

```bash
# Development
claude --mcp-config mcp-config.dev.json

# Production
claude --mcp-config mcp-config.prod.json
```

## Resources

- [MCP Specification](https://modelcontextprotocol.io)
- [Claude CLI Documentation](https://github.com/anthropics/claude-code)
- [MCP SDK](https://github.com/modelcontextprotocol/sdk)
- [Available MCP Servers](https://github.com/modelcontextprotocol/servers)

## License

MIT

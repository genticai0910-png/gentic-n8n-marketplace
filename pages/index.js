import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Gentic n8n Deals - Automate Your Revenue</title>
        <meta name="description" content="Production-Ready n8n Automations from Gentic AI. 50% Off Bundles – Start Today." />
      </Head>
      <div className="min-h-screen bg-white">
        <header className="bg-blue-600 text-white py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Gentic n8n Deals</h1>
            <p className="mt-2">Automate Your Business Revenue – 50% Off n8n Suite Today</p>
            <div className="mt-4 space-x-4">
              <a href="https://genticai.gumroad.com/l/qkfjwk?offer_code=GENTIC50" className="bg-white text-blue-600 px-6 py-2 rounded font-semibold">Grab 50% Off ($48.50)</a>
              <a href="https://genticai.gumroad.com/l/ai-lead-capture-os?offer_code=GENTIC20" className="bg-transparent border-2 border-white text-white px-6 py-2 rounded font-semibold">20% Off Lead OS ($39.20)</a>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Production-Ready n8n Automations</h2>
            <p className="text-xl text-gray-600">AI-Powered templates from Gentic. Battle-tested workflows. Import, configure, deploy in minutes.</p>
            <div className="grid md:grid-cols-3 gap-8 mt-8 text-center">
              <div><strong>20+</strong> Ready Templates</div>
              <div><strong>100+</strong> Hours Saved</div>
              <div><strong>$1,170</strong> Total Value</div>
            </div>
          </section>

          <section className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Why Gentic Templates?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>⚡ Production-Ready: Battle-tested in real environments.</div>
              <div>📦 Import & Deploy: Minutes, not hours.</div>
              <div>📚 Full Docs: Setup guides + troubleshooting.</div>
              <div>🔄 Free Updates: Lifetime access to improvements.</div>
              <div>🛡️ Secure: Best practices, no hardcoded creds.</div>
              <div>💬 Support: Email + Discord community.</div>
            </div>
          </section>

          <section className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Featured Deals</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border p-4 rounded">
                <h4>📅 Appointment Scheduler</h4>
                <p>Automate bookings end-to-end.</p>
                <a href="https://genticai.gumroad.com/l/uqgtp" className="text-blue-600">$12</a>
              </div>
              <div className="border p-4 rounded">
                <h4>✍️ Mortgage Content System</h4>
                <p>90 days of social media strategy.</p>
                <a href="https://genticai.gumroad.com/l/owwqvf" className="text-blue-600">$77</a>
              </div>
              <div className="border p-4 rounded">
                <h4>✍️ Restaurant Content Pack</h4>
                <p>60 days of posts + scripts.</p>
                <a href="https://genticai.gumroad.com/l/tultrw" className="text-blue-600">$37</a>
              </div>
              {/* Add more as needed */}
              <div className="border p-4 rounded md:col-span-3">
                <h4>Limited: n8n Automation Suite (50% Off)</h4>
                <p>Full lead-to-close system + 2 weeks support.</p>
                <a href="https://genticai.gumroad.com/l/qkfjwk?offer_code=GENTIC50" className="bg-blue-600 text-white px-4 py-2 rounded">$48.50 (Save $48.50)</a>
              </div>
            </div>
          </section>

          <section className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">About Gentic</h3>
            <p>AI-Powered Insights for Your Business. Specializing in n8n automations that save hundreds of hours.</p>
            <div className="grid md:grid-cols-3 gap-8 mt-8 text-center">
              <div><strong>20+</strong> Templates</div>
              <div><strong>100%</strong> Production Ready</div>
              <div><strong>2 Weeks</strong> Support</div>
            </div>
          </section>

          <footer className="bg-gray-100 py-6 text-center">
            <p>&copy; 2026 Gentic AI. Powered by OpenClaw.</p>
          </footer>
        </main>
      </div>
    </>
  );
}


function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-green-700">
            🇧🇩 ShebaGuide BD
          </h1>

          <span className="text-sm text-slate-500">আপনার সেবা, সহজ বাংলায়</span>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-green-600">
          AI-Powered Citizen Service Navigator
        </p>

        <h2 className="text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
          সরকারি সেবা খুঁজুন
          <span className="block text-green-600">সহজ বাংলায়</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          আপনার প্রয়োজনীয় সরকারি সেবা, প্রয়োজনীয় কাগজপত্র এবং করণীয় ধাপ AI-এর
          মাধ্যমে সহজভাবে জানুন।
        </p>

        <div className="mx-auto mt-10 flex max-w-2xl overflow-hidden rounded-2xl border bg-white shadow-lg">
          <input
            type="text"
            placeholder="যেমন: আমার জন্ম নিবন্ধনে নাম ভুল..."
            className="flex-1 px-5 py-4 outline-none"
          />

          <button className="bg-green-600 px-7 py-4 font-semibold text-white hover:bg-green-700">
            Ask AI
          </button>
        </div>

        <div className="mt-12">
          <h3 className="mb-5 text-xl font-bold text-slate-800">
            জনপ্রিয় সেবা
          </h3>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              "🪪 NID",
              "📜 জন্ম নিবন্ধন",
              "🛂 Passport",
              "🚗 Driving Licence",
              "🎓 Education",
              "🏠 Local Services",
            ].map((service) => (
              <button
                key={service}
                className="rounded-xl border bg-white p-5 text-left font-medium shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

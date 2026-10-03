import { useState } from "react";
import { askAI } from "../services/aiApi";

function Home() {
  const [message, setMessage] = useState("");
  const [guide, setGuide] = useState(null);
  const [classification, setClassification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAskAI = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      setError("");
      setGuide(null);
      setClassification(null);

      const data = await askAI(message);

      setClassification(data.classification);
      setGuide(data.guide);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-green-700">
            🇧🇩 ShebaGuide BD
          </h1>

          <span className="text-sm text-slate-500">আপনার সেবা, সহজ বাংলায়</span>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-20">
        {/* Hero */}
        <div className="text-center">
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

          {/* Search */}
          <div className="margin-top-6 flex justify-center gap-4">
            <a
              href="/services"
              className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-green-50 hover:text-green-700 bold"
            >
              সকল সেবা
            </a>
          </div>
          <div className="mx-auto mt-10 flex max-w-2xl overflow-hidden rounded-2xl border bg-white shadow-lg">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAskAI();
                }
              }}
              placeholder="যেমন: আমার জন্ম নিবন্ধনে নাম ভুল..."
              className="flex-1 px-5 py-4 outline-none"
            />

            <button
              onClick={handleAskAI}
              disabled={loading}
              className="bg-green-600 px-7 py-4 font-semibold text-white hover:bg-green-700 disabled:bg-green-300"
            >
              {loading ? "বিশ্লেষণ হচ্ছে..." : "Ask AI"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-auto mt-6 max-w-3xl rounded-xl bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Classification */}
        {classification && (
          <div className="mx-auto mt-6 max-w-3xl rounded-xl bg-blue-50 p-4 text-blue-700">
            <h3 className="mb-2 font-semibold">AI Classification:</h3>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(classification, null, 2)}
            </pre>
          </div>
        )}

        {/* Guide */}
        {guide && (
          <div className="mx-auto mt-6 max-w-3xl space-y-5">
            {/* Main */}
            <div className="rounded-2xl border bg-white p-7 shadow-sm">
              <div className="mb-5">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Verified Service Guide
                </span>

                <h3 className="mt-4 text-2xl font-bold text-slate-900">
                  {guide.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {guide.explanation}
                </p>
              </div>
            </div>

            {/* Documents */}
            {guide.documents?.length > 0 && (
              <div className="rounded-2xl border bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">
                  📋 প্রয়োজনীয় তথ্য / কাগজপত্র
                </h3>

                <ul className="mt-4 space-y-3">
                  {guide.documents.map((document, index) => (
                    <li key={index} className="flex gap-3 text-slate-700">
                      <span className="text-green-600">✓</span>
                      {document}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps */}
            {guide.steps?.length > 0 && (
              <div className="rounded-2xl border bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">
                  📝 কীভাবে করবেন
                </h3>

                <div className="mt-5 space-y-4">
                  {guide.steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white">
                        {index + 1}
                      </div>

                      <p className="pt-1 leading-6 text-slate-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Sources */}
            {guide.officialLinks?.length > 0 && (
              <div className="rounded-2xl border bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">
                  🔗 Official Sources
                </h3>

                <div className="mt-4 space-y-3">
                  {guide.officialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl bg-green-50 p-4 font-medium text-green-700 hover:bg-green-100"
                    >
                      {link.title} ↗
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="rounded-xl bg-amber-50 p-5 text-sm leading-6 text-amber-800">
              ⚠️ {guide.disclaimer}
            </div>
          </div>
        )}

        {/* Popular Services */}
        {!guide && (
          <div className="mt-16">
            <h3 className="mb-5 text-center text-xl font-bold text-slate-800">
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
                  onClick={() => setMessage(service)}
                  className="rounded-xl border bg-white p-5 text-left font-medium shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;

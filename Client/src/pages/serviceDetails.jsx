import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setService(data.service);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-10 text-center">
        তথ্য লোড হচ্ছে...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 p-10 text-center">
        <h1 className="text-2xl font-bold">সেবা পাওয়া যায়নি</h1>

        <button
          onClick={() => navigate("/services")}
          className="mt-5 rounded-lg bg-green-600 px-5 py-3 text-white"
        >
          সকল সেবা দেখুন
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => navigate("/services")}
          className="mb-6 text-green-600"
        >
          ← সকল সেবা
        </button>

        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            {service.category}
          </span>

          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            {service.nameBn}
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            {service.descriptionBn}
          </p>

          <button
            onClick={() =>
              navigate(`/?question=${encodeURIComponent(service.nameBn)}`)
            }
            className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            🤖 এই সেবা সম্পর্কে AI-কে জিজ্ঞেস করুন
          </button>
        </div>

        <div className="mt-8 space-y-6">
          {service.subServices?.map((subService) => (
            <div
              key={subService.id}
              className="rounded-2xl border bg-white p-7 shadow-sm"
            >
              <h2 className="text-2xl font-bold">{subService.nameBn}</h2>

              {subService.documents?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold">📋 প্রয়োজনীয় কাগজপত্র</h3>

                  <ul className="mt-3 space-y-2">
                    {subService.documents.map((document, index) => (
                      <li key={index} className="flex gap-2 text-slate-700">
                        <span className="text-green-600">✓</span>
                        {document}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {subService.steps?.length > 0 && (
                <div className="mt-7">
                  <h3 className="text-lg font-bold">📝 কীভাবে করবেন</h3>

                  <div className="mt-4 space-y-4">
                    {subService.steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                          {index + 1}
                        </div>

                        <p className="leading-6 text-slate-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {subService.officialLinks?.length > 0 && (
                <div className="mt-7">
                  <h3 className="text-lg font-bold">🔗 Official Sources</h3>

                  <div className="mt-3 space-y-2">
                    {subService.officialLinks.map((link, index) => (
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

              {subService.verification && (
                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  <span className="font-semibold text-green-700">
                    ✓ Verified Source
                  </span>
                  <br />
                  তথ্যের উৎস: {subService.verification.source}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;

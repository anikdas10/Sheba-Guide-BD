import { useEffect, useMemo, useState } from "react";

function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    return ["all", ...new Set(services.map((service) => service.category))];
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.nameBn.toLowerCase().includes(search.toLowerCase()) ||
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.descriptionBn.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || service.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [services, search, category]);

  if (loading) {
    return <div className="p-10 text-center">সেবাগুলো লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-semibold text-green-600">ShebaGuide BD</p>

          <h1 className="mt-2 text-4xl font-bold">সরকারি সেবা</h1>

          <p className="mt-4 text-slate-600">
            প্রয়োজনীয় সরকারি সেবা সহজ বাংলায় খুঁজে নিন।
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="সেবা খুঁজুন... যেমন NID, পাসপোর্ট"
            className="w-full rounded-xl border bg-white px-5 py-4 outline-none focus:border-green-500"
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2 text-sm font-medium ${
                category === item
                  ? "bg-green-600 text-white"
                  : "bg-white text-slate-700 border"
              }`}
            >
              {item === "all" ? "সবগুলো" : item}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                {service.category}
              </span>

              <h2 className="mt-4 text-xl font-bold">{service.nameBn}</h2>

              <p className="mt-3 leading-6 text-slate-600">
                {service.descriptionBn}
              </p>

              <a
                href={`/services/${service.id}`}
                className="mt-5 inline-block font-semibold text-green-600"
              >
                বিস্তারিত দেখুন →
              </a>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="mt-12 text-center text-slate-500">
            কোনো সেবা পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;

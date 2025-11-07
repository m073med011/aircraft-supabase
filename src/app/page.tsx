"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

export default function Home() {
  const { t } = useLanguage();

  const featuredArticles = [
    {
      title: "The Future of Hypersonic Missiles",
      category: "Analysis",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZK8G3E0MRePPPAbCHOcMBX_n0wFmuCCzMRWFqpdYEYrYmMqz2PYeGiL9C0IvoZ2TKNhCKnv0z7xzItkz2-D179S6i-_FCqFpWiHhKCXMwqHYIcvAY2vJ9eFulgDH9w8kIcC7OnQDlevOICbE5kQQF-8sicDRGrkrTBbaWlaMEzi_LgK5Ro1K8OVHVaiw8uZtfsQk14K2lhaD55vR-5Kmgts78Ml282U_sIt-wMSVGrkzD5ANGxTV2mhUYEzdk7NAAIwsr44lh-24",
      link: "/weapons",
    },
    {
      title: "Inside the Next-Gen Stealth Drone Program",
      category: "Aerospace",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCoxCc4B_TxRgdbCkEFrFd53bpSf3aAmu3Qy1-W_s6DNSj_T51BnLKiSGsdc9PqrypmxlD3nO2MfuEBK747JJM-TqmpKotsVACceILDsKbTFErNArpbAMVDAIqbuZx4Z9n5P8CLzZKYo9lsz_iWCs4s9JmHCmbnFlTri4AQVxkPZx27Zm8oTBsWQk1F4LatYDe8ZVB1nUwV2aDdpg03CZmcJVQiz1XGG0FH3McXq-2FyA1MczFtd93Id0Qj5dn-f22wWjyxEUoYnUM",
      link: "/weapons",
    },
    {
      title: "Advancements in Naval Warfare Technology",
      category: "Naval",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDwnPZI8mfmDHawP8ei6zG5s11UoFtDA8VMn_G0e6n7E6KiMV346uVmxQnDeTALJ-jLseOn8IKmIh2L5w0zhgxyeKYCYBOr9i5JYxFEJ7N6U6KTouFV6MYNrO_NigAU1K3dU3r5HH6XOtgLEbtpNWOI3BIj0K_TfeflC0f5pPZo-1AkBwKz0_vRkxcMPzjkbf5U9HWhOiDjtgRSicKdgupSI6uhVwazjK25qa_1743GydwSCfDXOPRAhL4eLqw17crxqbpu2eTAfJo",
      link: "/armies",
    },
    {
      title: "Cyber Defense: The New Frontline",
      category: "Cybersecurity",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDGKfShXsH9ktDArOPhYyAABjt7dKPsxQ4yURIGlZYuvRnzx1fwPqR-m6RLbGHrod-ndizwN24JtQvpqMJQG3RlQUd334AVtHloT_4WpV68wyHPd1T_oYn_Mpa4zgtbQ9USAnhnSVBbybofCJqqTmxpkcHtNGe57GV8luCcyCOw5lM_sujesKtXLjrI-mPuUHYgQvleoF2GoRgLrdT71Q2V3osAl3xvk0_3SoI0Bvrei_Iw8XFhkyTkPyU5T9SCsNGXGICT8pLdXx0",
      link: "/countries",
    },
  ];

  return (
    <div className="flex flex-col font-display bg-def-black min-h-screen text-def-off-white">
      <div className="max-w-[1280px] mx-auto w-full">
      {/* Hero Section */}
      <div className="@container mt-5">
        <div className="@[480px]:p-4">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.2) 0%, rgba(10, 10, 10, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAyXVqBbg6bWcVkTQcpy_9m-fgzZsC6srjYytX_nnxKxGqVdvtX5pZujGZ5MXmAYJh5bO1e6RHVR6VReXy1PoPU3WB7VenrXWdkdIGWBi0wi4DikNbLSfUP22J1a-LImJTQQ789eZz98AdfyoHl4Vuau613WEqZ5qpfqyU6OKCJvSWimsoZPHdtd9cl8dGZWfHzeRYWOQ1ZxFelE5ZfTtBXVXRptcwSAhc6Nscaw1zJ6l0zQ9aRsw1XHiw0kqj3cDg9XkqrqlFc9JI")`,
            }}
          >
            <div className="flex flex-col gap-2 text-left max-w-2xl">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                {t.home.title ||
                  "Pioneering the Future of Defense Innovation"}
              </h1>
              <h2 className="text-def-off-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                {t.home.subtitle ||
                  "Your definitive source for defense technology analysis."}
              </h2>
            </div>
            <Link href="/weapons">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-def-green text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-opacity-80 transition-all">
                <span className="truncate">
                  {t.home.exploreCountries || "Explore Articles"}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">
        Featured Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {featuredArticles.map((article, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 pb-3 group cursor-pointer"
          >
            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url("${article.image}")` }}
              />
            </div>
            <div className="px-1">
              <p className="text-white text-base font-medium leading-normal">
                {article.title}
              </p>
              <p className="text-def-gray-mid text-sm font-normal leading-normal">
                {article.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Explore the Arsenal */}
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">
        Explore the Arsenal
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        <div className="flex flex-col items-center text-center p-6 bg-def-gray-dark rounded-xl border border-def-gray-mid/30 hover:bg-def-gray-mid/20 transition-colors">
          <span className="material-symbols-outlined text-4xl text-def-green mb-4">
            flight
          </span>
          <h3 className="text-white text-lg font-bold">Aircraft</h3>
          <p className="text-def-off-white text-sm mt-2">
            Explore the latest in aerospace technology, from stealth fighters to
            unmanned aerial vehicles.
          </p>
        </div>
        <Link href="/weapons">
          <div className="flex flex-col items-center text-center p-6 bg-def-gray-dark rounded-xl border border-def-gray-mid/30 hover:bg-def-gray-mid/20 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-4xl text-def-green mb-4">
              rocket_launch
            </span>
            <h3 className="text-white text-lg font-bold">Weapons</h3>
            <p className="text-def-off-white text-sm mt-2">
              Delve into the engineering behind modern armaments and advanced
              weapons systems.
            </p>
          </div>
        </Link>
        <div className="flex flex-col items-center text-center p-6 bg-def-gray-dark rounded-xl border border-def-gray-mid/30 hover:bg-def-gray-mid/20 transition-colors">
          <span className="material-symbols-outlined text-4xl text-def-green mb-4">
            satellite_alt
          </span>
          <h3 className="text-white text-lg font-bold">Defense Tech</h3>
          <p className="text-def-off-white text-sm mt-2">
            Discover cutting-edge defense systems, electronics, and cyber
            warfare capabilities.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

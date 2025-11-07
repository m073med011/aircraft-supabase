"use client";

export default function ArticlesPage() {
  const article = {
    category: "Aerial Combat",
    title:
      "The Future of Aerial Combat: Analyzing the F-35 Lightning II's Dominance",
    subtitle:
      "An in-depth look at the technology, strategy, and capabilities of the world's most advanced multirole fighter.",
    author: {
      name: "Alex Carter",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBsJpJifKAfMH91Vf7g56742lEupxsz169kPc2AzxmbelKz_YlqPIe2Fv9m-xI6kteNK7fop11tHVAIX05Cn3OV6l_WpisTAgfrnYclYX0sMjMo7viqkfjQu1b1PUCK5oYAMOsfKVb6OFqw1jeV_PoLg8_0lgk-eiEW8wsEOCA6SYq_Jvk7A3wr4xTSJlJ2LeyBPQn8x09ACkZ8-LqkP6nuACcfSnG63YT_iWw0z4SouoN8wJ-PdTtM3dPwLha0NLQ7EywM4oJvqPs",
    },
    date: "October 26, 2023",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhYDbQtYCFoKl5QI9LhNYecb4RsCbfSg4zC8l87KW-inGo67Kyx0OHv_BFNOcTmZJRfuwrZuvLp2c5nWp8mvR5BMZ-_4eAoU1Z2bQwwRXFPUsDvjv229Gw5aa2vngdPdjjZ4695P_UTx6zqg-9cjSXHIcEYRWjJhzVPeuBiax_OJL45JBvG58GTsDdFkISEXMVu_-NhJB3aQpwX-e7PTjY-smam_-PLBFm_cZyE8NlVkX0DSceq776fbRoJc3aeOw0TsYlz72wDa8",
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#0A0A0A] text-[#EAEAEA] font-display overflow-x-hidden">
      <main className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <article>
              <div
                className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-[400px]"
                style={{
                  backgroundImage: `url("${article.image}")`,
                }}
              ></div>
              <header className="flex flex-col gap-4 py-8">
                <p className="text-[#5bec13] text-sm font-bold uppercase tracking-wider">
                  {article.category}
                </p>
                <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                  {article.title}
                </h1>
                <p className="text-[#a6b99d] text-lg font-normal leading-normal">
                  {article.subtitle}
                </p>
              </header>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-gunmetal-light py-4">
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12"
                    style={{
                      backgroundImage: `url("${article.author.image}")`,
                    }}
                  ></div>
                  <p className="text-white text-base font-medium leading-normal flex-1 truncate">
                    {article.author.name}
                  </p>
                </div>
                <div className="shrink-0">
                  <p className="text-[#a6b99d] text-sm font-normal leading-normal">
                    {article.date}
                  </p>
                </div>
                <div className="flex gap-2 justify-start items-center ml-auto">
                  <p className="text-sm font-medium text-[#a6b99d] hidden sm:block">
                    Share:
                  </p>
                  <div className="flex items-center gap-1">
                    <button className="rounded-full bg-gunmetal p-2.5 text-white hover:bg-[#5bec13]/20 transition-colors">
                      <span className="material-symbols-outlined text-base">
                        share
                      </span>
                    </button>
                    <button className="rounded-full bg-gunmetal p-2.5 text-white hover:bg-[#5bec13]/20 transition-colors">
                      <span className="material-symbols-outlined text-base">
                        bookmark_border
                      </span>
                    </button>
                    <button className="rounded-full bg-gunmetal p-2.5 text-white hover:bg-[#5bec13]/20 transition-colors">
                      <span className="material-symbols-outlined text-base">
                        more_horiz
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="prose prose-invert max-w-none text-[#EAEAEA] text-lg leading-relaxed space-y-6 py-8">
                <p>
                  The Lockheed Martin F-35 Lightning II represents a quantum leap
                  in air dominance, combining advanced stealth with unprecedented
                  sensor fusion and network-enabled operations. This
                  fifth-generation, single-seat, single-engine, all-weather stealth
                  multirole combat aircraft is designed to perform both air
                  superiority and strike missions while also providing electronic
                  warfare and intelligence, surveillance, and reconnaissance
                  capabilities. It is, without a doubt, the cornerstone of future
                  air power for the United States and its allies.
                </p>
                <p>
                  At the heart of the F-35's power is its sensor suite. The
                  Distributed Aperture System (DAS) provides pilots with 360-degree
                  situational awareness, effectively allowing them to "see" through
                  the airframe. Combined with the AN/APG-81 AESA radar and the
                  Electro-Optical Targeting System (EOTS), the F-35 can detect and
                  engage threats from ranges far exceeding those of
                  previous-generation fighters, often before the enemy even knows
                  it's there.
                </p>
                <blockquote className="border-l-4 border-[#5bec13] pl-6 py-2 my-8 text-xl italic text-white bg-gunmetal/30 rounded-r-lg">
                  "The F-35 is not just a fighter jet; it's a flying data node. Its
                  ability to collect, process, and share information across the
                  battlespace is its most revolutionary feature."
                </blockquote>
                <p>
                  This network-centric approach transforms the F-35 from a solitary
                  hunter into the quarterback of the aerial battlefield. It can
                  share its high-fidelity sensor data with other assets—from older
                  fourth-generation fighters to naval ships and ground command—dramatically
                  increasing the effectiveness of the entire force. This capability,
                  known as "sensor fusion," simplifies the pilot's workload and
                  provides a clear, integrated picture of the operational
                  environment.
                </p>
                <p>
                  While its cost and development timeline have been subjects of
                  debate, the F-35's operational performance is beginning to speak
                  for itself. In exercises and initial deployments, the aircraft has
                  demonstrated a level of survivability and lethality that is
                  unmatched. As production ramps up and software upgrades continue
                  to enhance its capabilities, the F-35 Lightning II is set to
                  define the contours of aerial combat for decades to come, ensuring
                  its operators maintain a decisive edge in an increasingly complex
                  and contested airspace.
                </p>
              </div>
            </article>
          </div>
          <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="space-y-8">
              <div className="bg-gunmetal/30 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-4 border-b border-gunmetal-light pb-2">
                  Table of Contents
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      className="text-[#a6b99d] hover:text-[#5bec13] transition-colors text-sm font-medium"
                      href="#"
                    >
                      Introduction: A Quantum Leap
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[#a6b99d] hover:text-[#5bec13] transition-colors text-sm font-medium"
                      href="#"
                    >
                      The Power of Sensor Fusion
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[#a6b99d] hover:text-[#5bec13] transition-colors text-sm font-medium"
                      href="#"
                    >
                      Network-Centric Warfare
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[#a6b99d] hover:text-[#5bec13] transition-colors text-sm font-medium"
                      href="#"
                    >
                      Operational Performance
                    </a>
                  </li>
                </ul>
              </div>
              <div className="bg-gunmetal/30 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-4 border-b border-gunmetal-light pb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  <a
                    className="bg-gunmetal-light text-xs text-[#EAEAEA] font-medium px-3 py-1 rounded-full hover:bg-[#5bec13] hover:text-[#131811] transition-colors"
                    href="#"
                  >
                    F-35
                  </a>
                  <a
                    className="bg-gunmetal-light text-xs text-[#EAEAEA] font-medium px-3 py-1 rounded-full hover:bg-[#5bec13] hover:text-[#131811] transition-colors"
                    href="#"
                  >
                    Air Superiority
                  </a>
                  <a
                    className="bg-gunmetal-light text-xs text-[#EAEAEA] font-medium px-3 py-1 rounded-full hover:bg-[#5bec13] hover:text-[#131811] transition-colors"
                    href="#"
                  >
                    Stealth
                  </a>
                  <a
                    className="bg-gunmetal-light text-xs text-[#EAEAEA] font-medium px-3 py-1 rounded-full hover:bg-[#5bec13] hover:text-[#131811] transition-colors"
                    href="#"
                  >
                    USAF
                  </a>
                  <a
                    className="bg-gunmetal-light text-xs text-[#EAEAEA] font-medium px-3 py-1 rounded-full hover:bg-[#5bec13] hover:text-[#131811] transition-colors"
                    href="#"
                  >
                    Aviation
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}


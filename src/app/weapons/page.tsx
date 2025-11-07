import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

const hardcodedWeapons = [
  {
    id: 1,
    name: "F-35 Lightning II",
    type: "Multirole Fighter",
    origin: "USA",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA95QH-HSoKwNmcmGQ82gOIW06hImRsWFxyipgN26ST-6-ru1U-q9vnH1g50JgydJZk9f-Hhq7otrg-G49bRXteA5t58WUzxmCiwQ-_mJQzqX9GWcsy_Ej_Xop06HSp8mYlomRr_LVJdJMYQY1tByP1KW2y_mWojVeFVneXgJIH5n5TFcB-Oqc17WMDRe8hJH0hFyaWJCZDnxGL6fSQmFYoEu5GHs_ItKSMbJRaaAPO395o6shjeqCBNv7kUw3SMX5TvjHGnPLGKrU",
  },
  {
    id: 2,
    name: "B-2 Spirit",
    type: "Stealth Bomber",
    origin: "USA",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcbLp1tVQkXJIfr_FRKRvEiNpY6jR2ffNDGhXwNifpWJ1Q2vzYBu7PntwtGO7kLBOtKrIJzL-YeuByUbQrtrIIY-oxT0ykKqyzl4OydUhh0PdMxzUuQ12uGmJkB2eSyCt5S9TRwucuf258kbEqilshjmnrRqfKYOzWsUtzbhgJcEL5r_9KAJX3U_I5pwyZiQS9uwLr7VSLK63gf3BjC0E3_Sk-lL8UnBLOuJtct7SDue3cgtQbuaQogaCAbnZRZy16VYCIP2_xY7k",
  },
  {
    id: 3,
    name: "Zumwalt-class Destroyer",
    type: "Guided Missile Destroyer",
    origin: "USA",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYy20n8T0oSCuXtG75P78_i3ji5VY4JnN7jhWfLsZOn2J4tcp4PHu4VmX2oLNE4YUWVZV8jpuoZMdKl3UI7YqS6SixlAX-z9gZCW-KFPNk-yWxZiGDNbU35Q3nE72kVmgxQh-TsrmLqRE5nJodjQ5VFpkzEgvhd0pgeh8F6Dd4LWGAu3OPud8fZrKe3iC2dxwyB5OZ0cGN_0YKLEtZqD3vYPBT_DFwHqBE53LymTmztYqAXpqfRZs-WCeyaiVlxzRYUVs8aRfL08U",
  },
  {
    id: 4,
    name: "M1 Abrams",
    type: "Main Battle Tank",
    origin: "USA",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMQonMKsyh6uT0KiZXVL1P4PrHenp6LiOkVlhrnQbfiLZ12J3t5yGFkXCmQmLGJJm-My9twPWzqTmmZlGkxtr4ex7YmW9h0zWTZX53w2mwSm7TLq5Pd1GSD4wWMuBYL_00ozxFUhaw_NtskZBzt9rHs71iibFwybpyQKETw2qEIz2FT-QflrdPUrg_Sgqii_Qn4PsIoQCniitN6l3XY52470cVQy3pVqxa7mkxOk-MPP7UgcojQtfKe6h1i8XIevo1xP5Zgy55MYg",
  },
  {
    id: 5,
    name: "Virginia-class Submarine",
    type: "Attack Submarine",
    origin: "USA",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBW4H-Wl89XWv00_Lis4Vic3DLtAQxRZJQ-xnefW48G7cX_yFw8TLsUo5rolWPT7Uhn8mQRf1H614IxrEX4WwcvTmyn6VeT5rnVNGyDJu5UxHW8Ajam6oDcL47DVsgpFoj_4V5BZ1JGzZvY3zO67ZUV6ID9AfuBeucz3RgGOudeb1CFv_UzYPqbie0xmbnI_zhcF8CoV3Hy9HBbUVwAb5XO_G0lJMYzfX9HPsA8xnTSe75LMq70GXLqPtBpn-_p7GmfPSNKnRWBrn0",
  },
  {
    id: 6,
    name: "MQ-9 Reaper",
    type: "UAV",
    origin: "USA",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBA20Hoy19dwlEKu1ZsPUJgo_c0yevaT-aoKA_WrPd4YCN5We81HgWmsB3sNLbvfH723nNQ3UFe6Q08nk70BsRo_147BwkfrDJ2RPvsW_SO5ltkX--RTZGlUmWqP-WYMRQbGac-SmnszBoeOQ4C8wNh_FTahaZuwPr6csX7T92WpuE6d1o6lXIxVYveA4GwDm_58kHRiM3eOlVHpZzY5Gm77mUVH4rmUbGrt0vqOagoWiuAaO3txnyBIioB94oQOTUh0p0HlSf5ZPA",
  },
  {
    id: 7,
    name: "S-400 Triumf",
    type: "SAM System",
    origin: "Russia",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAn6e9c6BCgujW7ze-whHqk5eYVPNCAOgceIYvdltJgG5X8GhIJFm0xqAxRpMfRL69W0JGcsTxxgYadop6EC87fV3E5dJozJvzVuXPte8SPfSJG5fZjJhAmjGlvSs0qQTOmLRTP5ugTkrZg_0fuWxdWllMETJOwMk7vF3gcK6YDJsmIbJhIyMlNUaII7dqaqU52FmszB9W9qwm44UZRDCJEY99TNwJ5DjjwN2RT5c25-0vZtJKNHovFpdS2XxChzy1KlVv431k-6dM",
  },
  {
    id: 8,
    name: "Leopard 2A7",
    type: "Main Battle Tank",
    origin: "Germany",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5D_dO9-T05shgBKQv_dXTtUgnjttAPt8f7ogNbakjKU84E4h7nlCkeDJ2sR1ENeCJ2xctKpnlGKii2Fj2rnUL46Vg2fcExzB_mOgDHcTJXm1sQQIEQaLeCd0tchNsVM_c-r9xC7zKygDZ-uygAVBTfrPCoviQ6lQd2ckY8UiPwGtGXghO3SaI7KVdU6xEtUTpDwk_6acZlNfRSQf3VGR1hZg9mvVjyoawkr_YkMcpj9nVSsbY-MCP82b9a0Ar9fTBNUIig3Y9gKI",
  },
];

export default async function WeaponsPage() {
  const supabase = await createClient();

  const { data: weapons, error } = await supabase
    .from("weapons_with_reactions")
    .select("*")
    .order("name", { ascending: true });

  const displayWeapons = weapons && weapons.length > 0 ? weapons : hardcodedWeapons;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#0D0D0D] font-display">
      <div className="flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-[1280px] flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
          <main className="flex flex-col gap-6 p-4 sm:p-6 lg:p-10">
            <div className="flex flex-wrap justify-between gap-3">
              <div className="flex min-w-72 flex-col gap-3">
                <h1 className="text-black dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Hardware Reference Library
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
                  Explore our database of advanced military technology and weapon
                  systems.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#5bec13]/20 pl-4 pr-2 border-2 border-[#5bec13]">
                <p className="text-[#5bec13] text-sm font-medium leading-normal">
                  All
                </p>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gunmetal-gray pl-3 pr-3 text-black dark:text-white hover:bg-white/10 transition-colors">
                <p className="text-sm font-medium leading-normal">Stealth</p>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gunmetal-gray pl-3 pr-3 text-black dark:text-white hover:bg-white/10 transition-colors">
                <p className="text-sm font-medium leading-normal">
                  Air Superiority
                </p>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gunmetal-gray pl-3 pr-3 text-black dark:text-white hover:bg-white/10 transition-colors">
                <p className="text-sm font-medium leading-normal">Naval</p>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gunmetal-gray pl-3 pr-3 text-black dark:text-white hover:bg-white/10 transition-colors">
                <p className="text-sm font-medium leading-normal">
                  5th Generation
                </p>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gunmetal-gray pl-4 pr-2 text-black dark:text-white hover:bg-white/10 transition-colors">
                <p className="text-sm font-medium leading-normal">
                  More Filters
                </p>
                <span className="material-symbols-outlined text-base">
                  expand_more
                </span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayWeapons.map((weapon: any) => (
                <div key={weapon.id} className="flex flex-col gap-3 pb-3 group">
                  <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                    <div
                      className="w-full h-full bg-center bg-no-repeat bg-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: `url('${weapon.image || "https://via.placeholder.com/400x300"}')`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="text-black dark:text-white text-base font-medium leading-normal">
                        {weapon.name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">
                        Type: {weapon.type} | Origin: {weapon.origin}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

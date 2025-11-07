"use client";

export default function AboutPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#111827] font-display overflow-x-hidden">
          <main className="flex-1 px-4 sm:px-10 lg:px-20 py-10">
            <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-4 mb-12">
            <h1 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">
              About & Contact
            </h1>
            <p className="text-white/60 text-base font-normal leading-normal max-w-2xl">
              Learn more about our mission to deliver unparalleled insights into
              military technology and get in touch with our team of experts.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="flex flex-col gap-8">
              <div className="w-full aspect-video rounded-xl overflow-hidden">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBsdGxZqK3KwnzOaMqLz3ewOP6KSYO3am_dlhAsd38CZ7EtLV7ZrLUqhpJpWifejsSESXnQpnwLZEYOzkVeviXZ4fYRs8KQ35OqDq9DOg3zzxfIxadDi18oi4dQdvXAoZMl59kyxlHl8wP2XnhSWmvyw0J4RPzZJ-sC8BSa_Twdf0FUdfVq7TlA8b98BkRGjvSMNLGgNyT-dlM6cLqBpJZxGZ-fM78toK1xXXdFBqm5kRVrcXuQM-DlYJiF4xeePpd5QzKHEGP2aN4")`,
                  }}
                ></div>
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] mb-3">
                    Our Mission
                  </h2>
                  <p className="text-white/60 text-base font-normal leading-relaxed">
                    MilTech Reference is dedicated to providing the most accurate,
                    comprehensive, and up-to-date analysis on global military
                    technology. We aim to be the premier resource for defense
                    professionals, policymakers, and enthusiasts by delivering
                    in-depth articles, detailed equipment references, and insightful
                    commentary on the future of warfare. Our commitment to
                    journalistic integrity and expert-driven content ensures our
                    audience receives credible and actionable information.
                  </p>
                </div>
                <div>
                  <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] mb-3">
                    The Team
                  </h2>
                  <p className="text-white/60 text-base font-normal leading-relaxed">
                    Our team consists of seasoned defense journalists, former
                    military personnel, and technology analysts with decades of
                    combined experience in the field. We are passionate about
                    technology and dedicated to demystifying the complexities of
                    modern defense systems.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
                  Get in Touch
                </h2>
                <p className="text-white/60 text-base font-normal leading-normal mt-2">
                  Have a question, feedback, or a news tip? We'd love to hear from
                  you.
                </p>
              </div>
              <form className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-white/80 text-sm font-medium"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#4ade80]/50 focus:border-[#4ade80] transition-colors"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-white/80 text-sm font-medium"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#4ade80]/50 focus:border-[#4ade80] transition-colors"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    type="email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-white/80 text-sm font-medium"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#4ade80]/50 focus:border-[#4ade80] transition-colors"
                    id="subject"
                    name="subject"
                    placeholder="Inquiry about..."
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-white/80 text-sm font-medium"
                    htmlFor="message"
                  >
                    Your Message
                  </label>
                  <textarea
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#4ade80]/50 focus:border-[#4ade80] transition-colors"
                    id="message"
                    name="message"
                    placeholder="Type your message here..."
                    rows={5}
                  ></textarea>
                </div>
                <div>
                  <button
                    className="w-full sm:w-auto flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#4ade80] text-[#111827] text-base font-bold tracking-wide hover:bg-opacity-80 transition-opacity"
                    type="submit"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


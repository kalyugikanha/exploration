export default function TrustStrip() {
  return (
    <div className="w-full bg-[#045a94] text-white py-4 px-4 overflow-hidden border-b border-[#03426e]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 text-sm md:text-base font-medium tracking-wide text-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
          21+ Years of Expertise
        </div>
        <div className="hidden md:block w-px h-4 bg-blue-400/50"></div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
          Bespoke Journeys
        </div>
        <div className="hidden md:block w-px h-4 bg-blue-400/50"></div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
          Trusted Global Partners
        </div>
      </div>
    </div>
  );
}

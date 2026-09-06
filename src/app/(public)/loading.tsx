export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] bg-transparent flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#045a94] rounded-full border-t-transparent animate-spin"></div>
        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-4 h-4 text-[#045a94]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
      </div>
      <p className="mt-4 text-[#045a94] font-display font-bold tracking-widest uppercase text-xs animate-pulse">Loading...</p>
    </div>
  );
}
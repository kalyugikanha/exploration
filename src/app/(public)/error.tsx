'use client';
export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-20 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <pre className="text-left bg-slate-100 p-4 rounded text-sm overflow-auto">{error.stack || error.message}</pre>
    </div>
  );
}
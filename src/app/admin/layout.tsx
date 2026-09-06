import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { LayoutDashboard, Users, MapPin, Package, FileText, Settings, LogOut, FileCode } from 'lucide-react';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {session && (
        <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-y-auto">
          <div className="p-4 md:p-6 border-b border-slate-800">
            <h2 className="text-xl font-bold">Admin Portal</h2>
            <p className="text-xs text-slate-400 mt-1">Exploration Tours</p>
          </div>
          
          <nav className="p-4 space-y-1 flex-1">
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-slate-800 transition text-sm">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-slate-800 transition text-sm">
              <Users className="w-4 h-4" /> Leads
            </Link>
            
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Website Pages</p>
            </div>
            <Link href="/admin/pages/home" className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-slate-800 transition text-sm ml-2 border-l-2 border-transparent hover:border-brand-500">
              <FileCode className="w-4 h-4" /> Home Page
            </Link>
            <Link href="/admin/pages/about" className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-slate-800 transition text-sm ml-2 border-l-2 border-transparent hover:border-brand-500">
              <FileCode className="w-4 h-4" /> About Page
            </Link>

            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Content Modules</p>
            </div>
            <Link href="/admin/destinations" className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-slate-800 transition text-sm">
              <MapPin className="w-4 h-4" /> Destinations
            </Link>
            <Link href="/admin/packages" className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-slate-800 transition text-sm">
              <Package className="w-4 h-4" /> Packages
            </Link>
            <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-slate-800 transition text-sm">
              <FileText className="w-4 h-4" /> Blog / Webhook
            </Link>

            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">System</p>
            </div>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-slate-800 transition text-sm">
              <Settings className="w-4 h-4" /> Global Settings
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-800">
            <a href="/api/auth/signout" className="flex items-center gap-3 px-4 py-2.5 text-red-400 rounded-md hover:bg-slate-800 transition text-sm">
              <LogOut className="w-4 h-4" /> Sign Out
            </a>
          </div>
        </aside>
      )}
      
      <main className="flex-1 p-4 md:p-8 overflow-auto h-screen">
        {children}
      </main>
    </div>
  );
}
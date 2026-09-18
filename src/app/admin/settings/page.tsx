import { prisma } from '@/lib/prisma';
import SettingsTabs from './SettingsTabs';

export default async function AdminSettingsPage() {
  const settings = await prisma.setting.findMany();
  
  // Convert array to a key-value object
  const settingsMap = settings.reduce((acc, curr) => {
    try {
      acc[curr.key] = JSON.parse(curr.value);
    } catch {
      acc[curr.key] = curr.value;
    }
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Website Settings</h1>
        <p className="text-slate-500 text-sm">Manage dynamic content for Header, Footer, Home, and other pages.</p>
      </div>
      
      <SettingsTabs initialData={settingsMap} />
    </div>
  );
}
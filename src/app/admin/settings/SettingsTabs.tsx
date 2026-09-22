'use client';

import { useState } from 'react';
import { savePageSettings } from '../actions';

export default function SettingsTabs({ initialData }: { initialData: Record<string, any> }) {
  const [activeTab, setActiveTab] = useState('global');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'global', label: 'Global (Header/Footer)' },
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About Page' },
    { id: 'contact', label: 'Contact Page' }
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    await savePageSettings(formData);
    setIsSaving(false);
    alert('Settings saved successfully!');
  }

  const global = initialData['global_settings'] || {};
  const home = initialData['page_home'] || {};
  const about = initialData['page_about'] || {};
  const contact = initialData['page_contact'] || {};

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-bold whitespace-nowrap ${activeTab === tab.id ? 'border-b-2 border-brand-700 text-brand-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="pageKey" value={
            activeTab === 'global' ? 'global_settings' : 
            activeTab === 'home' ? 'page_home' : 
            activeTab === 'about' ? 'page_about' : 'page_contact'
          } />

          {activeTab === 'global' && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b pb-2">Contact Info (Header/Footer)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold mb-1">Phone Number</label><input type="text" name="phone" defaultValue={global.phone} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm font-semibold mb-1">Email Address</label><input type="text" name="email" defaultValue={global.email} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm font-semibold mb-1">Physical Address</label><input type="text" name="address" defaultValue={global.address} className="w-full p-2 border rounded" /></div>
              </div>
              <h3 className="font-bold text-lg border-b pb-2 mt-6">Social Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold mb-1">Facebook URL</label><input type="text" name="facebook" defaultValue={global.facebook} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm font-semibold mb-1">Instagram URL</label><input type="text" name="instagram" defaultValue={global.instagram} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm font-semibold mb-1">Twitter URL</label><input type="text" name="twitter" defaultValue={global.twitter} className="w-full p-2 border rounded" /></div>
              </div>
              <h3 className="font-bold text-lg border-b pb-2 mt-6">Footer Texts</h3>
              <div><label className="block text-sm font-semibold mb-1">Footer About Text</label><textarea name="footerAbout" defaultValue={global.footerAbout} className="w-full p-2 border rounded h-20" /></div>
              <div><label className="block text-sm font-semibold mb-1">Copyright Text</label><input type="text" name="copyright" defaultValue={global.copyright} className="w-full p-2 border rounded" /></div>
            </div>
          )}

          {activeTab === 'home' && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b pb-2">Hero Section</h3>
              <div><label className="block text-sm font-semibold mb-1">Hero Title</label><input type="text" name="heroTitle" defaultValue={home.heroTitle} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-sm font-semibold mb-1">Hero Subtitle</label><textarea name="heroSubtitle" defaultValue={home.heroSubtitle} className="w-full p-2 border rounded h-16" /></div>
              <div><label className="block text-sm font-semibold mb-1">Hero Background Image URL</label><input type="text" name="heroImage" defaultValue={home.heroImage} className="w-full p-2 border rounded" /></div>
              
              <h3 className="font-bold text-lg border-b pb-2 mt-6">Our Story Section</h3>
              <div><label className="block text-sm font-semibold mb-1">Story Title</label><input type="text" name="storyTitle" defaultValue={home.storyTitle} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-sm font-semibold mb-1">Story Content</label><textarea name="storyContent" defaultValue={home.storyContent} className="w-full p-2 border rounded h-32" /></div>
              <div><label className="block text-sm font-semibold mb-1">Story Image URL</label><input type="text" name="storyImage" defaultValue={home.storyImage} className="w-full p-2 border rounded" /></div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <div><label className="block text-sm font-semibold mb-1">Page Title</label><input type="text" name="title" defaultValue={about.title} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-sm font-semibold mb-1">Header Image URL</label><input type="text" name="headerImage" defaultValue={about.headerImage} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-sm font-semibold mb-1">Main Content (HTML allowed)</label><textarea name="content" defaultValue={about.content} className="w-full p-2 border rounded h-64" /></div>
              <div><label className="block text-sm font-semibold mb-1">Mission Statement</label><textarea name="mission" defaultValue={about.mission} className="w-full p-2 border rounded h-24" /></div>
              <div><label className="block text-sm font-semibold mb-1">Vision Statement</label><textarea name="vision" defaultValue={about.vision} className="w-full p-2 border rounded h-24" /></div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div><label className="block text-sm font-semibold mb-1">Page Title</label><input type="text" name="title" defaultValue={contact.title} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-sm font-semibold mb-1">Subtitle</label><textarea name="subtitle" defaultValue={contact.subtitle} className="w-full p-2 border rounded h-24" /></div>
              <div><label className="block text-sm font-semibold mb-1">Header Image URL</label><input type="text" name="headerImage" defaultValue={contact.headerImage} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-sm font-semibold mb-1">Google Maps Embed URL</label><input type="text" name="mapUrl" defaultValue={contact.mapUrl} className="w-full p-2 border rounded" /></div>
            </div>
          )}

          <div className="pt-6 border-t">
            <button type="submit" disabled={isSaving} className="bg-brand-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-800 disabled:opacity-50">
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

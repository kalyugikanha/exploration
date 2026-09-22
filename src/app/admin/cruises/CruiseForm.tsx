'use client';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function CruiseForm({ cruise, isNew }: { cruise: any, isNew: boolean }) {
  const [gallery, setGallery] = useState<string[]>(cruise?.gallery || ['']);
  const [itineraries, setItineraries] = useState<any[]>(cruise?.itineraries || []);

  const addGalleryItem = () => setGallery([...gallery, '']);
  const updateGalleryItem = (index: number, val: string) => {
    const newG = [...gallery];
    newG[index] = val;
    setGallery(newG);
  };
  const removeGalleryItem = (index: number) => setGallery(gallery.filter((_, i) => i !== index));

  const addItinerary = () => setItineraries([...itineraries, { dayNumber: itineraries.length + 1, title: '', timeOfDay: 'Day', description: '', images: [''] }]);
  const updateItinerary = (index: number, field: string, val: any) => {
    const newI = [...itineraries];
    newI[index][field] = val;
    setItineraries(newI);
  };
  const updateItineraryImage = (dayIdx: number, imgIdx: number, val: string) => {
    const newI = [...itineraries];
    newI[dayIdx].images[imgIdx] = val;
    setItineraries(newI);
  };
  const addItineraryImage = (dayIdx: number) => {
    const newI = [...itineraries];
    newI[dayIdx].images.push('');
    setItineraries(newI);
  };
  const removeItinerary = (index: number) => setItineraries(itineraries.filter((_, i) => i !== index));

  return (
    <form action="/api/admin/cruises/save" method="POST" className="space-y-8">
      <input type="hidden" name="id" value={cruise?.id || 'new'} />
      <input type="hidden" name="galleryData" value={JSON.stringify(gallery.filter(Boolean))} />
      <input type="hidden" name="itineraryData" value={JSON.stringify(itineraries)} />
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4">1. Cruise Basics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cruise Title *</label>
            <input required type="text" name="title" defaultValue={cruise?.title || ''} className="w-full px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-brand-500" />
            <p className="text-xs text-slate-400 mt-1">Recommended: 3-8 words (e.g. 7-Night Mediterranean Voyage).</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Region</label>
            <input type="text" name="region" defaultValue={cruise?.region || ''} className="w-full px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-brand-500" placeholder="e.g. Caribbean, Mediterranean" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
          <input type="text" name="duration" defaultValue={cruise?.duration || ''} className="w-full px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-brand-500" placeholder="e.g. 7 Days / 6 Nights" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">Short Description *</label>
          <textarea required name="shortDesc" defaultValue={cruise?.shortDesc || ''} rows={2} className="w-full px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-brand-500"></textarea>
          <p className="text-xs text-slate-400 mt-1">Recommended length: 15-30 words (approx. 100-150 characters).</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Content</label>
          <textarea name="content" defaultValue={cruise?.content || ''} rows={5} className="w-full px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-brand-500"></textarea>
          <p className="text-xs text-slate-400 mt-1">Recommended length: 100-250 words.</p>
        </div>
      </div>

      {/* Media */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4">2. Media & Hero Gallery</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">Hero Image URL *</label>
          <input required type="text" name="heroImage" defaultValue={cruise?.heroImage || ''} className="w-full px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-brand-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Additional Gallery (3-5 images recommended)</label>
          <div className="space-y-3">
            {gallery.map((g, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" value={g} onChange={e => updateGalleryItem(idx, e.target.value)} className="flex-1 px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-brand-500" />
                <button type="button" onClick={() => removeGalleryItem(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addGalleryItem} className="mt-3 text-sm text-brand-600 font-bold flex items-center gap-1"><Plus className="w-4 h-4" /> Add Image URL</button>
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4">3. Cruise Itinerary</h2>
        <div className="space-y-6">
          {itineraries.map((day, idx) => (
            <div key={idx} className="p-4 border border-slate-200 rounded-lg bg-slate-50 relative">
              <button type="button" onClick={() => removeItinerary(idx)} className="absolute top-4 right-4 text-red-500 hover:bg-red-100 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Day Number</label>
                  <input type="number" value={day.dayNumber} onChange={e => updateItinerary(idx, 'dayNumber', parseInt(e.target.value))} className="w-full px-3 py-1.5 border border-slate-200 rounded" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title (e.g. Port of Call)</label>
                  <input type="text" value={day.title} onChange={e => updateItinerary(idx, 'title', e.target.value)} className="w-full px-3 py-1.5 border border-slate-200 rounded" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea value={day.description} onChange={e => updateItinerary(idx, 'description', e.target.value)} rows={2} className="w-full px-3 py-1.5 border border-slate-200 rounded" placeholder="Use • for bullets"></textarea>
                <p className="text-xs text-slate-400 mt-1">Recommended: 30-50 words.</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Day Images (Max 3)</label>
                <div className="space-y-2">
                  {day.images.map((img: string, iIdx: number) => (
                    <input key={iIdx} type="text" value={img} onChange={e => updateItineraryImage(idx, iIdx, e.target.value)} className="w-full px-3 py-1.5 border border-slate-200 rounded text-sm" placeholder="Image URL..." />
                  ))}
                </div>
                <button type="button" onClick={() => addItineraryImage(idx)} className="mt-2 text-xs text-brand-600 font-bold">+ Add Image for Day</button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addItinerary} className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-md text-sm">+ Add Itinerary Day</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8 flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isPublished" defaultChecked={isNew ? true : cruise?.isPublished} className="w-5 h-5 text-brand-600 rounded" />
          <span className="text-slate-900 font-medium">Publish</span>
        </label>
        <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-8 rounded-xl">Save Cruise</button>
      </div>
    </form>
  );
}

'use client';
import { useState } from 'react';
import { saveDestination } from '../../actions';
import { Plus, Trash2 } from 'lucide-react';

export default function DestinationForm({ dest, isNew }: { dest: any, isNew: boolean }) {
  const [gallery, setGallery] = useState<string[]>(dest?.gallery || ['']);
  const [itineraries, setItineraries] = useState<any[]>(dest?.itineraries || []);

  const addGalleryItem = () => setGallery([...gallery, '']);
  const updateGalleryItem = (index: number, val: string) => {
    const newG = [...gallery];
    newG[index] = val;
    setGallery(newG);
  };
  const removeGalleryItem = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const addItinerary = () => {
    setItineraries([...itineraries, { dayNumber: itineraries.length + 1, title: '', timeOfDay: 'Day', description: '', images: [''] }]);
  };

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

  const removeItinerary = (index: number) => {
    setItineraries(itineraries.filter((_, i) => i !== index));
  };

  return (
    <form action={saveDestination} className="space-y-8">
      <input type="hidden" name="id" value={dest?.id || 'new'} />
      <input type="hidden" name="galleryData" value={JSON.stringify(gallery.filter(Boolean))} />
      <input type="hidden" name="itineraryData" value={JSON.stringify(itineraries)} />
      
      {/* 1. Basic Info */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4">1. Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Destination Name *</label>
            <input required type="text" name="name" defaultValue={dest?.name || ''} className="w-full px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-brand-500" />
            <p className="text-xs text-slate-400 mt-1">Recommended: 1-5 words.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Region *</label>
            <select name="region" defaultValue={dest?.region || 'international'} className="w-full px-4 py-2 border border-slate-200 rounded-md outline-none bg-white focus:border-brand-500">
              <option value="domestic">Domestic (India)</option>
              <option value="international">International</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">Short Description *</label>
          <textarea required name="shortDesc" defaultValue={dest?.shortDesc || ''} rows={2} className="w-full px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-brand-500"></textarea>
          <p className="text-xs text-slate-400 mt-1">Recommended length: 15-30 words (approx. 100-150 characters). This appears on the listing cards.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Content</label>
          <textarea name="content" defaultValue={dest?.content || ''} rows={6} className="w-full px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-brand-500"></textarea>
          <p className="text-xs text-slate-400 mt-1">Recommended length: 100-250 words. You can use Markdown or HTML for formatting.</p>
        </div>
      </div>

      {/* 2. Media */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4">2. Media & Hero Gallery</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">Primary Hero Image URL *</label>
          <input required type="text" name="heroImage" defaultValue={dest?.heroImage || ''} className="w-full px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-brand-500" placeholder="https://..." />
          <p className="text-xs text-slate-400 mt-1">This is the main image. Use high-resolution landscape images (1920x1080).</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Additional Hero Gallery (3-5 images recommended)</label>
          <div className="space-y-3">
            {gallery.map((g, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" value={g} onChange={e => updateGalleryItem(idx, e.target.value)} className="flex-1 px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-brand-500" placeholder="Image URL..." />
                <button type="button" onClick={() => removeGalleryItem(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addGalleryItem} className="mt-3 text-sm text-brand-600 font-bold flex items-center gap-1"><Plus className="w-4 h-4" /> Add Image URL</button>
        </div>
      </div>

      {/* 3. Itinerary Builder */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4">3. Itinerary / Plan Builder</h2>
        <p className="text-sm text-slate-500 mb-6">Dynamically add day-by-day plans for this destination. (e.g. Day 1, Day 2)</p>

        <div className="space-y-6">
          {itineraries.map((day, idx) => (
            <div key={idx} className="p-4 border border-slate-200 rounded-lg bg-slate-50 relative">
              <button type="button" onClick={() => removeItinerary(idx)} className="absolute top-4 right-4 text-red-500 hover:bg-red-100 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Day Number</label>
                  <input type="number" value={day.dayNumber} onChange={e => updateItinerary(idx, 'dayNumber', parseInt(e.target.value))} className="w-full px-3 py-1.5 border border-slate-200 rounded outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title (e.g. Arrival in Bali)</label>
                  <input type="text" value={day.title} onChange={e => updateItinerary(idx, 'title', e.target.value)} className="w-full px-3 py-1.5 border border-slate-200 rounded outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time (Day/Night/Morning)</label>
                  <input type="text" value={day.timeOfDay} onChange={e => updateItinerary(idx, 'timeOfDay', e.target.value)} className="w-full px-3 py-1.5 border border-slate-200 rounded outline-none" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 mb-1">Description (Bullet Points)</label>
                <textarea value={day.description} onChange={e => updateItinerary(idx, 'description', e.target.value)} rows={3} className="w-full px-3 py-1.5 border border-slate-200 rounded outline-none" placeholder="Use • or - for bullets"></textarea>
                <p className="text-xs text-slate-400 mt-1">Recommended length: 30-50 words per day.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Day Images (Max 3-4)</label>
                <div className="space-y-2">
                  {day.images.map((img: string, iIdx: number) => (
                    <div key={iIdx} className="flex gap-2">
                      <input type="text" value={img} onChange={e => updateItineraryImage(idx, iIdx, e.target.value)} className="flex-1 px-3 py-1.5 border border-slate-200 rounded outline-none text-sm" placeholder="Image URL..." />
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => addItineraryImage(idx)} className="mt-2 text-xs text-brand-600 font-bold flex items-center gap-1">+ Add Image for Day</button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addItinerary} className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-md text-sm">
          + Add New Itinerary Day
        </button>
      </div>

      {/* 4. Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isPublished" defaultChecked={isNew ? true : dest?.isPublished} className="w-5 h-5 text-brand-600 rounded" />
            <span className="text-slate-900 font-medium">Publish</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isFeatured" defaultChecked={dest?.isFeatured} className="w-5 h-5 text-brand-600 rounded" />
            <span className="text-slate-900 font-medium">Feature on Homepage</span>
          </label>
        </div>
        <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-8 rounded-xl transition shadow-md">
          Save Destination
        </button>
      </div>
    </form>
  );
}

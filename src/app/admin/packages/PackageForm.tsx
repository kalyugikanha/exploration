'use client';

import { useState } from 'react';
import { Plus, Trash2, MapPin, Clock, DollarSign, Calendar, Image as ImageIcon } from 'lucide-react';

interface DestinationOption {
  id: string;
  name: string;
}

interface PackageFormProps {
  pkg?: any;
  isNew: boolean;
  destinations: DestinationOption[];
}

export default function PackageForm({ pkg, isNew, destinations }: PackageFormProps) {
  const [gallery, setGallery] = useState<string[]>(pkg?.gallery?.length ? pkg.gallery : ['']);
  const [itineraries, setItineraries] = useState<any[]>(
    pkg?.itineraries?.length
      ? pkg.itineraries
      : [
          {
            dayNumber: 1,
            title: 'Arrival & Welcome',
            timeOfDay: 'Day',
            description: '',
            images: ['']
          }
        ]
  );

  const addGalleryItem = () => setGallery([...gallery, '']);
  const updateGalleryItem = (index: number, val: string) => {
    const updated = [...gallery];
    updated[index] = val;
    setGallery(updated);
  };
  const removeGalleryItem = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const addItinerary = () => {
    setItineraries([
      ...itineraries,
      {
        dayNumber: itineraries.length + 1,
        title: `Day ${itineraries.length + 1} Exploration`,
        timeOfDay: 'Full Day',
        description: '',
        images: ['']
      }
    ]);
  };

  const updateItinerary = (index: number, field: string, val: any) => {
    const updated = [...itineraries];
    updated[index][field] = val;
    setItineraries(updated);
  };

  const addItineraryImage = (dayIdx: number) => {
    const updated = [...itineraries];
    if (!updated[dayIdx].images) updated[dayIdx].images = [];
    updated[dayIdx].images.push('');
    setItineraries(updated);
  };

  const updateItineraryImage = (dayIdx: number, imgIdx: number, val: string) => {
    const updated = [...itineraries];
    updated[dayIdx].images[imgIdx] = val;
    setItineraries(updated);
  };

  const removeItineraryImage = (dayIdx: number, imgIdx: number) => {
    const updated = [...itineraries];
    updated[dayIdx].images = updated[dayIdx].images.filter((_: any, i: number) => i !== imgIdx);
    setItineraries(updated);
  };

  const removeItinerary = (index: number) => {
    const filtered = itineraries.filter((_, i) => i !== index);
    // Renumber days
    const renumbered = filtered.map((item, idx) => ({
      ...item,
      dayNumber: idx + 1
    }));
    setItineraries(renumbered);
  };

  return (
    <form action="/api/admin/packages/save" method="POST" className="space-y-8">
      <input type="hidden" name="id" value={isNew ? 'new' : pkg?.id} />
      <input type="hidden" name="galleryData" value={JSON.stringify(gallery.filter(Boolean))} />
      <input type="hidden" name="itineraryData" value={JSON.stringify(itineraries)} />

      {/* 1. Basic Details */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-brand-600" /> 1. Package Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Package Title *</label>
            <input
              required
              type="text"
              name="title"
              defaultValue={pkg?.title || ''}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              placeholder="e.g. Imperial Rajasthan Heritage & Palaces"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Destination *</label>
            <select
              name="destinationId"
              defaultValue={pkg?.destinationId || ''}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            >
              <option value="">-- Select Destination --</option>
              {destinations.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Duration</label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                name="duration"
                defaultValue={pkg?.duration || ''}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                placeholder="e.g. 6 Days / 5 Nights"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Starting Price (USD / INR)</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="number"
                step="0.01"
                name="priceFrom"
                defaultValue={pkg?.priceFrom || ''}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                placeholder="e.g. 850"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Short Description *</label>
          <textarea
            required
            name="shortDesc"
            defaultValue={pkg?.shortDesc || ''}
            rows={3}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            placeholder="A crisp, enticing 1-2 sentence overview shown on package cards."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Detailed Content / Overview</label>
          <textarea
            name="content"
            defaultValue={pkg?.content || ''}
            rows={5}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-mono text-sm"
            placeholder="Comprehensive overview of this package, inclusions, highlights, etc."
          />
        </div>
      </div>

      {/* 2. Media & Gallery */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-brand-600" /> 2. Hero Image & Gallery
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Hero Image URL *</label>
          <input
            required
            type="url"
            name="heroImage"
            defaultValue={pkg?.heroImage || ''}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Package Gallery Photos</label>
          <div className="space-y-3">
            {gallery.map((img, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={img}
                  onChange={e => updateGalleryItem(idx, e.target.value)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-brand-500"
                  placeholder="https://images.unsplash.com/..."
                />
                <button
                  type="button"
                  onClick={() => removeGalleryItem(idx)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  title="Remove image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addGalleryItem}
            className="mt-3 text-sm text-brand-600 font-bold flex items-center gap-1.5 hover:underline"
          >
            <Plus className="w-4 h-4" /> Add Gallery Image URL
          </button>
        </div>
      </div>

      {/* 3. Day-Wise Itinerary Plan */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-600" /> 3. Day-Wise Itinerary Plan
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Add individual days with specific schedules, activities, and photos.
            </p>
          </div>
          <button
            type="button"
            onClick={addItinerary}
            className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 font-bold px-4 py-2 rounded-lg text-sm hover:bg-brand-100 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Next Day
          </button>
        </div>

        <div className="space-y-6">
          {itineraries.map((day, dayIdx) => (
            <div key={dayIdx} className="p-5 border border-slate-200 rounded-xl bg-slate-50 relative">
              <div className="flex justify-between items-center mb-4">
                <span className="inline-flex items-center gap-1.5 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Day {day.dayNumber}
                </span>
                <button
                  type="button"
                  onClick={() => removeItinerary(dayIdx)}
                  className="p-1.5 text-red-500 hover:bg-red-100 rounded-md transition-colors"
                  title="Delete Day"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                <div className="md:col-span-8">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Day Title *</label>
                  <input
                    type="text"
                    required
                    value={day.title || ''}
                    onChange={e => updateItinerary(dayIdx, 'title', e.target.value)}
                    placeholder="e.g. Arrival in Jaipur & Evening Aarti at Birla Temple"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-brand-500"
                  />
                </div>
                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Time of Day / Tag</label>
                  <input
                    type="text"
                    value={day.timeOfDay || ''}
                    onChange={e => updateItinerary(dayIdx, 'timeOfDay', e.target.value)}
                    placeholder="e.g. Morning, Afternoon, Full Day"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Day Description & Activities</label>
                <textarea
                  rows={3}
                  value={day.description || ''}
                  onChange={e => updateItinerary(dayIdx, 'description', e.target.value)}
                  placeholder="Detail what travelers will experience on this day..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-brand-500 leading-relaxed"
                />
              </div>

              {/* Day Highlights / Images */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Day Images (optional)</label>
                <div className="space-y-2">
                  {(day.images || []).map((imgUrl: string, imgIdx: number) => (
                    <div key={imgIdx} className="flex gap-2">
                      <input
                        type="text"
                        value={imgUrl || ''}
                        onChange={e => updateItineraryImage(dayIdx, imgIdx, e.target.value)}
                        placeholder="Image URL for this day"
                        className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs outline-none focus:border-brand-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeItineraryImage(dayIdx, imgIdx)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addItineraryImage(dayIdx)}
                  className="mt-2 text-xs text-brand-600 font-bold flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Day Photo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Publishing & Status */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex gap-6">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={isNew ? true : pkg?.isPublished}
              className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
            />
            <span className="text-sm font-semibold text-slate-800">Publish Immediately</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={pkg?.isFeatured}
              className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
            />
            <span className="text-sm font-semibold text-slate-800">Featured Package</span>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#045a94] hover:bg-[#03426e] text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
          >
            {isNew ? 'Create Package' : 'Save Package Changes'}
          </button>
        </div>
      </div>
    </form>
  );
}

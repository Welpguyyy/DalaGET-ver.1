'use client';

import { useState } from 'react';
import { Search, Menu, Settings } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./Map'), { ssr: false });

interface Category {
  name: string;
  id: string;
}

const CATEGORIES: Category[] = [
  { name: 'All', id: 'all' },
  { name: 'Grocery', id: 'grocery' },
  { name: 'Hardware', id: 'hardware' },
  { name: 'Bakery', id: 'bakery' },
  { name: 'Pharmacy', id: 'pharmacy' },
  { name: 'Hawak-Hawak', id: 'hawak-hawak' },
];

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('grocery');
  const [radius, setRadius] = useState(500);

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-baseline gap-1">
            <h1 className="text-3xl font-bold text-gray-900">dala</h1>
            <h1 className="text-3xl font-bold text-yellow-400">GET</h1>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Menu size={24} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Settings size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-gray-600 mb-4">
          Anog hahang mo? Hanapin natin ang pinakamalapi na tindahan.
        </p>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for rice, paracetamol, ice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative overflow-hidden">
        <MapComponent selectedCategory={selectedCategory} radius={radius} />

        {/* Radius Indicator */}
        <div className="absolute bottom-6 left-6 bg-white px-3 py-2 rounded-lg shadow-md text-xs sm:text-sm text-gray-700 font-medium">
          {radius} m radius
        </div>

        {/* Radius Slider (optional) */}
        <div className="absolute bottom-6 right-6 bg-white px-4 py-3 rounded-lg shadow-md max-w-xs">
          <label className="text-xs text-gray-600 block mb-2">Search Radius</label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="text-xs text-gray-600 mt-1 text-center">{radius}m</div>
        </div>
      </div>
    </div>
  );
}

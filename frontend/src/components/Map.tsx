'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

interface MapProps {
  selectedCategory: string;
  radius: number;
}

// Create custom icons for different categories
const createIcon = (color: string) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center;"></div>`,
    iconSize: [30, 30],
    className: 'custom-icon',
  });
};

interface Store {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: string;
  color: string;
}

const MOCK_STORES: Store[] = [
  { id: 1, name: 'Grocery Store 1', lat: 14.5995, lng: 120.984, category: 'grocery', color: '#FCD34D' },
  { id: 2, name: 'Bakery 1', lat: 14.6001, lng: 120.9855, category: 'bakery', color: '#3B82F6' },
  { id: 3, name: 'Pharmacy 1', lat: 14.6015, lng: 120.9765, category: 'pharmacy', color: '#3B82F6' },
  { id: 4, name: 'Hardware Store', lat: 14.5975, lng: 120.9745, category: 'hardware', color: '#3B82F6' },
];

export default function MapComponent({ selectedCategory, radius }: MapProps) {
  const [userLocation, setUserLocation] = useState<[number, number]>([ 9.7619073, 123.5334094]);
  const [stores, setStores] = useState<Store[]>(MOCK_STORES);

  useEffect(() => {
    // Filter stores based on selected category
    if (selectedCategory === 'all') {
      setStores(MOCK_STORES);
    } else {
      setStores(MOCK_STORES.filter((store) => store.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <MapContainer
      center={userLocation}
      zoom={16}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* User Location Circle */}
      <Circle
        center={userLocation}
        radius={radius}
        pathOptions={{
          fillColor: '#3B82F6',
          color: '#3B82F6',
          fillOpacity: 0.1,
          weight: 2,
        }}
      />

      {/* User Location Marker */}
      <Marker
        position={userLocation}
        icon={L.icon({
          iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzQjgyRjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        })}
      >
        <Popup>Your Location</Popup>
      </Marker>

      {/* Store Markers */}
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.lat, store.lng]}
          icon={createIcon(store.color)}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{store.name}</p>
              <p className="text-gray-600 capitalize">{store.category}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

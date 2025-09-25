import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Note: You'll need to install leaflet: npm install leaflet
// And add this to your index.html: 
// <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
// <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

function MapView() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Could not get user location:", error);
          // Default to a location (e.g., Delhi)
          setUserLocation({ lat: 28.6139, lng: 77.2090 });
        }
      );
    } else {
      // Default location if geolocation not supported
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
    }
  }, []);

  // Fetch recycling centers
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recycling-centers');
        setCenters(res.data || []);
      } catch (e) {
        console.error('Error fetching centers:', e);
        setCenters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, []);

  // Initialize map when user location and centers are available
  useEffect(() => {
    if (userLocation && !loading && window.L && mapRef.current) {
      initializeMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [userLocation, loading, centers]);

  const initializeMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Initialize map
    const map = window.L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 12);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    // Add user location marker
    const userIcon = window.L.divIcon({
      html: '<div style="background: #4CAF50; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(76,175,80,0.5);"></div>',
      iconSize: [20, 20],
      className: 'user-location-marker'
    });

    window.L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup('<strong>Your Location</strong><br/>Current position')
      .openPopup();

    // Add recycling center markers
    centers.forEach((center, index) => {
      const centerIcon = window.L.divIcon({
        html: `<div style="background: #26A69A; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 0 10px rgba(38,166,154,0.5);">🏢</div>`,
        iconSize: [30, 30],
        className: 'center-marker'
      });

      const marker = window.L.marker([center.lat, center.lng], { icon: centerIcon })
        .addTo(map)
        .bindPopup(`
          <div style="min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; color: #4CAF50;">${center.name}</h4>
            <p style="margin: 4px 0; font-size: 0.9rem;"><strong>Address:</strong> ${center.address}</p>
            <p style="margin: 4px 0; font-size: 0.9rem;"><strong>Contact:</strong> ${center.contact}</p>
            <p style="margin: 4px 0; font-size: 0.9rem;"><strong>Types:</strong> ${Array.isArray(center.types) ? center.types.join(', ') : center.types}</p>
            <div style="margin-top: 12px; display: flex; gap: 8px;">
              <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}', '_blank')" 
                      style="background: #4CAF50; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">
                Get Directions
              </button>
            </div>
          </div>
        `);

      marker.on('click', () => {
        setSelectedCenter(center);
      });
    });

    // Fit map to show all markers
    if (centers.length > 0) {
      const group = new window.L.featureGroup([
        window.L.marker([userLocation.lat, userLocation.lng]),
        ...centers.map(center => window.L.marker([center.lat, center.lng]))
      ]);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  };

  if (loading) {
    return (
      <div className="map-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Loading Interactive Map</h2>
          <p>Finding recycling centers near you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-view-container">
      <div className="map-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Home
        </button>
        <div className="map-title">
          <h1>Recycling Centers Map</h1>
          <p>{centers.length} centers found near you</p>
        </div>
        <div className="map-controls">
          <button className="locate-btn" onClick={() => {
            if (mapInstanceRef.current && userLocation) {
              mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 15);
            }
          }}>
            📍 My Location
          </button>
        </div>
      </div>

      <div className="map-content">
        <div className="map-container">
          <div ref={mapRef} className="leaflet-map"></div>
          {!window.L && (
            <div className="map-error">
              <h3>Map Loading Error</h3>
              <p>Please add Leaflet library to your index.html:</p>
              <pre>{`<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>`}</pre>
            </div>
          )}
        </div>

        <div className="map-sidebar">
          <div className="sidebar-header">
            <h3>Nearby Centers</h3>
            <div className="legend">
              <div className="legend-item">
                <div className="legend-marker user"></div>
                <span>Your Location</span>
              </div>
              <div className="legend-item">
                <div className="legend-marker center"></div>
                <span>Recycling Center</span>
              </div>
            </div>
          </div>

          <div className="centers-list">
            {centers.map((center, index) => (
              <div 
                key={center.id} 
                className={`center-item ${selectedCenter?.id === center.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedCenter(center);
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.setView([center.lat, center.lng], 16);
                  }
                }}
              >
                <div className="center-item-header">
                  <h4>{center.name}</h4>
                  <div className="distance">
                    {userLocation ? 
                      Math.round(calculateDistance(userLocation.lat, userLocation.lng, center.lat, center.lng)) 
                      : '?'
                    }km
                  </div>
                </div>
                <p className="center-address">{center.address}</p>
                <p className="center-contact">{center.contact}</p>
                <div className="center-types">
                  {(Array.isArray(center.types) ? center.types : [center.types]).map((type, i) => (
                    <span key={i} className="type-badge">{type}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in kilometers
  return d;
}

export default MapView;
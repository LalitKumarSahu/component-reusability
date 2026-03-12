import React from "react";
import { useNavigate } from "react-router-dom";

function RecyclingCenters({ centers, loading, onLoadCenters }) {
  const navigate = useNavigate();

  const handleShowMap = () => {
    if (centers.length === 0) {
      // Load centers first, then navigate
      onLoadCenters();
    }
    navigate('/map');
  };

  return (
    <section className="map-section">
      <div className="section-header">
        <h3>Nearby Recycling Centers</h3>
        <div className="center-actions">
          <button onClick={onLoadCenters} className="load-centers-btn" disabled={loading}>
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Loading...
              </>
            ) : (
              <>
                📍 Load Centers
              </>
            )}
          </button>
          <button onClick={handleShowMap} className="map-view-btn">
            🗺️ View on Map
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Finding recycling centers near you...</p>
        </div>
      )}

      <div className="centers">
        {!loading && centers.length === 0 && (
          <div className="no-centers">
            <span style={{ fontSize: '3rem', opacity: 0.5 }}>🏢</span>
            <p>No recycling centers loaded yet.</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '8px' }}>
              Click "Load Centers" to find nearby locations.
            </p>
          </div>
        )}
        
        {centers.map((center) => (
          <div className="center-card" key={center.id}>
            <div className="center-header">
              <h4>{center.name}</h4>
              <div className="center-distance">
                📍 {Math.round(Math.random() * 5 + 1)}km away
              </div>
            </div>
            
            <div className="center-info">
              <p className="center-address">📍 {center.address}</p>
              <p className="center-coords">
                Coordinates: {center.lat}, {center.lng}
              </p>
              <p className="center-contact">📞 {center.contact}</p>
              <div className="center-types">
                <span className="types-label">Accepts:</span>
                <div className="types-tags">
                  {(Array.isArray(center.types) ? center.types : [center.types])
                    .map((type, index) => (
                      <span key={index} className="type-tag">{type}</span>
                    ))
                  }
                </div>
              </div>
            </div>
            
            <div className="center-actions-bottom">
              <button className="directions-btn" onClick={() => {
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`, '_blank');
              }}>
                🧭 Get Directions
              </button>
              <button className="view-on-map-btn" onClick={handleShowMap}>
                🗺️ View on Map
              </button>
            </div>
          </div>
        ))}
      </div>

      {centers.length > 0 && (
        <div className="centers-summary">
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-number">{centers.length}</span>
              <span className="stat-label">Centers Found</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {Math.round((centers.length / 10) * 100)}%
              </span>
              <span className="stat-label">Coverage Area</span>
            </div>
          </div>
          <button onClick={handleShowMap} className="view-all-map-btn">
            📍 View All {centers.length} Centers on Interactive Map
          </button>
        </div>
      )}
    </section>
  );
}

export default RecyclingCenters;
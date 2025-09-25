import React from "react";

function RecyclingCenters({ centers, loading }) {
  return (
    <section className="map-section">
      <h3>Nearby Recycling Centers</h3>
      {loading && <p>Loading recycling centers...</p>}
      <div className="centers">
        {!loading && centers.length === 0 && (
          <p>Click "Show Centers" in the header to load centers.</p>
        )}
        {centers.map((center) => (
          <div className="center-card" key={center.id}>
            <h4>{center.name}</h4>
            <p>{center.address}</p>
            <p>
              Lat: {center.lat}, Lng: {center.lng}
            </p>
            <p>{center.contact}</p>
            <p>
              {Array.isArray(center.types)
                ? center.types.join(", ")
                : center.types}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecyclingCenters;

import React from "react";

// Component icons mapping
const componentIcons = {
  'Battery': '🔋',
  'Screen': '📱',
  'Camera': '📷',
  'Charging Port': '⚡',
  'Speaker': '🔊',
  'Microphone': '🎤',
  'Motherboard': '💻',
  'Memory': '🧠',
  'Storage': '💾',
  'Processor': '⚙️',
  'Graphics Card': '🎮',
  'Power Supply': '🔌',
  'Fan': '🌪️',
  'Heat Sink': '🔥',
  'Keyboard': '⌨️',
  'Trackpad': '👆',
  'WiFi Card': '📶',
  'Bluetooth': '📡',
  'USB Port': '🔌',
  'HDMI Port': '📺',
  'Audio Jack': '🎧',
  'SIM Card': '📋',
  'Antenna': '📡',
  'Lens': '🔍',
  'Flash': '💡',
  'Sensor': '👁️',
  'Circuit Board': '🔧'
};

// Get icon for component, with fallback
const getComponentIcon = (component) => {
  const componentName = component.toString();
  
  // Direct match
  if (componentIcons[componentName]) {
    return componentIcons[componentName];
  }
  
  // Partial match
  for (const [key, icon] of Object.entries(componentIcons)) {
    if (componentName.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }
  
  // Default fallback based on common patterns
  if (componentName.toLowerCase().includes('port')) return '🔌';
  if (componentName.toLowerCase().includes('card')) return '💳';
  if (componentName.toLowerCase().includes('board')) return '🔧';
  if (componentName.toLowerCase().includes('chip')) return '⚙️';
  
  return '🔧'; // Default icon
};

function ComponentList({ device, components, loading, error }) {
  return (
    <section className="results">
      <h3>♻️ Reusable Components for {device}</h3>
      
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyzing {device} components...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <span>❌</span> {error}
        </div>
      )}
      
      {!loading && !error && components.length === 0 && (
        <div className="no-components">
          <span style={{ fontSize: '3rem', opacity: 0.5 }}>🔍</span>
          <p>No reusable components found for {device}.</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '8px' }}>
            Try selecting a different device type.
          </p>
        </div>
      )}
      
      {!loading && !error && components.length > 0 && (
        <>
          <div className="components-stats">
            <div className="stat-item">
              <span className="stat-number">{components.length}</span>
              <span className="stat-label">Reusable Parts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {Math.round((components.length / 10) * 100)}%
              </span>
              <span className="stat-label">Recyclable</span>
            </div>
          </div>
          
          <ul className="components-grid">
            {components.map((component, idx) => (
              <li 
                key={idx} 
                className="component-card"
                style={{ 
                  animationDelay: `${idx * 0.1}s`,
                  animation: 'slideUp 0.6s ease-out both'
                }}
              >
                <div className="component-icon">
                  {getComponentIcon(component)}
                </div>
                <div className="component-info">
                  <h4 className="component-name">{component}</h4>
                  <div className="component-tags">
                    <span className="tag recyclable">♻️ Recyclable</span>
                    <span className="tag reusable">🔄 Reusable</span>
                  </div>
                </div>
                <div className="component-action">
                  <button className="info-btn" title="More info">
                    ℹ️
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="recycling-tip">
            <div className="tip-icon">💡</div>
            <div className="tip-content">
              <h4>Pro Tip</h4>
              <p>Before recycling, consider if any of these components could be repurposed for DIY projects or donated to repair cafes!</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ComponentList;
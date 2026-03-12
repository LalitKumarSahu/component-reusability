import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePickup.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const itemCategories = {
  'Mobile':       { basePrice: 3500,  components: ["Battery","Screen","Camera","Charging Port","Speaker","Microphone","Motherboard"] },
  'Laptop':       { basePrice: 12000, components: ["RAM","HDD/SSD","Keyboard","Battery","Screen","Motherboard","Touchpad","Cooling Fan"] },
  'TV':           { basePrice: 8000,  components: ["Screen","Power Board","Speakers","Remote Sensor","Motherboard","HDMI Port"] },
  'Tablet':       { basePrice: 2500,  components: ["Battery","Screen","Charging Port","Camera","Speakers","Motherboard"] },
  'Desktop PC':   { basePrice: 10000, components: ["CPU","GPU","RAM","HDD/SSD","Motherboard","PSU","Cooling Fan"] },
  'Game Console': { basePrice: 7500,  components: ["Motherboard","HDMI Port","Controller Port","Cooling Fan","HDD/SSD","Power Supply"] },
  'Camera':       { basePrice: 5000,  components: ["Lens","Battery","Sensor","Screen","Memory Card Slot","Flash"] },
  'Headphones':   { basePrice: 1500,  components: ["Speakers","Battery","Bluetooth Module","Microphone","Charging Port"] },
  'Printer':      { basePrice: 2000,  components: ["Ink Cartridge/Toner","Paper Tray","Motherboard","Power Supply","Rollers","Screen"] },
};

function HomePickup() {
  const navigate = useNavigate();
  const [step, setStep]                   = useState(1);
  const [selectedItems, setSelectedItems] = useState({});
  const [totalEstimate, setTotalEstimate] = useState(0);
  const [images, setImages]               = useState([]);    // Actual file objects
  const [previews, setPreviews]           = useState([]);    // Preview URLs
  const [pickupDetails, setPickupDetails] = useState({
    name: '', email: '', phone: '', address: '', city: '', pincode: '', notes: ''
  });
  const [status, setStatus] = useState(''); // submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // Item select karna
  const handleItemChange = (category, component, quantity) => {
    const newItems = { ...selectedItems };
    const key = `${category}-${component}`;

    if (!quantity || quantity === '0') {
      delete newItems[key];
    } else {
      newItems[key] = {
        category,
        component,
        quantity:       parseInt(quantity),
        estimatedValue: itemCategories[category].basePrice * parseInt(quantity) * (Math.random() * 0.4 + 0.8),
      };
    }

    setSelectedItems(newItems);
    setTotalEstimate(Object.values(newItems).reduce((sum, item) => sum + item.estimatedValue, 0));
  };

  // Form fields
  const handleDetailChange = (field, value) =>
    setPickupDetails(prev => ({ ...prev, [field]: value }));

  // Images choose karna
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Max 5
    setImages(files);
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  // Ek image hatana
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Form submit — Real API call
  const submitPickupRequest = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      // FormData use karo kyunki images bhi bhejni hain
      const formData = new FormData();
      formData.append('customerName',  pickupDetails.name);
      formData.append('customerEmail', pickupDetails.email);
      formData.append('customerPhone', pickupDetails.phone);
      formData.append('address',       pickupDetails.address);
      formData.append('city',          pickupDetails.city);
      formData.append('pincode',       pickupDetails.pincode);
      formData.append('notes',         pickupDetails.notes);
      formData.append('totalEstimate', totalEstimate.toFixed(2));
      formData.append('items',         JSON.stringify(selectedItems));

      // Har image alag append karo
      images.forEach(img => formData.append('images', img));

      await axios.post(`${API}/api/pickup`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatus('success');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Kuch galat hua. Dobara try karo.');
      setStatus('error');
    }
  };

  // Success screen
  if (status === 'success') {
    return (
      <div className="pickup-success">
        <div className="success-content">
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
          <h2>Pickup Request Submit Ho Gayi!</h2>
          <p>24 ghante mein contact karenge pickup confirm karne ke liye.</p>
          <p>Estimated value: <strong>₹{totalEstimate.toFixed(2)}</strong></p>
          {images.length > 0 && <p>📷 {images.length} photo(s) upload ho gayi.</p>}
          <button className="next-btn" style={{ marginTop: 24 }} onClick={() => navigate('/')}>
            Home par Jao
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-pickup-container">
      <div className="pickup-header">
        <button onClick={() => navigate('/')} className="back-btn">← Back to Home</button>
        <h1>🚚 Home Pickup Service</h1>
        <div className="step-indicator">
          <span className={step >= 1 ? 'active' : ''}>1. Items Chunna</span>
          <span className={step >= 2 ? 'active' : ''}>2. Estimate Dekhna</span>
          <span className={step >= 3 ? 'active' : ''}>3. Details Bharna</span>
        </div>
      </div>

      {/* ── Step 1: Items aur Images ── */}
      {step === 1 && (
        <div className="step-content">
          <h2>Kaunse items recycle karwane hain?</h2>
          <p>Device chunno aur quantity likho:</p>

          <div className="items-grid">
            {Object.entries(itemCategories).map(([category, data]) => (
              <div key={category} className="category-section">
                <h3>{category}</h3>
                <div className="items-list">
                  {data.components.map(component => (
                    <div key={component} className="item-input">
                      <label>{component}</label>
                      <input
                        type="number" min="0" max="10" placeholder="0"
                        onChange={e => handleItemChange(category, component, e.target.value)}
                      />
                      <span className="base-price">
                        ~₹{Math.round(data.basePrice / data.components.length)} each
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Image Upload */}
          <div style={{
            background: 'var(--surface-light)', border: '2px dashed var(--border)',
            borderRadius: 16, padding: 24, margin: '24px 0', textAlign: 'center'
          }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: 8 }}>
              📸 Device ki Photos Upload Karo (Optional)
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16, fontSize: '0.9rem' }}>
              Photos se better valuation milta hai. Max 5 photos.
            </p>
            <label style={{ cursor: 'pointer' }}>
              <input type="file" multiple accept="image/*" onChange={handleImageChange}
                style={{ display: 'none' }} />
              <span style={{
                display: 'inline-block', background: 'var(--gradient-primary)',
                color: 'white', borderRadius: 12, padding: '12px 24px',
                fontWeight: 600, transition: 'all 0.3s'
              }}>
                📷 Photos Chunno
              </span>
            </label>

            {previews.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 16 }}>
                {previews.map((src, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img src={src} alt={`Device ${i + 1}`} style={{
                      width: 90, height: 90, objectFit: 'cover',
                      borderRadius: 10, border: '2px solid var(--border)'
                    }} />
                    <button onClick={() => removeImage(i)} style={{
                      position: 'absolute', top: -6, right: -6,
                      background: '#e53935', color: 'white', border: 'none',
                      borderRadius: '50%', width: 22, height: 22,
                      fontSize: 11, cursor: 'pointer'
                    }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="step-actions">
            <button
              onClick={() => setStep(2)}
              disabled={Object.keys(selectedItems).length === 0}
              className="next-btn"
            >
              Aage Jao ({Object.keys(selectedItems).length} items)
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Review ── */}
      {step === 2 && (
        <div className="step-content">
          <h2>Items aur Estimate Check Karo</h2>

          <div className="selected-items">
            {Object.entries(selectedItems).map(([key, item]) => (
              <div key={key} className="selected-item">
                <span className="item-name">{item.component} ({item.category})</span>
                <span className="item-qty">Qty: {item.quantity}</span>
                <span className="item-value">₹{item.estimatedValue.toFixed(2)}</span>
              </div>
            ))}
          </div>

          {previews.length > 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 16 }}>
              📷 {previews.length} photo(s) attach hain
            </p>
          )}

          <div className="estimate-summary">
            <h3>Total Estimated Value: ₹{totalEstimate.toFixed(2)}</h3>
            <p className="disclaimer">* Ye sirf estimate hai. Final value inspection ke baad milegi.</p>
          </div>

          <div className="step-actions">
            <button onClick={() => setStep(1)} className="back-step-btn">← Items Edit Karo</button>
            <button onClick={() => setStep(3)} className="next-btn">Details Bharo</button>
          </div>
        </div>
      )}

      {/* ── Step 3: Pickup Details ── */}
      {step === 3 && (
        <div className="step-content">
          <h2>Pickup Details</h2>
          <p>Apne ghar se pickup karenge!</p>

          <form onSubmit={submitPickupRequest} className="pickup-form">
            <div className="form-row">
              <div className="form-group">
                <label>Poora Naam *</label>
                <input type="text" required placeholder="Tumhara naam"
                  value={pickupDetails.name}
                  onChange={e => handleDetailChange('name', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" required placeholder="email@example.com"
                  value={pickupDetails.email}
                  onChange={e => handleDetailChange('email', e.target.value)} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" required placeholder="+91 XXXXX XXXXX"
                  value={pickupDetails.phone}
                  onChange={e => handleDetailChange('phone', e.target.value)} />
              </div>
              <div className="form-group">
                <label>PIN Code *</label>
                <input type="text" required placeholder="226001"
                  value={pickupDetails.pincode}
                  onChange={e => handleDetailChange('pincode', e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label>Poora Address *</label>
              <textarea required rows="3" placeholder="Ghar number, gali, landmark..."
                value={pickupDetails.address}
                onChange={e => handleDetailChange('address', e.target.value)} />
            </div>

            <div className="form-group">
              <label>Sheher *</label>
              <input type="text" required placeholder="Lucknow"
                value={pickupDetails.city}
                onChange={e => handleDetailChange('city', e.target.value)} />
            </div>

            <div className="form-group">
              <label>Kuch aur batana hai? (Optional)</label>
              <textarea rows="2" placeholder="Kab contact karein, koi khas instructions..."
                value={pickupDetails.notes}
                onChange={e => handleDetailChange('notes', e.target.value)} />
            </div>

            {/* Error message */}
            {status === 'error' && (
              <p style={{ color: '#e53935', textAlign: 'center', fontWeight: 600 }}>
                ❌ {errorMsg}
              </p>
            )}

            <div className="step-actions">
              <button type="button" onClick={() => setStep(2)} className="back-step-btn">
                ← Wapas Jao
              </button>
              <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submit ho raha hai...' : 'Pickup Schedule Karo 🚚'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default HomePickup;
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
  const [images, setImages]               = useState([]);    
  const [previews, setPreviews]           = useState([]);    
  const [pickupDetails, setPickupDetails] = useState({
    name: '', email: '', phone: '', address: '', city: '', pincode: '', notes: ''
  });
  const [status, setStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle item selection
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

  // Handle form fields
  const handleDetailChange = (field, value) =>
    setPickupDetails(prev => ({ ...prev, [field]: value }));

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  // Remove a selected image
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Submit form — real API call
  const submitPickupRequest = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
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

      images.forEach(img => formData.append('images', img));

      await axios.post(`${API}/api/pickup`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatus('success');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  // Success screen
  if (status === 'success') {
    return (
      <div className="pickup-success">
        <div className="success-content">
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
          <h2>Pickup Request Submitted!</h2>
          <p>We will contact you within 24 hours to confirm pickup.</p>
          <p>Estimated value: <strong>₹{totalEstimate.toFixed(2)}</strong></p>
          {images.length > 0 && <p>📷 {images.length} photo(s) uploaded.</p>}
          <button className="next-btn" style={{ marginTop: 24 }} onClick={() => navigate('/')}>
            Go to Home
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
          <span className={step >= 1 ? 'active' : ''}>1. Select Items</span>
          <span className={step >= 2 ? 'active' : ''}>2. Review Estimate</span>
          <span className={step >= 3 ? 'active' : ''}>3. Fill Details</span>
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="step-content">
          <h2>Which items do you want to recycle?</h2>
          <p>Select devices and enter quantity:</p>

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

          <div className="step-actions">
            <button
              onClick={() => setStep(2)}
              disabled={Object.keys(selectedItems).length === 0}
              className="next-btn"
            >
              Continue ({Object.keys(selectedItems).length} items)
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="step-content">
          <h2>Review Items and Estimate</h2>

          <div className="selected-items">
            {Object.entries(selectedItems).map(([key, item]) => (
              <div key={key} className="selected-item">
                <span>{item.component} ({item.category})</span>
                <span>Qty: {item.quantity}</span>
                <span>₹{item.estimatedValue.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="estimate-summary">
            <h3>Total Estimated Value: ₹{totalEstimate.toFixed(2)}</h3>
            <p>*Final value will be confirmed after inspection.</p>
          </div>

          <div className="step-actions">
            <button onClick={() => setStep(1)} className="back-step-btn">← Edit Items</button>
            <button onClick={() => setStep(3)} className="next-btn">Enter Details</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="step-content">
          <h2>Pickup Details</h2>
          <p>We will collect from your doorstep!</p>

          <form onSubmit={submitPickupRequest} className="pickup-form">

            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" required placeholder="Your name"
                value={pickupDetails.name}
                onChange={e => handleDetailChange('name', e.target.value)} />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input type="email" required placeholder="email@example.com"
                value={pickupDetails.email}
                onChange={e => handleDetailChange('email', e.target.value)} />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input type="tel" required placeholder="+91 XXXXX XXXXX"
                value={pickupDetails.phone}
                onChange={e => handleDetailChange('phone', e.target.value)} />
            </div>

            <div className="form-group">
              <label>Address *</label>
              <textarea required rows="3"
                value={pickupDetails.address}
                onChange={e => handleDetailChange('address', e.target.value)} />
            </div>

            <div className="form-group">
              <label>City *</label>
              <input type="text"
                value={pickupDetails.city}
                onChange={e => handleDetailChange('city', e.target.value)} />
            </div>

            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea rows="2"
                value={pickupDetails.notes}
                onChange={e => handleDetailChange('notes', e.target.value)} />
            </div>

            {status === 'error' && (
              <p style={{ color: 'red' }}>❌ {errorMsg}</p>
            )}

            <button type="submit" className="submit-btn">
              {status === 'submitting' ? 'Submitting...' : 'Schedule Pickup 🚚'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HomePickup;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePickup.css';

// Item categories matching your backend data with estimated values (in INR)
const itemCategories = {
  'Mobile': { 
    basePrice: 3500, 
    components: ["Battery", "Screen", "Camera", "Charging Port", "Speaker", "Microphone", "Motherboard"]
  },
  'Laptop': { 
    basePrice: 12000, 
    components: ["RAM", "HDD/SSD", "Keyboard", "Battery", "Screen", "Motherboard", "Touchpad", "Cooling Fan"]
  },
  'TV': { 
    basePrice: 8000, 
    components: ["Screen", "Power Board", "Speakers", "Remote Sensor", "Motherboard", "HDMI Port"]
  },
  'Tablet': { 
    basePrice: 2500, 
    components: ["Battery", "Screen", "Charging Port", "Camera", "Speakers", "Motherboard"]
  },
  'Desktop PC': { 
    basePrice: 10000, 
    components: ["CPU", "GPU", "RAM", "HDD/SSD", "Motherboard", "PSU", "Cooling Fan"]
  },
  'Game Console': { 
    basePrice: 7500, 
    components: ["Motherboard", "HDMI Port", "Controller Port", "Cooling Fan", "HDD/SSD", "Power Supply"]
  },
  'Camera': { 
    basePrice: 5000, 
    components: ["Lens", "Battery", "Sensor", "Screen", "Memory Card Slot", "Flash"]
  },
  'Headphones': { 
    basePrice: 1500, 
    components: ["Speakers", "Battery", "Bluetooth Module", "Microphone", "Charging Port"]
  },
  'Printer': { 
    basePrice: 2000, 
    components: ["Ink Cartridge/Toner", "Paper Tray", "Motherboard", "Power Supply", "Rollers", "Screen"]
  }
};

function HomePickup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState({});
  const [totalEstimate, setTotalEstimate] = useState(0);
  const [pickupDetails, setPickupDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState('');

  // Add/remove items and calculate estimate
  const handleItemChange = (category, component, quantity) => {
    const newItems = { ...selectedItems };
    
    if (quantity === 0 || quantity === '') {
      delete newItems[`${category}-${component}`];
    } else {
      newItems[`${category}-${component}`] = {
        category,
        component,
        quantity: parseInt(quantity),
        estimatedValue: itemCategories[category].basePrice * parseInt(quantity) * (Math.random() * 0.4 + 0.8) // Add some randomness
      };
    }
    
    setSelectedItems(newItems);
    
    // Calculate total
    const total = Object.values(newItems).reduce((sum, item) => sum + item.estimatedValue, 0);
    setTotalEstimate(total);
  };

  // Handle pickup details form
  const handleDetailChange = (field, value) => {
    setPickupDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Submit pickup request
  const submitPickupRequest = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    
    const pickupRequest = {
      items: selectedItems,
      totalEstimate,
      customerDetails: pickupDetails,
      timestamp: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
      console.log('Pickup Request:', pickupRequest);
      setSubmissionStatus('success');
      
      // Reset after 3 seconds and go back to home
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  if (submissionStatus === 'success') {
    return (
      <div className="pickup-success">
        <div className="success-content">
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
          <h2>Pickup Request Submitted!</h2>
          <p>We'll contact you within 24 hours to confirm your pickup.</p>
          <p>Estimated value: <strong>₹{totalEstimate.toFixed(2)}</strong></p>
          <p>Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-pickup-container">
      <div className="pickup-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Home
        </button>
        <h1>🚚 Home Pickup Service</h1>
        <div className="step-indicator">
          <span className={step >= 1 ? 'active' : ''}>1. Select Items</span>
          <span className={step >= 2 ? 'active' : ''}>2. Review Estimate</span>
          <span className={step >= 3 ? 'active' : ''}>3. Pickup Details</span>
        </div>
      </div>

      {step === 1 && (
        <div className="step-content">
          <h2>What items do you want to recycle?</h2>
          <p>Select the devices you have and enter the quantity:</p>
          
          <div className="items-grid">
            {Object.entries(itemCategories).map(([category, data]) => (
              <div key={category} className="category-section">
                <h3>{category}</h3>
                <div className="items-list">
                  {data.components.map(component => (
                    <div key={component} className="item-input">
                      <label>{component}</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        placeholder="0"
                        onChange={(e) => handleItemChange(category, component, e.target.value)}
                      />
                      <span className="base-price">~₹{Math.round(data.basePrice / data.components.length)} each</span>
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
              Review Items ({Object.keys(selectedItems).length})
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step-content">
          <h2>Review Your Items & Estimate</h2>
          
          <div className="selected-items">
            {Object.entries(selectedItems).map(([key, item]) => (
              <div key={key} className="selected-item">
                <span className="item-name">{item.component} ({item.category})</span>
                <span className="item-qty">Qty: {item.quantity}</span>
                <span className="item-value">₹{item.estimatedValue.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="estimate-summary">
            <h3>Total Estimated Value: ₹{totalEstimate.toFixed(2)}</h3>
            <p className="disclaimer">
              * This is a preliminary estimate. Final value will be determined after physical inspection.
            </p>
          </div>

          <div className="step-actions">
            <button onClick={() => setStep(1)} className="back-step-btn">
              ← Edit Items
            </button>
            <button onClick={() => setStep(3)} className="next-btn">
              Proceed to Pickup Details
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step-content">
          <h2>Pickup Details</h2>
          <p>We'll collect your items from your doorstep!</p>
          
          <form onSubmit={submitPickupRequest} className="pickup-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  value={pickupDetails.name}
                  onChange={(e) => handleDetailChange('name', e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  required
                  value={pickupDetails.email}
                  onChange={(e) => handleDetailChange('email', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={pickupDetails.phone}
                  onChange={(e) => handleDetailChange('phone', e.target.value)}
                  placeholder="+91 234 567 8900"
                />
              </div>
              <div className="form-group">
                <label>PIN Code *</label>
                <input
                  type="text"
                  required
                  value={pickupDetails.pincode}
                  onChange={(e) => handleDetailChange('pincode', e.target.value)}
                  placeholder="123456"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Complete Address *</label>
              <textarea
                required
                value={pickupDetails.address}
                onChange={(e) => handleDetailChange('address', e.target.value)}
                placeholder="House/Apt number, Street, Landmark..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                required
                value={pickupDetails.city}
                onChange={(e) => handleDetailChange('city', e.target.value)}
                placeholder="Your city"
              />
            </div>

            <div className="form-group">
              <label>Additional Notes (Optional)</label>
              <textarea
                value={pickupDetails.notes}
                onChange={(e) => handleDetailChange('notes', e.target.value)}
                placeholder="Best time to contact, special instructions, etc."
                rows="2"
              />
            </div>

            <div className="pickup-summary">
              <h4>Pickup Summary:</h4>
              <p>Items: {Object.keys(selectedItems).length} different items</p>
              <p>Estimated Value: <strong>₹{totalEstimate.toFixed(2)}</strong></p>
              <p>We'll contact you within 24 hours to schedule pickup!</p>
            </div>

            <div className="step-actions">
              <button type="button" onClick={() => setStep(2)} className="back-step-btn">
                ← Back to Review
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={submissionStatus === 'submitting'}
              >
                {submissionStatus === 'submitting' ? 'Submitting...' : 'Schedule Pickup 🚚'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default HomePickup;
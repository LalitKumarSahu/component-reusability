import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App(){
  const [device, setDevice] = useState('Mobile');
  const [components, setComponents] = useState([]);
  const [centers, setCenters] = useState([]);
  const [loadingComponents, setLoadingComponents] = useState(false);
  const [loadingCenters, setLoadingCenters] = useState(false);
  const [error, setError] = useState('');

  // Initial fetch when component mounts or device changes
  useEffect(() => {
    fetchComponents();
  }, [device]); // Re-fetch components when device changes

  const fetchComponents = async () => {
    setLoadingComponents(true);
    setError('');
    try {
      const res = await axios.get(`http://localhost:5000/api/components/${device}`);
      setComponents(res.data.components || []);
    } catch (e) {
      console.error("Error fetching components:", e);
      setError('Could not fetch components. Make sure backend is running and device exists.');
      setComponents([]);
    } finally {
      setLoadingComponents(false);
    }
  };

  const fetchCenters = async () => {
    setLoadingCenters(true);
    try {
      const res = await axios.get('http://localhost:5000/api/recycling-centers');
      setCenters(res.data || []);
    } catch (e) {
      console.error("Error fetching recycling centers:", e);
      setError('Could not fetch recycling centers.');
      setCenters([]);
    } finally {
      setLoadingCenters(false);
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h1>Component Reusability</h1>
        <div className="nav-links">
          {/* <button onClick={fetchComponents}>Refresh Components</button> */}
          <button onClick={fetchCenters}>Show Recycling Centers</button>
        </div>
      </nav>

      <main>
       <section className="hero">
          <h2>Choose a device to see reusable parts</h2>
          <select value={device} onChange={(e) => setDevice(e.target.value)}>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="TV">TV</option>
            <option value="Tablet">Tablet</option>
            <option value="Desktop PC">Desktop PC</option>
            <option value="Game Console">Game Console</option>
            <option value="Camera">Camera</option>
            <option value="Headphones">Headphones</option>
            <option value="Printer">Printer</option>
          </select>
          {/* Removed redundant fetch button here as components fetch on device change */}
        </section>
        <section className="results">
          <h3>Reusable Components for {device}</h3>
          {loadingComponents && <p>Loading components...</p>}
          {error && <p className="error">{error}</p>}
          {!loadingComponents && !error && components.length === 0 && <p>No components found for {device}.</p>}
          <ul>
            {components.map((c, idx)=> <li key={idx}>{c}</li>)}
          </ul>
        </section>

       <section className="map-section">
          <h3>Nearby Recycling Centers (dummy data)</h3>
          {loadingCenters && <p>Loading recycling centers...</p>}
          <div className="centers">
            {!loadingCenters && centers.length === 0 && (
              <p>Click "Show Recycling Centers" to load dummy centers.</p>
            )}
            {centers.map((center) => (
              <div className="center-card" key={center.id}>
                <h4>{center.name}</h4>
                <p>{center.address}</p>
                <p>
                  Lat: {center.lat}, Lng: {center.lng}
                </p>
                <p>{center.contact}</p>
                <p>{Array.isArray(center.types) ? center.types.join(", ") : center.types}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="feedback">
          <h3>Share Your Recycling Experience</h3>
          <FeedbackForm device={device} />
        </section>
      </main>

      <footer>
        <p>Made for hackathon — Component Reusability</p>
      </footer>
    </div>
  );
}

function FeedbackForm({device}){
  const [recycled, setRecycled] = useState('no');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = async (e) => { // Made async to simulate API call
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log({ device, recycled, notes });
    // try {
    //   await axios.post('http://localhost:5000/api/feedback', { device, recycled, notes });
    //   setSubmitted(true);
    //   setTimeout(()=>setSubmitted(false), 2000);
    //   setRecycled('no');
    //   setNotes('');
    // } catch (error) {
    //   console.error("Error submitting feedback:", error);
    //   // Handle error, show error message to user
    // }

    // For demo purposes:
    setSubmitted(true);
    setTimeout(()=>setSubmitted(false), 2000);
    setRecycled('no'); setNotes('');
  };

  return (
    <form onSubmit={submit} className="feedback-form">
      <label>Device: <strong>{device}</strong></label>
      <label htmlFor="recycled-status">Did you recycle successfully?</label>
      <select id="recycled-status" value={recycled} onChange={(e)=>setRecycled(e.target.value)}>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      <label htmlFor="notes">Notes (optional)</label>
      <textarea id="notes" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Any comments about the recycling process?" />
      <button type="submit">Submit Feedback</button>
      {submitted && <p className="success">Thanks! Feedback recorded (demo only).</p>}
    </form>
  );
}

export default App;
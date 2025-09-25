import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DeviceSelector from "./components/DeviceSelector";
import ComponentList from "./components/ComponentList";
import RecyclingCenters from "./components/RecyclingCenters";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  const navigate = useNavigate();
  const [device, setDevice] = useState("Mobile");
  const [components, setComponents] = useState([]);
  const [centers, setCenters] = useState([]);
  const [loadingComponents, setLoadingComponents] = useState(false);
  const [loadingCenters, setLoadingCenters] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComponents();
  }, [device]);

  const fetchComponents = async () => {
    setLoadingComponents(true);
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:5000/api/components/${device}`
      );
      setComponents(res.data.components || []);
    } catch (e) {
      console.error("Error fetching components:", e);
      setError(
        "Could not fetch components. Make sure backend is running and device exists."
      );
      setComponents([]);
    } finally {
      setLoadingComponents(false);
    }
  };

  const fetchCenters = async () => {
    setLoadingCenters(true);
    setError("");
    try {
      const res = await axios.get(
        "http://localhost:5000/api/recycling-centers"
      );
      setCenters(res.data || []);
    } catch (e) {
      console.error("Error fetching recycling centers:", e);
      setError("Could not fetch recycling centers.");
      setCenters([]);
    } finally {
      setLoadingCenters(false);
    }
  };

  const handleHomePickup = () => {
    navigate("/home-pickup");
  };

  return (
    <>
      <Header />
      <div className="container">
        <main style={{ marginTop: 34, padding: "1rem" }}>
          <DeviceSelector device={device} setDevice={setDevice} />
          <ComponentList
            device={device}
            components={components}
            loading={loadingComponents}
            error={error}
          />
          <RecyclingCenters 
            centers={centers} 
            loading={loadingCenters} 
            onLoadCenters={fetchCenters} 
          />

          {/* Home Pickup CTA Section */}
          <section className="pickup-cta">
            <div className="cta-content">
              <div className="cta-text">
                <h3>🚚 Too many items to bring yourself?</h3>
                <p>
                  Get a free pickup from your home! We'll evaluate your items
                  and pay you on the spot.
                </p>
                <div className="cta-features">
                  <span>✅ Free doorstep pickup</span>
                  <span>✅ Instant valuation</span>
                  <span>✅ Secure payment</span>
                </div>
              </div>
              <button onClick={handleHomePickup} className="pickup-cta-btn">
                Schedule Home Pickup
              </button>
            </div>
          </section>

          <FeedbackForm device={device} />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Home
        </button>
        <h1>About ReUseIt</h1>
        <p className="about-subtitle">Creating a sustainable future through responsible e-waste management</p>
      </div>

      <div className="about-content">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            ReUseIt is your comprehensive electronic waste recycling platform, dedicated to creating a sustainable future through responsible e-waste management. We believe every electronic device has value beyond its initial use, and our mission is to maximize the reuse and recycling of electronic components while providing fair compensation to device owners.
          </p>
        </section>

        <section className="services-section">
          <h2>What We Do</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Component Analysis</h3>
              <p>Identify reusable parts in your electronic devices using advanced algorithms and expert knowledge.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💰</div>
              <h3>Fair Valuation</h3>
              <p>Provide transparent pricing for your recyclable electronics based on current market rates and component condition.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🚚</div>
              <h3>Convenient Pickup</h3>
              <p>Free doorstep collection service across major cities with flexible scheduling and professional handling.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3>Recycling Network</h3>
              <p>Connect you with verified recycling centers nationwide through our comprehensive partner network.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🌱</div>
              <h3>Environmental Impact</h3>
              <p>Track and reduce electronic waste in landfills while promoting circular economy principles.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🤖</div>
              <h3>AI-Powered Support</h3>
              <p>Get instant guidance and support through our intelligent chatbot system for all recycling queries.</p>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <h2>Why Choose ReUseIt?</h2>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-check">✅</span>
              <div className="benefit-text">
                <h4>Instant Analysis</h4>
                <p>Component analysis for 9+ device types including mobiles, laptops, TVs, and more</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-check">✅</span>
              <div className="benefit-text">
                <h4>AI-Powered Guidance</h4>
                <p>Get expert recycling advice and support through our intelligent assistant</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-check">✅</span>
              <div className="benefit-text">
                <h4>Secure & Transparent</h4>
                <p>Safe payment processing and complete data protection for all transactions</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-check">✅</span>
              <div className="benefit-text">
                <h4>Environmental Impact</h4>
                <p>Contributing to circular economy and reducing electronic waste footprint</p>
              </div>
            </div>
          </div>
        </section>

        <section className="impact-section">
          <h2>Our Impact</h2>
          <div className="impact-stats">
            <div className="stat-box">
              <h3>50,000+</h3>
              <p>Devices Recycled</p>
            </div>
            <div className="stat-box">
              <h3>200+</h3>
              <p>Tons of E-Waste Diverted</p>
            </div>
            <div className="stat-box">
              <h3>15,000+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-box">
              <h3>95%</h3>
              <p>Customer Satisfaction</p>
            </div>
          </div>
          <p className="impact-description">
            Since our launch, we've helped recycle thousands of electronic devices, prevented hundreds of tons of e-waste from reaching landfills, and created economic value for users across India while promoting environmental sustainability.
          </p>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Join Our Mission</h2>
            <p>Ready to make a positive impact on the environment while earning from your old electronics?</p>
            <button onClick={() => navigate('/')} className="home-cta-btn">
              Start Recycling Today
            </button>
          </div>
        </section>
      </div>

      <style jsx>{`
        .about-container {
          min-height: 100vh;
          background: var(--background);
          padding: 20px;
        }

        .about-header {
          max-width: 1200px;
          margin: 0 auto 40px auto;
          text-align: center;
          position: relative;
        }

        .back-btn {
          position: absolute;
          left: 0;
          top: 0;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 20px;
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
        }

        .about-header h1 {
          font-size: 3rem;
          font-weight: 800;
          background: var(--gradient-primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 16px;
        }

        .about-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          font-weight: 500;
          margin-top: 16px;
        }

        .about-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .about-content section {
          background: var(--gradient-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 40px;
          margin-bottom: 32px;
          animation: slideUp 0.6s ease-out;
        }

        .about-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 24px;
          text-align: center;
        }

        .about-content p {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 1.1rem;
          text-align: center;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .service-card {
          background: var(--surface-light);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.1), transparent);
          transition: left 0.5s;
        }

        .service-card:hover::before {
          left: 100%;
        }

        .service-card:hover {
          transform: translateY(-8px);
          border-color: var(--primary);
          box-shadow: 0 20px 40px rgba(76, 175, 80, 0.2);
        }

        .service-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .service-card h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 12px;
        }

        .service-card p {
          color: var(--text-secondary);
          font-size: 1rem;
          text-align: center;
        }

        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 32px;
        }

        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: var(--surface-light);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .benefit-item:hover {
          transform: translateX(8px);
          box-shadow: 0 8px 20px rgba(76, 175, 80, 0.1);
        }

        .benefit-check {
          font-size: 1.2rem;
          color: var(--success);
          flex-shrink: 0;
        }

        .benefit-text h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .benefit-text p {
          color: var(--text-secondary);
          font-size: 1rem;
          text-align: left;
        }

        .impact-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin: 32px 0;
        }

        .stat-box {
          background: var(--surface-light);
          border: 2px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-box:hover {
          border-color: var(--primary);
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(76, 175, 80, 0.2);
        }

        .stat-box h3 {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 8px;
        }

        .stat-box p {
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 1rem;
        }

        .impact-description {
          text-align: center;
          margin-top: 32px;
          font-size: 1.1rem;
        }

        .cta-section {
          background: var(--gradient-primary);
          color: white;
          text-align: center;
        }

        .cta-section h2 {
          color: white;
          margin-bottom: 16px;
        }

        .cta-section p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          margin-bottom: 24px;
        }

        .home-cta-btn {
          background: white;
          color: var(--primary);
          border: none;
          border-radius: 12px;
          padding: 16px 32px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .home-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .about-header h1 {
            font-size: 2.5rem;
          }

          .about-content section {
            padding: 24px;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .impact-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .back-btn {
            position: static;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default About;
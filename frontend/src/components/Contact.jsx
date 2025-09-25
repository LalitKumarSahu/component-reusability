import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Contact Form Submitted:', formData);
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: 'general',
          message: ''
        });
        setSubmitStatus('');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Home
        </button>
        <h1>Contact Us</h1>
        <p className="contact-subtitle">We're here to help with all your recycling needs</p>
      </div>

      <div className="contact-content">
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info">
            <div className="info-section">
              <h2>Get In Touch</h2>
              <p>Have questions about recycling, pickup services, or need technical support? We're here to help!</p>
            </div>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📧</div>
                <div className="method-info">
                  <h3>Email Support</h3>
                  <p>hello@reuseit.com</p>
                  <p>Response within 24 hours</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">📱</div>
                <div className="method-info">
                  <h3>Phone Support</h3>
                  <p>+91 12345 67890</p>
                  <p>Mon-Sat: 9:00 AM - 7:00 PM IST</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">💬</div>
                <div className="method-info">
                  <h3>Live Chat</h3>
                  <p>AI-powered instant support</p>
                  <p>Available 24/7 (bottom-right corner)</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">🏢</div>
                <div className="method-info">
                  <h3>Office Address</h3>
                  <p>123 Green Tower, Eco Park</p>
                  <p>Electronic City, Bangalore - 560100</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-buttons">
                <a href="#" className="social-btn twitter">Twitter</a>
                <a href="#" className="social-btn linkedin">LinkedIn</a>
                <a href="#" className="social-btn instagram">Instagram</a>
                <a href="#" className="social-btn facebook">Facebook</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                >
                  <option value="general">General Inquiry</option>
                  <option value="pickup">Pickup Service</option>
                  <option value="technical">Technical Support</option>
                  <option value="pricing">Pricing Questions</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  rows="6"
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="success-message">
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How does the pickup service work?</h3>
              <p>Schedule a free pickup through our platform, we'll visit your location, evaluate your devices, and pay you on the spot for accepted items.</p>
            </div>
            <div className="faq-item">
              <h3>What devices do you accept?</h3>
              <p>We accept mobiles, laptops, TVs, tablets, desktop PCs, game consoles, cameras, headphones, and printers in any condition.</p>
            </div>
            <div className="faq-item">
              <h3>How is the pricing determined?</h3>
              <p>Pricing is based on device condition, market demand for components, and current material values. We provide transparent estimates upfront.</p>
            </div>
            <div className="faq-item">
              <h3>Is my data secure?</h3>
              <p>Yes! We recommend data wiping before pickup, and our certified technicians ensure complete data destruction for additional security.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="contact-cta">
          <div className="cta-content">
            <h2>Ready to Start Recycling?</h2>
            <p>Join thousands of users who are making a positive environmental impact while earning money.</p>
            <button onClick={() => navigate('/')} className="home-cta-btn">
              Start Your Recycling Journey
            </button>
          </div>
        </section>
      </div>

      <style jsx>{`
        .contact-container {
          min-height: 100vh;
          background: var(--background);
          padding: 20px;
        }

        .contact-header {
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

        .contact-header h1 {
          font-size: 3rem;
          font-weight: 800;
          background: var(--gradient-accent);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 16px;
        }

        .contact-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .contact-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .contact-info,
        .contact-form-section {
          background: var(--gradient-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 40px;
          animation: slideUp 0.6s ease-out;
        }

        .info-section h2,
        .contact-form-section h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .info-section p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 32px;
        }

        .contact-method {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: var(--surface-light);
          border: 1px solid var(--border);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .contact-method:hover {
          transform: translateX(8px);
          border-color: var(--accent);
          box-shadow: 0 8px 20px rgba(38, 166, 154, 0.1);
        }

        .method-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .method-info h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 8px;
        }

        .method-info p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 4px;
        }

        .social-links h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .social-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .social-btn {
          background: var(--surface-light);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 16px;
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .social-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
        }

        .social-btn.twitter:hover { background: #1da1f2; color: white; }
        .social-btn.linkedin:hover { background: #0077b5; color: white; }
        .social-btn.instagram:hover { background: #e4405f; color: white; }
        .social-btn.facebook:hover { background: #1877f2; color: white; }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 8px;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          background: var(--surface-light);
          border: 2px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          color: var(--text-primary);
          font-size: 1rem;
          transition: all 0.3s ease;
          resize: vertical;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 4px rgba(38, 166, 154, 0.2);
        }

        .submit-btn {
          background: var(--gradient-accent);
          border: none;
          border-radius: 12px;
          padding: 16px 32px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .submit-btn:hover::before {
          left: 100%;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(38, 166, 154, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .success-message {
          background: rgba(46, 125, 50, 0.1);
          color: var(--success);
          border: 1px solid rgba(46, 125, 50, 0.3);
          border-radius: 8px;
          padding: 16px;
          font-weight: 500;
          animation: slideUp 0.3s ease-out;
        }

        .faq-section,
        .contact-cta {
          background: var(--gradient-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 40px;
          margin-bottom: 32px;
          animation: slideUp 0.8s ease-out;
        }

        .faq-section h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 32px;
          text-align: center;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .faq-item {
          background: var(--surface-light);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 8px 20px rgba(38, 166, 154, 0.1);
        }

        .faq-item h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 12px;
        }

        .faq-item p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .contact-cta {
          background: var(--gradient-accent);
          color: white;
          text-align: center;
        }

        .contact-cta h2 {
          color: white;
          font-size: 2rem;
          margin-bottom: 16px;
        }

        .contact-cta p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          margin-bottom: 24px;
        }

        .home-cta-btn {
          background: white;
          color: var(--accent);
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
          .contact-header h1 {
            font-size: 2.5rem;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .contact-info,
          .contact-form-section,
          .faq-section,
          .contact-cta {
            padding: 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .faq-grid {
            grid-template-columns: 1fr;
          }

          .back-btn {
            position: static;
            margin-bottom: 20px;
          }

          .social-buttons {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;
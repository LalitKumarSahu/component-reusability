import React, { useState, useRef, useEffect } from 'react';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hi! I\'m EcoBot, your recycling assistant. I can help you with device recycling questions, find nearby centers, or guide you through the home pickup process!',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "What can I recycle?",
    "Find recycling centers",
    "Schedule pickup",
    "Device components",
    "Recycling tips"
  ];

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('recycle') || lowerMessage.includes('what can')) {
      return "You can recycle various electronic devices including mobiles, laptops, TVs, tablets, and more! Each device has valuable components like batteries, screens, and motherboards that can be reused. Would you like to know about a specific device?";
    }
    
    if (lowerMessage.includes('center') || lowerMessage.includes('location') || lowerMessage.includes('find')) {
      return "I can help you find nearby recycling centers! Click the 'Load Centers' button on the main page, or use the map view to see all locations with directions. Most centers accept electronics and offer fair prices for components.";
    }
    
    if (lowerMessage.includes('pickup') || lowerMessage.includes('schedule') || lowerMessage.includes('home')) {
      return "Great choice! Our home pickup service offers free doorstep collection with instant valuation and secure payment. Click 'Schedule Home Pickup' on the main page to get started. We'll contact you within 24 hours!";
    }
    
    if (lowerMessage.includes('component') || lowerMessage.includes('part') || lowerMessage.includes('battery') || lowerMessage.includes('screen')) {
      return "Electronic devices contain many reusable components! For example, mobiles have batteries, screens, cameras, and motherboards. Each part has value and can be recycled or repurposed. Select a device type on the main page to see all its recyclable components.";
    }
    
    if (lowerMessage.includes('tip') || lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return "Here are some eco-friendly tips: 1) Always remove personal data before recycling, 2) Keep devices in good condition for better value, 3) Consider repair cafes for minor issues, 4) Group multiple devices for pickup efficiency. Need specific guidance for any device?";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('value') || lowerMessage.includes('money') || lowerMessage.includes('pay')) {
      return "Device values depend on condition, model, and reusable components. Our home pickup service provides instant valuation, or you can get estimates by selecting your device type. Prices range from ₹1,500 for headphones to ₹12,000+ for laptops with good components!";
    }
    
    return "I'm here to help with recycling questions! You can ask me about device recycling, finding centers, scheduling pickups, component information, or eco-friendly tips. What would you like to know?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: generateBotResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className={`chatbot-button ${isOpen ? 'open' : ''}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="chat-toggle-btn"
        >
          {isOpen ? '✕' : '🤖'}
          {!isOpen && <div className="chat-pulse"></div>}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="bot-avatar">🤖</div>
            <div className="bot-info">
              <h4>EcoBot</h4>
              <span className="bot-status">Online • Ready to help</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="close-btn"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-content typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="quick-replies">
              <p>Quick questions:</p>
              <div className="reply-buttons">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="quick-reply-btn"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input">
            <div className="input-container">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about recycling..."
                rows="1"
                className="message-input"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="send-btn"
              >
                📤
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Chatbot Button Styles */
        .chatbot-button {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
        }

        .chat-toggle-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--gradient-primary);
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(76, 175, 80, 0.4);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .chat-toggle-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(76, 175, 80, 0.5);
        }

        .chat-toggle-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .chat-toggle-btn:hover::before {
          left: 100%;
        }

        .chat-pulse {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 16px;
          height: 16px;
          background: var(--warning);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        /* Chat Window Styles */
        .chatbot-window {
          position: fixed;
          bottom: 100px;
          right: 24px;
          width: 380px;
          height: 500px;
          background: var(--gradient-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          z-index: 1000;
          animation: slideUpScale 0.3s ease-out;
          overflow: hidden;
        }

        @keyframes slideUpScale {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Header */
        .chatbot-header {
          background: var(--gradient-primary);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .chatbot-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: headerShimmer 3s ease-in-out infinite;
        }

        .bot-avatar {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .bot-info {
          flex: 1;
        }

        .bot-info h4 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .bot-status {
          font-size: 0.8rem;
          opacity: 0.9;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Messages */
        .chatbot-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: var(--surface);
        }

        .message {
          display: flex;
        }

        .message.bot {
          justify-content: flex-start;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message-content {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 16px;
          position: relative;
        }

        .message.bot .message-content {
          background: var(--surface-light);
          color: var(--text-primary);
          border-bottom-left-radius: 6px;
        }

        .message.user .message-content {
          background: var(--gradient-primary);
          color: white;
          border-bottom-right-radius: 6px;
        }

        .message-content p {
          margin: 0;
          line-height: 1.4;
          font-size: 0.9rem;
        }

        .message-time {
          font-size: 0.7rem;
          opacity: 0.7;
          margin-top: 4px;
          display: block;
        }

        /* Typing Indicator */
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 8px 0;
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;
          background: var(--text-secondary);
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(1) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.4s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.6s; }

        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }

        /* Quick Replies */
        .quick-replies {
          padding: 16px;
          border-top: 1px solid var(--border);
          background: var(--surface-light);
        }

        .quick-replies p {
          margin: 0 0 12px 0;
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .reply-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .quick-reply-btn {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 6px 12px;
          font-size: 0.8rem;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-reply-btn:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          transform: translateY(-1px);
        }

        /* Input */
        .chatbot-input {
          padding: 16px;
          border-top: 1px solid var(--border);
          background: var(--surface-light);
        }

        .input-container {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .message-input {
          flex: 1;
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: 12px;
          padding: 12px;
          color: var(--text-primary);
          font-size: 0.9rem;
          resize: none;
          min-height: 20px;
          max-height: 80px;
          transition: border-color 0.3s ease;
          font-family: inherit;
        }

        .message-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
        }

        .send-btn {
          background: var(--gradient-primary);
          border: none;
          border-radius: 10px;
          padding: 10px;
          color: white;
          cursor: pointer;
          font-size: 16px;
          min-width: 40px;
          height: 44px;
          transition: all 0.3s ease;
        }

        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(76, 175, 80, 0.3);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Animations */
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        @keyframes headerShimmer {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .chatbot-window {
            width: calc(100vw - 32px);
            height: 70vh;
            bottom: 90px;
            right: 16px;
            left: 16px;
            max-width: none;
          }

          .chatbot-button {
            bottom: 16px;
            right: 16px;
          }
        }

        /* Scrollbar Styling */
        .chatbot-messages::-webkit-scrollbar {
          width: 4px;
        }

        .chatbot-messages::-webkit-scrollbar-track {
          background: var(--surface-light);
        }

        .chatbot-messages::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 2px;
        }

        .chatbot-messages::-webkit-scrollbar-thumb:hover {
          background: var(--text-muted);
        }
      `}</style>
    </>
  );
};

export default AIChatBot;
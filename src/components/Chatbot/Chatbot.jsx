import { MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './Chatbot.css';

const Chatbot = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm Hummy, your huum assistant. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef(null);
  const buttonRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const suggestions = [
    "How do I add a new sound?",
    "What sounds can huum detect?",
    "How does sound detection work?",
    "Tell me about categories"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const lower = userMessage.toLowerCase();

    if (lower.includes('add') && lower.includes('sound')) {
      return "To add a new sound, go to the Sound Library tab and tap the '+ Add sound' button. You'll be able to record and categorize your sound!";
    } else if (lower.includes('detect') || lower.includes('what sounds')) {
      return "huum can detect various sounds including conversations, doorbells, phone calls, alarms, music, traffic, and many more. You can also teach it to recognize custom sounds!";
    } else if (lower.includes('how') && lower.includes('work')) {
      return "huum uses advanced AI to continuously monitor ambient sounds. When it detects something important, it translates it into visual alerts, vibrations, or notifications based on your preferences.";
    } else if (lower.includes('categor')) {
      return "Categories help organize sounds by type - like Safety, People & Communication, or Ambient sounds. You can create custom categories in the Learn tab!";
    } else if (lower.includes('help') || lower.includes('hi') || lower.includes('hello')) {
      return "I'm here to help! You can ask me about:\n• Adding and recording sounds\n• How sound detection works\n• Managing categories\n• App features and settings\n\nWhat would you like to know?";
    } else {
      return "I'm not sure about that, but I'm learning! You can explore the app features or ask me about sound detection, categories, or how to add new sounds.";
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowSuggestions(false);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: getBotResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    handleSend();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - dragPosition.x,
      y: e.clientY - dragPosition.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newY = e.clientY - dragStartPos.current.y;
    const maxY = window.innerHeight - 100;
    const clampedY = Math.max(0, Math.min(newY, maxY));

    setDragPosition({ x: 0, y: clampedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div 
      className="chatbot-container"
      style={{ 
        transform: `translateY(${dragPosition.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease'
      }}
    >
      {!isOpen && (
        <button
          ref={buttonRef}
          className="chatbot-button"
          onClick={onToggle}
          onMouseDown={handleMouseDown}
          aria-label="Open chat with Hummy"
        >
          <div className="chatbot-pulse"></div>
          <MessageCircle />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">H</div>
              <div className="chatbot-header-text">
                <h3>Hummy</h3>
                <p>Your huum assistant</p>
              </div>
            </div>
            <button className="chatbot-close" onClick={onToggle} aria-label="Close chat">
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`chatbot-message ${message.type}`}>
                <div className="chatbot-message-avatar">
                  {message.type === 'bot' ? 'H' : 'U'}
                </div>
                <div className="chatbot-message-content">
                  {message.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-message bot">
                <div className="chatbot-message-avatar">H</div>
                <div className="chatbot-message-content">
                  <div className="chatbot-typing">
                    <div className="chatbot-typing-dot"></div>
                    <div className="chatbot-typing-dot"></div>
                    <div className="chatbot-typing-dot"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {showSuggestions && messages.length === 1 && (
            <div className="chatbot-suggestions">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="chatbot-suggestion"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input-container">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="chatbot-send"
              onClick={handleSend}
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
import { useState, useEffect } from 'react';
import './App.css';
import assistantImg from './images/assistant.png';
import dataImg from './images/data.png';
import virtualImg from './images/virtual.png';
import chatbotImg from './images/chatbot.png';
import analyzerImg from './images/Analyzer.png';
import tutorImg from './images/tutor.png';
import creatorImg from './images/creator.png';
import companionImg from './images/companion.png';

const welcomeMessages = [
  "Welcome back! Create and manage your AI avatars",
  "Ready to build something amazing?",
  "Let's create some AI magic!"
];

const dummyAvatars = [
  { id: 1, name: "AI Assistant", image: assistantImg },
  { id: 2, name: "Data Analyzer", image: dataImg },
  { id: 3, name: "Virtual Guide", image: virtualImg },
  { id: 4, name: "Chatbot Companion", image: chatbotImg },
  { id: 5, name: "Business Analyzer", image: analyzerImg },
  { id: 6, name: "AI Tutor", image: tutorImg },
  { id: 7, name: "Content Creator", image: creatorImg },
  { id: 8, name: "Virtual Companion", image: companionImg }
];

const TypingWelcomeMessage = () => {
  const [displayText, setDisplayText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timer;
    
    if (typing) {
      if (displayText.length < welcomeMessages[messageIndex].length) {
        timer = setTimeout(() => {
          setDisplayText(welcomeMessages[messageIndex].substring(0, displayText.length + 1));
        }, 100);
      } else {
        timer = setTimeout(() => {
          setTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 50);
      } else {
        timer = setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % welcomeMessages.length);
          setTyping(true);
        }, 500);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, typing, messageIndex]);

  return (
    <div className="typing-container">
      <p className="welcome-message">{displayText}</p>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          {children}
        </div>
        <div className="modal-footer">
          <button 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const AvatarCard = ({ avatar, onEdit }) => {
  return (
    <div className="avatar-card">
      <img 
        src={avatar.image} 
        alt={avatar.name} 
        className="avatar-image"
      />
      <h3 className="avatar-name">{avatar.name}</h3>
      <button 
        onClick={() => onEdit(avatar)}
        className="btn btn-primary"
      >
        Edit
      </button>
    </div>
  );
};

const CreateAvatarForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddClick = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div>
      <h2 className="form-title">Create New Avatar</h2>
      <div className="form-group">
        <label>Avatar Name</label>
        <input 
          type="text" 
          className="form-control"
          placeholder="Enter avatar name"
        />
      </div>
      <div className="form-group">
        <label>Avatar Type</label>
        <select className="form-control">
          <option>Assistant</option>
          <option>Analyzer</option>
          <option>Guide</option>
          <option>Companion</option>
          <option>Tutor</option>
          <option>Creator</option>
        </select>
      </div>
      <div className="form-group">
        <label>Choose Image</label>
        <div className="image-upload-area">
          <p>Upload image or use default</p>
        </div>
      </div>
      <button 
        className="btn btn-primary"
        onClick={handleAddClick}
      >
        Add
      </button>
      {showSuccess && (
        <p className="success-message">Successfully added</p>
      )}
    </div>
  );
};

function App() {
  const [avatars] = useState(dummyAvatars);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(null);

  const handleEditAvatar = (avatar) => {
    setCurrentAvatar(avatar);
    setIsModalOpen(true);
  };

  const handleCreateAvatar = () => {
    setCurrentAvatar(null);
    setIsModalOpen(true);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <h1>AI Dashboard</h1>
          <TypingWelcomeMessage />
        </div>
      </header>

      {/* Main Content */}
      <main className="container main-content">
        <h2>Your Avatars</h2>
        
        {/* Avatar Grid */}
        <div className="avatar-grid">
          {avatars.map(avatar => (
            <AvatarCard key={avatar.id} avatar={avatar} onEdit={handleEditAvatar} />
          ))}
        </div>
        
        {/* Floating Add Button */}
        <button 
          className="floating-button"
          onClick={handleCreateAvatar}
        >
          <span>+</span>
        </button>
      </main>
      
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {currentAvatar ? (
          <div>
            <h2 className="form-title">Edit Avatar: {currentAvatar.name}</h2>
            <div className="avatar-edit-image">
              <img 
                src={currentAvatar.image} 
                alt={currentAvatar.name} 
                className="edit-avatar-img"
              />
            </div>
            <div className="form-group">
              <label>Avatar Name</label>
              <input 
                type="text" 
                className="form-control"
                defaultValue={currentAvatar.name}
              />
            </div>
          </div>
        ) : (
          <CreateAvatarForm />
        )}
      </Modal>
    </div>
  );
}

export default App;
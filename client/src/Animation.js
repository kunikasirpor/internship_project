import { useState , useEffect} from 'react';
const TypingWelcomeMessage = () => {
  const [displayText] = useState('');
  const [messageIndex] = useState(0);
  const [typing] = useState(true);

  useEffect(() => {
    // ... (keep existing useEffect logic)
  }, [displayText, typing, messageIndex]);

  return (
    <div className="welcome-message-container">
      <p className="welcome-message">{displayText}</p>
    </div>
  );
};
export default TypingWelcomeMessage;
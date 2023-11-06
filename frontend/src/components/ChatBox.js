import React, { useState } from 'react';

function ChatBox({ onSubmitPrompt }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitPrompt(prompt);
    setPrompt(''); // Clear the input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your music prompt"
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatBox;

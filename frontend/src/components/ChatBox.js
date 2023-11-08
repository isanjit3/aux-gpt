import React, { useState } from 'react';
import { Input, Button, Flex } from '@chakra-ui/react';

function ChatBox({ onSubmitPrompt }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitPrompt(prompt);
    setPrompt(''); // Clear the input after submission
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} align="center" justify="center" mt={4}>
      <Input
        mr={2}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your music prompt"
        size="md"
      />
      <Button type="submit" colorScheme="primary" px={6}>
        Send
      </Button>
    </Flex>
  );
}

export default ChatBox;

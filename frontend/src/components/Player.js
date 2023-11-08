import React from 'react';
import { Box, Image, Text, Button, Flex } from '@chakra-ui/react';
import { FaStepForward, FaStepBackward } from 'react-icons/fa';

function Player({ currentTrack, onSkipNext, onSkipPrevious }) {
  return (
    <Box bg="gray.800" color="white" p={4} rounded="md" shadow="md">
      <Flex align="center" justify="center" direction="column">
        <Image boxSize="10rem" src={currentTrack.albumImageUrl} alt="Album cover" />
        <Text fontSize="xl" fontWeight="bold" mt={4}>{currentTrack.songTitle}</Text>
        <Text fontSize="md">{currentTrack.artist}</Text>
        <Flex justify="center" mt={4}>
          <Button onClick={onSkipPrevious} variant="outline" colorScheme="white" size="lg" mx={2}>
            <FaStepBackward />
          </Button>
          <Button onClick={onSkipNext} variant="outline" colorScheme="white" size="lg" mx={2}>
            <FaStepForward />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Player;

import { List, ListItem, Text, Box } from '@chakra-ui/react';

function Queue({ queue }) {
  //console.log(`Queue: ${queue}`);
  // Only take the first 5 items from the queue for display
  const displayQueue = queue.slice(0, 5);

  return (
    <Box padding="5" borderWidth="0px" borderRadius="lg" overflow="hidden">
      <List spacing={3}>
        {displayQueue.map((track, index) => (
          <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold">{track.name}</Text>
            <Text fontSize="sm">{track.artists.map((artist) => artist.name).join(', ')}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Queue;

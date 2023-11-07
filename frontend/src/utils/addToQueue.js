// Function to add a single track to the Spotify queue
const addToQueue = async (trackUri, authToken) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Track added to queue successfully');
      } else {
        console.error('Failed to add track to queue', response);
      }
    } catch (error) {
      console.error('Error adding track to queue', error);
    }
  };

  export { addToQueue };
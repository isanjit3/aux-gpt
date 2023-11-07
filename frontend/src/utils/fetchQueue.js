import axios from 'axios';

// Function to fetch the user's queue from Spotify
const fetchQueue = async (setQueue, authToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/queue', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        // Update the local queue state with the fetched queue
        setQueue(response.data.queue);
    } catch (error) {
        console.error('Error fetching queue:', error);
    }
};

export { fetchQueue };
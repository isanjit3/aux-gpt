import axios from 'axios';

// Utility function to fetch the current playing track
const fetchCurrentPlaying = async (setCurrentTrack, authToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (response.data) {
            setCurrentTrack({
                songTitle: response.data.item.name,
                artist: response.data.item.artists.map(artist => artist.name).join(', '),
                albumImageUrl: response.data.item.album.images[1].url, // can change size of album image url (will need to do this dynamically)
                progressMs: response.data.progress_ms,
                durationMs: response.data.item.duration_ms
            });
        }
    } catch (error) {
        console.error('Error fetching current playing track:', error);
    }
};

export { fetchCurrentPlaying };
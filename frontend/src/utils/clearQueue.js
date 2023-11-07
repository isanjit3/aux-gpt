import { fetchCurrentPlaying } from "./fetchCurrentlyPlaying";

// Function to "clear queue" by skipping to the newly added track
const clearQueue = async (trackURI, handleSkipNext) => {
    let currentlyPlayingTrack = await fetchCurrentPlaying();

    // Keep skipping tracks until the newly added track is playing
    while (currentlyPlayingTrack.uri !== trackURI) {
        // Use the existing skip function
        await handleSkipNext();

        // Small delay to prevent rate limiting and give time for track to change
        await new Promise(resolve => setTimeout(resolve, 500));

        // Update the currently playing track
        currentlyPlayingTrack = await fetchCurrentPlaying();

        // Break out of the loop if we can't get the current track
        if (!currentlyPlayingTrack) {
            console.error('Could not retrieve the currently playing track.');
            break;
        }
    }
};

export { clearQueue };
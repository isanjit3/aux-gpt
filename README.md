# AuxGPT - AI DJ

AuxGPT is a conversational music queue application that integrates with Spotify, allowing users to manage their music queue through natural language commands. It leverages ChatGPT's capabilities to interpret user queries and the Spotify API to handle music playback and queue management.

## Features
- **Spotify Integration**: Seamless integration with your Spotify account to access your playlists and liked songs.
- **Real-Time Queue Updates**: Watch your music queue update in real-time as you interact with AuxGPT.
- **Responsive Design**: A sleek and responsive interface that looks great on all devices.

## Coming Soon!
- **Personalized Recommendations**: Get song recommendations based on your listening history and preferences.
- **Voice-Activated Queue Management**: Add tracks to your queue with simple voice commands.


## Getting Started

### Prerequisites

- A Spotify Premium account.
- Node.js and npm installed on your machine.
- Your environment variables should be set as well.
  - See **[Configuration](#configuration)** for information on how to configure your evironment variables.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/isanjit3/aux-gpt.git
   ```
2. Navigate to the project directory and install dependencies
   ```sh
    cd aux-gpt
    yarn install
   ```
3. You are now ready to start using AuxGPT!
   Here are some commands for you to use:
   ```sh
   yarn start      # launches the application with hotloading (dev usage)
   yarn build      # builds the frontend code into /build directory
   yarn serve      # builds the frontend and serves the code
   ```

   Your code should now be running on [http://localhost:3000](http://localhost:3000)! Check it out and play around with it.   
           
   If you are running into issues, make sure your environment variables are properly set. See **[Configuration](#configuration)** for information on how to do that.


### Configuration
To configure your environment variables you will have to create a `.env` file in both the `frontend` and the `root` of the project.

See `.env.example` for more instructions on which variables you will need to add.

## Usage
Once the app is running, log in with your Spotify account to start using AuxGPT. Type in commands like "play the latest album by Artist" or "add Song Name to queue" and watch AuxGPT work its magic.

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated. See **[CONTRIBUTING.md](`CONTRIBUTING.md`)** for more details on how you can contribute to this project.

## License

Distributed under the MIT License. See **[LICENSE](`LICENSE`)** for more information.


## Contact
Sanjit Thangarasu (Creator) - @isanjit3

Email: isanjit3@gmail.com  
Project Link: https://github.com/isanjit3/aux-gpt


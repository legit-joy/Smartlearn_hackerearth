Clone the complete project (including the voice assistant UI submodule) using:
git clone --recurse-submodules https://github.com/legit-joy/Smartlearn_hackerearth.git

Environment setup (important):
Create your own API keys and copy all .env.example files to .env, then paste your keys inside them. Never commit real API keys.



Terminal 1 – Start the main application:
Open a terminal in the project root and run npm install followed by npm run dev. Keep this terminal running. This starts the main application (usually at http://localhost:5173).



Terminal 2 – Start the voice assistant (Python):
Open a new terminal, go to the voice assistant folder using cd voice-assistant, 

1. Remove any existing virtual environment using 
rm -rf venv

2. Create a new virtual environment with 
python3.11 -m venv venv.               (Python 3.11 or higher required)

3. Activate it using 
source venv/bin/activate, 

4. Upgrade pip using 
pip install --upgrade pip
pip install livekit-agents livekit-rtc
pip install livekit-plugins-silero
pip install livekit-plugins-google
pip install livekit-plugins-turn-detector
pip install python-dotenv

5. And start the voice assistant with 
python app.py start
#Keep this terminal running.



Terminal 3 – Start the voice UI:
Open another terminal, navigate to voice-assistant, clone the LiveKit UI repo using git clone https://github.com/livekit-examples/agent-starter-react.git, move into it with cd agent-starter-react, run npm install, and then npm run dev.



Final usage:
Keep all three terminals running and access the project using the main application URL shown in Terminal 1 (http://localhost:5173).

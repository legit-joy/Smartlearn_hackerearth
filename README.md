## 🌐 Live Demo (GitHub Pages)

The frontend of this project is deployed using **GitHub Pages**.

- **Home**  
  👉 https://legit-joy.github.io/Smartlearn_hackerearth/#/

- **Chat**  
  👉 https://legit-joy.github.io/Smartlearn_hackerearth/#/chat

- **Tools**  
  👉 https://legit-joy.github.io/Smartlearn_hackerearth/#/tools

> ⚠️ **Important Note**  
> GitHub Pages hosts only the frontend UI.  
> The AI chatbot and voice assistant require backend services (Python + LiveKit) to be running locally.

---

## ⚠️ Backend Requirement (Mandatory)

This project uses a **Python + LiveKit backend** for:
- AI chatbot responses
- Voice-based assistant (Explain AI)

To use chat and voice features, the backend **must be running locally**.

---

## 📥 Clone the Repository

Clone the complete project (including the LiveKit voice UI submodule):

```bash
git clone --recurse-submodules https://github.com/legit-joy/Smartlearn_hackerearth.git
cd Smartlearn_hackerearth
```

---

## 🔐 Environment Setup

Create your own API keys and copy all example environment files:

```bash
cp .env.example .env
cp voice-assistant/.env.example voice-assistant/.env
```

Paste your keys into the `.env` files.  
**Never commit real API keys.**

---

## ▶️ Terminal 1 – Start Frontend Application

Open a terminal in the project root and run:

```bash
npm install
npm run dev
```

The frontend will start at:
```
http://localhost:5173
```

Keep this terminal running.

---

## 🧠 Terminal 2 – Start Backend (Python + LiveKit)

Open a new terminal:

```bash
cd voice-assistant
```

### 1. Remove any existing virtual environment
```bash
rm -rf venv
```

### 2. Create a new virtual environment (Python 3.11+ required)
```bash
python3.11 -m venv venv
```

### 3. Activate the virtual environment
```bash
source venv/bin/activate
```

### 4. Upgrade pip and install dependencies
```bash
pip install --upgrade pip
pip install livekit-agents livekit-rtc
pip install livekit-plugins-silero
pip install livekit-plugins-google
pip install livekit-plugins-turn-detector
pip install python-dotenv
```

### 5. Start the backend services
```bash
python app.py start
```

Keep this terminal running.

---

## 🎙️ Terminal 3 – Start Voice Assistant UI (LiveKit)

Open another terminal:

```bash
cd voice-assistant/agent-starter-react
npm install
npm run dev
```

This starts the LiveKit voice UI (usually at `http://localhost:3000`).  
Keep this terminal running.

> Note: The LiveKit UI is included as a Git submodule and is automatically available when cloning with `--recurse-submodules`.

---

## ✅ Final Usage

- Keep **all three terminals running**
- Open the app at:  
  👉 http://localhost:5173
- Chatbot works via backend
- Mic button enables real-time voice assistant

---

## 🧠 Summary

- Frontend: React + Vite (GitHub Pages)
- Backend: Python + LiveKit
- Voice AI: Real-time audio with LiveKit
- APIs: External LLM & speech services

---
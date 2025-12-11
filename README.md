# 🌱 EcoGuide - Environmental Impact Tracker

A modern web application to track and improve your environmental impact through daily and monthly habit tracking with an AI-like chatbot assistant.

## ✨ Features

- **Smart Chatbot** - Gemini-style conversational interface for tracking
- **Daily Logs** - Track transport, energy, and water usage
- **Monthly Logs** - Monitor electricity consumption, water bills, and travel
- **Leaderboard** - Compete for best eco-scores with environmental news
- **Eco Scoring** - Personalized scores and sustainability tips
- **Modern UI** - Responsive design with smooth animations

## 📋 Prerequisites

- Node.js v16 or higher
- npm or yarn package manager

## 🛠️ Installation

1. **Install dependencies**
   ```bash
   yarn install
   ```

2. **Build the project**
   ```bash
   yarn build
   ```

3. **Start the server**
   ```bash
   yarn start
   ```

3. **Access the application**
   Open your browser and go to: `http://localhost:3000`

## 🔐 Login
   ```bash
   yarn start
   ```

4. **Access the application**
   - Open `http://localhost:3000`
   - Login with any credentials (demo mode)

## 🎯 Pages

- **Login** (`/login`) - Authentication page
- **Home** (`/home`) - Dashboard overview
- **Daily Logs** (`/daily-logs`) - Track daily activities
- **Monthly Logs** (`/monthly-logs`) - Monthly environmental review
- **Leaderboard** (`/leaderboard`) - Eco-scores & environmental news
- **FAQ & Contact** (`/faq-contact`) - Help and support

## 📁 Project Structure

```
EcoGuide/
├── client/              # React frontend
├── src/                 # TypeScript backend
│   └── server.ts       # Express server
├── public/             # Static assets
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript files
│   │   ├── daily-logs.js
│   │   ├── monthly-logs.js
│   │   └── leaderboard.js
│   └── *.html         # HTML pages
└── dist/              # Compiled output
```

## 🤖 Chatbot Features

The chatbot simulates AI conversation with:
- Natural language understanding
- Pattern matching for various response formats
- Real-time eco score calculation
- Personalized sustainability tips
- Smooth animations and typing indicators

### Daily Tracking Questions
1. Transport (car, bus, walk/cycle)
2. AC usage (hours)
3. Geyser usage (yes/no)
4. Long shower (yes/no)
5. Laundry (yes/no)

### Monthly Tracking Questions
1. Electricity consumption (kWh)
2. Solar panels (yes/no)
3. Water bill amount
4. Water conservation (yes/no)
5. Number of flights
6. Long-distance trips

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: HTML, CSS, Vanilla JS, React
- **Styling**: Tailwind CSS v4, PostCSS
- **Build**: Vite, TypeScript Compiler
- **Icons**: Boxicons

## 🔧 Development Scripts

```bash
yarn dev          # Development mode (auto-reload)
yarn build        # Build for production
yarn start        # Start production server
yarn build:server # Build only backend
yarn build:client # Build only frontend
```

## 📊 Eco Scoring System

### Daily Score (0-100)
- Transport: -2 points per car km
- Public transport: -0.5 per km
- Walking/cycling: +10 bonus
- AC: -3 per hour
- Water usage: -5 to -8 per activity

### Monthly Score (0-100)
- Electricity: -0.1 per kWh (max -30)
- Solar: +15 bonus
- Water bill: -0.05 per rupee (max -20)
- Conservation: +10 bonus
- Flights: -15 each
- Long trips: -5 each

## 🚨 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules dist
yarn install
yarn build
```

### Port Already in Use
- Edit `src/server.ts` to change port (default: 3000)

## 📝 License

ISC

---

**Made with 💚 for a sustainable future**

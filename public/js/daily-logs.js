class DailyLogsApp {
    constructor() {
        this.dailyData = {
            transport: { car: 0, public: 0, walk_cycle: 0 },
            energy: { ac: false, ac_hours: 0, geyser: false },
            water: { long_shower: false, laundry: false }
        };
        this.conversationHistory = [];
        this.dataCollected = false;
        this.currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        this.GEMINI_API_KEY = 'AIzaSyCT8zuQHfpCQuV07A47gZHr5wHyLWLg1KA';
        this.GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
        
        this.systemPrompt = `You are an eco-friendly assistant helping users track their daily environmental impact.
Your goal is to collect the following data naturally through conversation:
1. Transport: Car travel (km), Public transport (km), Walking/Cycling
2. Energy: AC usage (yes/no and hours if yes), Geyser/water heater usage (yes/no)
3. Water: Long shower (yes/no), Laundry (yes/no)

After collecting all data, calculate an eco score (0-100) and provide personalized tips.
Be friendly, conversational, and encouraging. Ask follow-up questions if answers are unclear.
Extract numbers and yes/no answers from natural responses.`;
        
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const root = document.getElementById('root');
        root.innerHTML = `
            ${this.renderNavbar()}
            <main class="max-w-7xl mx-auto px-4 py-8">
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h1 class="text-4xl font-bold text-gray-900">Daily Logs</h1>
                        <p class="text-gray-600 mt-2">Track your daily environmental impact</p>
                    </div>
                    <div class="bg-gradient-to-r from-primary-green to-medium-green text-white px-6 py-3 rounded-full font-semibold">
                        Today: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>

                ${this.renderDashboard()}
            </main>
        `;
    }

    renderNavbar() {
        return `
            <nav class="bg-[#2d5f4f]/95 backdrop-blur-md sticky top-0 z-30 shadow-lg">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div class="flex items-center">
                            <span class="text-2xl font-bold text-white tracking-wide">EcoGuide</span>
                        </div>
                        
                        <div class="hidden md:flex items-center space-x-8">
                            <a href="/home" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium">Home</a>
                            <a href="/daily-logs" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium border-b-2 border-white">Daily Logs</a>
                            <a href="/monthly-logs" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium">Monthly Logs</a>
                            <a href="/leaderboard" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium">Leaderboard</a>
                            <a href="/faq-contact" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium">FAQ & Contact</a>
                        </div>

                        <button onclick="location.href='/logout'" class="hidden md:block bg-white text-[#2d5f4f] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-md">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        `;
    }

    renderDashboard() {
        return `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <!-- Stats Cards -->
                <div class="bg-gradient-to-br from-teal-400 to-teal-600 p-6 rounded-2xl shadow-lg text-white">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-semibold opacity-90">Transport</h3>
                        <i class='bx bx-car text-3xl opacity-80'></i>
                    </div>
                    <p class="text-4xl font-bold">${this.dailyData.transport.car + this.dailyData.transport.public} km</p>
                    <p class="text-sm opacity-80 mt-2">Total distance traveled</p>
                </div>

                <div class="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-semibold opacity-90">Energy Usage</h3>
                        <i class='bx bx-bolt text-3xl opacity-80'></i>
                    </div>
                    <p class="text-4xl font-bold">${this.dailyData.energy.ac_hours} hrs</p>
                    <p class="text-sm opacity-80 mt-2">AC usage today</p>
                </div>

                <div class="bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-2xl shadow-lg text-white">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-semibold opacity-90">Water Usage</h3>
                        <i class='bx bx-droplet text-3xl opacity-80'></i>
                    </div>
                    <p class="text-4xl font-bold">${(this.dailyData.water.long_shower ? 1 : 0) + (this.dailyData.water.laundry ? 1 : 0)}</p>
                    <p class="text-sm opacity-80 mt-2">Water-heavy activities</p>
                </div>
            </div>

            <!-- Charts/Visualizations Placeholder -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Weekly Trend</h3>
                    <div class="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                        <p class="text-gray-500">Chart will appear after AI tracking</p>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Today's Summary</h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                    <i class='bx bx-car text-teal-600'></i>
                                </div>
                                <span class="font-medium text-gray-700">Transport</span>
                            </div>
                            <span class="text-gray-600">${this.dailyData.transport.car + this.dailyData.transport.public} km</span>
                        </div>
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <i class='bx bx-bolt text-purple-600'></i>
                                </div>
                                <span class="font-medium text-gray-700">AC Usage</span>
                            </div>
                            <span class="text-gray-600">${this.dailyData.energy.ac ? 'Yes' : 'No'}</span>
                        </div>
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <i class='bx bx-droplet text-yellow-600'></i>
                                </div>
                                <span class="font-medium text-gray-700">Water Activities</span>
                            </div>
                            <span class="text-gray-600">${(this.dailyData.water.long_shower ? 1 : 0) + (this.dailyData.water.laundry ? 1 : 0)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 bg-gradient-to-r from-primary-green to-medium-green p-6 rounded-2xl shadow-lg text-white text-center">
                <p class="text-lg mb-4">💬 Click the chat button in the bottom-right to start tracking your daily habits!</p>
                <p class="text-sm opacity-90">The AI assistant will guide you through quick questions about your day.</p>
            </div>
        `;
    }

    attachEventListeners() {
        const chatButton = document.getElementById('chatbot-button');
        const closeChat = document.getElementById('close-chat');
        const overlay = document.getElementById('chat-overlay');
        const sendButton = document.getElementById('send-button');
        const chatInput = document.getElementById('chat-input');

        chatButton.addEventListener('click', () => {
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.add('active'), 10);
            if (this.conversationHistory.length === 0) {
                this.startConversation();
            }
        });

        closeChat.addEventListener('click', () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                setTimeout(() => overlay.classList.add('hidden'), 300);
            }
        });

        sendButton.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    startConversation() {
        const greeting = `Hi! 👋 I'm your EcoGuide assistant. I'll help you track your environmental impact for ${this.currentDate}. Let's start with a simple question: How did you travel today? (You can say something like "drove 20km" or "took the bus" or "walked")`;
        this.addMessage(greeting, 'bot');
        this.conversationHistory.push({ role: 'assistant', content: greeting });
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        if (message.length > 500) {
            this.addMessage("Your message is too long. Please keep it under 500 characters.", 'bot');
            return;
        }

        this.addMessage(message, 'user');
        input.value = '';
        this.conversationHistory.push({ role: 'user', content: message });

        this.addTypingIndicator();

        // Call Gemini AI
        this.callGeminiAI(message);
    }

    async callGeminiAI(userMessage) {
        try {
            const response = await fetch(`${this.GEMINI_API_URL}?key=${this.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${this.systemPrompt}\n\nCurrent data collected: ${JSON.stringify(this.dailyData)}\n\nUser says: "${userMessage}"\n\nRespond naturally and extract any relevant data. If all data points are collected, calculate eco score and provide summary.`
                        }]
                    }]
                })
            });

            const data = await response.json();
            this.removeTypingIndicator();

            // Check for API errors
            if (data.error) {
                console.error('Gemini API Error:', data.error);
                if (data.error.code === 400) {
                    this.addMessage("⚠️ API key error. Please verify your Gemini API key is correct and has the right permissions. Get a free key at https://aistudio.google.com/apikey", 'bot');
                } else if (data.error.code === 429) {
                    this.addMessage("⏰ Rate limit reached. Please wait a moment and try again.", 'bot');
                } else {
                    this.addMessage(`❌ API Error: ${data.error.message}`, 'bot');
                }
                return;
            }

            // Get AI response
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I didn't quite understand. Could you rephrase that?";
            this.addMessage(aiResponse, 'bot');
            this.conversationHistory.push({ role: 'assistant', content: aiResponse });

            // Extract data from conversation
            this.extractDataFromConversation(userMessage);

            // Check if data collection is complete
            if (this.isDataComplete() && !this.dataCollected) {
                this.dataCollected = true;
                this.saveDailyLog();
            }

            // Update dashboard
            this.render();

        } catch (error) {
            this.removeTypingIndicator();
            console.error('Error calling Gemini API:', error);
            this.addMessage("❌ Failed to connect to AI. Please check your internet connection and try again.", 'bot');
        }
    }

    extractDataFromConversation(message) {
        const msg = message.toLowerCase();
        const numbers = msg.match(/\d+/g);

        // Transport
        if (/car|drove|drive/.test(msg) && numbers) {
            this.dailyData.transport.car = parseInt(numbers[0]);
        }
        if (/bus|train|metro|public/.test(msg) && numbers) {
            this.dailyData.transport.public = parseInt(numbers[0]);
        }
        if (/walk|cycle|bike/.test(msg)) {
            this.dailyData.transport.walk_cycle = 1;
        }

        // AC usage
        if (/ac|air.?condition/.test(msg)) {
            if (/yes|yeah|yep/.test(msg)) {
                this.dailyData.energy.ac = true;
                if (numbers) {
                    this.dailyData.energy.ac_hours = parseInt(numbers[0]);
                }
            } else if (/no|nope|didn't/.test(msg)) {
                this.dailyData.energy.ac = false;
                this.dailyData.energy.ac_hours = 0;
            }
        }

        // Geyser
        if (/geyser|water.?heater/.test(msg)) {
            this.dailyData.energy.geyser = /yes|yeah|yep/.test(msg);
        }

        // Water
        if (/shower/.test(msg)) {
            this.dailyData.water.long_shower = /yes|yeah|yep|long/.test(msg);
        }
        if (/laundry|wash/.test(msg)) {
            this.dailyData.water.laundry = /yes|yeah|yep/.test(msg);
        }

        this.updateDashboard();
    }

    isDataComplete() {
        return this.dailyData.transport.car >= 0 ||
               this.dailyData.transport.public >= 0 ||
               this.dailyData.transport.walk_cycle >= 0;
    }

    updateDashboard() {
        this.render();
    }

    calculateEcoScore() {
        // ECOGUIDE DAILY SCORING FORMULA
        // Base Score: 100 points (Perfect eco-friendly day)
        // Formula: FinalScore = 100 - TransportPenalty - EnergyPenalty - WaterPenalty + GreenBonus
        
        let baseScore = 100;
        let penalties = {
            transport: 0,
            energy: 0,
            water: 0
        };
        let bonuses = {
            transport: 0,
            energy: 0,
            water: 0
        };
        
        // === TRANSPORT SCORING (Max penalty: 50 points) ===
        // Car: -2 points per km (high carbon footprint)
        penalties.transport += this.dailyData.transport.car * 2;
        
        // Public transport: -0.5 points per km (shared carbon footprint)
        penalties.transport += this.dailyData.transport.public * 0.5;
        
        // Walk/Cycle bonus: +10 points (carbon-free transport)
        if (this.dailyData.transport.walk_cycle > 0) {
            bonuses.transport += 10;
        }
        
        // === ENERGY SCORING (Max penalty: 30 points) ===
        // AC usage: -3 points per hour (high energy consumption)
        penalties.energy += this.dailyData.energy.ac_hours * 3;
        
        // Geyser/Water heater: -5 points (energy-intensive)
        if (this.dailyData.energy.geyser) {
            penalties.energy += 5;
        }
        
        // === WATER SCORING (Max penalty: 20 points) ===
        // Long shower: -8 points (excessive water waste)
        if (this.dailyData.water.long_shower) {
            penalties.water += 8;
        }
        
        // Laundry: -5 points (water consumption)
        if (this.dailyData.water.laundry) {
            penalties.water += 5;
        }
        
        // Cap penalties to prevent negative scores
        penalties.transport = Math.min(penalties.transport, 50);
        penalties.energy = Math.min(penalties.energy, 30);
        penalties.water = Math.min(penalties.water, 20);
        
        // Calculate final score
        const totalPenalties = penalties.transport + penalties.energy + penalties.water;
        const totalBonuses = bonuses.transport + bonuses.energy + bonuses.water;
        const finalScore = Math.max(0, Math.min(100, Math.round(baseScore - totalPenalties + totalBonuses)));
        
        return {
            total: finalScore,
            breakdown: {
                base: baseScore,
                transport: {
                    carKm: this.dailyData.transport.car,
                    carPenalty: -this.dailyData.transport.car * 2,
                    publicKm: this.dailyData.transport.public,
                    publicPenalty: -this.dailyData.transport.public * 0.5,
                    walkCycle: this.dailyData.transport.walk_cycle,
                    walkBonus: bonuses.transport,
                    subtotal: bonuses.transport - penalties.transport
                },
                energy: {
                    acHours: this.dailyData.energy.ac_hours,
                    acPenalty: -this.dailyData.energy.ac_hours * 3,
                    geyser: this.dailyData.energy.geyser,
                    geyserPenalty: this.dailyData.energy.geyser ? -5 : 0,
                    subtotal: -penalties.energy
                },
                water: {
                    longShower: this.dailyData.water.long_shower,
                    longShowerPenalty: this.dailyData.water.long_shower ? -8 : 0,
                    laundry: this.dailyData.water.laundry,
                    laundryPenalty: this.dailyData.water.laundry ? -5 : 0,
                    subtotal: -penalties.water
                }
            }
        };
    }
    
    getEcoTip(scoreData) {
        const score = typeof scoreData === 'number' ? scoreData : scoreData.total;
        if (score >= 80) {
            return "🎉 Excellent work! You're doing great for the environment!";
        } else if (score >= 60) {
            return "👍 Good effort! Try walking or cycling more to boost your score.";
        } else if (score >= 40) {
            return "💡 Consider using public transport or reducing AC usage.";
        } else {
            return "🌱 Let's work together to make tomorrow more eco-friendly!";
        }
    }
    
    async saveDailyLog() {
        try {
            const scoreData = this.calculateEcoScore();
            const response = await fetch('/api/daily-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: new Date().toISOString().split('T')[0],
                    data: this.dailyData,
                    score: scoreData.total,
                    scoreBreakdown: scoreData.breakdown
                })
            });
            if (response.ok) {
                console.log('Daily log saved successfully with score:', scoreData.total);
                console.log('Score breakdown:', scoreData.breakdown);
            }
        } catch (error) {
            console.error('Failed to save daily log:', error);
        }
    }

    addMessage(text, sender) {
        const messagesDiv = document.getElementById('chat-messages');
        const isBot = sender === 'bot';
        
        const messageHTML = `
            <div class="chat-bubble flex gap-3 ${isBot ? '' : 'justify-end'}">
                ${isBot ? `
                    <div class="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center flex-shrink-0">
                        <i class='bx bx-bot text-white'></i>
                    </div>
                ` : ''}
                <div class="${isBot ? 'bg-gray-100' : 'bg-primary-green text-white'} rounded-2xl ${isBot ? 'rounded-tl-none' : 'rounded-tr-none'} p-4 max-w-[80%]">
                    <p>${text}</p>
                </div>
            </div>
        `;
        
        messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    addTypingIndicator() {
        const messagesDiv = document.getElementById('chat-messages');
        const typingHTML = `
            <div id="typing-indicator" class="chat-bubble flex gap-3">
                <div class="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center flex-shrink-0">
                    <i class='bx bx-bot text-white'></i>
                </div>
                <div class="bg-gray-100 rounded-2xl rounded-tl-none p-4">
                    <div class="flex gap-1">
                        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                </div>
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', typingHTML);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new DailyLogsApp());
} else {
    new DailyLogsApp();
}

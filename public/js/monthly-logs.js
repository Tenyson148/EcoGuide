class MonthlyLogsApp {
    constructor() {
        this.monthlyData = {
            electricity: { units: 0, solar: false },
            water: { bill: 0, conservation: false },
            travel: { flights: 0, long_trips: 0 }
        };
        this.conversationHistory = [];
        this.dataCollected = false;
        this.currentMonth = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        
        this.GEMINI_API_KEY = 'AIzaSyCT8zuQHfpCQuV07A47gZHr5wHyLWLg1KA';
        this.GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
        
        this.systemPrompt = `You are an eco-friendly assistant helping users track their monthly environmental impact. 
Your goal is to collect the following data naturally through conversation:
1. Electricity consumption (in kWh or units)
2. Whether they use solar/renewable energy (yes/no)
3. Water bill amount (in any currency)
4. Whether they practice water conservation (yes/no)
5. Number of flights taken this month
6. Number of long-distance trips (>200km by car/train)

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
                        <h1 class="text-4xl font-bold text-gray-900">Monthly Logs</h1>
                        <p class="text-gray-600 mt-2">Review your monthly environmental footprint</p>
                    </div>
                    <div class="bg-gradient-to-r from-primary-green to-medium-green text-white px-6 py-3 rounded-full font-semibold">
                        ${this.currentMonth}
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
                            <a href="/daily-logs" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium">Daily Logs</a>
                            <a href="/monthly-logs" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium border-b-2 border-white">Monthly Logs</a>
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
                <div class="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-2xl shadow-lg text-white">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-semibold opacity-90">Electricity</h3>
                        <i class='bx bx-bulb text-3xl opacity-80'></i>
                    </div>
                    <p class="text-4xl font-bold">${this.monthlyData.electricity.units} kWh</p>
                    <p class="text-sm opacity-80 mt-2">Units consumed</p>
                    ${this.monthlyData.electricity.solar ? '<div class="mt-3 bg-white/20 rounded-lg px-3 py-1 text-xs inline-block">☀️ Solar Powered</div>' : ''}
                </div>

                <div class="bg-gradient-to-br from-cyan-400 to-cyan-600 p-6 rounded-2xl shadow-lg text-white">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-semibold opacity-90">Water Bill</h3>
                        <i class='bx bx-water text-3xl opacity-80'></i>
                    </div>
                    <p class="text-4xl font-bold">₹${this.monthlyData.water.bill}</p>
                    <p class="text-sm opacity-80 mt-2">Monthly water cost</p>
                    ${this.monthlyData.water.conservation ? '<div class="mt-3 bg-white/20 rounded-lg px-3 py-1 text-xs inline-block">💧 Conservation Active</div>' : ''}
                </div>

                <div class="bg-gradient-to-br from-orange-400 to-orange-600 p-6 rounded-2xl shadow-lg text-white">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-semibold opacity-90">Travel</h3>
                        <i class='bx bx-trip text-3xl opacity-80'></i>
                    </div>
                    <p class="text-4xl font-bold">${this.monthlyData.travel.flights + this.monthlyData.travel.long_trips}</p>
                    <p class="text-sm opacity-80 mt-2">Trips this month</p>
                </div>
            </div>

            <!-- Monthly Comparison -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div class="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Monthly Trends</h3>
                    <div class="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                        <p class="text-gray-500">Historical trends will appear after tracking</p>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Impact Score</h3>
                    <div class="h-64 flex flex-col items-center justify-center">
                        <div class="relative w-48 h-48">
                            <svg class="w-full h-full transform -rotate-90">
                                <circle cx="96" cy="96" r="88" stroke="#e5e7eb" stroke-width="12" fill="none"/>
                                <circle cx="96" cy="96" r="88" stroke="#2d5f4f" stroke-width="12" fill="none"
                                    stroke-dasharray="552" stroke-dashoffset="138" class="transition-all duration-1000"/>
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <span class="text-5xl font-bold text-gray-900" id="eco-score-display">0</span>
                                <span class="text-sm text-gray-600">Eco Score</span>
                            </div>
                        </div>
                        <p class="mt-4 text-gray-600 text-center">Good environmental impact this month!</p>
                    </div>
                </div>
            </div>

            <!-- Category Breakdown -->
            <div class="bg-white p-6 rounded-2xl shadow-lg">
                <h3 class="text-xl font-bold text-gray-900 mb-6">This Month's Summary</h3>
                <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                <i class='bx bx-bulb text-white text-2xl'></i>
                            </div>
                            <div>
                                <p class="font-semibold text-gray-900">Electricity Usage</p>
                                <p class="text-sm text-gray-600">${this.monthlyData.electricity.units} kWh consumed</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold text-blue-600">${this.monthlyData.electricity.units}</p>
                            <p class="text-xs text-gray-500">units</p>
                        </div>
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center">
                                <i class='bx bx-water text-white text-2xl'></i>
                            </div>
                            <div>
                                <p class="font-semibold text-gray-900">Water Bill</p>
                                <p class="text-sm text-gray-600">Monthly water consumption</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold text-cyan-600">₹${this.monthlyData.water.bill}</p>
                            <p class="text-xs text-gray-500">this month</p>
                        </div>
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                                <i class='bx bx-trip text-white text-2xl'></i>
                            </div>
                            <div>
                                <p class="font-semibold text-gray-900">Travel & Trips</p>
                                <p class="text-sm text-gray-600">${this.monthlyData.travel.flights} flights, ${this.monthlyData.travel.long_trips} road trips</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold text-orange-600">${this.monthlyData.travel.flights + this.monthlyData.travel.long_trips}</p>
                            <p class="text-xs text-gray-500">total trips</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 bg-gradient-to-r from-primary-green to-medium-green p-6 rounded-2xl shadow-lg text-white text-center">
                <p class="text-lg mb-4">📊 Click the chat button to update your monthly statistics!</p>
                <p class="text-sm opacity-90">Track electricity, water bills, and travel to see your environmental impact.</p>
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
        const greeting = `Hi! 👋 I'm your EcoGuide assistant. I'll help you track your environmental impact for ${this.currentMonth}. Let's start with a simple question: How much electricity did you use this month? (You can say something like "250 kWh" or "about 300 units")`;
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
                            text: `${this.systemPrompt}\n\nCurrent data collected: ${JSON.stringify(this.monthlyData)}\n\nUser says: "${userMessage}"\n\nRespond naturally and extract any relevant data. If all 6 data points are collected, calculate eco score and provide summary.`
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

            if (data.candidates && data.candidates[0]) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                this.addMessage(aiResponse, 'bot');
                this.conversationHistory.push({ role: 'assistant', content: aiResponse });
                
                // Try to extract data from user message
                this.extractDataFromConversation(userMessage);
            } else {
                throw new Error('No response from AI');
            }
        } catch (error) {
            console.error('Gemini AI Error:', error);
            this.removeTypingIndicator();
            this.addMessage("❌ Connection failed. Check console for details. Make sure you have a valid API key from https://aistudio.google.com/apikey", 'bot');
        }
    }

    extractDataFromConversation(message) {
        const msg = message.toLowerCase();
        
        // Extract numbers
        const numbers = message.match(/\d+/g);
        
        // Electricity
        if (/electricity|kwh|units|power/.test(msg) && numbers) {
            this.monthlyData.electricity.units = parseInt(numbers[0]);
        }
        
        // Solar
        if (/solar|renewable/.test(msg)) {
            this.monthlyData.electricity.solar = /yes|yeah|have|use/.test(msg);
        }
        
        // Water bill
        if (/water|bill/.test(msg) && numbers) {
            this.monthlyData.water.bill = parseInt(numbers[0]);
        }
        
        // Conservation
        if (/conservation|rainwater|harvest/.test(msg)) {
            this.monthlyData.water.conservation = /yes|yeah|do|practice/.test(msg);
        }
        
        // Flights
        if (/flight|plane|fly/.test(msg) && numbers) {
            this.monthlyData.travel.flights = parseInt(numbers[0]);
        }
        
        // Long trips
        if (/trip|travel|drive/.test(msg) && numbers) {
            this.monthlyData.travel.long_trips = parseInt(numbers[0]);
        }
        
        // Update display
        this.updateDashboard();
        
        // Check if all data collected
        if (this.isDataComplete() && !this.dataCollected) {
            this.dataCollected = true;
            this.saveMonthlyLog();
        }
    }

    isDataComplete() {
        return this.monthlyData.electricity.units > 0 ||
               this.monthlyData.water.bill > 0 ||
               this.monthlyData.travel.flights >= 0;
    }

    updateDashboard() {
        const scoreData = this.calculateEcoScore();
        const scoreDisplay = document.getElementById('eco-score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = scoreData.total.toString();
        }
    }

    calculateEcoScore() {
        // ECOGUIDE MONTHLY SCORING FORMULA
        // Base Score: 100 points (Perfect eco-friendly month)
        // Formula: FinalScore = 100 - ElectricityPenalty - WaterPenalty - TravelPenalty + GreenBonus
        
        let baseScore = 100;
        let penalties = {
            electricity: 0,
            water: 0,
            travel: 0
        };
        let bonuses = {
            electricity: 0,
            water: 0,
            travel: 0
        };
        
        // === ELECTRICITY SCORING (Max penalty: 30 points) ===
        // Standard consumption: -0.1 points per kWh (capped at 30 points)
        // Formula: min(units × 0.1, 30)
        const electricityPenalty = Math.min(this.monthlyData.electricity.units * 0.1, 30);
        penalties.electricity += electricityPenalty;
        
        // Solar energy bonus: +15 points (renewable energy usage)
        if (this.monthlyData.electricity.solar) {
            bonuses.electricity += 15;
        }
        
        // === WATER SCORING (Max penalty: 20 points) ===
        // Water bill penalty: -0.05 points per rupee (capped at 20 points)
        // Formula: min(bill × 0.05, 20)
        const waterPenalty = Math.min(this.monthlyData.water.bill * 0.05, 20);
        penalties.water += waterPenalty;
        
        // Water conservation bonus: +10 points (rainwater harvesting, etc.)
        if (this.monthlyData.water.conservation) {
            bonuses.water += 10;
        }
        
        // === TRAVEL SCORING (Max penalty: 50 points) ===
        // Flights: -15 points per flight (high carbon emissions)
        penalties.travel += this.monthlyData.travel.flights * 15;
        
        // Long road trips: -5 points per trip (moderate carbon emissions)
        penalties.travel += this.monthlyData.travel.long_trips * 5;
        
        // Cap travel penalties
        penalties.travel = Math.min(penalties.travel, 50);
        
        // Calculate final score
        const totalPenalties = penalties.electricity + penalties.water + penalties.travel;
        const totalBonuses = bonuses.electricity + bonuses.water + bonuses.travel;
        const finalScore = Math.max(0, Math.min(100, Math.round(baseScore - totalPenalties + totalBonuses)));
        
        return {
            total: finalScore,
            breakdown: {
                base: baseScore,
                electricity: {
                    units: this.monthlyData.electricity.units,
                    penalty: -electricityPenalty,
                    solar: this.monthlyData.electricity.solar,
                    solarBonus: bonuses.electricity,
                    subtotal: bonuses.electricity - penalties.electricity
                },
                water: {
                    bill: this.monthlyData.water.bill,
                    penalty: -waterPenalty,
                    conservation: this.monthlyData.water.conservation,
                    conservationBonus: bonuses.water,
                    subtotal: bonuses.water - penalties.water
                },
                travel: {
                    flights: this.monthlyData.travel.flights,
                    flightsPenalty: -this.monthlyData.travel.flights * 15,
                    longTrips: this.monthlyData.travel.long_trips,
                    tripsPenalty: -this.monthlyData.travel.long_trips * 5,
                    subtotal: -penalties.travel
                }
            }
        };
    }
    
    getEcoTip(scoreData) {
        const score = typeof scoreData === 'number' ? scoreData : scoreData.total;
        if (score >= 80) {
            return "🎉 Outstanding! You're a sustainability champion!";
        } else if (score >= 60) {
            return "👍 Great job! Consider solar energy for an even better score.";
        } else if (score >= 40) {
            return "💡 Good start! Try reducing flights and conserving water.";
        } else {
            return "🌱 Let's work on reducing your carbon footprint next month!";
        }
    }
    
    async saveMonthlyLog() {
        try {
            const scoreData = this.calculateEcoScore();
            
            // Update the display
            const scoreDisplay = document.getElementById('eco-score-display');
            if (scoreDisplay) {
                scoreDisplay.textContent = scoreData.total.toString();
            }
            
            const response = await fetch('/api/monthly-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    month: this.currentMonth,
                    data: this.monthlyData,
                    score: scoreData.total,
                    scoreBreakdown: scoreData.breakdown
                })
            });
            if (response.ok) {
                console.log('Monthly log saved successfully. Eco Score:', scoreData.total);
                console.log('Score breakdown:', scoreData.breakdown);
            }
        } catch (error) {
            console.error('Failed to save monthly log:', error);
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
    document.addEventListener('DOMContentLoaded', () => new MonthlyLogsApp());
} else {
    new MonthlyLogsApp();
}

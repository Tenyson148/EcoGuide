// Monthly Logs Dashboard with Simulated AI Chatbot

class MonthlyLogsApp {
    constructor() {
        this.monthlyData = {
            electricity: { units: 0, solar: false },
            water: { bill: 0, conservation: false },
            travel: { flights: 0, long_trips: 0 }
        };
        this.conversationHistory = [];
        this.currentQuestionIndex = 0;
        this.questionFlow = [
            {
                question: "Hi! Let's review your monthly environmental impact for " + new Date().toLocaleDateString('en-US', { month: 'long' }) + " 🌍 First, what was your electricity consumption this month in units/kWh? (e.g., '250 units' or just '250')",
                category: 'electricity',
                patterns: {
                    with_units: /(\d+)\s*(?:units?|kwh|kilowatt)/i,
                    number_only: /^\d+$/,
                    zero: /(?:zero|none|0)/i
                }
            },
            {
                question: "Do you use solar panels or renewable energy at home? (yes/no)",
                category: 'solar',
                patterns: {
                    yes: /(?:yes|yeah|yep|yup|solar|renewable)/i,
                    no: /(?:no|nope|nah|don't|dont)/i
                }
            },
            {
                question: "What was your water bill amount this month? (e.g., '$50' or '1500 rupees' or just the number)",
                category: 'water_bill',
                patterns: {
                    with_currency: /(?:\$|rs\.?|rupees?)?\s*(\d+)/i,
                    number_only: /^\d+$/,
                    zero: /(?:zero|none|0)/i
                }
            },
            {
                question: "Do you practice water conservation (rainwater harvesting, efficient fixtures, etc.)? (yes/no)",
                category: 'conservation',
                patterns: {
                    yes: /(?:yes|yeah|yep|yup)/i,
                    no: /(?:no|nope|nah|don't|dont)/i
                }
            },
            {
                question: "How many flights did you take this month? (Enter a number, or '0' if none)",
                category: 'flights',
                patterns: {
                    number: /^\d+$/,
                    with_text: /(\d+)\s*(?:flight|trip)/i,
                    zero: /(?:zero|none|no|0)/i
                }
            },
            {
                question: "How many long-distance trips (>200km by car/train) did you take? (Enter a number, or '0' if none)",
                category: 'long_trips',
                patterns: {
                    number: /^\d+$/,
                    with_text: /(\d+)\s*(?:trip|journey)/i,
                    zero: /(?:zero|none|no|0)/i
                }
            }
        ];
        this.awaitingResponse = false;
        this.currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
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
                                <span class="text-5xl font-bold text-gray-900">75</span>
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
        this.currentQuestionIndex = 0;
        const firstQuestion = this.questionFlow[0].question;
        this.addMessage(firstQuestion, 'bot');
        this.conversationHistory.push({ role: 'assistant', content: firstQuestion });
        this.awaitingResponse = true;
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

        setTimeout(() => {
            this.removeTypingIndicator();
            this.processUserResponse(message);
        }, 800 + Math.random() * 400);
    }

    processUserResponse(userMessage) {
        const currentQ = this.questionFlow[this.currentQuestionIndex];
        
        if (!userMessage || userMessage.trim().length === 0) {
            this.addMessage("I didn't catch that. Could you please respond again?", 'bot');
            return;
        }
        
        const lowerMsg = userMessage.toLowerCase().trim();
        let dataExtracted = false;
        
        switch(currentQ.category) {
            case 'electricity':
                dataExtracted = this.extractElectricityData(lowerMsg, currentQ.patterns);
                break;
            case 'solar':
                dataExtracted = this.extractSolarData(lowerMsg, currentQ.patterns);
                break;
            case 'water_bill':
                dataExtracted = this.extractWaterBillData(lowerMsg, currentQ.patterns);
                break;
            case 'conservation':
                dataExtracted = this.extractConservationData(lowerMsg, currentQ.patterns);
                break;
            case 'flights':
                dataExtracted = this.extractFlightsData(lowerMsg, currentQ.patterns);
                break;
            case 'long_trips':
                dataExtracted = this.extractLongTripsData(lowerMsg, currentQ.patterns);
                break;
        }
        
        if (!dataExtracted) {
            this.addMessage(this.getHelpMessage(currentQ.category), 'bot');
            return;
        }
        
        const acknowledgments = [
            "Got it! 📝",
            "Thanks! ✓",
            "Noted! 👍",
            "Perfect! ✨",
            "Great! 🌟"
        ];
        const ack = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
        
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.questionFlow.length) {
            const nextQuestion = this.questionFlow[this.currentQuestionIndex].question;
            this.addMessage(`${ack} ${nextQuestion}`, 'bot');
            this.conversationHistory.push({ role: 'assistant', content: nextQuestion });
        } else {
            this.completeTracking();
        }
        
        this.render();
    }
    
    extractElectricityData(msg, patterns) {
        const unitsMatch = msg.match(patterns.with_units);
        if (unitsMatch) {
            this.monthlyData.electricity.units = parseInt(unitsMatch[1]);
            return true;
        }
        if (patterns.number_only.test(msg)) {
            this.monthlyData.electricity.units = parseInt(msg);
            return true;
        }
        if (patterns.zero.test(msg)) {
            this.monthlyData.electricity.units = 0;
            return true;
        }
        return false;
    }
    
    extractSolarData(msg, patterns) {
        if (patterns.yes.test(msg)) {
            this.monthlyData.electricity.solar = true;
            return true;
        }
        if (patterns.no.test(msg)) {
            this.monthlyData.electricity.solar = false;
            return true;
        }
        return false;
    }
    
    extractWaterBillData(msg, patterns) {
        const billMatch = msg.match(patterns.with_currency);
        if (billMatch) {
            this.monthlyData.water.bill = parseInt(billMatch[1]);
            return true;
        }
        if (patterns.number_only.test(msg)) {
            this.monthlyData.water.bill = parseInt(msg);
            return true;
        }
        if (patterns.zero.test(msg)) {
            this.monthlyData.water.bill = 0;
            return true;
        }
        return false;
    }
    
    extractConservationData(msg, patterns) {
        if (patterns.yes.test(msg)) {
            this.monthlyData.water.conservation = true;
            return true;
        }
        if (patterns.no.test(msg)) {
            this.monthlyData.water.conservation = false;
            return true;
        }
        return false;
    }
    
    extractFlightsData(msg, patterns) {
        if (patterns.zero.test(msg)) {
            this.monthlyData.travel.flights = 0;
            return true;
        }
        const flightMatch = msg.match(patterns.with_text);
        if (flightMatch) {
            this.monthlyData.travel.flights = parseInt(flightMatch[1]);
            return true;
        }
        if (patterns.number.test(msg)) {
            this.monthlyData.travel.flights = parseInt(msg);
            return true;
        }
        return false;
    }
    
    extractLongTripsData(msg, patterns) {
        if (patterns.zero.test(msg)) {
            this.monthlyData.travel.long_trips = 0;
            return true;
        }
        const tripMatch = msg.match(patterns.with_text);
        if (tripMatch) {
            this.monthlyData.travel.long_trips = parseInt(tripMatch[1]);
            return true;
        }
        if (patterns.number.test(msg)) {
            this.monthlyData.travel.long_trips = parseInt(msg);
            return true;
        }
        return false;
    }
    
    getHelpMessage(category) {
        const helpMessages = {
            electricity: "Please tell me your electricity consumption. For example:\n• '250 units' or '250 kWh'\n• Just the number like '250'\n• '0' if you don't know",
            solar: "Please answer with 'yes' or 'no' 😊",
            water_bill: "Please tell me your water bill amount. For example:\n• '$50' or '1500'\n• Just the number\n• '0' if not applicable",
            conservation: "Please answer with 'yes' or 'no' 😊",
            flights: "Please tell me the number of flights. For example:\n• '2 flights' or just '2'\n• '0' or 'none' if you didn't fly",
            long_trips: "Please tell me the number of long trips. For example:\n• '3 trips' or just '3'\n• '0' or 'none' if you didn't take any"
        };
        return helpMessages[category] || "I didn't understand. Could you rephrase that?";
    }
    
    completeTracking() {
        const ecoScore = this.calculateEcoScore();
        const summary = `\n\n✅ **Monthly tracking complete for ${this.currentMonth}!**\n\n📊 Your summary:\n` +
            `⚡ Electricity: ${this.monthlyData.electricity.units} units${this.monthlyData.electricity.solar ? ' (Solar ☀️)' : ''}\n` +
            `💧 Water: ₹${this.monthlyData.water.bill}${this.monthlyData.water.conservation ? ' (Conservation ✓)' : ''}\n` +
            `✈️ Travel: ${this.monthlyData.travel.flights} flights, ${this.monthlyData.travel.long_trips} road trips\n\n` +
            `🌟 Eco Score: ${ecoScore}/100\n\n` +
            this.getEcoTip(ecoScore);
        
        this.addMessage(summary, 'bot');
        this.awaitingResponse = false;
        this.saveMonthlyLog();
    }
    
    calculateEcoScore() {
        let score = 100;
        
        score -= Math.min(this.monthlyData.electricity.units * 0.1, 30);
        if (this.monthlyData.electricity.solar) score += 15;
        
        score -= Math.min(this.monthlyData.water.bill * 0.05, 20);
        if (this.monthlyData.water.conservation) score += 10;
        
        score -= this.monthlyData.travel.flights * 15;
        score -= this.monthlyData.travel.long_trips * 5;
        
        return Math.max(0, Math.min(100, Math.round(score)));
    }
    
    getEcoTip(score) {
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
            const response = await fetch('/api/monthly-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    month: this.currentMonth,
                    data: this.monthlyData,
                    score: this.calculateEcoScore()
                })
            });
            if (response.ok) {
                console.log('Monthly log saved successfully');
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

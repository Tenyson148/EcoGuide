// Daily Logs Dashboard with Simulated AI Chatbot

class DailyLogsApp {
    constructor() {
        this.dailyData = {
            transport: { car: 0, public: 0, walk_cycle: 0 },
            energy: { ac: false, ac_hours: 0, geyser: false },
            water: { long_shower: false, laundry: false }
        };
        this.conversationHistory = [];
        this.currentQuestionIndex = 0;
        this.questionFlow = [
            {
                question: "Hi! I'm your EcoGuide assistant 🌿 Let's track your environmental impact for today. First, how did you travel today? (e.g., 'drove 20km' or 'took bus 10km' or 'walked/cycled')",
                category: 'transport',
                patterns: {
                    car: /(?:car|drove|drive|driving).*?(\d+)\s*k?m?/i,
                    public: /(?:bus|train|metro|public).*?(\d+)\s*k?m?/i,
                    walk_cycle: /(?:walk|cycle|bike|foot)/i,
                    none: /(?:no|nothing|didn't|didnt|stay|home)/i
                }
            },
            {
                question: "Great! Now about energy usage - did you use AC today? If yes, for how many hours? (e.g., 'yes, 3 hours' or 'no')",
                category: 'energy',
                patterns: {
                    yes_with_hours: /(?:yes|yeah).*?(\d+)\s*(?:hour|hr)?/i,
                    hours_only: /^\d+\s*(?:hour|hr)?s?$/i,
                    yes: /^(?:yes|yeah|yep|yup)$/i,
                    no: /^(?:no|nope|nah|didn't|didnt)$/i
                }
            },
            {
                question: "Did you use a geyser/water heater today? (yes/no)",
                category: 'geyser',
                patterns: {
                    yes: /(?:yes|yeah|yep|yup)/i,
                    no: /(?:no|nope|nah|didn't|didnt)/i
                }
            },
            {
                question: "How about water usage - did you take a long shower today? (yes/no)",
                category: 'water_shower',
                patterns: {
                    yes: /(?:yes|yeah|yep|yup)/i,
                    no: /(?:no|nope|nah|didn't|didnt|short)/i
                }
            },
            {
                question: "Last question! Did you do laundry today? (yes/no)",
                category: 'water_laundry',
                patterns: {
                    yes: /(?:yes|yeah|yep|yup)/i,
                    no: /(?:no|nope|nah|didn't|didnt)/i
                }
            }
        ];
        this.awaitingResponse = false;
        
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
        
        // Validate input
        if (message.length > 500) {
            this.addMessage("Your message is too long. Please keep it under 500 characters.", 'bot');
            return;
        }

        this.addMessage(message, 'user');
        input.value = '';
        this.conversationHistory.push({ role: 'user', content: message });

        // Show typing indicator
        this.addTypingIndicator();

        // Simulate AI thinking delay
        setTimeout(() => {
            this.removeTypingIndicator();
            this.processUserResponse(message);
        }, 800 + Math.random() * 400); // 0.8-1.2 seconds delay
    }

    processUserResponse(userMessage) {
        const currentQ = this.questionFlow[this.currentQuestionIndex];
        
        // Edge case: empty or whitespace-only message
        if (!userMessage || userMessage.trim().length === 0) {
            this.addMessage("I didn't catch that. Could you please respond again?", 'bot');
            return;
        }
        
        // Edge case: unclear/confusing response
        const lowerMsg = userMessage.toLowerCase().trim();
        
        // Extract data based on current question category
        let dataExtracted = false;
        
        switch(currentQ.category) {
            case 'transport':
                dataExtracted = this.extractTransportData(lowerMsg, currentQ.patterns);
                break;
            case 'energy':
                dataExtracted = this.extractEnergyData(lowerMsg, currentQ.patterns);
                break;
            case 'geyser':
                dataExtracted = this.extractGeyserData(lowerMsg, currentQ.patterns);
                break;
            case 'water_shower':
                dataExtracted = this.extractWaterShowerData(lowerMsg, currentQ.patterns);
                break;
            case 'water_laundry':
                dataExtracted = this.extractWaterLaundryData(lowerMsg, currentQ.patterns);
                break;
        }
        
        if (!dataExtracted) {
            // Handle unclear response
            this.addMessage(this.getHelpMessage(currentQ.category), 'bot');
            return;
        }
        
        // Give positive feedback
        const acknowledgments = [
            "Got it! 📝",
            "Thanks for sharing! ✓",
            "Noted! 👍",
            "Perfect! ✨",
            "Understood! 🌟"
        ];
        const ack = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
        
        // Move to next question
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.questionFlow.length) {
            const nextQuestion = this.questionFlow[this.currentQuestionIndex].question;
            this.addMessage(`${ack} ${nextQuestion}`, 'bot');
            this.conversationHistory.push({ role: 'assistant', content: nextQuestion });
        } else {
            // Conversation complete
            this.completeTracking();
        }
        
        // Update dashboard
        this.render();
    }

    extractTransportData(msg, patterns) {
        // Check for car travel
        const carMatch = msg.match(patterns.car);
        if (carMatch) {
            this.dailyData.transport.car = parseInt(carMatch[1]);
            return true;
        }
        
        // Check for public transport
        const publicMatch = msg.match(patterns.public);
        if (publicMatch) {
            this.dailyData.transport.public = parseInt(publicMatch[1]);
            return true;
        }
        
        // Check for walking/cycling
        if (patterns.walk_cycle.test(msg)) {
            this.dailyData.transport.walk_cycle = 1; // Flag as active
            return true;
        }
        
        // Check for no travel
        if (patterns.none.test(msg)) {
            return true; // Valid response, no travel
        }
        
        return false;
    }
    
    extractEnergyData(msg, patterns) {
        // Check for yes with hours
        const yesHoursMatch = msg.match(patterns.yes_with_hours);
        if (yesHoursMatch) {
            this.dailyData.energy.ac = true;
            this.dailyData.energy.ac_hours = parseInt(yesHoursMatch[1]);
            return true;
        }
        
        // Check for just hours (implies yes)
        if (patterns.hours_only.test(msg)) {
            const hoursMatch = msg.match(/\d+/);
            this.dailyData.energy.ac = true;
            this.dailyData.energy.ac_hours = parseInt(hoursMatch[0]);
            return true;
        }
        
        // Check for simple yes
        if (patterns.yes.test(msg)) {
            this.dailyData.energy.ac = true;
            this.dailyData.energy.ac_hours = 2; // Default 2 hours if not specified
            return true;
        }
        
        // Check for no
        if (patterns.no.test(msg)) {
            this.dailyData.energy.ac = false;
            this.dailyData.energy.ac_hours = 0;
            return true;
        }
        
        return false;
    }
    
    extractGeyserData(msg, patterns) {
        if (patterns.yes.test(msg)) {
            this.dailyData.energy.geyser = true;
            return true;
        }
        if (patterns.no.test(msg)) {
            this.dailyData.energy.geyser = false;
            return true;
        }
        return false;
    }
    
    extractWaterShowerData(msg, patterns) {
        if (patterns.yes.test(msg)) {
            this.dailyData.water.long_shower = true;
            return true;
        }
        if (patterns.no.test(msg)) {
            this.dailyData.water.long_shower = false;
            return true;
        }
        return false;
    }
    
    extractWaterLaundryData(msg, patterns) {
        if (patterns.yes.test(msg)) {
            this.dailyData.water.laundry = true;
            return true;
        }
        if (patterns.no.test(msg)) {
            this.dailyData.water.laundry = false;
            return true;
        }
        return false;
    }
    
    getHelpMessage(category) {
        const helpMessages = {
            transport: "I didn't quite understand. Please tell me how you traveled today. For example:\n• 'drove 15km' or 'car 15km'\n• 'took bus 10km' or 'train 5km'\n• 'walked' or 'cycled'\n• 'stayed home'",
            energy: "Please answer with:\n• 'yes, 3 hours' or 'yes 3hr'\n• Just the number like '4' (I'll assume hours)\n• 'yes' (I'll estimate 2 hours)\n• 'no'",
            geyser: "Please answer with 'yes' or 'no' 😊",
            water_shower: "Please answer with 'yes' or 'no' 😊",
            water_laundry: "Please answer with 'yes' or 'no' 😊"
        };
        return helpMessages[category] || "I didn't understand. Could you rephrase that?";
    }
    
    completeTracking() {
        const ecoScore = this.calculateEcoScore();
        const summary = `\n\n✅ **Daily tracking complete!**\n\n📊 Your summary:\n` +
            `🚗 Transport: ${this.dailyData.transport.car}km car, ${this.dailyData.transport.public}km public\n` +
            `⚡ Energy: AC ${this.dailyData.energy.ac ? this.dailyData.energy.ac_hours + 'hrs' : 'not used'}, Geyser ${this.dailyData.energy.geyser ? 'used' : 'not used'}\n` +
            `💧 Water: Long shower ${this.dailyData.water.long_shower ? 'yes' : 'no'}, Laundry ${this.dailyData.water.laundry ? 'yes' : 'no'}\n\n` +
            `🌟 Eco Score: ${ecoScore}/100\n\n` +
            this.getEcoTip(ecoScore);
        
        this.addMessage(summary, 'bot');
        this.awaitingResponse = false;
        
        // Save to backend
        this.saveDailyLog();
    }
    
    calculateEcoScore() {
        let score = 100;
        
        // Transport penalties
        score -= this.dailyData.transport.car * 2; // -2 per km by car
        score -= this.dailyData.transport.public * 0.5; // -0.5 per km public transport
        if (this.dailyData.transport.walk_cycle) score += 10; // +10 bonus
        
        // Energy penalties
        score -= this.dailyData.energy.ac_hours * 3; // -3 per AC hour
        if (this.dailyData.energy.geyser) score -= 5;
        
        // Water penalties
        if (this.dailyData.water.long_shower) score -= 8;
        if (this.dailyData.water.laundry) score -= 5;
        
        return Math.max(0, Math.min(100, Math.round(score)));
    }
    
    getEcoTip(score) {
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
            const response = await fetch('/api/daily-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: new Date().toISOString().split('T')[0],
                    data: this.dailyData,
                    score: this.calculateEcoScore()
                })
            });
            if (response.ok) {
                console.log('Daily log saved successfully');
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

// Leaderboard Page
class LeaderboardApp {
    constructor() {
        this.leaderboardData = [];
        this.news = [];
        this.init();
    }

    async init() {
        await this.loadLeaderboardData();
        await this.fetchEnvironmentalNews();
        this.render();
        this.attachEventListeners();
    }

    async loadLeaderboardData() {
        try {
            // Fetch current user's real score from server
            const userScoreResponse = await fetch('/api/user-score');
            const userScoreData = await userScoreResponse.json();
            
            const response = await fetch('/data/leaderboard.json');
            if (!response.ok) {
                throw new Error('Failed to load leaderboard data');
            }
            const data = await response.json();
            
            // Use real score from monthly logs
            const realScore = userScoreData.success ? userScoreData.score : 0;
            const username = userScoreData.username || "You";
            
            // Calculate rank based on real score
            let userRank = 1;
            for (const user of data.users) {
                if (user.points > realScore) {
                    userRank++;
                }
            }
            
            this.currentUser = { 
                rank: userRank, 
                name: username, 
                points: realScore 
            };
            
            // Insert current user into leaderboard at their rank position
            const leaderboardWithUser = [...data.users];
            
            // Remove any user at the same rank and insert current user
            const insertIndex = leaderboardWithUser.findIndex(u => u.rank >= userRank);
            
            if (insertIndex !== -1) {
                leaderboardWithUser.splice(insertIndex, 0, {
                    rank: userRank,
                    name: username,
                    avatar: "👤",
                    points: realScore,
                    badge: userRank === 1 ? "🏆" : userRank === 2 ? "🥈" : userRank === 3 ? "🥉" : "",
                    trend: "same",
                    isCurrentUser: true
                });
            } else {
                leaderboardWithUser.push({
                    rank: userRank,
                    name: username,
                    avatar: "👤",
                    points: realScore,
                    badge: "",
                    trend: "same",
                    isCurrentUser: true
                });
            }
            
            // Update ranks for users below current user
            leaderboardWithUser.forEach((user, index) => {
                if (index >= insertIndex && !user.isCurrentUser) {
                    user.rank++;
                }
            });
            
            this.leaderboardData = leaderboardWithUser;
            console.log('Leaderboard data loaded with real score:', realScore);
        } catch (error) {
            console.error('Error loading leaderboard data:', error);
            // Fallback data
            this.leaderboardData = [
                { rank: 1, name: "Guest User", avatar: "👤", points: 0, badge: "", trend: "same" }
            ];
            this.currentUser = { rank: 1, name: "You", points: 0 };
        }
    }

    async fetchEnvironmentalNews() {
        try {
            // Using NewsAPI for environmental news
            const apiKey = '4d0b8f7e8ec44d2a9e9c8b8e8e8e8e8e'; // Demo key - users should replace
            const response = await fetch(`https://newsapi.org/v2/everything?q=environment+OR+climate+OR+sustainability&language=en&sortBy=publishedAt&pageSize=3&apiKey=${apiKey}`);
            
            if (!response.ok) {
                // Fallback to mock data if API fails
                this.news = this.getMockNews();
                return;
            }
            
            const data = await response.json();
            this.news = data.articles.slice(0, 3).map(article => ({
                title: article.title.split(' - ')[0],
                description: article.description || 'Environmental news update',
                image: article.urlToImage || 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400',
                url: article.url,
                date: new Date(article.publishedAt).toLocaleDateString()
            }));
        } catch (error) {
            console.error('Error fetching news:', error);
            this.news = this.getMockNews();
        }
    }

    getMockNews() {
        return [
            {
                title: "Global Climate Summit Reaches Historic Agreement",
                description: "World leaders commit to reducing carbon emissions by 50% by 2030",
                image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400",
                date: new Date().toLocaleDateString()
            },
            {
                title: "Renewable Energy Surpasses Fossil Fuels",
                description: "Clean energy production hits new milestone in global energy mix",
                image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400",
                date: new Date().toLocaleDateString()
            },
            {
                title: "Ocean Cleanup Project Shows Promising Results",
                description: "New technology removes 100,000 kg of plastic from Pacific Ocean",
                image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
                date: new Date().toLocaleDateString()
            }
        ];
    }

    render() {
        const root = document.getElementById('root');
        root.innerHTML = `
            ${this.renderNavbar()}
            <main class="max-w-7xl mx-auto px-4 py-8">
                ${this.renderLeaderboardCard()}
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
                            <a href="/monthly-logs" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium">Monthly Logs</a>
                            <a href="/leaderboard" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium border-b-2 border-white">Leaderboard</a>
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

    renderLeaderboardCard() {
        const top3 = this.leaderboardData.slice(0, 3);
        const rest = this.leaderboardData.slice(3);

        return `
            <!-- Hero Section -->
            <div class="bg-gradient-to-br from-primary-green via-medium-green to-light-green rounded-3xl shadow-2xl p-8 mb-8 text-white">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h1 class="text-4xl font-bold mb-2 flex items-center gap-3">
                            <i class='bx bx-trophy text-5xl trophy-icon'></i>
                            Global Eco Champions
                        </h1>
                        <p class="text-white/80 text-lg">Compete with eco-warriors worldwide</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-white/70">Last Updated</p>
                        <p class="font-semibold">${new Date().toLocaleDateString()}</p>
                    </div>
                </div>
                
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div class="bg-white/10 backdrop-blur-md rounded-xl p-4">
                        <i class='bx bx-user text-2xl mb-2'></i>
                        <p class="text-2xl font-bold">${this.leaderboardData.length}</p>
                        <p class="text-sm text-white/70">Active Users</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-md rounded-xl p-4">
                        <i class='bx bx-trophy text-2xl mb-2'></i>
                        <p class="text-2xl font-bold">${this.leaderboardData[0]?.points || 0}</p>
                        <p class="text-sm text-white/70">Top Score</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-md rounded-xl p-4">
                        <i class='bx bx-leaf text-2xl mb-2'></i>
                        <p class="text-2xl font-bold">${Math.round(this.leaderboardData.reduce((sum, u) => sum + u.points, 0) / this.leaderboardData.length)}</p>
                        <p class="text-sm text-white/70">Avg Eco Score</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Leaderboard -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <!-- Podium Winners -->
                        <div class="bg-gradient-to-br from-gray-50 to-white p-8 border-b-2 border-primary-green/10">
                            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <i class='bx bx-crown text-yellow-500 text-3xl'></i>
                                Top 3 Champions
                            </h2>
                            <div class="grid grid-cols-3 gap-4">
                                ${this.renderModernPodium(top3)}
                            </div>
                        </div>

                        <!-- Full Rankings -->
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <i class='bx bx-list-ul text-primary-green text-2xl'></i>
                                Full Rankings
                            </h3>
                            <div class="space-y-2">
                                ${this.leaderboardData.map(user => this.renderModernLeaderboardRow(user)).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-6">
                    <!-- Latest News -->
                    <div class="bg-white rounded-3xl shadow-xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <i class='bx bx-news text-primary-green text-2xl'></i>
                                Eco News
                            </h3>
                        </div>
                        <div class="space-y-4">
                            ${this.news.map(item => `
                                <a href="${item.url || '#'}" target="_blank" class="block group">
                                    <div class="news-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                                        <img src="${item.image}" alt="News" class="w-full h-32 object-cover" onerror="this.src='https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400'">
                                        <div class="p-4 bg-white">
                                            <h4 class="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-green transition">${item.title}</h4>
                                            <p class="text-xs text-gray-500">${item.date}</p>
                                        </div>
                                    </div>
                                </a>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Your Progress Card -->
                    <div class="bg-gradient-to-br from-primary-green to-medium-green rounded-3xl shadow-xl p-6 text-white">
                        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                            <i class='bx bx-user-circle text-2xl'></i>
                            Your Progress
                        </h3>
                        <div class="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4">
                            <p class="text-sm text-white/70 mb-1">Current Rank</p>
                            <p class="text-4xl font-bold">#${this.currentUser.rank}</p>
                        </div>
                        <div class="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4">
                            <p class="text-sm text-white/70 mb-1">Your Eco Score</p>
                            <p class="text-4xl font-bold">${this.currentUser.points}</p>
                        </div>
                        <button class="w-full bg-white text-primary-green py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg">
                            Improve Your Score
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderModernPodium(top3) {
        const positions = [
            { index: 1, place: '2', medal: '🥈', bgColor: 'from-gray-300 to-gray-400', height: 'h-32' },
            { index: 0, place: '1', medal: '🏆', bgColor: 'from-yellow-400 to-yellow-500', height: 'h-40' },
            { index: 2, place: '3', medal: '🥉', bgColor: 'from-orange-400 to-orange-500', height: 'h-28' }
        ];

        return positions.map(({ index, place, medal, bgColor, height }) => {
            const user = top3[index];
            return `
                <div class="flex flex-col items-center">
                    <div class="relative mb-3">
                        <div class="w-16 h-16 rounded-full bg-gradient-to-br ${bgColor} flex items-center justify-center text-3xl shadow-lg ring-4 ring-white">
                            ${user.avatar}
                        </div>
                        <div class="absolute -top-2 -right-2 text-3xl">${medal}</div>
                    </div>
                    <p class="font-bold text-gray-900 text-sm mb-2">${user.name}</p>
                    <div class="bg-gradient-to-br ${bgColor} ${height} w-full rounded-t-xl flex flex-col items-center justify-start pt-4 shadow-lg">
                        <p class="text-2xl font-bold text-white">#${place}</p>
                        <p class="text-lg font-semibold text-white mt-1">${user.points}</p>
                        <p class="text-xs text-white/80">ECO SCORE</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderModernLeaderboardRow(user) {
        const trendIcons = {
            up: '<i class="bx bx-trending-up text-green-500 text-xl"></i>',
            down: '<i class="bx bx-trending-down text-red-500 text-xl"></i>',
            same: '<i class="bx bx-minus text-gray-400 text-xl"></i>'
        };
        
        const rankBadgeColor = user.rank <= 3 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' : 'bg-gray-100 text-gray-700';
        const isCurrentUser = user.isCurrentUser;
        const highlightClass = isCurrentUser ? 'from-primary-green/10 to-medium-green/10 border-2 border-primary-green shadow-lg' : 'from-gray-50 to-white border border-gray-100';
        const nameDisplay = isCurrentUser ? `${user.name} <span class="text-xs bg-primary-green text-white px-2 py-1 rounded-full ml-2">YOU</span>` : user.name;

        return `
            <div class="flex items-center justify-between p-4 bg-gradient-to-r ${highlightClass} rounded-xl hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <div class="flex items-center gap-4 flex-1">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 ${rankBadgeColor} rounded-lg flex items-center justify-center font-bold shadow-md">
                            ${user.rank}
                        </div>
                        ${trendIcons[user.trend]}
                    </div>
                    
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full ${isCurrentUser ? 'bg-gradient-to-br from-yellow-400 to-orange-500 ring-4 ring-primary-green/30' : 'bg-gradient-to-br from-primary-green to-medium-green'} flex items-center justify-center text-xl shadow-md ring-2 ring-white">
                            ${user.avatar}
                        </div>
                        <div>
                            <p class="font-semibold text-gray-900">${nameDisplay}</p>
                            <p class="text-xs text-gray-500">${isCurrentUser ? 'That\'s you!' : 'Eco Champion'}</p>
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center gap-4">
                    ${user.badge ? `<span class="text-2xl">${user.badge}</span>` : ''}
                    <div class="text-right">
                        <p class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-medium-green">${user.points}</p>
                        <p class="text-xs text-gray-500 font-medium">ECO SCORE</p>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Add any interactive functionality here
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new LeaderboardApp());
} else {
    new LeaderboardApp();
}

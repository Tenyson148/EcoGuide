// Leaderboard Page
class LeaderboardApp {
    constructor() {
        this.leaderboardData = [
            { rank: 1, name: "Sarah Chen", avatar: "👤", country: "Singapore", countryFlag: "🇸🇬", points: 95, badge: "🏆", trend: "up" },
            { rank: 2, name: "Marcus Silva", avatar: "👤", country: "Brazil", countryFlag: "🇧🇷", points: 92, badge: "🥈", trend: "up" },
            { rank: 3, name: "Aisha Patel", avatar: "👤", country: "India", countryFlag: "🇮🇳", points: 89, badge: "🥉", trend: "same" },
            { rank: 4, name: "Lars Anderson", avatar: "👤", country: "Sweden", countryFlag: "🇸🇪", points: 87, badge: "", trend: "up" },
            { rank: 5, name: "Emma Dubois", avatar: "👤", country: "France", countryFlag: "🇫🇷", points: 85, badge: "", trend: "down" },
            { rank: 6, name: "Kenji Tanaka", avatar: "👤", country: "Japan", countryFlag: "🇯🇵", points: 83, badge: "", trend: "up" },
            { rank: 7, name: "Sofia Rodriguez", avatar: "👤", country: "Spain", countryFlag: "🇪🇸", points: 81, badge: "", trend: "same" },
            { rank: 8, name: "Ahmed Hassan", avatar: "👤", country: "Egypt", countryFlag: "🇪🇬", points: 79, badge: "", trend: "up" },
            { rank: 9, name: "Olivia Smith", avatar: "👤", country: "Australia", countryFlag: "🇦🇺", points: 76, badge: "", trend: "down" },
            { rank: 10, name: "Diego Martinez", avatar: "👤", country: "Mexico", countryFlag: "🇲🇽", points: 74, badge: "", trend: "same" }
        ];
        
        this.news = [];
        this.init();
    }

    async init() {
        await this.fetchEnvironmentalNews();
        this.render();
        this.attachEventListeners();
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
            <div class="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
                <!-- Header -->
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-bold text-gray-900">Leaderboard</h1>
                    <button class="text-gray-400 hover:text-gray-600 transition">
                        <i class='bx bx-x text-3xl'></i>
                    </button>
                </div>

                <!-- Podium Section -->
                <div class="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
                    ${this.renderPodium(top3)}
                </div>

                <!-- Winner Announcement -->
                <div class="bg-gradient-to-r from-primary-green/10 to-medium-green/10 rounded-xl p-4 mb-8 text-center border-2 border-primary-green/20">
                    <p class="text-gray-900 font-semibold mb-2">🌟 Top Eco Champion!</p>
                    <p class="text-gray-600 text-sm">${top3[0].name} leads with the highest sustainability score (95) - Outstanding eco-friendly habits!</p>
                </div>

                <!-- Latest News & Chart Section -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <!-- Latest News -->
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-900">Latest news</h3>
                            <a href="#" class="text-sm text-gray-600 hover:text-primary-green transition">See all</a>
                        </div>
                        <div class="space-y-3">
                            ${this.news.map(item => `
                                <a href="${item.url || '#'}" target="_blank" class="news-card flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                                    <img src="${item.image}" alt="News" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" onerror="this.src='https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400'">
                                    <div class="flex-1 min-w-0">
                                        <h4 class="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">${item.title}</h4>
                                        <p class="text-xs text-gray-600 line-clamp-1">${item.description}</p>
                                    </div>
                                </a>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Last Game Rating Chart -->
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-900">Last game rating</h3>
                            <a href="#" class="text-sm text-gray-600 hover:text-primary-green transition">See all</a>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-4 h-48 relative">
                            <svg viewBox="0 0 300 150" class="w-full h-full">
                                <!-- Grid lines -->
                                <line x1="0" y1="130" x2="300" y2="130" stroke="#e5e7eb" stroke-width="1"/>
                                <line x1="0" y1="100" x2="300" y2="100" stroke="#e5e7eb" stroke-width="1"/>
                                <line x1="0" y1="70" x2="300" y2="70" stroke="#e5e7eb" stroke-width="1"/>
                                <line x1="0" y1="40" x2="300" y2="40" stroke="#e5e7eb" stroke-width="1"/>
                                
                                <!-- Orange line (historical) -->
                                <polyline 
                                    points="0,120 50,115 100,110 150,105 200,95"
                                    fill="none" 
                                    stroke="#fb923c" 
                                    stroke-width="2"
                                />
                                
                                <!-- Green line (current) -->
                                <polyline 
                                    points="0,110 50,105 100,100 150,85 200,70 250,30 280,20"
                                    fill="none" 
                                    stroke="#22c55e" 
                                    stroke-width="3"
                                />
                                
                                <!-- End point -->
                                <circle cx="280" cy="20" r="4" fill="#22c55e"/>
                                <circle cx="280" cy="20" r="8" fill="none" stroke="#22c55e" stroke-width="2"/>
                                
                                <!-- Value label -->
                                <text x="280" y="15" text-anchor="middle" class="text-xs font-bold" fill="#1f2937">71</text>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Full Leaderboard Table -->
                <div class="overflow-hidden">
                    <div class="grid grid-cols-4 gap-4 text-sm text-gray-500 font-medium mb-4 px-4">
                        <div>Place</div>
                        <div>Name</div>
                        <div>Country</div>
                        <div class="text-right">Eco Score</div>
                    </div>
                    
                    <div class="space-y-2">
                        ${this.leaderboardData.map(user => this.renderLeaderboardRow(user)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderPodium(top3) {
        const positions = [
            { index: 1, place: '2nd', prize: '92 ECO SCORE', color: 'bg-gray-100' },
            { index: 0, place: '1st', prize: '95 ECO SCORE', color: 'bg-yellow-50' },
            { index: 2, place: '3rd', prize: '89 ECO SCORE', color: 'bg-orange-50' }
        ];

        return positions.map(({ index, place, prize, color }) => {
            const user = top3[index];
            return `
                <div class="podium-card text-center">
                    <div class="mb-3 flex justify-center">
                        <div class="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-3xl">
                            ${user.avatar}
                        </div>
                    </div>
                    <p class="font-semibold text-gray-900 mb-1">${user.name}</p>
                    <div class="${color} rounded-lg p-3 mt-2">
                        <p class="font-bold text-gray-900 mb-1">${place}</p>
                        <p class="text-xs text-gray-600">${prize}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderLeaderboardRow(user) {
        const trendIcons = {
            up: '<i class="bx bx-up-arrow-alt text-green-500"></i>',
            down: '<i class="bx bx-down-arrow-alt text-red-500"></i>',
            same: '<i class="bx bx-minus text-gray-400"></i>'
        };

        return `
            <div class="grid grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div class="flex items-center gap-2">
                    ${trendIcons[user.trend]}
                    <span class="font-semibold text-gray-900">${user.rank}${user.rank === 1 ? 'st' : user.rank === 2 ? 'nd' : user.rank === 3 ? 'rd' : 'th'}</span>
                </div>
                
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                        ${user.avatar}
                    </div>
                    <span class="font-medium text-gray-900">${user.name}</span>
                </div>
                
                <div class="flex items-center gap-2">
                    <span class="text-2xl">${user.countryFlag}</span>
                    <span class="text-gray-700">${user.country}</span>
                    ${user.badge ? `<span class="ml-2">${user.badge}</span>` : ''}
                </div>
                
                <div class="text-right">
                    <span class="font-bold text-primary-green">${user.points}</span>
                    <span class="text-xs text-gray-500 ml-1">ECO</span>
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

// Simple vanilla JS implementation (React-like structure)
class HomePage {
    constructor() {
        this.content = null;
        this.init();
    }

    async init() {
        await this.loadContent();
        this.render();
        this.attachEventListeners();
    }

    async loadContent() {
        try {
            const response = await fetch('/data/content.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.content = await response.json();
            console.log('Content loaded successfully:', this.content);
        } catch (error) {
            console.error('Error loading content:', error);
            // Provide fallback content
            this.content = {
                hero: {
                    title: "Track Your Environmental Impact",
                    subtitle: "Join EcoGuide Today",
                    description: "Make a difference with every choice."
                },
                sections: []
            };
        }
    }

    render() {
        const root = document.getElementById('root');
        if (!root || !this.content) return;

        root.innerHTML = `
            ${this.renderNavbar()}
            <main class="min-h-screen">
                ${this.renderHero()}
                ${this.renderSections()}
                ${this.renderCTA()}
            </main>
            ${this.renderFooter()}
        `;
    }

    renderNavbar() {
        return `
            <nav class="bg-primary-green/95 backdrop-blur-md sticky top-0 z-50 shadow-lg">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div class="flex items-center">
                            <span class="text-2xl font-bold text-white tracking-wide">EcoGuide</span>
                        </div>
                        
            <div class="hidden md:flex items-center space-x-8">
                <a href="/home" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium">Home</a>
                <a href="/daily-logs" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium">Daily Logs</a>
                <a href="/monthly-logs" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium">Monthly Logs</a>
                <a href="/leaderboard" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium">Leaderboard</a>
                <a href="/faq-contact" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium">FAQ & Contact</a>
            </div>

            <button onclick="location.href='/logout'" class="hidden md:block bg-white text-primary-green px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform">
                Logout
            </button>                        <button id="mobile-menu-btn" class="md:hidden text-white">
                            <i class='bx bx-menu text-3xl'></i>
                        </button>
                    </div>

                    <div id="mobile-menu" class="hidden md:hidden pb-4">
                        <div class="flex flex-col space-y-3">
                            <a href="/home" class="text-white hover:text-gray-200 transition duration-300 font-medium">Home</a>
                            <a href="/daily-logs" class="text-white hover:text-gray-200 transition duration-300 font-medium">Daily Logs</a>
                            <a href="/monthly-logs" class="text-white hover:text-gray-200 transition duration-300 font-medium">Monthly Logs</a>
                            <a href="/leaderboard" class="text-white hover:text-gray-200 transition duration-300 font-medium">Leaderboard</a>
                            <a href="/faq-contact" class="text-white hover:text-gray-200 transition duration-300 font-medium">FAQ & Contact</a>
                            <button onclick="location.href='/logout'" class="bg-white text-primary-green px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-md text-center">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    renderHero() {
        const { hero } = this.content;
        return `
            <section class="relative bg-gradient-to-br from-primary-green via-medium-green to-light-green py-24 px-4 overflow-hidden">
                <div class="absolute inset-0 opacity-10">
                    <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div class="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                
                <div class="max-w-7xl mx-auto relative z-10">
                    <div class="grid md:grid-cols-2 gap-12 items-center">
                        <div class="text-white space-y-6 animate-fade-in">
                            <div class="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                                <i class='bx bx-time-five mr-2'></i>
                                Track Daily Impact
                            </div>
                            <h1 class="text-5xl md:text-6xl font-bold leading-tight">
                                ${hero.title}
                            </h1>
                            <p class="text-xl md:text-2xl text-white/90 font-light">
                                ${hero.subtitle}
                            </p>
                            <p class="text-lg text-white/80">
                                ${hero.description}
                            </p>
                            <div class="flex flex-wrap gap-4 pt-4">
                                <button class="bg-white text-primary-green px-8 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                    Get Started
                                </button>
                                <button class="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        
                        <div class="relative">
                            <div class="aspect-video rounded-2xl shadow-2xl border-4 border-white/20 overflow-hidden">
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src="https://www.youtube.com/embed/tRKdosNfpm4" 
                                    title="EcoGuide Introduction" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowfullscreen
                                    class="w-full h-full">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderSections() {
        const { sections } = this.content;
        return sections.map((section, index) => {
            const isEven = index % 2 === 0;
            const bulletPoints = section.bullets ? section.bullets.map(bullet => `
                <li class="flex items-start gap-3 text-gray-600">
                    <i class="bx bx-check-circle text-2xl text-primary-green mt-0.5 flex-shrink-0"></i>
                    <span class="text-base leading-relaxed">${bullet}</span>
                </li>
            `).join('') : '';
            
            return `
                <section class="py-20 px-4 ${isEven ? 'bg-white' : 'bg-gray-50'}">
                    <div class="max-w-6xl mx-auto">
                        <div class="flex flex-col md:flex-row gap-12 items-center ${!isEven ? 'md:flex-row-reverse' : ''}">
                            <div class="md:w-1/2 space-y-6">
                                <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-green to-medium-green rounded-2xl text-white text-3xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                                    <i class='bx ${section.icon}'></i>
                                </div>
                                <h2 class="text-4xl font-bold text-gray-900">
                                    ${section.title}
                                </h2>
                                <p class="text-lg text-gray-700 font-medium">
                                    ${section.description}
                                </p>
                                ${bulletPoints ? `<ul class="space-y-3">${bulletPoints}</ul>` : ''}
                            </div>
                            <div class="md:w-1/2">
                                <div class="aspect-video rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                    ${section.image ? `
                                        <img 
                                            src="${section.image}" 
                                            alt="${section.title}"
                                            class="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ` : `
                                        <div class="aspect-video rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-xl"></div>
                                    `}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;
        }).join('');
    }

    renderCTA() {
        const { cta } = this.content;
        return `
            <section class="bg-gradient-to-r from-primary-green to-medium-green py-20 px-4">
                <div class="max-w-4xl mx-auto text-center text-white space-y-6">
                    <h2 class="text-4xl md:text-5xl font-bold">
                        ${cta.title}
                    </h2>
                    <p class="text-xl text-white/90">
                        ${cta.description}
                    </p>
                    <button class="bg-white text-primary-green px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300 shadow-xl mt-8">
                        ${cta.buttonText}
                    </button>
                </div>
            </section>
        `;
    }

    renderFooter() {
        return `
            <footer class="bg-primary-green text-white py-8 px-4">
                <div class="max-w-7xl mx-auto text-center">
                    <p class="text-white/80">&copy; 2025 EcoGuide. Making sustainability simple.</p>
                </div>
            </footer>
        `;
    }

    attachEventListeners() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new HomePage());
} else {
    new HomePage();
}

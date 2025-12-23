// FAQ & Contact Page
class FAQContactApp {
    constructor() {
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
            <main class="bg-gray-50">
                ${this.renderContactSection()}
                ${this.renderFAQSection()}
            </main>
            ${this.renderFooter()}
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
                            <a href="/leaderboard" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium">Leaderboard</a>
                            <a href="/faq-contact" class="nav-link text-white hover:text-gray-200 transition duration-300 font-medium border-b-2 border-white">FAQ & Contact</a>
                        </div>

                        <button onclick="location.href='/logout'" class="hidden md:block bg-white text-[#2d5f4f] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-md">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        `;
    }

    renderFAQSection() {
        const faqs = [
            {
                question: "What is EcoGuide?",
                answer: "EcoGuide is a simple tool that helps you understand how your daily habits affect the environment. You log small details about your day, and the app gives you a score and a short suggestion."
            },
            {
                question: "How long does daily logging take?",
                answer: "Less than a minute. The questions are short and easy to answer."
            },
            {
                question: "What do I log each day?",
                answer: "You enter basic habits such as: how far you travelled, whether you used the AC or geyser, if you had a long shower or did laundry, your meals, your waste level, and whether you bought anything."
            },
            {
                question: "How is my sustainability score calculated?",
                answer: "Your score is based on the habits you enter. Some actions have higher environmental impact than others. The score shows how sustainable your day was in a simple way."
            },
            {
                question: "What does the AI do?",
                answer: "The AI reads your daily inputs and gives you a short suggestion. The suggestions are practical and easy to follow. They are based only on the habits you logged."
            },
            {
                question: "What is the purpose of the leaderboard?",
                answer: "The leaderboard shows how different users are doing. It is meant to motivate, not compete. You appear by your username only."
            },
            {
                question: "Is my data safe?",
                answer: "Yes. Only your habit entries are stored. No sensitive personal information is collected. You can delete your data at any time."
            },
            {
                question: "Why are the questions so simple?",
                answer: "The goal is to help you stay consistent. If the process becomes complicated, most users stop using the tool. Simplicity keeps the habit going."
            }
        ];

        return `
            <section class="py-16 bg-gray-50">
                <div class="max-w-4xl mx-auto px-4">
                <div class="text-center mb-12">
                    <span class="text-sm font-semibold text-primary-green uppercase tracking-wide">FAQ</span>
                    <h2 class="text-4xl font-bold text-gray-900 mt-2">Frequently Asked Questions</h2>
                </div>                    <div class="space-y-4">
                        ${faqs.map((faq, index) => `
                            <div class="faq-item bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <button class="faq-toggle w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition duration-200" data-index="${index}">
                                    <span class="text-lg font-medium text-gray-900">${faq.question}</span>
                                    <i class='bx bx-plus text-2xl text-primary-green plus-icon'></i>
                                </button>
                                <div class="faq-answer">
                                    <div class="px-6 pb-6 text-gray-600">
                                        ${faq.answer}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderContactSection() {
        return `
            <section class="py-16 bg-white">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <!-- Left Side - Contact Info -->
                        <div>
                            <span class="text-sm font-semibold text-primary-green uppercase tracking-wide">CONTACT US</span>
                            <h2 class="text-5xl font-bold text-gray-900 mt-4 mb-6">Get in touch</h2>
                            <p class="text-xl text-gray-900 mb-4">We'll respond to you in 24 hours</p>
                            <p class="text-gray-600 mb-8">
                                Have a project in mind? We're all ears. Just drop a message via the form, 
                                <a href="mailto:info@ecoguide.com" class="text-primary-green font-medium hover:underline">send us an email directly</a>, 
                                or book a call below.
                            </p>

                            <div class="flex items-center gap-4 mb-8">
                                <div class="flex items-center gap-3 bg-primary-green text-white px-6 py-3 rounded-full shadow-lg hover:bg-medium-green transition duration-300">
                                    <i class='bx bx-phone text-xl'></i>
                                    <span class="font-medium">Book a 15 minute intro call</span>
                                </div>
                            </div>

                            <div class="flex gap-3">
                                <a href="#" class="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-primary-green hover:text-primary-green transition duration-300">
                                    <i class='bx bxl-twitter text-xl'></i>
                                </a>
                                <a href="#" class="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-primary-green hover:text-primary-green transition duration-300">
                                    <i class='bx bxl-instagram text-xl'></i>
                                </a>
                                <a href="#" class="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-primary-green hover:text-primary-green transition duration-300">
                                    <i class='bx bxl-linkedin text-xl'></i>
                                </a>
                                <a href="#" class="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-primary-green hover:text-primary-green transition duration-300">
                                    <i class='bx bx-envelope text-xl'></i>
                                </a>
                            </div>
                        </div>

                        <!-- Right Side - Contact Form -->
                        <div class="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200">
                            <div class="mb-6">
                                <div class="border-b-2 border-primary-green inline-block pb-2">
                                    <span class="text-lg font-semibold text-gray-900">START A PROJECT</span>
                                </div>
                            </div>

                            <form id="contact-form" class="space-y-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-900 mb-2">
                                            Name <span class="text-gray-500">(required)</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            required
                                            placeholder="Enter full name"
                                            class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green transition duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-900 mb-2">
                                            Email <span class="text-gray-500">(required)</span>
                                        </label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            required
                                            placeholder="Enter email"
                                            class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green transition duration-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-900 mb-2">
                                        Subject <span class="text-gray-500">(required)</span>
                                    </label>
                                    <select 
                                        name="subject" 
                                        required
                                        class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green transition duration-200"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-900 mb-2">
                                        Message <span class="text-gray-500">(required)</span>
                                    </label>
                                    <textarea 
                                        name="message" 
                                        required
                                        rows="6"
                                        placeholder="Tell us about your project..."
                                        class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green transition duration-200 resize-none"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit"
                                    class="w-full bg-primary-green text-white py-4 rounded-full font-semibold text-lg hover:bg-medium-green transition duration-300 shadow-lg"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderFooter() {
        return `
            <footer class="bg-primary-green text-white py-8">
                <div class="max-w-7xl mx-auto px-4 text-center">
                    <p class="text-sm opacity-90">© 2024 EcoGuide. All rights reserved.</p>
                    <p class="text-xs opacity-75 mt-2">Making sustainability accessible for everyone</p>
                </div>
            </footer>
        `;
    }

    attachEventListeners() {
        // FAQ Toggle
        document.querySelectorAll('.faq-toggle').forEach(button => {
            button.addEventListener('click', (e) => {
                const faqItem = button.closest('.faq-item');
                const isActive = faqItem.classList.contains('active');
                
                // Close all other FAQs
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Toggle current FAQ
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });

        // Contact Form Submit
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            form.reset();
        });
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FAQContactApp());
} else {
    new FAQContactApp();
}

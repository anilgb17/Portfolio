/**
 * ANIL GOVIND BADIGER - CINEMATIC PORTFOLIO JAVASCRIPT
 * Core Features: Preloader, Ambient Canvas, 3D Tilt, Skills Filter, Lightbox, AI Assistant, Smooth Navigation
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. PRELOADER LOGIC
       -------------------------------------------------------------------------- */
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    if (loader && progressBar && progressText) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 8;
            if (progress > 100) progress = 100;

            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.classList.add('fade-out');
                }, 300);
            }
        }, 45);
    }

    /* --------------------------------------------------------------------------
       2. DYNAMIC YEAR
       -------------------------------------------------------------------------- */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* --------------------------------------------------------------------------
       3. STICKY NAVBAR & ACTIVE NAV LINKS ON SCROLL
       -------------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Sticky styling
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlight
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    /* --------------------------------------------------------------------------
       4. MOBILE NAVIGATION DRAWER
       -------------------------------------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (hamburger && mobileDrawer) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('active');
            mobileDrawer.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileDrawer.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* --------------------------------------------------------------------------
       5. SMOOTH CURSOR GLOW EFFECT
       -------------------------------------------------------------------------- */
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            currentX += (mouseX - currentX) * 0.12;
            currentY += (mouseY - currentY) * 0.12;
            cursorGlow.style.left = `${currentX}px`;
            cursorGlow.style.top = `${currentY}px`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    /* --------------------------------------------------------------------------
       6. 3D PARALLAX TILT ON HERO PORTRAIT & CARDS
       -------------------------------------------------------------------------- */
    const portraitPod = document.getElementById('portrait-stage');
    const heroSection = document.getElementById('home');

    if (portraitPod && heroSection && window.matchMedia('(min-width: 992px)').matches) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const rotateY = x * 12; // degrees
            const rotateX = -y * 10;

            portraitPod.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            portraitPod.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }

    /* --------------------------------------------------------------------------
       7. AMBIENT PARTICLES CANVAS (ATMOSPHERIC STUDIO MOTES)
       -------------------------------------------------------------------------- */
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 45;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2.2 + 0.6;
                this.speedX = (Math.random() - 0.5) * 0.35;
                this.speedY = -Math.random() * 0.45 - 0.1;
                this.alpha = Math.random() * 0.4 + 0.1;
                this.color = Math.random() > 0.4 ? '245, 158, 11' : '255, 255, 255';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.y < 0 || this.x < 0 || this.x > width) {
                    this.reset();
                    this.y = height + 10;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(${this.color}, 0.5)`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function render() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(render);
        }
        render();
    }

    /* --------------------------------------------------------------------------
       8. SKILLS CATEGORY FILTERING TABS
       -------------------------------------------------------------------------- */
    const skillTabs = document.querySelectorAll('.skill-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const category = tab.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    /* --------------------------------------------------------------------------
       9. CONTACT FORM INTERACTION
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formStatusMsg = document.getElementById('form-status-msg');

    if (contactForm && formStatusMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;

            submitBtn.innerHTML = `<span>SENDING...</span> <i class="fas fa-spinner fa-spin"></i>`;
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = `<span>MESSAGE TRANSMITTED</span> <i class="fas fa-check"></i>`;
                formStatusMsg.textContent = "Thank you! Your message has been received. Anil will get back to you shortly.";
                formStatusMsg.className = "form-status-alert success";
                formStatusMsg.style.display = "block";
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                }, 3500);
            }, 1200);
        });
    }

    /* --------------------------------------------------------------------------
       10. AI ASSISTANT CHATBOT
       -------------------------------------------------------------------------- */
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    if (chatbotToggle && chatbotWindow && chatbotClose) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('hidden');
            if (!chatbotWindow.classList.contains('hidden')) {
                chatbotInput.focus();
            }
        });

        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.add('hidden');
        });

        function appendMessage(text, isBot = true) {
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`;
            bubble.innerHTML = `<div class="bubble-content">${text}</div>`;
            chatbotMessages.appendChild(bubble);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function getBotResponse(input) {
            const query = input.toLowerCase();

            if (query.includes('data') || query.includes('analyst') || query.includes('analytics') || query.includes('power bi') || query.includes('sql')) {
                return "Anil is a skilled <strong>Data Analyst</strong> proficient in <strong>SQL, Power BI, Python (Pandas, NumPy), and Exploratory Data Analysis (EDA)</strong>. He engineered the <strong>KMF Dairy Sales & Distribution Analytics</strong> dashboard across 10 districts and holds the <strong>AI Business Intelligence Analyst</strong> certification from Skill India/NSDC.<br><br>👉 <a href='Anil_Govind_Badiger_Data_Analyst_Resume.pdf' download='Anil_Govind_Badiger_Data_Analyst_Resume.pdf' style='color:#f59e0b;font-weight:600;text-decoration:underline;'>Download Data Analyst Resume (PDF)</a>";
            }
            if (query.includes('project') || query.includes('work') || query.includes('portfolio')) {
                return "Anil has engineered three standout projects: <strong>CSMS</strong> (Car Service Management System in Java, Spring Boot, React, MySQL), an <strong>AI Helmet & Mask Detection System</strong> (TensorFlow, OpenCV CNN with 97.55% accuracy), and <strong>KMF Dairy Sales Analytics</strong> (Python & Power BI).";
            }
            if (query.includes('skill') || query.includes('tech') || query.includes('stack') || query.includes('language')) {
                return "Anil is proficient across three domains:<br>• <strong>Full Stack:</strong> Java, Spring Boot, React.js, MySQL, REST APIs, Microservices, Docker, AWS<br>• <strong>AI/ML:</strong> Python, TensorFlow, CNN, OpenCV, Scikit-Learn<br>• <strong>Data Analytics:</strong> SQL, Power BI, Pandas, NumPy, EDA, Data Cleaning";
            }
            if (query.includes('experience') || query.includes('intern') || query.includes('company') || query.includes('acaders')) {
                return "Anil has worked as a <strong>Java Full Stack Intern at Acaders</strong> (Bangalore), cutting API latency by 25%, and as an <strong>AI/ML Intern at Smart Learn EdTech</strong>, developing CNN computer vision models with 85.4% accuracy.";
            }
            if (query.includes('education') || query.includes('college') || query.includes('degree') || query.includes('cgpa')) {
                return "Anil holds a <strong>B.E. in Computer Science & Engineering</strong> from AGMRCET (VTU) with a stellar <strong>CGPA of 8.76/10</strong>.";
            }
            if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('hire')) {
                return "You can reach Anil directly at <strong>anilbadiger857@gmail.com</strong>, by phone at <strong>+91 9019615968</strong>, or on LinkedIn at <a href='https://www.linkedin.com/in/anil-gb-901961agb' target='_blank' style='color:#f59e0b;text-decoration:underline;'>anil-gb-901961agb</a>.";
            }
            if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
                return "Anil has tailored resumes available for your specific opening:<br><br>" +
                       "☕ <a href='Anil_Govind_Badiger_Java_Developer_Resume.pdf' download='Anil_Govind_Badiger_Java_Developer_Resume.pdf' style='color:#f59e0b;font-weight:600;text-decoration:underline;'>Java Full Stack Resume</a><br>" +
                       "🧠 <a href='Anil_Govind_Badiger_AI_ML_Resume.pdf' download='Anil_Govind_Badiger_AI_ML_Resume.pdf' style='color:#f59e0b;font-weight:600;text-decoration:underline;'>AI / ML Engineer Resume</a><br>" +
                       "📊 <a href='Anil_Govind_Badiger_Data_Analyst_Resume.pdf' download='Anil_Govind_Badiger_Data_Analyst_Resume.pdf' style='color:#f59e0b;font-weight:600;text-decoration:underline;'>Data Analyst Resume</a>";
            }
            return "Anil Govind Badiger is a Java Full Stack Developer, AI/ML Engineer, and Data Analyst with an 8.76 CGPA. Would you like to know more about his <strong>projects</strong>, <strong>technical skills</strong>, <strong>internships</strong>, or <strong>download his tailored resumes</strong>?";
        }

        function handleSend() {
            const query = chatbotInput.value.trim();
            if (!query) return;

            appendMessage(query, false);
            chatbotInput.value = '';

            setTimeout(() => {
                const response = getBotResponse(query);
                appendMessage(response, true);
            }, 500);
        }

        chatbotSendBtn.addEventListener('click', handleSend);
        chatbotInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
});

/* --------------------------------------------------------------------------
   GLOBAL LIGHTBOX FUNCTIONS
   -------------------------------------------------------------------------- */
function openPreview(imgSrc, title) {
    const modal = document.getElementById('preview-modal');
    const modalImg = document.getElementById('preview-img');
    const modalTitle = document.getElementById('preview-title');

    if (modal && modalImg && modalTitle) {
        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closePreview() {
    const modal = document.getElementById('preview-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePreview();
});

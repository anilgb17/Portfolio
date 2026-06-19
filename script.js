/* =============================================
   PRELOADER
   ============================================= */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    if (!loader || !progressBar || !progressText) return;

    let progress = 0;
    const duration = 1800;
    const interval = 18;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
        progress = Math.min(progress + increment, 100);
        const pct = Math.floor(progress);
        progressBar.style.width = `${pct}%`;
        progressText.textContent = `${pct}%`;

        if (progress >= 100) {
            clearInterval(timer);
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => { 
                    loader.style.display = 'none';
                    // Start typing effect after loader
                    startTypingEffect();
                }, 600);
            }, 350);
        }
    }, interval);
});

/* =============================================
   TYPING EFFECT FOR HERO
   ============================================= */
function startTypingEffect() {
    const roles = [
        'Java Full Stack Developer',
        'AI/ML Enthusiast',
        'Problem Solver'
    ];
    
    const typedElement = document.getElementById('typed-role');
    if (!typedElement) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* =============================================
   DOM READY
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {

    // Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== CURSOR GLOW EFFECT =====
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    // Extra background blob
    const bgBlob = document.createElement('div');
    bgBlob.className = 'bg-blob-extra';
    document.body.appendChild(bgBlob);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== BUTTON RIPPLE EFFECT =====
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ===== MOBILE NAVIGATION =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks   = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('open');
        });
    });

    // ===== NAVBAR SCROLL TINT =====
    const navbar = document.querySelector('.navbar');
    const onScroll = () => {
        if (window.scrollY > 60) {
            navbar.style.background = 'rgba(3, 3, 6, 0.97)';
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.6)';
        } else {
            navbar.style.background = 'rgba(6, 6, 10, 0.75)';
            navbar.style.boxShadow = 'none';
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navItemLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
        });
        navItemLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });

    // ===== SCROLL REVEAL =====
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Animate skill fills when skills section enters view
                if (entry.target.classList.contains('skills-grid')) {
                    animateSkillBars();
                }
                // Animate stats counter when about section enters view
                if (entry.target.classList.contains('stats-grid')) {
                    animateStats();
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.hidden-element').forEach(el => revealObserver.observe(el));

    // ===== STATS COUNTER ANIMATION =====
    let statsAnimated = false;
    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;

        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const hasPlus = text.includes('+');
            const number = parseFloat(text);
            
            if (isNaN(number)) return;

            let current = 0;
            const increment = number / 50;
            const duration = 1500;
            const stepTime = duration / 50;

            const counter = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = number + (hasPlus ? '+' : '');
                    clearInterval(counter);
                    stat.classList.add('counting');
                    setTimeout(() => stat.classList.remove('counting'), 500);
                } else {
                    stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                }
            }, stepTime);
        });
    }

    // ===== SKILL BAR ANIMATION =====
    function animateSkillBars() {
        document.querySelectorAll('.skill-fill').forEach(fill => {
            const target = fill.style.width;
            fill.style.width = '0%';
            // Small delay so transition triggers
            requestAnimationFrame(() => requestAnimationFrame(() => {
                fill.style.width = target;
            }));
        });
    }

    // ===== CARD 3D TILT EFFECT =====
    document.querySelectorAll('.project-card, .skill-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
            card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
            card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // ===== PROJECT CARD MOUSE TRACKING =====
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // ===== PARTICLE BACKGROUND =====
    createParticles();

    // ===== CONTACT FORM =====
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const originalHTML = btn.innerHTML;
            
            btn.classList.add('success');
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
            form.reset();
            
            setTimeout(() => {
                btn.classList.remove('success');
                btn.innerHTML = originalHTML;
            }, 3000);
        });
    }

    // ===== CHATBOT =====
    const chatToggle   = document.getElementById('chatbot-toggle');
    const chatWindow   = document.getElementById('chatbot-window');
    const chatClose    = document.getElementById('chatbot-close');
    const chatSend     = document.getElementById('chatbot-send');
    const chatInput    = document.getElementById('chatbot-input-field');
    const chatMessages = document.getElementById('chatbot-messages');

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
            if (!chatWindow.classList.contains('hidden')) chatInput?.focus();
        });

        chatClose?.addEventListener('click', () => chatWindow.classList.add('hidden'));

        const botReplies = [
            "Anil is currently available for new opportunities. Feel free to reach out via the contact form!",
            "He specializes in Java Full Stack Development with Spring Boot, React.js, and MySQL. Check out his projects above!",
            "His email is anilbadiger857@gmail.com — don't hesitate to get in touch.",
            "Anil has a B.E in Computer Science with a CGPA of 8.76. He's passionate about building scalable web applications!",
            "He has hands-on experience optimizing REST APIs, reducing latency by 25%, and building AI security systems with 97.55% accuracy.",
            "To hire Anil or discuss a project, the best way is to fill out the contact form on this page."
        ];

        let replyIndex = 0;

        const sendMessage = () => {
            const text = chatInput.value.trim();
            if (!text) return;

            // User message
            appendMessage(text, 'user');
            chatInput.value = '';

            // Bot response
            setTimeout(() => {
                const reply = botReplies[replyIndex % botReplies.length];
                replyIndex++;
                appendMessage(reply, 'bot');
            }, 900);
        };

        const appendMessage = (text, sender) => {
            const div = document.createElement('div');
            div.className = `message ${sender}`;
            div.innerHTML = `<div class="message-content">${text}</div>`;
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        chatSend?.addEventListener('click', sendMessage);
        chatInput?.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
        });
    }

});

/* =============================================
   PARTICLE SYSTEM - ENHANCED WITH MOUSE INTERACTION
   ============================================= */
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const count = window.innerWidth < 768 ? 30 : 70;
    const particles = [];

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');

        const size    = Math.random() * 3 + 0.5;
        const posX    = Math.random() * 100;
        const posY    = Math.random() * 100;
        const dur     = Math.random() * 30 + 15;
        const opacity = Math.random() * 0.5 + 0.1;
        const isPurple = i % 3 !== 1;
        const delay = Math.random() * 5;

        // Store base position for mouse interaction
        const baseX = posX;
        const baseY = posY;

        p.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${opacity};
            background: ${isPurple ? '#a855f7' : '#3b82f6'};
            box-shadow: 0 0 ${size * 4}px ${isPurple ? 'rgba(168,85,247,0.8)' : 'rgba(59,130,246,0.8)'};
            pointer-events: none;
            animation-delay: ${delay}s;
            will-change: transform;
        `;

        const moveX = (Math.random() - 0.5) * 150;
        const moveY = (Math.random() - 0.5) * 150;

        const anim = p.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: opacity },
            { transform: `translate(${moveX}px, ${moveY}px) scale(1.5)`, opacity: opacity * 0.5 },
            { transform: 'translate(0, 0) scale(1)', opacity: opacity }
        ], {
            duration: dur * 1000,
            iterations: Infinity,
            easing: 'ease-in-out',
            delay: delay * 1000
        });

        container.appendChild(p);
        particles.push({ el: p, baseX, baseY, size, strength: Math.random() * 0.04 + 0.01 });
    }

    // Mouse interaction — particles gently repel from cursor
    let mx = -9999, my = -9999;
    document.addEventListener('mousemove', (e) => {
        mx = (e.clientX / window.innerWidth) * 100;
        my = (e.clientY / window.innerHeight) * 100;
    });

    function updateParticles() {
        particles.forEach(({ el, baseX, baseY, strength }) => {
            const dx = mx - baseX;
            const dy = my - baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 15; // % units

            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                const offsetX = -(dx / dist) * force * 4;
                const offsetY = -(dy / dist) * force * 4;
                el.style.marginLeft = `${offsetX}%`;
                el.style.marginTop  = `${offsetY}%`;
            } else {
                el.style.marginLeft = '0%';
                el.style.marginTop  = '0%';
            }
        });
        requestAnimationFrame(updateParticles);
    }

    // Only run mouse interaction on non-mobile
    if (window.innerWidth >= 768) {
        updateParticles();
    }
}

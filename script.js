// Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .tool-card, .about-card').forEach(el => observer.observe(el));

// Smooth Scrolling for Navigation
document.querySelectorAll('nav a, .cta-button').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Contact Form Handling with Validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Harap isi semua field yang diperlukan.');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Harap masukkan alamat email yang valid.');
        return;
    }

    // Simulate form submission
    alert('Pesan telah dikirim! Terima kasih atas kontaknya.');
    this.reset();
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Tool Functions with Error Handling
function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('password-output').innerText = password;
}

async function lookupIP() {
    const ip = document.getElementById('ip-input').value.trim();
    const output = document.getElementById('ip-output');

    if (!ip) {
        output.innerText = 'Harap masukkan alamat IP.';
        return;
    }

    output.innerText = 'Memuat...';

    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        if (!response.ok) throw new Error('IP tidak ditemukan atau API error.');
        const data = await response.json();
        output.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        output.innerText = 'Error: ' + error.message;
    }
}

async function generateHash() {
    const text = document.getElementById('hash-input').value.trim();
    const type = document.getElementById('hash-type').value;
    const output = document.getElementById('hash-output');

    if (!text) {
        output.innerText = 'Harap masukkan teks.';
        return;
    }

    output.innerText = 'Memproses...';

    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(type.toUpperCase(), data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        output.innerText = hashHex;
    } catch (error) {
        output.innerText = 'Error: ' + error.message;
    }
}

function encodeBase64() {
    const text = document.getElementById('base64-input').value.trim();
    const output = document.getElementById('base64-output');

    if (!text) {
        output.innerText = 'Harap masukkan teks.';
        return;
    }

    try {
        const encoded = btoa(text);
        output.innerText = encoded;
    } catch (error) {
        output.innerText = 'Error: ' + error.message;
    }
}

function decodeBase64() {
    const text = document.getElementById('base64-input').value.trim();
    const output = document.getElementById('base64-output');

    if (!text) {
        output.innerText = 'Harap masukkan teks.';
        return;
    }

    try {
        const decoded = atob(text);
        output.innerText = decoded;
    } catch (error) {
        output.innerText = 'Error: Base64 tidak valid.';
    }
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('tool-button')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Initialize on load
window.addEventListener('load', function() {
    // Add focus styles for accessibility
    const style = document.createElement('style');
    style.textContent = `
        .tool-input:focus, .tool-select:focus, .tool-textarea:focus,
        .form-group input:focus, .form-group textarea:focus {
            outline: 2px solid var(--cyan-accent);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
});

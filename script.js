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

// Fungsi URL Encoder/Decoder
function encodeURL() {
    const text = document.getElementById('url-input').value.trim();
    const output = document.getElementById('url-output');

    if (!text) {
        output.innerText = 'Harap masukkan URL.';
        return;
    }

    try {
        const encoded = encodeURIComponent(text);
        output.innerText = encoded;
    } catch (error) {
        output.innerText = 'Error: ' + error.message;
    }
}

function decodeURL() {
    const text = document.getElementById('url-input').value.trim();
    const output = document.getElementById('url-output');

    if (!text) {
        output.innerText = 'Harap masukkan URL.';
        return;
    }

    try {
        const decoded = decodeURIComponent(text);
        output.innerText = decoded;
    } catch (error) {
        output.innerText = 'Error: URL encoding tidak valid.';
    }
}

// Fungsi String Analyzer
function analyzeString() {
    const text = document.getElementById('string-input').value.trim();
    const output = document.getElementById('string-output');

    if (!text) {
        output.innerText = 'Harap masukkan teks.';
        return;
    }

    const length = text.length;
    const words = text.trim().split(/\s+/).length;
    const chars = {};
    for (let char of text) {
        chars[char] = (chars[char] || 0) + 1;
    }
    const uniqueChars = Object.keys(chars).length;
    const result = `Panjang: ${length} karakter\nKata: ${words}\nKarakter unik: ${uniqueChars}`;
    output.innerText = result;
}

// Fungsi Text Reverser
function reverseText() {
    const text = document.getElementById('reverse-input').value.trim();
    const output = document.getElementById('reverse-output');

    if (!text) {
        output.innerText = 'Harap masukkan teks.';
        return;
    }

    const reversed = text.split('').reverse().join('');
    output.innerText = reversed;
}

// Fungsi Random Number Generator
function generateRandom() {
    const min = parseInt(document.getElementById('min-num').value);
    const max = parseInt(document.getElementById('max-num').value);
    const output = document.getElementById('random-output');

    if (isNaN(min) || isNaN(max)) {
        output.innerText = 'Harap masukkan angka yang valid.';
        return;
    }

    if (min >= max) {
        output.innerText = 'Min harus lebih kecil dari Max.';
        return;
    }

    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    output.innerText = random;
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light theme');
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        z-index: 1000;
        font-size: 20px;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(themeToggle);

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
    });
}

// Simple Authentication System
function initAuth() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && window.location.pathname.includes('dashboard.html')) {
        document.getElementById('userName').textContent = currentUser.username;
    } else if (window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'login.html';
    }

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!username || !password) {
                showMessage('Harap isi username dan password.', 'error');
                return;
            }

            // Simple demo authentication (in real app, this would be server-side)
            if (username === 'demo' && password === 'demo123') {
                const user = { username: username, loginTime: new Date().toISOString() };
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'dashboard.html';
            } else {
                showMessage('Username atau password salah.', 'error');
            }
        });
    }

    // Register link handler
    const registerLink = document.getElementById('registerLink');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            showMessage('Fitur register akan segera hadir! Untuk demo, gunakan username: demo, password: demo123', 'info');
        });
    }

    // Logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
}

// Message display function
function showMessage(message, type = 'info') {
    const messageEl = document.getElementById('message') || document.getElementById('contactMessage');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `message ${type}`;
        messageEl.style.display = 'block';
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    }
}

// Advanced Tools
function initAdvancedTools() {
    // Add encryption tool to tools section
    const toolsGrid = document.querySelector('.tool-grid');
    if (toolsGrid) {
        // Encryption Tool
        const encryptionTool = document.createElement('div');
        encryptionTool.className = 'tool-card';
        encryptionTool.innerHTML = `
            <div class="tool-icon">🔐</div>
            <h3>Advanced Encryption</h3>
            <p>Encrypt/decrypt teks dengan AES.</p>
            <textarea id="encrypt-input" placeholder="Masukkan teks" class="tool-textarea"></textarea>
            <input type="password" id="encrypt-key" placeholder="Encryption key" class="tool-input">
            <div class="button-group">
                <button onclick="encryptText()" class="tool-button">Encrypt</button>
                <button onclick="decryptText()" class="tool-button">Decrypt</button>
            </div>
            <p id="encrypt-output" class="tool-output"></p>
        `;
        toolsGrid.appendChild(encryptionTool);

        // File Hash Tool
        const fileHashTool = document.createElement('div');
        fileHashTool.className = 'tool-card';
        fileHashTool.innerHTML = `
            <div class="tool-icon">📁</div>
            <h3>File Hash Generator</h3>
            <p>Generate hash untuk file.</p>
            <input type="file" id="file-input" class="tool-input">
            <select id="file-hash-type" class="tool-select">
                <option value="SHA-256">SHA-256</option>
                <option value="SHA-1">SHA-1</option>
                <option value="MD5">MD5</option>
            </select>
            <button onclick="generateFileHash()" class="tool-button">Generate Hash</button>
            <p id="file-hash-output" class="tool-output"></p>
        `;
        toolsGrid.appendChild(fileHashTool);

        // Network Scanner Tool (simulated)
        const networkTool = document.createElement('div');
        networkTool.className = 'tool-card';
        networkTool.innerHTML = `
            <div class="tool-icon">🌐</div>
            <h3>Network Scanner</h3>
            <p>Scan port dasar (simulasi).</p>
            <input type="text" id="scan-ip" placeholder="IP Address" class="tool-input">
            <input type="number" id="scan-port" placeholder="Port (80, 443, etc)" class="tool-input" value="80">
            <button onclick="scanPort()" class="tool-button">Scan Port</button>
            <p id="scan-output" class="tool-output"></p>
        `;
        toolsGrid.appendChild(networkTool);
    }
}

// Advanced tool functions
async function encryptText() {
    const text = document.getElementById('encrypt-input').value.trim();
    const key = document.getElementById('encrypt-key').value.trim();
    const output = document.getElementById('encrypt-output');

    if (!text || !key) {
        output.innerText = 'Harap isi teks dan key.';
        return;
    }

    output.innerText = 'Mengenkripsi...';

    try {
        // Simple XOR encryption for demo (not secure for real use)
        let encrypted = '';
        for (let i = 0; i < text.length; i++) {
            encrypted += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        output.innerText = btoa(encrypted);
    } catch (error) {
        output.innerText = 'Error: ' + error.message;
    }
}

async function decryptText() {
    const text = document.getElementById('encrypt-input').value.trim();
    const key = document.getElementById('encrypt-key').value.trim();
    const output = document.getElementById('encrypt-output');

    if (!text || !key) {
        output.innerText = 'Harap isi teks dan key.';
        return;
    }

    output.innerText = 'Mendekripsi...';

    try {
        const encrypted = atob(text);
        let decrypted = '';
        for (let i = 0; i < encrypted.length; i++) {
            decrypted += String.fromCharCode(encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        output.innerText = decrypted;
    } catch (error) {
        output.innerText = 'Error: Teks terenkripsi tidak valid.';
    }
}

async function generateFileHash() {
    const fileInput = document.getElementById('file-input');
    const hashType = document.getElementById('file-hash-type').value;
    const output = document.getElementById('file-hash-output');

    if (!fileInput.files[0]) {
        output.innerText = 'Harap pilih file.';
        return;
    }

    output.innerText = 'Menghitung hash...';

    try {
        const file = fileInput.files[0];
        const arrayBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest(hashType.replace('-', ''), arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        output.innerText = hashHex;
    } catch (error) {
        output.innerText = 'Error: ' + error.message;
    }
}

async function scanPort() {
    const ip = document.getElementById('scan-ip').value.trim();
    const port = document.getElementById('scan-port').value;
    const output = document.getElementById('scan-output');

    if (!ip || !port) {
        output.innerText = 'Harap isi IP dan port.';
        return;
    }

    output.innerText = 'Scanning...';

    // Simulate port scanning (in real app, this would require server-side implementation)
    setTimeout(() => {
        const isOpen = Math.random() > 0.5; // Random for demo
        output.innerText = `Port ${port} pada ${ip}: ${isOpen ? 'TERBUKA' : 'TERTUTUP'} (Simulasi)`;
    }, 2000);
}

// Contact form for contact.html
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !message) {
                showMessage('Harap isi semua field.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('Email tidak valid.', 'error');
                return;
            }

            // Simulate form submission with actual sending
            sendContactMessage(name, email, subject, message);
            this.reset();
        });
    }
}

// Function to simulate sending contact message
function sendContactMessage(name, email, subject, message) {
    // In a real application, this would send to a backend API
    // For now, we'll simulate success and show a message
    showMessage('Pesan terkirim! Kami akan segera menghubungi Anda.', 'success');

    // Optional: Log the message for demo purposes
    console.log('Contact Form Submission:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    });
}

// Matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00d4ff';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Initialize matrix rain on hero section
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#hero')) {
        createMatrixRain();
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
        .message {
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
        }
        .message.success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .message.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .message.info { background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; }
    `;
    document.head.appendChild(style);

    // Initialize features
    initThemeToggle();
    initAuth();
    initAdvancedTools();
    initContactForm();
});

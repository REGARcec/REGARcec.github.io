// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .section').forEach(el => observer.observe(el));

// Fungsi Generate Password
function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('password-output').innerText = password;
}

// Fungsi IP Lookup
async function lookupIP() {
    const ip = document.getElementById('ip-input').value;
    if (!ip) return alert('Masukkan IP!');
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        document.getElementById('ip-output').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('ip-output').innerText = 'Error: ' + error.message;
    }
}

// Typing Animation for Intro
function typeWriter(text, element, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Smooth Scrolling for Navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Pesan telah dikirim! Terima kasih atas kontaknya.');
    this.reset();
});

// Fungsi Hash Generator
async function generateHash() {
    const text = document.getElementById('hash-input').value;
    const type = document.getElementById('hash-type').value;
    if (!text) return alert('Masukkan teks!');
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(type.toUpperCase(), data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        document.getElementById('hash-output').innerText = hashHex;
    } catch (error) {
        document.getElementById('hash-output').innerText = 'Error: ' + error.message;
    }
}

// Fungsi Base64 Encode
function encodeBase64() {
    const text = document.getElementById('base64-input').value;
    if (!text) return alert('Masukkan teks!');
    const encoded = btoa(text);
    document.getElementById('base64-output').innerText = encoded;
}

// Fungsi Base64 Decode
function decodeBase64() {
    const text = document.getElementById('base64-input').value;
    if (!text) return alert('Masukkan teks!');
    try {
        const decoded = atob(text);
        document.getElementById('base64-output').innerText = decoded;
    } catch (error) {
        document.getElementById('base64-output').innerText = 'Error: Invalid Base64';
    }
}

// Initialize on load
window.addEventListener('load', function() {
    const introText = document.querySelector('.typing');
    typeWriter('Welcome to Basir Cyber Squad... Initializing...', introText);
});

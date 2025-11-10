// ==========================
// JS FOR THE BURGER NAVBAR
// ==========================
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

const navSlide = () => {
  navLinks.classList.toggle('nav-active');
  burger.classList.toggle('toggle');

  // Accessibility toggle
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', !expanded);
};

burger.addEventListener('click', navSlide);

// ==========================
// JS FOR THE FAQ SECTION
// ==========================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    faqItems.forEach(i => {
      if (i !== item) i.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

// ==========================
// JS FOR THE CONTACT FORM SUBMISSION (Formspree Integration)
// ==========================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // prevent reload

    const formData = new FormData(contactForm);
    const messageEl = document.getElementById("formMessage");

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        messageEl.textContent = `✅ Thank you, ${formData.get('name')}! Your message has been sent successfully.`;
        messageEl.style.color = "green";
        contactForm.reset(); // Clear the form
      } else {
        messageEl.textContent = "❌ There was a problem sending your message. Please try again.";
        messageEl.style.color = "red";
      }
    } catch (error) {
      messageEl.textContent = "⚠️ Network error. Please check your connection and try again.";
      messageEl.style.color = "red";
    }
  });
}

// ==========================
// ON-SCROLL ANIMATIONS
// ==========================
const reveals = document.querySelectorAll('.fadeUp, .autoShow');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.2 });

reveals.forEach(rev => observer.observe(rev));

// ==========================
// HERO SECTION ON PAGE LOAD ANIMATIONS
// ==========================
window.addEventListener("load", () => {
  const heroText = document.querySelector(".hero-text-content");
  const heroButtons = document.querySelector(".hero-buttons");
  const heroOverlay = document.querySelector(".hero-overlay");

  // Initial hidden state
  if (heroText && heroButtons && heroOverlay) {
    heroOverlay.style.opacity = "0";
    heroText.style.opacity = "0";
    heroButtons.style.opacity = "0";

    heroOverlay.style.transition = "opacity 1.2s ease";
    heroText.style.transition = "opacity 1s ease, transform 1s ease";
    heroButtons.style.transition = "opacity 1s ease 0.3s";

    // Animate in sequence
    setTimeout(() => {
      heroOverlay.style.opacity = "1";
      heroText.style.opacity = "1";
      heroText.style.transform = "translateY(0)";
    }, 300);

    setTimeout(() => {
      heroButtons.style.opacity = "1";
    }, 700);
  }
});

//=========================================================
//CHATBOT SCRIPT (FUNCTIONALITY + SIMPLE RESPONSES)
//========================================================= -->
const bubble = document.getElementById('chatbot-bubble');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');

/* -------------------------------
   OPEN / CLOSE CHAT WINDOW
-------------------------------- */
bubble.addEventListener('click', () => {
    chatWindow.style.display = 'flex';
    bubble.style.display = 'none';
});

closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
    bubble.style.display = 'flex';
});

/* -------------------------------
   MESSAGE SENDING FUNCTION
-------------------------------- */
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const userMsg = chatInput.value.trim();
    if (userMsg === '') return;

    appendMessage(userMsg, 'user-msg');
    chatInput.value = '';

    // Simulated Bot Reply
    setTimeout(() => {
        const botReply = getBotResponse(userMsg);
        appendMessage(botReply, 'bot-msg');
    }, 700);
}

/* -------------------------------
   DISPLAY MESSAGE FUNCTION
-------------------------------- */
function appendMessage(msg, className) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', className);
    messageEl.textContent = msg;
    chatBody.appendChild(messageEl);
    chatBody.scrollTop = chatBody.scrollHeight; // Always scroll to bottom
}

/* -------------------------------
   SIMPLE BOT RESPONSES
-------------------------------- */
function getBotResponse(input) {
    input = input.toLowerCase();
    if (input.includes('hello') || input.includes('hi')) {
        return '👋 Hi there! How can I assist you today?';
    } else if (input.includes('help')) {
        return 'Sure! I can assist with information about our services, contact details, or support.';
    } else if (input.includes('contact')) {
        return '📧 You can reach us at support@example.com or call +263 77 000 0000.';
    } else if (input.includes('hours')) {
        return 'Our team is available Monday to Friday, 8AM–5PM.';
    } else if (input.includes('thank')) {
        return 'You’re most welcome! 😊';
    } else {
        return '🤖 I’m not sure about that yet, but our support team will assist you soon.';
    }
}
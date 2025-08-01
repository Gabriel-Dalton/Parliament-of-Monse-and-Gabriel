// Parliament of Monse and Gabriel - Official JavaScript

// Sample laws data
const sampleLaws = [
    {
        id: 1,
        title: "Article I: The Remote Control Protocol",
        description: "Whereas the remote control is a sacred instrument of domestic entertainment, it is hereby established that the person who finds the remote control shall have temporary custody, but must surrender it upon request from the other party. No channel surfing shall occur during critical plot points of shows the other party is actively watching.",
        category: "entertainment",
        penalty: "Mandatory foot massage for 30 minutes",
        date: "2024-01-15"
    },
    {
        id: 2,
        title: "Article II: The Temperature Regulation Act",
        description: "The thermostat shall be set to a temperature agreeable to both parties. Any unilateral adjustment of more than 2 degrees without consultation shall be considered a domestic crime. The party who is cold shall be provided with blankets before any thermostat adjustments are made.",
        category: "household",
        penalty: "Must wear the other person's preferred temperature clothing for 24 hours",
        date: "2024-01-20"
    },
    {
        id: 3,
        title: "Article III: The Communication Decree",
        description: "All parties shall communicate their feelings openly and honestly, but with kindness. The use of passive-aggressive behavior, silent treatment, or cryptic social media posts is strictly prohibited. Text messages must be responded to within 2 hours unless in a meeting or driving.",
        category: "communication",
        penalty: "Must write a 500-word essay on effective communication",
        date: "2024-02-01"
    },
    {
        id: 4,
        title: "Article IV: The Financial Transparency Law",
        description: "All purchases over $50 must be discussed prior to execution, unless it's a surprise gift for the other party. Monthly budget reviews shall be conducted on the first Sunday of each month. No secret bank accounts or hidden purchases shall be tolerated.",
        category: "finance",
        penalty: "Must cook dinner for a week and explain each ingredient's cost",
        date: "2024-02-10"
    },
    {
        id: 5,
        title: "Article V: The Social Media Conduct Code",
        description: "No posting relationship drama on social media. All posts about the relationship must be approved by both parties. Tagging the other person in embarrassing photos requires explicit consent. No liking ex-partners' posts without prior discussion.",
        category: "social",
        penalty: "Social media detox for 48 hours",
        date: "2024-02-15"
    },
    {
        id: 6,
        title: "Article VI: The Emergency Contact Protocol",
        description: "In case of emergency, the other party shall be the first person contacted, regardless of the situation. No calling parents, friends, or social media before contacting the domestic partner. This includes minor injuries, car accidents, and existential crises.",
        category: "emergency",
        penalty: "Must create a detailed emergency contact plan and memorize it",
        date: "2024-02-20"
    }
];

// Sample amendments
const sampleAmendments = [
    {
        id: 1,
        title: "First Amendment: The Netflix Queue Compromise",
        description: "Amendment to Article I: Each party shall be allowed to add one show to the Netflix queue for every show the other party adds. No more than 3 shows from one party shall be in the queue at any time.",
        date: "2024-03-01"
    },
    {
        id: 2,
        title: "Second Amendment: The Weekend Planning Act",
        description: "Amendment to Article III: Weekend plans must be discussed by Wednesday evening. Last-minute cancellations require a valid excuse and a backup plan.",
        date: "2024-03-15"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadLaws();
    loadAmendments();
    setupFormHandling();
    setupNavigation();
    addOfficialStamp();
});

// Load and display laws
function loadLaws() {
    const container = document.getElementById('lawsContainer');
    const laws = JSON.parse(localStorage.getItem('domesticLaws')) || sampleLaws;
    
    container.innerHTML = '';
    
    laws.forEach(law => {
        const lawCard = createLawCard(law);
        container.appendChild(lawCard);
    });
}

// Load and display amendments
function loadAmendments() {
    const container = document.getElementById('amendmentsContainer');
    const amendments = JSON.parse(localStorage.getItem('domesticAmendments')) || sampleAmendments;
    
    container.innerHTML = '';
    
    amendments.forEach(amendment => {
        const amendmentCard = createAmendmentCard(amendment);
        container.appendChild(amendmentCard);
    });
}

// Create a law card element
function createLawCard(law) {
    const card = document.createElement('div');
    card.className = `law-card ${law.category}`;
    card.innerHTML = `
        <div class="law-date">Enacted: ${formatDate(law.date)}</div>
        <h3>${law.title}</h3>
        <span class="law-category">${getCategoryName(law.category)}</span>
        <div class="law-description">${law.description}</div>
        <div class="law-penalty"><strong>Penalty:</strong> ${law.penalty}</div>
        <button class="gov-button" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="repealLaw(${law.id})">REPEAL LAW</button>
    `;
    return card;
}

// Create an amendment card element
function createAmendmentCard(amendment) {
    const card = document.createElement('div');
    card.className = 'law-card';
    card.innerHTML = `
        <div class="law-date">Amended: ${formatDate(amendment.date)}</div>
        <h3>${amendment.title}</h3>
        <div class="law-description">${amendment.description}</div>
    `;
    return card;
}

// Get category display name
function getCategoryName(category) {
    const categories = {
        'household': 'Household Management',
        'communication': 'Communication Protocol',
        'entertainment': 'Entertainment & Leisure',
        'finance': 'Financial Regulations',
        'social': 'Social Conduct',
        'emergency': 'Emergency Procedures'
    };
    return categories[category] || category;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Setup form handling
function setupFormHandling() {
    const form = document.getElementById('lawForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        enactNewLaw();
    });
}

// Enact a new law
function enactNewLaw() {
    const title = document.getElementById('lawTitle').value;
    const description = document.getElementById('lawDescription').value;
    const category = document.getElementById('lawCategory').value;
    const penalty = document.getElementById('penalty').value;

    if (!title || !description || !category) {
        showNotification('All fields are required for legislation enactment!', 'error');
        return;
    }

    const newLaw = {
        id: Date.now(),
        title: title,
        description: description,
        category: category,
        penalty: penalty || 'To be determined by domestic court',
        date: new Date().toISOString().split('T')[0]
    };

    // Get existing laws
    const laws = JSON.parse(localStorage.getItem('domesticLaws')) || sampleLaws;
    laws.push(newLaw);
    
    // Save to localStorage
    localStorage.setItem('domesticLaws', JSON.stringify(laws));
    
    // Add to display with animation
    const container = document.getElementById('lawsContainer');
    const lawCard = createLawCard(newLaw);
    lawCard.classList.add('new');
    container.appendChild(lawCard);
    
    // Reset form
    document.getElementById('lawForm').reset();
    
    // Show success notification
    showNotification('Legislation successfully enacted! The new law is now in effect.', 'success');
    
    // Scroll to the new law
    setTimeout(() => {
        lawCard.scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

// Repeal a law
function repealLaw(lawId) {
    if (confirm('Are you sure you want to repeal this law? This action cannot be undone.')) {
        const laws = JSON.parse(localStorage.getItem('domesticLaws')) || sampleLaws;
        const updatedLaws = laws.filter(law => law.id !== lawId);
        localStorage.setItem('domesticLaws', JSON.stringify(updatedLaws));
        loadLaws();
        showNotification('Law has been repealed!', 'warning');
    }
}

// Setup smooth navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.gov-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Add official government stamp effect
function addOfficialStamp() {
    const stamp = document.createElement('div');
    stamp.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(231, 76, 60, 0.9);
            color: white;
            padding: 2rem;
            border-radius: 50%;
            width: 200px;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            font-size: 1.2rem;
            text-align: center;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            animation: stampAppear 3s ease-in-out;
        ">
            OFFICIAL<br>PARLIAMENT<br>DOCUMENT
        </div>
    `;
    
    document.body.appendChild(stamp);
    
    // Remove stamp after animation
    setTimeout(() => {
        stamp.remove();
    }, 3000);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 6px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add CSS for stamp animation
const stampCSS = `
@keyframes stampAppear {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = stampCSS;
document.head.appendChild(style);

// Add some government-style interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('gov-button')) {
        // Add official click sound effect (visual)
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        
        e.target.style.position = 'relative';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation CSS
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const rippleStyle = document.createElement('style');
rippleStyle.textContent = rippleCSS;
document.head.appendChild(rippleStyle);

// Add official government loading effect
window.addEventListener('load', function() {
    showNotification('Welcome to the Parliament of Monse and Gabriel. All systems operational.', 'success');
});

// Add some humor with random government messages
const governmentMessages = [
    "This website is protected by the Parliament of Monse and Gabriel.",
    "Unauthorized access to relationship laws is strictly prohibited.",
    "All relationship disputes must be settled through proper channels.",
    "Remember: Love is the law, but communication is the enforcement.",
    "This is an official government document. Handle with care."
];

// Show random government message every 30 seconds
setInterval(() => {
    const randomMessage = governmentMessages[Math.floor(Math.random() * governmentMessages.length)];
    showNotification(randomMessage, 'info');
}, 30000);
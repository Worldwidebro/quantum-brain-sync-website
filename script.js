// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Pipeline step animations
    const pipelineSteps = document.querySelectorAll('.pipeline-step');
    
    pipelineSteps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.2}s`;
        step.classList.add('animate-in');
    });

    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .setup-step, .download-card');
    animateElements.forEach(el => observer.observe(el));
});

// Download package function
function downloadPackage() {
    // Create a simulated download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'quantum-brain-sync-package.zip';
    
    // Show download notification
    showNotification('Download started! Package will be available soon.', 'success');
    
    // Simulate download progress
    simulateDownload();
}

// Show notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : '#00d4ff'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Simulate download progress
function simulateDownload() {
    const progressBar = document.createElement('div');
    progressBar.className = 'download-progress';
    progressBar.innerHTML = `
        <div class="progress-container">
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <div class="progress-text">Preparing download...</div>
        </div>
    `;
    
    // Style the progress bar
    progressBar.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        padding: 2rem;
        border-radius: 12px;
        z-index: 10001;
        min-width: 300px;
        text-align: center;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .progress-container {
            color: white;
        }
        .progress-bar {
            width: 100%;
            height: 8px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            overflow: hidden;
            margin: 1rem 0;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(45deg, #00d4ff, #ff00ff);
            width: 0%;
            transition: width 0.3s ease;
        }
        .progress-text {
            font-size: 0.9rem;
            color: #ccc;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(progressBar);
    
    const progressFill = progressBar.querySelector('.progress-fill');
    const progressText = progressBar.querySelector('.progress-text');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        
        if (progress < 30) {
            progressText.textContent = 'Initializing...';
        } else if (progress < 60) {
            progressText.textContent = 'Compressing files...';
        } else if (progress < 90) {
            progressText.textContent = 'Finalizing package...';
        } else {
            progressText.textContent = 'Complete!';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                document.body.removeChild(progressBar);
                document.head.removeChild(style);
                showNotification('Package ready! Check your downloads folder.', 'success');
            }, 1000);
        }
    }, 200);
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        opacity: 0;
        transform: translateY(20px);
        animation: slideInUp 0.6s ease forwards;
    }
    
    .animate-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .pipeline-step {
        transition: all 0.3s ease;
    }
    
    .pipeline-step:hover {
        transform: scale(1.05) translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 212, 255, 0.2);
    }
`;
document.head.appendChild(animationStyles);
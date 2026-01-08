document.addEventListener("DOMContentLoaded", function() {
    // 1. Animation Scroll (Fade In) - Effet d'apparition au défilement
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 2. Loader - Disparition de l'écran de chargement
    const loader = document.getElementById("loader");
    if (loader) {
        // Disparait un peu plus vite pour ne pas faire attendre l'utilisateur
        setTimeout(function() { 
            loader.classList.add("loader-hidden"); 
        }, 1000); 
    }

    // 3. Retour Haut (Bouton flèche)
    const backToTopButton = document.getElementById("backToTop");
    if (backToTopButton) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 300) { backToTopButton.classList.add("show"); }
            else { backToTopButton.classList.remove("show"); }
        });
    }

    // 4. Smooth Scroll pour les liens du menu (Navigation fluide)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                const navLinks = document.getElementById("navLinks");
                if (navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                }
            }
        });
    });
});

// Menu Mobile (Toggle)
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

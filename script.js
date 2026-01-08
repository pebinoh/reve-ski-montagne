document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. ANIMATION AU SCROLL (Fade In)
    // ==========================================
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

    // ==========================================
    // 2. LOADER (Écran de chargement)
    // ==========================================
    const loader = document.getElementById("loader");
    if (loader) {
        // Disparaît après 1 seconde
        setTimeout(function() { 
            loader.classList.add("loader-hidden"); 
        }, 1000); 
    }

    // ==========================================
    // 3. RETOUR HAUT (Bouton flèche)
    // ==========================================
    const backToTopButton = document.getElementById("backToTop");
    if (backToTopButton) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 300) { backToTopButton.classList.add("show"); }
            else { backToTopButton.classList.remove("show"); }
        });
    }

    // ==========================================
    // 4. NAVIGATION FLUIDE (Smooth Scroll)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fermer le menu mobile si ouvert
                const navLinks = document.getElementById("navLinks");
                if (navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                }

                // Défilement doux vers la section
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 5. LIGHTBOX (Zoom sur les images galerie)
    // ==========================================
    // Création dynamique de la boîte modale dans le HTML
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<span class="lightbox-close">&times;</span><img class="lightbox-content" id="lightbox-img">';
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    // On cible les images qui sont dans les cartes de la galerie
    const galleryImages = document.querySelectorAll('.gallery-grid .project-card img');

    galleryImages.forEach(img => {
        // Ajout d'un curseur "loupe" via le JS pour montrer que c'est cliquable
        img.style.cursor = "zoom-in";
        
        img.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le lien de la carte de s'activer si on clique juste sur l'image
            lightbox.style.display = "flex"; // Utilise flex pour centrer parfaitement
            lightbox.style.alignItems = "center";
            lightbox.style.justifyContent = "center";
            lightboxImg.src = this.src;
        });
    });

    // Fermeture de la lightbox
    closeBtn.onclick = function() { lightbox.style.display = "none"; }
    
    // Fermeture en cliquant n'importe où à côté de l'image
    lightbox.onclick = function(e) {
        if (e.target !== lightboxImg) { lightbox.style.display = "none"; }
    }
});

// ==========================================
// 6. MENU MOBILE (Toggle)
// ==========================================
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    function showPage(pageId) {
        pageSections.forEach(section => {
            section.classList.add('hidden');
        });

        const targetSection = document.getElementById(`page-${pageId}`);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        navLinks.forEach(link => {
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        mobileMenu.classList.add('hidden');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const pageId = link.dataset.page;
            showPage(pageId); 
        });
    });

    let initialPage = 'about';
    if (window.location.hash) {
        const hashPage = window.location.hash.substring(1); 
        if (document.getElementById(`page-${hashPage}`)) {
            initialPage = hashPage;
        }
    }
    showPage(initialPage);

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        formMessage.classList.remove('hidden');
        
        contactForm.reset();
       
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 3000);
    });
});
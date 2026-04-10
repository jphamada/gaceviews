document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateNavButtons() {
        // La primera foto no tendrá flecha a la izquierda
        if (currentIndex === 0) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }

        // La última foto no tendrá flecha a la derecha
        if (currentIndex === totalSlides - 1) {
            nextBtn.classList.add('hidden');
        } else {
            nextBtn.classList.remove('hidden');
        }
    }

    function updateSlides() {
        // Quitar active de todo
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Poner active actual
        slides[currentIndex].classList.add('active');
        
        updateNavButtons();
    }

    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentIndex = index;
            updateSlides();
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }

    // Iniciar el estado correcto de los botones
    updateNavButtons();
});

document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.linktree-card');

  if (filterButtons.length > 0 && cards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        cards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || (category && category.includes(filterValue))) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  const stackSlides = document.querySelectorAll('.stack-slide');
  const nextBtn = document.querySelector('.stack-next');
  const prevBtn = document.querySelector('.stack-prev');
  const dotsContainer = document.querySelector('.stack-dots');

  if (stackSlides.length > 0) {
    let currentIndex = 0;
    const totalSlides = stackSlides.length;
    let autoInterval = null;

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `stack-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAuto();
        });
        dotsContainer.appendChild(dot);
      }
    }

    const updateStack = (isExit = false) => {
      stackSlides.forEach((slide, idx) => {
        slide.classList.remove('pos-0', 'pos-1', 'pos-2', 'pos-hidden', 'pos-exit');
        const diff = (idx - currentIndex + totalSlides) % totalSlides;

        if (diff === 0) {
          slide.classList.add('pos-0');
        } else if (diff === 1) {
          slide.classList.add('pos-1');
        } else if (diff === 2) {
          slide.classList.add('pos-2');
        } else {
          slide.classList.add('pos-hidden');
        }
      });

      const dots = document.querySelectorAll('.stack-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    const nextSlide = () => {
      const currentSlide = stackSlides[currentIndex];
      currentSlide.classList.add('pos-exit');
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateStack();
      }, 120);
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateStack();
    };

    const goToSlide = (targetIndex) => {
      currentIndex = targetIndex;
      updateStack();
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAuto();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAuto();
      });
    }

    stackSlides.forEach(slide => {
      slide.addEventListener('click', () => {
        if (slide.classList.contains('pos-0')) {
          nextSlide();
          resetAuto();
        } else if (slide.classList.contains('pos-1')) {
          nextSlide();
          resetAuto();
        } else if (slide.classList.contains('pos-2')) {
          currentIndex = (currentIndex + 2) % totalSlides;
          updateStack();
          resetAuto();
        }
      });
    });

    const startAuto = () => {
      autoInterval = setInterval(nextSlide, 4200);
    };

    const resetAuto = () => {
      if (autoInterval) clearInterval(autoInterval);
      startAuto();
    };

    const carouselEl = document.querySelector('.stack-carousel');
    if (carouselEl) {
      carouselEl.addEventListener('mouseenter', () => {
        if (autoInterval) clearInterval(autoInterval);
      });
      carouselEl.addEventListener('mouseleave', () => {
        startAuto();
      });
    }

    updateStack();
    startAuto();
  }
});

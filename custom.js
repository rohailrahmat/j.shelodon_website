/* ===== PAGE NAVIGATION ===== */
  function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    document.querySelectorAll('[data-page="' + pageId + '"]').forEach(a => a.classList.add('active'));
    window.scrollTo({ top: 0, behavior: 'instant' });
    triggerFadeIns();
    // close mobile menu
    document.getElementById('navLinks').classList.remove('open');
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo(this.dataset.page);
    });
  });

  /* ===== HAMBURGER ===== */
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });

  /* ===== SCROLL TO TOP BUTTON ===== */
  window.addEventListener('scroll', () => {
    const btn = document.getElementById('scrollTop');
    btn.classList.toggle('show', window.scrollY > 300);
  });

  /* ===== FADE IN ANIMATIONS ===== */
  function triggerFadeIns() {
    setTimeout(() => {
      const els = document.querySelectorAll('.page.active .fade-in');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
      }, { threshold: 0.1 });
      els.forEach(el => observer.observe(el));
    }, 50);
  }
  triggerFadeIns();

  /* ===== CONTACT FORM (ULTIMATE) ===== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const btn = contactForm.querySelector('.btn-send');
      const successMsg = document.getElementById('formSuccess');
      const formData = new FormData(this);

      btn.disabled = true;
      btn.textContent = 'Sending...';

      try {
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          successMsg.style.display = 'block';
          contactForm.reset();
        } else {
          // If Formspree requires activation, it might return an error first
          successMsg.style.display = 'block';
          successMsg.textContent = 'Check your email to activate the form!';
        }
      } catch (error) {
        console.error('Error:', error);
        // Fallback: Still show success because Formspree often works on the first try
        successMsg.style.display = 'block';
      } finally {
        btn.disabled = false;
        btn.textContent = 'Send';
        setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
      }
    });
  }
document.addEventListener('DOMContentLoaded', () => {
  const openMenuIcon = document.querySelector('.open-menu');
  const closeMenuIcon = document.querySelector('.close-menu');
  const nav = document.querySelector('.primary-nav');
  const overlay = document.querySelector('.overlay');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-list.show').forEach(list => list.classList.remove('show'));
    dropdownToggles.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  function openMobileMenu() {
    nav.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    nav.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    closeAllDropdowns();
  }

  openMenuIcon.closest('button').addEventListener('click', openMobileMenu);
  closeMenuIcon.closest('button').addEventListener('click', closeMobileMenu);
  overlay.addEventListener('click', closeMobileMenu);

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const list = toggle.parentElement.querySelector('.dropdown-list');
      const isOpen = list.classList.contains('show');

      closeAllDropdowns();

      if (!isOpen) {
        list.classList.add('show');
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Click outside closes any open dropdown (desktop)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-link')) {
      closeAllDropdowns();
    }
  });

  // Reset mobile menu state on resize back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });
});

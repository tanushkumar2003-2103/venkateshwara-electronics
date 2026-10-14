/**
 * VENKATESWARA ELECTRONICS - CLIENT INTERACTIONS & DYNAMIC LOGIC
 * High performance Vanilla JavaScript
 * Zero external libraries or heavy dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. CONSTANTS & CONFIGURATION
  // =========================================================================
  const BUSINESS_PHONE_INTL = '919949484306'; // WhatsApp wa.me format
  const BUSINESS_PHONE_DISPLAY = '+91 99494 84306';
  const BASE_WA_URL = `https://wa.me/${BUSINESS_PHONE_INTL}`;

  const SERVICE_MESSAGES = {
    default: 'Hello Venkateswara Electronics, I would like to enquire about your washing machine repair service.',
    washing_machine: 'Hello Venkateswara Electronics, I need help with my washing machine.',
    front_load: 'Hello Venkateswara Electronics, I need help with my Front Load washing machine.',
    top_load: 'Hello Venkateswara Electronics, I need help with my Top Load washing machine.',
    fully_automatic: 'Hello Venkateswara Electronics, I need help with my Fully Automatic washing machine.',
    semi_automatic: 'Hello Venkateswara Electronics, I need help with my Semi-Automatic washing machine.'
  };

  /**
   * Generates a properly encoded WhatsApp URL
   * @param {string} messageText 
   * @returns {string} wa.me URL with pre-filled message
   */
  function createWhatsAppLink(messageText) {
    const text = messageText || SERVICE_MESSAGES.default;
    return `${BASE_WA_URL}?text=${encodeURIComponent(text)}`;
  }

  // =========================================================================
  // 2. STICKY NAVBAR SCROLL EFFECT & SPY
  // =========================================================================
  const headerWrapper = document.getElementById('headerWrapper');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    if (!headerWrapper) return;
    if (window.scrollY > 20) {
      headerWrapper.classList.add('scrolled');
    } else {
      headerWrapper.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Initial check

  // ScrollSpy for Active Navigation Link
  function highlightActiveNavLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNavLink, { passive: true });

  // =========================================================================
  // 3. MOBILE MENU TOGGLE & ACCESSIBILITY
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileDrawer || !mobileOverlay || !hamburgerBtn) return;
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileDrawer || !mobileOverlay || !hamburgerBtn) return;
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerBtn && hamburgerBtn.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // =========================================================================
  // 4. SMOOTH SCROLL WITH HEADER OFFSET
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =========================================================================
  // 5. APPLIANCE PROBLEMS / SOLUTIONS INTERACTIVE TABS & CARDS
  // =========================================================================
  const problemTabs = document.querySelectorAll('.problem-tab-btn');
  const problemPanels = document.querySelectorAll('.problems-tab-panel');
  const problemCards = document.querySelectorAll('.problem-card');
  const diagTitle = document.getElementById('diagTitle');
  const diagDesc = document.getElementById('diagDesc');
  const diagActionBtn = document.getElementById('diagActionBtn');

  // Tab switching
  problemTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      problemTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      problemPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const activePanel = document.getElementById(`panel-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }

      // Reset diagnosis to active tab default
      const serviceName = tab.getAttribute('data-service-name') || 'Appliance';
      if (diagTitle) diagTitle.textContent = `Selected: ${serviceName} Diagnostic Overview`;
      if (diagDesc) diagDesc.textContent = `Need reliable repair for your ${serviceName}? Contact us for prompt assistance across Hyderabad.`;
      if (diagActionBtn) {
        const defaultMsg = `Hello Venkateswara Electronics, I need assistance with my ${serviceName}.`;
        diagActionBtn.href = createWhatsAppLink(defaultMsg);
      }
    });
  });

  // Problem card selection & diagnostic update
  problemCards.forEach(card => {
    card.addEventListener('click', () => {
      const parentPanel = card.closest('.problems-tab-panel');
      if (parentPanel) {
        parentPanel.querySelectorAll('.problem-card').forEach(c => c.classList.remove('selected'));
      }
      card.classList.add('selected');

      const problemName = card.getAttribute('data-problem') || 'Appliance Issue';
      const applianceType = card.getAttribute('data-appliance') || 'Appliance';
      const symptom = card.getAttribute('data-symptom') || 'Common operational problem.';

      if (diagTitle) {
        diagTitle.textContent = `${applianceType} Issue: ${problemName}`;
      }
      if (diagDesc) {
        diagDesc.textContent = `${symptom} Our Hyderabad technicians can diagnose and resolve this.`;
      }
      if (diagActionBtn) {
        const customMessage = `Hello Venkateswara Electronics, I need help with my ${applianceType} (Issue: ${problemName}).`;
        diagActionBtn.href = createWhatsAppLink(customMessage);
      }
    });
  });

  // =========================================================================
  // 6. CONCIERGE QUICK APPLIANCE SELECTOR (FINAL CTA SECTION)
  // =========================================================================
  const conciergeApplianceChips = document.querySelectorAll('.appliance-chip-btn');
  const conciergeActionBtn = document.getElementById('conciergeActionBtn');

  if (conciergeApplianceChips.length > 0 && conciergeActionBtn) {
    conciergeApplianceChips.forEach(chip => {
      chip.addEventListener('click', () => {
        conciergeApplianceChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const serviceKey = chip.getAttribute('data-appliance-key');
        const serviceName = chip.getAttribute('data-appliance-name') || 'Appliance';
        const customMsg = SERVICE_MESSAGES[serviceKey] || `Hello Venkateswara Electronics, I need help with my ${serviceName}.`;
        
        conciergeActionBtn.href = createWhatsAppLink(customMsg);
        const btnText = conciergeActionBtn.querySelector('.btn-text');
        if (btnText) {
          btnText.textContent = `WhatsApp for ${serviceName}`;
        }
      });
    });
  }

  // =========================================================================
  // 7. ACCESSIBLE ACCORDION (FAQ)
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });

    // Keyboard support (Enter & Space)
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });

  // =========================================================================
  // 8. DYNAMIC WHATSAPP LINKS INITIALIZATION
  // =========================================================================
  // Service Cards WhatsApp Links
  document.querySelectorAll('[data-service-wa]').forEach(el => {
    const serviceKey = el.getAttribute('data-service-wa');
    const msg = SERVICE_MESSAGES[serviceKey] || SERVICE_MESSAGES.default;
    el.href = createWhatsAppLink(msg);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // Global WhatsApp links
  document.querySelectorAll('.js-whatsapp-default').forEach(el => {
    el.href = createWhatsAppLink(SERVICE_MESSAGES.default);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // =========================================================================
  // 9. SCROLL REVEAL (IntersectionObserver)
  // =========================================================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-scale').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-scale').forEach(el => {
      el.classList.add('is-revealed');
    });
  }

});

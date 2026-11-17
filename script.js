/**
 * Portfolio Interactive Scripts
 * Dylan Gonzalez — Software Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElements = document.querySelectorAll('#current-year');
  yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // 2. Helper to create project card HTML
  const createProjectCardHTML = (project) => {
    const tagsHTML = project.tags.map(tag => `<span class="tech-chip">${tag}</span>`).join(' ');
    
    return `
      <article class="project-card group glass-card rounded-4xl p-8 sm:p-10 space-y-6 flex flex-col justify-between" data-category="${project.category}">
        <div class="space-y-5">
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 glass-subbox text-zinc-800 rounded-xl text-xs font-mono font-normal">
              ${project.categoryLabel}
            </span>
            <div class="flex items-center gap-2">
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-xl text-zinc-900 hover:bg-white/60 transition-colors" title="View Source on GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </a>
              <a href="projects.html#${project.id}" class="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-white/60 transition-colors" title="Project Details">
                <i data-lucide="external-link" class="w-4 h-4"></i>
              </a>
            </div>
          </div>

          <div class="space-y-2.5">
            <h3 class="text-xl font-normal text-zinc-900 group-hover:text-zinc-700 transition-colors">
              ${project.title}
            </h3>
            <p class="text-sm text-zinc-600 leading-relaxed font-normal">
              ${project.description}
            </p>
          </div>

          <div class="p-4 glass-subbox rounded-2xl space-y-2">
            <div class="flex items-center justify-between text-xs text-zinc-600 font-normal">
              <span>${project.metric1Label}</span>
              <span class="font-mono text-zinc-900">${project.metric1Value}</span>
            </div>
            <div class="flex items-center justify-between text-xs text-zinc-600 font-normal">
              <span>${project.metric2Label}</span>
              <span class="font-mono text-zinc-800">${project.metric2Value}</span>
            </div>
          </div>
        </div>

        <div class="pt-5 border-t border-zinc-200/50 flex flex-wrap items-center gap-2">
          ${tagsHTML}
        </div>
      </article>
    `;
  };

  // 3. Render Projects on Home Page (Cut off after first 2 + Dynamic "See X more...")
  const homeProjectsContainer = document.getElementById('home-projects-container');
  const seeMoreBtn = document.getElementById('see-more-projects-btn');
  const seeMoreCount = document.getElementById('see-more-projects-count');

  if (homeProjectsContainer && typeof PROJECTS_DATA !== 'undefined') {
    // Render only first 2
    const firstTwo = PROJECTS_DATA.slice(0, 2);
    homeProjectsContainer.innerHTML = firstTwo.map(createProjectCardHTML).join('');

    // Dynamic count calculation
    const remainingCount = Math.max(0, PROJECTS_DATA.length - 2);
    if (seeMoreCount) {
      seeMoreCount.textContent = remainingCount;
    }
    if (seeMoreBtn) {
      seeMoreBtn.innerHTML = `
        <span>See ${remainingCount} more projects</span>
        <i data-lucide="arrow-right" class="w-4 h-4"></i>
      `;
    }
  }

  // 4. Render All Projects on Projects Page
  const allProjectsContainer = document.getElementById('all-projects-container');
  if (allProjectsContainer && typeof PROJECTS_DATA !== 'undefined') {
    allProjectsContainer.innerHTML = PROJECTS_DATA.map(createProjectCardHTML).join('');
  }

  // 5. Re-initialize Lucide icons after dynamic rendering
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 6. Project Filter Buttons (Works on both index and projects page)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const setupFiltering = () => {
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.classList.add('text-zinc-600');
        });

        btn.classList.add('active');
        btn.classList.remove('text-zinc-600');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  };

  setupFiltering();

  // 7. Active Tab Scroll Spy (for index.html sections)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  if (sections.length > 0 && navLinks.length > 0) {
    const updateActiveNav = () => {
      const scrollY = window.pageYOffset;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 180;
        const sectionId = current.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  // 8. Toast Notification System
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimeout;

  const showToast = (message, isSuccess = true) => {
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 3200);
  };

  // 9. Interactive Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', false);
        return;
      }

      // Simulate sending state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Sending...</span>
      `;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (window.lucide) window.lucide.createIcons();
        showToast(`Thanks ${name}! Your message has been sent.`);
      }, 1000);
    });
  }

  // 10. Mouse Blue Gradient Trail Light Effect
  if (window.matchMedia('(pointer: fine)').matches) {
    const trailLayer = document.createElement('div');
    trailLayer.className = 'cursor-trail-layer';
    document.body.appendChild(trailLayer);

    const spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    trailLayer.appendChild(spotlight);

    const numDots = 12;
    const dots = [];
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      const size = Math.max(18, 72 - i * 4.5);
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      trailLayer.appendChild(dot);
      dots.push({
        el: dot,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        scale: 1 - i / (numDots * 1.15)
      });
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let spotX = mouseX;
    let spotY = mouseY;
    let hasMoved = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        spotX = mouseX;
        spotY = mouseY;
        dots.forEach(d => {
          d.x = mouseX;
          d.y = mouseY;
          d.el.style.opacity = String(d.scale * 0.75);
        });
        spotlight.style.opacity = '1';
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
      dots.forEach(d => {
        d.el.style.opacity = '0';
      });
      hasMoved = false;
    });

    const animateTrail = () => {
      // Smooth spring interpolation for ambient spotlight
      spotX += (mouseX - spotX) * 0.14;
      spotY += (mouseY - spotY) * 0.14;
      spotlight.style.transform = `translate3d(${spotX}px, ${spotY}px, 0) translate3d(-50%, -50%, 0)`;

      // Chained spring interpolation for trailing blue light nodes
      let prevX = mouseX;
      let prevY = mouseY;
      dots.forEach((dot, idx) => {
        const ease = Math.max(0.18, 0.42 - idx * 0.018);
        dot.x += (prevX - dot.x) * ease;
        dot.y += (prevY - dot.y) * ease;
        dot.el.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate3d(-50%, -50%, 0)`;
        prevX = dot.x;
        prevY = dot.y;
      });

      requestAnimationFrame(animateTrail);
    };

    requestAnimationFrame(animateTrail);
  }
});

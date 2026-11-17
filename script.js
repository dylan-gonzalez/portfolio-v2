/**
 * Portfolio Interactive Scripts
 * Dylan Gonzalez — Software Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Clean URL normalization: strip /index.html and #home so root resolves to /
  if (
    window.location.pathname.endsWith('/index.html') ||
    window.location.hash === '#home'
  ) {
    const cleanPath = window.location.pathname.replace(/\/index\.html$/, '/');
    const cleanHash = window.location.hash === '#home' ? '' : window.location.hash;
    window.history.replaceState(null, '', cleanPath + cleanHash);
  }

  // Smooth scroll to top & clean URL when clicking Home / Logo links on home page
  document.querySelectorAll('a[href="/"], a[href="#home"]').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.location.pathname !== '/' || window.location.hash) {
          window.history.replaceState(null, '', '/');
        }
      }
    });
  });

  // 1. Current Year in Footer
  const yearElements = document.querySelectorAll('#current-year');
  yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // 2. Helper to create project card HTML
  const createProjectCardHTML = (project) => {
    const tagsHTML = project.tags.map(tag => `<span class="tech-chip">${tag}</span>`).join(' ');
    const company = (project.company && typeof COMPANIES_DATA !== 'undefined') ? COMPANIES_DATA[project.company] : null;
    
    // Crisp company logo badge
    const companyBadge = company
      ? `<button type="button" class="project-company-badge flex items-center gap-1.5 px-2.5 py-1 glass-subbox hover:bg-white/90 text-zinc-800 rounded-xl text-xs font-mono transition-all active:scale-95 shadow-2xs" data-company="${project.company}" title="Filter by ${company.name}">
           <span class="w-4 h-4 rounded-md bg-white p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
             <img src="${company.logo}" alt="${company.name}" class="max-w-full max-h-full object-contain rounded-xs">
           </span>
           <span>${company.shortName || company.name}</span>
         </button>`
      : `<span class="px-2.5 py-1 glass-subbox text-zinc-700 rounded-xl text-xs font-mono font-normal">${project.categoryLabel}</span>`;

    return `
      <article class="project-card group glass-card rounded-4xl p-8 sm:p-10 space-y-6 flex flex-col justify-between" data-category="${project.category}" data-company="${project.company || ''}">
        <div class="space-y-5">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-1 glass-subbox text-zinc-500 rounded-xl text-xs font-mono capitalize">
                ${project.category.replace('-', ' ')}
              </span>
              ${companyBadge}
            </div>
            <div class="flex items-center gap-2 shrink-0">
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

  // 4b. Medium-style Markdown / Block Content Parser (exposed globally for Admin preview)
  const escapeHTML = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const formatInline = (text) => {
    return escapeHTML(text)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  };

  const renderMediumContent = (rawContent) => {
    if (!rawContent) return '';
    const text = Array.isArray(rawContent) ? rawContent.join('\n\n') : String(rawContent);
    const lines = text.replace(/\r\n/g, '\n').split('\n');

    let html = '';
    let inCodeBlock = false;
    let codeBuffer = [];
    let inUl = false;
    let inOl = false;

    const closeLists = () => {
      if (inUl) { html += '</ul>'; inUl = false; }
      if (inOl) { html += '</ol>'; inOl = false; }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Code block toggle
      if (trimmed.startsWith('```')) {
        closeLists();
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBuffer = [];
        } else {
          html += `<pre><code>${escapeHTML(codeBuffer.join('\n'))}</code></pre>`;
          inCodeBlock = false;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
      }

      if (!trimmed) {
        closeLists();
        continue;
      }

      // Horizontal Rule
      if (trimmed === '---' || trimmed === '***') {
        closeLists();
        html += '<hr>';
        continue;
      }

      // Image with optional caption: ![Caption](url)
      const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        closeLists();
        const caption = escapeHTML(imgMatch[1]);
        const url = imgMatch[2].trim();
        html += `
          <figure>
            <img src="${url}" alt="${caption}" loading="lazy">
            ${caption ? `<figcaption>${caption}</figcaption>` : ''}
          </figure>
        `;
        continue;
      }

      // Headings
      if (trimmed.startsWith('### ')) {
        closeLists();
        html += `<h3>${formatInline(trimmed.slice(4))}</h3>`;
        continue;
      }
      if (trimmed.startsWith('## ')) {
        closeLists();
        html += `<h2>${formatInline(trimmed.slice(3))}</h2>`;
        continue;
      }
      if (trimmed.startsWith('# ')) {
        closeLists();
        html += `<h1>${formatInline(trimmed.slice(2))}</h1>`;
        continue;
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        closeLists();
        html += `<blockquote>${formatInline(trimmed.slice(2))}</blockquote>`;
        continue;
      }

      // Unordered List
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (inOl) { html += '</ol>'; inOl = false; }
        if (!inUl) { html += '<ul>'; inUl = true; }
        html += `<li>${formatInline(trimmed.slice(2))}</li>`;
        continue;
      }

      // Ordered List
      const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
      if (olMatch) {
        if (inUl) { html += '</ul>'; inUl = false; }
        if (!inOl) { html += '<ol>'; inOl = true; }
        html += `<li>${formatInline(olMatch[1])}</li>`;
        continue;
      }

      // Paragraph
      closeLists();
      html += `<p>${formatInline(trimmed)}</p>`;
    }

    closeLists();
    if (inCodeBlock && codeBuffer.length > 0) {
      html += `<pre><code>${escapeHTML(codeBuffer.join('\n'))}</code></pre>`;
    }

    return `<div class="medium-article">${html}</div>`;
  };

  window.renderMediumContent = renderMediumContent;

  // 4c. Helper to create Blog Card HTML
  const createBlogCardHTML = (post) => {
    const tagsHTML = (post.tags || []).map(tag => `<span class="tech-chip">${tag}</span>`).join(' ');
    const coverHTML = post.coverImage
      ? `<a href="blog.html#${post.id}" class="block overflow-hidden rounded-3xl aspect-[16/9] mb-2 border border-white/70">
           <img src="${post.coverImage}" alt="${escapeHTML(post.title)}" class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy">
         </a>`
      : '';
    return `
      <article class="blog-card group glass-card rounded-4xl p-8 sm:p-10 space-y-6 flex flex-col justify-between">
        <div class="space-y-5">
          ${coverHTML}
          <div class="flex items-center justify-between text-xs text-zinc-500 font-normal">
            <span class="px-3 py-1 glass-subbox text-zinc-800 rounded-xl font-mono font-normal">
              ${post.category || 'General'}
            </span>
            <div class="flex items-center gap-3 font-mono">
              <span>${post.date || ''}</span>
              <span>&bull;</span>
              <span>${post.readTime || '2 min read'}</span>
            </div>
          </div>

          <div class="space-y-2.5">
            <h3 class="text-xl font-normal text-zinc-900 group-hover:text-zinc-700 transition-colors">
              <a href="blog.html#${post.id}" class="blog-post-link block" data-post-id="${post.id}">
                ${post.title}
              </a>
            </h3>
            <p class="text-sm text-zinc-600 leading-relaxed font-normal">
              ${post.excerpt || ''}
            </p>
          </div>
        </div>

        <div class="pt-5 border-t border-zinc-200/50 flex items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-2">
            ${tagsHTML}
          </div>
          <a href="blog.html#${post.id}" class="blog-post-link inline-flex items-center gap-1.5 text-xs text-zinc-800 hover:text-zinc-950 font-normal shrink-0 transition-colors" data-post-id="${post.id}">
            <span>Read post</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </article>
    `;
  };

  // 4d. Render Blog Posts & Full Article Reader
  const homeBlogContainer = document.getElementById('home-blog-container');
  const seeMoreBlogWrapper = document.getElementById('see-more-blog-wrapper');
  const seeMoreBlogBtn = document.getElementById('see-more-blog-btn');
  const allBlogContainer = document.getElementById('all-blog-container');
  const blogListView = document.getElementById('blog-list-view');
  const blogArticleView = document.getElementById('blog-article-view');
  const blogArticleContent = document.getElementById('blog-article-content');
  const backToBlogListBtn = document.getElementById('back-to-blog-list');

  const renderBlogReader = () => {
    if (!blogListView || !blogArticleView || !blogArticleContent || typeof BLOG_DATA === 'undefined') return;
    const hashId = window.location.hash.replace(/^#/, '');
    const post = BLOG_DATA.find(p => p.id === hashId);

    if (post) {
      const tagsHTML = (post.tags || []).map(tag => `<span class="tech-chip">${tag}</span>`).join(' ');
      const coverHTML = post.coverImage
        ? `<div class="overflow-hidden rounded-3xl border border-white/80 shadow-sm">
             <img src="${post.coverImage}" alt="${escapeHTML(post.title)}" class="w-full max-h-[440px] object-cover">
           </div>`
        : '';

      blogArticleContent.innerHTML = `
        <header class="space-y-5 border-b border-zinc-200/70 pb-8">
          <div class="flex flex-wrap items-center gap-3 text-xs text-zinc-500 font-mono font-normal">
            <span class="px-3 py-1 glass-subbox text-zinc-800 rounded-xl">${post.category || 'General'}</span>
            <span>${post.date || ''}</span>
            <span>&bull;</span>
            <span>${post.readTime || '2 min read'}</span>
          </div>
          <h1 class="text-2xl sm:text-4xl font-normal text-zinc-900 tracking-tight leading-tight">
            ${post.title}
          </h1>
          ${post.excerpt ? `<p class="text-base sm:text-lg text-zinc-500 leading-relaxed font-normal">${post.excerpt}</p>` : ''}
        </header>

        ${coverHTML}

        ${renderMediumContent(post.content)}

        <footer class="pt-6 border-t border-zinc-200/60 flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-2">
            ${tagsHTML}
          </div>
        </footer>
      `;

      blogListView.classList.add('hidden');
      blogArticleView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.lucide) window.lucide.createIcons();
    } else {
      blogArticleView.classList.add('hidden');
      blogListView.classList.remove('hidden');
    }
  };

  const renderAllBlogViews = () => {
    if (homeBlogContainer && typeof BLOG_DATA !== 'undefined') {
      const firstTwoPosts = BLOG_DATA.slice(0, 2);
      homeBlogContainer.innerHTML = firstTwoPosts.map(createBlogCardHTML).join('');

      const remainingPosts = Math.max(0, BLOG_DATA.length - 2);
      if (seeMoreBlogWrapper && seeMoreBlogBtn) {
        if (remainingPosts > 0) {
          seeMoreBlogWrapper.classList.remove('hidden');
          seeMoreBlogBtn.innerHTML = `
            <span>See ${remainingPosts} more ${remainingPosts === 1 ? 'post' : 'posts'}</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          `;
        } else {
          seeMoreBlogWrapper.classList.add('hidden');
        }
      }
    }

    if (allBlogContainer && typeof BLOG_DATA !== 'undefined') {
      allBlogContainer.innerHTML = BLOG_DATA.map(createBlogCardHTML).join('');
      renderBlogReader();
    }

    if (window.lucide) window.lucide.createIcons();
  };

  renderAllBlogViews();

  if (allBlogContainer) {
    window.addEventListener('hashchange', renderBlogReader);
    if (backToBlogListBtn) {
      backToBlogListBtn.addEventListener('click', () => {
        window.history.pushState(null, '', window.location.pathname);
        renderBlogReader();
      });
    }
  }

  // Fetch live blog posts from DynamoDB Lambda API
  if (window.BLOG_API_URL && (homeBlogContainer || allBlogContainer)) {
    fetch(`${window.BLOG_API_URL}/posts`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        if (Array.isArray(data.posts) && data.posts.length > 0) {
          BLOG_DATA = data.posts;
          renderAllBlogViews();
        }
      })
      .catch(() => {
        // Fallback to local BLOG_DATA silently
      });
  }

  // 5. Re-initialize Lucide icons after dynamic rendering
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 6. Project & Company Filtering + Interactive Map Spotlight
  let companyMapInstance = null;
  let companyMarkers = [];
  let currentCompanyFilter = 'all';
  let currentDisciplineFilter = 'all';

  const companyFilterBtns = document.querySelectorAll('.company-filter-btn');
  const disciplineFilterBtns = document.querySelectorAll('.filter-btn');
  const spotlightSection = document.getElementById('company-spotlight');
  const noProjectsMsg = document.getElementById('no-projects-message');
  const clearCompanyBtn = document.getElementById('clear-company-filter-btn');
  const resetAllFiltersBtn = document.getElementById('reset-all-filters-btn');

  // Interactive Leaflet Map for Company
  const renderCompanyMap = (company) => {
    const mapElement = document.getElementById('company-map');
    if (!mapElement || typeof L === 'undefined') return;

    if (!companyMapInstance) {
      companyMapInstance = L.map('company-map', {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true
      });

      // OpenStreetMap standard tile layer (reliable, zero API key requirement)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(companyMapInstance);
    }

    // Clear existing markers
    companyMarkers.forEach(m => m.remove());
    companyMarkers = [];

    const bounds = [];

    company.locations.forEach(loc => {
      bounds.push([loc.lat, loc.lng]);

      const isCompetition = (loc.tag || '').toLowerCase().includes('competition') || (loc.tag || '').toLowerCase().includes('challenge');

      const pinIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="custom-map-pin ${isCompetition ? 'comp-pin' : 'hq-pin'}" title="${loc.name}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
              ${isCompetition 
                ? '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' 
                : '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'}
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: pinIcon }).addTo(companyMapInstance);

      const popupContent = `
        <div class="p-1 space-y-1">
          <div class="text-xs font-mono font-medium text-zinc-900">${loc.name}</div>
          <div class="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">${loc.tag}</div>
          <p class="text-xs text-zinc-600 font-normal leading-relaxed">${loc.description}</p>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.locationData = loc;
      companyMarkers.push(marker);
    });

    // Invalidate size & set view
    setTimeout(() => {
      if (companyMapInstance) {
        companyMapInstance.invalidateSize();
        if (bounds.length > 1) {
          companyMapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
        } else if (bounds.length === 1) {
          companyMapInstance.setView(bounds[0], company.locations[0].zoom || 13);
          if (companyMarkers[0]) companyMarkers[0].openPopup();
        }
      }
    }, 150);

    // Location Focus Switcher Buttons
    const locButtons = document.querySelectorAll('.loc-focus-btn');
    locButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        locButtons.forEach(b => {
          b.classList.remove('active');
          b.classList.remove('bg-zinc-900', 'text-white');
          b.classList.add('text-zinc-600');
        });
        btn.classList.add('active');
        btn.classList.add('bg-zinc-900', 'text-white');
        btn.classList.remove('text-zinc-600');

        const locId = btn.getAttribute('data-loc-id');
        if (locId === 'all') {
          companyMapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
        } else {
          const targetMarker = companyMarkers.find(m => m.locationData.id === locId);
          if (targetMarker) {
            companyMapInstance.flyTo([targetMarker.locationData.lat, targetMarker.locationData.lng], targetMarker.locationData.zoom || 13, { duration: 1.2 });
            setTimeout(() => targetMarker.openPopup(), 1200);
          }
        }
      });
    });
  };

  // Update Spotlight Section
  const updateSpotlightUI = (companyId) => {
    if (!spotlightSection) return;

    if (!companyId || companyId === 'all' || !window.COMPANIES_DATA || !window.COMPANIES_DATA[companyId]) {
      spotlightSection.classList.add('hidden');
      return;
    }

    const company = window.COMPANIES_DATA[companyId];
    const matchingProjects = (window.PROJECTS_DATA || []).filter(p => p.company === companyId);

    const logoEl = document.getElementById('spotlight-logo');
    const nameEl = document.getElementById('spotlight-name');
    const taglineEl = document.getElementById('spotlight-tagline');
    const descEl = document.getElementById('spotlight-description');
    const countEl = document.getElementById('spotlight-project-count');
    const locBtnsContainer = document.getElementById('spotlight-location-buttons');

    if (logoEl) { logoEl.src = company.logo; logoEl.alt = company.name; }
    if (nameEl) nameEl.textContent = company.name;
    if (taglineEl) taglineEl.textContent = company.tagline;
    if (descEl) descEl.textContent = company.description;
    if (countEl) countEl.textContent = `${matchingProjects.length} ${matchingProjects.length === 1 ? 'project' : 'projects'}`;

    if (locBtnsContainer) {
      if (company.locations && company.locations.length > 1) {
        locBtnsContainer.innerHTML = `
          <button type="button" class="loc-focus-btn active px-2.5 py-1 rounded-lg text-xs font-mono glass-subbox bg-zinc-900 text-white transition-all" data-loc-id="all">
            Show All (${company.locations.length})
          </button>
          ${company.locations.map(loc => `
            <button type="button" class="loc-focus-btn px-2.5 py-1 rounded-lg text-xs font-mono glass-subbox text-zinc-600 hover:text-zinc-900 transition-all" data-loc-id="${loc.id}">
              ${loc.name.split(',')[0]} (${loc.tag.split(' ')[0]})
            </button>
          `).join('')}
        `;
      } else if (company.locations && company.locations.length === 1) {
        locBtnsContainer.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-3 py-1 glass-subbox rounded-xl text-xs font-mono text-zinc-700">
            <i data-lucide="map-pin" class="w-3 h-3 text-zinc-500"></i>
            <span>${company.locations[0].name}</span>
          </span>
        `;
      }
    }

    spotlightSection.classList.remove('hidden');
    renderCompanyMap(company);

    if (window.lucide) window.lucide.createIcons();
  };

  // Filter application to project cards
  const applyFilters = () => {
    const projectCards = document.querySelectorAll('#all-projects-container .project-card');
    let visibleCount = 0;

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardCompany = card.getAttribute('data-company');

      const matchesCompany = (currentCompanyFilter === 'all') || (cardCompany === currentCompanyFilter);
      const matchesDiscipline = (currentDisciplineFilter === 'all') || (cardCategory === currentDisciplineFilter);

      if (matchesCompany && matchesDiscipline) {
        visibleCount++;
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

    if (noProjectsMsg) {
      if (visibleCount === 0 && projectCards.length > 0) {
        noProjectsMsg.classList.remove('hidden');
      } else {
        noProjectsMsg.classList.add('hidden');
      }
    }

    // Update URL query params without reloading
    if (window.location.pathname.includes('projects.html')) {
      const url = new URL(window.location);
      if (currentCompanyFilter !== 'all') {
        url.searchParams.set('company', currentCompanyFilter);
      } else {
        url.searchParams.delete('company');
      }
      if (currentDisciplineFilter !== 'all') {
        url.searchParams.set('category', currentDisciplineFilter);
      } else {
        url.searchParams.delete('category');
      }
      window.history.replaceState(null, '', url.pathname + (url.search ? url.search : '') + url.hash);
    }
  };

  const setCompanyFilter = (companyId, scrollIntoView = false) => {
    currentCompanyFilter = companyId || 'all';

    companyFilterBtns.forEach(btn => {
      const btnCompany = btn.getAttribute('data-company');
      const span = btn.querySelector('span');
      if (btnCompany === currentCompanyFilter) {
        btn.classList.add('active');
        btn.classList.remove('text-zinc-600');
        btn.classList.add('text-white');
        if (span) {
          span.classList.remove('text-zinc-600');
          span.classList.add('text-white');
        }
      } else {
        btn.classList.remove('active');
        btn.classList.add('text-zinc-600');
        btn.classList.remove('text-white');
        if (span) {
          span.classList.add('text-zinc-600');
          span.classList.remove('text-white');
        }
      }
    });

    updateSpotlightUI(currentCompanyFilter);
    applyFilters();

    if (scrollIntoView && spotlightSection && currentCompanyFilter !== 'all') {
      spotlightSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const setDisciplineFilter = (disciplineId) => {
    currentDisciplineFilter = disciplineId || 'all';

    disciplineFilterBtns.forEach(btn => {
      const btnFilter = btn.getAttribute('data-filter');
      if (btnFilter === currentDisciplineFilter) {
        btn.classList.add('active');
        btn.classList.remove('text-zinc-600');
      } else {
        btn.classList.remove('active');
        btn.classList.add('text-zinc-600');
      }
    });

    applyFilters();
  };

  // Wire up company filter buttons
  companyFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const companyId = btn.getAttribute('data-company');
      setCompanyFilter(companyId);
    });
  });

  // Wire up discipline filter buttons
  disciplineFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterId = btn.getAttribute('data-filter');
      setDisciplineFilter(filterId);
    });
  });

  // Wire up clear and reset buttons
  if (clearCompanyBtn) {
    clearCompanyBtn.addEventListener('click', () => {
      setCompanyFilter('all');
    });
  }

  if (resetAllFiltersBtn) {
    resetAllFiltersBtn.addEventListener('click', () => {
      setCompanyFilter('all');
      setDisciplineFilter('all');
    });
  }

  // Delegated click handler for company badges inside project cards
  document.addEventListener('click', (e) => {
    const badge = e.target.closest('.project-company-badge');
    if (badge) {
      e.preventDefault();
      const companyId = badge.getAttribute('data-company');
      if (companyId) {
        if (window.location.pathname.includes('projects.html')) {
          setCompanyFilter(companyId, true);
        } else {
          window.location.href = `projects.html?company=${companyId}`;
        }
      }
    }
  });

  // Check URL parameters on initial load
  const urlParams = new URLSearchParams(window.location.search);
  const initialCompany = urlParams.get('company');
  const initialCategory = urlParams.get('category');

  if (initialCompany && window.COMPANIES_DATA && window.COMPANIES_DATA[initialCompany]) {
    setCompanyFilter(initialCompany);
  }
  if (initialCategory) {
    setDisciplineFilter(initialCategory);
  }

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

      // Send via AWS SES Lambda endpoint
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Sending...</span>
      `;

      fetch(`${window.BLOG_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      })
        .then(async (res) => {
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error || 'Failed to send message');
          }
          contactForm.reset();
          showToast(`Thanks ${name}! Your message has been sent.`);
        })
        .catch(() => {
          showToast('Could not send right now — please email dylcg10@gmail.com directly.', false);
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          if (window.lucide) window.lucide.createIcons();
        });
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

    const numDots = 10;
    const dots = [];
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      const size = Math.max(4, 16 - i * 1.2);
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

  // 11. Top-Right Corner Admin Login Button & Cognito Sign-In Modal
  if (!window.location.pathname.endsWith('admin.html')) {
    const loginCornerBtn = document.createElement('button');
    loginCornerBtn.type = 'button';
    loginCornerBtn.title = 'Admin Sign In';
    loginCornerBtn.className = 'fixed top-6 right-6 z-50 glass-pill rounded-2xl p-2.5 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300/80 transition-all duration-200 flex items-center gap-2 cursor-pointer';
    loginCornerBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      <span class="text-xs hidden sm:inline pr-1">Login</span>
    `;
    document.body.appendChild(loginCornerBtn);

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 z-50 bg-zinc-900/25 backdrop-blur-sm hidden items-center justify-center p-4';
    modalOverlay.innerHTML = `
      <div class="glass-panel rounded-4xl p-8 sm:p-10 w-full max-w-md space-y-6 relative shadow-xl border border-white/90 bg-white/80">
        <button type="button" id="close-login-modal" class="absolute top-6 right-6 p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100/70 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>

        <div class="text-center space-y-2">
          <div class="w-11 h-11 mx-auto rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h3 class="text-xl text-zinc-900">Admin Sign In</h3>
          <p class="text-xs text-zinc-500">Sign in with your AWS Cognito credentials to open Blog Studio</p>
        </div>

        <form id="cognito-modal-form" class="space-y-4">
          <div class="space-y-1.5">
            <label class="block text-xs text-zinc-600 uppercase">Email</label>
            <input type="email" id="cognito-modal-email" required placeholder="dylcg10@gmail.com" class="w-full px-4 py-3 glass-subbox rounded-2xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900">
          </div>
          <div class="space-y-1.5">
            <label class="block text-xs text-zinc-600 uppercase">Password</label>
            <input type="password" id="cognito-modal-password" required placeholder="••••••••" class="w-full px-4 py-3 glass-subbox rounded-2xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900">
          </div>
          <p id="cognito-modal-error" class="text-xs text-red-600 hidden">Invalid email or password.</p>
          <button type="submit" id="cognito-modal-submit" class="w-full py-3.5 bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl text-sm transition-all cursor-pointer">
            Sign In to Studio
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    const openModal = () => {
      const existingToken = sessionStorage.getItem('dg_cognito_token');
      if (existingToken) {
        window.location.href = 'admin.html';
        return;
      }
      modalOverlay.classList.remove('hidden');
      modalOverlay.classList.add('flex');
      document.getElementById('cognito-modal-email')?.focus();
    };

    const closeModal = () => {
      modalOverlay.classList.add('hidden');
      modalOverlay.classList.remove('flex');
    };

    loginCornerBtn.addEventListener('click', openModal);
    document.getElementById('close-login-modal')?.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.getElementById('cognito-modal-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('cognito-modal-email').value.trim();
      const password = document.getElementById('cognito-modal-password').value;
      const submitBtn = document.getElementById('cognito-modal-submit');
      const errEl = document.getElementById('cognito-modal-error');

      submitBtn.disabled = true;
      submitBtn.textContent = 'Signing in...';
      errEl.classList.add('hidden');

      try {
        const res = await fetch(`${window.BLOG_API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok || !data.accessToken) {
          throw new Error(data.error || 'Login failed');
        }
        sessionStorage.setItem('dg_cognito_token', data.accessToken);
        sessionStorage.setItem('dg_cognito_email', data.email || email);
        window.location.href = 'admin.html';
      } catch (err) {
        errEl.textContent = err.message || 'Invalid email or password.';
        errEl.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In to Studio';
      }
    });
  }
});

// Automatic Table of Contents Generator
(function() {
  'use strict';

  // Only run on post pages
  const article = document.querySelector('article[itemtype="https://schema.org/BlogPosting"]');
  if (!article) return;

  const content = article.querySelector('.page-content');
  if (!content) return;

  // Find all headings
  const headings = content.querySelectorAll('h2, h3');

  // Only show TOC if there are at least 3 headings
  if (headings.length < 3) return;

  // Create TOC container
  const tocWrapper = document.createElement('aside');
  tocWrapper.className = 'table-of-contents';
  tocWrapper.setAttribute('role', 'navigation');
  tocWrapper.setAttribute('aria-label', 'Table of contents');

  const tocTitle = document.createElement('h2');
  tocTitle.className = 'toc-title';
  tocTitle.textContent = 'Table of Contents';

  const tocToggle = document.createElement('button');
  tocToggle.className = 'toc-toggle';
  tocToggle.setAttribute('aria-label', 'Toggle table of contents');
  tocToggle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `;

  const tocNav = document.createElement('nav');
  tocNav.className = 'toc-nav';

  const tocList = document.createElement('ol');
  tocList.className = 'toc-list';

  // Build TOC from headings
  headings.forEach((heading, index) => {
    // Generate ID if not present
    if (!heading.id) {
      heading.id = 'heading-' + index;
    }

    const listItem = document.createElement('li');
    listItem.className = 'toc-item toc-' + heading.tagName.toLowerCase();

    const link = document.createElement('a');
    link.href = '#' + heading.id;
    link.className = 'toc-link';
    link.textContent = heading.textContent.replace(/#$/, '').trim();

    // Smooth scroll on click
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById(heading.id);
      if (target) {
        const offset = 80; // Account for fixed header
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without jumping
        history.pushState(null, null, '#' + heading.id);

        // Update active state
        updateActiveLink();
      }
    });

    listItem.appendChild(link);
    tocList.appendChild(listItem);
  });

  tocNav.appendChild(tocList);
  tocWrapper.appendChild(tocTitle);
  tocWrapper.appendChild(tocToggle);
  tocWrapper.appendChild(tocNav);

  // Insert TOC before article content
  const articleHeader = article.querySelector('.header');
  if (articleHeader) {
    articleHeader.insertAdjacentElement('afterend', tocWrapper);
  }

  // Toggle TOC on mobile
  tocToggle.addEventListener('click', function() {
    tocWrapper.classList.toggle('collapsed');
    tocToggle.setAttribute('aria-expanded', !tocWrapper.classList.contains('collapsed'));
  });

  // Highlight active section on scroll
  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    headings.forEach((heading) => {
      const section = document.getElementById(heading.id);
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      const link = tocList.querySelector('a[href="#' + heading.id + '"]');
      if (!link) return;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // Remove all active classes
        tocList.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
        // Add active class to current
        link.classList.add('active');
      }
    });
  }

  // Update on scroll with throttling
  let tocTicking = false;
  window.addEventListener('scroll', function() {
    if (!tocTicking) {
      window.requestAnimationFrame(function() {
        updateActiveLink();
        tocTicking = false;
      });
      tocTicking = true;
    }
  });

  // Initial update
  updateActiveLink();

  // Collapse TOC on mobile by default
  if (window.innerWidth < 768) {
    tocWrapper.classList.add('collapsed');
  }
})();

// ── Terminal Modal ─────────────────────────────
const terminalLines = [
  { text: '> Initializing profile...', color: '#8b949e', delay: 0 },
  { text: '> Name        : Nabraj Gyawali', color: '#e6edf3', delay: 600 },
  { text: '> Role        : Web Developer', color: '#e6edf3', delay: 1200 },
  { text: '> Degree      : BIT — Adelaide', color: '#e6edf3', delay: 1800 },
  { text: '> Location    : Adelaide, SA 🇦🇺', color: '#e6edf3', delay: 2400 },
  { text: '> Status      : Open to work ✓', color: '#28c840', delay: 3000 },
  { text: '> Skills      : HTML, CSS, JS, Python', color: '#e6edf3', delay: 3600 },
  { text: '> GitHub      : https://github.com/', color: '#58a6ff', delay: 4200, link: 'https://github.com/' },
  { text: '> Email       : ngyawali100@gmail.com', color: '#58a6ff', delay: 4800, link: 'mailto:ngyawali100@gmail.com' },
  { text: '', color: '', delay: 5400 },
  { text: '> Loading portfolio........... Done! ✓', color: '#f43f5e', delay: 5600 },
];

let lineTimeouts = [];

function openModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  startTerminal();
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  resetTerminal();
}

function resetTerminal() {
  lineTimeouts.forEach(t => clearTimeout(t));
  lineTimeouts = [];
  document.getElementById('terminalOutput').innerHTML = '';
}

function startTerminal() {
  resetTerminal();
  const output = document.getElementById('terminalOutput');
  terminalLines.forEach((line) => {
    const t = setTimeout(() => {
      typeLine(output, line.text, line.color, line.link);
    }, line.delay);
    lineTimeouts.push(t);
  });
}

function typeLine(container, text, color, link) {
  const lineEl = document.createElement('div');
  lineEl.style.color = color || '#e6edf3';
  lineEl.style.marginBottom = '2px';
  container.appendChild(lineEl);

  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      lineEl.textContent += text[i];
      i++;
    } else {
      clearInterval(typing);

      if (link) {
        const colonIndex = text.indexOf(':') + 1;
        const labelPart = text.substring(0, colonIndex + 1);
        const linkPart = text.substring(colonIndex + 1).trim();

        lineEl.textContent = '';

        const labelSpan = document.createElement('span');
        labelSpan.textContent = labelPart + ' ';
        labelSpan.style.color = color;

        const linkSpan = document.createElement('span');
        linkSpan.textContent = linkPart;
        linkSpan.style.color = '#58a6ff';
        linkSpan.style.cursor = 'pointer';

        linkSpan.addEventListener('mouseenter', () => {
          linkSpan.style.color = '#79c0ff';
        });
        linkSpan.addEventListener('mouseleave', () => {
          linkSpan.style.color = '#58a6ff';
        });
        linkSpan.addEventListener('click', () => {
          window.open(link, '_blank');
        });

        lineEl.appendChild(labelSpan);
        lineEl.appendChild(linkSpan);
      }
    }
  }, 28);
}

// ── Close on Escape ────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ── Active nav link on scroll ──────────────────
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section').forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ── Fade in sections on scroll ─────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});
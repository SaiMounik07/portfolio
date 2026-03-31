/* ===== LOADER ===== */
const loader = document.getElementById('loader');
const bar = document.querySelector('.loader-bar');
const pct = document.querySelector('.loader-pct');
let progress = 0;
const loaderInterval = setInterval(() => {
  progress += Math.random() * 12;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loaderInterval);
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.6s ease';
      setTimeout(() => { loader.style.display = 'none'; }, 600);
    }, 300);
  }
  bar.style.width = progress + '%';
  pct.textContent = Math.floor(progress) + '%';
}, 60);

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
(function animateFollower() {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateFollower);
})();

function attachCursorHover(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      follower.style.width = '60px'; follower.style.height = '60px';
      follower.style.borderColor = 'rgba(124,58,237,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.width = '36px'; follower.style.height = '36px';
      follower.style.borderColor = 'rgba(6,182,212,0.4)';
    });
  });
}
attachCursorHover('a, button, .pill, .service-card, .tl-card, .stack-cat, .tech-item, .proj-card, .contact-social-card');

/* ===== NAV SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 30 ? 'rgba(5,5,8,0.95)' : 'rgba(5,5,8,0.7)';
});

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mm-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ===== ROLE CYCLE ===== */
const roles = document.querySelectorAll('.role');
let roleIdx = 0;
setInterval(() => {
  roles[roleIdx].classList.remove('active');
  roleIdx = (roleIdx + 1) % roles.length;
  roles[roleIdx].classList.add('active');
}, 2500);

/* ===== 3D TILT ===== */
function attachTilt(wrapId, innerSel, maxDeg = 20) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  const inner = wrap.querySelector(innerSel);
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    inner.style.animation = 'none';
    inner.style.transform = `rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) scale(1.02)`;
  });
  wrap.addEventListener('mouseleave', () => {
    inner.style.animation = '';
    inner.style.transform = '';
  });
}
attachTilt('hero3d', '.card-inner', 25);
attachTilt('aboutCard', '.ac-inner', 20);

/* ===== REVEAL ON SCROLL ===== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = (e.target.dataset.delay || 0) * 100;
      setTimeout(() => e.target.classList.add('visible'), delay);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

function observeReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}
observeReveal();

/* ===== PARALLAX ORBS ===== */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelector('.orb1').style.transform = `translate(${y * 0.05}px, ${y * 0.08}px)`;
  document.querySelector('.orb2').style.transform = `translate(${-y * 0.04}px, ${-y * 0.06}px)`;
});

/* ===== HERO GLITCH ===== */
const heroName = document.getElementById('heroName');
if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    heroName.style.animation = 'glitch 0.4s steps(2) forwards';
  });
  heroName.addEventListener('animationend', () => { heroName.style.animation = ''; });
}

/* ============================================================
   DATA — edit data.json to update projects, stack & contact.
   This fallback runs when opened directly as a file (no server).
   ============================================================ */
const FALLBACK_DATA = {
  "projects": [
    {
      "num": "01", "badge": "Android / Finance", "title": "Expense Tracker App",
      "description": "A personal finance management app to track daily expenses, categorize spending, and visualize financial insights with charts.",
      "tags": ["Kotlin", "Jetpack Compose", "Room DB", "MVVM", "Charts"], "github": "#", "live": "#"
    },
    {
      "num": "02", "badge": "Android / E-Commerce", "title": "Instore Shopping Experience – Blibli",
      "description": "Enhanced in-store shopping experience for Blibli's e-commerce platform — Android features for product discovery, checkout flows, and performance improvements.",
      "tags": ["Kotlin", "Android", "Jetpack Compose", "MVVM", "Automation", "E-Commerce"], "github": "#", "live": "https://www.blibli.com"
    },
    {
      "num": "03", "badge": "Android / AI", "title": "AI Deployment Insights Assistant",
      "description": "Smart assistant that analyzes deployment data from Jira and Confluence to provide real-time insights using a hybrid ML + LLM approach.",
      "tags": ["Python", "LLM", "Ollama", "RAG", "Jira API"], "github": "#", "live": "#"
    },
    {
      "num": "04", "badge": "Android / Backend", "title": "Test Case Management System",
      "description": "Full-stack platform to manage test cases, create test cycles, track execution status, and export reports with filtering and labeling.",
      "tags": ["React.js", "Spring Boot", "MySQL", "REST API"], "github": "#", "live": "#"
    },
    {
      "num": "05", "badge": "AI / Automation", "title": "Automated Test Coverage Optimizer",
      "description": "AI-powered tool that analyzes JaCoCo reports to detect untested code paths and automatically suggests and generates test cases.",
      "tags": ["Java", "JaCoCo", "AI", "Test Automation"], "github": "#", "live": "#"
    },
    {
      "num": "06", "badge": "Android / AI", "title": "Local AI Coding IDE",
      "description": "A custom coding IDE with integrated AI assistant using Ollama for local code suggestions, debugging, and intelligent code generation.",
      "tags": ["Kotlin", "Ollama", "LLM", "IDE"], "github": "#", "live": "#"
    },
    {
      "num": "07", "badge": "AI / Data", "title": "RAG-Based Knowledge System",
      "description": "A document-based Q&A system using RAG architecture to retrieve and answer queries from internal organizational data sources.",
      "tags": ["LangChain", "LlamaIndex", "Python", "Vector DB"], "github": "#", "live": "#"
    }
  ],
  "techStack": [
    { "category": "Languages", "items": [
      { "name": "Kotlin",     "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",         "url": "https://kotlinlang.org" },
      { "name": "Java",       "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",             "url": "https://java.com" },
      { "name": "Python",     "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",         "url": "https://python.org" },
      { "name": "JavaScript", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { "name": "HTML",       "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",           "url": "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { "name": "CSS",        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",             "url": "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { "name": "SQL",        "emoji": "🗄️", "url": "#" }
    ]},
    { "category": "Mobile", "items": [
      { "name": "Android",         "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg", "url": "https://developer.android.com" },
      { "name": "Jetpack Compose", "emoji": "🎨", "url": "https://developer.android.com/jetpack/compose" },
      { "name": "Retrofit",        "emoji": "🔌", "url": "https://square.github.io/retrofit/" },
      { "name": "Coroutines",      "emoji": "⚡", "url": "https://kotlinlang.org/docs/coroutines-overview.html" },
      { "name": "MVVM",            "emoji": "🏗️", "url": "#" }
    ]},
    { "category": "Web & Backend", "items": [
      { "name": "React",       "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",           "url": "https://react.dev" },
      { "name": "Spring Boot", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",         "url": "https://spring.io/projects/spring-boot" },
      { "name": "MySQL",       "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",           "url": "https://mysql.com" },
      { "name": "PostgreSQL",  "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", "url": "https://postgresql.org" },
      { "name": "Firebase",    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",        "url": "https://firebase.google.com" }
    ]},
    { "category": "AI & ML", "items": [
      { "name": "Ollama",      "emoji": "🦙", "url": "https://ollama.com" },
      { "name": "Gemini",      "emoji": "✦",  "url": "https://deepmind.google/technologies/gemini/" },
      { "name": "LangChain",   "emoji": "🔗", "url": "https://langchain.com" },
      { "name": "LlamaIndex",  "emoji": "📚", "url": "https://www.llamaindex.ai" },
      { "name": "RAG",         "emoji": "🧠", "url": "#" },
      { "name": "Prompt Eng.", "emoji": "💬", "url": "#" }
    ]},
    { "category": "Testing", "items": [
      { "name": "JUnit",       "emoji": "✅", "url": "https://junit.org" },
      { "name": "Mockito",     "emoji": "🧪", "url": "https://site.mockito.org" },
      { "name": "RestAssured", "emoji": "🔬", "url": "https://rest-assured.io" },
      { "name": "JaCoCo",      "emoji": "📊", "url": "#" }
    ]},
    { "category": "Tools & DevOps", "items": [
      { "name": "Git",      "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",          "url": "https://git-scm.com" },
      { "name": "GitHub",   "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",    "url": "https://github.com" },
      { "name": "Docker",   "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",    "url": "https://docker.com" },
      { "name": "VS Code",  "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",    "url": "https://code.visualstudio.com" },
      { "name": "IntelliJ", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg","url": "https://www.jetbrains.com/idea/" },
      { "name": "Postman",  "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",  "url": "https://postman.com" },
      { "name": "Figma",    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",      "url": "https://figma.com" }
    ]}
  ],
  "achievements": [
    { "icon": "🎤", "title": "Speaker at Java Fest",           "desc": "Shared knowledge and experiences at Java Fest, representing the developer community.",                                          "tag": "Public Speaking"   },
    { "icon": "👨‍🏫", "title": "Mentored 600+ Students",        "desc": "Guided students across various departments on programming, career paths, and tech fundamentals.",                               "tag": "Mentorship"        },
    { "icon": "🏢", "title": "Office Tech Sessions",           "desc": "Conducted internal technical sessions at the workplace, contributing to team learning and upskilling.",                         "tag": "Knowledge Sharing" },
    { "icon": "📦", "title": "Published Python Package on PyPI","desc": "Built and released a Python package to PyPI — my first open-source contribution to the community.",                           "tag": "Open Source"       },
    { "icon": "🤝", "title": "TN JUG Representative",          "desc": "Organizing and representing Tamil Nadu Java User Group (TN JUG), driving tech events and community growth.",                   "tag": "Community"         },
    { "icon": "🌊", "title": "PADI Open Water Diver",          "desc": "Certified PADI Open Water Diver — because the best engineers explore beyond the screen too.",                                   "tag": "Certified"         }
  ],
  "contact": {
    "email": "saimounik.official@gmail.com",
    "linkedin": "https://www.linkedin.com/in/sai-mounik/",
    "github": "https://github.com/SaiMounik07",
    "twitter": "",
    "location": "India",
    "availability": "Open to full-time & freelance opportunities"
  }
};

function initWithData(data) {
  renderProjects(data.projects);
  renderTechStack(data.techStack);
  renderAchievements(data.achievements);
  renderContact(data.contact);
  // Small timeout ensures DOM is fully painted before observing
  setTimeout(() => {
    observeReveal();
    attachCursorHover('.tech-item, .proj-card, .contact-social-card, .ach-card');
  }, 50);
}

// Try fetch first (works on a server), fall back to inline data
fetch('data.json')
  .then(r => { if (!r.ok) throw new Error(); return r.json(); })
  .then(data => initWithData(data))
  .catch(() => initWithData(FALLBACK_DATA));

/* ----- ACHIEVEMENTS ----- */
function renderAchievements(achievements) {
  const grid = document.getElementById('achGrid');
  if (!grid || !achievements) return;
  grid.innerHTML = achievements.map((a, i) => `
    <div class="ach-card reveal" data-delay="${i % 3}">
      <div class="ach-top">
        <span class="ach-icon">${a.icon}</span>
        <span class="ach-tag">${a.tag}</span>
      </div>
      <h3>${a.title}</h3>
      <p>${a.desc}</p>
    </div>
  `).join('');
}

/* ----- PROJECTS ----- */
function renderProjects(projects) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = projects.map((p, i) => `
    <div class="proj-card reveal" data-delay="${i}">
      <div class="proj-num">${p.num}</div>
      <div class="proj-body">
        <span class="proj-badge">${p.badge}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="proj-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      </div>
      <div class="proj-links">
        ${p.github ? `<a href="${p.github}" target="_blank" class="proj-link"><i class="fab fa-github"></i> Code</a>` : ''}
        ${p.live   ? `<a href="${p.live}"   target="_blank" class="proj-link proj-link-live">Live ↗</a>` : ''}
      </div>
    </div>
  `).join('');
}

/* ----- TECH STACK ----- */
function renderTechStack(categories) {
  const grid = document.getElementById('techGrid');
  if (!grid) return;
  // flatten all items across categories into one icon grid
  const allItems = categories.flatMap(cat => cat.items);
  grid.innerHTML = allItems.map(item => {
    const visual = item.icon
      ? `<img src="${item.icon}" alt="${item.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
         <div class="tech-text-icon" style="display:none">⚙️</div>`
      : `<div class="tech-text-icon">${item.emoji || '⚙️'}</div>`;
    return `
      <a class="tech-item" href="${item.url}" target="_blank" title="${item.name}">
        ${visual}
        <span>${item.name}</span>
      </a>`;
  }).join('');
}

/* ----- CONTACT ----- */
function renderContact(c) {
  // availability line
  const avail = document.getElementById('contactAvailability');
  if (avail) avail.textContent = c.availability;

  // email link
  const emailEl = document.getElementById('contactEmail');
  if (emailEl) {
    emailEl.href = `mailto:${c.email}`;
    emailEl.textContent = `${c.email} ↗`;
  }

  // social cards
  const cards = document.getElementById('contactCards');
  if (cards) {
    const socials = [
      c.email    && { icon: 'fas fa-envelope', label: 'Email',    href: `mailto:${c.email}`, value: c.email },
      c.linkedin && { icon: 'fab fa-linkedin', label: 'LinkedIn', href: c.linkedin,           value: c.linkedin.replace('https://www.','').replace('https://','') },
      c.github   && { icon: 'fab fa-github',   label: 'GitHub',   href: c.github,             value: c.github.replace('https://','') },
      c.twitter  && { icon: 'fab fa-twitter',  label: 'Twitter',  href: c.twitter,            value: c.twitter.replace('https://twitter.com/','@').replace('https://x.com/','@') },
    ].filter(Boolean);

    cards.innerHTML = socials.map(s => `
      <a href="${s.href}" target="_blank" class="contact-social-card">
        <div class="csc-icon"><i class="${s.icon}"></i></div>
        <div class="csc-info">
          <span class="csc-label">${s.label}</span>
          <span class="csc-value">${s.value}</span>
        </div>
        <div class="csc-arrow">↗</div>
      </a>
    `).join('');
  }

  // location badge
  const loc = document.getElementById('contactLocation');
  if (loc && c.location) {
    loc.innerHTML = `<span class="loc-badge"><i class="fas fa-map-marker-alt"></i> ${c.location}</span>`;
  }
}

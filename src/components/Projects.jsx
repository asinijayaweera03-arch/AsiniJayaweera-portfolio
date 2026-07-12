import React, { useState, useEffect } from 'react';
import { ExternalLink, Folder, Star, GitFork, Download } from 'lucide-react';

const Github = ({ size = 20, ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const formatName = (name) =>
  name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const formatDownloads = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n);

const toLatestRelease = (r) => {
  if (!r || r.draft) return null;
  const assets = r.assets ?? [];
  const downloads = assets.reduce((sum, a) => sum + (a.download_count ?? 0), 0);
  const primary = [...assets].sort((a, b) => b.size - a.size)[0];
  return {
    version: r.tag_name || r.name || 'latest',
    url: primary?.browser_download_url ?? r.html_url,
    downloads,
  };
};

const CATEGORIES = ['All', 'Full Stack', 'Web', 'Mobile App', 'AI/ML', 'Other'];

const REPO_STACKS = {
  'notifiu-mobile': ['React Native', 'MongoDB', 'Express.js', 'Node.js', 'REST API'],
  'focusly': ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
  'what-should-i-cook': ['React', 'Vite', 'Gemini API', 'Vercel Serverless'],
  'inventory-management-system': ['Java', 'JSP', 'Servlets', 'MySQL', 'Data Structures']
};

const repoStack = (repo) =>
  REPO_STACKS[repo.name.toLowerCase()] ?? repo.allLanguages;

function classifyRepo(repo) {
  const haystack = [
    repo.name,
    repo.description ?? '',
    ...(repo.topics ?? []),
    ...(REPO_STACKS[repo.name.toLowerCase()] ?? []),
    ...(repo.allLanguages ?? []),
    repo.language ?? '',
  ]
    .join(' ')
    .toLowerCase();

  const has = (...keys) => keys.some(k => haystack.includes(k));

  if (has('mobile-app', 'mobile app', 'react-native', 'react native', 'flutter', 'android', 'ios', 'kotlin', 'swift', 'expo'))
    return 'Mobile App';
  if (has('machine-learning', 'machine learning', 'ml', 'ai', 'tensorflow', 'pytorch', 'jupyter', 'data-science', 'nlp', 'gemini'))
    return 'AI/ML';
  if (has('spring-boot', 'spring boot', 'express', 'nodejs', 'node.js', 'fullstack', 'full-stack', 'postgres', 'supabase', 'neon', 'prisma', 'mongodb', 'mysql', 'jwt', 'jsp', 'servlet'))
    return 'Full Stack';
  if (has('react', 'vite', 'next', 'vue', 'svelte', 'tailwind', 'html', 'css', 'javascript', 'typescript', 'web'))
    return 'Web';
  return 'Other';
}

const CACHE_KEY = 'gh_repos_v7_asini';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const GH_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const ghHeaders = GH_TOKEN ? { Authorization: `Bearer ${GH_TOKEN}` } : {};

const FEATURED_NAMES = [
  'notifiu-mobile',
  'focusly',
  'what-should-i-cook',
  'inventory-management-system'
];

function ProjectPlaceholder({ repoName, className }) {
  return (
    <div className={`${className} project-placeholder`}>
      <div className="project-placeholder-glow" />
      <div className="project-placeholder-grid" />
      <Folder size={40} className="project-placeholder-icon" />
      <span className="project-placeholder-title">
        {formatName(repoName)}
      </span>
    </div>
  );
}

function ProjectImage({ repoName, alt, className, loading }) {
  const sources = [
    `${import.meta.env.BASE_URL}projects/${repoName.toLowerCase()}.webp`,
    `${import.meta.env.BASE_URL}projects/${repoName.toLowerCase()}.png`,
    `${import.meta.env.BASE_URL}projects/${repoName.toLowerCase()}.jpg`,
  ];
  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return <ProjectPlaceholder repoName={repoName} className={className} />;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!loaded && (
        <div className="image-shimmer" aria-hidden="true" />
      )}
      <img
        src={sources[srcIndex]}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setSrcIndex(index => {
            if (index >= sources.length - 1) {
              setFailed(true);
              return index;
            }
            return index + 1;
          });
        }}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}

const FALLBACK_REPOS = [
  {
    id: -1,
    name: 'notifiu-mobile',
    description: 'Centralized MERN Stack Mobile & Web Application for university announcements, course events, and job listings.',
    html_url: 'https://github.com/GayaKrish2003/notifiU',
    homepage: '',
    topics: ['mongodb', 'expressjs', 'react', 'nodejs', 'react-native', 'rest-api'],
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: new Date().toISOString(),
    allLanguages: ['JavaScript', 'Java'],
    problem: 'University communication, announcements, course events, and job opportunities are often scattered across multiple platforms. This fragmentation leads to missed deadlines, administrative inefficiencies, and low student engagement with industry roles.',
    role: 'Full-Stack Developer. Responsible for designing and implementing the database structure, developing backend REST APIs, and building the cross-platform mobile app interface.',
    outcome: 'Delivered a centralized university mobile and web platform that streams academic modules, announcements, and job listings. The platform successfully connects students, lecturers, administrators, and job providers in a single, unified environment.'
  },
  {
    id: -2,
    name: 'Focusly',
    description: 'Productivity & Gamified Note-Taking Web App with daily streaks, task management, Pomodoro timers, and rewards.',
    html_url: 'https://github.com/asinijayaweera03-arch/Focusly',
    homepage: 'https://focusly-mern.vercel.app/',
    topics: ['react', 'nodejs', 'express', 'mongodb', 'jwt', 'agile'],
    language: 'JavaScript',
    stargazers_count: 1,
    forks_count: 0,
    fork: false,
    updated_at: new Date().toISOString(),
    allLanguages: ['JavaScript', 'HTML', 'CSS'],
    problem: 'Students and remote workers struggle with online distractions, organizing daily workloads, and maintaining focus during work sessions. Traditional planners lack engagement, leading to drop-offs in habit formation.',
    role: 'Full-Stack Developer & Agile Coordinator. Collaborated on frontend state management, integrated authentication flows, and led team coordination, requirement analysis, and Agile sprint planning.',
    outcome: 'Created a gamified productivity web application combining task management, Pomodoro timers, and user rewards (XP, levels, badges). Enabled daily roll-over of unfinished tasks and secure Google authentication, resulting in a distraction-free, habit-building workspace.'
  },
  {
    id: -3,
    name: 'what-should-i-cook',
    description: 'A fridge leftover matcher. List the ingredients you have, and AI suggests recipes ranked by fewest missing ingredients. React + Vite frontend, Gemini API-powered Vercel serverless backend.',
    html_url: 'https://github.com/asinijayaweera03-arch/what-should-i-cook',
    homepage: 'https://what-should-i-cook-five.vercel.app',
    topics: ['react', 'vite', 'gemini-api', 'serverless', 'ai'],
    language: 'JavaScript',
    stargazers_count: 1,
    forks_count: 0,
    fork: false,
    updated_at: new Date().toISOString(),
    allLanguages: ['JavaScript', 'CSS', 'HTML'],
    problem: 'People often find themselves with random ingredients in the fridge and don\'t know what to cook, leading to food waste or repetitive meals.',
    role: 'Full-Stack Developer. Integrated Google Gemini API for intelligent recipe generation, built a dynamic ingredient matcher frontend using React, and deployed serverless API handlers.',
    outcome: 'Built an AI fridge matcher where users list ingredients and receive personalized recipes ordered by minimal missing ingredients, significantly reducing food waste and making cooking fun.'
  },
  {
    id: -4,
    name: 'inventory-management-system',
    description: 'Full-Stack Java Enterprise Stock Management CRUD system with rollbacks and sorting.',
    html_url: 'https://github.com/asinijayaweera03-arch',
    homepage: '',
    topics: ['java', 'jsp', 'servlets', 'mysql', 'data-structures'],
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: new Date().toISOString(),
    allLanguages: ['Java', 'SQL'],
    problem: 'Inefficient inventory tracking and lack of organized sorting mechanisms for stock management. Businesses struggled with real-time updates and quick lookups of items.',
    role: 'Backend & Data Logic Developer. Designed backend database schemas, implemented custom stack data structures, and applied sorting algorithms for optimized data retrieval.',
    outcome: 'Developed a full CRUD system to manage stock items. Implemented a custom Stack for transaction rollbacks and applied Merge Sort for data organization, resulting in robust performance and clean database integration.'
  }
];

const mergeRepos = (repos) => {
  const byName = new Map();

  for (const repo of FALLBACK_REPOS) {
    byName.set(repo.name.toLowerCase(), repo);
  }

  for (const repo of repos) {
    const key = repo.name.toLowerCase();
    byName.set(key, {
      ...byName.get(key),
      ...repo,
      allLanguages: repo.allLanguages?.length
        ? repo.allLanguages
        : byName.get(key)?.allLanguages ?? [],
    });
  }

  return Array.from(byName.values())
    .filter(repo => repo.private !== true)
    .sort((a, b) => {
      const featuredA = FEATURED_NAMES.indexOf(a.name.toLowerCase());
      const featuredB = FEATURED_NAMES.indexOf(b.name.toLowerCase());
      if (featuredA !== -1 || featuredB !== -1) {
        if (featuredA === -1) return 1;
        if (featuredB === -1) return -1;
        return featuredA - featuredB;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
};

const readCachedRepos = () => {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp >= CACHE_TTL) return null;

    return mergeRepos(data);
  } catch {
    return null;
  }
};

export default function Projects() {
  const [repos, setRepos] = useState(() => readCachedRepos() ?? mergeRepos([]));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const apiUrl = `https://api.github.com/users/asinijayaweera03-arch/repos?sort=updated&per_page=100&_=${Date.now()}`;
    fetch(apiUrl, { headers: ghHeaders, cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
      })
      .then(async (data) => {
        const publicOnly = data.filter(repo => repo.private !== true);
        const sorted = publicOnly.sort(
          (a, b) =>
            b.stargazers_count - a.stargazers_count ||
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        );

        const withLanguages = await Promise.all(
          sorted.map(async repo => {
            let language = repo.language;
            let allLanguages = [];
            try {
              const langsRes = await fetch(`https://api.github.com/repos/asinijayaweera03-arch/${repo.name}/languages`, { headers: ghHeaders });
              const langsData = await langsRes.json();
              allLanguages = Object.keys(langsData).slice(0, 5);
              if (!language && allLanguages.length > 0) language = allLanguages[0];
            } catch { /* ignore */ }

            let latestRelease = null;
            try {
              const relRes = await fetch(`https://api.github.com/repos/asinijayaweera03-arch/${repo.name}/releases/latest`, { headers: ghHeaders });
              if (relRes.ok) latestRelease = toLatestRelease(await relRes.json());
            } catch { /* ignore */ }

            return { ...repo, language, allLanguages, latestRelease };
          }),
        );

        const mergedRepos = mergeRepos(withLanguages);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: mergedRepos, timestamp: Date.now() }));
        } catch { /* ignore */ }
        setRepos(mergedRepos);
      })
      .catch(() => {
        setError(false); // Fail silently, use fallbacks
      })
      .finally(() => setLoading(false));
  }, []);

  const featured = FEATURED_NAMES
    .map(n => repos.find(r => r.name.toLowerCase() === n))
    .filter(Boolean);

  const EXCLUDED_NAMES = [
    'asinijayaweera03-arch',
    'dojo-helpdesk',
    'dojo-helpdesk-new',
    'gittest',
    'gittestrepo'
  ];

  const featuredIds = new Set(featured.map(r => r.id));
  const rest = repos.filter(r => 
    !featuredIds.has(r.id) && 
    !EXCLUDED_NAMES.includes(r.name.toLowerCase())
  );
  const filteredRest = activeCategory === 'All' ? rest : rest.filter(r => classifyRepo(r) === activeCategory);
  const visibleRest = showAll ? filteredRest : filteredRest.slice(0, 6);

  const handleCategory = (c) => {
    setActiveCategory(c);
    setShowAll(false);
  };

  return (
    <section id="projects" className="section-container">
      <div className="section-header">
        <h2 className="section-title">Projects</h2>
        <div className="section-underline"></div>
      </div>

      {loading && repos.length === 0 && (
        <p style={{ textAlign: 'center', padding: '40px 0', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
          Loading projects from GitHub…
        </p>
      )}

      {featured.length > 0 && (
        <div className="featured-projects-container">
          {featured.map((repo, idx) => {
            const isReverse = idx % 2 === 1;
            const techStack = repoStack(repo);
            return (
              <article key={repo.id} className={`featured-project ${isReverse ? 'reverse' : ''}`}>
                <a
                  href={repo.homepage || repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-project-image-link"
                >
                  <ProjectImage
                    repoName={repo.name}
                    alt={repo.name}
                    loading="lazy"
                    className="featured-project-img"
                  />
                </a>

                <div className="featured-project-content">
                  <span className="featured-project-overline">Featured Project</span>
                  <h3 className="featured-project-title">
                    <a href={repo.homepage || repo.html_url} target="_blank" rel="noopener noreferrer">
                      {formatName(repo.name)}
                    </a>
                  </h3>
                  <div className="featured-project-description">
                    <p style={{ margin: 0, marginBottom: '8px' }}>
                      <strong>Problem:</strong> {repo.problem || repo.description}
                    </p>
                    {repo.role && (
                      <p style={{ margin: 0, marginBottom: '8px' }}>
                        <strong>My Role:</strong> {repo.role}
                      </p>
                    )}
                    {repo.outcome && (
                      <p style={{ margin: 0 }}>
                        <strong>Outcome:</strong> {repo.outcome}
                      </p>
                    )}
                  </div>
                  {techStack.length > 0 && (
                    <ul className="featured-project-tech-list">
                      {techStack.slice(0, 6).map(lang => (
                        <li key={lang}>{lang}</li>
                      ))}
                    </ul>
                  )}
                  {repo.latestRelease && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <a
                        href={repo.latestRelease.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ padding: '8px 16px', fontSize: '13px' }}
                      >
                        <Download size={14} /> Download {repo.latestRelease.version}
                      </a>
                      {repo.latestRelease.downloads > 0 && (
                        <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)' }}>
                          {formatDownloads(repo.latestRelease.downloads)} downloads
                        </span>
                      )}
                    </div>
                  )}
                  <div className="featured-project-links">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Repository"
                      className="featured-project-link"
                    >
                      <Github size={20} />
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                        className="featured-project-link"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Other Noteworthy Projects */}
      {rest.length > 0 && (
        <div className="noteworthy-section">
          <div className="noteworthy-header">
            <h3 className="noteworthy-title">Everything Else I've Shipped</h3>
            <a
              href="https://github.com/asinijayaweera03-arch"
              target="_blank"
              rel="noopener noreferrer"
              className="noteworthy-archive-link"
            >
              view the archive
            </a>
          </div>

          <div className="category-filters-container">
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`category-pill-btn ${active ? 'active' : ''}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {filteredRest.length === 0 && (
            <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '14px', color: 'var(--text-muted)', marginTop: '40px' }}>
              No projects in this category yet.
            </p>
          )}

          <div className="noteworthy-grid">
            {visibleRest.map((repo) => {
              const techStack = repoStack(repo);
              return (
                <article key={repo.id} className="noteworthy-card">
                  <header className="noteworthy-card-header">
                    <Folder size={32} className="noteworthy-folder-icon" />
                    <div className="noteworthy-links">
                      {repo.stargazers_count > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                          <Star size={14} /> {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                          <GitFork size={14} /> {repo.forks_count}
                        </span>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        className="noteworthy-link"
                      >
                        <Github size={20} />
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live Demo"
                          className="noteworthy-link"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </header>

                  <h4 className="noteworthy-card-title">
                    <a href={repo.homepage || repo.html_url} target="_blank" rel="noopener noreferrer">
                      {formatName(repo.name)}
                    </a>
                  </h4>

                  <p className="noteworthy-card-description">
                    {repo.description || 'A project showcasing coding implementation and development principles.'}
                  </p>

                  {techStack.length > 0 && (
                    <ul className="noteworthy-card-tech">
                      {techStack.slice(0, 5).map(lang => (
                        <li key={lang}>{lang}</li>
                      ))}
                    </ul>
                  )}

                  {repo.latestRelease && (
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <a
                        href={repo.latestRelease.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px' }}
                      >
                        <Download size={12} /> Download {repo.latestRelease.version}
                      </a>
                      {repo.latestRelease.downloads > 0 && (
                        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-muted)' }}>
                          {formatDownloads(repo.latestRelease.downloads)} dl
                        </span>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {filteredRest.length > 6 && (
            <div className="show-more-container">
              <button
                onClick={() => setShowAll(s => !s)}
                className="show-more-btn"
              >
                {showAll ? 'Show Less' : `Show More (${filteredRest.length - 6})`}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

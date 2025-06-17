import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useScrollAnimation';

const Projects: React.FC = () => {
  const { isVisible, ref } = useIntersectionObserver(0.2);
  const [expanded, setExpanded] = useState(false);
  const [visibleIds, setVisibleIds] = useState<number[]>([]);
  const [closingIds, setClosingIds] = useState<number[]>([]);

  const allProjects = [
    {
      id: 1,
      title: 'Portofolio',
      description:
        'This is the 3rd Portfolio Website that I have developed and this is the website that you are now open.',
      image: '../src/images/portofolio.png',
      tech: ['React', 'Tailwind CSS', 'TypeScript', 'Vite'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 2,
      title: 'App Premium Shop',
      description:
        'The e-commerce website that I developed 2 after the online game top up website, I developed this using a Laravel Framework.',
      image:
        '../src/images/website-app.png',
      tech: ['PHP', 'LARAVEL', 'MySQL', 'Bootstrap CSS'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 3,
      title: 'PT. Solusi Masalah',
      description:
        'This website is a website owned by a PT and this website that develops myself, I developed using a Laravel Framework.',
      image:
        '../src/images/solusi-masalah.png',
      tech: ['PHP', 'LARAVEL', 'Tailwind css', 'MySQL'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 4,
      title: 'Online Game Top Up',
      description:
        'This is an e-commerce website that I first developed, and I used a Laravel Framework.',
      image:
        '../src/images/website-topup.png',
      tech: ['PHP', 'Bootstrap CSS', 'Laravel', 'MySQL'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  const initialProjects = allProjects.slice(0, 3);
  const remainingProjects = allProjects.slice(3);

  useEffect(() => {
    if (expanded) {
      setClosingIds([]);
      remainingProjects.forEach((project, index) => {
        setTimeout(() => {
          setVisibleIds((prev) => [...prev, project.id]);
        }, index * 200);
      });
    } else {
      setClosingIds([...visibleIds]);
      setVisibleIds([]);
      setTimeout(() => setClosingIds([]), 500);
    }
  }, [expanded]);

  const renderProjectLayout = (
    project: typeof allProjects[number],
    delay: number,
    alwaysVisible = false
  ) => {
    const isVisible = alwaysVisible || visibleIds.includes(project.id);
    const isClosing = closingIds.includes(project.id);
    const show = isVisible || isClosing;

    if (!show) return null;

    return (
      <div
        key={project.id}
        className={`bg-white dark:bg-gradient-to-br dark:from-[#1c1c1c] dark:to-[#2a2a2a] hover:dark:from-[#2a2a2a] hover:dark:to-[#3a3a3a]
        transition-all duration-700 rounded-xl p-6 md:flex items-center gap-10 mb-12 ease-out
        ${isVisible && !isClosing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="md:w-1/2 space-y-4">
          <div className="flex gap-4">
            <a
              href={project.githubUrl}
              className="bg-gray-100 dark:bg-white text-black p-2 rounded-full hover:scale-110 transition"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={project.liveUrl}
              className="bg-gray-100 dark:bg-white text-black p-2 rounded-full hover:scale-110 transition"
              title="Live"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          <h3 className="text-3xl font-bold text-black dark:text-white">{project.title}</h3>
          <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
            {project.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src={project.image}
            alt={`${project.title} Preview`}
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </div>
    );
  };

  return (
    <section ref={ref} className="py-20 bg-[#f9f9f9] dark:bg-[#111] text-black dark:text-white transition-colors duration-500" id="projects">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Section Title */}
          <div className="text-left mb-16">
            <h2 className="text-5xl font-bold mb-8">Recent Projects</h2>
          </div>

          {/* Initial Projects */}
          {initialProjects.map((project, index) =>
            renderProjectLayout(project, index * 200, true)
          )}

          {/* Load More Button */}
          {remainingProjects.length > 0 && (
            <div className="text-center my-12">
              <h3 className="text-2xl font-bold mb-4">See other project</h3>
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="bg-gray-200 dark:bg-[#191919] text-black dark:text-white border border-gray-300 dark:border-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors"
              >
                {expanded ? 'Show less' : 'Load more'}
              </button>
            </div>
          )}

          {/* Remaining Projects */}
          {remainingProjects.map((project, i) =>
            renderProjectLayout(project, (i + 1) * 200)
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;

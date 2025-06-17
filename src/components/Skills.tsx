// Skills.tsx
import React, { useEffect, useState } from 'react';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiCss3,
  SiHtml5,
  SiVuedotjs,
  SiNodedotjs,
  SiGithub,
  SiApachenetbeanside,
} from 'react-icons/si';
import { useIntersectionObserver } from '../hooks/useScrollAnimation';

interface Skill {
  name: string;
  level: number;
  icon: JSX.Element;
}

const skills: Skill[] = [
  { name: 'React', level: 95, icon: <SiReact className="text-blue-500 w-6 h-6" /> },
  { name: 'TypeScript', level: 90, icon: <SiTypescript className="text-blue-700 w-6 h-6" /> },
  { name: 'JavaScript (ES6+)', level: 95, icon: <SiJavascript className="text-yellow-400 w-6 h-6" /> },
  { name: 'Next.js', level: 85, icon: <SiNextdotjs className="text-gray-800 dark:text-white w-6 h-6" /> },
  { name: 'Tailwind CSS', level: 90, icon: <SiTailwindcss className="text-cyan-500 w-6 h-6" /> },
  { name: 'CSS3 & SASS', level: 88, icon: <SiCss3 className="text-blue-600 w-6 h-6" /> },
  { name: 'HTML5', level: 95, icon: <SiHtml5 className="text-orange-500 w-6 h-6" /> },
  { name: 'Vue.js', level: 75, icon: <SiVuedotjs className="text-green-500 w-6 h-6" /> },
  { name: 'Node.js', level: 80, icon: <SiNodedotjs className="text-green-600 w-6 h-6" /> },
  { name: 'Git & GitHub', level: 85, icon: <SiGithub className="text-gray-900 dark:text-white w-6 h-6" /> },
  { name: 'Responsive Design', level: 92, icon: <SiHtml5 className="text-indigo-500 w-6 h-6" /> },
  { name: 'REST APIs', level: 88, icon: <SiApachenetbeanside className="text-blue-500 w-6 h-6" /> },
];

const Skills: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.2);
  const [animatedSkills, setAnimatedSkills] = useState<number[]>([]);
  const [displayedLevels, setDisplayedLevels] = useState<number[]>(Array(skills.length).fill(0));

  useEffect(() => {
    if (isVisible) {
      const timeouts = skills.map((_, i) =>
        setTimeout(() => {
          setAnimatedSkills((prev) => [...prev, i]);
        }, i * 100)
      );
      return () => timeouts.forEach(clearTimeout);
    }
  }, [isVisible]);

  useEffect(() => {
    const intervals = animatedSkills.map((index) => {
      const target = skills[index].level;
      return setInterval(() => {
        setDisplayedLevels((prev) => {
          const updated = [...prev];
          if (updated[index] < target) {
            updated[index] += 1;
          }
          return updated;
        });
      }, 20);
    });
    return () => intervals.forEach(clearInterval);
  }, [animatedSkills]);

  return (
    <section
      ref={ref}
      id="skills"
      className={`py-20 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } transition-all duration-700`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-black dark:text-white">
          My Skills
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {skills.map((skill, index) => {
            const isAnimated = animatedSkills.includes(index);
            const percentage = isAnimated ? displayedLevels[index] : 0;
            const dashOffset = 220 - (220 * percentage) / 100;
            return (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md flex flex-col items-center justify-center transition-all duration-700 ease-out transform hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {skill.icon}
                <h3 className="text-lg sm:text-xl font-semibold mt-4 text-black dark:text-white text-center">
                  {skill.name}
                </h3>
                <div className="relative w-20 h-20 mt-4">
                  <svg className="w-full h-full transform -rotate-90 transition-all duration-700 ease-in-out">
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="#e5e7eb"
                      strokeWidth="7"
                      fill="transparent"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="#3b82f6"
                      strokeWidth="7"
                      fill="transparent"
                      strokeDasharray={220}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-black dark:text-white">
                    {percentage}%
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">Proficiency</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;

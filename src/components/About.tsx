import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

const GITHUB_USERNAME = 'FaaCode22';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const fetchGitHubContributions = async (username: string, token: string) => {
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  return json.data.user.contributionsCollection.contributionCalendar.totalContributions;
};

const About: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const [contributions, setContributions] = useState<number | null>(null);

  useEffect(() => {
    fetchGitHubContributions(GITHUB_USERNAME, GITHUB_TOKEN).then(setContributions);
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-12 text-black dark:text-white transition-colors duration-500"
        >
          About Me
        </motion.h2>

        {/* Animated paragraphs */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg leading-relaxed mb-6 text-black dark:text-gray-200 transition-colors duration-500"
        >
I am a Frontend developer and a little backend who is enthusiastic with less than 3 years experience creating a modern and responsive web application.
 I specialize in the framework of reaction, manuscripts, and modern CSS to provide extraordinary user experiences that encourage business growth.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg leading-relaxed mb-6 text-black dark:text-gray-200 transition-colors duration-500"
        >
My trip began with self -taught, and since then I became a web developer / frontend developer and I often create a website from companies in Indonesia.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg leading-relaxed mb-6 text-black dark:text-gray-200 transition-colors duration-500"
        >
When I don't code, you can find me enjoy a cup of delicious coffee and also listen to music while doing brainstorming the next big idea. I am always happy with new challenges and opportunities to create something extraordinary.
        </motion.p>

        {/* GitHub Contributions Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 mt-10 p-6 rounded-2xl shadow-lg text-center transition-colors duration-500"
        >
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4 transition-colors duration-500">
            GitHub Contributions
          </h3>

          <div className="flex items-center justify-center mb-6">
            <img
              src={`https://github.com/${GITHUB_USERNAME}.png`}
              alt="GitHub Avatar"
              className="w-16 h-16 rounded-full mr-4 border-2 border-blue-500"
            />
            <div>
              <p className="text-lg font-semibold text-black dark:text-white transition-colors duration-500">
                @{GITHUB_USERNAME}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500">
                {contributions !== null ? `${contributions} contributions in the last year` : 'Loading...'}
              </p>
            </div>
          </div>

          <div className="w-full overflow-x-auto rounded-lg">
            <img
              src={`https://ghchart.rshah.org/green/${GITHUB_USERNAME}`}
              alt="GitHub Contributions Chart"
              className="w-[700px] max-w-full mx-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

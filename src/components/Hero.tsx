import React, { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useScrollAnimation';

const Hero: React.FC = () => {
  const { isVisible, ref } = useIntersectionObserver(0.3);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY * 0.3);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={ref}
       className="min-h-screen flex items-center justify-center relative bg-[#f5f5f5] dark:bg-black overflow-hidden"

      id="home"
    >
      {/* Nama Besar Background */}
      <div
  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-extrabold uppercase leading-none z-0 select-none text-center"
  style={{ transform: `translate(-50%, calc(-50% + ${-offsetY}px))` }}
>
  <h1 className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] tracking-tight opacity-50 text-black dark:text-white">
    CANDRA
  </h1>
  <h1 className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] tracking-tight opacity-50 text-black dark:text-white">
    LUKITA
  </h1>
  <h1 className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] tracking-tight opacity-50 text-black dark:text-white">
    ASRO A.F
  </h1>
</div>


      {/* Gambar Profil Tengah */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="relative mx-auto w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-xl shadow-2xl animate-float">
          {/* Glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-500 via-blue-500 to-emerald-500 opacity-20 blur-2xl animate-pulse" />
          {/* Foto Profil */}
          <img
            src="/images/foto.png" // Ganti sesuai gambar kamu
            alt="CANDRA LUKITA ASRO A.F"
            className="w-full h-full object-cover rounded-xl border-4 border-white shadow-xl"
          />
        </div>
      </div>

{/* Seamless Scrolling Text */}
<div className="absolute bottom-10 w-full overflow-hidden whitespace-nowrap z-0">
  <div className="flex w-max animate-marquee-right-slow">
    <span className="uppercase font-extrabold text-[80px] tracking-tight text-black dark:text-white opacity-50">
      FRONTEND DEVELOPER - FRONTEND DEVELOPER - FRONTEND DEVELOPER - FRONTEND DEVELOPER 
    </span>
    <span className="uppercase font-extrabold text-[80px] tracking-tight text-black dark:text-white opacity-50">
      - FRONTEND DEVELOPER - FRONTEND DEVELOPER - FRONTEND DEVELOPER - FRONTEND DEVELOPER 
    </span>
  </div>
</div>


    </section>
  );
};

export default Hero;

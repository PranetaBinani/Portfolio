import React,{ useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper component for inline SVG icons
const Icon = ({ name, size = 24, className = '', color = 'currentColor' }) => {
  const icons = {
    Home: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    User: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    Code: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    Mail: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    ExternalLink: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`,
    Github: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
    Linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
    Sun: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/></svg>`,
    Moon: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    X: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    Menu: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
    Phone: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><path d="M22 16.92v3a2 2 0 0 1-2.18 2.003 14.66 14.66 0 0 1-14.004-14.004A2 2 0 0 1 3.08 2H6c.44 0 .93.18 1.2.5L9.18 8.2a2 2 0 0 1-.7 2.928L7.1 12.6a14.5 14.5 0 0 0 6.3 6.3l1.47-1.37a2 2 0 0 1 2.92-.7L21.5 15.8c.32.27.5.76.5 1.2z"/></svg>`,
    FileText: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
    CheckCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    ReactIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" width="${size}" height="${size}" class="${className}"><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
    NodejsIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="#339933" class="${className}"><path d="M11.99 24a12 12 0 1 1 12-12 12 12 0 0 1-12 12zm-1.32-8.62h-1.39v-5.3h1.39v1.88c.63-1.21 1.58-2.01 3.2-2.01.2 0 .39.02.58.05l-.2 1.54c-.13-.02-.27-.03-.4-.03-1.2 0-2.03.62-2.48 1.56V15.38zm5.72-6.76h-1.39v6.87h1.39v-6.87z"/></svg>`,
    PythonIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="#3776AB" class="${className}"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-3.6-11.4h3.6v-3.6h3.6v3.6h3.6v3.6h-3.6v3.6H12v3.6H8.4v-3.6H4.8v-3.6h3.6v-3.6z"/></svg>`,
    JavaIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="#f89820" class="${className}"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-1.8-16.8h3.6v1.8h-3.6v-1.8zm0 3.6h3.6v1.8h-3.6v-1.8zm0 3.6h3.6v1.8h-3.6v-1.8zm-3.6 1.8c0 1.98 1.62 3.6 3.6 3.6s3.6-1.62 3.6-3.6v-1.8H6.6v1.8z"/></svg>`,
    HtmlIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="#E34F26" class="${className}"><path d="M1.6 0h20.8l-1.9 21.6L12 24l-8.5-2.4L1.6 0zM12 3.6l6.6 1.8-1.2 13.2-5.4 1.5v-15z"/></svg>`,
    CssIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="#1572B6" class="${className}"><path d="M1.6 0h20.8l-1.9 21.6L12 24l-8.5-2.4L1.6 0zM12 3.6l6.6 1.8-1.2 13.2-5.4 1.5v-15z"/></svg>`,
    BootstrapIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="#7952B3" class="${className}"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-1.8-16.8h3.6v1.8h-3.6v-1.8zm0 3.6h3.6v1.8h-3.6v-1.8zm0 3.6h3.6v1.8h-3.6v-1.8zm-3.6 1.8c0 1.98 1.62 3.6 3.6 3.6s3.6-1.62 3.6-3.6v-1.8H6.6v1.8z"/></svg>`,
    PostmanIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="#FF6C37" class="${className}"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-1.8-16.8h3.6v1.8h-3.6v-1.8zm0 3.6h3.6v1.8h-3.6v-1.8zm0 3.6h3.6v1.8h-3.6v-1.8zm-3.6 1.8c0 1.98 1.62 3.6 3.6 3.6s3.6-1.62 3.6-3.6v-1.8H6.6v1.8z"/></svg>`,
    VsCodeIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="#007ACC" class="${className}"><path d="M23.1 5.4l-3.5-3.5c-.8-.8-2-.8-2.8 0L12 6.7 7.2 1.9c-.8-.8-2-.8-2.8 0L.9 5.4c-.8.8-.8 2 0 2.8l4.8 4.8-4.8 4.8c-.8.8-.8 2 0 2.8l3.5 3.5c.8.8 2 .8 2.8 0L12 17.3l4.8 4.8c.8.8 2 .8 2.8 0l3.5-3.5c.8-.8.8-2 0-2.8l-4.8-4.8 4.8-4.8c.8-.8.8-2 0-2.8z"/></svg>`,
  };

  const svgContent = icons[name];
  if (!svgContent) return null;

  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

// Custom Hook for Scroll Reveal Animation
const useScrollReveal = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing once visible
          }
        },
        {
          root: null, // viewport
          rootMargin: '0px',
          threshold: 0.1, // Trigger when 10% of the element is visible
        }
      );
  
      if (ref.current) {
        observer.observe(ref.current);
      }
  
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, []);
  
    return [ref, isVisible];
  };

// Loader Component
const Loader = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900">
        <motion.div
            className="w-16 h-16 border-4 border-t-4 border-green-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
    </div>
);


// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsNavOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'certifications', 'contact'];
      let currentActive = 'home';
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section && section.getBoundingClientRect().top < window.innerHeight / 2) {
          currentActive = sectionId;
        }
      }
      setActiveSection(currentActive);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-green-50 to-blue-50 text-gray-800'} min-h-screen font-sans transition-colors duration-300`}>
      <AnimatePresence>
        {isLoading && <Loader />}
      </AnimatePresence>
      
      <style>
        {`
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: ${darkMode ? '#111827' : '#f1f1f1'}; }
          ::-webkit-scrollbar-thumb { background: #10B981; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #059669; }
        `}
      </style>
      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <div className="fixed top-0 left-0 z-50 h-1 bg-green-500" style={{ width: `${scrollProgress}%` }}></div>

      <nav className={`${darkMode ? 'bg-gray-800/80 shadow-xl' : 'bg-white/80 shadow-lg'} fixed top-0 left-0 right-0 z-50 backdrop-blur-sm px-6 md:px-12 flex justify-between items-center transition-colors duration-300 h-20`}>
        <div className={`${darkMode ? 'text-green-400' : 'text-green-700'} text-2xl font-bold`}>Praneta Binani</div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className={`${darkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-300 focus:outline-none`}>
            {darkMode ? <Icon name="Sun" size={24} /> : <Icon name="Moon" size={24} />}
          </button>
          <button onClick={() => setIsNavOpen(true)} className={`${darkMode ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-blue-600'} focus:outline-none`}>
            <Icon name="Menu" size={28} />
          </button>
        </div>

        <div className={`${darkMode ? 'bg-gray-900 border-l border-gray-700' : 'bg-white border-l border-gray-200'} fixed top-0 right-0 h-screen w-[70%] md:w-[40%] shadow-2xl z-60 transform ${isNavOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out flex flex-col p-8 overflow-y-auto`}>
          <button onClick={() => setIsNavOpen(false)} className={`${darkMode ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-blue-600'} absolute top-8 right-8 focus:outline-none`}>
            <Icon name="X" size={36} />
          </button>
          <ul className="flex flex-col space-y-6 text-xl mt-16">
            {['home', 'about', 'projects', 'certifications', 'contact'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`flex items-center space-x-4 py-3 px-6 rounded-lg w-full text-left transition-all duration-300
                    ${activeSection === section ? `${darkMode ? 'bg-green-700 text-white' : 'bg-green-100 text-green-700'} font-semibold` : `${darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'}`}`}
                >
                  <Icon name={section === 'home' ? 'Home' : section === 'about' ? 'User' : section === 'projects' ? 'Code' : section === 'certifications' ? 'CheckCircle' : 'Mail'} size={24} />
                  <span className="capitalize">{section}</span>
                </button>
              </li>
            ))}
            <li>
                <a
                    href="https://example.com/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-4 py-3 px-6 rounded-lg w-full text-left transition-all duration-300 ${darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'}`}
                >
                    <Icon name="FileText" size={24} />
                    <span>Resume</span>
                </a>
            </li>
          </ul>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <Hero id="home" darkMode={darkMode} />
        <About id="about" darkMode={darkMode} />
        <Projects id="projects" darkMode={darkMode} />
        <Certifications id="certifications" darkMode={darkMode} />
        <Contact id="contact" darkMode={darkMode} />
      </main>

      <footer className={`${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-800 text-gray-300'} py-8 text-center transition-colors duration-300`}>
        <p>&copy; {new Date().getFullYear()} Praneta Binani. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-6">
            <a href="https://www.linkedin.com/in/praneta-binani/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors duration-300"><Icon name="Linkedin" size={28} /></a>
            <a href="https://github.com/pranetabinani" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300"><Icon name="Github" size={28} /></a>
            <a href="mailto:pranetabinani@gmail.com" className="text-gray-400 hover:text-red-400 transition-colors duration-300"><Icon name="Mail" size={28} /></a>
            <a href="tel:+917595919071" className="text-gray-400 hover:text-blue-400 transition-colors duration-300"><Icon name="Phone" size={28} /></a>
        </div>
      </footer>
    </div>
  );
};

// Motion-enhanced Section Wrapper
const MotionSection = ({ children, id }) => {
    const [ref, inView] = useScrollReveal();
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };
    return (
        <motion.section
            id={id}
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="mb-24"
        >
            {children}
        </motion.section>
    );
};

// Hero Section
const Hero = ({ id, darkMode }) => {
    const roles = ["Frontend Developer", "Cybersecurity Enthusiast", "Backend Developer", "Coding Instructor"];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 100;
    const deletingSpeed = 50;
  
    useEffect(() => {
      const handleTyping = () => {
        const fullText = roles[currentRoleIndex];
        if (isDeleting) {
          setDisplayedText(fullText.substring(0, displayedText.length - 1));
          if (displayedText === '') {
            setIsDeleting(false);
            setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
          }
        } else {
          setDisplayedText(fullText.substring(0, displayedText.length + 1));
          if (displayedText === fullText) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        }
      };
  
      const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
      return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentRoleIndex, roles]);
  
    return (
      <section id={id} className="min-h-[calc(100vh-6rem)] flex items-center justify-center text-center py-16">
        <div className="max-w-4xl mx-auto">
          <motion.img 
              src="src\assets\mypic.jpg" 
              alt="Praneta Binani" 
              className="w-80 h-80 md:w-76 md:h-76 rounded-full mx-auto mb-8 shadow-2xl border-4 border-green-500 object-cover"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
          />
          <motion.h1 
              className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hello, I'm <span className={`${darkMode ? 'text-green-400' : 'text-green-700'}`}>Praneta Binani</span>
          </motion.h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-xl md:text-2xl mb-8`}>
            I am a <span className={`${darkMode ? 'text-green-300' : 'text-green-600'} font-semibold border-b-2 border-green-500`}>{displayedText}</span><span className="animate-pulse">|</span>
          </p>
          <motion.div 
              className="flex justify-center flex-wrap gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href="https://www.linkedin.com/in/praneta-binani/" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2">
              <Icon name="Linkedin" size={20} /> <span>LinkedIn</span>
            </a>
            <a href="https://github.com/pranetabinani" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2">
              <Icon name="Github" size={20} /> <span>GitHub</span>
            </a>
            <a href="https://example.com/resume.pdf" target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2">
              <Icon name="FileText" size={20} /> <span>My Resume</span>
            </a>
          </motion.div>
        </div>
      </section>
    );
  };

// About Me Section with Skill Grid
const About = ({ id, darkMode }) => {
    const skillsData = [
        { name: 'React', icon: 'ReactIcon', color: '#61DAFB' },
        { name: 'Node.js', icon: 'NodejsIcon', color: '#68A063' },
        { name: 'Python', icon: 'PythonIcon', color: '#3776AB' },
        { name: 'Java', icon: 'JavaIcon', color: '#007396' },
        { name: 'HTML', icon: 'HtmlIcon', color: '#E34F26' },
        { name: 'CSS', icon: 'CssIcon', color: '#1572B6' },
        { name: 'Bootstrap', icon: 'BootstrapIcon', color: '#7952B3' },
        { name: 'JavaScript', icon: 'Code', color: '#F7DF1E' },
        { name: 'GitHub', icon: 'Github', color: '#181717' },
        { name: 'Postman', icon: 'PostmanIcon', color: '#FF6C37' },
        { name: 'VS Code', icon: 'VsCodeIcon', color: '#007ACC' },
      ];

  return (
    <MotionSection id={id}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 md:p-12`}>
        <h2 className={`${darkMode ? 'text-green-400' : 'text-gray-800'} text-4xl font-bold mb-8 text-center`}>About Me</h2>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed mb-4`}>
              I am Praneta Binani, a dedicated B.Tech. student in Cyber Security with a strong passion for developing robust and secure software solutions. My journey in tech has equipped me with a solid foundation in full-stack development, from crafting intuitive user interfaces with React to building scalable back-end systems with Node.js.
            </p>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed`}>
              I thrive on solving complex problems and am constantly exploring new technologies to enhance my skills. My goal is to contribute to innovative projects that make a real impact.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <h3 className={`${darkMode ? 'text-green-400' : 'text-gray-800'} text-2xl font-semibold mb-6 text-center lg:text-left`}>My Skills</h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {skillsData.map((skill, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center p-4 bg-gray-700/50 rounded-lg transition-transform duration-300 hover:scale-110 w-28 h-28"
                    >
                        <Icon name={skill.icon} size={48} color={skill.color} />
                        <span className="text-gray-300 text-sm text-center font-medium mt-2">{skill.name}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
};


// Projects Section
const Projects = ({ id, darkMode }) => {
  const projectsData = [
    {
      title: "Samvidhanopedia",
      tech: "HTML, CSS, JSON, Node.js",
      description: "A legal information platform simplifying Indian laws through AI-driven explanations and keyword-based search.",
      githubLink: "https://github.com/pranetabinani/samvidhanopedia",
      liveLink: "https://samvidhanopedia.onrender.com/",
      image: "https://placehold.co/600x400/10B981/1F2937?text=Samvidhanopedia",
    },
    {
      title: "Hospital Management System",
      tech: "React, Node.js, MongoDB",
      description: "A full-stack web application to manage hospital operations including appointments, bed tracking, and inventory.",
      githubLink: "https://github.com/pranetabinani/hospital-management",
      liveLink: null,
      image: "https://placehold.co/600x400/34D399/1F2937?text=Hospital+Mgmt",
    },
    {
      title: "Dino Game Clone",
      tech: "JavaScript, HTML5, CSS3",
      description: "A browser-based clone of the Chrome offline dinosaur game with enhanced UI and score tracking.",
      githubLink: "https://github.com/pranetabinani/dino-game",
      liveLink: "https://pranetabinani.github.io/dino-game/",
      image: "https://placehold.co/600x400/6EE7B7/1F2937?text=Dino+Game",
    },
  ];

  return (
    <MotionSection id={id}>
        <h2 className={`${darkMode ? 'text-green-400' : 'text-gray-800'} text-4xl font-bold mb-12 text-center`}>My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
            <motion.div 
                key={index} 
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group relative`}
                whileHover={{ y: -10 }}
            >
                <img src={project.image} alt={project.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-green-300 text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{project.tech}</p>
                    <p className="text-gray-200 text-base mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-3">
                        {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 flex items-center space-x-2"><Icon name="Github" size={16} /><span>GitHub</span></a>}
                        {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 flex items-center space-x-2"><Icon name="ExternalLink" size={16} /><span>Live Demo</span></a>}
                    </div>
                </div>
                <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} group-hover:opacity-0 transition-opacity duration-300`}>
                    <h3 className={`${darkMode ? 'text-green-400' : 'text-gray-800'} text-2xl font-semibold`}>{project.title}</h3>
                </div>
            </motion.div>
            ))}
        </div>
    </MotionSection>
  );
};

// Certifications Section
const Certifications = ({ id, darkMode }) => {
  const certificationsData = [
    { name: "Certified in Cyber Security (CC)", issuer: "ISC2", date: "Feb '25 - Aug '25", link: "https://www.isc2.org/Certifications/CC" },
    { name: "Google Cyber Security Professional", issuer: "Google", date: "Jan '25 - Ongoing", link: "https://www.coursera.org/professional-certificates/google-cybersecurity" },
    { name: "Front-End with React", issuer: "IBM", date: "Jul '24 - Sept '24", link: "https://www.coursera.org/professional-certificates/ibm-front-end-developer" },
    { name: "Web Development (HTML, CSS, JS)", issuer: "University of Michigan", date: "Nov '23 - Feb '24", link: "https://www.coursera.org/specializations/web-design" },
  ];

  return (
    <MotionSection id={id}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 md:p-12`}>
        <h2 className={`${darkMode ? 'text-green-400' : 'text-gray-800'} text-4xl font-bold mb-12 text-center`}>Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificationsData.map((cert, index) => (
            <motion.a 
                key={index} 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-green-50'} p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 block group`}
                whileHover={{ scale: 1.05 }}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className={`${darkMode ? 'text-green-300 group-hover:text-white' : 'text-gray-800'} text-xl font-semibold mb-1`}>{cert.name}</h3>
                        <p className={`${darkMode ? 'text-green-500' : 'text-green-600'} font-medium mb-1`}>{cert.issuer}</p>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{cert.date}</p>
                    </div>
                    <Icon name="ExternalLink" size={24} className="text-gray-500 group-hover:text-green-400 transition-colors duration-300" />
                </div>
            </motion.a>
            ))}
        </div>
      </div>
    </MotionSection>
  );
};

// Contact Section
const Contact = ({ id, darkMode }) => {
  return (
    <MotionSection id={id}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 md:p-12 text-center`}>
        <h2 className={`${darkMode ? 'text-green-400' : 'text-gray-800'} text-4xl font-bold mb-8`}>Get In Touch</h2>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-lg mb-8 max-w-2xl mx-auto`}>
          I'm always excited to connect with new people and explore opportunities. Whether you have a question, a project idea, or just want to say hi, feel free to reach out!
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a href="mailto:pranetabinani@gmail.com" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2">
            <Icon name="Mail" size={20} />
            <span>Email Me</span>
          </a>
          <a href="https://www.linkedin.com/in/praneta-binani/" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2">
            <Icon name="Linkedin" size={20} />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </div>
    </MotionSection>
  );
};

export default App;  
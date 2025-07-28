import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, FileText, Send, Menu, X, ChevronsRight, Globe, MapPin, Sun, Moon } from 'lucide-react';

// --- Main App Component ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      let currentSection = 'home';
      for (const section in sectionRefs) {
        if (sectionRefs[section].current && sectionRefs[section].current.offsetTop <= scrollPosition + 100) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);

  const scrollToSection = (section) => {
    sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-[#1a0c2e] via-[#3a1d56] to-[#5e3a7d] text-gray-100 font-sans relative overflow-x-hidden">
      {/* Background Pink Moon and Clouds */}
      <div className="absolute top-0 right-0 w-1/2 h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-60 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-20 -right-20 w-[30rem] h-[30rem] bg-[#ff69b4] rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-0 right-0 mr-4 mt-20">
             <Moon size={200} className="text-pink-200 opacity-40 animate-slow-spin" />
        </div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1a0c2e]/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" onClick={() => scrollToSection('home')} className="text-3xl font-bold text-white tracking-wider">PranetaB</a>
          <nav className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => scrollToSection(item)} className={`capitalize text-lg font-medium transition-colors duration-300 ${activeSection === item ? 'text-pink-400' : 'text-gray-200 hover:text-pink-300'}`}>{item}</a>
            ))}
             <a href="/Praneta_Resume'25.pdf" target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center space-x-2">
                <FileText size={18} />
                <span>Resume</span>
            </a>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-[#1a0c2e]/95 backdrop-blur-md absolute top-full left-0 w-full flex flex-col items-center space-y-6 py-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => scrollToSection(item)} className={`capitalize text-2xl font-medium transition-colors duration-300 ${activeSection === item ? 'text-pink-400' : 'text-gray-200 hover:text-pink-300'}`}>{item}</a>
            ))}
            <a href="/Praneta_Resume'25.pdf" target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center space-x-2">
                <FileText size={20} />
                <span>Resume</span>
            </a>
          </nav>
        )}
      </header>

      <main className="relative z-10">
        <section id="home" ref={sectionRefs.home}><HeroSection /></section>
        <section id="about" ref={sectionRefs.about}><AboutSection /></section>
        <section id="skills" ref={sectionRefs.skills}><SkillsSection /></section>
        <ExperienceBanner />
        <section id="projects" ref={sectionRefs.projects}><ProjectsSection /></section>
        <section id="contact" ref={sectionRefs.contact}><ContactSection /></section>
      </main>

      <Footer />
    </div>
  );
}

// --- Hero Section ---
const HeroSection = () => {
    const roles = ["Web Developer", "Cybersecurity Enthusiast", "Coding Instructor", "Backend Developer", "Data Scientist"];
    const [currentRole, setCurrentRole] = useState(roles[0]);
    const [displayedRole, setDisplayedRole] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleTyping = () => {
            const fullRole = roles[roleIndex];
            if (isDeleting) {
                setDisplayedRole(fullRole.substring(0, displayedRole.length - 1));
            } else {
                setDisplayedRole(fullRole.substring(0, displayedRole.length + 1));
            }

            if (!isDeleting && displayedRole === fullRole) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayedRole === "") {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            }
        };

        const typingTimeout = setTimeout(handleTyping, isDeleting ? 100 : 150);
        return () => clearTimeout(typingTimeout);
    }, [displayedRole, isDeleting, roleIndex, roles]);

    return (
        <div className="min-h-screen flex items-center container mx-auto px-6">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full">
                <div className="md:w-3/5 text-center md:text-left mt-10 md:mt-0 z-10">
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                        Namaste World!
                    </h1>
                    <h2 className="text-3xl md:text-5xl font-light text-gray-300 mt-4">
                        I am Praneta Binani
                    </h2>
                    <p className="text-2xl md:text-3xl text-pink-400 mt-6 h-12">
                        a <span className="font-semibold border-b-4 border-pink-500">{displayedRole}</span><span className="animate-pulse">|</span>
                    </p>
                    <p className="text-gray-400 mt-8 max-w-xl mx-auto md:mx-0">
                        A passionate and creative developer with a knack for building beautiful, functional, and secure web applications.
                    </p>
                    <div className="mt-12 flex justify-center md:justify-start space-x-6">
                        <a href="https://github.com/Praneta" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110">
                            <Github size={40} />
                        </a>
                        <a href="https://www.linkedin.com/in/praneta-binani-509657286/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110">
                            <Linkedin size={40} />
                        </a>
                    </div>
                </div>
                 <div className="md:w-2/5 flex justify-center z-10">
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-1 shadow-2xl">
                       <img src="src\assets\myimg.jpeg" alt="Praneta Binani" className="w-full h-full rounded-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- About Section ---
const AboutSection = () => {
  return (
    <div className="py-24 container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">About Me</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-16">
        <div className="md:w-1/3 relative">
          <div className="w-full h-auto animate-float">
            <img src="src\assets\lofi-studygirl.png" alt="Lofi Study Girl" className="rounded-2xl shadow-2xl shadow-pink-900/40" />
          </div>
        </div>
        <div className="md:w-1/2 text-lg text-gray-300 space-y-6">
            <p>
                I'm a B.Tech student at Techno Main Salt Lake, specializing in Computer Science with a focus on Cyber Security. My passion lies at the intersection of creating robust backend systems and securing them from vulnerabilities.
            </p>
            <p>
                With a strong foundation in languages like Java, Python, and JavaScript, and experience with frameworks like React and Node.js, I enjoy bringing ideas to life through code. I've built full-stack applications, from a legal information platform to a hospital management system.
            </p>
             <p>
                As a proactive learner and problem-solver, I've earned certifications in cybersecurity and web development, and I'm a proud Reliance Foundation Scholar. I'm always eager to take on new challenges and contribute to innovative projects.
            </p>
        </div>
      </div>
    </div>
  );
};


// --- Skills Section ---
const SkillsSection = () => {
    const skills = [
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
        { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    ];

    const [time, setTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const kolkataTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            setTime(kolkataTime);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="py-24 bg-black bg-opacity-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Tech Stack</h2>
                <p className="text-gray-400 mb-16 max-w-2xl mx-auto">I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable applications.</p>
                <div className="relative w-full h-96 flex items-center justify-center">
                    {skills.map((skill, index) => {
                        const angle = -90 + (index * (180 / (skills.length -1)));
                        const radians = angle * (Math.PI / 180);
                        const x = 50 + 40 * Math.cos(radians);
                        const y = 50 + 40 * Math.sin(radians);
                        return (
                            <div
                                key={skill.name}
                                className="absolute group transition-transform duration-500 ease-out animate-skill-entry"
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    transform: `translate(-50%, -50%)`,
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#2a1444] rounded-full flex items-center justify-center transform group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-pink-900/30">
                                    <img src={skill.icon} alt={skill.name} className="w-8 h-8 md:w-10 md:h-10" />
                                </div>
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{skill.name}</span>
                            </div>
                        );
                    })}
                     <div className="absolute flex flex-col items-center justify-center">
                        <div className="flex items-center space-x-2 text-xl text-white">
                            <MapPin size={20} className="text-pink-400" />
                            <span>Kolkata, India</span>
                        </div>
                        <div className="text-2xl font-mono mt-2 text-gray-300 tracking-widest">{time}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Experience Banner ---
const ExperienceBanner = () => {
    const logos = [
        { name: 'Google Developer Students Club', logo: 'https://avatars.githubusercontent.com/u/33232863?s=200&v=4' },
        { name: 'Techno Main Salt Lake', logo: 'https://tmsl.in/wp-content/uploads/2023/12/tmsl-logo-1.png' },
        { name: 'AICTE', logo: 'https://www.aicte-india.org/sites/default/files/logo_new.png' },
        { name: 'ISC2', logo: 'https://www.isc2.org/-/media/ISC2/Logos/isc2-logo-3.svg' },
        { name: 'IBM', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ibm/ibm-original.svg' },
        { name: 'University of Michigan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/U-M_Logo-Hex.svg/1200px-U-M_Logo-Hex.svg.png' },
    ];

    return (
        <div className="py-12 bg-black bg-opacity-30 overflow-hidden">
            <div className="relative w-full h-24">
                <div className="absolute top-0 left-0 flex animate-scroll">
                    {[...logos, ...logos].map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-64 h-24 flex items-center justify-center mx-4">
                            <img src={item.logo} alt={item.name} className="max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Projects Section ---
const ProjectsSection = () => {
  const projects = [
    {
      title: 'Samvidhanopedia',
      description: 'A legal information platform simplifying Indian laws through AI-driven explanations and keyword-based search.',
      image: 'https://images.unsplash.com/photo-1505664194779-8be2240422fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tags: ['HTML', 'CSS', 'Node.js', 'JSON', 'AI'],
      github: 'https://github.com/Pranetaa/Samvidhanopedia',
      live: 'https://samvidhanopedia.onrender.com/',
      details: 'This project features a structured custom legal database with over 200 Constitutional Articles and 150+ Acts in JSON. It integrates the OpenRouter API with tailored prompt engineering for AI-powered explanations and is fully deployed on Render.'
    },
    {
      title: 'Hospital Management System',
      description: 'A full-stack web application to manage hospital operations, including appointment booking and real-time tracking.',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tags: ['React', 'Node.js', 'Full-Stack'],
      github: 'https://github.com/Pranetaa/Hospital-Management',
      live: null,
      details: 'Designed to streamline hospital operations, this application includes features for doctor appointment booking, real-time bed tracking, and inventory control through a comprehensive admin dashboard. It demonstrates full-stack development capabilities.'
    },
    {
      title: 'Dino Game',
      description: 'A browser-based clone of the Chrome offline dinosaur runner game with an enhanced user interface.',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tags: ['JavaScript', 'HTML', 'Game Dev'],
      github: 'https://github.com/Pranetaa/Dino-Game',
      live: 'https://pranetaa.github.io/Dino-Game/',
      details: 'This fun project is a recreation of the classic Chrome Dino game. It features core game mechanics like jumping, collision detection, and score tracking, all built with vanilla JavaScript. It showcases an understanding of game loops and browser-based interactivity.'
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="py-24 container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">My Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#2a1444] rounded-xl overflow-hidden shadow-2xl shadow-pink-900/20 group transform hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="relative h-56 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => <span key={tag} className="bg-pink-900/50 text-pink-200 text-xs px-2 py-1 rounded-full">{tag}</span>)}
              </div>
              <p className="text-gray-400 mb-6 h-16">{project.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors duration-300"><Github size={24} /></a>
                    {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors duration-300"><ChevronsRight size={24} /></a>}
                </div>
                <button onClick={() => setSelectedProject(project)} className="text-pink-400 hover:text-pink-300 font-semibold">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
};

// --- Project Modal ---
const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        const handleEsc = (event) => {
           if (event.keyCode === 27) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-gradient-to-br from-[#2a1444] to-[#1a0c2e] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={28} /></button>
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-lg mb-6" />
                <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => <span key={tag} className="bg-pink-900/50 text-pink-200 text-xs px-2 py-1 rounded-full">{tag}</span>)}
                </div>
                <p className="text-gray-300 text-lg mb-6">{project.details}</p>
                <div className="flex space-x-6">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                        <Github size={20} />
                        <span>GitHub</span>
                    </a>
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                            <ChevronsRight size={20} />
                            <span>Live Demo</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- Contact Section ---
const ContactSection = () => {
  return (
    <div className="py-24 bg-black bg-opacity-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Get In Touch</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          I'm currently open to new opportunities and collaborations. Feel free to send me a message!
        </p>
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <form className="space-y-6">
              <input type="text" placeholder="Your Name" className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
              <input type="email" placeholder="Your Email" className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
              <textarea placeholder="Your Message" rows="5" className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"></textarea>
              <button type="submit" className="w-full bg-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
             <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Globe size={250} className="text-pink-400/30 animate-slow-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 md:w-64 md:h-64 border-2 border-dashed border-pink-400/50 rounded-full animate-spin-slow"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Footer ---
const Footer = () => {
    return (
        <footer className="bg-[#1a0c2e] py-12">
            <div className="container mx-auto px-6 text-center text-gray-400">
                <p className="text-2xl font-bold text-white mb-4">Praneta Binani</p>
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://github.com/Pranetaa" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors"><Github size={28} /></a>
                    <a href="https://www.linkedin.com/in/praneta-binani-509657286/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors"><Linkedin size={28} /></a>
                    <a href="mailto:pranetabinani@gmail.com" className="hover:text-pink-400 transition-colors"><Mail size={28} /></a>
                    <a href="tel:+917595919071" className="hover:text-pink-400 transition-colors"><Phone size={28} /></a>
                    <a href="/Praneta_Resume'25.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors"><FileText size={28} /></a>
                </div>
                <p>&copy; {new Date().getFullYear()} Praneta Binani. All rights reserved.</p>
            </div>
        </footer>
    );
};

// Add custom animations to your tailwind.config.js or a style tag
const style = document.createElement('style');
style.innerHTML = `
@keyframes animate-blob {
  0% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.2) translateY(-20px); }
  100% { transform: scale(1) translateY(0); }
}
.animate-blob {
  animation: animate-blob 8s infinite ease-in-out;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes animate-float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
.animate-float {
  animation: animate-float 6s ease-in-out infinite;
}

@keyframes animate-skill-entry {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}
.animate-skill-entry {
    animation-name: animate-skill-entry;
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
    animation-fill-mode: forwards;
}

@keyframes animate-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}
.animate-scroll {
    animation: animate-scroll 40s linear infinite;
}

@keyframes animate-fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
    animation: animate-fade-in 0.3s ease-out forwards;
}

@keyframes animate-slow-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
.animate-slow-spin {
    animation: animate-slow-spin 60s linear infinite;
}
.animate-spin-slow {
    animation: spin 20s linear infinite;
}
`;
document.head.appendChild(style);


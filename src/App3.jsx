import React, { useState, useEffect, useRef } from 'react'; 
import technoLogo from './assets/techno.png'; // adjust path if needed
import samarthLogo from './assets/samarth.png';
import dino from './assets/dino.png';
import samvidhanopedia from './assets/samvidhanopedia.png';
import hospital from './assets/hospital.png';
import { Github, Linkedin, Mail, Phone, FileText, Send, Menu, X, ChevronsRight, MapPin, Instagram, Mouse } from 'lucide-react';
const ExternalLinkIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

 

//--- Custom Icons ---
 const WhatsAppIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    className={className}
  >
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
  </svg>
);

//--Loader --//
 const MoonLoader = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-[#1a0c2e] via-[#3a1d56] to-[#5e3a7d] z-[100] flex items-center justify-center">
    <div className="relative w-24 h-24 animate-bounce-slow">
      {/* Moon fill area */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full bg-white animate-fill-up brightness-[0.9]"></div>
      </div>
      {/* Crescent shadow (moon cut) */}
      <div className="absolute top-0 right-[-6px] w-[90%] h-[90%] rounded-full bg-gradient-to-br from-[#1a0c2e] via-[#3a1d56] to-[#5e3a7d]"></div>
    </div>
  </div>
);


// --- Main App Component ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
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
    // Load three.js script
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    document.body.appendChild(script);

    const timer = setTimeout(() => setIsLoading(false), 2500);

    return () => {
        clearTimeout(timer);
        if (document.body.contains(script)) {
            document.body.removeChild(script);
        }
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      let currentSection = 'home';
      for (const section in sectionRefs) {
        if (sectionRefs[section].current && sectionRefs[section].current.offsetTop <= scrollPosition + 150) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const scrollToSection = (section) => {
    if (sectionRefs[section] && sectionRefs[section].current) {
        sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  if (isLoading) {
    return <MoonLoader />;
  }

  return (
    <div className="bg-gradient-to-br from-[#1a0c2e] via-[#3a1d56] to-[#5e3a7d] text-gray-100 font-sans relative overflow-x-hidden animate-fade-in-main">
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1a0c2e]/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" onClick={() => scrollToSection('home')} className="text-3xl font-bold text-white tracking-wider">PranetaB</a>
          <nav className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => scrollToSection(item)} className={`capitalize text-2xl font-medium transition-colors duration-300 ${activeSection === item ? 'text-pink-400' : 'text-gray-200 hover:text-pink-300'}`}>{item}</a>
            ))}
             <a href="https://drive.google.com/file/d/19lMvSXJnZAVN8VoA1OYqxSIqGVfMGfN6/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center space-x-2">
                <FileText size={18} />
                <span>Resume</span>
            </a>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none z-50">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>
      
      <nav className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#1a0c2e]/95 backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col items-center justify-center`}>
        <div className="flex flex-col items-center space-y-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => scrollToSection(item)} className={`capitalize text-3xl font-medium transition-colors duration-300 ${activeSection === item ? 'text-pink-400' : 'text-gray-200 hover:text-pink-300'}`}>{item}</a>
            ))}
            <a href="https://drive.google.com/file/d/19lMvSXJnZAVN8VoA1OYqxSIqGVfMGfN6/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="mt-4 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center space-x-2">
                <FileText size={20} />
                <span>Resume</span>
            </a>
        </div>
      </nav>

      <main className="relative z-10">
        <section id="home" ref={sectionRefs.home}><HeroSection onScrollClick={() => scrollToSection('about')} /></section>
        <ExperienceBanner />
        <section id="about" ref={sectionRefs.about}><AboutSection /></section>
        <section id="skills" ref={sectionRefs.skills}><SkillsSection /></section>
        <section id="projects" ref={sectionRefs.projects}><ProjectsSection /></section>
        <section id="contact" ref={sectionRefs.contact}><ContactSection /></section>
      </main>
      <Footer />
    </div>
  );
}

// --- Scroll Down Indicator ---
const ScrollDownIndicator = ({onClick}) => {
    return (
        <button onClick={onClick} className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-20" aria-label="Scroll to next section">
            <div className="w-8 h-14 border-2 border-gray-300 rounded-full flex justify-center items-start p-1">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-scroll-wheel"></div>
            </div>
        </button>
    )
}

// --- Hero Section ---
const HeroSection = ({ onScrollClick }) => {
    const roles = ["Web Developer", "Cybersecurity Enthusiast", "Coding Instructor", "Software Engineer"];
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
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Image for Hero Section */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('https://wallpapers.com/images/hd/pink-moon-2000-x-1000-oynqtqjj5u9xqgfg.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="min-h-screen flex items-center container mx-auto px-6 relative z-10">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full">
                      <div className="md:w-2/5 flex justify-center">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-pink-500/50 to-purple-600/50 p-1 shadow-2xl backdrop-blur-sm">
                           <img src="src\assets\myimg.jpeg" alt="Praneta Binani" className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                    <div className="md:w-3/5 text-center md:text-left mt-10 md:mt-0">
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                            Namaste World!
                        </h1>
                        <h2 className="text-3xl md:text-5xl font-light text-gray-300 mt-4">
                            I am Praneta Binani
                        </h2>
                        <p className="text-2xl md:text-3xl text-white-400 mt-6 h-12">
                            a <span className="font-semibold border-b-4 border-pink-500">{displayedRole}</span><span className="animate-pulse">|</span>
                        </p>
                        <p className="text-gray-400 mt-8 max-w-xl mx-auto md:mx-0">
                            A passionate and creative developer with a knack for building beautiful, functional and secure web applications.
                        </p>
                        <div className="mt-12 flex justify-center md:justify-start space-x-6">
                            <a href="https://github.com/PranetaBinani" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110">
                                <Github size={40} />
                            </a>
                            <a href="https://www.linkedin.com/in/praneta-binani-045b2a277/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110">
                                <Linkedin size={40} />
                            </a>
                        </div>
                    </div>
                    
                </div>
            </div>
             <ScrollDownIndicator onClick={onScrollClick} />
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
        <div className="md:w-1/2 text-2xl text-gray-300 space-y-6 animate-fade-in">
  <p>
  I’m a <span className="font-semibold text-pink-400">B.Tech student</span> majoring in 
  <span className="font-semibold text-pink-400">Computer Science with a Cyber Security focus</span>, driven by the passion to become a future 
  <span className="font-semibold text-pink-400">SDE</span>.
</p>

<p>
  I love <span className="font-semibold text-pink-400">building new things</span>whether it’s a game or a full-fledged web app
  always with a touch of creativity and a strong eye for detail. My technical stack includes 
  <span className="font-semibold text-pink-400">Java , Python , React and Node.js</span>.
</p>

<p>
  Alongside coding, I thrive in <span className="font-semibold text-pink-400">team leadership</span>, <span className="font-semibold text-pink-400">research work</span>,
  and exploring new technologies quickly and efficiently. From legal platforms to hospital systems, every project I build solves real-world problems.
</p>

<p>
  Off-screen, I enjoy <span className="italic">music</span>, <span className="italic">reading books</span>, and reflecting on how tech can make life better. 
  I’m here to learn, lead, and create with purpose.
</p>


        </div>
      </div>
    </div>
  );
};

// --- TagCloud Component ---
// const CircularSkillCloud = () => {
//     const skills = [
//         { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
//         { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
//         { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
//         { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
//         { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
//         { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
//         { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
//         { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
//         { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg' },
//         { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
//         { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
//         { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
//         { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
//         { name: 'Postman', icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
//         { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' }
//     ];
    
//     const [radius, setRadius] = useState(140);

//     useEffect(() => {
//         const updateRadius = () => {
//             setRadius(window.innerWidth < 768 ? 120 : 160);
//         };
//         updateRadius();
//         window.addEventListener('resize', updateRadius);
//         return () => window.removeEventListener('resize', updateRadius);
//     }, []);

//     return (
//         <div className="relative flex items-center justify-center w-full min-h-[450px] md:min-h-[500px]">
//             <div className="relative w-full h-full animate-spin-slow" style={{ width: `${radius * 2 + 80}px`, height: `${radius * 2 + 80}px` }}>
//                 {skills.map((skill, index) => {
//                     const angle = (index / skills.length) * 360;
//                     return (
//                         <div
//                             key={skill.name}
//                             className="absolute top-1/2 left-1/2 w-20 h-20 -m-10 md:w-24 md:h-24 md:-m-12"
//                             style={{
//                                 transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`
//                             }}
//                         >
//                             <div className="group w-full h-full flex items-center justify-center bg-white/10 rounded-full transition-all duration-300 hover:bg-pink-500/20 hover:scale-110 shadow-lg backdrop-blur-sm">
//                                 <img src={skill.icon} alt={skill.name} className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:scale-125" />
//                                 <span className="absolute opacity-0 group-hover:opacity-100 mt-28 text-white text-sm font-semibold bg-gray-900/50 px-2 py-1 rounded-md transition-all duration-300 whitespace-nowrap">
//                                     {skill.name}
//                                 </span>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//             <div className="absolute flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-black/30 rounded-full border-2 border-pink-500/50 shadow-2xl">
//                 <span className="text-white text-3xl font-bold tracking-widest">Tech</span>
//             </div>
//         </div>
//     );
// };this is like loader and  nice
const SkillSphere = () => {
    const mountRef = useRef(null);
    const skills = [
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg', 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
    ];

    useEffect(() => {
        if (!window.THREE) return;

        const mount = mountRef.current;
        const scene = new window.THREE.Scene();
        const camera = new window.THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        const renderer = new window.THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        const group = new window.THREE.Group();
        const textureLoader = new window.THREE.TextureLoader();
        const sphereRadius = 3.5;

        // Use Fibonacci sphere algorithm to distribute points evenly on a sphere
        const samples = skills.length;
        const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
        for (let i = 0; i < samples; i++) {
            const y = 1 - (i / (samples - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;
            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;
            
            const texture = textureLoader.load(skills[i]);
            const material = new window.THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.9 });
            const sprite = new window.THREE.Sprite(material);
            sprite.position.set(x, y, z).multiplyScalar(sphereRadius);
            sprite.scale.set(0.8, 0.8, 0.8); // Adjust icon size
            group.add(sprite);
        }
        scene.add(group);

        const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        const pointLight = new window.THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(5, 10, 5);
        scene.add(pointLight);

        camera.position.z = 6.5;

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        const onMouseDown = (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        };
        const onMouseUp = () => isDragging = false;
        const onMouseMove = (e) => {
            if (!isDragging) return;
            const deltaMove = { x: e.clientX - previousMousePosition.x, y: e.clientY - previousMousePosition.y };
            group.rotation.y += deltaMove.x * 0.005;
            group.rotation.x += deltaMove.y * 0.005;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        };

        mount.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);
            if (!isDragging) {
                group.rotation.y += 0.005;
            }
            renderer.render(scene, camera);
        };
        animate();
        
        const handleResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            mount.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
            if(mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full min-h-[300px] md:min-h-[400px] cursor-grab active:cursor-grabbing"></div>;
};

// --- Skills Section --
const SkillsSection = () => {
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

    const cardStyle = "bg-zinc-900/50 border border-pink-400 rounded-2xl p-8 backdrop-blur-sm flex flex-col";

    return (
        <div className="py-24 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-4 text-white">Focusing on the Best</h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-xl">
                        As a rapid learner, I continuously expand my toolkit. Here are the core technologies I use to build robust, scalable, and detail-oriented applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 min-h-[40rem]">
                    <div className={`${cardStyle} lg:col-span-2 lg:row-span-2 justify-between`}>
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-2">Multiple Tech Stack</h3>
                            <p className="text-gray-400 text-2xl">I thrive on learning and working with multiple technologies and frameworks to build scalable and efficient applications.</p>
                        </div>
                        <div className="flex-grow flex items-center justify-center -mt-8"><SkillSphere /></div>
                    </div>

                    <div className={`${cardStyle} justify-center`}>
                        <h3 className="text-2xl font-semibold text-white mb-4">Dev & Design</h3>
                        <div className="flex items-center justify-around space-x-4 my-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database text-fuchsia-400"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                            <div className="w-full h-px bg-neutral-600"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-server text-fuchsia-400"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
                            <div className="w-full h-px bg-neutral-600"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pen-tool text-fuchsia-400"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
                        </div>
                        <p className="text-gray-400 text-2xl mt-2 ">Excelling in development and design to create seamless, intuitive, and beautiful user experiences.</p>
                    </div>

                    <div className={`${cardStyle} justify-center items-center text-center `}>
                        <h3 className="text-2xl font-semibold text-white mb-4">Open to Collaborations</h3>
                        <div className="flex items-center space-x-3 text-xl text-white ">
                           <MapPin size={22} className="text-fuchsia-400" />
                            <span>Kolkata, India</span>
                        </div>
                        <div className="text-5xl font-mono my-3 text-gray-200 tracking-wider">{time || '...'}</div>
                        <p className="text-gray-400 mt-2 max-w-xs text-xl">My passion for building and leading teams makes me a strong collaborator for your next big project.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Experience Banner ---
const ExperienceBanner = () => {
    const logos = [
        { name: 'Google Developer Students Club', logo: 'https://students.engineering.asu.edu/wp-content/uploads/2023/06/GDSC-Crop.png' },
        { name: 'Techno Main Salt Lake', logo:technoLogo },
        { name: 'ISC2', logo: 'https://images.credly.com/images/9180921d-4a13-429e-9357-6f9706a554f0/image.png' },
        { name: 'Samarth', logo:samarthLogo},
        {name:'GeeksForGeeks',logo:'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgebvTMxgPxceu4oOUW8qZX1JXz1Wq8JP7ZRrNt_A0WMR6bXGOMJneJXxgCMo8IQ4b1mHE3WsVVWTiSnCP5sCQoQ_lGfZ7-kdJswcpXyE7dL34pYZ3RfG2daPZ6g6yokT9e6-98NNZrbA7e6spS_poUlyfZDLBYLljqz5qzz_6qvlUdgrGI37-_nPJr/s1280/1280px-GeeksforGeeks.svg.png'},
        { name: 'Google Cloud', logo: 'https://logos-world.net/wp-content/uploads/2021/02/Google-Cloud-Emblem.png' },
          {name:'AICTE',logo:'https://vectorseek.com/wp-content/uploads/2023/09/AICTE-Logo-Vector.svg-.png'},
           {name:'Reliance Foundation',logo:'https://www.machli.reliancefoundation.org/assets/img/rflogo.png'},
           {name:'LeetCode',logo:'https://leetcode.com/static/images/LeetCode_logo.png'}
    ];

     return (
  <div className="py-4 bg-gradient-to-br from-violet-100 via-pink-200 to-violet-300 backdrop-blur-sm overflow-hidden">
    <div className="relative w-full h-14 sm:h-12">
      <div className="absolute top-0 left-0 bottom-0 flex animate-scroll">
        {[...logos, ...logos].map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 h-full flex items-center justify-center mx-2 sm:mx-1"
          >
            <img
              src={item.logo}
              alt={item.name}
              className="h-12 sm:h-10 w-auto object-contain transition-all duration-300 hover:grayscale"
            />
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
      title: 'Hospital Management System',
      description: 'A full-stack web application to manage hospital operations, including appointment booking and real-time tracking.',
      image:hospital,
      tags: ['React', 'Node.js', 'Full-Stack'],
      github: 'https://github.com/PranetaBinani/Hospital-Management-System-backend',
      live:null,
      details: 'Designed to streamline hospital operations, this application includes features for doctor appointment booking, real-time bed tracking, and inventory control through a comprehensive admin dashboard. It demonstrates full-stack development capabilities.'
    },
    {
      title: 'Samvidhanopedia',
      description: 'A legal information platform simplifying Indian laws through AI-driven explanations and keyword-based search.',
      image: samvidhanopedia,
      tags: ['HTML', 'CSS', 'Node.js', 'JSON', 'AI'],
      github: 'https://github.com/PranetaBinani/samvidhanopedia-backend',
      live: 'https://samvidhanopedia.onrender.com/',
      details: 'This project features a structured custom legal database with over 200 Constitutional Articles and 150+ Acts in JSON. It integrates the OpenRouter API with tailored prompt engineering for AI-powered explanations and is fully deployed on Render.The Live link might take some time to load!'
    },
   
    {
      title: 'Dino Game',
      description: 'A browser-based clone of the Chrome offline dinosaur runner game with an enhanced user interface.',
      image:dino,
      tags: ['JavaScript', 'HTML', 'Game Dev'],
      github: 'https://github.com/PranetaBinani/DinoGame',
      live: 'https://pranetabinani.github.io/DinoGame/',
      details: 'This fun project is a recreation of the classic Chrome Dino game. It features core game mechanics like jumping, collision detection, and score tracking, all built with vanilla JavaScript. It showcases an understanding of game loops and browser-based interactivity.'
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="py-24 container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">My Projects</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#2a1444]/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl shadow-pink-900/20 group transform hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-pink-900/50 text-pink-200 text-md px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 mb-6">
                {project.description.length > 50
                  ? `${project.description.slice(0, 50)}...`
                  : project.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
                  >
                    <Github size={24} />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
                    >
                      <ExternalLinkIcon size={24} />
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-pink-400 hover:text-pink-300 font-semibold text-lg"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
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
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-gradient-to-br from-[#2a1444] to-[#1a0c2e] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={28} /></button>
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-lg mb-6" />
                <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4 text-xl">
                    {project.tags.map(tag => <span key={tag} className="bg-pink-900/50 text-pink-200 text-xs px-2 py-1 rounded-full">{tag}</span>)}
                </div>
                <p className="text-gray-300 text-xl mb-6">{project.details}</p>
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
    <div className="py-24 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Get In Touch</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          I'm currently open to new opportunities. Feel free to send me a message!
        </p>
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <form 
  action="https://formsubmit.co/e8da1588305b20a9b483bc51c006ddad" 
  method="POST"
  className="space-y-6"
>
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <img
                src="https://static.vecteezy.com/system/resources/previews/023/405/215/original/3d-happy-earth-character-png.png"
                alt="Floating Earth"
                className="animate-float-earth w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//service_ipvf3v5
// --- Footer ---
const Footer = () => {
    return (
        <footer className="bg-[#10061c] py-12 relative z-10">
            <div className="container mx-auto px-6 text-center text-gray-400">
                <p className="text-2xl font-bold text-white mb-4">Praneta Binani</p>
                <div className="flex justify-center space-x-6 mb-6">
  <a href="https://github.com/PranetaBinani" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors"><Github size={28} /></a>
  <a href="https://www.linkedin.com/in/praneta-binani-045b2a277/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors"><Linkedin size={28} /></a>
  <a href="https://instagram.com/iampranetab?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors"><Instagram size={28} /></a>
  <a href="https://wa.me/917595919071" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors"><WhatsAppIcon /></a>
  <a href="https://leetcode.com/u/PranetaB/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
    <img
      src="https://leetcode.com/static/images/LeetCode_logo.png"
      alt="LeetCode"
      className="w-7 h-7 object-contain grayscale hover:grayscale-0 transition" // 28px like other icons
    />
  </a>
  <a href="mailto:pranetabinani@gmail.com" className="hover:text-pink-400 transition-colors"><Mail size={28} /></a>
  <a href="https://drive.google.com/drive/folders/1MI7MlflIjRJvNyGdcUX6BmYSXoMC7c_7?usp=drive_link" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors"><FileText size={28} /></a>
</div>

                <p>&copy; {new Date().getFullYear()} Praneta Binani. All rights reserved.</p>
            </div>
        </footer>
    );
};

// Add custom animations to your tailwind.config.js or a style tag
const style = document.createElement('style');
style.innerHTML = `
.tagcloud--item {
  padding: 8px;
  background-color: rgba(255, 105, 180, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.tagcloud--item:hover {
  background-color: rgba(255, 105, 180, 0.3);
}

.tag-icon {
    width: 50px;
    height: 50px;
    filter: drop-shadow(0 0 5px rgba(255, 105, 180, 0.5));
}

@keyframes floatUpDown {
  0% { transform: translateY(0) scale(1); }
  25% { transform: translateY(-12px) scale(1.015); }
  50% { transform: translateY(0) scale(1); }
  75% { transform: translateY(12px) scale(1.015); }
  100% { transform: translateY(0) scale(1); }
}

.animate-float {
  animation: floatUpDown 2s ease-in-out infinite;
  transition: transform 0.4s ease-in-out, filter 0.4s ease-in-out;
  display: inline-block;
  will-change: transform, filter;
  filter: brightness(1.15) drop-shadow(0 0 10px rgba(255, 192, 203, 0.5));
}


.animate-float:hover {
  transform: scale(1.2) rotate(10deg) translateY(-10px);
  filter: brightness(1.2) saturate(1.2)
          drop-shadow(0 0 25px rgba(255, 192, 203, 0.7))
          drop-shadow(0 0 50px rgba(255, 182, 193, 0.4));
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

@keyframes animate-scroll-wheel {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(20px);
        opacity: 0;
    }
}
.animate-scroll-wheel {
    animation: animate-scroll-wheel 2s infinite;
}
      @keyframes animate-float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0px); }
            }
            .animate-float {
              animation: animate-float 6s ease-in-out infinite;
            }

            @keyframes animate-float-earth {
              0% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-25px) rotate(180deg); }
              100% { transform: translateY(0px) rotate(360deg); }
            }
            .animate-float-earth {
              animation: animate-float-earth 15s linear infinite;
              filter: drop-shadow(0 0 30px rgba(236, 72, 153, 0.5));
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

            @keyframes animate-scroll-wheel {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(20px); opacity: 0; }
            }
            .animate-scroll-wheel {
                animation: animate-scroll-wheel 2s infinite;
            }
            
            @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
                animation: spin-slow 40s linear infinite;
            }
          @keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 2.5s ease-in-out infinite;
}

@keyframes fill-up {
  0% {
    height: 0%;
    opacity: 0.3;
    filter: brightness(0.6);
  }
  100% {
    height: 100%;
    opacity: 1;
    filter: brightness(1);
  }
}
.animate-fill-up {
  animation: fill-up 3s ease-in-out infinite;
  transition: height 3s ease-in-out;
  height: 100%;
}



`;
document.head.appendChild(style);


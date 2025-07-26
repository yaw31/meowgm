import { useState, useEffect } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Team roster data
const teamMembers = [
  {
    id: 1,
    tag: "HAM7",
    name: "Top",
    role: "Top",
    champion: "Darius",
    championImage: "https://media.nownews.com/nn_media/thumbnail/2024/06/1718209088745-2672083094ba4393ac7e803c1becacef-800x655.webp?unShow=false&waterMark=false",
    quote: "Hammmmm",
    color: "#a259ff"
  },
  {
    id: 2,
    tag: "Neong",
    name: "Jungle",
    role: "Jungle",
    champion: "Lee Sin",
    championImage: "https://scontent.fkul3-5.fna.fbcdn.net/v/t1.6435-9/69499620_2441366236144539_207586854726270976_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeESlTGh9EnJwRxSP8m2CUXYwh_Ch6hlqV7CH8KHqGWpXuWX_ex-p_fI3YIYw3fyMukS6UuiFMb-BgG652A2IBch&_nc_ohc=zGy0LjJfr2kQ7kNvwFKjICI&_nc_oc=AdkiyCmdugJ8uQfgX0S2w0oeYAoHTKQctM5o5zLp_wEJ6biQgh0yHZRCQziAHsLh1fM12xH0tvb4zkT_4Q4Nput2&_nc_zt=23&_nc_ht=scontent.fkul3-5.fna&_nc_gid=OZVVYMJMsZpYVHHrmbjINg&oh=00_AfTS_08Wk3ACA21vN2AQ776GDamAPLGdMiJpoiBvaSvHvg&oe=68ABC91C",
    quote: "I have 80K USD",
    color: "#14ffe9"
  },
  {
    id: 3,
    tag: "Sleep",
    name: "Mid",
    role: "Mid",
    champion: "Yasuo",
    championImage: "https://scontent.fkul3-3.fna.fbcdn.net/v/t39.30808-6/464907963_8753054668106501_1685545895925895588_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFCNSSl_kFLuT0q5Ch-bCHOikdOMR8XOAaKR04xHxc4BkFxUf0tOPdOJsqGehdC7K-on0nN8k9qeSAhIB2EvLWQ&_nc_ohc=Iqfi7H6huhEQ7kNvwHwTytD&_nc_oc=AdmxghGcw7tV6xkjAcpNfSEfkr3WXOPVSlmnRMwOSWmzlftOE7QfdXHiyxPs8xR6U25Bz6zlAfW_toaETugmydeC&_nc_zt=23&_nc_ht=scontent.fkul3-3.fna&_nc_gid=SxfNqYX5ECr5vkeJOdYI7Q&oh=00_AfT421tAQvYrT-9iOR43meAGqczJC1HSezsCJzaPzqbA1Q&oe=688A3FB7",
    quote: "Roger fans",
    color: "#ff6b6b"
  },
  {
    id: 4,
    tag: "Meow",
    name: "ADC",
    role: "ADC",
    champion: "Jinx",
    championImage: "https://s.yimg.com/ny/api/res/1.2/QPGl8S3zFBJx3Yaig8IDXw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ2OA--/https://s.yimg.com/os/creatr-uploaded-images/2023-03/08740240-ca23-11ed-b8fe-8486d07069f5",
    quote: "AAAAAAAAAAAAAA",
    color: "#4ecdc4"
  },
  {
    id: 5,
    tag: "ZYY",
    name: "Support",
    role: "Support",
    champion: "Thresh",
    championImage: "https://p2.bahamut.com.tw/S/2KU/87/e0a2ef2792ad939a2aff46732f1sk7v5.JPG",
    quote: "Doraemon",
    color: "#45b7d1"
  },
  {
    id: 6,
    tag: "Madkinggg",
    name: "Substitute",
    role: "Sub",
    champion: "Pig Man",
    championImage: "https://pbs.twimg.com/profile_images/1579147820472233986/yFVNTQnd_400x400.jpg",
    quote: "Pig man",
    color: "#ffa500"
  }
];

export default function Home() {
  const [cursorTrail, setCursorTrail] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Page load effect
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Cursor trail effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      setCursorTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        if (newTrail.length > 10) {
          return newTrail.slice(-10);
        }
        return newTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const target = document.querySelector('#team-section');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail(prev => prev.filter(point => Date.now() - point.id < 1000));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen bg-[#0a0f24] text-white overflow-x-hidden`}>
      {/* Cursor trail effect */}
      {cursorTrail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            left: point.x,
            top: point.y,
            opacity: 1 - (index * 0.1),
            transform: `scale(${1 - (index * 0.1)})`
          }}
        />
      ))}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f24] via-[#1a1a2e] to-[#16213e]"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#a259ff] rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-[#14ffe9] rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-[#a259ff] rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className={`relative z-10 text-center px-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 flex justify-center">
            <Image 
              src="/meow-gaming-logo.png" 
              alt="Meow Gaming Logo" 
              width={300} 
              height={150} 
              className="hover-glow transition-all duration-300 hover:scale-105"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#a259ff] via-[#14ffe9] to-[#a259ff] bg-clip-text text-transparent hover-glow">
            MEOW GAMING
          </h1>
          
          <p className="text-xl md:text-2xl text-[#e0e0e0] mb-8 font-light">
            Fierce Like a Cat. Smart Like a Team.
          </p>
          
          <p className="text-lg md:text-xl text-[#a259ff] mb-12 font-mono">
            Meow Gaming is Back – Titan Cup Contenders
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => document.getElementById('team-section').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-[#a259ff] to-[#14ffe9] text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 hover-glow flex items-center gap-2"
            >
              <Image src="https://cdn-icons-png.flaticon.com/512/12/12638.png" alt="Paw" width={20} height={20} />
              Meet the Team
            </button>
            <button className="px-8 py-4 border-2 border-[#a259ff] text-[#a259ff] font-bold rounded-lg hover:bg-[#a259ff] hover:text-white transition-all duration-300 flex items-center gap-2">
              <Image src="https://cdn-icons-png.flaticon.com/512/8002/8002111.png" alt="Controller" width={20} height={20} />
              Watch Us Play
            </button>
            <button className="px-8 py-4 border-2 border-[#14ffe9] text-[#14ffe9] font-bold rounded-lg hover:bg-[#14ffe9] hover:text-[#0a0f24] transition-all duration-300 flex items-center gap-2">
              <Image src="https://cdn-icons-png.flaticon.com/512/12/12638.png" alt="Paw" width={20} height={20} />
              Join the Pride
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#a259ff] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#a259ff] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Media & Highlights Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-[#0a0f24] to-[#1a1a2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Image 
                src="/meow-gaming-logo.png" 
                alt="Meow Gaming Logo" 
                width={100} 
                height={50} 
                className="opacity-60"
              />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#a259ff] to-[#14ffe9] bg-clip-text text-transparent">
              HIGHLIGHTS & MEDIA
            </h2>
            <p className="text-[#e0e0e0] mt-4 text-lg">
              Our Best Plays, Memes, and Fan Art
            </p>
          </div>

          {/* Featured Highlight */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#a259ff] mb-6 text-center">
              🏆 Our Best Play
            </h3>
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#a259ff]/20 overflow-hidden hover-glow">
                <iframe
                  src="https://www.youtube.com/embed/7WsSjxAMx8s"
                  title="Meow Gaming Best Play"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Meme Section */}
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl p-6 border border-[#a259ff]/20 hover:border-[#a259ff] transition-all duration-300 hover:scale-105">
              <h4 className="text-xl font-bold text-[#14ffe9] mb-4 flex items-center gap-2">
                <span>😂</span> Team Memes
              </h4>
              <p className="text-[#e0e0e0] mb-4">
                Our favorite gaming moments and inside jokes
              </p>
              <div className="bg-[#0a0f24] rounded-lg p-4 border border-[#a259ff]/10">
                <p className="text-[#a0a0a0] text-sm italic">
                  "When the jungler ganks but you're already 0/5"
                </p>
              </div>
            </div>

            {/* Fan Art Section */}
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl p-6 border border-[#a259ff]/20 hover:border-[#a259ff] transition-all duration-300 hover:scale-105">
              <h4 className="text-xl font-bold text-[#14ffe9] mb-4 flex items-center gap-2">
                <span>🎨</span> Fan Art
              </h4>
              <p className="text-[#e0e0e0] mb-4">
                Amazing artwork from our community
              </p>
              <div className="bg-[#0a0f24] rounded-lg p-4 border border-[#a259ff]/10">
                <p className="text-[#a0a0a0] text-sm italic">
                  Submit your artwork to be featured here!
                </p>
              </div>
            </div>

            {/* Tournament Highlights */}
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl p-6 border border-[#a259ff]/20 hover:border-[#a259ff] transition-all duration-300 hover:scale-105">
              <h4 className="text-xl font-bold text-[#14ffe9] mb-4 flex items-center gap-2">
                <span>🏆</span> Tournament Clips
              </h4>
              <p className="text-[#e0e0e0] mb-4">
                Epic moments from competitive matches
              </p>
              <div className="bg-[#0a0f24] rounded-lg p-4 border border-[#a259ff]/10">
                <p className="text-[#a0a0a0] text-sm italic">
                  More highlights coming soon...
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-[#a259ff] to-[#14ffe9] text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 hover-glow flex items-center gap-2 mx-auto">
              <Image src="https://cdn-icons-png.flaticon.com/512/12/12638.png" alt="Paw" width={20} height={20} />
              Submit Your Content
            </button>
          </div>
        </div>
      </section>

      {/* Team Roster Section */}
      <section id="team-section" className="py-20 px-8 bg-gradient-to-b from-[#0a0f24] to-[#1a1a2e]">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-4">
              <Image 
                src="/meow-gaming-logo.png" 
                alt="Meow Gaming Logo" 
                width={100} 
                height={50} 
                className="opacity-60"
              />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#a259ff] to-[#14ffe9] bg-clip-text text-transparent">
              THE PRIDE
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`group relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl p-6 border border-[#a259ff]/20 hover:border-[#a259ff] transition-all duration-500 hover:scale-105 hover-glow ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                {/* Role indicator */}
                <div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-[#0a0f24] border border-[#a259ff] rounded-full text-xs font-bold"
                  style={{ color: member.color }}
                >
                  {member.role}
                </div>

                {/* Player info */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 text-[#a259ff] group-hover:text-[#14ffe9] transition-colors duration-300">
                    {member.tag}
                  </h3>
                  <p className="text-[#e0e0e0] mb-3">{member.name}</p>
                  
                  {/* Champion image */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[#a259ff]/30 hover:border-[#a259ff] transition-all duration-300">
                    <Image 
                      src={member.championImage} 
                      alt={member.champion}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <p className="text-sm text-[#a0a0a0] font-mono italic">
                    "{member.quote}"
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#a259ff]/10 to-[#14ffe9]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Team stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#a259ff]/20">
              <h3 className="text-3xl font-bold text-[#a259ff] mb-2">99.9%</h3>
              <p className="text-[#e0e0e0]">Win Rate</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#14ffe9]/20">
              <h3 className="text-3xl font-bold text-[#14ffe9] mb-2">∞</h3>
              <p className="text-[#e0e0e0]">Victories</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#a259ff]/20">
              <h3 className="text-3xl font-bold text-[#a259ff] mb-2">100</h3>
              <p className="text-[#e0e0e0]">Number of titles</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#ffa500]/20">
              <h3 className="text-3xl font-bold text-[#ffa500] mb-2">999</h3>
              <p className="text-[#e0e0e0]">Team Ranking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 bg-[#0a0f24] border-t border-[#a259ff]/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Image 
              src="/meow-gaming-logo.png" 
              alt="Meow Gaming Logo" 
              width={150} 
              height={75} 
              className="opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <p className="text-[#a0a0a0] mb-4">
            © 2024 Meow Gaming. All rights reserved.
          </p>
          <div className="flex justify-center">
            <a 
              href="https://www.facebook.com/meowproteam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#a259ff] hover:text-[#14ffe9] transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#a259ff]/10"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

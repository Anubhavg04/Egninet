import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CodeBracketIcon, 
  PaintBrushIcon, 
  CubeTransparentIcon, 
  CommandLineIcon, 
  CpuChipIcon, 
  BeakerIcon, 
  WrenchScrewdriverIcon, 
  SwatchIcon,
  SparklesIcon
} from '@heroicons/react/24/solid';
import { PencilIcon as PenTool } from '@heroicons/react/24/outline';

const EngiNetLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 8H12C9.79086 8 8 9.79086 8 12V20C8 22.2091 9.79086 24 12 24H22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 16H18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <circle cx="24" cy="8" r="4" fill="currentColor" />
    <circle cx="21" cy="16" r="4" fill="currentColor" />
    <circle cx="24" cy="24" r="4" fill="currentColor" />
  </svg>
);

const Landing = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-teal-500 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-[#0D9488]/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
            <EngiNetLogo className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Righteous', system-ui, cursive" }}>EngiNet</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-white font-semibold text-[15px]">
            <a href="#features" className="hover:text-teal-200 transition-colors">Features</a>
            <a href="#focus" className="hover:text-teal-200 transition-colors">Focus Mode</a>
            <a href="#safety" className="hover:text-teal-200 transition-colors">Safety</a>
            <a href="#support" className="hover:text-teal-200 transition-colors">Support</a>
          </div>

          <div className="flex items-center">
            <Link 
              to="/auth" 
              className="bg-white text-teal-800 hover:bg-teal-50 hover:text-teal-900 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm hover:shadow-md"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-[#0D9488] overflow-hidden flex flex-col items-center justify-center text-center px-4">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 opacity-30 mix-blend-color-burn">
           <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-400 blur-3xl animate-pulse"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <CodeBracketIcon className="absolute top-[15%] left-[8%] w-16 h-16 text-white rotate-12 animate-pulse" />
          <PaintBrushIcon className="absolute top-[20%] right-[12%] w-20 h-20 text-white -rotate-12 animate-bounce" style={{ animationDuration: '3s' }} />
          <CubeTransparentIcon className="absolute bottom-[25%] left-[10%] w-24 h-24 text-white rotate-45 opacity-60" />
          <CommandLineIcon className="absolute bottom-[15%] right-[20%] w-16 h-16 text-white -rotate-6 animate-pulse" style={{ animationDuration: '4s' }} />
          <CpuChipIcon className="absolute top-[45%] left-[2%] w-12 h-12 text-white rotate-90" />
          <BeakerIcon className="absolute top-[10%] right-[30%] w-14 h-14 text-white rotate-12 opacity-70" />
          <WrenchScrewdriverIcon className="absolute bottom-[40%] right-[5%] w-20 h-20 text-white -rotate-45" />
          <SwatchIcon className="absolute top-[60%] left-[25%] w-16 h-16 text-white rotate-12 animate-bounce" style={{ animationDuration: '5s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto transform transition-transform hover:scale-[1.01] duration-500">
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter mb-8 drop-shadow-xl" style={{ fontFamily: "'Righteous', system-ui, cursive" }}>
            IMAGINE A WORKSPACE...
          </h1>
          <p className="text-xl md:text-2xl text-teal-50 max-w-3xl mx-auto leading-relaxed mb-12 font-medium drop-shadow-md">
            ...where you can belong to a developer club, a study group, or just a private community to ship your ideas. Where it's easy to talk every day and hang out more often.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/auth" 
              className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-50 transition-all w-full sm:w-auto flex items-center justify-center gap-3 animate-pulse-glow hover:scale-105"
            >
              Open EngiNet in your browser
              <SparklesIcon className="w-5 h-5 text-teal-500" />
            </Link>
          </div>
        </div>
        
        {/* Wavy bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.32,201.2,111.45,242.09,105.74,282.8,92.21,321.39,56.44Z" className="fill-[#eef1f5]"></path>
          </svg>
        </div>
      </section>

      {/* NEW: Stats & Trust Section */}
      <section className="bg-canvas py-16 px-6 relative -mt-10 z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-white rounded-3xl p-8 shadow-xl shadow-teal-900/5 border border-gray-100 flex flex-col items-center text-center animate-float" style={{ animationDelay: '0s' }}>
             <h3 className="text-4xl font-black gradient-text mb-2">10M+</h3>
             <p className="text-gray-500 font-semibold uppercase tracking-widest text-sm">Lines Shipped</p>
           </div>
           <div className="bg-white rounded-3xl p-8 shadow-xl shadow-teal-900/5 border border-gray-100 flex flex-col items-center text-center animate-float" style={{ animationDelay: '1s' }}>
             <h3 className="text-4xl font-black gradient-text mb-2">50k+</h3>
             <p className="text-gray-500 font-semibold uppercase tracking-widest text-sm">Communities</p>
           </div>
           <div className="bg-white rounded-3xl p-8 shadow-xl shadow-teal-900/5 border border-gray-100 flex flex-col items-center text-center animate-float" style={{ animationDelay: '2s' }}>
             <h3 className="text-4xl font-black gradient-text mb-2">Zero</h3>
             <p className="text-gray-500 font-semibold uppercase tracking-widest text-sm">Distractions</p>
           </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-32">
        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 group">
          <div className="flex-1 w-full aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 transition-transform duration-700 group-hover:-rotate-2 group-hover:scale-105">
            <img src="/wallpapers/illustration_cyber_market_1783749875141.png" alt="EngiNet Feature" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 transition-all duration-700 group-hover:translate-x-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Create an invite-only place where you belong
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              EngiNet servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24 group">
          <div className="flex-1 w-full aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 transition-transform duration-700 group-hover:rotate-2 group-hover:scale-105">
             <img src="/wallpapers/designer_abstract_dark_1783750027689.png" alt="EngiNet Hangout" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 transition-all duration-700 group-hover:-translate-x-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Where hanging out is easy
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Grab a seat in a community. Friends in your server can see you're around and instantly pop in to talk without having to call.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 3 - Whiteboard Showcase */}
      <section id="whiteboard" className="relative py-32 md:py-48 mt-12 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/wallpapers/cinematic_scifi_city_1783749487100.png" alt="Collaborative Environment" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
           <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8" style={{ fontFamily: "'Righteous', system-ui, cursive" }}>
              COLLABORATE IN REAL-TIME
           </h2>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
              Visualize your ideas together. Jump into the built-in collaborative whiteboard during any chat to instantly sketch architecture diagrams, UI flows, or just brainstorm with your team.
           </p>
           
           <div className="glass-card rounded-3xl p-4 max-w-4xl mx-auto transform hover:rotate-1 hover:scale-105 transition-all duration-700">
             <div className="aspect-[21/9] bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl relative">
               {/* Mock Toolbar */}
               <div className="absolute top-4 left-4 right-4 h-12 bg-gray-100 rounded-xl border border-gray-200 flex items-center px-4 gap-4 shadow-sm z-10">
                 <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center"><PenTool className="w-5 h-5" /></div>
                 <div className="w-8 h-8 rounded-lg hover:bg-gray-200 text-gray-500 flex items-center justify-center"><CubeTransparentIcon className="w-5 h-5" /></div>
                 <div className="w-8 h-8 rounded-lg hover:bg-gray-200 text-gray-500 flex items-center justify-center"><span className="font-serif font-bold">T</span></div>
               </div>
               
               {/* Mock Whiteboard Canvas */}
               <div className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] relative overflow-hidden">
                 {/* Drawn shapes */}
                 <div className="absolute top-1/3 left-1/4 w-32 h-20 border-2 border-teal-500 bg-teal-50 rounded-lg flex items-center justify-center text-teal-800 font-semibold shadow-sm transform -rotate-2">
                   Client
                 </div>
                 <svg className="absolute top-1/3 left-[calc(25%+8rem)] w-32 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                 </svg>
                 <div className="absolute top-1/3 right-1/4 w-32 h-20 border-2 border-indigo-500 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-800 font-semibold shadow-sm transform rotate-1">
                   Server
                 </div>

                 {/* Floating Chat bubbles */}
                 <div className="absolute right-8 bottom-8 flex flex-col gap-3 animate-float z-20">
                   <div className="bg-teal-600 text-white text-sm px-4 py-2 rounded-2xl rounded-br-sm shadow-lg max-w-xs">
                     I just sketched out the auth flow on the board! ✍️
                   </div>
                   <div className="bg-gray-800 text-gray-200 text-sm px-4 py-2 rounded-2xl rounded-bl-sm shadow-lg max-w-xs self-start -ml-12">
                     Looks perfect. Let's build it.
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* NEW: Final Call to Action */}
      <section className="py-24 px-6 mesh-bg text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
         <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <EngiNetLogo className="w-20 h-20 text-teal-400 mb-6 animate-float" />
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 drop-shadow-md">
              Ready to <span className="text-teal-400">start</span> your best work?
            </h2>
            <Link 
              to="/auth" 
              className="px-10 py-5 bg-teal-500 text-white rounded-full font-bold text-xl hover:bg-teal-400 transition-all shadow-lg hover:shadow-teal-500/50 hover:scale-110 active:scale-95"
            >
              Join EngiNet Today
            </Link>
         </div>
      </section>

      {/* Footer - Simplified */}
      <footer className="bg-gray-900 pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-3 text-white mb-8 hover:scale-110 transition-transform">
             <EngiNetLogo className="w-10 h-10 text-teal-500" />
             <span className="font-black text-3xl tracking-tight" style={{ fontFamily: "'Righteous', system-ui, cursive" }}>EngiNet</span>
          </div>
          <p className="text-gray-500 mb-8 max-w-md text-center">
            A private, distraction-free space for engineers, designers, and product people to share ideas and ship faster.
          </p>
          <div className="w-full border-t border-gray-800 pt-8 flex items-center justify-center">
            <p className="text-gray-600 text-sm">© {new Date().getFullYear()} EngiNet. Built for builders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

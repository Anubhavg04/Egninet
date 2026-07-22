import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CommandLineIcon,
  CpuChipIcon,
  SparklesIcon,
  PlayIcon,
  ArrowRightIcon,
  UsersIcon,
  BoltIcon,
  ShieldCheckIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/solid';
import { EyeSlashIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────
type Theme = 'dark' | 'light';

// ─── Theme color maps ─────────────────────────────────────────────────────
// These mirror the CSS variables but are accessible inline for components
// that can't easily use CSS vars (e.g. dynamic SVGs, canvas-like elements).
const THEME = {
  dark: {
    base: '#060B14',
    surface1: '#0B1220',
    surface2: '#0D1525',
    surface3: '#111C2E',
    border: 'rgba(255,255,255,0.07)',
    borderSoft: 'rgba(255,255,255,0.04)',
    text1: '#F0F4F8',
    text2: '#9AA5B4',
    text3: '#526070',
    navBg: 'rgba(6,11,20,0.92)',
    footerBg: '#030508',
    gridLine: 'rgba(20,184,166,0.03)',
    heroVignette: 'radial-gradient(ellipse 80% 60% at 50% 100%, transparent 40%, #060B14 100%)',
    heroFade: 'linear-gradient(to bottom, transparent, #060B14)',
    cardShadow: '0 4px 24px rgba(0,0,0,0.4)',
    inputBorder: 'rgba(255,255,255,0.1)',
    statsBg: '#0B1220',
    statsBorder: 'rgba(255,255,255,0.06)',
    // Chat bubbles in whiteboard mock
    bubbleMine: '#14B8A6',
    bubbleMineText: '#060B14',
    bubbleTheirs: '#1A2233',
    bubbleTheirsText: '#9AA5B4',
  },
  light: {
    base: '#F5F7FA',
    surface1: '#FFFFFF',
    surface2: '#EEF1F7',
    surface3: '#E4E8F0',
    border: 'rgba(15,23,42,0.07)',
    borderSoft: 'rgba(15,23,42,0.04)',
    text1: '#0F172A',
    text2: '#475569',
    text3: '#94A3B8',
    navBg: 'rgba(245,247,250,0.92)',
    footerBg: '#EEF1F7',
    gridLine: 'rgba(20,184,166,0.06)',
    heroVignette: 'radial-gradient(ellipse 80% 60% at 50% 100%, transparent 40%, #F5F7FA 100%)',
    heroFade: 'linear-gradient(to bottom, transparent, #F5F7FA)',
    cardShadow: '0 2px 16px rgba(15,23,42,0.07)',
    inputBorder: 'rgba(15,23,42,0.12)',
    statsBg: '#FFFFFF',
    statsBorder: 'rgba(15,23,42,0.07)',
    // Chat bubbles
    bubbleMine: '#14B8A6',
    bubbleMineText: '#FFFFFF',
    bubbleTheirs: '#E4E8F0',
    bubbleTheirsText: '#475569',
  },
};

// ─── Logo ─────────────────────────────────────────────────────────────────
const Logo = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 8H12C9.79086 8 8 9.79086 8 12V20C8 22.2091 9.79086 24 12 24H22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 16H18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <circle cx="24" cy="8" r="4" fill="currentColor" />
    <circle cx="21" cy="16" r="4" fill="currentColor" />
    <circle cx="24" cy="24" r="4" fill="currentColor" />
  </svg>
);

// ─── Theme Toggle ─────────────────────────────────────────────────────────
const ThemeToggle = ({ theme, onToggle }: { theme: Theme; onToggle: () => void }) => (
  <div className="theme-toggle">
    <button
      className={`theme-toggle-btn ${theme === 'light' ? 'active' : ''}`}
      onClick={() => theme === 'dark' && onToggle()}
      title="Light mode"
    >
      <SunIcon className="w-4 h-4" />
    </button>
    <button
      className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}
      onClick={() => theme === 'light' && onToggle()}
      title="Dark mode"
    >
      <MoonIcon className="w-4 h-4" />
    </button>
  </div>
);

// ─── Code demo data ───────────────────────────────────────────────────────
type Token = { text: string; cls: string };
type CodeLang = { id: string; label: string; dotColor: string; lines: Token[][]; output: string; outputLabel: string };

const CODE_LANGS: CodeLang[] = [
  {
    id: 'js', label: 'JavaScript', dotColor: '#F7DF1E',
    lines: [
      [{ text: '// Fibonacci — recursive', cls: 'token-comment' }],
      [{ text: 'function ', cls: 'token-keyword' }, { text: 'fibonacci', cls: 'token-function' }, { text: '(n) {', cls: 'token-plain' }],
      [{ text: '  if ', cls: 'token-keyword' }, { text: '(n <= ', cls: 'token-plain' }, { text: '1', cls: 'token-number' }, { text: ') return n;', cls: 'token-plain' }],
      [{ text: '  return ', cls: 'token-keyword' }, { text: 'fibonacci', cls: 'token-function' }, { text: '(n-', cls: 'token-plain' }, { text: '1', cls: 'token-number' }, { text: ') + ', cls: 'token-plain' }, { text: 'fibonacci', cls: 'token-function' }, { text: '(n-', cls: 'token-plain' }, { text: '2', cls: 'token-number' }, { text: ');', cls: 'token-plain' }],
      [{ text: '}', cls: 'token-plain' }],
      [],
      [{ text: 'console', cls: 'token-function' }, { text: '.log(', cls: 'token-plain' }, { text: 'fibonacci(', cls: 'token-function' }, { text: '10', cls: 'token-number' }, { text: '));', cls: 'token-plain' }],
    ],
    output: '55', outputLabel: 'fibonacci(10)',
  },
  {
    id: 'py', label: 'Python', dotColor: '#3572A5',
    lines: [
      [{ text: '# Factorial — recursive', cls: 'token-comment' }],
      [{ text: 'def ', cls: 'token-keyword' }, { text: 'factorial', cls: 'token-function' }, { text: '(n):', cls: 'token-plain' }],
      [{ text: '    if ', cls: 'token-keyword' }, { text: 'n == ', cls: 'token-plain' }, { text: '0', cls: 'token-number' }, { text: ': return ', cls: 'token-keyword' }, { text: '1', cls: 'token-number' }],
      [{ text: '    return ', cls: 'token-keyword' }, { text: 'n * ', cls: 'token-plain' }, { text: 'factorial', cls: 'token-function' }, { text: '(n - ', cls: 'token-plain' }, { text: '1', cls: 'token-number' }, { text: ')', cls: 'token-plain' }],
      [],
      [{ text: 'print', cls: 'token-function' }, { text: '(', cls: 'token-plain' }, { text: 'factorial', cls: 'token-function' }, { text: '(', cls: 'token-plain' }, { text: '7', cls: 'token-number' }, { text: '))', cls: 'token-plain' }],
    ],
    output: '5040', outputLabel: 'factorial(7)',
  },
];

// ─── Code IDE Demo (always dark, code editors are dark) ───────────────────
const CodeDemo = () => {
  const [langIdx, setLangIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'typing' | 'running' | 'done'>('idle');
  const [showOutput, setShowOutput] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const lang = CODE_LANGS[langIdx];

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const runDemo = useCallback((lines: Token[][]) => {
    clearTimers();
    setVisibleLines(0);
    setPhase('typing');
    setShowOutput(false);
    lines.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === lines.length - 1) {
          const t2 = setTimeout(() => {
            setPhase('running');
            const t3 = setTimeout(() => { setPhase('done'); setShowOutput(true); }, 1000);
            timers.current.push(t3);
          }, 500);
          timers.current.push(t2);
        }
      }, i * 175 + 200);
      timers.current.push(t);
    });
  }, []);

  const switchLang = (idx: number) => {
    clearTimers();
    setLangIdx(idx);
    setVisibleLines(0);
    setPhase('idle');
    setShowOutput(false);
    setTimeout(() => runDemo(CODE_LANGS[idx].lines), 80);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el, start: 'top 68%', once: true,
      onEnter: () => {
        if (!hasStarted.current) {
          hasStarted.current = true;
          gsap.fromTo(el, { opacity: 0, y: 48 }, {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            onComplete: () => runDemo(lang.lines),
          });
        }
      },
    });
    return () => { trigger.kill(); clearTimers(); };
  }, []);

  return (
    <div ref={containerRef} className="opacity-0 w-full">
      {/* Always dark – code editors are always dark */}
      <div className="rounded-2xl overflow-hidden border shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
        style={{ background: '#0B1220', borderColor: 'rgba(255,255,255,0.08)' }}>

        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ background: '#0D1525', borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
          </div>
          <span className="flex-1 text-center text-[11px] font-mono-code" style={{ color: '#3D5166' }}>
            enginet — live code block
          </span>
          <div className="w-14" />
        </div>

        {/* Language tabs */}
        <div className="flex border-b" style={{ background: '#0D1525', borderColor: 'rgba(255,255,255,0.06)' }}>
          {CODE_LANGS.map((l, i) => (
            <button key={l.id} onClick={() => switchLang(i)}
              className={`flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold font-mono-code border-b-2 transition-all duration-200 ${
                langIdx === i ? 'border-[#14B8A6] text-[#14B8A6] bg-[#14B8A6]/5' : 'border-transparent text-[#3D5166] hover:text-[#9AA5B4]'
              }`}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: l.dotColor }} />
              {l.label}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex min-h-[196px] relative overflow-hidden">
          {phase === 'typing' && <div className="scan-line" />}
          {/* Gutter */}
          <div className="select-none px-4 pt-5 pb-4 text-right font-mono-code text-xs border-r"
            style={{ color: '#233044', minWidth: '44px', borderColor: 'rgba(255,255,255,0.05)' }}>
            {lang.lines.map((_, i) => <div key={i} className="leading-7">{i + 1}</div>)}
          </div>
          {/* Code */}
          <div className="flex-1 px-5 pt-5 pb-4 font-mono-code text-[13px]">
            {lang.lines.map((tokens, i) => (
              <div key={`${langIdx}-${i}`} className="leading-7 transition-all duration-150"
                style={{ opacity: i < visibleLines ? 1 : 0, transform: i < visibleLines ? 'none' : 'translateX(-6px)', transitionDelay: `${i * 8}ms` }}>
                {tokens.length === 0
                  ? <span>&nbsp;</span>
                  : tokens.map((tok, j) => <span key={j} className={tok.cls}>{tok.text}</span>)}
              </div>
            ))}
            {phase === 'typing' && visibleLines > 0 && (
              <span className="inline-block w-[2px] h-5 bg-[#14B8A6] cursor-blink align-middle ml-0.5" />
            )}
          </div>
        </div>

        {/* Run bar */}
        <div className="flex items-center justify-between px-4 py-3 border-t"
          style={{ background: '#0D1525', borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full transition-colors ${
              phase === 'running' ? 'bg-yellow-400 animate-pulse' : phase === 'done' ? 'bg-green-400' : 'bg-[#233044]'
            }`} />
            <span className="text-[11px] font-mono-code" style={{ color: '#3D5166' }}>
              {phase === 'typing' ? 'typing...' : phase === 'running' ? 'executing...' : phase === 'done' ? 'completed in 0.3s' : 'ready'}
            </span>
          </div>
          <button onClick={() => runDemo(lang.lines)} disabled={phase === 'running' || phase === 'typing'}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[12px] font-bold font-mono-code border transition-all duration-200 ${
              phase === 'running' || phase === 'typing'
                ? 'border-yellow-500/30 text-yellow-400/60 cursor-not-allowed'
                : 'border-[#14B8A6]/30 text-[#14B8A6] hover:bg-[#14B8A6]/10 hover:border-[#14B8A6]/50'
            }`}>
            <PlayIcon className="w-3 h-3" />
            {phase === 'running' ? 'Running...' : 'Run'}
          </button>
        </div>

        {/* Output */}
        <div style={{ maxHeight: showOutput ? '100px' : '0px', opacity: showOutput ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease' }}>
          <div className="px-5 py-4 border-t font-mono-code text-[13px]"
            style={{ background: '#070E1A', borderColor: 'rgba(20,184,166,0.12)' }}>
            <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#233044' }}>stdout</div>
            <div className="flex items-center gap-2">
              <span style={{ color: '#233044' }}>{'>'}</span>
              <span className="token-output">{lang.output}</span>
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded font-mono-code" style={{ background: 'rgba(20,184,166,0.08)', color: '#14B8A6' }}>{lang.outputLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Landing Page ─────────────────────────────────────────────────────────
const Landing = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [scrolled, setScrolled] = useState(false);
  const [ctaInput, setCtaInput] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const navigate = useNavigate();

  const t = THEME[theme];

  const heroRef    = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const stepsRef   = useRef<HTMLDivElement>(null);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleDeploy = () => {
    if (!ctaInput.trim() || isDeploying) return;
    setIsDeploying(true);
    setTimeout(() => navigate('/auth'), 1600);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.querySelectorAll('.hero-item'),
        { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.11, ease: 'power3.out', delay: 0.1 });
    }
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.querySelectorAll('.stat'),
        { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.09, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } });
    }
    if (cardsRef.current) {
      gsap.fromTo(cardsRef.current.querySelectorAll('.feat-card'),
        { opacity: 0, y: 32, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 72%' } });
    }
    if (stepsRef.current) {
      gsap.fromTo(stepsRef.current.querySelectorAll('.step-card'),
        { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.11, ease: 'power2.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 74%' } });
    }
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  // ── Shared section styles ──────────────────────────────────────────────
  const surface1Style = { background: t.surface1 };
  const surface2Style = { background: t.surface2 };

  return (
    <div className="landing" data-theme={theme} style={{ background: t.base }}>

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled ? t.navBg : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${t.border}` : '1px solid transparent',
        }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <Logo className="w-7 h-7 text-[#14B8A6]" />
            <span className="text-[18px] font-black font-display tracking-wide" style={{ color: t.text1 }}>EngiNet</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: t.text2 }}>
            {(['Features', '#features'], ['Code Execution', '#code-execution'], ['Workflow', '#workflow']).map(() => null)}
            <a href="#features" className="hover:text-[#14B8A6] transition-colors">Features</a>
            <a href="#code-execution" className="hover:text-[#14B8A6] transition-colors">Code Execution</a>
            <a href="#workflow" className="hover:text-[#14B8A6] transition-colors">Workflow</a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <Link to="/auth"
              className="px-5 py-2 rounded-lg text-sm font-bold transition-all hover:opacity-90"
              style={{ background: '#14B8A6', color: theme === 'dark' ? '#060B14' : '#FFFFFF' }}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden pt-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-orb-teal" style={{ top: '-8%', left: '50%', transform: 'translateX(-50%)' }} />
          <div className="glow-orb-indigo" style={{ bottom: '8%', right: '8%' }} />
          {/* Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${t.gridLine} 1px,transparent 1px),linear-gradient(90deg,${t.gridLine} 1px,transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
          <div className="absolute inset-0" style={{ background: t.heroVignette }} />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto">
          <div className="hero-item section-label mb-8 mx-auto w-fit">
            <BoltIcon className="w-3 h-3" /> Real-time engineering chat
          </div>
          <h1 className="hero-item font-display font-black tracking-tighter mb-6 leading-none"
            style={{ fontSize: 'clamp(2.8rem,8vw,6rem)', color: t.text1 }}>
            Where engineers<br />
            <span className="text-brand-gradient">build together.</span>
          </h1>
          <p className="hero-item text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: t.text2 }}>
            EngiNet is the chat platform built specifically for developers — with executable code blocks, real-time collaborative whiteboard, and deep work focus mode.
          </p>
          <div className="hero-item flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base transition-all hover:scale-105 hover:shadow-[0_0_28px_rgba(20,184,166,0.28)]"
              style={{ background: '#14B8A6', color: theme === 'dark' ? '#060B14' : '#FFFFFF' }}>
              Open EngiNet <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <a href="#code-execution"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base border transition-all hover:bg-[#14B8A6]/5"
              style={{ borderColor: t.border, color: t.text2 }}>
              <PlayIcon className="w-4 h-4 text-[#14B8A6]" /> See code execution
            </a>
          </div>
          <div className="hero-item mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border"
            style={{ borderColor: t.border, color: t.text3, background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)' }}>
            <ShieldCheckIcon className="w-3.5 h-3.5 text-[#14B8A6]" />
            5-second sandbox timeout · JavaScript & Python · zero install
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{ background: t.heroFade }} />
      </section>

      {/* ── Stats bar ───────────────────────────────────────────────────── */}
      <section className="stats-section py-14 px-6">
        <div ref={statsRef} className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '<5s', label: 'Execution timeout' },
            { value: '2', label: 'Languages supported' },
            { value: '∞', label: 'Collaborators per room' },
            { value: '~0ms', label: 'Output broadcast lag' },
          ].map(s => (
            <div key={s.label} className="stat text-center">
              <div className="text-3xl md:text-4xl font-black font-display text-[#14B8A6] mb-1">{s.value}</div>
              <div className="text-sm" style={{ color: t.text3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature cards ───────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6" style={{ background: t.base }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit mb-6">
              <SparklesIcon className="w-3 h-3" /> Platform features
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight mb-4" style={{ color: t.text1 }}>
              Built for <span className="text-[#14B8A6]">engineering velocity</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: t.text3 }}>
              Every feature exists to remove friction between you and your team.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: CommandLineIcon, title: 'Executable Code Blocks', desc: 'Paste a snippet in JavaScript or Python and hit Run. Everyone in the chat sees the output in real-time via Socket.IO.', accent: '#14B8A6' },
              { icon: UsersIcon, title: 'Shared Execution Output', desc: 'When anyone clicks Run, the result broadcasts to every member simultaneously — no copy-pasting logs or screenshots.', accent: '#818CF8' },
              { icon: EyeSlashIcon, title: 'Deep Work Mode', desc: "Toggle focus mode to mute the UI and signal to your team that you're heads-down. Status syncs automatically.", accent: '#F472B6' },
              { icon: PencilIcon, title: 'Collaborative Whiteboard', desc: 'Jump into a shared canvas from any chat. Sketch architecture diagrams and UI flows together in real-time.', accent: '#FB923C' },
              { icon: ShieldCheckIcon, title: 'Sandboxed Execution', desc: 'Code runs in an isolated child process with a strict 5-second timeout. Infinite loops are caught and reported.', accent: '#34D399' },
              { icon: BoltIcon, title: 'Community Channels', desc: 'Organize your team into topic-based channels. Messages auto-expire after 30 days so signal never gets buried.', accent: '#FBBF24' },
            ].map((f, i) => (
              <div key={i} className="feat-card">
                <div className="feat-card-inner" style={{ boxShadow: t.cardShadow }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${f.accent}14`, color: f.accent }}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[15px] mb-2" style={{ color: t.text1 }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: t.text3 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Code Execution section ───────────────────────────────────────── */}
      <section id="code-execution" className="py-24 px-6 relative overflow-hidden" style={surface1Style}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-orb-teal" style={{ top: '15%', right: '-18%' }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${t.gridLine} 1px,transparent 1px),linear-gradient(90deg,${t.gridLine} 1px,transparent 1px)`,
            backgroundSize: '48px 48px',
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Copy */}
            <div>
              <div className="section-label mb-6"><CommandLineIcon className="w-3 h-3" /> Code execution</div>
              <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight mb-6" style={{ color: t.text1 }}>
                Run code<br /><span className="text-[#14B8A6]">inside the chat.</span>
              </h2>
              <p className="text-lg leading-relaxed mb-10" style={{ color: t.text2 }}>
                Stop switching between your IDE, terminal, and Slack. Paste a snippet directly into the chat, hit Run, and everyone sees the output in under a second.
              </p>

              <div ref={stepsRef} className="flex flex-col gap-7">
                {[
                  { n: '01', title: 'Paste your code', desc: 'Use standard markdown code fences (``` javascript) in the message input. The block renders as an interactive executable pane for everyone.' },
                  { n: '02', title: 'Hit Run', desc: 'The code is sent to the server, executed in an isolated child process with a 5-second timeout, then the result is captured.' },
                  { n: '03', title: 'Everyone sees it', desc: 'The output broadcasts via Socket.IO to every member in the channel. No refresh, no copy-paste, just instant shared context.' },
                ].map(s => (
                  <div key={s.n} className="step-card flex gap-5 items-start">
                    <div className="step-num">{s.n}</div>
                    <div>
                      <h4 className="font-bold mb-1" style={{ color: t.text1 }}>{s.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: t.text3 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Language pills */}
              <div className="mt-10 flex flex-wrap gap-3">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border"
                  style={{ background: 'rgba(247,223,30,0.06)', borderColor: 'rgba(247,223,30,0.2)', color: '#F7DF1E' }}>
                  <span className="w-2 h-2 rounded-full bg-yellow-400" /> JavaScript
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border"
                  style={{ background: 'rgba(53,114,165,0.08)', borderColor: 'rgba(53,114,165,0.25)', color: '#5da0d0' }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: '#3572A5' }} /> Python
                </span>
              </div>
            </div>

            {/* IDE Demo – always dark */}
            <CodeDemo />
          </div>
        </div>
      </section>

      {/* ── Workflow / Whiteboard ────────────────────────────────────────── */}
      <section id="workflow" className="py-24 px-6 relative overflow-hidden" style={{ background: t.base }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-orb-indigo" style={{ bottom: '0%', left: '5%' }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Whiteboard mock */}
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border"
                style={{ background: '#0B1220', borderColor: 'rgba(255,255,255,0.08)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
                {/* Always dark – simulates the actual app */}
                <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ background: '#0D1525', borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: '#14B8A6' }}>
                      <PencilIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ color: '#3D5166' }}>
                      <CpuChipIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="ml-auto text-[11px] font-mono-code" style={{ color: '#233044' }}>collaborative-whiteboard</span>
                </div>
                <div className="aspect-[4/3] relative overflow-hidden" style={{ background: '#07101F' }}>
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }} />
                  {/* Architecture diagram */}
                  <div className="absolute top-[28%] left-[8%] px-5 py-3 rounded-xl border font-mono-code text-xs font-bold"
                    style={{ background: 'rgba(20,184,166,0.08)', borderColor: 'rgba(20,184,166,0.3)', color: '#14B8A6', transform: 'rotate(-2deg)' }}>Client</div>
                  <svg className="absolute top-[24%] left-[26%] w-20 h-12 overflow-visible" fill="none">
                    <path d="M0 24 Q40 24 76 24" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#a1)" />
                    <defs><marker id="a1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="rgba(255,255,255,0.25)" /></marker></defs>
                  </svg>
                  <div className="absolute top-[28%] left-[48%] px-5 py-3 rounded-xl border font-mono-code text-xs font-bold"
                    style={{ background: 'rgba(129,140,248,0.08)', borderColor: 'rgba(129,140,248,0.3)', color: '#818CF8', transform: 'rotate(1deg)' }}>Server</div>
                  <svg className="absolute top-[24%] left-[66%] w-20 h-12 overflow-visible" fill="none">
                    <path d="M0 24 Q40 24 76 24" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#a2)" />
                    <defs><marker id="a2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="rgba(255,255,255,0.25)" /></marker></defs>
                  </svg>
                  <div className="absolute top-[28%] right-[4%] px-5 py-3 rounded-xl border font-mono-code text-xs font-bold"
                    style={{ background: 'rgba(251,146,60,0.08)', borderColor: 'rgba(251,146,60,0.3)', color: '#FB923C', transform: 'rotate(-1deg)' }}>DB</div>
                  {/* Chat bubbles */}
                  <div className="absolute bottom-5 right-5 flex flex-col gap-2 animate-float" style={{ animationDuration: '8s' }}>
                    <div className="px-4 py-2 rounded-2xl rounded-br-sm text-xs font-medium max-w-[190px]"
                      style={{ background: '#14B8A6', color: '#060B14' }}>Auth flow sketched! ✍️</div>
                    <div className="px-4 py-2 rounded-2xl rounded-bl-sm text-xs font-medium max-w-[190px] self-start"
                      style={{ background: '#1A2233', color: '#9AA5B4' }}>Ship it 🚀</div>
                  </div>
                  {/* Cursor */}
                  <div className="absolute top-[52%] left-[36%] animate-float" style={{ animationDelay: '1.5s', animationDuration: '6s' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 1L11 5L5 7L3 11L1 1Z" fill="#14B8A6" stroke="#060B14" strokeWidth="0.5" />
                    </svg>
                    <div className="absolute -top-5 left-3 px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap" style={{ background: '#14B8A6', color: '#060B14' }}>Anubhav</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 lg:order-2">
              <div className="section-label mb-6"><PencilIcon className="w-3 h-3" /> Collaborative whiteboard</div>
              <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight mb-6" style={{ color: t.text1 }}>
                Sketch ideas<br /><span style={{ color: '#818CF8' }}>in real-time.</span>
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: t.text2 }}>
                Every chat has a built-in collaborative whiteboard. Jump in, sketch your architecture diagram or UI flow, and your teammates see every stroke as it happens — no Figma, no Miro, no tab switching.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  ['Real-time multi-user canvas via Yjs CRDTs', '#818CF8'],
                  ['Shapes, arrows, freehand drawing, and text', '#818CF8'],
                  ['Persistent per community channel', '#818CF8'],
                ].map(([item, color]) => (
                  <div key={item} className="flex items-center gap-3 text-sm" style={{ color: t.text2 }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden" style={surface1Style}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-orb-teal" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.5, width: '800px', height: '800px' }} />
        </div>

        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <div className="section-label mx-auto w-fit mb-8"><BoltIcon className="w-3 h-3" /> Get started</div>
          <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight mb-4" style={{ color: t.text1 }}>
            Ready to ship<br /><span className="text-[#14B8A6]">faster together?</span>
          </h2>
          <p className="text-lg mb-12" style={{ color: t.text3 }}>
            Create your workspace and invite your team in under 30 seconds.
          </p>

          {/* Terminal window – always dark */}
          <div className="rounded-2xl overflow-hidden border text-left shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
            style={{ background: '#0B1220', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ background: '#0D1525', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
              </div>
              <span className="ml-2 text-[11px] font-mono-code" style={{ color: '#3D5166' }}>bash — enginet-cli</span>
            </div>
            <div className="p-6 font-mono-code text-[13px] flex flex-col gap-4 min-h-[190px]">
              <div className="flex items-center gap-3">
                <span style={{ color: '#14B8A6' }}>➜</span>
                <span style={{ color: '#3D5166' }}>~</span>
                <span style={{ color: '#CDD3DE' }}>npx create-enginet-workspace@latest</span>
              </div>
              <div style={{ color: '#233044' }}>Initializing workspace...</div>
              <div className="flex items-center gap-3 flex-wrap">
                <span style={{ color: '#34D399' }}>?</span>
                <span style={{ color: '#CDD3DE' }}>Workspace name:</span>
                <div className="relative flex-1 min-w-[180px]">
                  <input type="text" placeholder="my-engineering-team"
                    value={ctaInput}
                    onChange={e => setCtaInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleDeploy()}
                    disabled={isDeploying}
                    className="w-full bg-transparent outline-none border-b py-1 transition-colors font-mono-code disabled:opacity-50"
                    style={{ color: '#14B8A6', borderColor: ctaInput ? 'rgba(20,184,166,0.5)' : 'rgba(255,255,255,0.08)' }}
                    spellCheck={false} />
                </div>
              </div>
              {isDeploying && (
                <div className="flex flex-col gap-3">
                  <div className="animate-pulse" style={{ color: '#14B8A6' }}>Creating {ctaInput}...</div>
                  <div className="w-full rounded-full overflow-hidden" style={{ background: '#111827', height: '2px' }}>
                    <div className="h-full rounded-full animate-progress" style={{ background: 'linear-gradient(90deg,#14B8A6,#818CF8)' }} />
                  </div>
                </div>
              )}
              {!isDeploying && (
                <div className="flex justify-end mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <button onClick={handleDeploy} disabled={!ctaInput.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
                    style={{ background: ctaInput.trim() ? '#14B8A6' : '#111827', color: ctaInput.trim() ? '#060B14' : '#233044', cursor: ctaInput.trim() ? 'pointer' : 'not-allowed' }}>
                    Initialize workspace <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-16 px-6 border-t" style={{ background: t.footerBg, borderColor: t.border }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-5 w-fit">
                <Logo className="w-7 h-7 text-[#14B8A6]" />
                <span className="text-[18px] font-black font-display" style={{ color: t.text1 }}>EngiNet</span>
              </Link>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: t.text3 }}>
                The modern chat platform for engineering teams. Collaborate, execute code, and ship faster — together.
              </p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Code Execution', 'Whiteboard', 'Pricing'] },
              { title: 'Developers', links: ['Docs', 'API Reference', 'GitHub', 'Changelog'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: t.text3 }}>{col.title}</h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-sm hover:text-[#14B8A6] transition-colors" style={{ color: t.text2 }}>
                        {l}{l === 'Code Execution' && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(20,184,166,0.1)', color: '#14B8A6' }}>NEW</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: t.border }}>
            <p className="text-xs" style={{ color: t.text3 }}>© {new Date().getFullYear()} EngiNet. Built for builders.</p>
            <div className="flex gap-6 text-xs" style={{ color: t.text3 }}>
              <a href="#" className="hover:text-[#14B8A6] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#14B8A6] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

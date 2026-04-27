"use client";

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [visibleSection, setVisibleSection] = useState(null);
  const cursorDotRef = useRef(null);
  const cursorGlowRef = useRef(null);

  // Custom cursor
  useEffect(() => {
    const dot = cursorDotRef.current;
    const glow = cursorGlowRef.current;
    if (!dot || !glow || window.innerWidth <= 768) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    let rafId;
    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      rafId = requestAnimationFrame(animateGlow);
    };

    document.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animateGlow);

    const onEnter = () => document.body.classList.add('cursor-hover');
    const onLeave = () => document.body.classList.remove('cursor-hover');

    const interactives = document.querySelectorAll('a, button');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [activeTab]);

  // Detect which section is in view
  useEffect(() => {
    const sections = document.querySelectorAll('#work, #contact');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));

    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.5) {
        setVisibleSection(null);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const getNavActive = (tab) => {
    if (visibleSection) return visibleSection === tab;
    return activeTab === tab;
  };

  const scrollTo = (id) => {
    setActiveTab('home');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor-dot" ref={cursorDotRef} />
      <div className="cursor-glow" ref={cursorGlowRef} />

      {/* Viewport Glow */}
      <div className="viewport-glow" />

      {/* Navbar */}
      <nav className="navbar">
        <button
          className="logo"
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          BRUNO.DEV
        </button>
        <div className="nav-links">
          <button
            className={getNavActive('about') ? 'active' : ''}
            onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            About
          </button>
          <button className={getNavActive('work') ? 'active' : ''} onClick={() => scrollTo('work')}>Work</button>
          <button className={getNavActive('contact') ? 'active' : ''} onClick={() => scrollTo('contact')}>Contact</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        {/* About Text */}
        <div className={`about-text ${activeTab === 'about' ? 'visible' : 'hidden'}`}>
          <span className="subtitle">Engenheiro de Software</span>
          <h1>
            Desenvolvedor <span className="gradient">Backend</span>
          </h1>
          <p>
            Desenvolvedor Backend especializado em Java/Spring Boot com experiência prática em automação inteligente e integração de sistemas. Construí bot de monitoramento de e-commerce (TypeScript) e API REST escalável (Java), atualmente desenvolvendo chatbot educacional com IA Generativa (Spring AI + OpenAI). Busco primeiro emprego/estágio onde possa aplicar habilidades de backend, resolução de problemas e entrega de valor real para usuários.
          </p>
        </div>

        {/* Avatar 3D */}
        <div className={`avatar-wrapper ${activeTab === 'home' ? 'centered' : 'aside'}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.png?v=3"
            alt="Bruno Santos - Avatar 3D"
            className="avatar-image"
          />
          <div className="avatar-glow" />
        </div>
      </section>

      {/* Content Below */}
      <div className="content-area">
        <div className="section-inner">

          {/* Work */}
          <section id="work">
            <h2 className="section-title">Trabalhos Selecionados</h2>

            <a href="https://github.com/brunorsnts/from-java-to-python" target="_blank" rel="noreferrer" className="project-card">
              <div className="project-number">01</div>
              <div className="project-info">
                <h3>From Java to Python</h3>
                <p>Professor de Python com Analogias Java — agente construído com o Claude Agent SDK.</p>
                <span className="project-tag">Ver Repositório</span>
              </div>
            </a>

            <a href="https://github.com/brunorsnts/fluencia/" target="_blank" rel="noreferrer" className="project-card">
              <div className="project-number">02</div>
              <div className="project-info">
                <h3>FluencIA</h3>
                <p>Plataforma inteligente focada em aprimorar a fluência em idiomas através de interações orientadas por Inteligência Artificial.</p>
                <span className="project-tag">Ver Repositório</span>
              </div>
            </a>

            <a href="https://github.com/brunorsnts/bot-promocoes" target="_blank" rel="noreferrer" className="project-card">
              <div className="project-number">03</div>
              <div className="project-info">
                <h3>Bot Promoções</h3>
                <p>Bot para WhatsApp que raspa, filtra e envia automaticamente as melhores promoções do Pelando.com.br.</p>
                <span className="project-tag">Ver Repositório</span>
              </div>
            </a>

            <a href="https://github.com/brunorsnts/novacommerce-api" target="_blank" rel="noreferrer" className="project-card">
              <div className="project-number">04</div>
              <div className="project-info">
                <h3>NovaCommerce API</h3>
                <p>Backend MVP de um e-commerce construído do zero com foco absoluto em boas práticas de Engenharia de Software.</p>
                <span className="project-tag">Ver Repositório</span>
              </div>
            </a>
          </section>

          {/* Contact */}
          <section id="contact" className="contact-section">
            <h2>Let's build together.</h2>
            <p className="desc">
              Estou sempre aberto a novos projetos, colaborações em IA e oportunidades no backend.
            </p>
            <div className="contact-links">
              <a href="https://github.com/brunorsnts" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/bruno-santos-517368206/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="mailto:santos_2002@outlook.com.br">Email</a>
              <a href="https://wa.me/5521980500036" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </section>

          <footer className="footer">
            <p>© 2026 Bruno Santos. Construído com Next.js.</p>
          </footer>
        </div>
      </div>
    </>
  );
}

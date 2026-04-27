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

        {/* Avatar 3D com Ícones Orbitando */}
        <div className={`avatar-wrapper ${activeTab === 'home' ? 'centered' : 'aside'}`}>

          {/* Container isolado: fundo preto + clip para esconder bordas */}
          <div className="avatar-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.png?v=3"
              alt="Bruno Santos - Avatar 3D"
              className="avatar-image"
            />
          </div>
          <div className="avatar-glow" />

          {/* Órbita 3D de Ícones - Linha do Equador */}
          <div className="orbit-scene">
            <div className="orbit-ring">
              {/* Java */}
              <div className="orbit-icon" style={{ '--i': 0 }}>
                <svg viewBox="0 0 24 24" fill="#ED8B00"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-.1218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.356.075-.515.14-.515.14s.132-.207.385-.297c2.875-1.011 5.086 2.981-.929 4.56 0 0 .07-.062.091-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.889 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627M9.734 23.924c4.322.277 10.959-.154 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639" /></svg>
              </div>
              {/* Spring Boot */}
              <div className="orbit-icon" style={{ '--i': 1 }}>
                <svg viewBox="0 0 24 24" fill="#6DB33F"><path d="M21.8537 1.4158a11.768 11.768 0 0 1-1.2926 2.4957A11.9476 11.9476 0 1 0 3.926 20.074l.2689.2689A11.9476 11.9476 0 0 0 21.8537 1.4158zM5.5765 20.1019a10.2093 10.2093 0 0 1-1.5091-2.4361.1568.1568 0 0 0-.0269-.0449A10.1571 10.1571 0 1 1 19.3383 4.2469a11.8884 11.8884 0 0 1-.5437 1.2835 8.0234 8.0234 0 0 0-3.4593-2.6218c-4.4851-1.9623-8.5755.3285-9.6297 2.735a5.178 5.178 0 0 0 1.2925-.8601c1.5541-1.3554 3.6662-2.0736 5.5675-1.769a7.397 7.397 0 0 1 5.1895 3.3245 8.4673 8.4673 0 0 1 .8422 6.1434 7.904 7.904 0 0 1-4.7445 5.2524 9.0592 9.0592 0 0 1-3.3245.6785 8.1428 8.1428 0 0 1-3.3874-.718 7.397 7.397 0 0 1-2.8187-2.2884l-.072-.0898a1.756 1.756 0 0 0-.0629-.0808 7.9668 7.9668 0 0 1-1.3913-5.3332c.2329-2.2075 1.2207-3.4593 1.769-3.9491a.1658.1658 0 0 0-.0539-.2778 5.805 5.805 0 0 0-1.7062-.5437.148.148 0 0 0-.1437.0449 10.074 10.074 0 0 0-2.1904 5.1088 10.2093 10.2093 0 0 0 5.0191 9.8716z" /></svg>
              </div>
              {/* Docker */}
              <div className="orbit-icon" style={{ '--i': 2 }}>
                <svg viewBox="0 0 24 24" fill="#2496ED"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" /></svg>
              </div>
              {/* PostgreSQL */}
              <div className="orbit-icon" style={{ '--i': 3 }}>
                <svg viewBox="0 0 24 24" fill="#4169E1"><path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3418-2.2773.1191-2.4624-.0401.7581-1.1815 1.4372-2.4834 1.9887-3.8895.6607-1.6848.9605-3.1024.9605-4.3231 0-1.3267-.3613-2.1207-1.0633-2.4812C21.0846 3.1478 20.2 3 19.0543 3c-1.343 0-2.9147.4449-4.2024.9605-.2513-.1393-.5175-.2747-.7887-.4051-.6719-.3231-1.5051-.5846-2.4602-.6885C11.1028 2.8128 10.58 2.8 10.0543 2.8c-.8252 0-1.6504.0898-2.4043.2702-.539.1289-.9862.3038-1.4277.4685-.3613.1352-.7122.2669-1.0982.365C4.0308 4.2283 3.5285 4.6 3.2567 5.236c-.2888.6747-.3311 1.6217-.1255 2.8141.0978.5625.2585 1.1577.4792 1.7739.0401.1123.0837.2261.1271.3384-.3672.7568-.6747 1.5625-.9022 2.3997-.3384 1.2422-.5063 2.5012-.4934 3.7242.0125 1.1758.2166 2.168.5928 2.873.0828.1539.1715.2825.265.3987.0195.024.0391.048.0591.0713.3584.3872.825.5625 1.3837.5188.4285-.0342.9062-.1943 1.4098-.4768.0825-.0462.1694-.0967.2549-.1471 1.5952-.9219 2.5699-1.924 3.1909-2.8823.4688-.0342 1.1397-.0781 1.748-.1446.7581-.0828 1.4489-.1851 1.9614-.2993.1123.3467.2549.648.4373.9022a2.7146 2.7146 0 0 0 .7122.7266c.3418.2422.7122.3897 1.0986.4473.195.0291.3906.0437.5903.0437 1.0981 0 2.209-.4995 3.2774-1.5024.0215-.0195.0415-.041.0625-.0625.0391-.0391.0781-.0781.1172-.1172l.0195.0195c.0791.0791.2191.0876.3671.0195.2271-.105.4871-.3731.5001-.7131.0085-.2132.0043-.4224.0043-.636v-.2049c-.0024-.0563-.0063-.1172-.0101-.1743-.0195-.3002-.041-.6128.041-.7632z" /></svg>
              </div>
              {/* Python */}
              <div className="orbit-icon" style={{ '--i': 4 }}>
                <svg viewBox="0 0 24 24" fill="#3776AB"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" /></svg>
              </div>
              {/* TypeScript */}
              <div className="orbit-icon" style={{ '--i': 5 }}>
                <svg viewBox="0 0 24 24" fill="#3178C6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" /></svg>
              </div>
              {/* Claude AI */}
              <div className="orbit-icon" style={{ '--i': 6 }}>
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Claude</title><path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" /></svg>
              </div>
            </div>
          </div>
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

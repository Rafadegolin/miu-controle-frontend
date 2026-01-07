"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./LandingPage.module.css";

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.activeReveal);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(`.${styles.reveal}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Spotlight Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--y", `${e.clientY - rect.top}px`);
      });
    };

    document.body.addEventListener("mousemove", handleMouseMove);
    return () => document.body.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.auroraContainer}>
        <div className={`${styles.auroraBlob} ${styles.blob1}`}></div>
        <div className={`${styles.auroraBlob} ${styles.blob2}`}></div>
        <div className={`${styles.auroraBlob} ${styles.blob3}`}></div>
      </div>

      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <Link href="#" className={styles.navLogo}>
            <span style={{ color: "var(--primary)" }}>✦</span> Miu Controle
          </Link>

          <div className={styles.navLinks}>
            <Link href="#features" className={styles.navLink}>
              Como funciona
            </Link>
            <Link href="#testimonials" className={styles.navLink}>
              Depoimentos
            </Link>
            <Link href="#faq" className={styles.navLink}>
              Dúvidas
            </Link>
          </div>

          <div className={styles.navActions}>
            <Link href="/register" className={styles.navLink} style={{marginRight: '8px'}}>
              Criar conta
            </Link>
            <Link href="/login" className={`${styles.btnPrimary} ${styles.navBtnSmall}`}>
              Entrar
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. HERO */}
      <section className={`${styles.hero} ${styles.container}`}>
        <div className={styles.reveal}>
          <div className={styles.trustBadge}>
            <span>★ 4.9/5</span> Usado por +10.000 pessoas
          </div>
          <h1>
            Controle seu dinheiro em <br />
            <span className={styles.highlight}>5 segundos (sem planilhas).</span>
          </h1>
          <p>
            Para quem quer sair do caos financeiro mas não tem paciência para
            sistemas complexos. O único app focado em velocidade extrema.
          </p>
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/register" className={styles.btnPrimary}>
              Começar agora grátis
            </Link>
            <Link href="#features" className={styles.btnOutline}>
              Ver como funciona
            </Link>
          </div>
        </div>

        <div
          className={`${styles.heroVisual} ${styles.reveal}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className={styles.dashboardGlass}>
            <div className={styles.sidebar}>
              <div
                className={`${styles.sidebarIcon} ${styles.sidebarIconActive}`}
              ></div>
              <div className={styles.sidebarIcon}></div>
            </div>
            <div className={styles.mainDash}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flexEnd",
                  marginBottom: "30px",
                }}
              >
                <div>
                  <div style={{ color: "#94a3b8", marginBottom: "5px" }}>
                    Saldo Projetado
                  </div>
                  <div style={{ fontSize: "2.5rem", fontWeight: 700 }}>
                    R$ 12.450
                  </div>
                </div>
                <div style={{ color: "var(--primary)" }}>+15% este mês</div>
              </div>
              <div
                style={{
                  height: "10px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "60%",
                    background: "var(--primary)",
                    borderRadius: "5px",
                  }}
                ></div>
              </div>
              <div
                style={{
                  height: "10px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "5px",
                  width: "80%",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DOR */}
      <section className={`${styles.container} ${styles.sectionPadding} ${styles.painSection}`}>
        <h2 className={styles.reveal}>
          O jeito antigo de cuidar do dinheiro
          <br />
          está quebrado.
        </h2>
        <div className={`${styles.painGrid} ${styles.reveal}`}>
          <div className={styles.painItem}>
            <h3>📉 O Caos Invisível</h3>
            <p>
              Você não sabe para onde foi seu salário. O "cafézinho" não é o
              vilão, a falta de clareza é. Você chega no dia 20 já no vermelho.
            </p>
          </div>
          <div className={styles.painItem}>
            <h3>📊 A Prisão das Planilhas</h3>
            <p>
              Você baixa uma planilha linda, usa por 3 dias e desiste. É chato,
              manual e exige tempo que você não tem.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SOLUÇÃO */}
      <section className={`${styles.container} ${styles.sectionPadding}`} id="features">
        <h2
          className={styles.reveal}
          style={{ textAlign: "center" }}
        >
          Menos gestão. Mais vida.
        </h2>
        <p
          className={styles.reveal}
          style={{ textAlign: "center", margin: "0 auto 50px" }}
        >
          Resolvemos a complexidade com tecnologia invisível.
        </p>

        <div className={styles.spotlightGroup}>
          {[
            {
              title: "Velocidade Absurda",
              benefit: "Nunca mais esqueça de anotar um gasto.",
              how: "O app abre direto no teclado numérico. Digite, categorize, pronto. 5 segundos.",
            },
            {
              title: "Futuro Previsível",
              benefit: "Saiba se vai ter dinheiro para as férias em dezembro.",
              how: "IA que analisa seus padrões e projeta seu saldo para os próximos 6 meses.",
            },
            {
              title: "Metas Alcançáveis",
              benefit: "Realize sonhos grandes sem se frustrar.",
              how: "Sistema de Objetivos Hierárquicos (Casa > Entrada > Reforma).",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`${styles.card} ${styles.reveal}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
              ref={(el) => {
                if (cardsRef.current) cardsRef.current[i] = el;
              }}
            >
              <h3>{item.title}</h3>
              <p style={{ marginTop: "10px" }}>
                <strong>Benefício:</strong> {item.benefit}
                <br />
                <strong>Como:</strong> {item.how}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW SECTION: LIVE DEMO (Phone Animation) */}
      <section
        className={`${styles.container} ${styles.sectionPadding} ${styles.demoGrid}`}
      >
        <div className={styles.reveal}>
          <h2 style={{ fontSize: "2.8rem" }}>
            A mágica acontece
            <br />
            <span className={styles.highlight}>no piloto automático.</span>
          </h2>
          <p style={{ marginBottom: "30px" }}>
            Recebeu uma notificação do banco? O Miu sugere o registro na hora. Um
            toque na notificação e a despesa já está categorizada e salva.
          </p>

          <div
            style={{
              display: "flex",
              gap: "30px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "30px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                }}
              >
                0.5s
              </span>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Notificação
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Automático
              </span>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Registro Inteligente
              </div>
            </div>
          </div>
        </div>

        <div
          className={styles.reveal}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className={styles.phoneMockup}>
            <div className={styles.notch}></div>
            <div className={styles.phoneScreen}>
              {/* Notification */}
              <div className={styles.notification}>
                <div
                  style={{
                    width: "35px",
                    height: "35px",
                    background: "#820ad1",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Nu
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    Compra aprovada
                  </div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                    R$ 45,00 em Padaria Estrela...
                  </div>
                </div>
              </div>

              {/* App Interface (Appears after tap) */}
              <div className={styles.miuApp}>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "40px",
                    marginBottom: "30px",
                  }}
                >
                  <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    Confirmar Despesa
                  </div>
                  <div
                    style={{
                      fontSize: "3rem",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    R$ 45,00
                  </div>
                  <div
                    style={{
                      padding: "5px 15px",
                      background: "rgba(50, 214, 165, 0.1)",
                      color: "var(--primary)",
                      borderRadius: "20px",
                      display: "inline-block",
                      marginTop: "10px",
                      fontSize: "0.9rem",
                    }}
                  >
                    🍔 Alimentação
                  </div>
                </div>
                <div style={{ flex: 1 }}></div>
                <button
                  className={styles.btnPrimary}
                  style={{ width: "100%" }}
                >
                  Confirmar
                </button>
              </div>

              {/* Success Overlay */}
              <div className={styles.successOverlay}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "4rem",
                      color: "var(--primary)",
                      marginBottom: "10px",
                    }}
                  >
                    ✓
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      color: "white",
                    }}
                  >
                    Salvo!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROVA SOCIAL */}
      <section className={`${styles.container} ${styles.sectionPadding}`} id="testimonials">
        <h2 className={styles.reveal} style={{ textAlign: "center" }}>
          Resultados reais de quem usa
        </h2>
        <div className={`${styles.proofGrid} ${styles.reveal}`}>
          <div className={styles.testimonial}>
            <div className={styles.stars}>★★★★★</div>
            <p>
              "Economizei <strong>R$ 8.000 em 4 meses</strong> para minha reserva.
              A projeção de saldo mudou meu jogo, parei de gastar o que eu não
              teria no futuro."
            </p>
            <div style={{ marginTop: "20px", fontWeight: 600, color: "white" }}>
              — Rafael M., Desenvolvedor
            </div>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.stars}>★★★★★</div>
            <p>
              "O único app que consegui usar por mais de 1 mês. A velocidade de
              registro é viciante, virou hábito instantâneo."
            </p>
            <div style={{ marginTop: "20px", fontWeight: 600, color: "white" }}>
              — Juliana C., Arquiteta
            </div>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.stars}>★★★★★</div>
            <p>
              "Saí do cheque especial em 60 dias. Ver para onde o dinheiro ia me
              deu o controle que eu precisava."
            </p>
            <div style={{ marginTop: "20px", fontWeight: 600, color: "white" }}>
              — Marcos P., Vendas
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section
        className={`${styles.container} ${styles.sectionPadding}`}
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        id="faq"
      >
        <h2 className={styles.reveal} style={{ textAlign: "center", marginBottom: "40px" }}>
          Dúvidas frequentes
        </h2>
        <div className={`${styles.faqContainer} ${styles.reveal}`}>
          {[
            { q: "É realmente gratuito? Tem pegadinha?", a: "Sim, 100% gratuito para sempre. Sem versão premium escondida, sem limite de lançamentos. Ganhamos dinheiro com parcerias corporativas, não cobrando do usuário final." },
            { q: "Meus dados bancários estão seguros?", a: "Não pedimos senha do banco. Você registra manualmente (é mais rápido e consciente). Seus dados são criptografados com padrão militar e nem nós temos acesso." },
            { q: "Funciona no iPhone e Android?", a: "Sim. O Miu Controle é um Web App Progressivo (PWA). Funciona em qualquer navegador moderno e pode ser instalado na sua tela inicial como um app nativo." },
          ].map((item, i) => (
            <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.active : ""}`}>
              <button className={styles.faqQuestion} onClick={() => toggleFaq(i)}>
                <span>{item.q}</span>
                <span className={styles.faqIcon}>+</span>
              </button>
              <div className={styles.faqAnswer}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA */}
      <section className={`${styles.container} ${styles.sectionPadding}`} style={{ textAlign: "center" }}>
        <div
          className={styles.reveal}
          style={{
            background: "radial-gradient(circle at center, rgba(50, 214, 165, 0.1) 0%, transparent 70%)",
            padding: "60px 20px",
          }}
        >
          <h2 style={{ fontSize: "3.5rem" }}>
            Pare de adivinhar.
            <br />
            Comece a controlar.
          </h2>
          <p style={{ margin: "20px auto 40px" }}>
            Junte-se a 10.000 pessoas que recuperaram a paz financeira.
          </p>
          <Link href="/register" className={styles.btnPrimary} style={{ fontSize: "1.2rem", padding: "20px 60px" }}>
            Criar Conta Grátis
          </Link>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "20px" }}>
            Leva menos de 2 minutos.
          </p>
        </div>
      </section>

      {/* IMPROVED FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "linear-gradient(to bottom, var(--bg-deep), #000)",
          padding: "80px 0 40px",
          marginTop: "80px",
        }}
      >
        <div className={styles.container}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "40px",
              marginBottom: "60px",
            }}
          >
            {/* Brand Column */}
            <div style={{ maxWidth: "300px" }}>
              <Link
                href="#"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "white",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <span style={{ color: "var(--primary)" }}>✦</span> Miu
                Controle
              </Link>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}
              >
                A ferramenta definitiva para quem valoriza tempo e clareza
                financeira. Construído para a era da velocidade.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h4 style={{ color: "white", marginBottom: "20px", fontSize: "1rem" }}>
                Produto
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li><Link href="#" className={styles.footerLink}>Recursos</Link></li>
                <li><Link href="#" className={styles.footerLink}>Manifesto</Link></li>
                <li><Link href="#" className={styles.footerLink}>Segurança</Link></li>
                <li><Link href="#" className={styles.footerLink}>Changelog</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 style={{ color: "white", marginBottom: "20px", fontSize: "1rem" }}>
                Empresa
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li><Link href="#" className={styles.footerLink}>Sobre nós</Link></li>
                <li><Link href="#" className={styles.footerLink}>Carreiras</Link></li>
                <li><Link href="#" className={styles.footerLink}>Blog</Link></li>
                <li><Link href="#" className={styles.footerLink}>Contato</Link></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 style={{ color: "white", marginBottom: "20px", fontSize: "1rem" }}>
                Legal
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li><Link href="#" className={styles.footerLink}>Privacidade</Link></li>
                <li><Link href="#" className={styles.footerLink}>Termos de Uso</Link></li>
                <li><Link href="#" className={styles.footerLink}>Cookies</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.05)",
              paddingTop: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              © 2026 Miu Technologies Inc. Todos os direitos reservados.
            </p>

            <div style={{ display: "flex", gap: "20px" }}>
              <Link href="#" className={styles.socialIcon} aria-label="Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
              <Link href="#" className={styles.socialIcon} aria-label="Instagram">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className={styles.socialIcon} aria-label="GitHub">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

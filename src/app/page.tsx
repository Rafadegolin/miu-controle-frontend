"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Play,
  Zap,
  Target,
  PieChart,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroAnimation } from "@/components/landing/HeroAnimation";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#00404f] text-white font-sans selection:bg-[#7cddb1] selection:text-[#00404f] overflow-x-hidden">
      {/* Navbar Fixo */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#00404f]/90 backdrop-blur-md border-b border-[#7cddb1]/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-tr from-[#3c88a0] to-[#7cddb1] rounded-xl flex items-center justify-center text-[#00404f] font-bold text-xl shadow-lg">
              M
            </div>
            <span className="font-bold text-2xl tracking-tight">Miu</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-white/80 hover:text-[#7cddb1] transition-colors"
            >
              Recursos
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-white/80 hover:text-[#7cddb1] transition-colors"
            >
              Como Funciona
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-white/80 hover:text-[#7cddb1] transition-colors"
            >
              Preços
            </a>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <button className="text-sm font-semibold hover:text-[#7cddb1] transition-colors">
                Entrar
              </button>
            </Link>
            <Link href="/register">
              <Button variant="mint" size="sm">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#3c88a0] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#7cddb1] rounded-full blur-3xl opacity-10"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Controle suas finanças em <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3c88a0] via-[#7cddb1] to-[#3c88a0]">
                PILOTO AUTOMÁTICO 🚀
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-lg">
              Registre despesas <strong>sem esforço</strong>. O Miu lê suas
              notificações bancárias e registra tudo automaticamente. Sem
              planilhas, sem estresse.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/register">
                <Button variant="landingPrimary" size="lg">
                  Experimente Grátis <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Button variant="landingSecondary" size="lg">
                <Play size={18} fill="currentColor" className="mr-2" /> Ver Demo
              </Button>
            </div>

            <div className="flex gap-6 text-sm text-white/60 font-medium">
              <span className="flex items-center gap-2">
                <Check size={16} className="text-[#7cddb1]" /> Sem cartão de
                crédito
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} className="text-[#7cddb1]" /> Setup em 2 min
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <HeroAnimation />
          </motion.div>
        </div>
      </header>

      {/* SOCIAL PROOF */}
      <section className="py-12 border-y border-[#7cddb1]/10 bg-[#002f3a]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-[#7cddb1] mb-1">
                15k+
              </div>
              <div className="text-white/50 text-sm uppercase tracking-wider">
                Usuários Ativos
              </div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#7cddb1] mb-1">
                500k+
              </div>
              <div className="text-white/50 text-sm uppercase tracking-wider">
                Transações
              </div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#7cddb1] mb-1">95%</div>
              <div className="text-white/50 text-sm uppercase tracking-wider">
                Precisão IA
              </div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#7cddb1] mb-1">
                4.9⭐
              </div>
              <div className="text-white/50 text-sm uppercase tracking-wider">
                Na App Store
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES BENTO GRID */}
      <section id="features" className="py-24 bg-[#002f3a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Tudo o que você precisa
            </h2>
            <p className="text-xl text-white/60">
              Funcionalidades poderosas em uma interface simples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-[#00404f] rounded-4xl p-10 border border-[#7cddb1]/10 relative overflow-hidden group hover:border-[#7cddb1]/30 transition-colors">
              <div className="w-14 h-14 bg-[#7cddb1]/10 rounded-2xl flex items-center justify-center text-[#7cddb1] mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Leitor de Notificações
              </h3>
              <p className="text-white/70 text-lg max-w-md">
                A tecnologia exclusiva do Miu lê os pushs dos seus apps
                bancários e cria as transações em tempo real.
              </p>
            </div>

            <div className="md:col-span-1 bg-[#00404f] rounded-4xl p-10 border border-[#7cddb1]/10">
              <div className="w-14 h-14 bg-[#ffd166]/10 rounded-2xl flex items-center justify-center text-[#ffd166] mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Metas Gamificadas</h3>
              <p className="text-white/70">
                Defina objetivos e acompanhe o progresso visualmente.
              </p>
            </div>

            <div className="md:col-span-1 bg-[#00404f] rounded-4xl p-10 border border-[#7cddb1]/10">
              <div className="w-14 h-14 bg-[#3c88a0]/10 rounded-2xl flex items-center justify-center text-[#3c88a0] mb-6">
                <PieChart size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Relatórios Visuais</h3>
              <p className="text-white/70">
                Entenda para onde vai cada centavo com gráficos interativos.
              </p>
            </div>

            <div className="md:col-span-2 bg-[#00404f] rounded-4xl p-10 border border-[#7cddb1]/10">
              <div className="w-14 h-14 bg-[#ff6b6b]/10 rounded-2xl flex items-center justify-center text-[#ff6b6b] mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Segurança Bancária</h3>
              <p className="text-white/70 text-lg">
                Seus dados são criptografados de ponta a ponta. Apenas você tem
                acesso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-[#002f3a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Escolha seu plano</h2>
            <p className="text-xl text-white/60">
              Comece grátis. Cancele quando quiser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            <div className="bg-[#00404f]/50 p-8 rounded-3xl border border-white/5 text-center">
              <h3 className="text-xl font-bold text-white/80 mb-2">Gratuito</h3>
              <div className="text-4xl font-bold mb-6">R$ 0</div>
              <ul className="space-y-4 text-left mb-8 text-sm text-white/70">
                <li className="flex gap-2">
                  <Check size={16} className="text-[#7cddb1]" /> 1 conta
                  bancária
                </li>
                <li className="flex gap-2">
                  <Check size={16} className="text-[#7cddb1]" /> Transações
                  ilimitadas
                </li>
                <li className="flex gap-2">
                  <Check size={16} className="text-[#7cddb1]" /> Relatórios
                  básicos
                </li>
              </ul>
              <Link href="/register">
                <Button
                  variant="secondary"
                  className="w-full bg-white/5 border-white/10 text-white"
                >
                  Começar Grátis
                </Button>
              </Link>
            </div>

            <div className="bg-linear-to-b from-[#00404f] to-[#002f3a] p-10 rounded-3xl border-2 border-[#7cddb1] text-center shadow-[0_0_40px_rgba(124,221,177,0.15)] relative transform scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7cddb1] text-[#00404f] px-4 py-1 rounded-full text-xs font-bold uppercase">
                Mais Popular
              </div>
              <h3 className="text-2xl font-bold text-[#7cddb1] mb-2">Pro</h3>
              <div className="text-5xl font-bold mb-1">
                R$ 19<span className="text-2xl text-white/60">,90</span>
              </div>
              <p className="text-white/40 text-sm mb-8">por mês</p>
              <ul className="space-y-4 text-left mb-8 text-sm text-white">
                <li className="flex gap-2">
                  <Check size={18} className="text-[#7cddb1]" />{" "}
                  <strong>Tudo ilimitado</strong>
                </li>
                <li className="flex gap-2">
                  <Check size={18} className="text-[#7cddb1]" /> IA de
                  Categorização
                </li>
                <li className="flex gap-2">
                  <Check size={18} className="text-[#7cddb1]" /> Metas
                  Gamificadas
                </li>
                <li className="flex gap-2">
                  <Check size={18} className="text-[#7cddb1]" /> Multi-moeda
                </li>
              </ul>
              <Link href="/register">
                <Button variant="mint" className="w-full py-4 text-lg">
                  Assinar Agora
                </Button>
              </Link>
            </div>

            <div className="bg-[#00404f]/50 p-8 rounded-3xl border border-white/5 text-center">
              <h3 className="text-xl font-bold text-white/80 mb-2">Família</h3>
              <div className="text-4xl font-bold mb-6">
                R$ 39<span className="text-2xl text-white/60">,90</span>
              </div>
              <ul className="space-y-4 text-left mb-8 text-sm text-white/70">
                <li className="flex gap-2">
                  <Check size={16} className="text-[#7cddb1]" /> Tudo do Pro
                </li>
                <li className="flex gap-2">
                  <Check size={16} className="text-[#7cddb1]" /> Até 5 pessoas
                </li>
                <li className="flex gap-2">
                  <Check size={16} className="text-[#7cddb1]" /> Gestão de
                  mesada
                </li>
              </ul>
              <Link href="/register">
                <Button
                  variant="secondary"
                  className="w-full bg-white/5 border-white/10 text-white"
                >
                  Criar Grupo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-linear-to-b from-[#002f3a] to-[#00404f] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-black mb-8 leading-tight">
            Pronto para assumir o controle <br />
            da sua vida financeira?
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Junte-se a mais de 15.000 pessoas que já automatizaram suas
            finanças.
          </p>
          <Link href="/register">
            <Button variant="mint" size="lg" className="px-12 py-5 text-xl">
              Começar Gratuitamente <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <p className="mt-6 text-sm text-white/40">
            Não requer cartão de crédito • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#001a24] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#7cddb1] rounded flex items-center justify-center text-[#00404f] font-bold text-xs">
                M
              </div>
              <span className="font-bold text-lg text-white">Miu</span>
            </div>
            <p className="text-white/40">Feito com ❤️ e tecnologia.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Produto</h4>
            <ul className="space-y-2 text-white/50">
              <li>
                <a href="#features" className="hover:text-[#7cddb1]">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#7cddb1]">
                  Preços
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7cddb1]">
                  Segurança
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Empresa</h4>
            <ul className="space-y-2 text-white/50">
              <li>
                <a href="#" className="hover:text-[#7cddb1]">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7cddb1]">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7cddb1]">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-white/50">
              <li>
                <a href="#" className="hover:text-[#7cddb1]">
                  Termos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7cddb1]">
                  Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

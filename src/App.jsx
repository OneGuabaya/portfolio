import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Mail, CodeXml, Globe, MessageCircle, Briefcase, GraduationCap, Code2, Cpu, Rocket } from 'lucide-react';
import { cvData } from './data/cvData';
import Navbar from './components/Navbar';
import ParticlesBackground from './components/ParticlesBackground';
import TechScrollDecor from './components/TechScrollDecor';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();
  
  // Barra de progreso suave
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Efecto de desvanecimiento para el Hero
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-white transition-colors duration-500 overflow-x-hidden relative">
      {/* Barra de progreso de Scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-violet-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      <ParticlesBackground isDarkMode={isDarkMode} />
      <TechScrollDecor />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="container mx-auto px-6 pt-32 pb-20 max-w-5xl">
        {/* HERO SECTION con Scroll Animation */}
        <motion.section 
          id="hero" 
          style={{ opacity: opacityHero, scale: scaleHero }}
          className="min-h-[70vh] flex flex-col justify-center items-center text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 relative"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-400 p-1">
              <div className={`w-full h-full rounded-full ${isDarkMode ? 'bg-slate-900' : 'bg-white'} flex items-center justify-center`}>
                <Rocket size={48} className="text-purple-500" />
              </div>
            </div>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -bottom-2 -right-2 bg-fuchsia-500 p-2 rounded-full text-white shadow-lg"
            >
              <MessageCircle size={20} />
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight"
          >
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
              {cvData.name.split(' ')[0]} {cvData.name.split(' ')[2]}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-white mb-8 max-w-2xl font-bold"
          >
            {cvData.title}
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a 
              href={`https://wa.me/${cvData.contact.whatsapp}`}
              className="px-8 py-3 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all flex items-center gap-2 shadow-xl shadow-purple-500/20"
            >
              Hablemos por WhatsApp <MessageCircle size={20} />
            </a>
            <div className="flex gap-2">
              <a href={cvData.contact.github} target="_blank" className="p-3 rounded-full glass hover:scale-110 transition-transform">
                <CodeXml size={24} />
              </a>
              <a href={cvData.contact.linkedin} target="_blank" className="p-3 rounded-full glass hover:scale-110 transition-transform">
                <Globe size={24} />
              </a>
              <a href={`mailto:${cvData.contact.email}`} className="p-3 rounded-full glass hover:scale-110 transition-transform">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>
        </motion.section>

        {/* EXPERIENCE SECTION */}
        <motion.section 
          id="experiencia" 
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
              <Briefcase size={28} />
            </div>
            <h2 className="text-3xl font-bold">Experiencia Profesional</h2>
          </motion.div>

          <div className="space-y-12">
            {cvData.experience.map((exp, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                <div className="mb-1 flex flex-wrap justify-between items-center gap-2">
                  <h3 className="text-xl font-bold text-purple-500">{exp.role}</h3>
                  <span className="text-sm px-3 py-1 rounded-full glass font-medium">{exp.period}</span>
                </div>
                <h4 className="text-lg font-bold mb-4 text-slate-700 dark:text-white">{exp.company}</h4>
                <ul className="space-y-3">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 dark:text-white font-semibold">
                      <span className="text-purple-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section 
          id="skills" 
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-2xl bg-fuchsia-500/10 text-fuchsia-500">
              <Code2 size={28} />
            </div>
            <h2 className="text-3xl font-bold">Stack Tecnológico</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkillCard title="Backend & Frontend" items={cvData.skills.fullstack} icon={<Globe size={20} />} color="purple" />
            <SkillCard title="IA & Automatización" items={cvData.skills.ia_automation} icon={<Cpu size={20} />} color="fuchsia" />
            <SkillCard title="Infraestructura & DevOps" items={cvData.skills.infra_devops} icon={<Code2 size={20} />} color="violet" />
            <SkillCard title="Gestión & Negocios" items={cvData.skills.power_skills} icon={<Briefcase size={20} />} color="emerald" />
          </div>
        </motion.section>

        {/* EDUCATION SECTION */}
        <motion.section 
          id="educacion" 
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-500">
              <GraduationCap size={28} />
            </div>
            <h2 className="text-3xl font-bold">Formación Académica</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cvData.education.map((edu, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-3xl border border-white/5"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-2 block">{edu.period}</span>
                <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                <p className="text-violet-400 font-medium mb-4">{edu.university}</p>
                <p className="text-sm text-slate-600 dark:text-white leading-relaxed font-semibold">{edu.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CONTACT CTA */}
        <motion.section 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-20 mt-20 text-center glass rounded-[40px] p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-fuchsia-400 to-violet-600"></div>
          <h2 className="text-4xl font-bold mb-6">¿Listo para escalar tu próximo proyecto?</h2>
          <p className="text-xl text-slate-600 dark:text-white mb-10 max-w-xl mx-auto font-bold">
            Estoy disponible para roles Full Stack, implementaciones de IA o consultoría técnica.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <a 
              href={`https://wa.me/${cvData.contact.whatsapp}`}
              className="w-full md:w-auto px-10 py-4 rounded-2xl bg-green-500 text-white font-bold hover:bg-green-600 transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-2"
            >
              <MessageCircle size={22} /> WhatsApp Directo
            </a>
            <a 
              href={`mailto:${cvData.contact.email}`}
              className="w-full md:w-auto px-10 py-4 rounded-2xl glass font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Mail size={22} /> Enviar Correo
            </a>
          </div>
        </motion.section>
      </main>

      <footer className="py-10 text-center text-slate-500 text-sm">
        <p>© 2026 {cvData.name} • Hecho con React & Tailwind</p>
      </footer>
    </div>
  );
}

function SkillCard({ title, items, icon, color }) {
  const colors = {
    purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    fuchsia: "text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20",
    violet: "text-violet-500 bg-violet-500/10 border-violet-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="glass p-6 rounded-3xl border border-white/5"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${colors[color]}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <span key={i} className="px-3 py-1 rounded-lg bg-slate-500/5 text-sm font-medium hover:bg-purple-500/10 hover:text-purple-500 transition-colors cursor-default">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default App;

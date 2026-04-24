import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Cpu, Code2, Database, Globe, Zap, Terminal } from 'lucide-react';

const TechScrollDecor = () => {
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Circuitos laterales */}
      <svg className="absolute left-0 top-0 h-full w-24 md:w-48 opacity-20" viewBox="0 0 100 1000" fill="none">
        <motion.path
          d="M 20 0 V 200 L 50 250 V 400 L 20 450 V 700 L 50 750 V 1000"
          stroke="url(#neonGradient)"
          strokeWidth="3"
          style={{ pathLength: smoothProgress }}
          className="drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
        />
        <defs>
          <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      <svg className="absolute right-0 top-0 h-full w-24 md:w-48 opacity-20" viewBox="0 0 100 1000" fill="none">
        <motion.path
          d="M 80 0 V 150 L 50 200 V 350 L 80 400 V 650 L 50 700 V 1000"
          stroke="url(#neonGradient)"
          strokeWidth="3"
          style={{ pathLength: smoothProgress }}
          className="drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
        />
      </svg>

      {/* Iconos Neón con Estela */}
      <FloatingIcon Icon={Cpu} top="15%" left="5%" progress={scrollYProgress} speed={-250} color="#a855f7" />
      <FloatingIcon Icon={Code2} top="40%" right="8%" progress={scrollYProgress} speed={200} color="#d946ef" />
      <FloatingIcon Icon={Database} top="65%" left="10%" progress={scrollYProgress} speed={-350} color="#8b5cf6" />
      <FloatingIcon Icon={Globe} top="85%" right="5%" progress={scrollYProgress} speed={300} color="#a855f7" />
      <FloatingIcon Icon={Zap} top="30%" right="15%" progress={scrollYProgress} speed={150} color="#f59e0b" />
      <FloatingIcon Icon={Terminal} top="70%" right="12%" progress={scrollYProgress} speed={-200} color="#d946ef" />
    </div>
  );
};

const FloatingIcon = ({ Icon, top, left, right, progress, speed, color }) => {
  // Tres niveles de suavizado para crear la estela (Principal, Estela 1, Estela 2)
  const p0 = useSpring(progress, { stiffness: 100, damping: 30 });
  const p1 = useSpring(progress, { stiffness: 70, damping: 35 });
  const p2 = useSpring(progress, { stiffness: 40, damping: 40 });

  return (
    <div style={{ position: 'absolute', top, left, right }} className="flex items-center justify-center">
      {/* Estela lejana */}
      <GhostLayer Icon={Icon} progress={p2} speed={speed} color={color} opacity={0.1} scale={0.8} blur="4px" />
      {/* Estela cercana */}
      <GhostLayer Icon={Icon} progress={p1} speed={speed} color={color} opacity={0.2} scale={0.9} blur="2px" />
      {/* Icono Principal */}
      <GhostLayer Icon={Icon} progress={p0} speed={speed} color={color} opacity={0.6} scale={1} blur="0px" isMain />
    </div>
  );
};

const GhostLayer = ({ Icon, progress, speed, color, opacity, scale, blur, isMain = false }) => {
  const y = useTransform(progress, [0, 1], [0, speed]);
  const rotate = useTransform(progress, [0, 1], [0, 360]);

  return (
    <motion.div
      style={{ 
        position: 'absolute',
        y, rotate,
        color: color,
        opacity,
        scale,
        filter: `blur(${blur}) drop-shadow(0 0 ${isMain ? '15px' : '5px'} ${color})`,
      }}
      className="absolute"
    >
      <Icon size={45} strokeWidth={isMain ? 1.5 : 1} />
    </motion.div>
  );
};

export default TechScrollDecor;

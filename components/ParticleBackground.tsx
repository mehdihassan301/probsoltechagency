
import React, { useRef, useEffect } from 'react';

type AnimationType = 'network' | 'waves' | 'dots';

interface ParticleBackgroundProps {
  type: AnimationType;
  opacity?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ type, opacity }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let waves: any[] = [];
    let time = 0;

    const mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 150
    };
    
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
        mouse.x = undefined;
        mouse.y = undefined;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);


    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      const parentHeight = canvas.parentElement?.clientHeight;
      canvas.height = parentHeight && parentHeight > 0 ? parentHeight : window.innerHeight;

      if (type === 'network' || type === 'dots') {
        initParticles();
      } else if (type === 'waves') {
        initWaves();
      }
    };
    
    // --- PARTICLE/NETWORK/DOTS LOGIC ---
    class Particle {
      x: number;
      y: number;
      baseRadius: number;
      radius: number;
      color: string;
      dx: number;
      dy: number;

      constructor(x: number, y: number, dx: number, dy: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.baseRadius = radius;
        this.radius = radius;
        this.color = color;
      }

      draw() {
        if(!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.dy = -this.dy;
        
        this.x += this.dx;
        this.y += this.dy;
        
        // Mouse interaction
        if (mouse.x !== undefined && mouse.y !== undefined) {
            const dxMouse = mouse.x - this.x;
            const dyMouse = mouse.y - this.y;
            const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            
            if (type === 'network') { // Repel and glow effect
                if (distance < mouse.radius) {
                    this.x -= dxMouse / 15;
                    this.y -= dyMouse / 15;
                    this.radius = Math.min(this.baseRadius * 3, this.baseRadius + 3);
                } else if (this.radius > this.baseRadius) {
                    this.radius -= 0.05;
                }
            } else if (type === 'dots') { // Magnify and push effect
                if (distance < mouse.radius) {
                    this.radius = Math.min(this.baseRadius * 5, this.baseRadius + (mouse.radius - distance) / 5);
                    this.x -= dxMouse / 25;
                    this.y -= dyMouse / 25;
                } else if (this.radius > this.baseRadius) {
                    this.radius -= 0.1;
                }
            }
        } else {
             if (this.radius > this.baseRadius) {
                this.radius -= type === 'network' ? 0.05 : 0.1;
            }
        }

        this.draw();
      }
    }

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const isDarkMode = document.documentElement.classList.contains('dark');
      const particleCount = type === 'network' ? (isMobile ? 50 : 100) : (isMobile ? 80 : 200);
      const speed = type === 'dots' ? 0.2 : 0.4;
      
      const darkColors = [`rgba(123, 62, 240, ${opacity ?? 0.85})`, `rgba(106, 236, 255, ${opacity ?? 0.85})`];
      const lightColors = [`rgba(110, 42, 230, ${opacity ?? 0.85})`, `rgba(0, 150, 170, ${opacity ?? 0.85})`];
      const colors = isDarkMode ? darkColors : lightColors;

      for (let i = 0; i < particleCount; i++) {
        const radius = type === 'network' ? Math.random() * 2 + 1 : Math.random() * 2.5 + 1;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * speed;
        const dy = (Math.random() - 0.5) * speed;
        const color = i % 3 === 0 ? colors[0] : colors[1];
        particles.push(new Particle(x, y, dx, dy, radius, color));
      }
    };
    
    const connect = () => {
      if(!ctx) return;
      const isDarkMode = document.documentElement.classList.contains('dark');
      let opacityValue = 1;
      const connectDistance = canvas.width / 9;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance = Math.sqrt(
            (particles[a].x - particles[b].x) ** 2 + (particles[a].y - particles[b].y) ** 2
          );

          if (distance < connectDistance) {
            const mouseOverA = mouse.x && mouse.y && Math.sqrt((mouse.x - particles[a].x)**2 + (mouse.y - particles[a].y)**2) < mouse.radius;
            const mouseOverB = mouse.x && mouse.y && Math.sqrt((mouse.x - particles[b].x)**2 + (mouse.y - particles[b].y)**2) < mouse.radius;
            const isHovered = mouseOverA || mouseOverB;

            opacityValue = 1 - (distance / connectDistance);
            const primaryColor = isDarkMode ? 'rgba(106, 236, 255, ' : 'rgba(0, 150, 170, ';
            const accentColor = isDarkMode ? 'rgba(255, 255, 255, ' : 'rgba(123, 62, 240, ';
            
            const lineColor = isHovered ? accentColor : primaryColor;
            ctx.strokeStyle = `${lineColor}${isHovered ? opacityValue : opacityValue * 0.7})`;
            ctx.lineWidth = isHovered ? 1.5 : 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // --- WAVES LOGIC ---
    const initWaves = () => {
        waves = [];
        const isDarkMode = document.documentElement.classList.contains('dark');
        const colors = isDarkMode
            ? [`rgba(123, 62, 240, ${opacity ?? 0.5})`, `rgba(106, 236, 255, ${opacity ?? 0.5})`, `rgba(123, 62, 240, ${opacity ?? 0.35})`]
            : [`rgba(123, 62, 240, ${opacity ?? 0.5})`, `rgba(106, 236, 255, ${opacity ?? 0.5})`, `rgba(123, 62, 240, ${opacity ?? 0.35})`];
            
        for(let i = 0; i < colors.length; i++) {
            waves.push({
                timeModifier: (Math.random() * 0.4) + 0.6,
                baseAmplitude: Math.random() * 60 + 50,
                amplitude: Math.random() * 60 + 50,
                wavelength: Math.random() * 200 + 250,
                color: colors[i],
                yOffset: Math.random() * canvas.height / 4
            });
        }
    }
    
    const drawWaves = () => {
        if(!ctx) return;
        time += 0.015;

        waves.forEach((wave) => {
            if (mouse.y !== undefined) {
                const influence = 1 - (mouse.y / canvas.height);
                wave.amplitude = wave.baseAmplitude + (influence - 0.5) * 60;
            }

            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            ctx.fillStyle = wave.color;

            for (let i = 0; i < canvas.width; i++) {
                let amplitudeModifier = 1;
                if(mouse.x !== undefined) {
                    const dist = Math.abs(i - mouse.x);
                    if (dist < mouse.radius * 1.5) {
                        amplitudeModifier = 1 + Math.cos(dist * Math.PI / (mouse.radius * 3)) * 0.4;
                    }
                }
                const y = Math.sin(i / wave.wavelength + time * wave.timeModifier) * wave.amplitude * amplitudeModifier + canvas.height / 2 + wave.yOffset - 150;
                ctx.lineTo(i, y);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();
        });
    }

    // --- ANIMATION LOOP ---
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (type === 'network') {
        particles.forEach(p => p.update());
        connect();
      } else if (type === 'dots') {
        particles.forEach(p => p.update());
      } else if (type === 'waves') {
        drawWaves();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // --- SETUP ---
    window.addEventListener('resize', resizeCanvas);
    
    setTimeout(resizeCanvas, 100);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [type, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
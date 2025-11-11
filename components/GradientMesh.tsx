import React, { useRef, useEffect } from 'react';

class GradientPoint {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    radius: number;

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.color = color;
        this.radius = Math.random() * 200 + 400; // Radius for the radial gradient
    }

    update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvasWidth) {
            this.vx *= -1;
        }
        if (this.y < 0 || this.y > canvasHeight) {
            this.vy *= -1;
        }
    }
}

const GradientMesh: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let animationFrameId: number;
        let points: GradientPoint[] = [];
        
        const init = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            
            const color1 = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
            const color2 = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
            const bgColor = getComputedStyle(document.documentElement).getPropertyValue(isDarkMode ? '--color-surface-dark' : '--color-surface-light').trim();
            
            const colors = [
                color1,
                color2,
                bgColor,
                color1
            ];

            points = colors.map(color => new GradientPoint(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                color
            ));
        }

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
                init();
            }
        };

        const animate = () => {
            // Guard against running animation on a 0-sized canvas or before points are initialized
            if (canvas.width === 0 || canvas.height === 0 || points.length === 0) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            points.forEach(p => p.update(canvas.width, canvas.height));
            
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempCtx = tempCanvas.getContext('2d');
            
            if (tempCtx) {
                points.forEach(p => {
                    const gradient = tempCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                    gradient.addColorStop(0, p.color);
                    gradient.addColorStop(1, `${p.color}00`); // Transparent
                    tempCtx.fillStyle = gradient;
                    tempCtx.fillRect(0, 0, canvas.width, canvas.height);
                });

                ctx.globalCompositeOperation = 'lighter';
                ctx.drawImage(tempCanvas, 0, 0);
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };

        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    // Theme changed, re-initialize colors
                    setTimeout(resizeCanvas, 50);
                }
            }
        });

        observer.observe(document.documentElement, { attributes: true });

        window.addEventListener('resize', resizeCanvas);
        // Initial call with a slight delay to ensure parent dimensions are final
        setTimeout(resizeCanvas, 100); 
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            observer.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0 opacity-20 dark:opacity-25"
            aria-hidden="true"
        />
    );
};

export default GradientMesh;
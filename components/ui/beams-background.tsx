'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

interface AnimatedGradientBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: 'subtle' | 'medium' | 'strong';
    /**
     * Base hue for the beams. 190 is the original cyan; pass the site accent
     * (around 10) to keep the background inside the existing palette.
     */
    hue?: number;
    /**
     * Render only the beams — no built-in headline. Used when this sits behind
     * the real page rather than acting as its own hero.
     */
    bare?: boolean;
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number, baseHue: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5,
        angle: angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        hue: baseHue + Math.random() * 70,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
    };
}

export function BeamsBackground({
    className,
    children,
    intensity = 'strong',
    hue = 190,
    bare = false,
}: AnimatedGradientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const MINIMUM_BEAMS = 20;

    const opacityMap = {
        subtle: 0.7,
        medium: 0.85,
        strong: 1,
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Beams are positioned in CSS pixels; the device-pixel ratio only ever
        // touches the backing store and the transform.
        const size = { width: window.innerWidth, height: window.innerHeight };

        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            size.width = window.innerWidth;
            size.height = window.innerHeight;

            canvas.width = size.width * dpr;
            canvas.height = size.height * dpr;
            canvas.style.width = `${size.width}px`;
            canvas.style.height = `${size.height}px`;
            // setTransform, not scale: scale compounds on every resize.
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const totalBeams = MINIMUM_BEAMS * 1.5;
            beamsRef.current = Array.from({ length: totalBeams }, () =>
                createBeam(size.width, size.height, hue)
            );
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        function resetBeam(beam: Beam, index: number, totalBeams: number) {
            const column = index % 3;
            const spacing = size.width / 3;

            beam.y = size.height + 100;
            beam.x =
                column * spacing +
                spacing / 2 +
                (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 100 + Math.random() * 100;
            beam.speed = 0.5 + Math.random() * 0.4;
            beam.hue = hue + (index * 70) / totalBeams;
            beam.opacity = 0.2 + Math.random() * 0.1;
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            // Calculate pulsing opacity
            const pulsingOpacity =
                beam.opacity *
                (0.8 + Math.sin(beam.pulse) * 0.2) *
                opacityMap[intensity];

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

            // Enhanced gradient with multiple color stops
            gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
            gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`);
            gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
            gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
            gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`);
            gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function render() {
            if (!ctx) return;
            ctx.clearRect(0, 0, size.width, size.height);
            ctx.filter = 'blur(35px)';
            beamsRef.current.forEach((beam) => drawBeam(ctx, beam));
        }

        function animate() {
            if (!ctx) return;

            ctx.clearRect(0, 0, size.width, size.height);
            ctx.filter = 'blur(35px)';

            const totalBeams = beamsRef.current.length;
            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;

                // Reset beam when it goes off screen
                if (beam.y + beam.length < -100) {
                    resetBeam(beam, index, totalBeams);
                }

                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        // A permanent animation frame is a real cost. It does not run for
        // someone who asked for less motion, and it stops with the tab.
        const stillness = window.matchMedia('(prefers-reduced-motion: reduce)');

        const start = () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (stillness.matches) {
                render();
                return;
            }
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const stop = () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = 0;
            }
        };

        const onVisibility = () => (document.hidden ? stop() : start());

        start();
        stillness.addEventListener('change', start);
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            stillness.removeEventListener('change', start);
            document.removeEventListener('visibilitychange', onVisibility);
            stop();
        };
    }, [intensity, hue]);

    return (
        <div
            className={cn(
                'relative min-h-screen w-full overflow-hidden bg-neutral-950',
                className
            )}
        >
            <canvas ref={canvasRef} className="absolute inset-0" style={{ filter: 'blur(15px)' }} />

            <motion.div
                className="absolute inset-0 bg-neutral-950/5"
                animate={{
                    opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                    duration: 10,
                    ease: 'easeInOut',
                    repeat: Number.POSITIVE_INFINITY,
                }}
                style={{
                    backdropFilter: 'blur(50px)',
                }}
            />

            {bare ? null : (
                <div className="relative z-10 flex h-screen w-full items-center justify-center">
                    {children ?? (
                        <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
                            <motion.h1
                                className="text-6xl font-semibold tracking-tighter text-white md:text-7xl lg:text-8xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                Beams
                                <br />
                                Background
                            </motion.h1>
                            <motion.p
                                className="text-lg tracking-tighter text-white/70 md:text-2xl lg:text-3xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                For your pleasure
                            </motion.p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

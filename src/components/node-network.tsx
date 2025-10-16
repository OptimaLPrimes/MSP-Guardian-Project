
'use client';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    isPinging: boolean;
    pingStartTime: number;
}

interface Connection {
    from: Node;
    to: Node;
    isPulsing: boolean;
    pulseStartTime: number;
}

interface ScanWave {
    startTime: number;
    duration: number;
    startX: number;
}

const NodeNetwork = ({ isCritical = false }: { isCritical?: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scanWaveRef = useRef<ScanWave | null>(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const numNodes = 25;
        const nodes: Node[] = [];
        const connections: Connection[] = [];
        const maxDist = 150;
        const pingDuration = 1000;
        const pulseDuration = 1500;

        const resizeCanvas = () => {
            const container = canvas.parentElement;
            if (container) {
                canvas.width = container.offsetWidth;
                canvas.height = container.offsetHeight;
            }
        };
        
        if (!scanWaveRef.current) {
            scanWaveRef.current = {
                startTime: Date.now(),
                duration: 20000, // 20 seconds
                startX: -canvas.width * 0.1,
            };
        }


        const init = () => {
            resizeCanvas();
            nodes.length = 0;
            connections.length = 0;
            for (let i = 0; i < numNodes; i++) {
                nodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                    isPinging: false,
                    pingStartTime: 0
                });
            }

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                    if (dist < maxDist) {
                        connections.push({
                            from: nodes[i],
                            to: nodes[j],
                            isPulsing: false,
                            pulseStartTime: 0,
                        });
                    }
                }
            }
        };

        const draw = () => {
            const now = Date.now();
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

             // Draw system scan wave
             if (scanWaveRef.current) {
                const wave = scanWaveRef.current;
                const elapsed = now - wave.startTime;
                const progress = (elapsed % wave.duration) / wave.duration;
                const waveX = wave.startX + progress * (canvas.width * 1.2);
                const waveWidth = canvas.width * 0.05;

                const gradient = ctx.createLinearGradient(waveX - waveWidth, 0, waveX + waveWidth, 0);
                gradient.addColorStop(0, 'rgba(139, 92, 246, 0)');
                gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)');
                gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(waveX - waveWidth, 0, waveWidth * 2, canvas.height);

                 // Brighten nodes as wave passes
                 nodes.forEach(node => {
                    const distFromWave = Math.abs(node.x - waveX);
                    if (distFromWave < waveWidth) {
                        const brightness = (1 - distFromWave / waveWidth) * 0.8;
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(191, 219, 254, ${brightness})`;
                        ctx.fill();
                    }
                });
            }

            // Draw connections
            connections.forEach(connection => {
                const dist = Math.hypot(connection.from.x - connection.to.x, connection.from.y - connection.to.y);
                const opacity = 1 - dist / maxDist;
                
                if (connection.isPulsing) {
                    const elapsed = now - connection.pulseStartTime;
                    if (elapsed < pulseDuration) {
                        const pulseProgress = elapsed / pulseDuration;
                        
                        let startColor = `rgba(139, 92, 246, ${Math.max(0, 0.8 - pulseProgress)})`;
                        let midColor = `rgba(255, 255, 255, ${Math.max(0, 1 - Math.abs(pulseProgress - 0.5) * 2)})`;
                        let endColor = `rgba(139, 92, 246, ${Math.max(0, pulseProgress - 0.2)})`;

                        if (isCritical && Math.random() < 0.1) { // 10% chance to flash red if critical
                            startColor = `rgba(220, 38, 38, ${Math.max(0, 0.8 - pulseProgress)})`;
                            midColor = `rgba(255, 150, 150, ${Math.max(0, 1 - Math.abs(pulseProgress - 0.5) * 2)})`;
                            endColor = `rgba(220, 38, 38, ${Math.max(0, pulseProgress - 0.2)})`;
                        }

                        const gradient = ctx.createLinearGradient(connection.from.x, connection.from.y, connection.to.x, connection.to.y);

                        gradient.addColorStop(Math.max(0, pulseProgress - 0.1), startColor);
                        gradient.addColorStop(pulseProgress, midColor);
                        gradient.addColorStop(Math.min(1, pulseProgress + 0.1), endColor);

                        ctx.beginPath();
                        ctx.moveTo(connection.from.x, connection.from.y);
                        ctx.lineTo(connection.to.x, connection.to.y);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1;
                        ctx.stroke();

                    } else {
                        connection.isPulsing = false;
                    }
                } else {
                     ctx.beginPath();
                    ctx.moveTo(connection.from.x, connection.from.y);
                    ctx.lineTo(connection.to.x, connection.to.y);
                    ctx.strokeStyle = `rgba(100, 116, 139, ${opacity * 0.3})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });

            // Draw nodes
            nodes.forEach(node => {
                ctx.beginPath();
                let radius = node.radius;

                if (node.isPinging) {
                    const elapsed = now - node.pingStartTime;
                    if (elapsed < pingDuration) {
                        const pingProgress = elapsed / pingDuration;
                        const pingEffect = Math.sin(pingProgress * Math.PI); // Creates a pulse effect
                        radius = node.radius + pingEffect * 3;
                        
                        ctx.fillStyle = `rgba(167, 139, 250, ${1 - pingProgress})`; // Glow effect
                        ctx.arc(node.x, node.y, radius + pingEffect * 5, 0, Math.PI * 2);
                        ctx.fill();

                    } else {
                        node.isPinging = false;
                    }
                }
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(191, 219, 254, 0.7)';
                ctx.fill();
            });
        };

        const update = () => {
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            });
        };
        
        const triggerEvents = () => {
            // Trigger node ping
            if (Math.random() < 0.02) {
                const node = nodes[Math.floor(Math.random() * nodes.length)];
                if (!node.isPinging) {
                    node.isPinging = true;
                    node.pingStartTime = Date.now();
                }
            }

            // Trigger connection pulse
            if (Math.random() < 0.01) {
                const connection = connections[Math.floor(Math.random() * connections.length)];
                if (!connection.isPulsing) {
                    connection.isPulsing = true;
                    connection.pulseStartTime = Date.now();
                }
            }
        };

        const animate = () => {
            update();
            draw();
            triggerEvents();
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        window.addEventListener('resize', init);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', init);
        };
    }, [isCritical]);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />;
};

export default NodeNetwork;

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Floating 3D Minecraft-style blocks as particles
 * Can be toggled on/off via props
 */
const BlockParticles = ({ enabled = true, count = 25 }) => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const blocksRef = useRef([]);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !enabled) return;

        // Create scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Create camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;
        cameraRef.current = camera;

        // Get container dimensions
        const container = containerRef.current;
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: false
        });
        renderer.setSize(width, height, false);
        renderer.setPixelRatio(1); // Use 1 to prevent scaling issues
        
        // Style the canvas to prevent layout issues
        const canvas = renderer.domElement;
        canvas.style.display = 'block';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.outline = 'none';
        
        container.appendChild(canvas);
        rendererRef.current = renderer;

        // Create block geometry (reuse for all blocks)
        const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

        // Create blocks with random positions and velocities
        const blocks = [];
        for (let i = 0; i < count; i++) {
            // Random material colors (Minecraft-like)
            const colors = [
                0x7cb342, // Green (grass)
                0x8d6e63, // Brown (dirt)
                0x9e9e9e, // Gray (stone)
                0x5d4037, // Dark brown (wood)
                0x4caf50, // Bright green
                0x795548, // Brown
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const material = new THREE.MeshStandardMaterial({ 
                color: color,
                roughness: 0.8,
                metalness: 0.2
            });

            const block = new THREE.Mesh(geometry, material);
            
            // Random starting position
            block.position.x = (Math.random() - 0.5) * 10;
            block.position.y = (Math.random() - 0.5) * 10;
            block.position.z = (Math.random() - 0.5) * 10;

            // Random rotation
            block.rotation.x = Math.random() * Math.PI;
            block.rotation.y = Math.random() * Math.PI;
            block.rotation.z = Math.random() * Math.PI;

            // Random velocity
            block.userData.velocity = {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01,
                rotationX: (Math.random() - 0.5) * 0.02,
                rotationY: (Math.random() - 0.5) * 0.02,
                rotationZ: (Math.random() - 0.5) * 0.02,
            };

            scene.add(block);
            blocks.push(block);
        }
        blocksRef.current = blocks;

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Handle resize
        const handleResize = () => {
            if (!camera || !renderer || !containerRef.current) return;
            const width = containerRef.current.clientWidth || window.innerWidth;
            const height = containerRef.current.clientHeight || window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
        };

        window.addEventListener('resize', handleResize);

        // Animation loop
        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);

            blocksRef.current.forEach((block) => {
                // Update position
                block.position.x += block.userData.velocity.x;
                block.position.y += block.userData.velocity.y;
                block.position.z += block.userData.velocity.z;

                // Update rotation
                block.rotation.x += block.userData.velocity.rotationX;
                block.rotation.y += block.userData.velocity.rotationY;
                block.rotation.z += block.userData.velocity.rotationZ;

                // Wrap around screen edges
                if (block.position.x > 6) block.position.x = -6;
                if (block.position.x < -6) block.position.x = 6;
                if (block.position.y > 6) block.position.y = -6;
                if (block.position.y < -6) block.position.y = 6;
                if (block.position.z > 6) block.position.z = -6;
                if (block.position.z < -6) block.position.z = 6;
            });

            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
                if (containerRef.current && rendererRef.current.domElement) {
                    containerRef.current.removeChild(rendererRef.current.domElement);
                }
            }
            if (sceneRef.current) {
                sceneRef.current.traverse((object) => {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(material => material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                });
            }
        };
    }, [enabled, count]);

    if (!enabled) return null;

    return (
        <div 
            ref={containerRef} 
            style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 1,
                pointerEvents: 'none',
                overflow: 'hidden',
                margin: 0,
                padding: 0
            }} 
        />
    );
};

export default BlockParticles;


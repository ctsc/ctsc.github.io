import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Rotating panorama background similar to Minecraft's main menu
 * Includes parallax effect based on mouse movement
 */
const PanoramaBackground = ({ imagePath = '/background.jpg' }) => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const sphereRef = useRef(null);
    const animationFrameRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rotationRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

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
        camera.position.set(0, 0, 0);
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

        // Load texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(
            imagePath,
            () => {
                // Texture loaded successfully
            },
            undefined,
            (error) => {
                console.error('Error loading panorama texture:', error);
            }
        );

        // Create sphere geometry for panorama (inside-out)
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        // Flip the geometry inside out
        geometry.scale(-1, 1, 1);
        
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        });

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        sphereRef.current = sphere;

        // Mouse movement for parallax
        const handleMouseMove = (event) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

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

            if (sphereRef.current) {
                // Slow automatic rotation (like Minecraft)
                rotationRef.current.y += 0.0005;
                
                // Parallax effect based on mouse position
                const targetRotationX = mouseRef.current.y * 0.1;
                const targetRotationY = rotationRef.current.y + mouseRef.current.x * 0.1;

                // Smooth interpolation
                sphereRef.current.rotation.x += (targetRotationX - sphereRef.current.rotation.x) * 0.05;
                sphereRef.current.rotation.y = targetRotationY;
            }

            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (texture) texture.dispose();
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
    }, [imagePath]);

    return (
        <div 
            ref={containerRef} 
            style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                margin: 0,
                padding: 0
            }} 
        />
    );
};

export default PanoramaBackground;


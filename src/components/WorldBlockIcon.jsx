import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * 3D Minecraft-style block icon for world selection
 * Shows hover and selection animations
 */
const WorldBlockIcon = ({ 
    isSelected = false, 
    blockType = 'grass', // grass, stone, dirt, wood, etc.
    size = 64 
}) => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const blockRef = useRef(null);
    const animationFrameRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Helper function to brighten a color
    const brightenColor = (color, factor = 1.3) => {
        const r = Math.min(255, Math.floor((color >> 16) & 0xFF) * factor);
        const g = Math.min(255, Math.floor((color >> 8) & 0xFF) * factor);
        const b = Math.min(255, Math.floor(color & 0xFF) * factor);
        return (r << 16) | (g << 8) | b;
    };

    // Block type colors - brighter versions
    const blockColors = {
        grass: { top: brightenColor(0x7cb342), side: brightenColor(0x8d6e63), bottom: brightenColor(0x5d4037) },
        stone: { top: brightenColor(0x9e9e9e), side: brightenColor(0x9e9e9e), bottom: brightenColor(0x9e9e9e) },
        dirt: { top: brightenColor(0x8d6e63), side: brightenColor(0x8d6e63), bottom: brightenColor(0x8d6e63) },
        wood: { top: brightenColor(0x5d4037), side: brightenColor(0x6d4c41), bottom: brightenColor(0x5d4037) },
        // New block types for projects
        redstone: { top: brightenColor(0xaa0000), side: brightenColor(0xcc0000), bottom: brightenColor(0x880000) }, // Redstone block - for automation/pipeline
        gold: { top: brightenColor(0xf4d03f), side: brightenColor(0xffd700), bottom: brightenColor(0xd4af37) }, // Gold block - for e-commerce
        emerald: { top: brightenColor(0x00d982), side: brightenColor(0x00ff95), bottom: brightenColor(0x00b870) }, // Emerald block - for commerce/analytics
        brick: { top: brightenColor(0xb85c38), side: brightenColor(0xc96a3d), bottom: brightenColor(0xa04a2e) }, // Brick - for housing
        bookshelf: { top: brightenColor(0x8b4513), side: brightenColor(0x654321), bottom: brightenColor(0x8b4513) }, // Bookshelf - for library
        obsidian: { top: brightenColor(0x1a1a2e), side: brightenColor(0x16213e), bottom: brightenColor(0x0f3460) }, // Obsidian - for security/tools
        iron: { top: brightenColor(0xd4d4d4), side: brightenColor(0xe8e8e8), bottom: brightenColor(0xc0c0c0) }, // Iron block - for tools/automation
        diamond: { top: brightenColor(0x4dd0e1), side: brightenColor(0x00bcd4), bottom: brightenColor(0x0097a7) }, // Diamond - for valuable projects
        default: { top: brightenColor(0x7cb342), side: brightenColor(0x8d6e63), bottom: brightenColor(0x5d4037) }
    };

    const colors = blockColors[blockType] || blockColors.default;

    useEffect(() => {
        if (!containerRef.current) return;

        // Create scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Create camera
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        camera.position.set(1.5, 1.5, 1.5);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Create renderer
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: false
        });
        renderer.setSize(size, size);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Style the canvas to prevent layout issues
        const canvas = renderer.domElement;
        canvas.style.display = 'block';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        
        containerRef.current.appendChild(canvas);
        rendererRef.current = renderer;

        // Create block with different colors for each face
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        
        // Create materials for each face
        const materials = [
            new THREE.MeshStandardMaterial({ color: colors.side }), // right
            new THREE.MeshStandardMaterial({ color: colors.side }), // left
            new THREE.MeshStandardMaterial({ color: colors.top }), // top
            new THREE.MeshStandardMaterial({ color: colors.bottom }), // bottom
            new THREE.MeshStandardMaterial({ color: colors.side }), // front
            new THREE.MeshStandardMaterial({ color: colors.side })  // back
        ];

        const block = new THREE.Mesh(geometry, materials);
        block.rotation.x = 0.5;
        block.rotation.y = 0.5;
        scene.add(block);
        blockRef.current = block;

        // Add brighter lights for better visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(2, 2, 2);
        scene.add(directionalLight);

        // Add additional light from opposite side for better illumination
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
        fillLight.position.set(-2, -1, -2);
        scene.add(fillLight);

        // Animation loop
        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);

            if (blockRef.current) {
                // Continuous slow rotation
                blockRef.current.rotation.y += 0.01;

                // Hover effect - slight scale up
                const targetScale = isHovered || isSelected ? 1.2 : 1.0;
                blockRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

                // Selection effect - slight bounce
                if (isSelected) {
                    blockRef.current.rotation.x = 0.5 + Math.sin(Date.now() * 0.003) * 0.1;
                }
            }

            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
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
    }, [size, colors, isHovered, isSelected]);

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: size,
                height: size,
                cursor: 'pointer'
            }}
        />
    );
};

export default WorldBlockIcon;


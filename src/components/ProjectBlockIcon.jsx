import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * 3D Minecraft-style block icon for project selection
 * Shows hover and selection animations
 * Uses actual Minecraft block textures
 */
const ProjectBlockIcon = ({ 
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
    const textureLoaderRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Map block types to Minecraft block texture names
    // Using a CDN that hosts Minecraft textures
    const blockTextureMap = {
        grass: 'grass_block',
        stone: 'stone',
        dirt: 'dirt',
        wood: 'oak_planks',
        redstone: 'redstone_block',
        gold: 'gold_block',
        emerald: 'emerald_block',
        brick: 'bricks',
        bookshelf: 'bookshelf',
        obsidian: 'obsidian',
        iron: 'iron_block',
        diamond: 'diamond_block',
        note: 'note_block',
        observer: 'observer',
        burgundy: 'netherrack', // Purple/burgundy color for healthcare
        default: 'sandstone' // Default to sandstone as requested
    };

    // Get texture name for block type
    const textureName = blockTextureMap[blockType] || blockTextureMap.default;

    useEffect(() => {
        if (!containerRef.current) return;

        // Create texture loader
        const loader = new THREE.TextureLoader();
        textureLoaderRef.current = loader;

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

        // Create block geometry
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        
        // Load textures for each face
        // For Minecraft blocks, we need top, side, and bottom textures
        // Using a reliable Minecraft texture CDN
        const textureUrl = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.1/assets/minecraft/textures/block/${textureName}.png`;
        
        // Load the main texture (will be used for all faces)
        loader.load(
            textureUrl,
            // onLoad callback
            (texture) => {
                // Configure texture for pixelated Minecraft look
                texture.magFilter = THREE.NearestFilter;
                texture.minFilter = THREE.NearestFilter;
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                
                // Use the same texture for all faces (can be customized per block type later)
                // For Minecraft blocks, we typically use the same texture on all sides
                // except for special blocks like grass which we can handle separately
                const materials = [
                    new THREE.MeshStandardMaterial({ map: texture }), // right
                    new THREE.MeshStandardMaterial({ map: texture }), // left
                    new THREE.MeshStandardMaterial({ map: texture }), // top
                    new THREE.MeshStandardMaterial({ map: texture }), // bottom
                    new THREE.MeshStandardMaterial({ map: texture }), // front
                    new THREE.MeshStandardMaterial({ map: texture })  // back
                ];
                
                // Update block materials if block already exists
                if (blockRef.current) {
                    // Dispose old materials
                    if (Array.isArray(blockRef.current.material)) {
                        blockRef.current.material.forEach(mat => {
                            if (mat.map) mat.map.dispose();
                            mat.dispose();
                        });
                    }
                    blockRef.current.material = materials;
                }
            },
            // onProgress callback (optional)
            undefined,
            // onError callback
            (error) => {
                console.warn(`Failed to load texture for ${textureName}, using fallback color`);
                // Fallback to colored materials if texture fails to load
                const fallbackColor = 0x888888;
                const materials = [
                    new THREE.MeshStandardMaterial({ color: fallbackColor }), // right
                    new THREE.MeshStandardMaterial({ color: fallbackColor }), // left
                    new THREE.MeshStandardMaterial({ color: fallbackColor }), // top
                    new THREE.MeshStandardMaterial({ color: fallbackColor }), // bottom
                    new THREE.MeshStandardMaterial({ color: fallbackColor }), // front
                    new THREE.MeshStandardMaterial({ color: fallbackColor })  // back
                ];
                if (blockRef.current) {
                    blockRef.current.material = materials;
                }
            }
        );
        
        // Create initial materials (will be replaced when texture loads)
        const initialMaterials = [
            new THREE.MeshStandardMaterial({ color: 0x888888 }), // right
            new THREE.MeshStandardMaterial({ color: 0x888888 }), // left
            new THREE.MeshStandardMaterial({ color: 0x888888 }), // top
            new THREE.MeshStandardMaterial({ color: 0x888888 }), // bottom
            new THREE.MeshStandardMaterial({ color: 0x888888 }), // front
            new THREE.MeshStandardMaterial({ color: 0x888888 })  // back
        ];

        const block = new THREE.Mesh(geometry, initialMaterials);
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
                            object.material.forEach(material => {
                                if (material.map) material.map.dispose();
                                material.dispose();
                            });
                        } else {
                            if (object.material.map) object.material.map.dispose();
                            object.material.dispose();
                        }
                    }
                });
            }
        };
    }, [size, textureName, isHovered, isSelected]);

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

export default ProjectBlockIcon;


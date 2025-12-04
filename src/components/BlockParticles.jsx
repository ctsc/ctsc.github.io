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

        // Grass/stone/crafting theme block textures
        const blockTextures = [
            'grass_block',
            'coal_ore',
            'stone',
            'cobblestone',
            'crafting_table_top'
        ];

        // Create texture loader
        const loader = new THREE.TextureLoader();
        const textureBaseUrl = 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.1/assets/minecraft/textures/block/';

        // Create blocks with random positions and velocities
        const blocks = [];
        
        for (let i = 0; i < count; i++) {
            // Select a random texture from the theme
            const textureName = blockTextures[Math.floor(Math.random() * blockTextures.length)];
            const textureUrl = `${textureBaseUrl}${textureName}.png`;
            
            // Create initial material (will be updated when texture loads)
            const initialMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xd4c4a8, // Light beige fallback color
                roughness: 0.8,
                metalness: 0.2
            });

            const block = new THREE.Mesh(geometry, initialMaterial);
            
            // Special handling for grass blocks - need top and side textures
            if (textureName === 'grass_block') {
                // Load grass block with grass on top
                const sideTextureUrl = `${textureBaseUrl}grass_block_side.png`;
                const topTextureUrl = `${textureBaseUrl}grass_block_top.png`;
                const bottomTextureUrl = `${textureBaseUrl}dirt.png`;
                
                let texturesLoaded = 0;
                let loadedSideTexture = null;
                let loadedTopTexture = null;
                let loadedBottomTexture = null;
                
                const createGrassMaterials = () => {
                    if (!loadedSideTexture || !loadedTopTexture || !loadedBottomTexture) return;
                    
                    // Create materials for each face
                    const materials = [
                        new THREE.MeshStandardMaterial({ map: loadedSideTexture }), // right
                        new THREE.MeshStandardMaterial({ map: loadedSideTexture }), // left
                        new THREE.MeshStandardMaterial({ map: loadedTopTexture }), // top
                        new THREE.MeshStandardMaterial({ map: loadedBottomTexture }), // bottom
                        new THREE.MeshStandardMaterial({ map: loadedSideTexture }), // front
                        new THREE.MeshStandardMaterial({ map: loadedSideTexture })  // back
                    ];
                    
                    // Update block with multi-material
                    if (block.material) {
                        if (Array.isArray(block.material)) {
                            block.material.forEach(mat => mat.dispose());
                        } else {
                            block.material.dispose();
                        }
                    }
                    block.material = materials;
                };
                
                loader.load(
                    sideTextureUrl,
                    (tex) => {
                        tex.magFilter = THREE.NearestFilter;
                        tex.minFilter = THREE.NearestFilter;
                        tex.wrapS = THREE.RepeatWrapping;
                        tex.wrapT = THREE.RepeatWrapping;
                        loadedSideTexture = tex;
                        texturesLoaded++;
                        if (texturesLoaded === 3) createGrassMaterials();
                    }
                );
                loader.load(
                    topTextureUrl,
                    (tex) => {
                        tex.magFilter = THREE.NearestFilter;
                        tex.minFilter = THREE.NearestFilter;
                        tex.wrapS = THREE.RepeatWrapping;
                        tex.wrapT = THREE.RepeatWrapping;
                        loadedTopTexture = tex;
                        texturesLoaded++;
                        if (texturesLoaded === 3) createGrassMaterials();
                    }
                );
                loader.load(
                    bottomTextureUrl,
                    (tex) => {
                        tex.magFilter = THREE.NearestFilter;
                        tex.minFilter = THREE.NearestFilter;
                        tex.wrapS = THREE.RepeatWrapping;
                        tex.wrapT = THREE.RepeatWrapping;
                        loadedBottomTexture = tex;
                        texturesLoaded++;
                        if (texturesLoaded === 3) createGrassMaterials();
                    }
                );
            } else {
                // Load texture for other blocks
                loader.load(
                    textureUrl,
                    (texture) => {
                        // Configure texture for pixelated Minecraft look
                        texture.magFilter = THREE.NearestFilter;
                        texture.minFilter = THREE.NearestFilter;
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;
                        
                        // Update block material with texture
                        if (block.material) {
                            block.material.map = texture;
                            block.material.needsUpdate = true;
                        }
                    },
                    undefined,
                    (error) => {
                        // Keep fallback color if texture fails to load
                        console.warn(`Failed to load texture ${textureName} for floating block`);
                    }
                );
            }
            
            // Helper function to bias random values towards edges (-1 or 1)
            // This creates a U-shaped distribution favoring borders
            const biasTowardsEdges = (random) => {
                // Map [0,1] to [-1,1] with bias towards edges
                // Use a power function to push values towards extremes
                const sign = random < 0.5 ? -1 : 1;
                const distance = random < 0.5 ? random * 2 : (random - 0.5) * 2;
                // Square the distance to bias towards edges (0 or 1)
                const biasedDistance = Math.pow(distance, 0.3); // Lower exponent = more bias to edges
                return sign * biasedDistance;
            };
            
            // Random starting position - biased towards borders
            block.position.x = biasTowardsEdges(Math.random()) * 5;
            block.position.y = biasTowardsEdges(Math.random()) * 5;
            block.position.z = biasTowardsEdges(Math.random()) * 5;

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

                // Wrap around screen edges - maintain border density
                const borderRange = 5;
                if (block.position.x > borderRange) block.position.x = -borderRange;
                if (block.position.x < -borderRange) block.position.x = borderRange;
                if (block.position.y > borderRange) block.position.y = -borderRange;
                if (block.position.y < -borderRange) block.position.y = borderRange;
                if (block.position.z > borderRange) block.position.z = -borderRange;
                if (block.position.z < -borderRange) block.position.z = borderRange;
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


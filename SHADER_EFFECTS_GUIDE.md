# Shader Effects Guide for Background Image

This guide explains different approaches to apply shader effects to the JPEG background (`1370592.jpeg`) currently used in the portfolio's main menu.

## Current Implementation

The background is currently set in `src/styles/minecraft.css`:
```css
.mc-bg {
    background-color: #2e2e2e; /* Fallback */
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/1370592.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
```

## Method 1: CSS Filters (Easiest)

**Pros:** Simple, native browser support, no JavaScript needed  
**Cons:** Limited effects, applied to entire element  
**Best for:** Quick color/lighting adjustments, blur effects

### Basic Filters
```css
.mc-bg {
    /* ... existing styles ... */
    filter: brightness(0.8) contrast(1.2) saturate(1.1) blur(1px);
    /* Can combine multiple filters */
}
```

### Available CSS Filters:
- `brightness()` - Adjust light/dark
- `contrast()` - Adjust contrast
- `saturate()` - Color saturation
- `blur()` - Gaussian blur
- `hue-rotate()` - Color shift
- `grayscale()` - Black & white
- `sepia()` - Vintage look
- `invert()` - Negative colors
- `opacity()` - Transparency

### Example: Minecraft-themed Filters
```css
/* Darker, more saturated (nether-like) */
.mc-bg.nether-shader {
    filter: brightness(0.7) contrast(1.3) saturate(1.4) hue-rotate(15deg);
}

/* Bright, washed out (end dimension) */
.mc-bg.end-shader {
    filter: brightness(1.2) contrast(0.9) saturate(0.8) blur(2px);
}

/* Classic minecraft feel */
.mc-bg.classic-shader {
    filter: brightness(0.9) contrast(1.1) saturate(0.95);
}
```

---

## Method 2: CSS Blend Modes (Layering Effects)

**Pros:** Creative mixing effects, no JavaScript  
**Cons:** Requires additional elements/overlays  
**Best for:** Color blending, atmospheric effects

### Structure:
```html
<div className="mc-bg-container">
    <div className="mc-bg-image"></div>
    <div className="mc-bg-overlay"></div>
    <div className="menu-container">...</div>
</div>
```

### CSS:
```css
.mc-bg-container {
    position: relative;
    width: 100%;
    height: 100vh;
}

.mc-bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/1370592.jpeg');
    background-size: cover;
    background-position: center;
}

.mc-bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,0,0,0.3), rgba(0,0,255,0.3));
    mix-blend-mode: multiply; /* or overlay, screen, color-dodge, etc. */
}
```

### Popular Blend Modes:
- `multiply` - Darkens
- `screen` - Lightens
- `overlay` - Mix of both
- `color-dodge` - Bright, vivid
- `color-burn` - Dark, intense
- `hard-light` - High contrast
- `soft-light` - Subtle enhancement

---

## Method 3: CSS Backdrop Filter (Modern Blur/Effects)

**Pros:** Blur content behind, modern look  
**Cons:** Limited browser support (use with fallback)  
**Best for:** Frosted glass effects, blur backgrounds

```css
.mc-bg {
    /* ... existing styles ... */
}

.menu-container {
    backdrop-filter: blur(10px) saturate(150%);
    background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent for blur effect */
}
```

---

## Method 4: Canvas with Image Processing (JavaScript)

**Pros:** Full pixel-level control, custom effects  
**Cons:** More complex, requires JavaScript  
**Best for:** Custom shaders, pixel manipulation, animated effects

### Basic Canvas Implementation:

```jsx
// In MainMenu.jsx or a new BackgroundShader component
import { useEffect, useRef } from 'react';

const BackgroundShader = () => {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.src = '/1370592.jpeg';
        img.onload = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Draw image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Apply pixel manipulation
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Example: Darken and increase saturation
            for (let i = 0; i < data.length; i += 4) {
                // Red
                data[i] = Math.min(255, data[i] * 0.8);
                // Green
                data[i + 1] = Math.min(255, data[i + 1] * 0.9);
                // Blue
                data[i + 2] = Math.min(255, data[i + 2] * 1.1);
                // Alpha (leave as is)
            }
            
            ctx.putImageData(imageData, 0, 0);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}
        />
    );
};
```

### Advanced Canvas Effects:
- **Sepia tone**
- **Pixelated (minecraft block effect)**
- **Chromatic aberration**
- **Animated color cycling**
- **Wave distortions**

---

## Method 5: WebGL Shaders (Most Powerful)

**Pros:** GPU-accelerated, unlimited custom effects  
**Cons:** Complex, steep learning curve  
**Best for:** Professional-grade effects, animated shaders

### Using Three.js (Recommended):

```bash
npm install three
```

```jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WebGLBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Load texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('/1370592.jpeg');
        
        // Custom shader material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: texture },
                uTime: { value: 0 },
                uBrightness: { value: 0.8 },
                uSaturation: { value: 1.2 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D uTexture;
                uniform float uTime;
                uniform float uBrightness;
                uniform float uSaturation;
                varying vec2 vUv;
                
                void main() {
                    vec4 color = texture2D(uTexture, vUv);
                    // Apply brightness
                    color.rgb *= uBrightness;
                    // Apply saturation
                    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
                    color.rgb = mix(vec3(gray), color.rgb, uSaturation);
                    // Add subtle wave distortion
                    vec2 uv = vUv + vec2(sin(uTime + vUv.y * 10.0) * 0.01, 0.0);
                    gl_FragColor = texture2D(uTexture, uv);
                }
            `
        });

        const plane = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(plane, material);
        scene.add(mesh);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            material.uniforms.uTime.value += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            renderer.dispose();
            material.dispose();
        };
    }, []);

    return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};
```

### Popular WebGL Shader Effects:
- **Animated color grading**
- **Distortion waves**
- **Chromatic aberration**
- **Bloom/glow effects**
- **Pixelated minecraft-style**
- **Dynamic lighting**
- **Parallax scrolling**

---

## Method 6: CSS with Pseudo-Elements (Hybrid Approach)

Combine CSS filters with pseudo-elements for layered effects:

```css
.mc-bg {
    position: relative;
    background-color: #2e2e2e;
}

.mc-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/1370592.jpeg');
    background-size: cover;
    background-position: center;
    filter: brightness(0.7) contrast(1.2);
    z-index: -1;
}

.mc-bg::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%);
    z-index: -1;
}
```

---

## Recommended Approach for Your Portfolio

### Quick Start (Method 1 - CSS Filters):
Start with CSS filters for immediate results. Add this to your `.mc-bg` class:

```css
.mc-bg {
    /* ... existing styles ... */
    filter: brightness(0.85) contrast(1.15) saturate(1.1);
    transition: filter 0.3s ease;
}

.mc-bg:hover {
    filter: brightness(0.9) contrast(1.2) saturate(1.2);
}
```

### Enhanced Version (Method 2 - Blend Modes):
For more creative effects, use blend modes with an overlay:

```css
.mc-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, 
        rgba(139, 69, 19, 0.2) 0%, 
        rgba(25, 25, 112, 0.2) 100%
    );
    mix-blend-mode: overlay;
    pointer-events: none;
}
```

### Advanced (Method 4 or 5):
If you want animated effects or pixel manipulation, use Canvas or WebGL. WebGL is better for performance with complex effects.

---

## Performance Considerations

1. **CSS Filters**: Fast, hardware-accelerated in modern browsers
2. **Canvas**: Can be slow for large images, but good for custom effects
3. **WebGL**: GPU-accelerated, best for performance with complex shaders
4. **Blend Modes**: Generally fast, depends on browser optimization

---

## Example: Rotating Shader Effects (Minecraft Version Styles)

Create different shader presets matching Minecraft versions:

```css
/* Classic Minecraft */
.mc-bg.shader-classic {
    filter: brightness(0.9) contrast(1.0) saturate(0.95);
}

/* Modern Minecraft (1.13+) */
.mc-bg.shader-modern {
    filter: brightness(1.0) contrast(1.1) saturate(1.05);
}

/* Bedrock Edition */
.mc-bg.shader-bedrock {
    filter: brightness(1.1) contrast(0.95) saturate(1.15);
}
```

Then toggle between them in React state or based on user preferences.


/*
===============================================================================
Earth Wireframe Module
-------------------------------------------------------------------------------
Renders a low-poly animated 3D globe using Three.js.
Designed as a lightweight visual enhancement for the World Clock panel.

The globe inherits its color dynamically from the CSS variable:
--globeColor

Dependencies:
- Three.js (r128 or compatible)
===============================================================================
*/

const container = document.getElementById("earthContainer");

if (container && window.THREE) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 2);
    const material = new THREE.MeshBasicMaterial({
        color: '#8cc8ff',
        wireframe: true
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    camera.position.z = 3;

    let frameCount = 0;

    function updateColorFromCSS() {
        if (frameCount % 10 !== 0) return;

        const panelColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--globeColor')
            .trim() || '#8cc8ff';
        
        if (material.color.getStyle() !== panelColor.toLowerCase()) {
            material.color.set(panelColor);
        }
    }

    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const width = entry.contentRect.width;
            const height = entry.contentRect.height;
            if(width > 0 && height > 0) {
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        }
    });
    resizeObserver.observe(container);

    function animate() {
        requestAnimationFrame(animate);
        
        frameCount++;
        updateColorFromCSS();

        earth.rotation.y += 0.003;
        earth.rotation.x += 0.0005;

        renderer.render(scene, camera);
    }

    animate();
}
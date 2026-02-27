/*
===============================================================================
Earth Wireframe Module
-------------------------------------------------------------------------------
Renders a low-poly animated 3D globe using Three.js.
Designed as a lightweight visual enhancement for the World Clock panel.

The globe inherits its color dynamically from the CSS variable:
--wclockText

Dependencies:
- Three.js (r128 or compatible)
===============================================================================
*/

const container = document.getElementById("earthContainer");

if (container && window.THREE) {

    // Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    // Transparent renderer to blend with dashboard background
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Low-poly geometry for retro wireframe aesthetic
    const geometry = new THREE.IcosahedronGeometry(1, 2);

    // Retrieve dynamic color from CSS variable
    const panelColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--wclockText')
        .trim() || '#8cc8ff'; // Fallback color just in case

    const material = new THREE.MeshBasicMaterial({
        color: panelColor,
        wireframe: true
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Position camera slightly away from object center
    camera.position.z = 3;

    // --- RESPONSIVE FIX ---
    // Update camera and renderer when the container changes size
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

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Subtle continuous rotation for ambient motion
        earth.rotation.y += 0.003;
        earth.rotation.x += 0.0005;

        renderer.render(scene, camera);
    }

    animate();
}
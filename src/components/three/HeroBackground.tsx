'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';


const HeroBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear existing canvas if any
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    
    mountRef.current.appendChild(renderer.domElement);

    // Create a vibrant particle system
    const particleCount = 1500;
    const particles = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    // Create particle positions and colors
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position in a spherical distribution with some randomness
      const radius = 30 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      posArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i3 + 2] = radius * Math.cos(phi);
      
      // Vibrant colors (blues, purples, cyans, pinks, greens)
      const colorChoice = Math.floor(Math.random() * 5);
      switch (colorChoice) {
        case 0: // Blue
          colorArray[i3] = 0.2 + Math.random() * 0.8; // R
          colorArray[i3 + 1] = 0.4 + Math.random() * 0.6; // G
          colorArray[i3 + 2] = 0.8 + Math.random() * 0.2; // B
          break;
        case 1: // Purple
          colorArray[i3] = 0.4 + Math.random() * 0.6; // R
          colorArray[i3 + 1] = 0.2 + Math.random() * 0.3; // G
          colorArray[i3 + 2] = 0.7 + Math.random() * 0.3; // B
          break;
        case 2: // Cyan
          colorArray[i3] = 0.1 + Math.random() * 0.2; // R
          colorArray[i3 + 1] = 0.7 + Math.random() * 0.3; // G
          colorArray[i3 + 2] = 0.8 + Math.random() * 0.2; // B
          break;
        case 3: // Pink
          colorArray[i3] = 0.8 + Math.random() * 0.2; // R
          colorArray[i3 + 1] = 0.2 + Math.random() * 0.3; // G
          colorArray[i3 + 2] = 0.6 + Math.random() * 0.4; // B
          break;
        case 4: // Green
          colorArray[i3] = 0.1 + Math.random() * 0.3; // R
          colorArray[i3 + 1] = 0.7 + Math.random() * 0.3; // G
          colorArray[i3 + 2] = 0.3 + Math.random() * 0.3; // B
          break;
      }
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Particle material with vibrant colors
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Create floating geometric shapes with vibrant materials
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.3, 16, 32),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.ConeGeometry(0.7, 1.5, 8),
      new THREE.DodecahedronGeometry(0.8, 0),
      new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8),
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.CylinderGeometry(0.7, 0.7, 1.2, 16),
      new THREE.SphereGeometry(0.8, 16, 16)
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ 
        color: 0x3b82f6, // blue-500
        wireframe: true,
        transparent: true,
        opacity: 0.85
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x8b5cf6, // violet-500
        wireframe: true,
        transparent: true,
        opacity: 0.85
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x06b6d4, // cyan-500
        wireframe: true,
        transparent: true,
        opacity: 0.85
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0xec4899, // pink-500
        wireframe: true,
        transparent: true,
        opacity: 0.85
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x10b981, // emerald-500
        wireframe: true,
        transparent: true,
        opacity: 0.85
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0xf59e0b, // amber-500
        wireframe: true,
        transparent: true,
        opacity: 0.85
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0xef4444, // red-500
        wireframe: true,
        transparent: true,
        opacity: 0.85
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x8b5cf6, // violet-500
        wireframe: true,
        transparent: true,
        opacity: 0.85
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x06b6d4, // cyan-500
        wireframe: true,
        transparent: true,
        opacity: 0.85
      })
    ];

    const objects: THREE.Mesh[] = [];
    const speeds: { x: number; y: number; z: number }[] = [];
    const positions: { x: number; y: number; z: number }[] = [];
    const rotationAxes: { x: number; y: number; z: number }[] = [];
    const orbitRadii: number[] = [];
    const orbitSpeeds: number[] = [];
    const sizeVariations: number[] = [];

    for (let i = 0; i < 25; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      // Random position in a sphere
      const radius = 30 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
      mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
      mesh.position.z = radius * Math.cos(phi);
      
      // Store initial positions
      positions.push({
        x: mesh.position.x,
        y: mesh.position.y,
        z: mesh.position.z
      });
      
      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      // Random scale with mix of big and small
      const scale = 0.8 + Math.random() * 3.2; // Sizes from 0.8 to 4.0
      mesh.scale.set(scale, scale, scale);
      sizeVariations.push(scale);
      
      scene.add(mesh);
      objects.push(mesh);
      
      // Random rotation speeds
      speeds.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.04
      });
      
      // Random rotation axes
      rotationAxes.push({
        x: Math.random(),
        y: Math.random(),
        z: Math.random()
      });
      
      // Orbit parameters
      orbitRadii.push(8 + Math.random() * 20);
      orbitSpeeds.push(0.1 + Math.random() * 0.6);
    }

    // Position camera
    camera.position.z = 50;

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mouse movement effect with enhanced sensitivity
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop with enhanced movement
    let animationFrameId: number;
    const clock = new THREE.Clock();
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      // Smooth mouse movement with increased sensitivity
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      
      // Rotate particle system slowly with varying speeds
      particleSystem.rotation.x = elapsedTime * 0.03;
      particleSystem.rotation.y = elapsedTime * 0.025;
      
      // Move objects with more dynamic patterns
      objects.forEach((obj, index) => {
        // Rotate objects around their own axes with varying speeds
        obj.rotation.x += speeds[index].x * (0.5 + sizeVariations[index] * 0.1);
        obj.rotation.y += speeds[index].y * (0.5 + sizeVariations[index] * 0.1);
        obj.rotation.z += speeds[index].z * (0.5 + sizeVariations[index] * 0.1);
        
        // Complex 3D orbital movement
        const timeFactor = elapsedTime * orbitSpeeds[index] * (0.5 + sizeVariations[index] * 0.1);
        const orbitRadius = orbitRadii[index];
        
        // Create a complex 3D path
        const xMovement = Math.sin(timeFactor) * Math.cos(timeFactor * 0.8) * orbitRadius;
        const yMovement = Math.cos(timeFactor) * Math.sin(timeFactor * 0.6) * orbitRadius;
        const zMovement = Math.sin(timeFactor * 0.4) * orbitRadius * 0.7;
        
        obj.position.x = positions[index].x + xMovement;
        obj.position.y = positions[index].y + yMovement;
        obj.position.z = positions[index].z + zMovement;
        
        // Add pulsing effect with varying intensity based on size
        const pulse = 0.8 + Math.sin(elapsedTime * 4 + index) * 0.2;
        obj.scale.setScalar(pulse * sizeVariations[index]);
      });
      
      // Enhanced camera movement based on mouse with parallax effect
      camera.position.x += (mouseX * 15 - camera.position.x) * 0.08;
      camera.position.y += (mouseY * 15 - camera.position.y) * 0.08;
      
      // Add subtle camera rotation based on mouse for 3D effect
      camera.rotation.y = mouseX * 0.2;
      camera.rotation.x = mouseY * 0.2;
      
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      particleMaterial.dispose();
      particles.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default HeroBackground;
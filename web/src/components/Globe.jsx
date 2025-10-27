import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Hook to track scroll progress
function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
}

// Major cities coordinates (lat, lon)
const cities = [
  { name: 'New York', lat: 40.7128, lon: -74.0060, color: '#fbbf24' },
  { name: 'London', lat: 51.5074, lon: -0.1278, color: '#3b82f6' },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, color: '#ef4444' },
  { name: 'Paris', lat: 48.8566, lon: 2.3522, color: '#8b5cf6' },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708, color: '#10b981' },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198, color: '#f59e0b' },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, color: '#06b6d4' },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, color: '#ec4899' },
  { name: 'Toronto', lat: 43.6532, lon: -79.3832, color: '#f43f5e' },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437, color: '#facc15' },
  { name: 'Berlin', lat: 52.5200, lon: 13.4050, color: '#14b8a6' },
  { name: 'Moscow', lat: 55.7558, lon: 37.6173, color: '#f97316' },
  { name: 'São Paulo', lat: -23.5505, lon: -46.6333, color: '#22c55e' },
  { name: 'Mexico City', lat: 19.4326, lon: -99.1332, color: '#a855f7' },
  { name: 'Hong Kong', lat: 22.3193, lon: 114.1694, color: '#fb923c' },
  { name: 'Seoul', lat: 37.5665, lon: 126.9780, color: '#e11d48' },
  { name: 'Bangkok', lat: 13.7563, lon: 100.5018, color: '#84cc16' },
  { name: 'Istanbul', lat: 41.0082, lon: 28.9784, color: '#06b6d4' },
  { name: 'Melbourne', lat: -37.8136, lon: 144.9631, color: '#8b5cf6' },
  { name: 'Vancouver', lat: 49.2827, lon: -123.1207, color: '#10b981' },
  { name: 'Miami', lat: 25.7617, lon: -80.1918, color: '#f59e0b' },
  { name: 'Delhi', lat: 28.6139, lon: 77.2090, color: '#ec4899' },
  { name: 'Beijing', lat: 39.9042, lon: 116.4074, color: '#ef4444' },
  { name: 'Shanghai', lat: 31.2304, lon: 121.4737, color: '#fbbf24' },
];

// Convert lat/lon to 3D coordinates on sphere
function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
}

// City marker component
function CityMarker({ position, color, scale = 1 }) {
  const markerRef = useRef();
  
  useFrame((state) => {
    if (markerRef.current) {
      // Pulse animation
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 1;
      markerRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse);
    }
  });
  
  return (
    <mesh ref={markerRef} position={position}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
      {/* Outer glow ring */}
      <mesh scale={[2, 2, 0.1]}>
        <ringGeometry args={[0.03, 0.05, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </mesh>
  );
}

// Animated route line between two cities
function Route({ start, end, color }) {
  const lineRef = useRef();
  const particleRef = useRef();
  const [progress, setProgress] = useState(0);
  
  // Create curved path between two points
  const curve = useMemo(() => {
    const midPoint = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(2.3); // Arc height
    
    return new THREE.QuadraticBezierCurve3(start, midPoint, end);
  }, [start, end]);
  
  const points = useMemo(() => curve.getPoints(50), [curve]);
  
  useFrame((state) => {
    // Animate particle along the route
    const speed = 0.3;
    setProgress((prev) => (prev + speed * 0.01) % 1);
    
    if (particleRef.current) {
      const point = curve.getPoint(progress);
      particleRef.current.position.copy(point);
    }
    
    // Animate line opacity
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  
  return (
    <group>
      {/* Route line */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.4} linewidth={2} />
      </line>
      
      {/* Traveling particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={color} />
        {/* Particle trail glow */}
        <pointLight color={color} intensity={0.5} distance={0.5} />
      </mesh>
    </group>
  );
}

function Earth({ scrollProgress }) {
  const meshRef = useRef();
  const sunLightRef = useRef();
  const moonLightRef = useRef();
  
  // Generate city positions
  const cityPositions = useMemo(() => 
    cities.map(city => ({
      ...city,
      position: latLonToVector3(city.lat, city.lon, 2.05)
    })), 
  []);
  
  // Generate routes between cities
  const routes = useMemo(() => {
    const routePairs = [
      // North America routes
      [0, 1], // NY to London
      [0, 8], // NY to Toronto
      [0, 9], // NY to Los Angeles
      [0, 20], // NY to Miami
      [8, 19], // Toronto to Vancouver
      [9, 2], // LA to Tokyo
      [9, 13], // LA to Mexico City
      [13, 12], // Mexico City to São Paulo
      
      // Europe routes
      [1, 3], // London to Paris
      [1, 10], // London to Berlin
      [1, 17], // London to Istanbul
      [3, 4], // Paris to Dubai
      [3, 10], // Paris to Berlin
      [10, 11], // Berlin to Moscow
      [11, 22], // Moscow to Beijing
      
      // Middle East / Asia routes
      [4, 5], // Dubai to Singapore
      [4, 7], // Dubai to Mumbai
      [4, 17], // Dubai to Istanbul
      [5, 2], // Singapore to Tokyo
      [5, 14], // Singapore to Hong Kong
      [5, 16], // Singapore to Bangkok
      [7, 21], // Mumbai to Delhi
      [7, 4], // Mumbai to Dubai
      [14, 2], // Hong Kong to Tokyo
      [14, 15], // Hong Kong to Seoul
      [14, 23], // Hong Kong to Shanghai
      [15, 2], // Seoul to Tokyo
      [16, 5], // Bangkok to Singapore
      [22, 23], // Beijing to Shanghai
      [23, 2], // Shanghai to Tokyo
      [21, 22], // Delhi to Beijing
      
      // Pacific / Australia routes
      [2, 6], // Tokyo to Sydney
      [2, 15], // Tokyo to Seoul
      [6, 18], // Sydney to Melbourne
      [6, 5], // Sydney to Singapore
      [19, 2], // Vancouver to Tokyo
      [19, 9], // Vancouver to LA
      
      // Transatlantic / Cross-continental
      [12, 1], // São Paulo to London
      [12, 20], // São Paulo to Miami
      [20, 13], // Miami to Mexico City
      [0, 3], // NY to Paris
      [9, 6], // LA to Sydney
      [17, 11], // Istanbul to Moscow
    ];
    
    return routePairs.map(([i, j]) => ({
      start: cityPositions[i].position,
      end: cityPositions[j].position,
      color: cityPositions[i].color,
    }));
  }, [cityPositions]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = scrollProgress * Math.PI * 4;
      meshRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.2;
    }
    
    if (sunLightRef.current && moonLightRef.current) {
      const sunAngle = scrollProgress * Math.PI * 2;
      sunLightRef.current.position.x = Math.cos(sunAngle) * 6;
      sunLightRef.current.position.y = Math.sin(sunAngle) * 6;
      sunLightRef.current.position.z = 3;
      
      const sunHeight = Math.sin(sunAngle);
      sunLightRef.current.intensity = Math.max(sunHeight * 2, 0);
      
      moonLightRef.current.position.x = -Math.cos(sunAngle) * 6;
      moonLightRef.current.position.y = -Math.sin(sunAngle) * 6;
      moonLightRef.current.position.z = 3;
      moonLightRef.current.intensity = Math.max(-sunHeight * 1.5, 0.3);
    }
  });

  const phase = Math.sin(scrollProgress * Math.PI * 2);
  const isDaytime = phase > 0;

  return (
    <>
      <ambientLight intensity={isDaytime ? 0.4 : 0.2} />
      
      <directionalLight
        ref={sunLightRef}
        color="#FDB813"
        intensity={2}
        castShadow
      />
      
      <directionalLight
        ref={moonLightRef}
        color="#B8D7F0"
        intensity={1}
      />
      
      <pointLight
        position={[0, 0, 5]}
        intensity={0.5}
        color={isDaytime ? "#3b82f6" : "#1e3a8a"}
      />
      
      {/* Globe wireframe */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color={isDaytime ? "#3b82f6" : "#1e40af"}
          wireframe={true}
          opacity={0.3}
          transparent={true}
          emissive={isDaytime ? "#1e40af" : "#0a1929"}
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* City markers */}
      {cityPositions.map((city, index) => (
        <CityMarker
          key={city.name}
          position={city.position}
          color={city.color}
          scale={1}
        />
      ))}
      
      {/* Airline routes */}
      {routes.map((route, index) => (
        <Route
          key={index}
          start={route.start}
          end={route.end}
          color={route.color}
        />
      ))}
      
      {!isDaytime && <Stars />}
    </>
  );
}

function Stars() {
  const starsRef = useRef();
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const starGeometry = new THREE.BufferGeometry();
  const starCount = 200;
  const positions = new Float32Array(starCount * 3);
  
  for (let i = 0; i < starCount * 3; i += 3) {
    const radius = 8 + Math.random() * 4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);
  }
  
  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return (
    <points ref={starsRef} geometry={starGeometry}>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Globe() {
  const scrollProgress = useScrollProgress();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render globe on mobile for better performance
  if (isMobile) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 opacity-50" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Earth scrollProgress={scrollProgress} />
      </Canvas>
      
      {/* Scroll instruction */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-70">
        Scroll to rotate the globe
      </div>
    </div>
  );
}
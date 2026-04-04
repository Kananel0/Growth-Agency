'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current!
    const W = el.clientWidth, H = el.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.z = 3.5

    // Particle sphere
    const geo  = new THREE.BufferGeometry()
    const N    = 3000
    const pos  = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 1.4 + (Math.random() - 0.5) * 0.6
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i*3+2] = r * Math.cos(phi)
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat  = new THREE.PointsMaterial({ color: 0xC9FF47, size: 0.012, transparent: true, opacity: 0.7 })
    const pts  = new THREE.Points(geo, mat)
    scene.add(pts)

    // Inner wireframe
    const wGeo  = new THREE.IcosahedronGeometry(1.0, 1)
    const wMat  = new THREE.MeshBasicMaterial({ color: 0xC9FF47, wireframe: true, transparent: true, opacity: 0.08 })
    scene.add(new THREE.Mesh(wGeo, wMat))

    let mx = 0, my = 0
    const onMouse = (e: MouseEvent) => { mx = (e.clientX/W - 0.5) * 0.5; my = (e.clientY/H - 0.5) * 0.5 }
    window.addEventListener('mousemove', onMouse)

    let frame = 0
    const animate = () => {
      frame++
      pts.rotation.y += 0.0015 + mx * 0.003
      pts.rotation.x += 0.0005 + my * 0.002
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight
      camera.aspect = w / h; camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose(); el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />
}

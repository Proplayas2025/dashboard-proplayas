'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from '@/lib/cookies'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const role = getCookie('role')
    if (role === 'admin' || role === 'node_leader' || role === 'member') {
      router.replace('/dashboard')
    } else {
      router.replace('/login') // o alguna pantalla pública o de error
    }
  }, [])

  return null
}
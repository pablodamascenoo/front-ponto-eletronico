'use client'

import { Session } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/navigation'
import React from 'react'


export default function HandleSession() { 
    const router = useRouter()

    router.push('/api/auth/login')

  return (
    <div></div>
  )
}

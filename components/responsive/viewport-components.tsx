'use client'

import { useEffect, useState } from 'react'

interface MobileOnlyProps {
  children: React.ReactNode
  className?: string
}

interface DesktopOnlyProps {
  children: React.ReactNode
  className?: string
}

export function MobileOnly({ children, className }: MobileOnlyProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isMobile) return null

  return <div className={className}>{children}</div>
}

export function DesktopOnly({ children, className }: DesktopOnlyProps) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  if (!isDesktop) return null

  return <div className={className}>{children}</div>
}

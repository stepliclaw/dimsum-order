'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  mobilePadding?: string
  tabletPadding?: string
  desktopPadding?: string
}

export function ResponsiveContainer({
  children,
  className,
  mobilePadding = 'p-4',
  tabletPadding = 'p-6',
  desktopPadding = 'p-8',
}: ResponsiveContainerProps) {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')

  useEffect(() => {
    const checkViewport = () => {
      if (window.innerWidth >= 1024) {
        setViewport('desktop')
      } else if (window.innerWidth >= 768) {
        setViewport('tablet')
      } else {
        setViewport('mobile')
      }
    }

    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  const paddingClass =
    viewport === 'desktop' ? desktopPadding :
    viewport === 'tablet' ? tabletPadding :
    mobilePadding

  return (
    <div className={cn('w-full max-w-7xl mx-auto', paddingClass, className)}>
      {children}
    </div>
  )
}

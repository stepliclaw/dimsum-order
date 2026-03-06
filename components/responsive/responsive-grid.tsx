'use client'

import { cn } from '@/lib/utils'

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  mobileColumns?: 1 | 2
  tabletColumns?: 2 | 3
  desktopColumns?: 3 | 4
  gap?: string
}

export function ResponsiveGrid({
  children,
  className,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3,
  gap = 'gap-4',
}: ResponsiveGridProps) {
  const gridClasses = cn(
    'grid w-full',
    gap,
    mobileColumns === 1 && 'grid-cols-1',
    mobileColumns === 2 && 'grid-cols-2',
    `sm:grid-cols-${tabletColumns}`,
    `lg:grid-cols-${desktopColumns}`,
    className
  )

  return (
    <div className={gridClasses}>
      {children}
    </div>
  )
}

'use client'

import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface ResponsiveImageProps extends Omit<ImageProps, 'sizes'> {
  className?: string
  mobileSize?: string
  tabletSize?: string
  desktopSize?: string
  lazy?: boolean
}

export function ResponsiveImage({
  className,
  mobileSize = '(max-width: 640px) 100vw',
  tabletSize = '(max-width: 1024px) 50vw',
  desktopSize = '33vw',
  lazy = true,
  ...props
}: ResponsiveImageProps) {
  const sizes = `${mobileSize}, ${tabletSize}, ${desktopSize}`

  return (
    <div className={cn('relative w-full', className)}>
      <Image
        {...(props as ImageProps)}
        sizes={sizes}
        loading={lazy ? 'lazy' : 'eager'}
      />
    </div>
  )
}

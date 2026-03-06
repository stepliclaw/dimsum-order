'use client'

import { useEffect } from 'react'
import { useTextSizeStore } from '@/lib/store'
import { updateTextSizeCSS } from '@/lib/utils'

export function TextSizeProvider({ children }: { children: React.ReactNode }) {
  const textSize = useTextSizeStore((state) => state.textSize)

  useEffect(() => {
    updateTextSizeCSS(textSize)
  }, [textSize])

  useEffect(() => {
    const stored = localStorage.getItem('dimsum-text-size')
    if (stored && ['small', 'medium', 'large'].includes(stored)) {
      updateTextSizeCSS(stored as 'small' | 'medium' | 'large')
    }
  }, [])

  return <>{children}</>
}

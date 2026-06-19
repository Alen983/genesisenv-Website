'use client'

import { createContext, useContext } from 'react'

/**
 * Home intro: `false` while the splash wordmark is shown; `true` once it flies to the hero.
 * `undefined` when no provider (treat as complete / normal hero).
 */
export const IntroSplashCompleteContext = createContext<boolean | undefined>(undefined)

export function useIntroSplashComplete(): boolean {
  return useContext(IntroSplashCompleteContext) !== false
}

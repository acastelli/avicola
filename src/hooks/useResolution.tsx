import { useTheme } from '@material-ui/core'
import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type h1Type = 'h1' | 'h4'

type h2Type = 'h2' | 'h5'

type h3Type = 'h3' | 'h6'

type bodyType = 'body1' | 'body2'

type UseResolutionType = {
  breakpoint: Breakpoint
  isXs: boolean
  isSm: boolean
  h1: h1Type
  h2: h2Type
  h3: h3Type
  body: bodyType
}

const ResolutionContext = createContext<UseResolutionType | undefined>(
  undefined,
)

interface ResolutionProviderProps {
  children: ReactNode
}

export const ResolutionProvider = ({ children }: ResolutionProviderProps) => {
  const [width, setWidth] = useState(0)
  const theme = useTheme()

  useLayoutEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateWidth)
    updateWidth()
    return () => window.removeEventListener('resize', updateWidth)
  }, [setWidth])

  const breakpoint = useMemo<Breakpoint>(() => {
    if (width > -1 && width <= theme.breakpoints.values['sm']) return 'xs'
    else if (
      width > theme.breakpoints.values['sm'] &&
      width <= theme.breakpoints.values['md']
    )
      return 'sm'
    else if (
      width > theme.breakpoints.values['md'] &&
      width <= theme.breakpoints.values['lg']
    )
      return 'md'
    else if (
      width > theme.breakpoints.values['lg'] &&
      width <= theme.breakpoints.values['xl']
    )
      return 'lg'
    else return 'xl'
  }, [width, theme])

  const isXs = useMemo(() => breakpoint === 'xs' || breakpoint === 'sm', [
    breakpoint,
  ])
  const isSm = useMemo(() => breakpoint === 'sm', [breakpoint])

  const h1 = useMemo<h1Type>(() => (isXs ? 'h4' : 'h1'), [isXs])

  const h2 = useMemo<h2Type>(() => (isXs ? 'h5' : 'h2'), [isXs])

  const h3 = useMemo<h3Type>(() => (isXs ? 'h6' : 'h3'), [isXs])

  const body = useMemo<bodyType>(() => (isXs ? 'body2' : 'body1'), [isXs])

  const value = {
    breakpoint,
    isXs,
    isSm,
    h1,
    h2,
    h3,
    body,
  }

  return (
    <ResolutionContext.Provider value={value}>
      {children}
    </ResolutionContext.Provider>
  )
}

export const useResolution = () => {
  const ctx = useContext(ResolutionContext)
  if (!ctx) {
    throw new Error('You are using Resolution out of context.')
  }
  return ctx
}

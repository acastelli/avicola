import axios, { AxiosError } from 'axios'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { API } from 'utils/constants'
import { Callbacks, parseError } from 'utils/helpers'

const API_URL = process.env.REACT_APP_API_URL || ''

const headers = {
  headers: { 'content-type': 'application/json' },
}

type UseStockType = {
  dolar: number | undefined
  dolarLoader: boolean
  getDolar: (callback?: Callbacks) => void
  editDolar: (newValue: number, callback?: Callbacks) => void
  editPortionFormula: (
    idFormula: number,
    newPortionQty: number,
    callback?: Callbacks,
  ) => void
}

type Cotizacion = {
  id: number
  quantity: number
  currency: string
}

const StockContext = createContext<UseStockType | undefined>(undefined)

interface StockProviderProps {
  children: ReactNode
}

export const StockProvider = ({ children }: StockProviderProps) => {
  const [dolar, setDolar] = useState<number | undefined>()
  const [dolarLoader, setDolarLoader] = useState(false)

  const getDolar = useCallback(
    (callbacks?: Callbacks) => {
      setDolarLoader(true)
      axios
        .get(`${API_URL}${API.COTIZACION}?currency=USD`, headers)
        .then((response) => {
          !!response && setDolar((response.data as Cotizacion).quantity)
          setDolarLoader(false)
          if (callbacks?.success) callbacks.success()
        })
        .catch((error: AxiosError) => {
          if (callbacks?.error)
            callbacks.error(parseError(error.response?.data))
        })
        .finally(() => {
          if (callbacks?.finally) callbacks.finally()
        })
    },
    [setDolar],
  )

  const editDolar = useCallback(
    (newValue: number, callbacks?: Callbacks) => {
      const newData = {
        quantity: newValue,
        currency: 'USD',
      }
      axios
        .post(`${API_URL}${API.COTIZACION}`, newData, headers)
        .then((response) => {
          setDolar(newValue)
          if (callbacks?.success) callbacks.success()
        })
        .catch((error: AxiosError) => {
          if (callbacks?.error)
            callbacks.error(parseError(error.response?.data))
        })
        .finally(() => {
          if (callbacks?.finally) callbacks.finally()
        })
    },
    [setDolar],
  )

  const editPortionFormula = useCallback(
    (idFormula: number, newPortionQty: number, callbacks?: Callbacks) => {
      let date = new Date().toISOString().slice(0, 10)
      axios
        .put(
          `${API_URL}${API.FORMULAS}/${idFormula}/portionsConsumed?quantity_c=${newPortionQty}&date=${date}`,
          headers,
        )
        .then((response) => {
          if (callbacks?.success) callbacks.success()
        })
        .catch((error: AxiosError) => {
          if (callbacks?.error)
            callbacks.error(parseError(error.response?.data))
        })
        .finally(() => {
          if (callbacks?.finally) callbacks.finally()
        })
    },
    [],
  )

  const value = {
    dolar,
    dolarLoader,
    getDolar,
    editDolar,
    editPortionFormula,
  }

  return <StockContext.Provider value={value}>{children}</StockContext.Provider>
}

export const useStock = () => {
  const ctx = useContext(StockContext)
  if (!ctx) {
    throw new Error('You are using Stock out of context.')
  }
  return ctx
}

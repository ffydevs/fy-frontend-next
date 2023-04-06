import { api } from '@/pages/api/apis/api'
import { LoginResponse } from '@/pages/api/providers/auth.provider'
import { createContext, useContext, useState, ReactNode } from 'react'

type AuthContextData = {
  user: LoginResponse | undefined
  signIn: (username: string, password: string) => void
  signOut: () => void
  setError: (error: string) => void
  error: string
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<LoginResponse | undefined>(undefined)
  const [error, setError] = useState('')

  const signIn = async (username: string, password: string) => {
    try {
      const response = await api.post(`/login`, { username, password })

      if (response.data) {
        localStorage.setItem('fyToken', response.data.access_token)
        setUser(response.data)
        setError('')
      }
    } catch (error) {
      setUser(undefined)
      setError('Usuário ou senha inválidos')
    }
  }

  const signOut = () => {
    localStorage.removeItem('fyToken')
    setUser(undefined)
    setError('')
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, setError, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
import { AuthProvider } from '@/hooks/ContextAuth'
import ContextDashboardAdminProvider from '@/hooks/ContextDashboardAdmin'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import React from 'react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
// 3. extend the theme
const theme = extendTheme({ config })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ContextDashboardAdminProvider>
          <Component {...pageProps} />
        </ContextDashboardAdminProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

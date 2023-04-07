import { useAuth } from '@/hooks/ContextAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function DashboardUser() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }

    if (user?.userType.name !== 'user') {
      router.replace('/login')
    }
  }, [router, user])

  return <></>
}
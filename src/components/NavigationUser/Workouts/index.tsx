import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findWorkoutsByUserId,
  findWorkoutsNamesByUserId,
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import { Tab, TabList, Tabs } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/ContextAuth'
import { WorkoutsList } from './WorkoutsList'

export function Workouts() {
  const router = useRouter()
  const { user } = useAuth()
  const [workoutsNames, setWorkoutsNames] = useState<IWorkout[]>([])
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('')
  const [workouts, setWorkouts] = useState<IWorkout[]>([])

  const fetchWorkoutsNames = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      const response = await findWorkoutsNamesByUserId(
        token,
        user?.id as string,
      )

      setWorkoutsNames(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router, user?.id])

  const fetchUserWorkouts = useCallback(async () => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      if (!selectedWorkoutId) {
        setSelectedWorkoutId(workoutsNames[0]?.id as string)
      }

      const response = await findWorkoutsByUserId(
        token,
        selectedWorkoutId as string,
        user?.id as string,
      )

      setWorkouts(response)
    } catch (error) {
      console.error(error)
      // Implementar mensagem personalizada
      router.push('/login')
    }
  }, [router, selectedWorkoutId, user?.id, workoutsNames])

  useEffect(() => {
    fetchWorkoutsNames()
  }, [fetchWorkoutsNames])

  useEffect(() => {
    if (workoutsNames.length > 0) {
      if (!selectedWorkoutId) {
        setSelectedWorkoutId(workoutsNames[0]?.id as string)
      }
      fetchUserWorkouts()
    }
  }, [fetchUserWorkouts, selectedWorkoutId, workoutsNames])

  return (
    <>
      <Tabs variant="soft-rounded" colorScheme={'whiteAlpha'}>
        <TabList>
          {workoutsNames?.map((workout: IWorkout) => (
            <Tab
              key={workout.id}
              onClick={() => setSelectedWorkoutId(workout.id!)}
              mb={4}
            >
              Workout: {workout.workoutType}
            </Tab>
          ))}
        </TabList>
        <WorkoutsList workouts={workouts} />
      </Tabs>
    </>
  )
}

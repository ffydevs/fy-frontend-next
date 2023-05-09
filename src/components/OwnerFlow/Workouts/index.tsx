import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  findWorkoutsByUserId,
  findWorkoutsNamesByUserId,
  IWorkout,
} from '@/pages/api/providers/workouts.provider'
import { Tab, TabList, Tabs, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { WorkoutsLists } from './WorkoutsList'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import WorkoutsHeader from './WorkoutsHeader'

export function Workouts() {
  const router = useRouter()
  const { selectedUserId, selectedWorkoutId, setSelectedWorkoutId } =
    useOwnerIsFetchingStore()
  const { isFetchingWorkoutsNames } = useOwnerIsFetchingStore()
  const [workoutsNames, setWorkoutsNames] = useState<IWorkout[]>([])
  const [workouts, setWorkouts] = useState<IWorkout[]>([])
  const toast = useToast()

  useEffect(() => {
    const fetchWorkoutsNames = async () => {
      try {
        const token = getUserToken()

        if (!token) {
          toast({
            title: 'Sua sessão expirou.',
            description: 'Por favor, faça login novamente.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          router.push('/login')
          return
        }

        const response = await findWorkoutsNamesByUserId(
          token,
          selectedUserId as string,
        )

        setWorkoutsNames(response)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao buscar workouts.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    fetchWorkoutsNames()
  }, [isFetchingWorkoutsNames, router, selectedUserId, toast])

  useEffect(() => {
    if (workoutsNames.length > 0) {
      if (!selectedWorkoutId) {
        setSelectedWorkoutId(workoutsNames[0]?.id as string)
      }
      const fetchUserWorkouts = async () => {
        try {
          const token = getUserToken()

          if (!token) {
            toast({
              title: 'Sua sessão expirou.',
              description: 'Por favor, faça login novamente.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
            router.push('/login')
            return
          }
          const response = await findWorkoutsByUserId(
            token,
            selectedWorkoutId as string,
            selectedUserId as string,
          )

          setWorkouts(response)
        } catch (error) {
          console.error(error)
          toast({
            title: 'Erro ao buscar workouts.',
            description: 'Por favor, tente novamente.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      }
      fetchUserWorkouts()
    }
  }, [
    selectedWorkoutId,
    workoutsNames,
    setSelectedWorkoutId,
    router,
    selectedUserId,
    isFetchingWorkoutsNames,
    toast,
  ])

  return (
    <>
      <WorkoutsHeader />
      <Tabs size="md" variant="enclosed" colorScheme={'purple'} isLazy>
        <TabList>
          {workoutsNames?.map((workout: IWorkout) => (
            <Tab
              key={workout.id}
              onClick={() => setSelectedWorkoutId(workout.id!)}
              mb={4}
            >
              {workout.workoutType}
            </Tab>
          ))}
        </TabList>
        <WorkoutsLists setWorkouts={setWorkouts} workouts={workouts} />
      </Tabs>
    </>
  )
}
import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  useToast,
  SimpleGrid,
  Stack,
  Select,
  Wrap,
  Container,
  Heading,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ChartLine } from '../Graphics'
import {
  IExercise,
  findExerciseByMuscleGroupAndUser,
  findMuscleGroupByUser,
} from '@/pages/api/providers/exercises.provider'
import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import { getHistory } from '@/pages/api/providers/sets.provider'
import Repetitions from './Repetitions'
import { findUserWeights } from '@/pages/api/providers/user-feedbacks.provider'

interface GraphicsProps {
  userId?: string
}

export default function Graphics({ userId }: GraphicsProps) {
  const router = useRouter()
  const toast = useToast()
  const { selectedUserId } = useOwnerIsFetchingStore()
  const [exerciseId, setExerciseId] = useState<string>()
  const [exercises, setExercises] = useState<IExercise[]>([])
  const [muscleGroups, setMuscleGroups] = useState<IExercise[]>([])
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('')
  const [periods] = useState([7, 15, 30, 60])
  const [selectedPeriod, setSelectedPeriod] = useState('30')
  const [series, setSeries] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [userWeightsSeries, setUserWeightsSeries] = useState<any[]>([])
  const [userWeightsCategories, setUserWeightsCategories] = useState<any[]>([])

  const fetchData = async () => {
    if (selectedPeriod && exerciseId && (userId || selectedUserId)) {
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

        const weeksData = await getHistory(
          token,
          selectedPeriod,
          exerciseId,
          userId || selectedUserId,
        )

        setCategories(weeksData.categories)
        setSeries(weeksData.series)
      } catch {
        toast({
          title: 'Erro ao buscar histórico.',
          description: 'Por favor, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPeriod, exerciseId])
  const fetchExerciseByMuscleGroup = async () => {
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

      const response = await findExerciseByMuscleGroupAndUser(
        token,
        selectedMuscleGroup,
        userId || selectedUserId,
        selectedPeriod,
      )
      setExercises(response)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao buscar exercícios.',
        description: 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  useEffect(() => {
    fetchExerciseByMuscleGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMuscleGroup])
  const fetchMuscleGroups = async () => {
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

      const response = await findMuscleGroupByUser(
        token,
        userId || selectedUserId,
        selectedPeriod,
      )
      setMuscleGroups(response)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao buscar grupos musculares.',
        description: 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  useEffect(() => {
    fetchMuscleGroups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUserWeights = async () => {
    try {
      if (selectedPeriod && (userId || selectedUserId)) {
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

        const response = await findUserWeights(
          token,
          userId || selectedUserId,
          selectedPeriod,
        )

        setUserWeightsSeries(response.series)
        setUserWeightsCategories(response.categories)
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao buscar histórico de pesos do paciente.',
        description: 'Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  useEffect(() => {
    fetchUserWeights()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPeriod])

  return (
    <div style={{ overflowX: 'auto' }}>
      <Wrap flexDirection="row" marginStart={8}>
        <Stack spacing={2} mr={4}>
          <Select
            placeholder="Selecione o Período"
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            {periods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </Select>
        </Stack>
        <Stack spacing={2} mr={4}>
          <Select
            placeholder="Selecione o grupo"
            onChange={(e) => setSelectedMuscleGroup(e.target.value)}
          >
            {muscleGroups.map((data) => (
              <option key={data.id} value={data.muscleGroup}>
                {data.muscleGroup}
              </option>
            ))}
          </Select>
        </Stack>
        <Stack spacing={2}>
          <Select
            placeholder="Selecione o excercicio"
            onChange={(e) => setExerciseId(e.target.value)}
          >
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </Select>
        </Stack>
      </Wrap>
      <Wrap flexDirection="row" marginStart={8}>
        <SimpleGrid columns={[1, 2]} spacing={10} px={4} py={8}>
          <Container>
            <Heading size="md">Histórico de Cargas</Heading>
            <ChartLine series={series} categories={categories} />{' '}
          </Container>
          <Container>
            <Heading size="md">Histórico de Peso</Heading>
            <ChartLine
              series={userWeightsSeries}
              categories={userWeightsCategories}
            />
          </Container>
          <Repetitions
            repetitions={series[0]?.rmSemana}
            categories={categories}
          />
        </SimpleGrid>
      </Wrap>
    </div>
  )
}

import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import HandleButton from '@/components/Buttons/HandleButton'
import {
  ArrowLeft,
  Barbell,
  Graph,
  Receipt,
  UserList,
  WechatLogo,
} from '@phosphor-icons/react'
import AnamnesisCreate from '../Anamnesis/AnamnesisCreate'
import CreatingFeedback from '../Feedbacks/CreateFeedback'
import ListFeedbacks from '../Feedbacks/ListFeedbacks'
import { useAuthStore } from '@/stores/AuthStore'
import { useUserNavigationStore } from '@/stores/UserStore/Navigation'
import { useRouter } from 'next/router'
import Graphics from '@/components/Repports'

export default function Navigation() {
  const { user } = useAuthStore()
  const router = useRouter()
  const {
    isShowingDashboard,
    isShowingCreateAnamnesis,
    isShowingFeedbacks,
    isShowingCreateFeedbacks,
    isShowingRepports,
    setIsShowingCreateAnamnesis,
    setIsShowingFeedbacks,
    setIsShowingCreateFeedbacks,
    setIsShowingDashboard,
    setIsShowingRepports,
    reset,
  } = useUserNavigationStore()

  const handleWithShowWorkouts = () => {
    router.push('/workouts')
  }

  const handleWithCreateAnamnesis = () => {
    setIsShowingCreateAnamnesis()
    setIsShowingDashboard()
  }

  const handleWithShowFeedbacks = () => {
    setIsShowingFeedbacks()
    setIsShowingDashboard()
  }

  const handleWithCreateFeedbacks = () => {
    setIsShowingCreateFeedbacks()
    setIsShowingDashboard()
  }

  const handleWithShowRepports = () => {
    setIsShowingRepports()
    setIsShowingDashboard()
  }

  useEffect(() => {
    return () => {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isShowingDashboard && (
        <Stack direction={['column', 'row']} spacing={6} w={'full'} mt={10}>
          <Container maxW={'7xl'}>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={5}
              mb={4}
              w={'full'}
            >
              <Box
                p={4}
                rounded={'lg'}
                border={'1px'}
                borderColor={'whiteAlpha.200'}
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleWithShowWorkouts()}
              >
                <VStack spacing={5}>
                  <Box
                    boxShadow="xl"
                    _hover={{ boxShadow: 'lg' }}
                    borderRadius="full"
                    color={'purple.300'}
                  >
                    <Barbell size={96} weight="fill" />
                  </Box>
                  <Heading
                    fontWeight={'medium'}
                    fontSize={'3xl'}
                    textTransform={'capitalize'}
                    textAlign={'center'}
                  >
                    Workouts{' '}
                    <chakra.span
                      fontWeight={'medium'}
                      fontSize={['lg', '2xl']}
                      textTransform={'capitalize'}
                      textAlign={'center'}
                      color={'purple.300'}
                    >
                      Treinos
                    </chakra.span>
                  </Heading>
                </VStack>
              </Box>

              <Box
                p={4}
                rounded={'lg'}
                border={'1px'}
                borderColor={'whiteAlpha.200'}
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleWithCreateFeedbacks()}
              >
                <VStack spacing={5}>
                  <Box
                    boxShadow="xl"
                    _hover={{ boxShadow: 'lg' }}
                    borderRadius="full"
                    color={'purple.300'}
                  >
                    <WechatLogo size={96} weight="fill" />
                  </Box>
                  <Heading
                    fontWeight={'medium'}
                    fontSize={'3xl'}
                    textTransform={'capitalize'}
                    textAlign={'center'}
                  >
                    Feedbacks{' '}
                    <chakra.span
                      fontWeight={'medium'}
                      fontSize={['lg', '2xl']}
                      textTransform={'capitalize'}
                      textAlign={'center'}
                      color={'purple.300'}
                    >
                      Criar Feedback
                    </chakra.span>
                  </Heading>
                </VStack>
              </Box>

              <Box
                p={4}
                rounded={'lg'}
                border={'1px'}
                borderColor={'whiteAlpha.200'}
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleWithShowFeedbacks()}
              >
                <VStack spacing={5}>
                  <Box
                    boxShadow="xl"
                    _hover={{ boxShadow: 'lg' }}
                    borderRadius="full"
                    color={'purple.300'}
                  >
                    <UserList size={96} weight="fill" />
                  </Box>
                  <Heading
                    fontWeight={'medium'}
                    fontSize={'3xl'}
                    textTransform={'capitalize'}
                    textAlign={'center'}
                  >
                    Feedbacks{' '}
                    <chakra.span
                      fontWeight={'medium'}
                      fontSize={['lg', '2xl']}
                      textTransform={'capitalize'}
                      textAlign={'center'}
                      color={'purple.300'}
                    >
                      Listar Feedbacks
                    </chakra.span>
                  </Heading>
                </VStack>
              </Box>

              {!user?.hasAnamnesis && (
                <Box
                  p={4}
                  rounded={'lg'}
                  border={'1px'}
                  borderColor={'whiteAlpha.200'}
                  _hover={{ cursor: 'pointer' }}
                  onClick={() => handleWithCreateAnamnesis()}
                >
                  <VStack spacing={5}>
                    <Box
                      boxShadow="xl"
                      _hover={{ boxShadow: 'lg' }}
                      borderRadius="full"
                      color={'purple.300'}
                    >
                      <Receipt size={96} weight="fill" />
                    </Box>
                    <Heading
                      fontWeight={'medium'}
                      fontSize={'3xl'}
                      textTransform={'capitalize'}
                      textAlign={'center'}
                    >
                      Anamnese{' '}
                      <chakra.span
                        fontWeight={'medium'}
                        fontSize={['lg', '2xl']}
                        textTransform={'capitalize'}
                        textAlign={'center'}
                        color={'purple.300'}
                      >
                        Entrevista Médica
                      </chakra.span>
                    </Heading>
                  </VStack>
                </Box>
              )}

              <Box
                p={4}
                rounded={'lg'}
                border={'1px'}
                borderColor={'whiteAlpha.200'}
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleWithShowRepports()}
              >
                <VStack spacing={5}>
                  <Box
                    boxShadow="xl"
                    _hover={{ boxShadow: 'lg' }}
                    borderRadius="full"
                    color={'purple.300'}
                  >
                    <Graph size={96} weight="fill" />
                  </Box>
                  <Heading
                    fontWeight={'medium'}
                    fontSize={'3xl'}
                    textTransform={'capitalize'}
                    textAlign={'center'}
                  >
                    Relatórios{' '}
                    <chakra.span
                      fontWeight={'medium'}
                      fontSize={['lg', '2xl']}
                      textTransform={'capitalize'}
                      textAlign={'center'}
                      color={'purple.300'}
                    >
                      Gráficos de Evolução
                    </chakra.span>
                  </Heading>
                </VStack>
              </Box>
            </SimpleGrid>
          </Container>
        </Stack>
      )}

      {isShowingFeedbacks && (
        <>
          <Stack
            direction={'column'}
            align={'start'}
            alignSelf={'center'}
            position={'relative'}
            mt={3}
            ml={3}
            pt={6}
            pb={6}
          >
            <Flex>
              <HandleButton
                leftIcon={<ArrowLeft size={28} weight="bold" />}
                onClick={handleWithShowFeedbacks}
              />
              <Heading
                ml={3}
                as="h3"
                size="lg"
                fontWeight="medium"
                textAlign="center"
              >
                Feedbacks
              </Heading>
            </Flex>
          </Stack>

          <Container maxW="7xl" p={{ base: 3, md: 1 }}>
            <ListFeedbacks />
          </Container>
        </>
      )}

      {isShowingCreateFeedbacks ? (
        <>
          <Stack
            direction={'column'}
            align={'start'}
            alignSelf={'center'}
            position={'relative'}
            mt={3}
            ml={3}
            pt={6}
            pb={6}
          >
            <Flex>
              <HandleButton
                leftIcon={<ArrowLeft size={28} weight="bold" />}
                onClick={() => handleWithCreateFeedbacks()}
              />
              <Heading
                ml={3}
                as="h3"
                size="lg"
                fontWeight="medium"
                textAlign="center"
              >
                Criar Feedback
              </Heading>
            </Flex>
          </Stack>
          <Center>
            <CreatingFeedback />
          </Center>
        </>
      ) : null}

      {isShowingCreateAnamnesis ? (
        <>
          <Stack
            direction={'column'}
            align={'start'}
            alignSelf={'center'}
            position={'relative'}
            mt={3}
            ml={3}
            pt={6}
            pb={6}
          >
            <Flex>
              <HandleButton
                leftIcon={<ArrowLeft size={28} weight="bold" />}
                onClick={() => handleWithCreateAnamnesis()}
              />
              <Heading
                ml={3}
                as="h3"
                size="lg"
                fontWeight="medium"
                textAlign="center"
              >
                Criar Anamnese
              </Heading>
            </Flex>
          </Stack>
          <Center>
            <AnamnesisCreate />
          </Center>
        </>
      ) : null}

      {isShowingRepports ? (
        <>
          <Stack
            direction={'column'}
            align={'start'}
            alignSelf={'center'}
            position={'relative'}
            mt={3}
            ml={3}
            pt={6}
            pb={6}
          >
            <Flex>
              <HandleButton
                leftIcon={<ArrowLeft size={28} weight="bold" />}
                onClick={() => handleWithShowRepports()}
              />
              <Heading
                ml={3}
                as="h3"
                size="lg"
                fontWeight="medium"
                textAlign="center"
              >
                Relatórios
              </Heading>
            </Flex>
          </Stack>
          <Center>
            <Graphics userId={user.id} />
          </Center>
        </>
      ) : null}
    </>
  )
}

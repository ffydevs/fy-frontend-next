import { useOwnerIsFetchingStore } from '@/stores/OwnerStore/IsFetching'
import { useAdminNavigationStore } from '@/stores/OwnerStore/Navigation'
import { getUserToken } from '@/pages/api/providers/auth.provider'
import { IPlanType } from '@/pages/api/providers/plans-types.provider'
import {
  deleteUser,
  IUserInterface,
  updateUser,
} from '@/pages/api/providers/users.provider'
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  SimpleGrid,
  Spacer,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import PlanList from '../../PlansList'
import { CloseButtonComponent } from '@/components/Buttons/CloseButtonComponent'

interface UsersListProps {
  users: IUserInterface[]
  planTypes: IPlanType[]
}
export function UsersList({ users, planTypes }: UsersListProps) {
  const router = useRouter()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [deletedAt, setDeletedAt] = useState<string | null>(null)
  const {
    setIsShowingUsers,
    setIsShowingWorkouts,
    setIsShowingAnamnesis,
    setIsShowingFeedbacks,
    setIsShowingRepports,
  } = useAdminNavigationStore()
  const { setIsFetchingUsers, setSelectedUserId } = useOwnerIsFetchingStore()
  const toast = useToast()

  const handleWithDeleteUser = (id: string) => {
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
    deleteUser(token, id).then(() => {
      setIsFetchingUsers()
    })
  }

  const handleUpdateUser = async (userId: string) => {
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

      await updateUser(token, userId, {
        email: email !== '' ? email : undefined,
        firstName: firstName !== '' ? firstName : undefined,
        lastName: lastName !== '' ? lastName : undefined,
        deletedAt: deletedAt !== '' ? null : undefined,
      })

      toast({
        title: 'Usuário atualizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      setIsFetchingUsers()
    } catch (error) {
      console.error(error)
    }
  }

  const handleWithActiveUserAnamnesis = async (userId: string) => {
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

      await updateUser(token, userId, {
        hasAnamnesis: false,
      })

      setIsFetchingUsers()

      toast({
        title: 'Anamnese ativada com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleWithShowUserWorkouts = (userId: string) => {
    setSelectedUserId(userId)
    setIsShowingUsers()
    setIsShowingWorkouts()
  }

  const handleWithShowUserFeedbacks = (userId: string) => {
    setSelectedUserId(userId)
    setIsShowingUsers()
    setIsShowingFeedbacks()
  }

  const handleWithShowAnamnesis = (userId: string) => {
    setSelectedUserId(userId)
    setIsShowingUsers()
    setIsShowingAnamnesis()
  }

  const handleWithShowUserRepports = (userId: string) => {
    setSelectedUserId(userId)
    setIsShowingUsers()
    setIsShowingRepports()
  }

  const handleWithActiveUser = async (userId: string) => {
    try {
      setDeletedAt('Ativar')
    } catch (error) {
      toast({
        title: 'Erro ao reativar usuário.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      await handleUpdateUser(userId)
    }
  }

  return (
    <>
      <Stack direction={['column', 'row']} spacing={6} w={'full'} mt={3}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={3} w={'full'}>
          {users.map((user: IUserInterface) => (
            <Box
              key={user.id}
              p={4}
              rounded={'lg'}
              border={'1px'}
              borderColor={'whiteAlpha.200'}
            >
              <Flex minWidth="max-content" mb={3}>
                <Avatar
                  name="Avatar"
                  size={'lg'}
                  src={
                    user.hasAvatar
                      ? `data:image/jpeg;base64,${user?.avatar?.imageData}` !==
                        ''
                        ? `data:image/jpeg;base64,${user.avatar.imageData}`
                        : 'logo.png'
                      : 'logo.png'
                  }
                />
                <Spacer />
                <CloseButtonComponent
                  onClick={() => handleWithDeleteUser(user.id)}
                />
              </Flex>
              {user?.userType.name === 'User' && (
                <Flex justifyContent={'initial'}>
                  <Button
                    mr={2}
                    background={'purple.700'}
                    size={'xs'}
                    onClick={() => handleWithShowUserWorkouts(user.id)}
                    value={user.id}
                  >
                    Workouts
                  </Button>

                  <Button
                    mr={2}
                    background={
                      user.userFeedback.length > 0 ? 'red.700' : 'purple.700'
                    }
                    size={'xs'}
                    onClick={() => handleWithShowUserFeedbacks(user.id)}
                    value={user.id}
                  >
                    {user.userFeedback.length > 0
                      ? 'Feedback Pendente'
                      : 'Feedback'}
                  </Button>

                  <Button
                    mr={2}
                    background={'purple.700'}
                    size={'xs'}
                    onClick={() => handleWithShowAnamnesis(user.id)}
                    value={user.id}
                  >
                    Anamnese
                  </Button>

                  <Button
                    mr={2}
                    background={'purple.700'}
                    size={'xs'}
                    onClick={() => handleWithShowUserRepports(user.id)}
                    value={user.id}
                  >
                    Relatórios
                  </Button>
                </Flex>
              )}

              <Input
                mt={2}
                defaultValue={user.email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={() => handleUpdateUser(user.id!)}
              />

              <Input
                placeholder="Primeiro Nome"
                mt={2}
                defaultValue={user.firstName}
                onChange={(event) => setFirstName(event.target.value)}
                onBlur={() => handleUpdateUser(user.id!)}
              />

              <Input
                placeholder="Último Nome"
                mt={2}
                defaultValue={user.lastName}
                onChange={(event) => setLastName(event.target.value)}
                onBlur={() => handleUpdateUser(user.id!)}
              />

              {user?.userType.name === 'User' && (
                <>
                  <Flex mt={3}>
                    {!user.hasAnamnesis ? null : (
                      <Button
                        background={'purple.700'}
                        size={'xs'}
                        onClick={() => handleWithActiveUserAnamnesis(user.id)}
                        value={user.id}
                      >
                        Ativar Anamnese
                      </Button>
                    )}
                  </Flex>

                  {user.deletedAt && (
                    <Flex>
                      <FormLabel>{`Data de exclusão: ${new Date(
                        user.deletedAt!,
                      ).toLocaleDateString('pt-BR')}`}</FormLabel>

                      <Button
                        title={'Reativar'}
                        background={'red.700'}
                        size={'xs'}
                        onClick={() => handleWithActiveUser(user.id)}
                        value={user.id}
                      >
                        Reativar
                      </Button>
                    </Flex>
                  )}
                  <>
                    {user.plan && (
                      <PlanList plan={user.plan} planTypes={planTypes} />
                    )}
                  </>
                </>
              )}
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  )
}

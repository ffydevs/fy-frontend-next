import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'next/router'

interface Props {
  children: React.ReactNode
}

const Links = ['Dashboard', 'Exercises']

const NavLink = (props: Props) => {
  const { children } = props
  const link = children!.toString().toLowerCase()

  return <Link href={link}>{children}</Link>
}

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [nameInitial, setNameInitial] = useState<string>('')
  const { user, signOut } = useAuthStore()
  const router = useRouter()

  const handleWithSignOut = () => {
    localStorage.removeItem('fyToken')
    router.replace('/login').then(() => {
      signOut()
    })
  }

  function getingFirstNameInitials(name?: string) {
    if (name !== undefined && name !== '' && name !== null) {
      const nameSplited = name.split(' ')
      const firstName = nameSplited[0]

      return setNameInitial(`${firstName[0]}}`)
    }
  }

  useEffect(() => {
    getingFirstNameInitials(user?.firstName)
  })

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              {' '}
              <Image
                priority={true}
                src={'/logo.png'}
                alt={''}
                width={50}
                height={50}
                loading={'eager'}
              />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => handleWithSignOut()}
                  _hover={{
                    bgColor: 'blackAlpha.400',
                    rounded: 'lg',
                  }}
                >
                  Sair
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

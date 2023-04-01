import { Button, Center, Link, Stack } from '@chakra-ui/react'
import { ArrowBendDownRight } from 'phosphor-react'

export default function CtaForm() {
  return (
    <Stack spacing={3}>
      <Center>
        <Button
          as={Link}
          variant={'solid'}
          bgColor={'blackAlpha.900'}
          size={'lg'}
          rounded="full"
          leftIcon={<ArrowBendDownRight size={24} weight="bold" />}
          _hover={{
            textDecoration: 'none',
            transform: 'scale(1.1)',
            transition: '0.5s',
          }}
          // style={{
          //   background:
          //     'linear-gradient(#000 0 0) padding-box, linear-gradient(to right, #4299E1, #ED8936, #9F7AEA) border-box',
          //   color: '#fff',
          //   border: '2px solid transparent',
          //   borderRadius: '30px',
          // }}
        >
          Quero minha planilha
        </Button>
      </Center>
    </Stack>
  )
}

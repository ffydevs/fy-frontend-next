import {
  Box,
  Modal,
  ModalContent,
  ModalBody,
  Button,
  ModalOverlay,
  Center,
} from '@chakra-ui/react'
import { ArrowLeft, ArrowRight, Video } from '@phosphor-icons/react'
import { useState } from 'react'

interface IVideo {
  key?: string
  videoData?: string
}

interface ViewVideosProps {
  videos?: IVideo[]
  handleWithFindVideos: () => void
}

export function VideosView({ videos, handleWithFindVideos }: ViewVideosProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % videos!.length)
  }

  const handlePreviousSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + videos!.length) % videos!.length,
    )
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleWithOpenModalAndFindVideos = () => {
    openModal()
    handleWithFindVideos()
  }

  return (
    <>
      <Button
        _hover={{
          bgGradient: 'linear(to-r, red.500, red.600)',
          transition: '0.8s',
        }}
        size="xs"
        border={'1px'}
        borderColor={'whiteAlpha.300'}
        onClick={() => handleWithOpenModalAndFindVideos()}
      >
        <Video size={32} />
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent
          bgColor={'blackAlpha.100'}
          border={'1px'}
          borderColor={'whiteAlpha.200'}
          backdropBlur={'1rem'}
          key={currentSlide}
        >
          <ModalBody>
            <Box
              position="relative"
              flexDirection="column"
              p={4}
              overflow={'hidden'}
            >
              <Center>
                {videos && videos.length > 0 && (
                  <video controls={true} width="300px" height="400">
                    <source
                      src={`data:video/mp4;base64,${videos[currentSlide]?.videoData}`}
                    />
                  </video>
                )}
              </Center>
            </Box>
            <Box mt={4} display="flex" justifyContent="center">
              <Button
                mr={3}
                backgroundColor={'purple.700'}
                _hover={{
                  bgGradient: 'linear(to-r, purple.500, purple.600)',
                  transition: '0.8s',
                }}
                onClick={handlePreviousSlide}
              >
                <ArrowLeft size={28} />
              </Button>
              <Button
                onClick={handleNextSlide}
                backgroundColor={'purple.700'}
                _hover={{
                  bgGradient: 'linear(to-r, purple.500, purple.600)',
                  transition: '0.8s',
                }}
              >
                <ArrowRight size={28} />
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

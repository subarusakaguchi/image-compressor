import React, { createContext, ReactNode, useContext, useState } from 'react'
import imageCompression from 'browser-image-compression'

interface IImageCompressionData {
  states: {
    imageFile: File | undefined
    compressedFile: File | undefined
    imageLink: string | undefined
    maxSizeMB: number
    maxWidthOrHeight: number
  }
  setStates: {
    inputHandler: (
      event: React.ChangeEvent<HTMLInputElement>
    ) => HTMLParagraphElement
    compressImage: (event: React.MouseEvent) => void
    maxSize: (value: number) => void
    maxHeightOrWidth: (value: number) => void
  }
}

interface IDataReturn {
  imageFile: File
  compressedFile: File
  imageLink: string
}

interface IImageCompressionProps {
  children: ReactNode
}

const ImageCompressionContext = createContext<IImageCompressionData>(
  {} as IImageCompressionData
)

export function ImageCompressionProvider({
  children
}: IImageCompressionProps): JSX.Element {
  const [imageFile, setImageFile] = useState<File>()
  const [compressedFile, setCompressedFile] = useState<File>()
  const [imageLink, setImageLink] = useState<string>()

  const [maxSizeMB, setMaxSizeMB] = useState<number>(1)
  const [maxWidthOrHeight, setmaxWidthOrHeight] = useState<number>(1024)

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): HTMLParagraphElement => {
    if (!event.target.files) throw new Error('No image')
    const file = event.target.files[0]

    setImageFile(file)

    const loadedImage = document.createElement('p')

    loadedImage.innerText = `${file.name}-${(file.size / 1024 / 1024).toFixed(
      2
    )}MB`

    return loadedImage
  }

  const compressImage = async (
    event: React.MouseEvent
  ): Promise<IDataReturn | void> => {
    event.preventDefault()

    if (!imageFile) throw Error('No image')

    const options = {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker: true
    }

    if (options.maxSizeMB >= imageFile.size / 1024 / 1024) {
      alert("Image is too small, can't be Compressed!") // Necessário Tratar
    }

    try {
      await imageCompression(imageFile, options).then(res => {
        setCompressedFile(res)
        const link = URL.createObjectURL(res)

        setImageLink(link)

        if (imageLink && compressedFile) {
          const data: IDataReturn = {
            imageLink,
            compressedFile,
            imageFile
          }

          return data
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const maxSize = (value: number) => setMaxSizeMB(value)

  const maxHeightOrWidth = (value: number) => setmaxWidthOrHeight(value)

  return (
    <ImageCompressionContext.Provider
      value={{
        states: {
          imageFile,
          compressedFile,
          imageLink,
          maxSizeMB,
          maxWidthOrHeight
        },
        setStates: {
          inputHandler,
          compressImage,
          maxSize,
          maxHeightOrWidth
        }
      }}
    >
      {children}
    </ImageCompressionContext.Provider>
  )
}

export function useImageCompression(): IImageCompressionData {
  const context = useContext(ImageCompressionContext)

  return context
}

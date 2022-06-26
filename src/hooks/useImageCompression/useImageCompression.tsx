import React, { createContext, useContext, useState } from 'react'
import imageCompression from 'browser-image-compression'

import { IImageCompressionData, IImageCompressionProps } from './interfaces'

const ImageCompressionContext = createContext<IImageCompressionData>(
  {} as IImageCompressionData
)

export function ImageCompressionProvider({
  children
}: IImageCompressionProps): JSX.Element {
  const [imageFile, setImageFile] = useState<File>()
  const [compressedFile, setCompressedFile] = useState<File>()
  const [imageLink, setImageLink] = useState<string>()
  const [progress, setProgress] = useState<number>(0)

  const [maxSizeMB, setMaxSizeMB] = useState<number>(1)
  const [maxWidthOrHeight, setmaxWidthOrHeight] = useState<number>(1024)

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) {
      throw new Error('No image')
    }
    const file = event.target.files[0]

    setImageFile(file)
  }

  const compressImage = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault()

    if (!imageFile) throw Error('No image')

    const options = {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker: true,
      onProgress: (p: number) => setProgress(p)
    }

    if (options.maxSizeMB >= imageFile.size / 1024 / 1024) {
      alert("Image is too small, can't be Compressed!") // Necessário Tratar
    }

    try {
      await imageCompression(imageFile, options).then(res => {
        setCompressedFile(res)
        const link = URL.createObjectURL(res)

        setImageLink(link)
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
          maxWidthOrHeight,
          progress
        },
        functions: {
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

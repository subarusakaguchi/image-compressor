import React, { createContext, useContext, useState } from 'react'
import imageCompression from 'browser-image-compression'

import { IImageCompressionData, IImageCompressionProps } from './interfaces'

const ImageCompressionContext = createContext<IImageCompressionData>(
  {} as IImageCompressionData
)

export function ImageCompressionProvider({
  children
}: IImageCompressionProps): JSX.Element {
  const [imagesFiles, setImagesFiles] = useState<FileList>()
  const [compressedFiles, setCompressedFiles] = useState<File[]>()
  const [imagesLinks, setImagesLinks] = useState<string[]>()
  const [progress, setProgress] = useState<number>(0)

  const [maxSizeMB, setMaxSizeMB] = useState<number>(1)
  const [maxWidthOrHeight, setmaxWidthOrHeight] = useState<number>(1024)

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) {
      throw new Error('No image')
    }
    const file = event.target.files

    setImagesFiles(file)
  }

  const compressImage = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault()

    if (!imagesFiles) throw new Error('No image')

    const options = {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker: true,
      onProgress: (p: number) => setProgress(p)
    }

    const promiseTempFiles: Array<File> = []

    await Promise.all(
      Array.from(imagesFiles).map(async file => {
        if (options.maxSizeMB >= file.size / 1024 / 1024) {
          throw new Error("Image is too small, can't be Compressed!")
        }

        try {
          promiseTempFiles.push(
            await imageCompression(file, options).then(res => {
              return res
            })
          )
        } catch (error) {
          console.log(error)
        }
      })
    )

    if (compressedFiles) {
      setCompressedFiles([...compressedFiles, ...promiseTempFiles])
    } else {
      setCompressedFiles([...promiseTempFiles])
    }

    const tempLinks: string[] = []

    promiseTempFiles.forEach(file => {
      tempLinks.push(URL.createObjectURL(file))
    })

    setTimeout(() => {
      tempLinks.forEach(link => {
        URL.revokeObjectURL(link)
      })
    }, 60000)

    if (imagesLinks) {
      setImagesLinks([...imagesLinks, ...tempLinks])
    } else {
      setImagesLinks([...tempLinks])
    }
  }

  const maxSize = (value: number) => setMaxSizeMB(value)

  const maxHeightOrWidth = (value: number) => setmaxWidthOrHeight(value)

  return (
    <ImageCompressionContext.Provider
      value={{
        states: {
          imagesFiles,
          compressedFiles,
          imagesLinks,
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

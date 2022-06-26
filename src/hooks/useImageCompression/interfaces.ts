import { ReactNode } from 'react'

interface IImageCompressionData {
  states: {
    imagesFiles: FileList | undefined
    compressedFiles: File[] | undefined
    imagesLinks: string[] | undefined
    maxSizeMB: number
    maxWidthOrHeight: number
    progress: number
  }
  functions: {
    inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    compressImage: (event: React.MouseEvent) => Promise<void>
    maxSize: (value: number) => void
    maxHeightOrWidth: (value: number) => void
  }
}

interface IImageCompressionProps {
  children: ReactNode
}

export type { IImageCompressionProps, IImageCompressionData }

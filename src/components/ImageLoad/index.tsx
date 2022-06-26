import React from 'react'

import ProgressBar from '@ramonak/react-progress-bar'

import styles from './styles.module.scss'
import { useImageCompression } from '../../hooks/useImageCompression/useImageCompression'

interface IImageLoadProps {
  file: File
}

export function ImageLoad({ file }: IImageLoadProps) {
  const { states } = useImageCompression()
  return (
    <div className={styles.loadItem}>
      <p>
        {file ? `${file?.name}-${(file?.size / 1024 / 1024).toFixed(2)}MB` : ''}
      </p>
      <div className={file ? '' : 'disabled'}>
        <ProgressBar
          completed={states.progress}
          maxCompleted={100}
          width={'10rem'}
          bgColor="#00a000"
        />
      </div>
    </div>
  )
}

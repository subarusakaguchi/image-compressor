import React from 'react'

import '../../styles/global.scss'

import ProgressBar from '@ramonak/react-progress-bar'

import styles from './styles.module.scss'
import { useImageCompression } from '../../hooks/useImageCompression/useImageCompression'

export function ImageLoadArea() {
  const { states } = useImageCompression()

  return (
    <div className={styles.imageLoad}>
      <p>
        {states.imageFile
          ? `${states.imageFile?.name}-${(
              states.imageFile?.size /
              1024 /
              1024
            ).toFixed(2)}MB`
          : ''}
      </p>
      <div className={states.imageFile ? '' : 'disabled'}>
        <ProgressBar
          completed={states.progress}
          maxCompleted={100}
          width={'14rem'}
          bgColor="#00a000"
        />
      </div>
    </div>
  )
}

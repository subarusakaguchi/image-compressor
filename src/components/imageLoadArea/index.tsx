import React from 'react'

import '../../styles/global.scss'

import styles from './styles.module.scss'
import { ImageLoad } from '../ImageLoad'
import { useImageCompression } from '../../hooks/useImageCompression/useImageCompression'

export function ImageLoadArea() {
  const { states } = useImageCompression()

  return (
    <div className={styles.imageLoadArea}>
      {states.imagesFiles
        ? Array.from(states.imagesFiles).map((file, index) => (
            <ImageLoad key={index} file={file} />
            // eslint-disable-next-line prettier/prettier
        ))
        : ''}
    </div>
  )
}

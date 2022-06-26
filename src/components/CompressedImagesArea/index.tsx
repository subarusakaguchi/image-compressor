/* eslint-disable indent */
import React from 'react'

import styles from './styles.module.scss'
import { useImageCompression } from '../../hooks/useImageCompression/useImageCompression'

export function CompressedImagesArea() {
  const { states } = useImageCompression()

  return (
    <section className={styles.compressedImageArea}>
      {states.compressedFiles
        ? states.compressedFiles.map((file, index) => (
            <a
              key={index}
              href={states.imagesLinks ? states.imagesLinks[index] : '/'}
              download={file.name}
            >
              Download:{' '}
              {states.imagesFiles ? states.imagesFiles[index].name : ''}
            </a>
          ))
        : ''}
    </section>
  )
}

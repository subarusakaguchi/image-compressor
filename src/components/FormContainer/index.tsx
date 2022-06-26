import React, { useEffect } from 'react'

import styles from './styles.module.scss'
import { Form } from '../Form'
import { useImageCompression } from '../../hooks/useImageCompression/useImageCompression'

export function FormContainer() {
  const { states } = useImageCompression()

  useEffect(() => {
    const resArea = document.getElementById('res')

    if (
      resArea &&
      states.imageFile &&
      states.compressedFile &&
      states.imageLink
    ) {
      const name: string[] = states.imageFile.name.split('.')
      const imageCompressedName = name[0] + '-compressed'
      resArea.innerHTML = `<a href="${states.imageLink}" download="${imageCompressedName}">${states.imageFile?.name}</a>`
    }
  })

  return (
    <section className={styles.bodyContainer}>
      <div className={styles.botyContent}>
        <Form />
        <section id="res"></section>
      </div>
    </section>
  )
}

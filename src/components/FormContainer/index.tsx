import React, { useEffect } from 'react'

import styles from './styles.module.scss'
import { Form } from '../Form'
import { useImageCompression } from '../../hooks/useImageCompression'

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
      const [name, type]: string[] = states.imageFile.name.split('.')
      const imageCompressedName = name + '-compressed'
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

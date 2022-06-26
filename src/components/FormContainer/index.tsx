import React from 'react'

import styles from './styles.module.scss'
import { Form } from '../Form'
import { CompressedImagesArea } from '../CompressedImagesArea'

export function FormContainer() {
  return (
    <section className={styles.bodyContainer}>
      <div className={styles.botyContent}>
        <Form />
        <CompressedImagesArea />
      </div>
    </section>
  )
}

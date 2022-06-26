import React from 'react'

import styles from './styles.module.scss'

export function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <h1>Image Compressor</h1>
      </div>
    </header>
  )
}

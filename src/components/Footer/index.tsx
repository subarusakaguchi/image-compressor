import React from 'react'

import styles from './styles.module.scss'

export function Footer() {
  return (
    <footer>
      <div className={styles.footerContent}>
        <p>
          Image Compressor | Created by{' '}
          <a
            href="https://github.com/subarusakaguchi"
            target="_blank"
            rel="noreferrer"
          >
            Subaru Sakaguchi
          </a>
        </p>
      </div>
    </footer>
  )
}

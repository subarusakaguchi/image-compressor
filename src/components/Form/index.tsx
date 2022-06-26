import React from 'react'

import styles from './styles.module.scss'
import { useImageCompression } from '../../hooks/useImageCompression'

export function Form() {
  const { states, setStates } = useImageCompression()

  return (
    <form className={styles.formContainer}>
      <span>Tamanho máximo da imagem compactada (em MB): </span>
      <input
        type="number"
        name="maxSizeMB"
        id="maxSizeMB"
        value={states.maxSizeMB}
        onChange={e => setStates.maxSize(Number(e.target.value))}
      />
      <span>Comprimento/Altura máximo da imagem final (em px): </span>
      <input
        type="number"
        name="maxWidthOrHeight"
        id="maxWidthOrHeight"
        value={states.maxWidthOrHeight}
        onChange={e => setStates.maxHeightOrWidth(Number(e.target.value))}
      />
      <label>
        <input
          type="file"
          accept="image/*"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const loadedImage = setStates.inputHandler(event)

            const imageLoadArea = document.getElementById('imageLoad')

            if (imageLoadArea) {
              imageLoadArea.appendChild(loadedImage)
            }
          }}
        />
        Clique para fazer o Upload
      </label>
      <section id="imageLoad"></section>
      <input
        type="submit"
        value="COMPACTAR"
        onClick={setStates.compressImage}
      />
    </form>
  )
}

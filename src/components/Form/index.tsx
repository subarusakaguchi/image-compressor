import React from 'react'

import styles from './styles.module.scss'
import { ImageLoadArea } from '../imageLoadArea/indext'
import { useImageCompression } from '../../hooks/useImageCompression/useImageCompression'

export function Form() {
  const { states, functions } = useImageCompression()

  const handleLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    functions.inputHandler(event)
  }

  return (
    <form className={styles.formContainer}>
      <span>Tamanho máximo da imagem compactada (em MB): </span>
      <input
        type="number"
        name="maxSizeMB"
        id="maxSizeMB"
        value={states.maxSizeMB}
        onChange={e => functions.maxSize(Number(e.target.value))}
      />
      <span>Comprimento/Altura máximo da imagem final (em px): </span>
      <input
        type="number"
        name="maxWidthOrHeight"
        id="maxWidthOrHeight"
        value={states.maxWidthOrHeight}
        onChange={e => functions.maxHeightOrWidth(Number(e.target.value))}
      />
      <label>
        <input type="file" accept="image/*" onChange={handleLoadImage} />
        Clique para fazer o Upload
      </label>
      <ImageLoadArea />
      <input
        type="submit"
        value="COMPACTAR"
        onClick={functions.compressImage}
      />
    </form>
  )
}

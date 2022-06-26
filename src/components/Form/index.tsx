import React, { useEffect, useState } from 'react'
import imageCompression from 'browser-image-compression'

import ProgressBar from '@ramonak/react-progress-bar'

import styles from './styles.module.scss'

export function Form() {
  const [imageFile, setImageFile] = useState<File>()
  const [compressedFile, setCompressedFile] = useState<File>()
  const [maxSizeMB, setMaxSizeMB] = useState<number>(1)
  const [maxWidthOrHeight, setmaxWidthOrHeight] = useState<number>(1024)
  const [imageLink, setImageLink] = useState<string>()

  useEffect(() => {
    const resArea = document.getElementById('res')

    if (resArea && imageFile && compressedFile && imageLink) {
      const [name, type]: string[] = imageFile.name.split('.')
      const imageCompressedName = name + '-compressed'
      resArea.innerHTML = `<a href="${imageLink}" download="${imageCompressedName}">${imageFile?.name}</a>`
    }
  })

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) throw new Error('No image')
    const file = event.target.files[0]

    setImageFile(file)

    const imageLoadArea = document.getElementById('imageLoad')

    if (imageLoadArea) {
      imageLoadArea.innerHTML = `<p>${file.name}-${(
        file.size /
        1024 /
        1024
      ).toFixed(2)}MB</p>`
    }
  }

  const progressBar = (p: number) => {
    console.log(p)
  }

  const compressImage = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault()

    if (!imageFile) throw Error('No image')

    const options = {
      maxSizeMB,
      maxWidthOrHeight,
      onProgress: (p: number) => progressBar(p),
      useWebWorker: true
    }

    if (options.maxSizeMB >= imageFile.size / 1024 / 1024) {
      alert("Image is too small, can't be Compressed!") // Necessário Tratar
    }

    try {
      await imageCompression(imageFile, options).then(res => {
        setCompressedFile(res)
        const link = URL.createObjectURL(res)

        setImageLink(link)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className={styles.bodyContainer}>
      <div>
        <form>
          <span>Tamanho máximo da imagem compactada (em MB): </span>
          <input
            type="number"
            name="maxSizeMB"
            id="maxSizeMB"
            value={maxSizeMB}
            onChange={e => setMaxSizeMB(Number(e.target.value))}
          />
          <span>Comprimento/Altura máximo da imagem final (em px): </span>
          <input
            type="number"
            name="maxWidthOrHeight"
            id="maxWidthOrHeight"
            value={maxWidthOrHeight}
            onChange={e => setmaxWidthOrHeight(Number(e.target.value))}
          />
          <label>
            <input type="file" accept="image/*" onChange={inputHandler} />
            Clique para fazer o Upload
          </label>
          <section id="imageLoad"></section>
          <input type="submit" value="COMPACTAR" onClick={compressImage} />
        </form>
        <section id="res"></section>
      </div>
    </section>
  )
}

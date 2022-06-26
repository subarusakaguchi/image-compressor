import React from 'react'

import { ImageCompressionProvider } from './hooks/useImageCompression/useImageCompression'
import { Header } from './components/Header'
import { FormContainer } from './components/FormContainer'
import { Footer } from './components/Footer'

export function App() {
  return (
    <React.StrictMode>
      <ImageCompressionProvider>
        <Header />
        <FormContainer />
        <Footer />
      </ImageCompressionProvider>
    </React.StrictMode>
  )
}

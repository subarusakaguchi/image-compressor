import ReactDOM from 'react-dom/client'
import React from 'react'

import './styles/global.scss'
import { ImageCompressionProvider } from './hooks/useImageCompression'
import { Header } from './components/Header'
import { FormContainer } from './components/FormContainer'
import { Footer } from './components/Footer'
import { App } from './App'

/* [X] - Header
 * [ ] - Input to add image
 * [ ] - A space to output the compressed image (For Download)
 * [X] - Footer
 */

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ImageCompressionProvider>
      <Header />
      <FormContainer />
      {/* <App /> */}
      <Footer />
    </ImageCompressionProvider>
  </React.StrictMode>
)

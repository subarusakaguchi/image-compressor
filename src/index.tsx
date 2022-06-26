import ReactDOM from 'react-dom/client'
import React from 'react'

import './styles/global.scss'
import { Header } from './components/Header'
import { Form } from './components/Form'
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
    <Header />
    <Form />
    {/* <App /> */}
    <Footer />
  </React.StrictMode>
)

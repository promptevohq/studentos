import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StudentOS from './StudentOS'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentOS />
  </StrictMode>,
)

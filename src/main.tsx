import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { InvitationApp } from './InvitationApp.tsx'

import '@fontsource-variable/dm-sans'
import '@/index.css'
import '@/common/styles/app.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InvitationApp />
  </StrictMode>
)

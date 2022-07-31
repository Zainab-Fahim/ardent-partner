import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://ardent" target="_blank" rel="noopener noreferrer">
          Ardent
        </a>
        <span className="ms-1">&copy; 2022 Zainab-Fahim.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Built by</span>
        <a href="https://zainab-fahim.netlify.app/" target="_blank" rel="noopener noreferrer">
          Zainab Fahim
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

import React from 'react'
import PropTypes from 'prop-types'

import 'styles/components/hamburger-icon'

const HamburgerButton = ({ id, isOpen, onClick }) => {
  return (
    <button
      className={`Btn--null HamburgerIcon ${isOpen ? 'is-open' : ''}`}
      onClick={onClick}
      id={id}
    >
      <span className='HamburgerIcon-bar' aria-hidden role='presentation' />
      <span className='HamburgerIcon-bar' aria-hidden role='presentation' />
      <span className='HamburgerIcon-bar' aria-hidden role='presentation' />
      <span className='HamburgerIcon-bar' aria-hidden role='presentation' />
      <div className='u-sr-only'>{isOpen ? 'Close' : 'Open'} mobile menu</div>
    </button>
  )
}

HamburgerButton.propTypes = {
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default HamburgerButton

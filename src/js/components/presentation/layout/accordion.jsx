import React from 'react'
import PropTypes from 'prop-types'

import 'styles/components/accordion'

// I'm a hybrid because it makes sense
class Accordion extends React.Component {
  state = {
    openSection: 0
  }

  triggerSection = (index) => {
    this.setState({
      openSection: index
    })
  }

  render() {
    const { className, sections } = this.props
    const { openSection } = this.state
    const accordionSections = sections.map((section, i) => {
      let isOpen = openSection === i
      let sectionId = `accordion-section-${section.header.toLowerCase().replace(/\s/g, '-')}`
      return (
        <li className='accordion__section'
          key={ sectionId }
          aria-expanded={ isOpen }
          id={ sectionId }
        >
          <button className={ `accordion__section__header ${ section.isValid ? 'is-valid' : '' } ${ isOpen ? 'is-open' : '' }` }
            aria-controls={ sectionId }
            onClick={ (e) => { e.preventDefault(); this.triggerSection(i) } }
          >
            { section.header }
          </button>
          <div aria-hidden={ !isOpen } className={ `accordion__section__contents ${ isOpen ? 'is-open' : '' }` }>
            { section.child
              ? (
                React.cloneElement(section.child, {
                  triggerSection: this.triggerSection
                })
              ) : ''
             }
          </div>
        </li>
      )
    })

    return (
      <div className={ `accordion ${className || ''}` }>
        <ul className='accordion__sections'>
          { accordionSections }
        </ul>
      </div>
    )
  }
}

Accordion.propTypes = {
  className: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      child: PropTypes.element.isRequired,
      header: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]).isRequired,
      isValid: PropTypes.bool
    }).isRequired
  ).isRequired
}

export default Accordion
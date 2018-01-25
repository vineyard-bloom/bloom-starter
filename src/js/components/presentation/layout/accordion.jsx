import React from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'

import 'styles/components/accordion'

// I'm a hybrid because it makes sense
class Accordion extends React.Component {
  state = {
    openSection: 0
  };

  triggerSection = index => {
    this.setState({
      openSection: index === this.state.openSection ? null : index
    })
  };

  componentWillReceiveProps = newProps => {
    if (
      newProps.defaultOpenSection &&
      newProps.defaultOpenSection !== this.props.defaultOpenSection
    ) {
      this.setState({
        openSection: newProps.defaultOpenSection
      })
    }
  };

  componentDidMount() {
    if (this.props.defaultOpenSection) {
      this.setState({
        openSection: this.props.defaultOpenSection
      })
    }
  }

  render() {
    const { className, sections } = this.props
    const { openSection } = this.state
    const accordionSections = sections.map((section, i) => {
      let isOpen = openSection === i
      let sectionId = `Accordion-section-${section.header
        .toLowerCase()
        .replace(/\s/g, '-')}`
      return (
        <li
          className={`Accordion-section ${isOpen ? 'is-open' : ''}`}
          key={sectionId}
          aria-expanded={isOpen}
          id={sectionId}
        >
          <button
            className={`Accordion-section-header ${
              section.isValid ? 'is-valid' : ''
            } ${isOpen ? 'is-open' : ''}`}
            aria-controls={sectionId}
            id={`${sectionId}-trigger-button`}
            onClick={e => {
              e.preventDefault()
              this.triggerSection(i)
            }}
          >
            {section.header}
          </button>
          <Transition in={isOpen} timeout={0}>
            {status => (
              <div
                aria-hidden={!isOpen}
                aria-expanded={isOpen}
                aria-labelledby={`${sectionId}-trigger-button`}
                className={`Accordion-section-contents ${
                  isOpen ? 'is-open' : ''
                } fold-${status}`}
              >
                {section.contents
                  ? React.cloneElement(section.contents, {
                      triggerSection: this.triggerSection
                    })
                  : ''}
              </div>
            )}
          </Transition>
        </li>
      )
    })

    return (
      <div className={`Accordion ${className || ''}`}>
        <ul className='Accordion-sections'>{accordionSections}</ul>
      </div>
    )
  }
}

Accordion.propTypes = {
  className: PropTypes.string,
  defaultOpenSection: PropTypes.number,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      contents: PropTypes.element.isRequired,
      header: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      isValid: PropTypes.bool
    }).isRequired
  ).isRequired
}

export default Accordion

import React from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'

import 'styles/components/modal'

const isInsideTheModal = domElement => {
  let parent = domElement
  while (parent && parent.tagName) {
    if (parent.id === 'modal-wrapper') {
      return true
    } else if (parent.tagName === 'BODY') {
      return false
    } else {
      parent = parent.parentNode
    }
  }
}

const allEnabledInputs =
  'button:not([disabled]), textarea:not([disabled]), a:not([disabled]), select:not([disabled]), input:not([disabled])'

class Modal extends React.Component {
  state = {
    lastFocus: null
  };

  static propTypes = {
    closeModal: PropTypes.func,
    modalContents: PropTypes.element,
    modalTriggerId: PropTypes.string
  };

  detectClickOff = e => {
    if (e.target && e.target.id === 'modal-wrapper') {
      this.props.closeModal()
    }
  };

  findLast = () => {
    // find last anchor on modal for shift-tab focus
    const contents = document.getElementById('modal-wrapper')
    if (contents) {
      const inputs = contents.querySelectorAll(allEnabledInputs)
      let lastInput = inputs[inputs.length - 1]

      if (lastInput) {
        this.setState({
          lastFocus: lastInput
        })
      } else {
        this.setState({
          lastFocus: document.getElementById('modal-close-button')
        })
      }
    }
  };

  focusOnFirst = () => {
    const modal = document.getElementById('modal-wrapper')
    if (modal) {
      let firstFocusable = [...modal.querySelectorAll(allEnabledInputs)][0]
      if (firstFocusable) {
        firstFocusable.focus()
      }
    }
  };

  keyDownHandler = evt => {
    const e = evt || window.event
    const keyCode = e.which || e.keyCode
    const closeBtn = document.getElementById('modal-close-button')

    if (keyCode !== 27) {
      this.findLast()
    }

    if (keyCode === 9 && e.shiftKey && e.target.id === closeBtn.id) {
      // shift tab pressed while on first element
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
      this.state.lastFocus.focus()
    } else if (
      keyCode === 9 &&
      !e.shiftKey &&
      e.target.id === this.state.lastFocus.id
    ) {
      // tab pressed
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
      closeBtn.focus()
    } else if (keyCode === 27) {
      // escape key
      this.props.closeModal()
    }
  };

  onFocusOut = e => {
    // keydown handler makes sure we don't leave the modal *most* of the time, but this will ensure it
    if (!isInsideTheModal(e.relatedTarget)) {
      let closeBtn = document.getElementById('modal-close-button')
      if (closeBtn && this.props.modalContents) {
        closeBtn.focus()
      }

      this.findLast()
    }
  };

  componentDidMount = () => {
    let closeBtn = document.getElementById('modal-close-button')
    if (closeBtn && this.props.modalContents) closeBtn.focus()

    this.findLast()
  };

  componentWillReceiveProps = newProps => {
    const previousLastFocus = this.state.lastFocus
      ? document.getElementById(this.state.lastFocus.id)
      : null
    if (!this.props.modalContents && newProps.modalContents) {
      // opening
      setTimeout(() => {
        let closeBtn = document.getElementById('modal-close-button')
        if (closeBtn) closeBtn.focus()
        this.findLast()
      }, 200)
    } else if (
      newProps.modalContents &&
      (!previousLastFocus || !previousLastFocus.focus)
    ) {
      this.findLast()
      this.focusOnFirst()
    } else if (!newProps.modalContents && this.props.modalContents) {
      // closing
      const prevBtn = document.getElementById(this.props.modalTriggerId)
      if (prevBtn) {
        prevBtn.focus()
      }
    }
  };

  render() {
    let { modalContents, ...props } = this.props

    return (
      <div
        className={`Modal ${modalContents ? 'is-active' : 'is-hidden'}`}
        onKeyDown={this.keyDownHandler}
        id='modal-wrapper'
        onClick={this.detectClickOff}
        onBlur={this.onFocusOut}
        tabIndex={modalContents ? 0 : -1}
        aria-live='polite'
        role='dialog'
        aria-hidden={!modalContents}
      >
        <Transition in={!!modalContents} timeout={0}>
          {status => (
            <div
              className={`Modal-content descend-${status}`}
              aria-hidden={!modalContents}
            >
              <button
                className='Btn--null Btn--close'
                id='modal-close-button'
                aria-label='close this modal'
                onClick={e => {
                  e.preventDefault()
                  props.closeModal()
                }}
                tabIndex={modalContents ? 0 : -1}
              >
                x
              </button>
              {modalContents}
            </div>
          )}
        </Transition>
      </div>
    )
  }
}

export default Modal

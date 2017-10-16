import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition'

import { closeModal } from 'redux-store/actions/modalActions';

import 'styles/components/modal'

class Modal extends React.Component {
  state = {
    lastFocus: null
  };

  static propTypes = {
    closeModal: PropTypes.func,
    modalContents: PropTypes.element,
    modalTriggerId: PropTypes.string
  }

  findLast = () => {
    // find last anchor on modal and focus
    const contents = document.getElementById('modal-wrapper')
    if (contents) {
      let lastInput = contents.querySelectorAll('button, textarea, a, select, input, textarea')
      lastInput = lastInput[lastInput.length-1]

      if (lastInput) {
        this.setState({
          lastFocus: lastInput
        })
      }
    }
  };

  keyDownHandler = (evt) => {
    const e = evt || window.event
    const keyCode = e.which || e.keyCode
    const closeBtn = document.getElementById('modal-close-button')

    if (keyCode === 9 && e.shiftKey && (e.target.id === closeBtn.id)) { // shift tab pressed after last element
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
      this.state.lastFocus.focus()
    } else if (keyCode === 9 && !e.shiftKey && (e.target.id === this.state.lastFocus.id)) { // tab pressed
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
      closeBtn.focus()
    } else if (keyCode === 27) { // escape key
      this.props.closeModal()
    }
  };

  componentDidMount = () => {
    let closeBtn = document.getElementById('modal-close-button');
    if (closeBtn) closeBtn.focus();

    this.findLast()
  };

  componentWillReceiveProps = (newProps) => {
    if (!this.props.modalContents && newProps.modalContents) {
      // opening
      setTimeout(() => {
        let closeBtn = document.getElementById('modal-close-button');
        if (closeBtn) closeBtn.focus();
        this.findLast()
      }, 200);
    } else if (newProps.modalContents) {
      setTimeout(() => {
        this.findLast()
      }, 200)
    } else if (!newProps.modalContents && this.props.modalContents) {
      // closing
      let prevBtn = document.getElementById(this.props.modalTriggerId)
      if (prevBtn) prevBtn.focus();
    }
  };

  render() {
    let { modalContents, ...props } = this.props;

    return (
      <div className={ `Modal ${ modalContents ? 'is-active' : 'is-hidden' }` } onKeyDown={ this.keyDownHandler } id='modal-wrapper'>
        <Transition in={!!modalContents} timeout={0}>
            {(status) => 
              <div className={ `Modal-content decend-${status}` }>
                <button className='Btn--null Btn-close' id='modal-close-button' onClick={ () => props.closeModal() }>x</button>
                { modalContents }
              </div>
            }
        </Transition>
      </div>
    )
  }
};

export default Modal;

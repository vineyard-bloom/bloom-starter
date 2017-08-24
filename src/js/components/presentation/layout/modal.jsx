import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from 'redux-store/actions/modalActions';

import 'common/styles/components/modal'

class Modal extends React.Component {

  state = {
    lastFocus: null
  }

  findLast = () => {
    // find last anchor on page and focus
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
  }

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
    }
  }

  componentDidMount = () => {
    let closeBtn = document.getElementById('modal-close-button');
    if (closeBtn) closeBtn.focus();

    this.findLast()
  };

  componentWillReceiveProps = (newProps) => {
    if (!this.props.modalContents && newProps.modalContents) {
      setTimeout(() => {
        let closeBtn = document.getElementById('modal-close-button');
        if (closeBtn) closeBtn.focus();
        this.findLast()
      }, 200);
    } else if (newProps.modalContents) {
      setTimeout(() => {
        this.findLast()
      }, 200)
    }
  };

  componentWillUnmount = () => {
    let prevBtn = document.getElementById(this.props.modalTriggerId)
    if (prevBtn) prevBtn.focus();
  };

  render() {
    let { modalContents, ...props } = this.props;

    return (
      <div className={ `modal ${ modalContents ? 'active' : 'hidden' }` } onKeyDown={ this.keyDownHandler } id='modal-wrapper'>
        { modalContents &&
          <div className='modal-content'>
            <button className='btn--null btn-close' id='modal-close-button' onClick={ () => props.closeModal() }>x</button>
            { modalContents }
          </div>
        }
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    modalContents: state.modal.modalContents,
    modalTriggerId: state.modal.modalTriggerId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(closeModal());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

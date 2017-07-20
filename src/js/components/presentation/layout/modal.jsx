import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from 'redux-store/actions/modalActions';

import 'styles/components/modal';

const Modal = (props) => {
  let modalContents = props.modalContents;

  return (
    <div className={ `modal ${ modalContents ? 'active' : 'hidden' }` }>
      { modalContents ?
        <div className='modal-content'>
          <button className='btn-close' onClick={ () => props.closeModal() }>x</button>
          { modalContents }
        </div>
        : '' }
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    modalContents: state.modal.modalContents
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

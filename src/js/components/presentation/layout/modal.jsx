import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from 'redux-store/actions/modalActions';

import 'styles/components/modal';

class Modal extends React.Component {

  componentDidMount = () => {
    document.getElementById('modal-close-button').focus();
  }

  render() {
    let { modalContents, ...props } = this.props;

    return (
      <div className={ `modal ${ modalContents ? 'active' : 'hidden' }` }>
        { modalContents ?
          <div className='modal-content'>
            <button className='btn--null btn-close' id='modal-close-button' onClick={ () => props.closeModal() }>x</button>
            { modalContents }
          </div>
          : '' }
      </div>
    )
  }
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

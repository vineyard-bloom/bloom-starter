import actionTypes from './types';


/* modal action creators */

export function closeModal() {
  return {
    type: actionTypes.CLOSE_MODAL
  }
}

export function openModal(modalContents) {
  return {
    type: actionTypes.OPEN_MODAL,
    modalContents
  }
}
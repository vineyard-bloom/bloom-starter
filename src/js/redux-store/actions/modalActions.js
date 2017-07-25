import actionTypes from './types';


/* modal action creators */

export function closeModal() {
  return {
    type: actionTypes.CLOSE_MODAL
  }
}

export function openModal(e, modalContents) {
  return {
    type: actionTypes.OPEN_MODAL,
    modalContents,
    modalTriggerId: e.target.id
  }
}
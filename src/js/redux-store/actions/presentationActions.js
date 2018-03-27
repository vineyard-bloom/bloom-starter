import actionTypes from './types'

/* presentation actions -- top level, needed from anywhere (freezing content, etc.) */

export function freezePage(isFrozen) {
  return {
    type: actionTypes.FREEZE_UNFREEZE,
    isFrozen
  }
}

export function setWindowSize(height, width) {
  return {
    type: actionTypes.SET_WINDOW_SIZE,
    height,
    width
  }
}

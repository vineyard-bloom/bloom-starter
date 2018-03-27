import produce from 'immer'

const initialState = {
  alerts: [],
  forms: Object.freeze({}),
  modal: Object.freeze({
    modalContents: null,
    modalTriggerId: ''
  }),
  presentation: Object.freeze({
    freezeContent: false,
    width: null,
    height: null
  }),
  user: Object.freeze({
    id: '',
    loaded: false,
    notifications: [],
    username: '',
    walletAddress: ''
  })
}

export default produce(initialState, () => {})

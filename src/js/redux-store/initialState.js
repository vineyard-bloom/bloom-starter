const initialState = {
  user: {
    id: '',
    loaded: false,
    notifications: [],
    username: '',
    walletAddress: ''
  },
  forms: {},
  modal: {
    modalContents: null,
    modalTriggerId: ''
  },
  alerts: []
}

export default initialState;
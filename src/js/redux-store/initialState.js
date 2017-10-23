const initialState = {
  user: {
    account: {
      status: '',
      total: ''
    },
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
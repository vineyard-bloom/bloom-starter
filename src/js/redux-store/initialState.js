const initialState = {
  user: {
    account: {
      status: '',
      total: ''
    },
    id: '',
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
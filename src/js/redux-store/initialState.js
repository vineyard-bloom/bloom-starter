import config from 'config/config.json';
import { WebServiceStub } from 'stubs/webservice-stub';
import { WebService } from 'services/WebService/webservice';

const initialState = {
  services: {
    WebService: config.app.useWebServiceStub ? new WebServiceStub() : new WebService()
  },
  user: {
    avatar: null,
    account: {
      status: null,
      cash: '0',
      lent: '0',
      offered: '0',
      debts: '0'
    },
    borrowingHistory: [],
    lendingHistory: [],
    lendingInfo: {},
    id: null,
    username: null,
    display_name: null,
    notifications: []
  },
  forms: {},
  modal: {
    modalContents: null,
  },
  engineState: {
    availableEth: '0',
    countdown: '0',
    interestRate: '0',
    totalEth: '0',
    pendingOut: '0',
    pendingIn: '0'
  }
}

export default initialState;
import config from 'config/config.json';
import { WebServiceStub } from 'stubs/webservice-stub';
import { WebService } from 'services/WebService/webservice';

const initialState = {
  services: {
    WebService: config.app.useWebServiceStub ? new WebServiceStub() : new WebService()
  },
  user: {
    username: '',
    id: ''
  },
  forms: {},
  modal: {
    modalContents: null,
  }
}

export default initialState;
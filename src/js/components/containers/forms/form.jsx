import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BigNumber from 'bignumber.js';

import { convertEthToWei, convertWeiToEth } from 'helpers';
import { addFormError, clearForm, createForm, deleteFormError, updateForm } from 'redux-store/actions/formActions';
import { WebServiceType } from 'types';

import 'styles/components/forms';
import 'styles/components/inputs';

// container for wrapping all forms with needed methods
class Form extends React.Component {
  static propTypes = {
    addFormError: PropTypes.func,
    autofillDataRoute: PropTypes.string,
    clearForm: PropTypes.func,
    createForm: PropTypes.func,
    deleteFormError: PropTypes.func,
    fieldNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    forms: PropTypes.object,
    id: PropTypes.string.isRequired,
    submitRoute: PropTypes.string.isRequired,
    updateForm: PropTypes.func,
    WebService: PropTypes.shape(WebServiceType)
  }; // make sure only those that don't come from redux are passed in

  static mapDispatchToProps(dispatch, ownProps) {
    return {
      addFormError: (formId, fieldName, errorMessage) => {
        dispatch(addFormError(formId, fieldName, errorMessage));
      },
      clearForm: (formId) => {
        dispatch(clearForm(formId));
      },
      createForm: (formId, formObject) => {
        dispatch(createForm(formId, formObject));
      },
      deleteFormError: (formId, fieldName) => {
        dispatch(deleteFormError(formId, fieldName));
      },
      updateForm: (e, formId=ownProps.id) => {
        dispatch(updateForm(e, formId));
      }
    }
  };

  static mapStateToProps(state) {
    return {
      forms: state.forms,
      WebService: state.services.WebService
    }
  };

  checkErrors = (e) => {
    if (e) { e.preventDefault(); }

    if (e.target.value != '' && this.props.validateField(e.target.id, e.target.value)) {
      deleteFormError(this.props.id, e.target.id);
    }
  };

  submitForm = (e) => {
    e.preventDefault();

    let thisForm = this.props.forms && this.props.forms[this.props.id] ? { ...this.props.forms[this.props.id] } : null;
    let unconvertedForm = { ...thisForm };

    for (let field in thisForm) {
      if (field === 'amount') {
        thisForm[field] = convertEthToWei(new BigNumber(thisForm[field].value));
      } else {
        thisForm[field] = thisForm[field].value;
      }
    }

    if (thisForm) {
      this.props.WebService.post(this.props.submitRoute, thisForm)
        .then((res) => {
          if (this.props.afterSubmit) {
            this.props.afterSubmit(res, unconvertedForm);
          }
        })
        .catch((err) => {
          console.log('submission error: ', err);
        });
    } else {
      // debugging helper
      console.log(`form id '${this.props.id}' doesn't exist in the redux store`);
    }
  };

  focusOnFirst = () => {
    let firstInput = [...document.getElementById(this.props.id).querySelectorAll('input, select, textarea')][0];
    if (firstInput) {
      firstInput.focus();
    }
  };

  componentDidMount = () => {
    let formData = {};
    // initialize the form with all fields inside
    this.props.fieldNames.forEach((name) => {
      if (name.type) {
        formData[name.name] = {};

        switch(name.type) {
          case 'checkbox':
            formData[name.name].checked = false;
          default:
            break;
        }
      } else {
        formData[name] = { value: '' };
      }
    });

    if (this.props.autofillDataRoute && this.props.WebService) {
      this.props.WebService.get(this.props.autofillDataRoute)
        .then((res) => {
          if (res.data) {
            for (var key in res.data) {
              if (formData[key]) { // we only want fields that exist in the form to update
                formData[key].value = res.data[key];
              }
            }
          }
          this.props.createForm(this.props.id, formData);
        });
    } else {
      this.props.createForm(this.props.id, formData);
    }

    this.focusOnFirst();
  };

  componentWillReceiveProps = (newProps) => {
    if (this.props.autofillDataRoute != newProps.autofillDataRoute && newProps.autofillDataRoute && newProps.WebService) {
      newProps.WebService.get(newProps.autofillDataRoute)
        .then((res) => {
          newProps.createForm(newProps.id, res.data);
        });
    } else if (!this.props.WebService && newProps.WebService && (newProps.autofillDataRoute)) {
      newProps.WebService.get(newProps.autofillDataRoute)
        .then((res) => {
          newProps.createForm(newProps.id, res.data);
        });
    }
  };

  render() {
    let { submitRoute, autofillDataRoute, ...props } = this.props;
    
    // make sure this works if the form has one child or many
    let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];

    let thisForm = props.forms && props.forms[props.id] ? props.forms[props.id] : null;

    // clone the children to pass in custom props related to entire form
    let formChildren = React.Children.map(children, (child, indx) => {
      return React.cloneElement(child, {
        addFormError: props.addFormError,
        checkErrors: this.checkErrors,
        deleteFormError: props.deleteFormError,
        formData: thisForm,
        formId: props.id,
        isValid: props.forms && props.forms[props.id] ? props.forms[props.id].isValid : false,
        updateForm: props.updateForm,
        submitForm: this.submitForm,
        ...props
      });
    });

    return (
      <div>
        { formChildren }
      </div>
    );
  };
}

export default connect(Form.mapStateToProps, Form.mapDispatchToProps)(Form);

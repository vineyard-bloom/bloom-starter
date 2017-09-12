import React from 'react'
import PropTypes from 'prop-types'

import ErrorTip from 'presentation/layout/error-tip'

import 'styles/components/inputs.scss'
import 'styles/components/select-input.scss'

class SelectInput extends React.Component {
  state = {
    showList: false
  };

  selectOpt = (val) => {
    this.props.onChange(this.props.formId, val, this.props.name);

    this.setState({
      showList: false
    });
  };

  closeOpts = (e) => {
    e.persist()
    const target = e.target

    // find if it's our label or inside our label
    let thisLabel = e.relatedTarget;
    if (thisLabel && thisLabel.getAttribute) {
      while (!thisLabel.getAttribute('for')) {
        if (thisLabel) {
          thisLabel = thisLabel.parentNode
        } else {
          // not even an input
          thisLabel = null;
        }
      }
    } else {
      thisLabel = null;
    }

    if (!thisLabel || (thisLabel.getAttribute('for') && (thisLabel.getAttribute('for') !== this.props.name))) {
      this.setState({
        showList: false
      })
    }

    const select = document.getElementById(this.props.name)

    if (this.props.onBlur) {
      this.props.onBlur(e, select)
    }
  };

  keyDownHandler = (evt) => {
    const e = evt || window.event
    const keyCode = e.which || e.keyCode

    if (keyCode === 27) { // escape key
      this.setState({
        showList: false
      })
    } else if (keyCode === 38) { // arrow up
      // focus on previous option
    } else if (keyCode === 40) { // arrow down
      // focus on next option
    }
  };

  toggleList = (e) => {
    e.preventDefault();
    this.setState({
      showList: !this.state.showList
    });
  };

  render() {
    const { containerClass, label, name, onChange, options, validateAs, value, error, ...rest } = this.props;
    let opts = options.map((opt, i) => {
      return opt.label
        ? (
          <option key={ `${name}-opt-${i}` } value={ opt.value }>
            { opt.label }
          </option>
        ) : (
          <option key={ `${name}-opt-${i}` } value={ opt }>{ opt }</option>
        );
    });

    let placeholderOpts = options.map((opt, i) => {
      return opt.label
        ? (
          <li key={ `${ name }-opt-${i}` } onClick={ (e) => this.selectOpt(opt.value) }>
            <button className='btn--null'>
              { opt.label }
            </button>
          </li>
        ) : (
          <li key={ `${ name }-opt-${i}` } onClick={ (e) => this.selectOpt(opt) }>
            <button className='btn--null'>
              { opt }
            </button>
          </li>
        );
    })

    let attr = {};

    if (rest.required) {
      attr['required'] = true;
      attr['aria-required'] = true;
    }

    let translateVal = options[0] && !!options[0].label;
    let activeOptLabel;
    if (translateVal && value) {
      activeOptLabel = options.filter((opt) => opt.value.toString() === value.toString())[0];
      activeOptLabel = activeOptLabel ? activeOptLabel.label : 'Select';
    }

    return (
      <label className={ `input__label select-input ${ containerClass || '' }` } htmlFor={ name }
        onBlur={ this.closeOpts } onKeyDown={ this.keyDownHandler }>
        <span className='input__label__text'>
          { label }{ attr.required && <span>{ '\u00A0' }*<span className="u-sr-only"> required field</span></span> }
        </span>
        <button className={ `input__placeholder non-sr-only ${ this.state.showList ? 'is-open' : '' }` }
          onClick={ this.toggleList }>
          { translateVal ? activeOptLabel : (value || 'Select') }
        </button>
        { error && <ErrorTip contents={ error } className='tooltip--error--select' /> }
        { this.state.showList &&
          <ul className='select-input__opts non-sr-only'>
            { placeholderOpts }
          </ul>
        }
        <select value={ value } name={ name } id={ name } className='u-sr-only' { ...attr } data-validate={ validateAs }>
          { opts }
        </select>
      </label>
    )
  }
}

SelectInput.propTypes = {
  containerClass: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired
    })
  ])).isRequired,
  required: PropTypes.bool,
  showLabel: PropTypes.bool,
  validateAs: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

SelectInput.defaultProps = {
  value: ''
}

export default SelectInput;

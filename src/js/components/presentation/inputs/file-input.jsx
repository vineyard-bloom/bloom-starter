'use strict';
import React from 'react';

import 'common/styles/components/inputs.scss';

// this is a hybrid component
class FileInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileText: 'Choose a File'
    }
  };

  static propTypes = {
    description: React.PropTypes.string,
    handleFile: React.PropTypes.func,
    label: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool,
  };

  triggerInput = (e) => {
    let input = document.getElementById(this.props.id);
    if (e.target.getAttribute('type') === 'file') {
      return;
    }
    e.preventDefault();
    input.click();
  }

  updateText = (e) => {
    e.persist();
    let fileName = document.getElementById(this.props.id).value.split( '\\' ).pop();
    // we don't want to update prevFile, or the input will disappear and it won't be able to upload
    this.setState({
      fileText: fileName
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(e, this.props.formId, fileName);
      }
    });
  }

  render = () => {
    let requiredString = '';
    let attributes = {};

    if (this.props.required) {
      requiredString = (<span className="u-required-red"> * <span className="u-sr-only">required field</span></span>);
      attributes['required'] = 'required';
      attributes['aria-required'] = 'true';
    }

    return (
      <label htmlFor={ this.props.name } className="input__label input--file" onClick={ this.triggerInput }>
        { `${this.props.label} ${requiredString}` }
        <div className='input__placeholder'>
          <div className="input--file__text">
            { this.state.fileText }
          </div>
          <div className='btn'>
            Browse <span className="u-sr-only">local file system</span>
          </div>
        </div>
        <input name={ this.props.name } id={ this.props.id } { ...attributes }
          type="file" className="input" style={ {display: 'none'} } onChange={ this.updateText }
          data-multiple-caption="{count} files selected" multiple />
      </label>
    )
  }
}

export default FileInput;
import React from 'react'
import PropTypes from 'prop-types'

import Loading from 'presentation/layout/loading'

const docDrop = (e) => {
  e.preventDefault();
}

// simplified from react-dropzone
class MyDropzone extends React.Component {
  state = {
    loading: false,
    preview: null
  }

  onDrop = (e) => {
    e.preventDefault();
    const items = this.getDataTransferItems(e)

    if (!this.state.loading) {
      this.setState({
        loading: true
      })
    }

    if (items[0] && items[0].name) {
      this.setState({
        loading: false,
        preview: URL.createObjectURL(items[0])
      })
    }

    this.props.onChange(this.props.formId, items, this.props.name);
  }

  getDataTransferItems(event) {
    let dataTransferItemsList = []
    if (event.dataTransfer) {
      const dt = event.dataTransfer
      if (dt.files && dt.files.length) {
        dataTransferItemsList = dt.files
      } else if (dt.items && dt.items.length) {
        // During the drag even the dataTransfer.files is null
        // but Chrome implements some drag store, which is accesible via dataTransfer.items
        dataTransferItemsList = dt.items
      }
    } else if (event.target && event.target.files) {
      dataTransferItemsList = event.target.files
    }
    // Convert from DataTransferItemsList to the native Array
    return [...dataTransferItemsList]
  }

  triggerInput = (e) => {
    let input = document.getElementById(this.props.name);
    if (e.target.getAttribute('type') === 'file') {
      return;
    }
    e.preventDefault();
    input.click();
  }

  componentDidMount() {
    document.addEventListener('dragover', docDrop, false)
    document.addEventListener('drop', this.onDrop, false)
  }

  componentWillUnmount() {
    document.removeEventListener('dragover', docDrop)
    document.removeEventListener('drop', this.onDrop)
  }

  render() {
    const { file, label, name, onDrop, required } = this.props
    const dropZoneStyle = {
      border: '2px dashed #ddd',
      borderRadius: '5px',
      color: '#ddd',
      height: '310px',
      marginBottom: '30px',
      marginTop: '2px',
      minHeight: '100px',
      overflow: 'hidden',
      padding: '20px',
      position: 'relative',
      width: '100%'
    }
    let requiredString = ''
    let attr = {}

    if (required) {
      requiredString = (<span>{ '\u00A0' }*<span className="u-sr-only"> required field</span></span>)
      attr['required'] = true
      attr['aria-required'] = 'true'
    }

    return (
      <label className='input__label drop-zone' onClick={ this.triggerInput }>
        { label }{ requiredString }
        <div onDragOver={ this.onDrop } multiple={ false } style={ dropZoneStyle } className='drop-zone__box'>
          { this.state.preview
            ? <img className='upload-img' src={ this.state.preview } style={ { margin: '0 auto', width: '90%' } } />
            : (
              <p className='u-text-center'>
                Drag image or click here to select
                { this.state.loading && <Loading /> }
              </p>
            )
          }
          <input type='file' className='u-sr-only' id={ name } onChange={ this.onDrop } />
        </div>
      </label>
    )
  }
}

MyDropzone.propTypes = {
  file: PropTypes.object,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool
}

export default MyDropzone;

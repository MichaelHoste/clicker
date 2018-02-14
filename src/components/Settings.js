import React, { Component } from 'react';

class Settings extends Component {

  constructor(props) {
    super(props)

    this.state = {
      saveModalIsOpen: false,
      loadModalIsOpen: false,
      stringToLoad:    ""
    }
  }

  openSaveModal() {
    this.setState({
      saveModalIsOpen: true
    })
  }

  openLoadModal() {
    this.setState({
      loadModalIsOpen: true
    })
  }

  closeModals() {
    this.setState({
      saveModalIsOpen: false,
      loadModalIsOpen: false
    })
  }

  updateStringToLoad(e) {
    this.setState({
      stringToLoad: e.target.value,
    })
  }

  base64State() {
    return btoa(JSON.stringify(this.props.currentState))
  }

  import() {
    this.props.importStateInBase64(this.state.stringToLoad)
  }

  render() {
    return [
      this.renderSettings(),
      this.renderSaveWindows(),
      this.renderLoadWindows()
    ];
  }

  renderSettings() {
    return (
      <div className="settings">
        <div className="save"
             onClick={this.openSaveModal.bind(this)}>
          Save
        </div>

        <div className="load"
             onClick={this.openLoadModal.bind(this)}>
          Load
        </div>
      </div>
    )
  }

  renderSaveWindows() {
    if(this.state.saveModalIsOpen) {
      return (
        <div className="save-modal">
          <textarea>
            { this.base64State() }
          </textarea>

          <button className="btn">
            Copy to the clipboard
          </button>

          { this.renderCloseModal() }
        </div>
      )
    }
  }

  renderLoadWindows() {
    if(this.state.loadModalIsOpen) {
      return (
        <div className="load-modal">
          <textarea onChange={this.updateStringToLoad.bind(this)}>
            { this.state.stringToLoad }
          </textarea>

          <button className="btn"
                  onClick={this.import.bind(this)}>
            Import
          </button>

          { this.renderCloseModal() }
        </div>
      )
    }
  }

  renderCloseModal() {
    return (
      <div className="close"
           onClick={ this.closeModals.bind(this) }>
        &times;
      </div>
    )
  }
}

export default Settings;

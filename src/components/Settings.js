import React, { Component } from 'react';

class Settings extends Component {

  constructor(props) {
    super(props)

    this.state = {
      saveModalIsOpen: false,
      loadModalIsOpen: false,
      stringToLoad:    "",
      savedString:     ""
    }
  }

  openSaveModal() {
    this.setState({
      saveModalIsOpen: true,
      loadModalIsOpen: false
    }, this.createAndSelectSavedString.bind(this))
  }

  openLoadModal() {
    this.setState({
      loadModalIsOpen: true,
      saveModalIsOpen: false,
      stringToLoad:    ""
    }, this.selectLoadedString.bind(this))
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

  createAndSelectSavedString() {
    this.setState({
      savedString: this.base64State(this.props.currentState)
    }, this.selectSavedString.bind(this))
  }

  selectSavedString() {
    this.refs.saveTextarea.select();
  }

  selectLoadedString() {
    this.refs.loadTextarea.select();
  }

  copySaveStringToClipboard() {
    this.selectSavedString()
    document.execCommand("Copy");
  }

  base64State(currentState) {
    return btoa(JSON.stringify(currentState))
  }

  import() {
    this.props.importStateInBase64(this.state.stringToLoad);
    this.closeModals();
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
      <div className="settings"
           key="settings">
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
        <div className="save-modal"
             key="saveModal">
          <textarea ref="saveTextarea"
                    value={this.state.savedString}
                    readOnly>
          </textarea>

          <button className="btn"
                  onClick={this.copySaveStringToClipboard.bind(this)}>
            Copy to clipboard
          </button>

          { this.renderCloseModal() }
        </div>
      )
    }
  }

  renderLoadWindows() {
    if(this.state.loadModalIsOpen) {
      return (
        <div className="load-modal"
             key="loadModal">
          <textarea ref="loadTextarea"
                    onChange={this.updateStringToLoad.bind(this)}
                    value={ this.state.stringToLoad }>
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

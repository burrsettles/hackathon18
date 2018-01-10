import React, { Component } from 'react'
import { connect } from 'react-redux';

import { postText } from 'actions'


// Properties
const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  onPostText: (text, lang) => dispatch(postText(text, lang))
});


class Input extends Component {

  constructor(props) {
    super(props)
    this.handleGenerateClick = this.handleGenerateClick.bind(this)
    this.handleLanguageSelect = this.handleLanguageSelect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      language: 'en',
      inputText: ''
    }
  }

  handleGenerateClick(e) {
    this.props.onPostText(this.state.inputText, this.state.language)
  }

  handleInputChange(e) {
    this.setState({
      inputText: e.target.value
    })
  }


  handleLanguageSelect(event) {
    this.setState({
      language: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div id='input-holder'>
          <div id='input-holder-inner'>
            <h2> Enter Text </h2>
            <div>
              <textarea
                className='text-input'
                type="text"
                onChange={this.handleInputChange}
                />
            </div>
            <div>
              <select id="language-select" onChange={this.handleLanguageSelect}>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </select>
              <button className={this.props.isLoading ? 'loading' : null}
                      id="generate-button"
                      onClick={this.handleGenerateClick}>
                GENERATE
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//export default connect((state, ownProps) => ownProps, () => ({}))(ReaderBody)
export default connect(mapStateToProps, mapDispatchToProps)(Input)
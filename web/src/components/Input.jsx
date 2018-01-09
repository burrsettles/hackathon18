import React, { Component } from 'react'
import { connect } from 'react-redux';

import { postText } from 'actions'


// Properties


const mapDispatchToProps = dispatch => ({
  onPostText: (text, lang) => dispatch(postText(text, lang))
});


class Input extends Component {

  constructor(props) {
    super(props)
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this)
    this.handleLanguageSelect = this.handleLanguageSelect.bind(this)
    this.state = {
      language: 'en'
    }
  }

  handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      console.log(this.state)
      this.props.onPostText(e.target.value, this.state.language)
    }
  }

  handleLanguageSelect(event) {
    console.log(event.target.value)
    this.setState({
      language: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div>
          <select onChange={this.handleLanguageSelect}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>
        <div>
          <textarea
            className='text-input'
            type="text"
            onKeyPress={this.handleInputKeyPress} />
        </div>
      </div>
    )
  }
}

//export default connect((state, ownProps) => ownProps, () => ({}))(ReaderBody)
export default connect((state, ownProps) => ownProps, mapDispatchToProps)(Input)
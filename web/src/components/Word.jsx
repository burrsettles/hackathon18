import React, { Component } from 'react'
import { connect } from 'react-redux';

import { clickWord } from 'actions'

const mapDispatchToProps = dispatch => ({
  onClickWord: (wordIndex, sentenceIndex) => dispatch(clickWord(wordIndex, sentenceIndex))
});

class Word extends Component {

  constructor(props) {
    super(props)
    this.onClickWord = this.onClickWord.bind(this)
  }

  onClickWord() {
    this.props.onClickWord(this.props.wordIndex, this.props.sentenceIndex)
  }

  getClassName(wordType) {
    switch (wordType) {
      case 'MAIN':
        return 'main'
      case 'OBJ':
        return 'obj'
      case 'SUBJ':
        return 'subj'
    }
  }

  render() {
    var className = this.getClassName(this.props.wordType)
    return (
      <span className={className} onClick={() => this.onClickWord() }>
        {this.props.wordText}
      </span>
    )
  }
}

export default connect((state, ownProps) => ownProps, mapDispatchToProps)(Word)



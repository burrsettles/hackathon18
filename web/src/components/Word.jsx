import React, { Component } from 'react'
import { connect } from 'react-redux';

import { clickWord, focusChunk } from 'actions'

const mapDispatchToProps = dispatch => ({
  onClickWord: (wordIndex, sentenceIndex) => dispatch(clickWord(wordIndex, sentenceIndex)),
  onHoverWord: (chunk, sentenceIndex) => dispatch(focusChunk(chunk, sentenceIndex))
});

class Word extends Component {

  constructor(props) {
    super(props)
    this.onClickWord = this.onClickWord.bind(this)
    this.onHoverWord = this.onHoverWord.bind(this)

  }

  onClickWord() {
    this.props.onClickWord(this.props.wordIndex, this.props.sentenceIndex)
  }

  onHoverWord() {
    if (this.props.chunk !== null) {
      this.props.onHoverWord(this.props.chunk, this.props.sentenceIndex)
    } else {
      this.props.onHoverWord([0,0], -1)
    }
  }

  getClassName(wordType) {
    switch (wordType) {
      case 'MAIN':
        return 'main'
      case 'OBJ':
        return 'obj'
      case 'SUBJ':
        return 'subj'
      case 'AUX':
        return 'aux'
      case 'COMP':
        return 'comp'
      case 'COMP_MAIN':
        return 'comp_main'
      case 'NEG':
        return 'neg'
    }
  }

  render() {
    var className = this.getClassName(this.props.wordType)
    var word = this.props.wordText.trim()
    var followingWhitespace = Array(this.props.wordText.length - word.length + 1).join(' ')
    return (
      <span onClick={() => this.onClickWord()}
            onMouseOver={() => this.onHoverWord()}>
        <span className={className}>
          {word}
        </span>
        {followingWhitespace}
      </span>
    )
  }
}

export default connect((state, ownProps) => ownProps, mapDispatchToProps)(Word)



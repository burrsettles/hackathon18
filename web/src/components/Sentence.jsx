import React, { Component } from 'react'
import { connect } from 'react-redux';

import { clickWord, focusSentence } from 'actions'

import Word from 'components/Word'

const mapStateToProps = (state, ownProps) => {
  return {
    inFocus: state.sentenceInFocusIndex == ownProps.index,
    words: ownProps.words,
    index: ownProps.index
  };
};

const mapDispatchToProps = dispatch => ({
  onMouseOver: (wordIndex, sentenceIndex) => dispatch(clickWord(wordIndex, sentenceIndex))
});

class Sentence extends Component {

  constructor(props) {
    super(props)
  }

  onMouseOver() {
    console.log("mouseover")
    this.props.onMouseOver(0, this.props.index)
  }

  render() {
    const wordComponents = this.props.words.map(word =>
        <Word
              wordText={word.text}
              wordType={word.wordType}
              wordIndex={word.index}
              sentenceIndex={this.props.index}
        />)

    return (
      <span className={this.props.inFocus ? 'inFocus' : null}
            onMouseOver={() => this.onMouseOver()}>
        {wordComponents}
      </span>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sentence)



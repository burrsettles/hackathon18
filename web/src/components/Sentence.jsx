import React, { Component } from 'react'
import { connect } from 'react-redux';

import { clickWord, focusSentence } from 'actions'

import Word from 'components/Word'

const mapStateToProps = (state, ownProps) => {
  return {
    inFocus: state.sentenceInFocusIndex == ownProps.index,
    words: ownProps.words,
    index: ownProps.index,
    chunk: state.chunkInFocus && state.chunkInFocus.sentenceIndex == ownProps.index
      ? state.chunkInFocus.chunk
      : [0,0]
  };
};

const mapDispatchToProps = dispatch => ({
  onMouseOver: (sentenceIndex) => dispatch(focusSentence(sentenceIndex))
});

class Sentence extends Component {

  constructor(props) {
    super(props)
  }

  onMouseOver() {
    this.props.onMouseOver(this.props.index)
  }

  findContainingChunk(index) {
    var resultChunk = null
    this.props.words.chunks.forEach((chunk) => {
      if (index >= chunk[0] && index <= chunk[1]) {
        resultChunk = chunk
      }
    });
    return resultChunk
  }

  render() {

    var chunk = this.props.chunk
    const wordComponents = this.props.words.tokens.map((word) => {
      return <Word
        wordText={word.text}
        wordType={word.wordType}
        wordIndex={word.index}
        sentenceIndex={this.props.index}
        chunk={this.findContainingChunk(word.index)}
      />
    })

    var beforeChunkWords = wordComponents.slice(0, chunk[0])
    var chunkWords =
      <span className="chunkInFocus">
        {wordComponents.slice(chunk[0], chunk[1])}
      </span>
    var afterChunkWords = wordComponents.slice(chunk[1], wordComponents.length)

    return (
      <span className={this.props.inFocus ? 'sentenceInFocus' : null}
            onMouseOver={() => this.onMouseOver()}>
        {
          beforeChunkWords.concat(chunkWords).concat(afterChunkWords)
        }
      </span>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sentence)



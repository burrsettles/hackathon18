import React, { Component } from 'react'
import { connect } from 'react-redux';

import { clickWord } from 'actions'

import Word from 'components/Word'

const mapStateToProps = (state, ownProps) => {
  return {
    inFocus: state.sentenceInFocusIndex == ownProps.index,
    words: ownProps.words,
    index: ownProps.index
  };
};

class Sentence extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const wordComponents = this.props.words.map(word =>
      <span className={this.props.inFocus ? 'inFocus' : null}>
        <Word
              wordText={word.text}
              wordType={word.wordType}
              wordIndex={word.index}
              sentenceIndex={this.props.index}
        />{'\u00A0'}
      </span>)

    return (
      <span>
        {wordComponents}
      </span>
    )
  }
}

export default connect(mapStateToProps, () => ({}))(Sentence)



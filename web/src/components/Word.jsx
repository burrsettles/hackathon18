import React, { Component } from 'react'
import { connect } from 'react-redux';

import { clickWord } from 'actions'

const mapDispatchToProps = dispatch => ({
  onClickWord: (edges) => dispatch(clickWord(edges))
});

class Word extends Component {

  constructor(props) {
    super(props)
    this.onClickWord = this.onClickWord.bind(this)
  }

  onClickWord() {
    this.props.onClickWord(this.props.edges)
  }

  getClaseName(wordType) {
    switch (wordType) {
      case 'ROOT':
        return 'main'
      case 'OBJ':
        return 'obj'
      case 'SUBJ':
        return 'subj'
    }
  }

  render() {
    var className = this.getClaseName(this.props.wordType)
    return (
      <span className={className} onClick={() => this.onClickWord() }>
        {this.props.wordText}
      </span>
    )
  }
}

export default connect((state, ownProps) => ownProps, mapDispatchToProps)(Word)



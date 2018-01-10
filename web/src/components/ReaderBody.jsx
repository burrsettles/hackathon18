import React, { Component } from 'react'
import { connect } from 'react-redux';

import { loadPage } from 'actions'

import Sentence from 'components/sentence'

// Properties

const mapStateToProps = (state, ownProps) => {
  return {
    sentences: state.sentences,
  };
};

const mapDispatchToProps = dispatch => ({
  onloadPage: () => dispatch(loadPage())
});

class ReaderBody extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onloadPage()
  }

  render() {
    const sentenceComponents = this.props.sentences.map((sentence, index) =>
      <span>
        <Sentence
              words={sentence}
              index={index}
        />{"\u00A0"}
      </span>)

    return (
      <div id="readerBody">
        <p>
          {sentenceComponents}
        </p>
      </div>
    )

  }
}

//export default connect((state, ownProps) => ownProps, () => ({}))(ReaderBody)
export default connect(mapStateToProps, mapDispatchToProps)(ReaderBody)
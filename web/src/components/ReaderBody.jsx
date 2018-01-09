import React, { Component } from 'react'
import { connect } from 'react-redux';

import { loadPage } from 'actions'

import Word from 'components/Word'

// Properties

const mapStateToProps = (state, ownProps) => {
  return {
    words: state.words,
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
    const wordComponents = this.props.words.map(word =>
      <span>
        <Word wordText={word.text}
              wordType={word.wordType}
              edges={word.edges}
        />{'\u00A0'}
      </span>)

    return (
      <h3>
        {wordComponents}
      </h3>
    )

  }
}

//export default connect((state, ownProps) => ownProps, () => ({}))(ReaderBody)
export default connect(mapStateToProps, mapDispatchToProps)(ReaderBody)
import React, { Component } from 'react'
import { connect } from 'react-redux';

import clickWord from 'actions'

// Properties

const mapStateToProps = (state, ownProps) => {
  return {
    bodyText: state.bodyText,
  };
};

const mapDispatchToProps = dispatch => ({
  onClickWord: () => dispatch(clickWord())
});

class ReaderBody extends Component {

  constructor(props) {
    super(props)
    this.onClickWord = this.onClickWord.bind(this)
  }

  onClickWord() {
    this.props.onClickWord()
  }

  render() {

    return (
      <button onClick={() => this.onClickWord() }>
        {this.props.bodyText}
      </button>
    )

  }
}

//export default connect((state, ownProps) => ownProps, () => ({}))(ReaderBody)
export default connect(mapStateToProps, mapDispatchToProps)(ReaderBody)
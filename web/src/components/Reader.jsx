import React, { Component } from 'react'
import { connect } from 'react-redux';

import ReaderBody from 'components/ReaderBody'

// Properties

class Reader extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ReaderBody/>
    )
  }
}

export default connect((state, ownProps) => ownProps, () => ({}))(
  Reader,
);

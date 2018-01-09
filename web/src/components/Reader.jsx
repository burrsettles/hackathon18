import React, { Component } from 'react'
import { connect } from 'react-redux';

import ReaderBody from 'components/ReaderBody'
import Input from 'components/Input'

// Properties

class Reader extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <p></p>
        <Input/>
        <ReaderBody/>
      </div>
    )
  }
}

export default connect((state, ownProps) => ownProps, () => ({}))(
  Reader,
);

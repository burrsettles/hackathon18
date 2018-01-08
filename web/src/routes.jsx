import * as React from 'react';
import { Route } from 'react-router';

import Reader from 'components/Reader'

export default (
  <div>
    <Route path="/" component={Reader}/>
  </div>
);
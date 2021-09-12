import React from 'react';
import List from 'components/List';
import NumberOfMembers from 'components/NumberOfMembers';
import Rank from 'components/Rank';

const App = () => (
  <div className="App">
    <div className="row">
      <Rank />
      <NumberOfMembers />
    </div>

    <List />
  </div>
);

export default App;

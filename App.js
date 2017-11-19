import React from 'react';
import {StackNavigator} from 'react-navigation';

import Main from './components/main/main';

const App = StackNavigator({
  main:{
    screen:Main
  }
});

export default App;
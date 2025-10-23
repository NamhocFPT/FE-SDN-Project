import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AllRoute from './components/AllRoute/index';

function App() {
  return (
    <BrowserRouter>
      <AllRoute />
    </BrowserRouter>
  );
}

export default App;
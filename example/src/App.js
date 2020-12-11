import React from 'react';
import Puzzle from 'mots-puzzle-wow-react';

const App = () => {
  return (
    <div className='container'>
      <h1>Normal mode:</h1>
      <Puzzle />
      <h1>Easy mode:</h1>
      <Puzzle easy={true} />
    </div>
  );
};

export default App;

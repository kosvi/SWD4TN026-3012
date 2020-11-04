import React, { createContext, useEffect } from 'react';
import Header from './Header';

export const buttonThemes = {
  blue: {
    color: 'white',
    backgroundColor: 'blue'
  },
  black: {
    color: 'white',
    backgroundColor: 'black'
  },
};

// this would allow a more "simple" approach
// export const ButtonContext = createContext([]);
export const ButtonContext = createContext({buttonTheme: {}});

function App() {

  // but current setup gives more flexibility
  // const buttonTheme = buttonThemes.blue;
  const [buttonTheme, setButtonTheme] = React.useState({buttonTheme: {}});
  const [theme, setTheme] = React.useState('');

  useEffect(() => {
    setTheme('black');
    setButtonTheme({buttonTheme: [buttonThemes.black]});
    },
  []);

  const switchTheme = () => {
    if(theme=='black') {
      setTheme('blue');
      setButtonTheme({buttonTheme: [buttonThemes.blue]});
    }
    else {
      setTheme('black');
      setButtonTheme({buttonTheme: [buttonThemes.black]});
    }
  }

  return (
    <ButtonContext.Provider value={buttonTheme}>
      <Header />
      <button onClick={switchTheme}>Change theme</button>
    </ButtonContext.Provider>
  );
}

export default App;

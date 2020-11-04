import React, { useContext, useState } from 'react';

import { ButtonContext } from "./App";

function HeaderButton(props) {

  const buttonContext = useContext(ButtonContext);

  return (
    <div>
      <button style={buttonContext.buttonTheme[0]}>Press me</button>
    </div>
  );
}

export default HeaderButton;
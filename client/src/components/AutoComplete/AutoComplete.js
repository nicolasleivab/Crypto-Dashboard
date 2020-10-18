/* eslint-disable no-use-before-define */
import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox({ options }) {
  const theme = createMuiTheme({
    typography: {
      htmlFontSize: 11,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        id='combo-box-demo'
        options={options}
        getOptionLabel={(option) => option.id}
        style={{ width: 300, height: 75 }}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input
              type='text'
              {...params.inputProps}
              style={{ width: 270, fontSize: '1.7rem' }}
            />
          </div>
        )}
      />
    </ThemeProvider>
  );
}

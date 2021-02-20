import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: indigo,
    secondary: pink,
    background: {
      default: 'green',
      paper: 'red'
    }
  },
  typography: {
    h1: {
      fontSize: '4.5rem'
    } 
  }
});

export default theme;
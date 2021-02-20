import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    h1: {
      fontSize: '7vw'
    } 
  }
});

export default theme;
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    h1: {
      // Dynamic font-size, at most 4rem, but ideally 4% of the screen width.
      fontSize: 'min(4rem, 4vw)'
    } 
  }
});

export default theme;
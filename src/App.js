import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CountdownCard from './components/CountdownEach';
import Clock from './components/Clock';
import countdownDates from './data/countdownDates.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      wholecolor: '#ddfff7',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        bgcolor: 'background.wholecolor',
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%'
      }}>
        <Grid
          container
          spacing={4}
          direction='column'
          justifyContent='flex-start'
          alignItems='stretch'
        >
          <Grid item xs={12}>
            <Clock />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              {countdownDates.map(dateObj => {
                return (
                  <Grid item xs={12} >
                    <CountdownCard date={dateObj} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;

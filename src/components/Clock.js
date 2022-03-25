import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
    Card, 
    CardContent,
    Typography,
} from '@mui/material'

const theme = createTheme({
    palette: {
      background: {
        paper: '#FACCFF',
      },
      text: {
        primary: '#845EC2',
      },
      action: {
        active: '#A178DF',
      },
    },
  });

function Clock() {
    // [the value of the current state, the function that can be used to update the state] = useState(default value);
    const [dateString, setDate] = useState(moment().format("YYYY.MM.DD | HH[:]mm[:]ss"));

    // Use setinterval inside an useEffect hook so that it doesn't rerender 
    // every time 'clock' rerenders. The interval runs every 1 sec, and calls the setDate to update the time
    useEffect(() => {
        const interval = setInterval(() => {
            // moment().format() is used to get the current time and format it. 
            setDate(moment().format("YYYY.MM.DD | HH[:]mm[:]ss"));
        }, 1000);

        return() => clearInterval(interval);
    }, []);



    return (
        <ThemeProvider theme={theme}>
        <div>
            <Card>
                <CardContent>
                    <Typography align="center" variant="h2">{dateString}</Typography>
                </CardContent>
            </Card>
        </div>
        </ThemeProvider>
    );
}




export default Clock;

import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
    Card, 
    CardContent,
    Typography,
    LinearProgress
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

function CountdownCard(props) {
    const name = props.date.name;
    const startDateStr = props.date.startDate;
    const endDateStr = props.date.endDate;

    // parsing the props into milliseconds
    const startDate = Date.parse(startDateStr);
    const endDate = Date.parse(endDateStr); 
    const endDateObj = new Date(endDate);  //Create a Date object with the time equal to number of milliseconds passed after the Jan 1st of 1970 UTC+0.
    const totalTime = endDate - startDate;

    const [barProgress, setBarProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [barColour, setBarColour] = useState('primary');

    // updates the countdown timer every second.
    useEffect(() => {
        const interval = setInterval(() => {
            // if the date has already passed, fill out the progress bar
            if(calculateProgress(startDate, totalTime) >= 100){
                setBarProgress(100);
                setTimeLeft("Countdown Finished!");
                setBarColour('secondary');
            }else{
            // if the date has not passed, update both the progress bar and timeleft normally
                setBarProgress(calculateProgress(startDate, totalTime));
                setTimeLeft(getTimeLeftStr(endDateObj));
            }

            return () => clearInterval(interval);
        }, 1000);
    },[]);


    // reference: https://stackoverflow.com/a/6040556
    const dateFormatted = ("0" + endDateObj.getDate()).slice(-2);
    const monthFormatted = ("0" + (endDateObj.getMonth() + 1)).slice(-2)
    const dateString = `${endDateObj.getFullYear()}.${monthFormatted}.${dateFormatted}`

    const cardNameText = `${name}`;
    const cardDateText = `${dateString}`;

    return(
        <ThemeProvider theme={theme}>
        <Card sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}>
            <CardContent>
            <Typography sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>{cardNameText} on {cardDateText}</Typography>
            <Typography sx={{
            color: 'action.active',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,}}>{timeLeft}</Typography>
            <LinearProgress variant="determinate" value={barProgress} color={barColour}/>
            </CardContent>
        </Card>
        </ThemeProvider>
    );  
}

// barProgress uses percentage, and here it returns the progress of the countdown in percentage as well.
function calculateProgress(startDate, totalTime) {
    return ((Date.now() - startDate) / totalTime) * 100;
}


// return strings of days, hours, mins, secs left.
function getTimeLeftStr(endDateObj) {
    const timeLeft = endDateObj - Date.now();

    const msInDay = 1000 * 60 * 60 * 24;
    const msInHour = 1000*60*60;
    const msInMin = 1000*60;
    const msInSecond = 1000;

    const daysLeft = Math.floor(timeLeft / msInDay); 
    const daysLeftRemainder = timeLeft % msInDay;

    const hoursLeft = Math.floor(daysLeftRemainder / msInHour);
    const hoursLeftRemainder = daysLeftRemainder % msInHour;

    const minsLeft = Math.floor(hoursLeftRemainder / msInMin);
    const minsLeftRemainder = hoursLeftRemainder % msInMin;

    const secondsLeft = Math.floor(minsLeftRemainder / msInSecond);

    return (`${daysLeft} days, ${hoursLeft} hours, ${minsLeft} mins, ${secondsLeft} seconds left`);

}


export default CountdownCard;
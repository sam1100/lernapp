import { createStyles } from '@/assets/styles/styles';
import useTheme from '@/hooks/useTheme';
import React from 'react';
import TimeExerciseView from './timeexerciseview';


const DigitalToAnalog = () => {

    const { timeTheme } = useTheme();
    const styles = createStyles();

    return (

        <TimeExerciseView type="DIGITAL_TO_ANALOG" />
    )

}

export default DigitalToAnalog
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react';
import TimeExerciseView from './timeexerciseview';

const AnalogToDigital = () => {

    const timeConfig: number | undefined = useQuery(api.time.getTimeRepetitions, { reason: 'TIME_ANALOG_DIGITAL' });

    return (
        <TimeExerciseView type="ANALOG_TO_DIGITAL" timeConfig={timeConfig} />
    )
}

export default AnalogToDigital
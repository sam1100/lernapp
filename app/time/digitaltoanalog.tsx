import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react';
import TimeExerciseView from './timeexerciseview';


const DigitalToAnalog = () => {

    const timeConfig: number | undefined = useQuery(api.time.getTimeRepetitions, { reason: 'TIME_DIGITAL_ANALOG' });

    return (

        <TimeExerciseView type="DIGITAL_TO_ANALOG" timeConfig={timeConfig} />
    )

}

export default DigitalToAnalog
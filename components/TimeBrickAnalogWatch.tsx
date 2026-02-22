

import { TimeAnalogToDigitalExercise } from '@/services/TimeAnalogToDigitalService'
import React from 'react'
import { View } from 'react-native'
import AnalogWatch from './AnalogWatch'

const TimeBrickAnalogWatch = ({ exercise, editable, timeServiceRef, styles }: { exercise: TimeAnalogToDigitalExercise | null, editable: boolean, timeServiceRef: React.RefObject<any>, styles: any }) => {
    return (
        <View id='analogWatchContainer' style={styles.analogWatchContainer}>
            <AnalogWatch timeParts={timeServiceRef.current?.getTimeParts(exercise?.analog || 0)} editable={editable} />
        </View>
    )
}

export default TimeBrickAnalogWatch
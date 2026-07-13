


import { ComprehensiveCheckAnswerResult } from '@/services/ExerciseService'
import { TimeService } from '@/services/TimeService'
import React from 'react'
import { View } from 'react-native'
import AnalogWatch from './AnalogWatch'

const TimeBrickAnalogWatch = ({ answer, answerResult, result, editable, timeServiceRef, onSubmit, styles }: { answer: number | null | undefined, answerResult: ComprehensiveCheckAnswerResult | null, result: number | null | undefined, editable: boolean, timeServiceRef: React.RefObject<TimeService | null>, onSubmit: (input: number) => void, styles: any }) => {
    return (
        <View id='analogWatchContainer' style={styles.analogWatchContainer}>
            <AnalogWatch timeParts={timeServiceRef.current?.getTimeParts(answer || 0)} isResultCorrect={answerResult?.details.analog} resultTimeParts={timeServiceRef.current?.getTimeParts(timeServiceRef.current?.getDigtitalAmTime(result || 0))} editable={editable} onSubmit={onSubmit} />
        </View>
    )
}

export default TimeBrickAnalogWatch
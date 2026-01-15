import { createStyles } from '@/assets/styles/styles'
import React from 'react'
import { Text, View } from 'react-native'

const ExerciseDone = ({ correctAnswerCount, wrongAnswerCount, styles }: { correctAnswerCount: number, wrongAnswerCount: number, styles: ReturnType<typeof createStyles> }) => {
    return (
        <View>
            <Text style={styles.exercise}>Geschafft! 🎉</Text>
            <Text style={styles.exercise}>{`Richtige Antworten: ${correctAnswerCount}`}</Text>
            <Text style={styles.exercise}>{`Falsche Antworten: ${wrongAnswerCount}`}</Text>
        </View>
    )
}

export default ExerciseDone
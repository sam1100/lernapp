import { createStyles } from '@/assets/styles/styles';
import Watch from '@/components/AnalogWatch';
import DigitalWatch from '@/components/DigitalWatch';
import HeaderSubject from '@/components/HeaderSubject';
import ProgressBar, { ProgressPart } from '@/components/ProgressBar';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { ComprehensiveCheckAnswerResult } from '@/services/ExerciseService';
import { TimeAnalogToDigitalExercise, TimeAnalogToDigitalResult, TimeAnalogToDigitalService } from '@/services/TimeAnalogToDigitalService';
import { useQuery } from 'convex/react';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tableImage = require('@/assets/images/table.png');
const timeButton = require('@/assets/images/time-analog-digital-button.png');
const checkAnswerButton = require('@/assets/images/check-time-button.png');
const nextButton = require('@/assets/images/next-time-button.png');

const AnalogToDigital = () => {

    const [exercise, setExercise] = useState<TimeAnalogToDigitalExercise | null>(null);
    const [answer, setAnswer] = useState<TimeAnalogToDigitalResult | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [progressParts, setProgressParts] = useState<ProgressPart[]>([]);

    const { timeTheme, colors } = useTheme();
    const styles = createStyles();

    const timeServiceRef = useRef<TimeAnalogToDigitalService | null>(null);
    const timeConfig = useQuery(api.time.getTimeRepetitions, { reason: 'TIME_ANALOG_DIGITAL' });

    useEffect(() => {
        if (!timeConfig) return;

        timeServiceRef.current = new TimeAnalogToDigitalService(timeConfig);
        setIsAnswerCorrect(null);

        const firstExercise = timeServiceRef.current.getNextExercise();
        setExercise(firstExercise!);
        setProgressParts([]);
    }, [timeConfig]);

    const nextExercise = () => {
        setIsAnswerCorrect(null);
        setAnswer(null);
        if (timeServiceRef.current?.hasNext()) {
            const next = timeServiceRef.current.getNextExercise();
            setExercise(next!);
        } else
            setExercise(null);
    }

    const checkAnswer = (): void => {
        if (!!exercise && !!timeServiceRef.current && !!answer) {

            console.log("Überprüfe Antwort:", answer);

            const answerResult: ComprehensiveCheckAnswerResult = timeServiceRef.current.comprehensiveCheckAnswer(answer);
            setIsAnswerCorrect(answerResult.isCorrect);

            addProgressPart(answerResult.isCorrect);
        }
    }

    const addProgressPart = (correct: boolean) => {
        const width: number = 100 / (timeServiceRef.current?.getTotalExercisesCount() ?? 1);
        const start: number = progressParts.length * width;
        const gradient: [string, string] = correct ? colors.gradients.correctAnswer : colors.gradients.wrongAnswer;
        setProgressParts([...progressParts, { start, width, colors: gradient }]);
    }

    const onSubmitAm = (input: number) => {
        setAnswer((currentAnswer) => ({
            digitalAm: input,
            digitalPm: currentAnswer?.digitalPm ?? null
        }));
    }
    const onSubmitPm = (input: number) => {
        setAnswer((currentAnswer) => ({
            digitalAm: currentAnswer?.digitalAm ?? null,
            digitalPm: input
        }));
    }

    const totalCount = timeServiceRef.current?.getTotalExercisesCount() ?? 0;
    const doneCount = timeServiceRef.current?.getTotalAnswersCount() ?? 0;

    return (
        <SafeAreaView style={styles.containerLayout} edges={[]}>
            <HeaderSubject theme={timeTheme} styles={styles} image={timeButton} />
            <ImageBackground source={tableImage} resizeMode="cover" style={styles.subjectWorkspace}>
                <ProgressBar progressParts={progressParts} doneCount={doneCount} totalCount={totalCount} />
                <Watch timeParts={timeServiceRef.current?.getTimeParts(exercise?.analog || 0)} editable={false} />
                <View id='digitalWatchesContainerAM' style={styles.digitalWatchesContainer}>
                    <Text style={styles.watchExceciseNavigationElement}>a.m.</Text>
                    <View id='digitalWatchWrapper' style={styles.watchExceciseInputElement}>
                        <DigitalWatch initialTimeValue={(answer && timeServiceRef.current) ? timeServiceRef.current.getTimeString(answer?.digitalAm ?? null) : ""} editable={true} onSubmit={onSubmitAm} />
                    </View>
                    {isAnswerCorrect == null && (
                        <View id='placeholder' style={styles.watchExceciseNavigationElement} />
                    )}
                </View>
                <View id='digitalWatchesContainerPM' style={styles.digitalWatchesContainer}>
                    <Text style={styles.watchExceciseNavigationElement}>p.m.</Text>
                    <View id='digitalWatchWrapper' style={styles.watchExceciseInputElement}>
                        <DigitalWatch initialTimeValue={(answer && timeServiceRef.current) ? timeServiceRef.current.getTimeString(answer?.digitalPm ?? null) : ""} editable={true} onSubmit={onSubmitPm} />
                    </View>
                    {isAnswerCorrect == null && (
                        <View id='placeholder' style={styles.watchExceciseNavigationElement} />
                    )}
                </View>
                <View style={styles.buttonContainer} >
                    {isAnswerCorrect === null ? (
                        <TouchableOpacity onPress={() => { checkAnswer() }}><Image source={checkAnswerButton} resizeMode='contain' style={styles.subjectButton} /></TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => { nextExercise() }}><Image source={nextButton} resizeMode='contain' style={styles.subjectButton} /></TouchableOpacity>
                    )
                    }
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default AnalogToDigital
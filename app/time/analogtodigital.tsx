import { createStyles } from '@/assets/styles/styles';
import Watch from '@/components/AnalogWatch';
import DigitalWatch from '@/components/DigitalWatch';
import ExerciseDone from '@/components/ExerciseDone';
import HeaderSubject from '@/components/HeaderSubject';
import { ProgressPart } from '@/components/ProgressBar';
import { api } from '@/convex/_generated/api';
import { COIN_REASONS } from '@/convex/enums';
import useTheme from '@/hooks/useTheme';
import { ComprehensiveCheckAnswerResult } from '@/services/ExerciseService';
import { TimeAnalogToDigitalExercise, TimeAnalogToDigitalResult, TimeAnalogToDigitalService } from '@/services/TimeAnalogToDigitalService';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

    const refDigitalInputAM = useRef<TextInput | null>(null);
    const refDigitalInputPM = useRef<TextInput | null>(null);

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
            waitAndShowNextExercise();
        }
    }

    const waitAndShowNextExercise = () => {
        setTimeout(() => {
            nextExercise();
        }, 2000);
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

        refDigitalInputPM.current?.focus();
    }
    const onSubmitPm = (input: number) => {
        setAnswer((currentAnswer) => ({
            digitalAm: currentAnswer?.digitalAm ?? null,
            digitalPm: input
        }));

        //        refDigitalInputAM.current?.focus();
    }

    const totalCount = timeServiceRef.current?.getTotalExercisesCount() ?? 0;
    const doneCount = timeServiceRef.current?.getTotalAnswersCount() ?? 0;

    const answerCorrectnessIndicator = (isAnswerCorrect: boolean | null, styles: any, colors: any) => {
        if (isAnswerCorrect === null)
            return <View id='placeholder' style={styles.watchExceciseNavigationElement} />;
        else if (isAnswerCorrect === true)
            return <View style={styles.watchExcerciseAnswerCheckContainer}><Ionicons name='checkmark-circle-outline' color="green" size={52} /></View>;
        else
            return <View style={styles.watchExcerciseAnswerCheckContainer}><Ionicons name='close-circle-outline' color="#C00000" size={52} /></View>;
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={[]}>
            <HeaderSubject theme={timeTheme} styles={styles} image={timeButton} progressParts={progressParts} doneCount={doneCount} totalCount={totalCount} />

            <ImageBackground source={tableImage} resizeMode="cover" style={styles.subjectWorkspace}>
                {timeServiceRef.current?.hasNext() ? (
                    <KeyboardAvoidingView
                        behavior={'position'}
                        keyboardVerticalOffset={55}
                        style={styles.containerLayout}
                    >
                        <ScrollView scrollEnabled={true} keyboardShouldPersistTaps="handled">
                            <Watch timeParts={timeServiceRef.current?.getTimeParts(exercise?.analog || 0)} editable={false} />
                            <View id='digitalWatchesContainerAM' style={styles.digitalWatchesContainer}>
                                <Text style={styles.watchExceciseNavigationElement}>AM:</Text>
                                <View id='digitalWatchWrapper' style={styles.watchExceciseInputElement}>
                                    <DigitalWatch initialTimeValue={(answer && timeServiceRef.current) ? timeServiceRef.current.getTimeString(answer?.digitalAm ?? null) : ""} editable={true} onSubmit={onSubmitAm} ref={refDigitalInputAM} />
                                </View>
                                {answerCorrectnessIndicator(isAnswerCorrect, styles, colors)}
                            </View>
                            <View id='digitalWatchesContainerPM' style={styles.digitalWatchesContainer}>
                                <Text style={styles.watchExceciseNavigationElement}>PM:</Text>
                                <View id='digitalWatchWrapper' style={styles.watchExceciseInputElement}>
                                    <DigitalWatch initialTimeValue={(answer && timeServiceRef.current) ? timeServiceRef.current.getTimeString(answer?.digitalPm ?? null) : ""} editable={true} onSubmit={onSubmitPm} ref={refDigitalInputPM} />
                                </View>
                                {answerCorrectnessIndicator(isAnswerCorrect, styles, colors)}
                            </View>
                            <View style={styles.buttonContainer} >
                                {isAnswerCorrect === null ? (
                                    <TouchableOpacity onPress={() => { checkAnswer() }}><Image source={checkAnswerButton} resizeMode='contain' style={styles.subjectButton} /></TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => { nextExercise() }}><Image source={nextButton} resizeMode='contain' style={styles.subjectButton} /></TouchableOpacity>
                                )
                                }
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                ) : (
                    <ExerciseDone correctAnswerCount={timeServiceRef.current?.getCorrectAnswersCount() ?? 0} wrongAnswerCount={timeServiceRef.current?.getWrongAnswersCount() ?? 0} rewardCoins={10} reason={COIN_REASONS.TIME_ANALOG_DIGITAL} styles={styles} />
                )}
            </ImageBackground>
        </SafeAreaView>

    )
}

export default AnalogToDigital
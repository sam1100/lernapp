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
    const [answerResult, setAnswerResult] = useState<ComprehensiveCheckAnswerResult | null>(null);
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
        nextExercise();
        setProgressParts([]);
    }, [timeConfig]);

    const nextExercise = () => {
        setAnswerResult(null);
        setAnswer(null);
        if (timeServiceRef.current?.hasNext()) {
            const next = timeServiceRef.current.getNextExercise();
            setExercise(next!);
        } else {
            timeServiceRef.current?.getNextExercise();
            setExercise(null);
        }
    }

    const checkAnswer = (): void => {

        if (!!exercise && !!timeServiceRef.current && !!answer) {

            const answerResult: ComprehensiveCheckAnswerResult = timeServiceRef.current.comprehensiveCheckAnswer(answer);
            setAnswerResult(answerResult);

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

        refDigitalInputPM.current?.focus();
    }
    const onSubmitPm = (input: number) => {
        setAnswer((currentAnswer) => ({
            digitalAm: currentAnswer?.digitalAm ?? null,
            digitalPm: input
        }));
    }

    const totalCount = timeServiceRef.current?.getTotalExercisesCount() ?? 0;
    const doneCount = timeServiceRef.current?.getTotalAnswersCount() ?? 0;

    //    console.log(`TimeServiceRef: ${timeServiceRef.current} / hasNext: ${timeServiceRef.current?.hasNext()} `);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={[]}>
            <KeyboardAvoidingView
                behavior={'position'}
                keyboardVerticalOffset={-160}
                style={styles.containerLayout}
            >
                <HeaderSubject theme={timeTheme} styles={styles} image={timeButton} progressParts={progressParts} doneCount={doneCount} totalCount={totalCount} />

                <ImageBackground id="subjectWorkspace" source={tableImage} resizeMode="cover" style={styles.subjectWorkspace}>
                    {timeServiceRef.current === null || exercise != null ? (
                        <ScrollView id="scrollView" scrollEnabled={true} keyboardShouldPersistTaps="handled" style={{ width: "90%" }}>
                            <View id='analogWatchContainer' style={styles.analogWatchContainer}>
                                <Watch timeParts={timeServiceRef.current?.getTimeParts(exercise?.analog || 0)} editable={false} />
                            </View>

                            <View id='ampmContainer' style={styles.digitalWatchesContainer}>
                                <Text style={[styles.digitalWatchElement, styles.digitalWatchAmPm]}>AM</Text>
                                <Text style={[styles.digitalWatchElement, styles.digitalWatchAmPm]}>PM</Text>
                            </View>

                            <View id='digitalWatchesContainerResult' style={styles.digitalWatchesContainer}>
                                <View id='digitalWatchWrapperAM' style={[styles.digitalWatchElement]}>
                                    <DigitalWatch initialTimeValue={(answer && timeServiceRef.current) ? timeServiceRef.current.getTimeString(answer?.digitalAm ?? null) : ""} editable={true} onSubmit={onSubmitAm} ref={refDigitalInputAM} />
                                </View>
                                <View id='digitalWatchWrapperPM' style={[styles.digitalWatchElement]}>
                                    <DigitalWatch initialTimeValue={(answer && timeServiceRef.current) ? timeServiceRef.current.getTimeString(answer?.digitalPm ?? null) : ""} editable={true} onSubmit={onSubmitPm} ref={refDigitalInputPM} />
                                </View>
                            </View>
                            {answerResult !== null ? (
                                <View id='digitalWatchesContainerCorrection' style={styles.digitalWatchesContainer}>
                                    <View id='digitalWatchWrapperAMCorrection' style={styles.digitalWatchElement}>
                                        <DigitalWatch initialTimeValue={(exercise && timeServiceRef.current) ? timeServiceRef.current.getTimeString(exercise.result ?? null) : ""} editable={false} isResultCorrect={answerResult?.details.digitalAm} />
                                    </View>
                                    <View id='digitalWatchWrapperPMCorrection' style={styles.digitalWatchElement}>
                                        <DigitalWatch initialTimeValue={(exercise && timeServiceRef.current) ? timeServiceRef.current.getTimeString(exercise.result ? exercise.result + 12 : null) : ""} editable={false} isResultCorrect={answerResult?.details.digitalPm} />
                                    </View>
                                </View>
                            ) : null}
                            <View style={styles.buttonContainer} >
                                {answerResult === null ? (
                                    <TouchableOpacity onPress={() => { checkAnswer() }}><Image source={checkAnswerButton} resizeMode='contain' style={styles.subjectButton} /></TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => { nextExercise() }}><Image source={nextButton} resizeMode='contain' style={styles.subjectButton} /></TouchableOpacity>
                                )
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <ExerciseDone correctAnswerCount={timeServiceRef.current?.getCorrectAnswersCount() ?? 0} wrongAnswerCount={timeServiceRef.current?.getWrongAnswersCount() ?? 0} rewardCoins={10} reason={COIN_REASONS.TIME_ANALOG_DIGITAL} styles={styles} />
                    )}
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

export default AnalogToDigital
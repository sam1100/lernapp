import { createStyles } from '@/assets/styles/styles';
import ExerciseDone from '@/components/ExerciseDone';
import HeaderSubject from '@/components/HeaderSubject';
import { ProgressPart } from '@/components/ProgressBar';
import TimeBrickAnalogWatch from '@/components/TimeBrickAnalogWatch';
import TimeBricksDigitalWatches from '@/components/TimeBrickDigitalWatches';
import { COIN_REASONS } from '@/convex/enums';
import useConfirmLeaveGuard from '@/hooks/useConfirmLeaveGuard';
import useTheme from '@/hooks/useTheme';
import { ComprehensiveCheckAnswerResult } from '@/services/ExerciseService';
import { TimeAnalogToDigitalService } from '@/services/TimeAnalogToDigitalService';
import { TimeDigitalToAnalogService } from '@/services/TimeDigitalToAnalogService';
import { TimeExercise, TimeResult, TimeService } from '@/services/TimeService';

import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tableImage = require('@/assets/images/table.png');
const timeButton = require('@/assets/images/time-analog-digital-button.png');
const checkAnswerButton = require('@/assets/images/check-time-button.png');
const nextButton = require('@/assets/images/next-time-button.png');


const enums = {
    ANALOG_TO_DIGITAL: 'ANALOG_TO_DIGITAL',
    DIGITAL_TO_ANALOG: 'DIGITAL_TO_ANALOG',
}

export type TimeExerciseType = typeof enums[keyof typeof enums];

const TimeExerciseView = ({ type, timeConfig }: { type: TimeExerciseType, timeConfig: number | undefined }) => {

    const [exercise, setExercise] = useState<TimeExercise | null>(null);
    const [answer, setAnswer] = useState<TimeResult | null>(null);
    const [answerResult, setAnswerResult] = useState<ComprehensiveCheckAnswerResult | null>(null);
    const [progressParts, setProgressParts] = useState<ProgressPart[]>([]);

    const { timeTheme, colors } = useTheme();
    const styles = createStyles();

    const timeServiceRef = useRef<TimeService | null>(null);

    const refDigitalInputAM = useRef<TextInput | null>(null);
    const refDigitalInputPM = useRef<TextInput | null>(null);

    useEffect(() => {
        if (!timeConfig) return;

        switch (type) {
            case enums.ANALOG_TO_DIGITAL:
                timeServiceRef.current = new TimeAnalogToDigitalService(timeConfig);
                break;
            case enums.DIGITAL_TO_ANALOG:
                timeServiceRef.current = new TimeDigitalToAnalogService(timeConfig);
                break;
        }


        nextExercise();
        setProgressParts([]);
    }, [timeConfig]);

    useConfirmLeaveGuard(timeServiceRef.current?.hasNext() ?? false);

    const nextExercise = () => {
        setAnswerResult(null);
        if (timeServiceRef.current?.hasNext()) {
            const next: TimeExercise | null = timeServiceRef.current.getNextExercise();
            setAnswer({
                analog: 0,
                digitalAm: next?.isAm ? next.digitalAm : null,
                digitalPm: next?.isAm === false ? next.digitalPm : null
            });
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
            analog: currentAnswer?.analog ?? null,
            digitalAm: input,
            digitalPm: currentAnswer?.digitalPm ?? null
        }));

        refDigitalInputPM.current?.focus();
    }
    const onSubmitPm = (input: number) => {
        setAnswer((currentAnswer) => ({
            analog: currentAnswer?.analog ?? null,
            digitalAm: currentAnswer?.digitalAm ?? null,
            digitalPm: input
        }));
    }
    const onSubmitAnalog = (input: number) => {
        setAnswer((currentAnswer) => ({
            analog: input,
            digitalAm: currentAnswer?.digitalAm ?? null,
            digitalPm: currentAnswer?.digitalPm ?? null
        }));
    }

    const totalCount = timeServiceRef.current?.getTotalExercisesCount() ?? 0;
    const doneCount = timeServiceRef.current?.getTotalAnswersCount() ?? 0;

    //    console.log(`TimeServiceRef: ${timeServiceRef.current} / hasNext: ${timeServiceRef.current?.hasNext()} `);

    const timeExerciseWorkspaceComponents = () => {
        if (type === enums.ANALOG_TO_DIGITAL) {
            return (
                <>
                    <TimeBrickAnalogWatch answer={exercise?.result} answerResult={answerResult} result={exercise?.result} editable={false} timeServiceRef={timeServiceRef} onSubmit={onSubmitAnalog} styles={styles} />
                    <TimeBricksDigitalWatches answer={answer} answerResult={answerResult} exercise={exercise} editable={{ am: true, pm: true }} timeServiceRef={timeServiceRef} onSubmitAm={onSubmitAm} onSubmitPm={onSubmitPm} refDigitalInputAM={refDigitalInputAM} refDigitalInputPM={refDigitalInputPM} styles={styles} />
                </>);
        } else if (type === enums.DIGITAL_TO_ANALOG) {
            return (
                <>
                    <TimeBricksDigitalWatches answer={answer} answerResult={answerResult} exercise={exercise} editable={{ am: !exercise?.isAm, pm: !!exercise?.isAm }} timeServiceRef={timeServiceRef} onSubmitAm={onSubmitAm} onSubmitPm={onSubmitPm} refDigitalInputAM={refDigitalInputAM} refDigitalInputPM={refDigitalInputPM} styles={styles} />
                    <TimeBrickAnalogWatch answer={answer?.analog} answerResult={answerResult} result={exercise?.result} editable={true} timeServiceRef={timeServiceRef} onSubmit={onSubmitAnalog} styles={styles} />
                </>);
        }
    }

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

                            {timeExerciseWorkspaceComponents()}

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

export default TimeExerciseView
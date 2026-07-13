import { colorDefinitions, createStyles } from "@/assets/styles/styles";
import ExerciseDone from "@/components/ExerciseDone";
import HeaderSubject from "@/components/HeaderSubject";
import LoadingSpinner from "@/components/LoadingSpinner";
import { api } from "@/convex/_generated/api";
import { COIN_REASONS } from "@/convex/enums";
import useTheme from "@/hooks/useTheme";
import { MathDivisionRemainderAnswer, MathDivisionRemainderExercise, MathDivisionRemainderService } from "@/services/MathDivisionRemainderService";
import { RenderPart, RenderParts } from "@/services/MathService";
import { Ionicons } from "@expo/vector-icons";
import { useConvex } from "convex/react";
import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const tableImage = require('@/assets/images/table.png');
const nextImage = require('@/assets/images/nextMath.png');
const divisionRemainderButton = require('@/assets/images/divisionremainder.png');

interface ProgressPart {
    start: number;
    width: number;
    colors: [string, string];
}

interface IsAnswerCorrect {
    quotient: boolean;
    remainder: boolean;
}

const MathDivisionRemainderSubject = () => {
    const convex = useConvex();
    const [service, setService] = React.useState<MathDivisionRemainderService | null>(null);

    const gapSymbol = "___";

    const { mathTheme, colors } = useTheme();
    const [exercise, setExercise] = useState<MathDivisionRemainderExercise | null>(null);
    const [answer, setAnswer] = useState<MathDivisionRemainderAnswer | null>(null);
    const [resultQuotient, setResultQuotient] = useState<string | null>(null);
    const [resultRemainder, setResultRemainder] = useState<string | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<IsAnswerCorrect | null>(null);
    const [progressParts, setProgressParts] = useState<ProgressPart[]>([]);

    const styles = createStyles();
    const inputRefQuotient = useRef<TextInput>(null);
    const inputRefRemainder = useRef<TextInput>(null);
    const isSubmittingQuotient = useRef(false);
    const isSubmittingRemainder = useRef(false);

    async function fetchConfig() {
        let config = await convex.query(api.math.getMathDivisionRemainderConfig, {});
        setService(new MathDivisionRemainderService(config));
    }

    if (service === null)
        fetchConfig();

    useEffect(() => {
        if (!service) return;

        setResultQuotient(null);
        setResultRemainder(null);
        setIsAnswerCorrect(null);
        setExercise(service.getNextExercise()! as MathDivisionRemainderExercise);
        setProgressParts([]);
        inputRefQuotient.current?.focus();
    }, [service]);

    const nextExercise = () => {
        setIsAnswerCorrect(null);
        setAnswer({ quotient: NaN, remainder: NaN });
        setResultQuotient(null);
        setResultRemainder(null);
        inputRefQuotient.current?.focus();
        const next = service?.getNextExercise();
        setExercise(next! as MathDivisionRemainderExercise);
    }

    const setQuotientAnswer = (input: string) => {
        if (!!exercise) {
            const quotient = input === '' ? NaN : Number(input);
            const remainder = answer?.remainder ?? NaN;

            setAnswer({ ...(answer ?? { remainder: NaN }), quotient: quotient });

            if (!isNaN(quotient) && !isNaN(remainder))
                checkAnswer(quotient, remainder);
            else
                inputRefRemainder.current?.focus();

        }
    }

    const setRemainderAnswer = (input: string) => {
        if (!!exercise) {
            const remainder = input === '' ? NaN : Number(input);
            const quotient = answer?.quotient ?? NaN;

            setAnswer({ ...(answer ?? { quotient: NaN }), remainder: remainder });

            if (!isNaN(quotient) && !isNaN(remainder))
                checkAnswer(quotient, remainder);
            else
                inputRefQuotient.current?.focus();
        }
    }

    const checkAnswer = (quotient: number, remainder: number) => {
        if (!!exercise && !!service && !isNaN(quotient) && !isNaN(remainder)) {
            const validation = service.basicComprehensiveCheckAnswer({ quotient, remainder } as MathDivisionRemainderAnswer);

            if (validation.isCorrect) {
                setIsAnswerCorrect({ quotient: true, remainder: true });
                waitAndShowNextExercise();
            } else {
                setIsAnswerCorrect({ quotient: validation.details.quotient, remainder: validation.details.remainder });
            }
            addProgressPart(validation.isCorrect);
        }
    }

    const addProgressPart = (correct: boolean) => {
        const width: number = 100 / (service?.getTotalExercisesCount() ?? 1);
        const start: number = progressParts.length * width;
        const gradient: [string, string] = correct ? colors.gradients.correctAnswer : colors.gradients.wrongAnswer;
        setProgressParts([...progressParts, { start, width, colors: gradient }]);
    }

    const waitAndShowNextExercise = () => {
        setTimeout(() => {
            nextExercise();
        }, 1000);
    }

    const renderExercise = (exercise: MathDivisionRemainderExercise) => {
        const renderParts: RenderParts = service?.createDivisionRemainderRenderParts(answer == null ? null : answer, gapSymbol)!;

        return (
            <View id='exerciseContainer' style={[styles.horizontalContainer, styles.exerciseContainer]}>
                {renderParts.exerciseParts.map((part, index) => {
                    return renderPart(part, index);
                })}

                <Text style={styles.exercise}> = </Text>

                {renderPart(renderParts.result, -1)}

            </View>
        )
    }

    const renderPart = (part: RenderPart, index: number) => {
        if (part.isAnswer && part.isCorrect) {
            return <Text key={index} style={[styles.exercise, styles.exerciseCorrectAnswer]}>{part.text}</Text>
        } else if (part.isAnswer && !part.isCorrect) {
            return <Text key={index} style={[styles.exercise, styles.exerciseWrongAnswer]}>{part.text}</Text>
        } else {
            return <Text key={index} style={styles.exercise}>{part.text}</Text>
        }
    }

    const totalCount = service?.getTotalExercisesCount() ?? 0;
    const doneCount = service?.getTotalAnswersCount() ?? 0;

    // console.log(`exercises: ${JSON.stringify(exercise)}`);
    //    console.log(`totalCount: ${totalCount}, doneCount: ${doneCount}`);

    // Solange die Daten von convex geladen werden, ist das Modell "todos" undefined.
    if (!service) return <LoadingSpinner />;

    return (
        <SafeAreaView style={styles.containerLayout} edges={[]}>
            <KeyboardAvoidingView
                behavior={'position'}
                keyboardVerticalOffset={-160}
                style={styles.containerLayout}
            >

                <HeaderSubject theme={mathTheme} styles={styles} image={divisionRemainderButton} progressParts={progressParts} doneCount={doneCount} totalCount={totalCount} />
                <ImageBackground source={tableImage} resizeMode="cover" style={styles.subjectWorkspace}>
                    {exercise != null ? (
                        <>
                            {renderExercise(exercise!)}
                            <View id='inputContainer' style={[styles.verticalContainer, styles.inputContainer]}>
                                <View id='inputContainerQuotent' style={styles.horizontalContainer}>
                                    <TextInput
                                        ref={inputRefQuotient}
                                        style={[styles.exerciseInput, styles.exerciseInputMathSubject]}
                                        placeholder="Quotient"
                                        value={!!resultQuotient ? resultQuotient.toString() : ''}
                                        onChangeText={setResultQuotient}
                                        onSubmitEditing={e => {
                                            isSubmittingQuotient.current = true;
                                            setQuotientAnswer(e.nativeEvent.text);
                                        }}
                                        onBlur={() => {
                                            if (isSubmittingQuotient.current) {
                                                isSubmittingQuotient.current = false;
                                                return;
                                            }
                                            setQuotientAnswer(resultQuotient ?? '');
                                        }}
                                        placeholderTextColor={colorDefinitions.placeholderText}
                                        keyboardType="numeric"
                                        returnKeyType="done"
                                        submitBehavior="blurAndSubmit"
                                    />
                                    {isAnswerCorrect !== null && (isAnswerCorrect.quotient ? <Ionicons name='checkmark-circle-outline' color={colorDefinitions.correctAnswer} size={52} /> : <Ionicons name='close-circle-outline' color={colorDefinitions.wrongAnswer} size={52} />)}
                                </View>
                                <View id='inputContainerRemainder' style={[styles.horizontalContainer, styles.inputContainer]}>
                                    <TextInput
                                        ref={inputRefRemainder}
                                        style={[styles.exerciseInput, styles.exerciseInputMathSubject]}
                                        placeholder="Rest"
                                        value={!!resultRemainder ? resultRemainder.toString() : ''}
                                        onChangeText={setResultRemainder}
                                        onSubmitEditing={e => {
                                            isSubmittingRemainder.current = true;
                                            setRemainderAnswer(e.nativeEvent.text);
                                        }}
                                        onBlur={() => {
                                            if (isSubmittingRemainder.current) {
                                                isSubmittingRemainder.current = false;
                                                return;
                                            }
                                            setRemainderAnswer(resultRemainder ?? '');
                                        }}
                                        placeholderTextColor={colorDefinitions.placeholderText}
                                        keyboardType="numeric"
                                        returnKeyType="done"
                                        submitBehavior="blurAndSubmit"
                                    />
                                    {isAnswerCorrect !== null && (isAnswerCorrect.remainder ? <Ionicons name='checkmark-circle-outline' color={colorDefinitions.correctAnswer} size={52} /> : <Ionicons name='close-circle-outline' color={colorDefinitions.wrongAnswer} size={52} />)}
                                </View>
                                <View id='buttonContainer' style={styles.buttonContainer}>
                                    {isAnswerCorrect !== null && ((!isAnswerCorrect.quotient || !isAnswerCorrect.remainder) ? <TouchableOpacity onPress={() => { nextExercise() }}><Image source={nextImage} resizeMode='contain' style={styles.subjectButton} /></TouchableOpacity> : null)}
                                </View>

                            </View>
                        </>
                    ) : (
                        <ExerciseDone correctAnswerCount={service?.getCorrectAnswersCount() ?? 0} wrongAnswerCount={service?.getWrongAnswersCount() ?? 0} rewardCoins={10} reason={COIN_REASONS.MATH_DIVISION_REMAINDER} styles={styles} />
                    )}
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default MathDivisionRemainderSubject;
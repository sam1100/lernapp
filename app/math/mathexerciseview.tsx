import { colorDefinitions, createStyles } from '@/assets/styles/styles';
import ExerciseDone from '@/components/ExerciseDone';
import HeaderSubject from '@/components/HeaderSubject';
import LoadingSpinner from '@/components/LoadingSpinner';
import { COIN_REASONS } from "@/convex/enums";
import useTheme from '@/hooks/useTheme';
import { MathExercise, MathService, RenderPart, RenderParts } from '@/services/MathService';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tableImage = require('@/assets/images/table.png');
const nextImage = require('@/assets/images/nextMath.png');
const multiplicationButton = require('@/assets/images/multiplication.png');

interface ProgressPart {
    start: number;
    width: number;
    colors: [string, string];
}


const MathExerciseView = ({ service }: { service: MathService | null }) => {

    const gapSymbol = "___";

    const { mathTheme, colors } = useTheme();
    const [exercise, setExercise] = useState<MathExercise | null>(null);
    const [answer, setAnswer] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [progressParts, setProgressParts] = useState<ProgressPart[]>([]);

    const styles = createStyles();
    const mathServiceRef = useRef<MathService | null>(null);
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (!service) return;

        mathServiceRef.current = service;
        setResult(null);
        setIsAnswerCorrect(null);
        setExercise(mathServiceRef.current.getNextExercise()!);
        setProgressParts([]);
        inputRef.current?.focus();
    }, [service]);


    const nextExercise = () => {
        setIsAnswerCorrect(null);
        setAnswer(null);
        setResult(null);
        inputRef.current?.focus();
        const next = mathServiceRef.current?.getNextExercise();
        setExercise(next!);
    }

    const checkAnswer = (input: number) => {
        if (!!exercise && !!mathServiceRef.current) {
            const correct = mathServiceRef.current.checkAnswer(input);
            setAnswer(`${mathServiceRef.current.getAnswer()}`);
            if (correct) {
                setIsAnswerCorrect(true);
                waitAndShowNextExercise();
            } else {
                setIsAnswerCorrect(false);
            }
            addProgressPart(correct);
        }
    }

    const addProgressPart = (correct: boolean) => {
        const width: number = 100 / (mathServiceRef.current?.getTotalExercisesCount() ?? 1);
        const start: number = progressParts.length * width;
        const gradient: [string, string] = correct ? colors.gradients.correctAnswer : colors.gradients.wrongAnswer;
        setProgressParts([...progressParts, { start, width, colors: gradient }]);
    }

    const waitAndShowNextExercise = () => {
        setTimeout(() => {
            nextExercise();
        }, 1000);
    }

    const renderExercise = (exercise: MathExercise, answer: string | null) => {
        const renderParts: RenderParts = service?.createRenderParts(answer == null ? null : result, gapSymbol)!;

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

    const totalCount = mathServiceRef.current?.getTotalExercisesCount() ?? 0;
    const doneCount = mathServiceRef.current?.getTotalAnswersCount() ?? 0;

    // console.log(`exercises: ${JSON.stringify(exercise)}`);
    //    console.log(`totalCount: ${totalCount}, doneCount: ${doneCount}`);

    // Solange die Daten von convex geladen werden, ist das Modell "todos" undefined.
    if (!mathServiceRef.current) return <LoadingSpinner />;

    return (
        <SafeAreaView style={styles.containerLayout} edges={[]}>
            <HeaderSubject theme={mathTheme} styles={styles} image={multiplicationButton} progressParts={progressParts} doneCount={doneCount} totalCount={totalCount} />
            <ImageBackground source={tableImage} resizeMode="cover" style={styles.subjectWorkspace}>
                {exercise != null ? (
                    <>
                        {renderExercise(exercise!, answer)}
                        <View id='inputContainer' style={[styles.horizontalContainer, styles.inputContainer]}>
                            <TextInput
                                ref={inputRef}
                                style={[styles.exerciseInput, styles.exerciseInputMathSubject]}
                                placeholder=""
                                value={!!result ? result.toString() : ''}
                                onChangeText={setResult}
                                onSubmitEditing={e => checkAnswer(Number(e.nativeEvent.text))}
                                placeholderTextColor={"rgb(100,100,100)"}
                                keyboardType="numeric"
                                returnKeyType="done"
                                submitBehavior="blurAndSubmit"
                            />
                            {isAnswerCorrect !== null && (isAnswerCorrect ? <Ionicons name='checkmark-circle-outline' color={colorDefinitions.correctAnswer} size={52} /> : <Ionicons name='close-circle-outline' color={colorDefinitions.wrongAnswer} size={52} />)}
                        </View>
                        <View id='buttonContainer' style={styles.buttonContainer}>
                            {isAnswerCorrect !== null && (!isAnswerCorrect ? <TouchableOpacity onPress={() => { nextExercise() }}><Image source={nextImage} resizeMode='contain' style={styles.subjectButton} /></TouchableOpacity> : null)}
                        </View>
                    </>
                ) : (
                    <ExerciseDone correctAnswerCount={mathServiceRef.current?.getCorrectAnswersCount() ?? 0} wrongAnswerCount={mathServiceRef.current?.getWrongAnswersCount() ?? 0} rewardCoins={10} reason={COIN_REASONS.MATH_MULTIPLICATION} styles={styles} />
                )}
            </ImageBackground>
        </SafeAreaView >
    )
}

export default MathExerciseView;
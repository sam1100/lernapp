import { createStyles } from '@/assets/styles/styles';
import ExerciseDone from '@/components/ExerciseDone';
import HeaderSubject from '@/components/HeaderSubject';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProgressBar from '@/components/ProgressBar';
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import useTheme from '@/hooks/useTheme';
import { MathMultiplicationService, MathMultiplierExercise } from '@/services/MathMultiplicationService';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from "convex/react";
import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const tableImage = require('@/assets/images/table.png');
const nextImage = require('@/assets/images/nextMath.png');
const mathButton = require('@/assets/images/mathe-button.png');

interface ProgressPart {
    start: number;
    width: number;
    colors: [string, string];
}

type MathMultiplication = Doc<"math_multiplication">;

const MathMultiplicationSubject = () => {
    const { mathTheme, colors } = useTheme();
    const [exercise, setExercise] = useState<MathMultiplierExercise | null>(null);
    const [answer, setAnswer] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [progressParts, setProgressParts] = useState<ProgressPart[]>([]);

    const mathServiceRef = useRef<MathMultiplicationService | null>(null);
    const inputRef = useRef<TextInput>(null);

    const multiplicationConfig = useQuery(api.math.getMathMultiplicationConfig);

    useEffect(() => {
        if (!multiplicationConfig) return;

        mathServiceRef.current = new MathMultiplicationService(multiplicationConfig);
        setResult(null);
        setIsAnswerCorrect(null);
        setExercise(mathServiceRef.current.getNextExercise()!);
        setProgressParts([]);
        inputRef.current?.focus();
    }, [multiplicationConfig]);

    const styles = createStyles();

    const nextExercise = () => {
        setIsAnswerCorrect(null);
        setAnswer(null);
        setResult(null);
        inputRef.current?.focus();
        if (mathServiceRef.current?.hasNext()) {
            const next = mathServiceRef.current.getNextExercise();
            setExercise(next!);
        }
    }

    const checkAnswer = (input: number) => {
        if (!!exercise && !!mathServiceRef.current) {
            const correct = mathServiceRef.current.checkAnswer(input);
            if (correct) {
                setIsAnswerCorrect(true);
                waitAndShowNextExercise();
            } else {
                setAnswer(` = ${exercise.multiplier1 * exercise.multiplier2}`);
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

    const totalCount = mathServiceRef.current?.getTotalExercisesCount() ?? 0;
    const doneCount = mathServiceRef.current?.getTotalAnswersCount() ?? 0;

    // Solange die Daten von convex geladen werden, ist das Modell "todos" undefined.
    if (!multiplicationConfig) return <LoadingSpinner />;

    return (
        <SafeAreaView style={styles.containerLayout} edges={[]}>
            <HeaderSubject theme={mathTheme} styles={styles} image={mathButton} />
            <ImageBackground source={tableImage} resizeMode="cover" style={styles.workspace}>
                {mathServiceRef.current && (
                    <View style={styles.subjectWorkspace}>
                        {mathServiceRef.current?.hasNext() ? (
                            <>
                                <ProgressBar progressParts={progressParts} doneCount={doneCount} totalCount={totalCount} />
                                <View style={styles.exerciseContainer}>
                                    <Text style={styles.exercise}>{exercise?.multiplier1} x {exercise?.multiplier2}</Text>
                                    <Text style={[styles.exercise, styles.exerciseWrongAnswer]}>{answer}</Text>
                                </View>
                                <View style={styles.workspaceHorizontal}>
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
                                    {isAnswerCorrect !== null && (isAnswerCorrect ? <Ionicons name='checkmark-circle-outline' color="green" size={52} /> : <Ionicons name='close-circle-outline' color="#C00000" size={52} />)}
                                </View>
                                <View style={{ marginTop: 30 }}>
                                    {isAnswerCorrect !== null && (!isAnswerCorrect ? <TouchableOpacity onPress={() => { nextExercise() }}><Image source={nextImage} resizeMode='contain' style={styles.subjectButton} /></TouchableOpacity> : null)}
                                </View>
                            </>
                        ) : (
                            <ExerciseDone correctAnswerCount={mathServiceRef.current?.getCorrectAnswersCount() ?? 0} wrongAnswerCount={mathServiceRef.current?.getWrongAnswersCount() ?? 0} styles={styles} />
                        )}
                    </View>)}
            </ImageBackground>
        </SafeAreaView >
    )
}

export default MathMultiplicationSubject;
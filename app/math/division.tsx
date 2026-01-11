import { createStyles } from '@/assets/styles/styles';
import LoadingSpinner from '@/components/LoadingSpinner';
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import useTheme from '@/hooks/useTheme';
import { MathDivisionExercise, MathDivisionService } from '@/services/MatchDivisionService';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const tableImage = require('@/assets/images/table.png');
const nextImage = require('@/assets/images/nextMath.png');

interface ProgressPart {
    start: number;
    width: number;
    colors: [string, string];
}

type MathDivision = Doc<"math_division">;

const MathDivisionSubject = () => {
    const { mathTheme, colors } = useTheme();
    const [exercise, setExercise] = useState<MathDivisionExercise | null>(null);
    const [answer, setAnswer] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [progressParts, setProgressParts] = useState<ProgressPart[]>([]);

    const mathServiceRef = useRef<MathDivisionService | null>(null);
    const inputRef = useRef<TextInput>(null);

    const divisionConfig = useQuery(api.math.getMathDivisionConfig);

    useEffect(() => {
        if (!divisionConfig) return;

        mathServiceRef.current = new MathDivisionService(divisionConfig);
        setResult(null);
        setIsAnswerCorrect(null);
        setExercise(mathServiceRef.current.getNextExercise()!);
        setProgressParts([]);
        inputRef.current?.focus();
    }, [divisionConfig]);

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
                setAnswer(` = ${exercise.dividend / exercise.divisor}`);
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
    if (!divisionConfig) return <LoadingSpinner />;

    return (
        <SafeAreaView style={styles.containerLayout} edges={[]}>
            <LinearGradient colors={mathTheme.gradients.header}>
                <View style={styles.headerSubject}>
                    <Image style={styles.subjectImage} resizeMode='contain' source={require('@/assets/images/mathe-button.png')} />
                </View>
            </LinearGradient>
            <ImageBackground source={tableImage} resizeMode="cover" style={styles.workspace}>
                {mathServiceRef.current && (
                    <View style={styles.subjectWorkspace}>
                        {mathServiceRef.current?.hasNext() ? (
                            <>
                                <View id='progressContainer' style={styles.progressContainer}>
                                    <View id='progressBarContainer' style={styles.progressBarContainer}>
                                        <View id='progressBar' style={[styles.progressBar, styles.progressBarMathSubject]}>
                                            {progressParts.map((part, index) => (
                                                <LinearGradient
                                                    key={index}
                                                    colors={part.colors}
                                                    style={[styles.progressFill, { left: `${part.start}%`, width: `${part.width}%` }]}
                                                />))}
                                        </View>
                                        <Text style={styles.progressTextMathSubject}>{`${doneCount} von ${totalCount}`}</Text>
                                    </View>
                                </View>
                                <View style={styles.exerciseContainer}>
                                    <Text style={styles.exercise}>{exercise?.dividend} ÷ {exercise?.divisor}</Text>
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
                                    {isAnswerCorrect !== null && (!isAnswerCorrect ? <TouchableOpacity onPress={() => { nextExercise() }}><Image source={nextImage} resizeMode="contain" style={styles.subjectButton} /></TouchableOpacity> : null)}
                                </View>
                            </>
                        ) : (
                            <View>
                                <Text style={styles.exercise}>Geschafft! 🎉</Text>
                                <Text style={styles.exercise}>{`Richtige Antworten: ${mathServiceRef.current?.getCorrectAnswersCount()}`}</Text>
                                <Text style={styles.exercise}>{`Falsche Antworten: ${mathServiceRef.current?.getWrongAnswersCount()}`}</Text>
                            </View>
                        )}
                    </View>)}
            </ImageBackground>
        </SafeAreaView>
    )
}

export default MathDivisionSubject;
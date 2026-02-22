import { createStyles } from "@/assets/styles/styles";
import ExerciseDone from "@/components/ExerciseDone";
import HeaderSubject from "@/components/HeaderSubject";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ProgressPart } from "@/components/ProgressBar";
import { Doc } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { WordExercise, WordsService } from "@/services/WordsService";
import * as Speech from 'expo-speech';
import { useEffect, useRef, useState } from "react";
import { Image, ImageBackground, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const tableImage = require('@/assets/images/table.png');
const readWordButton = require('@/assets/images/read-word-button.png');
const showWordButton = require('@/assets/images/show-word-button.png');
const correctAnswerButton = require('@/assets/images/correct-answer-button.png');
const wrongAnswerButton = require('@/assets/images/wrong-answer-button.png');

type GermanWords = Doc<"german_words">;

export default function GermanWordsSubject({ headerImage, words, reason }: { headerImage: ImageSourcePropType; words: GermanWords[] | null; reason: string }) {

    const { germanTheme, colors } = useTheme();
    const [exercise, setExercise] = useState<WordExercise | null>(null);
    const [revealed, setRevealed] = useState<boolean>(false);
    const [progressParts, setProgressParts] = useState<ProgressPart[]>([]);

    const styles = createStyles();
    const wordsServiceRef = useRef<WordsService | null>(null);

    useEffect(() => {
        if (!words) return;

        wordsServiceRef.current = new WordsService(words);
        const exercise = wordsServiceRef.current.getNextExercise()!;

        setRevealed(false);
        setExercise(exercise);
        setProgressParts([]);

        if (exercise)
            speak(exercise!.word);
    }, [words]);


    const nextExercise = (): void => {
        setRevealed(false);
        if (wordsServiceRef.current?.hasNext()) {
            const next = wordsServiceRef.current.getNextExercise();
            setExercise(next!);
            speak(next!.word);
        } else {
            setExercise(null);
        }
    }

    const revealAnswer = (): void => {
        setRevealed(true);
    }

    const checkAnswer = (correct: boolean): void => {
        wordsServiceRef.current?.checkAnswer(correct);
        addProgressPart(correct);
        nextExercise();
    }

    const addProgressPart = (correct: boolean) => {
        const width: number = 100 / (wordsServiceRef.current?.getTotalExercisesCount() ?? 1);
        const start: number = progressParts.length * width;
        const gradient: [string, string] = correct ? colors.gradients.correctAnswer : colors.gradients.wrongAnswer;
        setProgressParts([...progressParts, { start, width, colors: gradient }]);
    }

    /**
         *  * Voice options explanation:
         * - `-network` voices: Require internet connection, typically higher quality, synthesized on remote servers
         * - `-local` voices: Downloaded locally on device, work offline, may have slightly lower quality
         *
         *   Available voices:
         *   - `de-de-x-deg-network` - Male voice
         *   - `de-de-x-deg-local` - Male voice - GUT
         *   - `de-de-x-nfh-local` - Female voice
         *   - `de-de-x-deb-network` - Male voice
         *   - `de-de-x-deb-local` - Male voice
         *   - `de-de-x-nfh-network` - Female voice
         *   - `de-De-language` - Female voice
         *   - `de-de-x-dea-local` - wie de-De-language
         *   - `de-de-x-dea-network` - wie de-De-language
         */
    const speechOptions = {
        language: 'de-DE',
        pitch: 1.0,      // Höhe der Stimme (0.5 - 2.0)
        rate: 1.0,       // Sprechgeschwindigkeit (0.5 - 2.0)
        voice: 'de-de-x-deb-local',  // Verschiedene Stimmen verfügbar
        volume: 1.0      // Lautstärke (0.0 - 1.0)
    };

    const speak = (word: string) => {
        Speech.speak(word, speechOptions);
    };

    const totalCount = wordsServiceRef.current?.getTotalExercisesCount() ?? 0;
    const doneCount = wordsServiceRef.current?.getTotalAnswersCount() ?? 0;

    const renderExcercise = () => {

        //        console.log("wordsServiceRef.current", wordsServiceRef.current);
        //        console.log("wordsServiceRef.current?.hasNext", wordsServiceRef.current?.hasNext());

        if (wordsServiceRef.current == undefined)
            return <LoadingSpinner />;
        if (exercise != null)
            return <>
                <View >
                    {revealed ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.composedWordContainer}>
                                {exercise!.wordConfig.word.map((config, index) => (
                                    <Text key={index} style={[styles.exercise, config.emphasise ? styles.emphasiseWordPart : undefined]}>{config.text}</Text>
                                ))}
                            </View>
                        </View>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => { speak(exercise!.word) }}><Image source={readWordButton} resizeMode="contain" style={styles.subjectButton} /></TouchableOpacity>
                            <TouchableOpacity onPress={() => { revealAnswer() }}><Image source={showWordButton} resizeMode="contain" style={styles.subjectButton} /></TouchableOpacity>
                        </>
                    )}
                </View>
                {revealed && (
                    <View id='buttonContainer' style={styles.buttonContainer}>
                        <>
                            <TouchableOpacity onPress={() => { checkAnswer(true) }}><Image source={correctAnswerButton} resizeMode="contain" style={styles.okNokButton} /></TouchableOpacity>
                            <TouchableOpacity onPress={() => { checkAnswer(false) }}><Image source={wrongAnswerButton} resizeMode="contain" style={styles.okNokButton} /></TouchableOpacity>
                        </>
                    </View>
                )}
            </>;
        else {
            return <ExerciseDone correctAnswerCount={wordsServiceRef.current?.getCorrectAnswersCount() ?? 0} wrongAnswerCount={wordsServiceRef.current?.getWrongAnswersCount() ?? 0} rewardCoins={10} reason={reason} styles={styles} />;
        }
    }

    return (
        <SafeAreaView style={styles.containerLayout} edges={[]}>
            <HeaderSubject theme={germanTheme} styles={styles} image={headerImage} progressParts={progressParts} doneCount={doneCount} totalCount={totalCount} />
            <ImageBackground source={tableImage} resizeMode="cover" style={styles.subjectWorkspace}>
                {renderExcercise()}
            </ImageBackground>
        </SafeAreaView >
    );
}

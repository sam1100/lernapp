import { createStyles } from "@/assets/styles/styles";
import ExerciseDone from "@/components/ExerciseDone";
import HeaderSubject from "@/components/HeaderSubject";
import ProgressBar, { ProgressPart } from "@/components/ProgressBar";
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

export default function GermanWordsSubject({ headerImage, words }: { headerImage: ImageSourcePropType; words: GermanWords[] | null; }) {

    const { germanTheme, colors } = useTheme();
    const [exercise, setExercise] = useState<WordExercise | null>(null);
    const [revealed, setRevealed] = useState<boolean>(false);
    const [progressParts, setProgressParts] = useState<ProgressPart[]>([]);

    const styles = createStyles();
    const wordsServiceRef = useRef<WordsService | null>(null);

    useEffect(() => {
        if (!words) return;

        wordsServiceRef.current = new WordsService(words);
        setRevealed(false);
        setExercise(wordsServiceRef.current.getNextExercise()!);
        setProgressParts([]);
    }, [words]);


    const nextExercise = (): void => {
        setRevealed(false);
        if (wordsServiceRef.current?.hasNext()) {
            const next = wordsServiceRef.current.getNextExercise();
            setExercise(next!);
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

    return (
        <SafeAreaView style={styles.containerLayout} edges={[]}>
            <HeaderSubject theme={germanTheme} styles={styles} image={headerImage} />
            <ImageBackground source={tableImage} resizeMode="cover" style={styles.workspace}>
                {wordsServiceRef.current && (
                    <View style={styles.subjectWorkspace}>
                        {wordsServiceRef.current?.hasNext() ? (
                            <>
                                <ProgressBar progressParts={progressParts} doneCount={doneCount} totalCount={totalCount} />

                                <View>
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
                                    <View style={styles.buttonContainer}>
                                        {revealed && (
                                            <>
                                                <TouchableOpacity onPress={() => { checkAnswer(true) }}><Image source={correctAnswerButton} resizeMode="contain" style={styles.subjectButton} /></TouchableOpacity>
                                                <TouchableOpacity onPress={() => { checkAnswer(false) }}><Image source={wrongAnswerButton} resizeMode="contain" style={styles.subjectButton} /></TouchableOpacity>
                                            </>
                                        )}
                                    </View>
                                </View>
                            </>
                        ) : (
                            <ExerciseDone correctAnswerCount={wordsServiceRef.current?.getCorrectAnswersCount() ?? 0} wrongAnswerCount={wordsServiceRef.current?.getWrongAnswersCount() ?? 0} styles={styles} />
                        )}
                    </View>
                )}
            </ImageBackground>
        </SafeAreaView >
    );
}

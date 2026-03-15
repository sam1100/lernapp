import { createStyles } from "@/assets/styles/styles";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { MathExercise } from "@/services/MathService";
import { MathSubtractionExercise, MathSubtractionService } from "@/services/MathSubtractionService";
import { useConvex } from "convex/react";
import React from 'react';
import { Text, View } from "react-native";
import MathExerciseView from './mathexerciseview';


type MathSubtraction = Doc<"math_subtraction">;

const MathSubtractionSubject = () => {
    const convex = useConvex();
    const styles = createStyles();

    const [service, setService] = React.useState<MathSubtractionService | null>(null);

    async function fetchConfig() {
        let config = await convex.query(api.math.getMathSubtractionConfig, {});
        setService(new MathSubtractionService(config));
    }

    if (service === null)
        fetchConfig();

    const renderExercise = (exercise: MathExercise, answer: string | null) => {
        const subtractionExercise = exercise as MathSubtractionExercise;

        return (
            <View id='exerciseContainer' style={[styles.horizontalContainer, styles.exerciseContainer]}>
                <Text style={styles.exercise}>{subtractionExercise?.addends.join(" - ")}</Text>
                <Text style={[styles.exercise, styles.exerciseWrongAnswer]}>{answer}</Text>
            </View>
        )
    }

    return (
        <MathExerciseView service={service} renderExercise={renderExercise} />
    )
}

export default MathSubtractionSubject;
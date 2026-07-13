import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { MathSubtractionService } from "@/services/MathSubtractionService";
import { useConvex } from "convex/react";
import React from 'react';
import MathExerciseView from './mathexerciseview';


type MathSubtraction = Doc<"math_subtraction">;

const MathSubtractionSubject = () => {
    const convex = useConvex();

    const [service, setService] = React.useState<MathSubtractionService | null>(null);

    async function fetchConfig() {
        let config = await convex.query(api.math.getMathSubtractionConfig, {});
        setService(new MathSubtractionService(config));
    }

    if (service === null)
        fetchConfig();

    return (
        <MathExerciseView service={service} headerImage={require('@/assets/images/subtraction.png')} />
    )
}

export default MathSubtractionSubject;
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { MathMultiplicationService } from '@/services/MathMultiplicationService';
import { useConvex } from "convex/react";
import React from 'react';
import MathExerciseView from './mathexerciseview';



type MathMultiplication = Doc<"math_multiplication">;

const MathMultiplicationSubject = () => {
    const convex = useConvex();
    const [service, setService] = React.useState<MathMultiplicationService | null>(null);

    async function fetchConfig() {
        let config = await convex.query(api.math.getMathMultiplicationConfig, {});
        setService(new MathMultiplicationService(config));
    }

    if (service === null)
        fetchConfig();

    return (
        <MathExerciseView service={service} />
    )
}

export default MathMultiplicationSubject;
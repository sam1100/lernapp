import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { MathDivisionService } from "@/services/MatchDivisionService";
import { useConvex } from "convex/react";
import React from 'react';
import MathExerciseView from './mathexerciseview';



type MathDivision = Doc<"math_division">;

const MathDivisionSubject = () => {
    const convex = useConvex();
    const [service, setService] = React.useState<MathDivisionService | null>(null);

    async function fetchConfig() {
        let config = await convex.query(api.math.getMathDivisionConfig, {});
        setService(new MathDivisionService(config));
    }

    if (service === null)
        fetchConfig();

    return (
        <MathExerciseView service={service} headerImage={require('@/assets/images/division.png')} />
    )
}

export default MathDivisionSubject;
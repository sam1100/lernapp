import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { MathAdditionService } from "@/services/MathAdditionService";
import { useConvex } from "convex/react";
import React from 'react';
import MathExerciseView from './mathexerciseview';


type MathAddition = Doc<"math_addition">;

const MathAdditionSubject = () => {
    const convex = useConvex();
    const [service, setService] = React.useState<MathAdditionService | null>(null);

    async function fetchConfig() {
        let config = await convex.query(api.math.getMathAdditionConfig, {});
        setService(new MathAdditionService(config));
    }

    if (service === null)
        fetchConfig();

    return (
        <MathExerciseView service={service} headerImage={require('@/assets/images/addition.png')} />
    )
}

export default MathAdditionSubject;
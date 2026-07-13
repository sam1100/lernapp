import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { MathAddSubMixedService } from "@/services/MathAddSubService";
import { useConvex } from "convex/react";
import React from 'react';
import MathExerciseView from './mathexerciseview';


type MathAddSubMixed = Doc<"math_add_sub_mixed">;

const MathAddSubMixedSubject = () => {
    const convex = useConvex();
    const [service, setService] = React.useState<MathAddSubMixedService | null>(null);

    async function fetchConfig() {
        let config = await convex.query(api.math.getMathAddSubMixedConfig, {});
        setService(new MathAddSubMixedService(config));
    }

    if (service === null)
        fetchConfig();

    return (
        <MathExerciseView service={service} headerImage={require('@/assets/images/mixed1000.png')} />
    )
}

export default MathAddSubMixedSubject;
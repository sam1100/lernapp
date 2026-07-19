import { Doc } from "@/convex/_generated/dataModel";
import { MATH_OPERATION_TYPES } from "@/convex/enums";
import { MathExercise, MathService, ValueConfig } from "./MathService";

export interface MathSubtractionExercise extends MathExercise {
    addends: number[];
}

type MathSubtraction = Doc<"math_subtraction">;

export class MathSubtractionService extends MathService {

    private series: MathSubtraction[] = [];

    constructor(series: MathSubtraction[]) {
        super();
        this.series = series;
        this.init();
    }

    private init(): void {
        this.exercises = [];

        const hasGap = false;

        this.series.forEach((serieConfig) => {
            for (let i = 0; i < serieConfig.repetitions; i++) {
                const values: ValueConfig[] = [];
                let result = 0;
                serieConfig.addends.forEach((addend) => {
                    const addendValue = Math.floor(Math.random() * (addend.to - addend.from + 1)) + addend.from;
                    const valueConfig: ValueConfig = { value: addendValue, operation: MATH_OPERATION_TYPES.SUBTRACTION };
                    values.push(valueConfig);
                    result += addendValue;
                });

                const randomIndex = Math.floor(Math.random() * values.length);
                const exerciseResult = values.splice(randomIndex, 1)[0];

                values.unshift({ value: result, operation: MATH_OPERATION_TYPES.SUBTRACTION });

                this.exercises.push({ values, hasGap, exerciseResult: exerciseResult.value, solution: exerciseResult.value, exerciseResults: undefined });
            }
        });

        this.totalExercisesCount = this.exercises.length;
    }
}
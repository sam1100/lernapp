import { Doc } from "@/convex/_generated/dataModel";
import { MATH_OPERATION_TYPES } from "@/convex/enums";
import { MathExercise, MathService, ValueConfig } from "./MathService";

export interface MathAdditionExercise extends MathExercise {
    addends: number[];
}

type MathAddition = Doc<"math_addition">;

export class MathAdditionService extends MathService {

    private series: MathAddition[] = [];

    constructor(series: MathAddition[]) {
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
                let solution = 0;
                serieConfig.addends.forEach((addend) => {
                    const addendValue = Math.floor(Math.random() * (addend.to - addend.from + 1)) + addend.from;
                    const valueConfig: ValueConfig = { value: addendValue, operation: MATH_OPERATION_TYPES.ADDITION };
                    values.push(valueConfig);
                    solution += addendValue;
                });
                const exerciseResult = solution;
                this.exercises.push({ values, hasGap, exerciseResult, solution, exerciseResults: undefined });
            }
        });

        this.totalExercisesCount = this.exercises.length;
    }
}
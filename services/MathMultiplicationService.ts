import { Doc } from "@/convex/_generated/dataModel";
import { MATH_OPERATION_TYPES } from "@/convex/enums";
import { MathExercise, MathService, ValueConfig } from "./MathService";

export interface MathMultiplierExercise extends MathExercise {
    multiplier1: number;
    multiplier2: number;
}

type MathMultiplication = Doc<"math_multiplication">;

export class MathMultiplicationService extends MathService {

    private series: MathMultiplication[] = [];

    constructor(series: MathMultiplication[]) {
        super();
        this.series = series;
        this.init();
    }

    private init(): void {
        this.exercises = [];

        const hasGap = false;
        this.series.forEach((serieConfig) => {
            for (let i = 0; i < serieConfig.repetitions; i++) {
                serieConfig.multipliers.forEach((multiplier) => {
                    const value1: ValueConfig = { value: serieConfig.serie, operation: MATH_OPERATION_TYPES.MULTIPLICATION };
                    const value2: ValueConfig = { value: multiplier, operation: MATH_OPERATION_TYPES.MULTIPLICATION };
                    const exerciseValues: ValueConfig[] = [value1, value2];
                    const exerciseResult = serieConfig.serie * multiplier;
                    const solution = exerciseResult;

                    this.exercises.push({ values: exerciseValues, hasGap, exerciseResult, solution });
                });
            }
        });

        this.totalExercisesCount = this.exercises.length;
    }
}
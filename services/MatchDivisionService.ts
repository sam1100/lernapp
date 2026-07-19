import { Doc } from "@/convex/_generated/dataModel";
import { MATH_OPERATION_TYPES } from "@/convex/enums";
import { MathExercise, MathService, ValueConfig } from "./MathService";

export interface MathDivisionExercise extends MathExercise {
    dividend: number;
    divisor: number;
}

type MathDivision = Doc<"math_division">;

export class MathDivisionService extends MathService {

    private series: MathDivision[] = [];

    constructor(series: MathDivision[]) {
        super();
        this.series = series;
        this.init();
    }

    private init(): void {
        this.exercises = [];

        const hasGap = false;
        this.series.forEach((serieConfig) => {
            for (let i = 0; i < serieConfig.repetitions; i++) {
                const seriesExcercises: MathExercise[] = [];
                serieConfig.multipliers.forEach((multiplier) => {
                    const value1: ValueConfig = { value: serieConfig.serie * multiplier, operation: MATH_OPERATION_TYPES.DIVISION };
                    const value2: ValueConfig = { value: serieConfig.serie, operation: MATH_OPERATION_TYPES.DIVISION };
                    const exerciseValues: ValueConfig[] = [value1, value2];
                    const exerciseResult = multiplier;
                    const solution = exerciseResult;

                    seriesExcercises.push({ values: exerciseValues, hasGap, exerciseResult, solution, exerciseResults: undefined });
                });
                this.setExcercisesRegardingTheirCoverage(seriesExcercises, serieConfig.coverage);
            }
        });

        this.totalExercisesCount = this.exercises.length;
    }
}
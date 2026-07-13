import { Doc } from "@/convex/_generated/dataModel";
import { MATH_OPERATION_TYPES, MathOperationType } from "@/convex/enums";
import { MathService, ValueConfig } from "./MathService";

type MathAddSubMixed = Doc<"math_add_sub_mixed">;

export class MathAddSubMixedService extends MathService {

    private series: MathAddSubMixed[] = [];

    constructor(series: MathAddSubMixed[]) {
        super();
        this.series = series;
        this.init();
    }

    private init(): void {
        this.exercises = [];

        this.series.forEach((serieConfig) => {
            for (let i = 0; i < serieConfig.repetitions; i++) {
                const numbers: number[] = [];
                let exerciseResult = 0;
                let solution = 0;
                serieConfig.operands.forEach((operand) => {
                    const operandValue = Math.floor(Math.random() * ((operand.valueTo - operand.valueFrom + 1)) + operand.valueFrom) * (operand.power ? Math.pow(10, operand.power) : 1);
                    exerciseResult += operandValue;

                    numbers.push(operandValue);
                });
                //                console.log("Generated numbers:", numbers, "Result:", exerciseResult);

                const exerciseValues: ValueConfig[] = numbers.map((num) => this.createValueConfig(num, serieConfig.type as MathOperationType));

                const type: MathOperationType = serieConfig.type as MathOperationType;

                if (serieConfig.type === MATH_OPERATION_TYPES.ADDITION) {
                    // Addition - no need to change the order of numbers
                } else {
                    // Subtraction
                    const exerciseResultValueConfig = this.createValueConfig(exerciseResult, type);

                    const randomIndex = Math.floor(Math.random() * exerciseValues.length);
                    exerciseResult = exerciseValues.splice(randomIndex, 1)[0].value;

                    exerciseValues.unshift(exerciseResultValueConfig);
                }
                solution = exerciseResult;

                // console.log("Exercise numbers before gap:", exerciseValues, "Exercise result:", solution);

                const hasGap = serieConfig.hasGap;
                if (hasGap) {
                    // Randomly replace one of the numbers with a gap
                    const indexToReplace = Math.floor(Math.random() * exerciseValues.length);
                    solution = exerciseValues[indexToReplace].value;
                    exerciseValues[indexToReplace] = this.createValueConfig(NaN, serieConfig.type as MathOperationType); // Using NaN to represent the gap
                }

                // console.log("Exercise numbers after gap:", exerciseValues, "Has gap:", hasGap, "Exercise result:", solution, "Result:", exerciseResult);

                console.log("Generated exercise:", exerciseValues.map(ev => ev.value), "Result:", exerciseResult, "Solution:", solution, "Has gap:", hasGap);

                this.exercises.push({ values: exerciseValues, hasGap, exerciseResult, solution: solution });
            }
        });

        this.totalExercisesCount = this.exercises.length;
    }
}
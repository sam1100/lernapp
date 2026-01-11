import { Doc } from "@/convex/_generated/dataModel";
import { ExerciseService } from "./ExerciseService";

export interface MathMultiplierExercise {
    multiplier1: number;
    multiplier2: number;
}

type MathMultiplication = Doc<"math_multiplication">;

export class MathMultiplicationService extends ExerciseService<MathMultiplierExercise> {

    private series: MathMultiplication[] = [];

    constructor(series: MathMultiplication[]) {
        super();
        this.series = series;
        this.init();
    }

    init(): void {
        this.exercises = [];

        this.series.forEach((serieConfig) => {
            for (let i = 0; i < serieConfig.repetitions; i++) {
                serieConfig.multipliers.forEach((multiplier) => {
                    this.exercises.push({ multiplier1: serieConfig.serie, multiplier2: multiplier });
                });
            }
        });

        this.totalExercisesCount = this.exercises.length;
    }

    basicCheckAnswer(answer: any): boolean {
        let exercise: MathMultiplierExercise = this.exercises[this.currentIndex];
        return (exercise!.multiplier1 * exercise!.multiplier2) === answer;
    }

    protected getNextIndex(): number {
        return Math.floor(Math.random() * this.exercises.length);
    }

}
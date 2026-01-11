import { Doc } from "@/convex/_generated/dataModel";
import { ExerciseService } from "./ExerciseService";

export interface MathDivisionExercise {
    dividend: number;
    divisor: number;
}

type MathDivision = Doc<"math_division">;
export class MathDivisionService extends ExerciseService<MathDivisionExercise> {

    private series: MathDivision[] = [];

    constructor(series: MathDivision[]) {
        super();
        this.series = series;
        this.init();
    }

    init(): void {
        this.exercises = [];

        this.series.forEach((serieConfig) => {
            for (let i = 0; i < serieConfig.repetitions; i++) {
                serieConfig.multipliers.forEach((multiplier) => {
                    this.exercises.push({ dividend: serieConfig.serie * multiplier, divisor: serieConfig.serie });
                });
            }
        });

        this.totalExercisesCount = this.exercises.length;
    }

    basicCheckAnswer(answer: any): boolean {
        let exercise: MathDivisionExercise = this.exercises[this.currentIndex];
        return (exercise!.dividend / exercise!.divisor) === answer;
    }

    protected getNextIndex(): number {
        return Math.floor(Math.random() * this.exercises.length);
    }
}
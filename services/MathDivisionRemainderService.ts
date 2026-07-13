import { Doc } from "@/convex/_generated/dataModel";
import { MATH_OPERATION_TYPES, MathOperationType } from "@/convex/enums";
import { ComprehensiveCheckAnswerResult } from "./ExerciseService";
import { MathExercise, MathService, RenderPart, RenderParts, ValueConfig } from "./MathService";

export interface MathDivisionRemainderExercise extends MathExercise {
    dividend: number;
    divisor: number;
}

export interface MathDivisionRemainderAnswer {
    quotient: number;
    remainder: number;
}

export interface MathDivisionRemainderResult {
    quotient: number;
    remainder: number;
}

export interface ResultValidation {
    quotient: boolean;
    remainder: boolean;
}

type MathDivisionRemainder = Doc<"math_division_remainder">;

export class MathDivisionRemainderService extends MathService {

    private series: MathDivisionRemainder[] = [];

    constructor(series: MathDivisionRemainder[]) {
        super();
        this.series = series;
        this.init();
    }

    private init(): void {
        this.exercises = [];

        const hasGap = false;
        this.series.forEach((serieConfig) => {
            for (let i = 0; i < serieConfig.repetitions; i++) {
                serieConfig.divisors.forEach((divisor) => {
                    const remainder: number = Math.floor(Math.random() * (serieConfig.serie - 1));
                    const value1: ValueConfig = { value: divisor * serieConfig.serie + remainder, operation: MATH_OPERATION_TYPES.DIVISION_REMAINDER };
                    const value2: ValueConfig = { value: serieConfig.serie, operation: MATH_OPERATION_TYPES.DIVISION_REMAINDER };
                    const exerciseValues: ValueConfig[] = [value1, value2];
                    const exerciseResult = -1; // wird nicht benötigt, da das Ergebnis aus Quotient und Rest besteht
                    const solution = -1; // wird nicht benötigt, da das Ergebnis aus Quotient und Rest besteht

                    const exerciseResults: MathDivisionRemainderResult = {
                        quotient: divisor,
                        remainder: remainder
                    };

                    this.exercises.push({ values: exerciseValues, hasGap, exerciseResult, solution, exerciseResults });
                });
            }
        });

        this.totalExercisesCount = this.exercises.length;
    }

    public basicComprehensiveCheckAnswer(answer: MathDivisionRemainderResult): ComprehensiveCheckAnswerResult {
        const currentExercise: MathDivisionRemainderExercise = this.exercises[this.currentIndex] as MathDivisionRemainderExercise;

        const validation: ResultValidation = {
            quotient: currentExercise.exerciseResults.quotient === answer.quotient,
            remainder: currentExercise.exerciseResults.remainder === answer.remainder
        };

        const isCorrect: boolean = validation.quotient && validation.remainder;
        if (isCorrect)
            this.incrementCorrectAnswers();

        return { isCorrect: isCorrect, details: validation };
    }

    public createDivisionRemainderRenderParts = (answer: MathDivisionRemainderAnswer | null, gapSymbol: string): RenderParts => {
        const exercise = this.exercises[this.currentIndex] as MathExercise;
        let exerciseParts: RenderPart[] = [];

        const values = exercise.values;

        for (let i = 0; i < values.length; i++) {
            exerciseParts.push({ text: values[i].value.toString(), isAnswer: false, isCorrect: false });

            if (i < values.length - 1) {
                let joinChar = this.getJoinChar(values[i].operation as MathOperationType);
                exerciseParts.push({ text: joinChar, isAnswer: false, isCorrect: false });
            }
        }

        let resultPart: RenderPart;
        if (answer === null || isNaN(answer.quotient) || isNaN(answer.remainder))
            resultPart = { text: gapSymbol, isAnswer: false, isCorrect: false };
        else {
            const text = `${exercise.exerciseResults.quotient} Rest ${exercise.exerciseResults.remainder}`;
            resultPart = { text, isAnswer: true, isCorrect: answer.quotient === exercise.exerciseResults.quotient && answer.remainder === exercise.exerciseResults.remainder };
        }

        return { exerciseParts: exerciseParts, result: resultPart };
    }
}
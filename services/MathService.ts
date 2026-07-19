import { MATH_OPERATION_TYPES, MathOperationType } from "@/convex/enums";
import { ComprehensiveCheckAnswerResult, ExerciseService } from "./ExerciseService";

export interface MathExercise {
    values: ValueConfig[];
    hasGap: boolean;
    exerciseResult: number; // Ergebnis der Rechnung. Falls die Aufgabe eine Lücke hat, ist dies das Ergebnis der Rechnung ohne die Lücke.
    solution: number; // Ergebnis der Aufgabe die der Benutzer eingibt. Bei einer Lücke ist dies die Zahl, die in der Lücke steht.
    exerciseResults: any; // Falls das Ergebnis mehr als nur eine Zahl ist, z.B. bei Division mit Rest, kann dies ein Objekt sein, das die verschiedenen Teile des Ergebnisses enthält.
}

export type RenderPart = {
    text: string;
    isAnswer: boolean;
    isCorrect: boolean;
};

export type RenderParts = {
    exerciseParts: RenderPart[];
    result: RenderPart;
}

export type ValueConfig = {
    value: number;
    operation: MathOperationType;
};

export abstract class MathService extends ExerciseService<MathExercise> {

    constructor() {
        super();
    }

    basicComprehensiveCheckAnswer(answer: any): ComprehensiveCheckAnswerResult {
        throw new Error("Method not implemented.");
    }

    basicCheckAnswer(answer: any): boolean {
        return this.getAnswer() === answer;
    }

    public getAnswer(): number {
        let exercise: MathExercise = this.exercises[this.currentIndex];
        return exercise.solution;
    }

    protected createValueConfig(value: number, operation: MathOperationType): ValueConfig {
        return { value, operation };
    }

    protected setExcercisesRegardingTheirCoverage(seriesExcercises: MathExercise[], coverage: number | undefined): void {
        const shuffledExercises = seriesExcercises.slice(0, seriesExcercises.length).sort(() => Math.random() - 0.5);
        const usedCoverage = coverage ?? 1.0;
        const amount = Math.floor(shuffledExercises.length * usedCoverage);

        //                console.log(`Serie: ${serieConfig.serie}, Coverage: ${coverage}, Amount: ${amount}, Total Exercises: ${shuffledExercises.length}`);

        this.exercises.push(...shuffledExercises.slice(0, amount));
    }

    public createRenderParts = (answer: string | null, gapSymbol: string): RenderParts => {
        const exercise = this.exercises[this.currentIndex] as MathExercise;
        let exerciseParts: RenderPart[] = [];

        const values = exercise.values;

        for (let i = 0; i < values.length; i++) {
            if (isNaN(values[i].value))
                if (answer === null)
                    exerciseParts.push({ text: gapSymbol, isAnswer: false, isCorrect: false });
                else
                    exerciseParts.push({ text: answer, isAnswer: true, isCorrect: answer === exercise.solution.toString() });
            else
                exerciseParts.push({ text: values[i].value.toString(), isAnswer: false, isCorrect: false });

            if (i < values.length - 1) {
                let joinChar = this.getJoinChar(values[i].operation as MathOperationType);
                exerciseParts.push({ text: joinChar, isAnswer: false, isCorrect: false });
            }
        }

        let resultPart: RenderPart;
        if (exercise.hasGap)
            resultPart = { text: exercise.exerciseResult.toString(), isAnswer: false, isCorrect: false };
        else
            if (answer === null)
                resultPart = { text: gapSymbol, isAnswer: false, isCorrect: false };
            else
                resultPart = { text: exercise.solution.toString(), isAnswer: true, isCorrect: answer === exercise.solution.toString() };


        return { exerciseParts: exerciseParts, result: resultPart };
    }

    protected getJoinChar(operation: MathOperationType): string {
        switch (operation) {
            case MATH_OPERATION_TYPES.ADDITION:
                return " + ";
            case MATH_OPERATION_TYPES.SUBTRACTION:
                return " - ";
            case MATH_OPERATION_TYPES.MULTIPLICATION:
                return " x ";
            case MATH_OPERATION_TYPES.DIVISION:
            case MATH_OPERATION_TYPES.DIVISION_REMAINDER:
                return " ÷ ";
            default:
                return " ";
        }
    }
}
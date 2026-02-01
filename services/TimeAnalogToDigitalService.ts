import { ComprehensiveCheckAnswerResult } from "./ExerciseService";
import { ResultValidation, TimeExercise, TimeResult, TimeService } from "./TimeService";

export interface TimeAnalogToDigitalExercise extends TimeExercise {
    result: number | null;
    analog: number | null;
}

export interface TimeAnalogToDigitalResult extends TimeResult {
    digitalAm: number | null;
    digitalPm: number | null;
}

export class TimeAnalogToDigitalService extends TimeService<TimeAnalogToDigitalExercise, TimeAnalogToDigitalResult> {
    constructor(repetitions: number) {
        super(repetitions);
    }

    protected createExercise(time: number): TimeAnalogToDigitalExercise {

        const am: boolean = Math.floor(Math.random() * 20) < 10; // 50% Chance für AM oder PM

        return {
            result: time,
            analog: time,
        }
    }

    basicComprehensiveCheckAnswer(answer: TimeAnalogToDigitalResult): ComprehensiveCheckAnswerResult {
        const currentExercise: TimeAnalogToDigitalExercise = this.exercises[this.currentIndex];

        const digitalAm: number = this.getDigtitalAmTime(currentExercise.result!);
        const digitalPm: number = this.getDigtitalPmTime(currentExercise.result!);

        const digitalAmCorrect: boolean = this.compareTimes(answer.digitalAm, digitalAm);
        const digitalPmCorrect: boolean = this.compareTimes(answer.digitalPm, digitalPm);

        const result: ResultValidation = {
            digitalAm: digitalAmCorrect,
            digitalPm: digitalPmCorrect,
            analog: true
        };

        return {
            isCorrect: digitalAmCorrect && digitalPmCorrect,
            details: result
        }
    }

    protected basicCheckAnswer(answer: any): boolean {
        return answer;
    }
}
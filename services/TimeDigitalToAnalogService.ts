import { ComprehensiveCheckAnswerResult } from "./ExerciseService";
import { ResultValidation, TimeExercise, TimeResult, TimeService } from "./TimeService";

export interface TimeDigitalToAnalogExercise extends TimeExercise {
    result: number | null;
    digitalAm: number | null;
    digitalPm: number | null;
}

export interface TimeDigitalToAnalogResult extends TimeResult {
    digitalAm: number | null;
    digitalPm: number | null;
    analog: number | null;
}

export class TimeDigitalToAnalogService extends TimeService<TimeDigitalToAnalogExercise, TimeDigitalToAnalogResult> {
    constructor(repetitions: number) {
        super(repetitions);
    }

    protected createExercise(time: number): TimeDigitalToAnalogExercise {

        const am: boolean = Math.floor(Math.random() * 20) < 10; // 50% Chance für AM oder PM

        const digitalAm: number | null = am ? this.getDigtitalAmTime(time) : null;
        const digitalPm: number | null = !am ? this.getDigtitalPmTime(time) : null;

        return {
            result: time,
            digitalAm: digitalAm,
            digitalPm: digitalPm,
        }
    }

    basicComprehensiveCheckAnswer(answer: TimeDigitalToAnalogResult): ComprehensiveCheckAnswerResult {
        const currentExercise: TimeDigitalToAnalogExercise = this.exercises[this.currentIndex];

        const digitalAm: number = this.getDigtitalAmTime(currentExercise.result!);
        const digitalPm: number = this.getDigtitalPmTime(currentExercise.result!);

        const digitalAmCorrect: boolean = this.compareTimes(answer.digitalAm, digitalAm);
        const digitalPmCorrect: boolean = this.compareTimes(answer.digitalPm, digitalPm);
        const analogCorrect: boolean = this.compareTimes(answer.analog, digitalAm);

        const result: ResultValidation = {
            digitalAm: digitalAmCorrect,
            digitalPm: digitalPmCorrect,
            analog: analogCorrect
        };

        return {
            isCorrect: digitalAmCorrect && digitalPmCorrect && analogCorrect,
            details: {
                digitalAm: result,
            }
        }
    }

    protected basicCheckAnswer(answer: any): boolean {
        return answer;
    }
}
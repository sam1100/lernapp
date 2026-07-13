import { ComprehensiveCheckAnswerResult } from "./ExerciseService";
import { ResultValidation, TimeExercise, TimeResult, TimeService } from "./TimeService";

export class TimeAnalogToDigitalService extends TimeService {
    constructor(repetitions: number) {
        super(repetitions);
    }

    protected createExercise(time: number): TimeExercise {

        return {
            result: time,
            isAm: null,
            digitalAm: null,
            digitalPm: null,
            analog: time
        }
    }

    protected basicComprehensiveCheckAnswer(answer: TimeResult): ComprehensiveCheckAnswerResult {
        const currentExercise: TimeExercise = this.exercises[this.currentIndex];

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
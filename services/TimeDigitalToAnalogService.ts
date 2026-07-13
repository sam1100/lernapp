import { ComprehensiveCheckAnswerResult } from "./ExerciseService";
import { ResultValidation, TimeExercise, TimeResult, TimeService } from "./TimeService";

export class TimeDigitalToAnalogService extends TimeService {
    constructor(repetitions: number) {
        super(repetitions);
    }

    protected createExercise(time: number): TimeExercise {

        //        const isAm: boolean = Math.floor(Math.random() * 20) < 10; // 50% Chance für AM oder PM
        const isAm = false;
        const digitalAm: number | null = isAm ? this.getDigtitalAmTime(time) : null;
        const digitalPm: number | null = !isAm ? this.getDigtitalPmTime(time) : null;

        return {
            result: isAm ? time : this.getDigtitalPmTime(time),
            isAm: isAm,
            digitalAm: digitalAm,
            digitalPm: digitalPm,
            analog: null
        }
    }

    protected basicComprehensiveCheckAnswer(answer: TimeResult): ComprehensiveCheckAnswerResult {
        const currentExercise: TimeExercise = this.exercises[this.currentIndex];

        let digitalAmCorrect: boolean = false;
        let digitalPmCorrect: boolean = false;

        if (currentExercise.isAm) {
            const digitalPm: number = this.getDigtitalPmTime(currentExercise.result!);
            digitalPmCorrect = this.compareTimes(answer.digitalPm, digitalPm);
            digitalAmCorrect = true;
        } else {
            const digitalAm: number = this.getDigtitalAmTime(currentExercise.result!);
            digitalAmCorrect = this.compareTimes(answer.digitalAm, digitalAm);
            digitalPmCorrect = true;
        }

        const analogCorrect: boolean = this.compareTimes(answer.analog, this.getDigtitalAmTime(currentExercise.result!));

        const result: ResultValidation = {
            digitalAm: digitalAmCorrect,
            digitalPm: digitalPmCorrect,
            analog: analogCorrect
        };

        return {
            isCorrect: digitalAmCorrect && digitalPmCorrect && analogCorrect,
            details: result
        }
    }

    protected basicCheckAnswer(answer: any): boolean {
        return answer;
    }
}
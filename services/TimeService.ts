import { ExerciseService } from "./ExerciseService";

export interface TimeExercise { }

export interface TimeResult { }

export interface ResultValidation {
    digitalAm: boolean;
    digitalPm: boolean;
    analog: boolean;
}

export abstract class TimeService<T extends TimeExercise, R extends TimeResult> extends ExerciseService<T> {
    private timeExercises: TimeExercise[] = [];

    constructor(repetitions: number) {
        super();
        this.init(repetitions);
    }

    protected init(repetitions: number): void {
        this.exercises = [];

        for (let i = 0; i < repetitions; i++) {
            const time = this.createTime();
            this.exercises.push(this.createExercise(time));
        }

        this.totalExercisesCount = this.exercises.length;
    }

    createTime(): number {
        const hours: number = Math.floor(Math.random() * 12); // 0-11
        const minutes: number = Math.floor(Math.random() * 12) * 5; // 0, 5, 10, ..., 55

        return hours + minutes / 60;
    }

    protected abstract createExercise(time: number): T;

    protected getDigtitalAmTime(time: number): number {
        const hours: number = Math.floor(time);
        return hours >= 12 ? time - 12 : time;
    }
    protected getDigtitalPmTime(time: number): number {
        const hours: number = Math.floor(time);
        return hours < 12 ? time + 12 : time;
    }

    getTimeString(time: number | null): string {
        if (time === null) {
            return "";
        }
        const hours: number = Math.floor(time);
        const minutes: number = Math.round((time - hours) * 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    getTimeParts(time: number): { hours: number; minutes: number } {
        const hours: number = Math.floor(time);
        const minutes: number = Math.round((time - hours) * 60);
        return { hours, minutes };
    }

    protected compareTimes(time1: number | null, time2: number | null): boolean {
        if (time1 === null || time2 === null)
            return false;

        return Math.abs(time1 - time2) < 0.01; // Allow a small margin of error
    }
}
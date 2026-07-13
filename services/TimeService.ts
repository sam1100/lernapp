import { ExerciseService } from "./ExerciseService";

export interface TimeExercise {
    result: number | null;
    isAm: boolean | null;
    digitalAm: number | null;
    digitalPm: number | null;
    analog: number | null;
}

export interface TimeResult {
    analog: number | null;
    digitalAm: number | null;
    digitalPm: number | null;
}

export interface ResultValidation {
    digitalAm: boolean;
    digitalPm: boolean;
    analog: boolean;
}

export abstract class TimeService extends ExerciseService<TimeExercise> {
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

    protected abstract createExercise(time: number): TimeExercise;

    public getDigtitalAmTime(time: number): number {
        const hours: number = Math.floor(time);
        return hours >= 12 ? time - 12 : time;
    }
    public getDigtitalPmTime(time: number): number {
        const hours: number = Math.floor(time);
        return hours < 12 ? time + 12 : time;
    }

    public getDititalAmTimeString(time: number | null): string {
        return this.getTimeString(this.getDigtitalAmTime(time ?? 0));
    }
    public getDititalPmTimeString(time: number | null): string {
        return this.getTimeString(this.getDigtitalPmTime(time ?? 0));
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
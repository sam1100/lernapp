export abstract class ExerciseService<T> {
    protected exercises: T[] = [];
    protected currentIndex: number = -1;
    protected correctAnswers: number = 0;
    protected totalExercisesCount: number = 0;

    getTotalExercisesCount(): number {
        return this.totalExercisesCount;
    }

    getNextExercise(): T | null {
        if (this.exercises.length === 0) {
            return null;
        } else {
            if (this.currentIndex >= 0)
                this.exercises.splice(this.currentIndex, 1);

            this.currentIndex = this.getNextIndex();
            return this.exercises[this.currentIndex];
        }
    }
    protected abstract getNextIndex(): number;

    hasNext(): boolean {
        return this.exercises.length > 0;
    }

    checkAnswer(answer: any): boolean {
        const isCorrect = this.basicCheckAnswer(answer);
        if (isCorrect) {
            this.incrementCorrectAnswers();
        }

        return isCorrect;
    }

    protected abstract basicCheckAnswer(answer: any): boolean;

    incrementCorrectAnswers(): void {
        this.correctAnswers++;
    }

    getCorrectAnswersCount(): number {
        return this.correctAnswers;
    }

    getWrongAnswersCount(): number {
        return this.getTotalExercisesCount() - this.exercises.length - this.correctAnswers;
    }

    getCorrectAnswersRate(): number {
        const total = this.getTotalExercisesCount();
        return total === 0 ? 0 : (this.correctAnswers / total) * 100;
    }

    getWrongAnswersRate(): number {
        const total = this.getTotalExercisesCount();
        return total === 0 ? 0 : (this.getWrongAnswersCount() / total) * 100;
    }

    getTotalAnswersCount(): number {
        return this.getTotalExercisesCount() - this.exercises.length;
    }
}
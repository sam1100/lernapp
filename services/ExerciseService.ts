export interface ComprehensiveCheckAnswerResult {
    isCorrect: boolean;
    details: any;
}

export abstract class ExerciseService<T> {
    protected exercises: T[] = [];
    protected currentIndex: number = -1;
    protected correctAnswers: number = 0;
    protected totalExercisesCount: number = 0;

    getTotalExercisesCount(): number {
        return this.totalExercisesCount;
    }

    getNextExercise(): T | null {
        if (!this.hasNext()) {
            return null;
        } else {
            if (this.currentIndex >= 0)
                this.exercises.splice(this.currentIndex, 1);

            this.currentIndex = this.getNextIndex();
            return this.exercises[this.currentIndex];
        }
    }

    protected getNextIndex(): number {
        return Math.floor(Math.random() * this.exercises.length);
    }


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

    comprehensiveCheckAnswer(answer: any): ComprehensiveCheckAnswerResult {
        const comprehensiveCheckAnswerResult: ComprehensiveCheckAnswerResult = this.basicComprehensiveCheckAnswer(answer);
        if (comprehensiveCheckAnswerResult.isCorrect)
            this.checkAnswer(comprehensiveCheckAnswerResult.isCorrect);

        return comprehensiveCheckAnswerResult;
    }

    protected abstract basicComprehensiveCheckAnswer(answer: any): ComprehensiveCheckAnswerResult;

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
        //        console.log(`Total answers count: ${this.getTotalExercisesCount()} - ${this.exercises.length}`);
        // Math.min, da der Benutzer nach der letzten Aufgabe nochmals Weiter klickt und totalExcecisesCount dann 0 wird, was zu einer negativen Zahl führt und die Anzeige der Fortschrittsleiste zerstört.
        return Math.min(this.getTotalExercisesCount() - 1, this.getTotalExercisesCount() - this.exercises.length);
    }

    getAnswer(): number | string {
        return "";
    }
}
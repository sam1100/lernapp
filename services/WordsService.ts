import { Doc } from "@/convex/_generated/dataModel";
import { ExerciseService } from "./ExerciseService";

export interface WordExercise {
    word: string;
    wordConfig: WordConfig;
}

type WordConfig = Doc<"german_words">;

export class WordsService extends ExerciseService<WordExercise> {

    private words: WordConfig[] = [];

    constructor(words: WordConfig[]) {
        super();
        this.words = words;
        this.init();
    }

    init(): void {
        this.exercises = [];

        this.words.forEach((wordConfig) => {
            for (let i = 0; i < wordConfig.repetitions; i++) {
                const word: string = wordConfig.word.map(w => w.text).join('');
                this.exercises.push({
                    word,
                    wordConfig
                }
                )
            };
        });

        this.totalExercisesCount = this.exercises.length;
    }

    basicCheckAnswer(answer: boolean): boolean {
        return answer;
    }

    protected getNextIndex(): number {
        return Math.floor(Math.random() * this.exercises.length);
    }

}
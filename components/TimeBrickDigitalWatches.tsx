import { ComprehensiveCheckAnswerResult } from "@/services/ExerciseService";
import { TimeAnalogToDigitalExercise, TimeAnalogToDigitalResult, TimeAnalogToDigitalService } from "@/services/TimeAnalogToDigitalService";
import { RefObject } from "react";
import { Text, TextInput, View } from "react-native";
import DigitalWatch from "./DigitalWatch";


const DigitalTimeWatches = ({ answer, answerResult, exercise, timeServiceRef, onSubmitAm, onSubmitPm, refDigitalInputAM, refDigitalInputPM, styles }: { answer: TimeAnalogToDigitalResult | null, answerResult: ComprehensiveCheckAnswerResult | null, exercise: TimeAnalogToDigitalExercise | null, timeServiceRef: RefObject<TimeAnalogToDigitalService | null>, onSubmitAm: (input: number) => void, onSubmitPm: (input: number) => void, refDigitalInputAM: RefObject<TextInput | null>, refDigitalInputPM: RefObject<TextInput | null>, styles: any }) => {
    return (
        <>
            <View id='ampmContainer' style={styles.digitalWatchesContainer}>
                <Text style={[styles.digitalWatchElement, styles.digitalWatchAmPm]}>AM</Text>
                <Text style={[styles.digitalWatchElement, styles.digitalWatchAmPm]}>PM</Text>
            </View>

            <View id='digitalWatchesContainerResult' style={styles.digitalWatchesContainer}>
                <View id='digitalWatchWrapperAM' style={[styles.digitalWatchElement]}>
                    <DigitalWatch initialTimeValue={(answer && timeServiceRef.current) ? timeServiceRef.current.getTimeString(answer?.digitalAm ?? null) : ""} editable={true} onSubmit={onSubmitAm} ref={refDigitalInputAM} />
                </View>
                <View id='digitalWatchWrapperPM' style={[styles.digitalWatchElement]}>
                    <DigitalWatch initialTimeValue={(answer && timeServiceRef.current) ? timeServiceRef.current.getTimeString(answer?.digitalPm ?? null) : ""} editable={true} onSubmit={onSubmitPm} ref={refDigitalInputPM} />
                </View>
            </View>

            {answerResult !== null ? (
                <View id='digitalWatchesContainerCorrection' style={styles.digitalWatchesContainer}>
                    <View id='digitalWatchWrapperAMCorrection' style={styles.digitalWatchElement}>
                        <DigitalWatch initialTimeValue={(exercise && timeServiceRef.current) ? timeServiceRef.current.getTimeString(exercise.result ?? null) : ""} editable={false} isResultCorrect={answerResult?.details.digitalAm} />
                    </View>
                    <View id='digitalWatchWrapperPMCorrection' style={styles.digitalWatchElement}>
                        <DigitalWatch initialTimeValue={(exercise && timeServiceRef.current) ? timeServiceRef.current.getTimeString(exercise.result ? exercise.result + 12 : null) : ""} editable={false} isResultCorrect={answerResult?.details.digitalPm} />
                    </View>
                </View>
            ) : null}
        </>
    );
}

export default DigitalTimeWatches;
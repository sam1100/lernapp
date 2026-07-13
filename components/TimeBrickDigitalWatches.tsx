import { ComprehensiveCheckAnswerResult } from "@/services/ExerciseService";
import { TimeExercise, TimeResult, TimeService } from "@/services/TimeService";
import { RefObject } from "react";
import { Text, TextInput, View } from "react-native";
import DigitalWatch from "./DigitalWatch";


const DigitalTimeWatches = ({ answer, answerResult, exercise, editable, timeServiceRef, onSubmitAm, onSubmitPm, refDigitalInputAM, refDigitalInputPM, styles }: { answer: TimeResult | null, answerResult: ComprehensiveCheckAnswerResult | null, exercise: TimeExercise | null, editable: { am: boolean, pm: boolean }, timeServiceRef: RefObject<TimeService | null>, onSubmitAm: (input: number) => void, onSubmitPm: (input: number) => void, refDigitalInputAM: RefObject<TextInput | null>, refDigitalInputPM: RefObject<TextInput | null>, styles: any }) => {
    return (
        <>
            <View id='ampmContainer' style={styles.digitalWatchesContainer}>
                <Text style={[styles.digitalWatchElement, styles.digitalWatchAmPm]}>AM</Text>
                <Text style={[styles.digitalWatchElement, styles.digitalWatchAmPm]}>PM</Text>
            </View>

            <View id='digitalWatchesContainerResult' style={styles.digitalWatchesContainer}>
                <View id='digitalWatchWrapperAM' style={[styles.digitalWatchElement]}>
                    <DigitalWatch initialTimeValue={(answer && timeServiceRef.current) ? timeServiceRef.current.getTimeString(answer?.digitalAm ?? null) : ""} editable={editable.am} onSubmit={onSubmitAm} ref={refDigitalInputAM} />
                </View>
                <View id='digitalWatchWrapperPM' style={[styles.digitalWatchElement]}>
                    <DigitalWatch initialTimeValue={(answer && timeServiceRef.current) ? timeServiceRef.current.getTimeString(answer?.digitalPm ?? null) : ""} editable={editable.pm} onSubmit={onSubmitPm} ref={refDigitalInputPM} />
                </View>
            </View>

            {answerResult !== null ? (
                <View id='digitalWatchesContainerCorrection' style={styles.digitalWatchesContainer}>
                    <View id='digitalWatchWrapperAMCorrection' style={styles.digitalWatchElement}>
                        <DigitalWatch initialTimeValue={(exercise && timeServiceRef.current) ? timeServiceRef.current.getDititalAmTimeString(exercise.result ?? null) : ""} editable={false} isResultCorrect={answerResult?.details.digitalAm} />
                    </View>
                    <View id='digitalWatchWrapperPMCorrection' style={styles.digitalWatchElement}>
                        <DigitalWatch initialTimeValue={(exercise && timeServiceRef.current) ? timeServiceRef.current.getDititalPmTimeString(exercise.result ?? null) : ""} editable={false} isResultCorrect={answerResult?.details.digitalPm} />
                    </View>
                </View>
            ) : null}
        </>
    );
}

export default DigitalTimeWatches;
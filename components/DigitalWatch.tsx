import { createStyles } from '@/assets/styles/styles';
import React, { useEffect } from 'react';
import { TextInput } from 'react-native';
//const regex = new RegExp("^([0-9]{1,2}):([0-9]{1,2})$");


const DigitalWatch = ({ initialTimeValue, editable, onSubmit, ref, isResultCorrect }: { initialTimeValue: string, editable?: boolean, onSubmit?: (input: number) => void, ref?: React.RefObject<TextInput | null>, isResultCorrect?: boolean },) => {

    const [timeValue, setTimeValue] = React.useState<string>(initialTimeValue);
    const styles = createStyles();

    useEffect(() => {
        setTimeValue(initialTimeValue);
    }, [initialTimeValue]);

    const verifyTimeInput = (input: string) => {
        //        console.log("Eingegebene Zeit:", input);
        //        console.log("Gespeicherte Zeit:", timeValue);

        if (input.length === 2 && timeValue.length < 2 && !input.endsWith(':')) {
            input = input + ':';
        } else if (input.length >= 3 && !input.includes(':')) {
            input = input.slice(0, 2) + ':' + input.slice(2, input.length);
        }

        setTimeValue(input);
    }

    const onSubmitEditing = (input: string) => {
        const parts = input.split(':');

        let hours = 0;
        let minutes = 0;

        if (parts.length >= 1) {
            hours = parts[0].length > 0 ? parseInt(parts[0], 10) : 0;
        }
        if (parts.length >= 2) {
            minutes = parts[1].length > 0 ? parseInt(parts[1], 10) : 0;
        }

        const timeValue = hours + minutes / 60;
        onSubmit?.(timeValue);
    }

    //    console.log(`DigitalWatch render: isResultCorrect: ${JSON.stringify(isResultCorrect)} / timeValue: ${ timeValue } / editable: ${editable}`);

    return (
        <TextInput
            style={[styles.digitalWatchInput, !editable && styles.digitalWatchInputDisabled, isResultCorrect === true ? styles.correctDigitalAnswer : isResultCorrect === false ? styles.wrongDigitalAnswer : null]}
            placeholder=':'
            value={timeValue}
            maxLength={5}
            onChangeText={verifyTimeInput}
            onSubmitEditing={e => onSubmitEditing(e.nativeEvent.text)}
            keyboardType="numeric"
            returnKeyType="done"
            submitBehavior="blurAndSubmit"
            editable={editable}
            ref={ref}
        />
    )
}

export default DigitalWatch
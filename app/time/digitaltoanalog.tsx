import { createStyles } from '@/assets/styles/styles';
import HeaderSubject from '@/components/HeaderSubject';
import useTheme from '@/hooks/useTheme';
import React from 'react';
import { Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tableImage = require('@/assets/images/table.png');
const timeButton = require('@/assets/images/time-analog-digital-button.png');
const checkAnswerButton = require('@/assets/images/check-time-button.png');
const nextButton = require('@/assets/images/next-time-button.png');

const DigitalToAnalog = () => {

    const { timeTheme } = useTheme();
    const styles = createStyles();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <KeyboardAvoidingView
                behavior={'padding'}
                keyboardVerticalOffset={Platform.OS === 'android' ? 100 : 100}
                style={styles.containerLayout}
            >
                <SafeAreaView style={{ flex: 1 }} edges={[]}>
                    <HeaderSubject theme={timeTheme} styles={styles} image={timeButton} progressParts={[]} doneCount={0} totalCount={0} />
                    <ScrollView>

                        <ImageBackground source={tableImage} resizeMode="cover" style={styles.subjectWorkspace}>
                            <Image source={nextButton} resizeMode="contain" style={{ height: 100, width: "50%" }} />
                            <Image source={nextButton} resizeMode="contain" style={{ height: 200, width: "50%" }} />
                            <TextInput
                                style={[styles.digitalWatchInput, styles.digitalWatchInputDisabled]}
                                keyboardType="numeric"
                                returnKeyType="done"
                                submitBehavior="blurAndSubmit"
                            />
                            <Image source={nextButton} resizeMode="contain" style={{ height: 200, width: "50%" }} />
                            <Image source={nextButton} resizeMode="contain" style={{ height: 200, width: "50%" }} />
                        </ImageBackground>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default DigitalToAnalog
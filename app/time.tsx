import { createStyles } from '@/assets/styles/styles';
import HeaderSubject from '@/components/HeaderSubject';
import Watch from '@/components/Watch';
import useTheme from '@/hooks/useTheme';
import React from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tableImage = require('@/assets/images/table.png');
const timeButton = require('@/assets/images/time-button.png');

const time = () => {

    const { timeTheme, colors } = useTheme();
    const styles = createStyles();

    return (
        <SafeAreaView style={styles.containerLayout} edges={[]}>
            <HeaderSubject theme={timeTheme} styles={styles} image={timeButton} />
            <ImageBackground source={tableImage} resizeMode="cover" style={styles.subjectWorkspace}>
                <Watch />
            </ImageBackground>
        </SafeAreaView>
    )
}

export default time
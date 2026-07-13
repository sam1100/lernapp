import { createStyles } from '@/assets/styles/styles';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, G, Line, Text as SvgText } from 'react-native-svg';

const turnRightButton = require('@/assets/images/turn-right-button.png');
const turnLeftButton = require('@/assets/images/turn-left-button.png');

const MINUTE_PRECISION = 5;

const AnalogWatch = ({ timeParts, isResultCorrect, resultTimeParts, editable, onSubmit }: { timeParts?: { hours: number; minutes: number }, isResultCorrect?: boolean, resultTimeParts?: { hours: number; minutes: number }, editable?: boolean, onSubmit: (input: number) => void }) => {
    const styles = createStyles();

    const [hours, setHours] = useState<number | null>(null);
    const [minutes, setMinutes] = useState<number | null>(null);

    useEffect(() => {
        if (timeParts) {
            setHours(timeParts.hours);
            setMinutes(timeParts.minutes);
        }
    }, [timeParts]);

    const hoursTurnRight = (doSubmitTime: boolean) => {
        const newHours = (hours === null) ? null : (hours === 12 ? 1 : hours + 1);
        setHours((prevHours) => newHours);
        if (doSubmitTime)
            submitTime(minutes, newHours);
        return newHours;
    };

    const hoursTurnLeft = (doSubmitTime: boolean) => {
        const newHours = (hours === null) ? null : (hours === 1 ? 12 : (hours === 0 ? 11 : hours - 1));
        setHours((prevHours) => newHours);
        if (doSubmitTime)
            submitTime(minutes, newHours);
        return newHours;
    };

    const minutesTurnRight = () => {
        const minutesBefore = minutes;
        const newMinutes = (minutes === null) ? null : (minutes === 60 - MINUTE_PRECISION ? 0 : minutes + MINUTE_PRECISION);
        setMinutes((prevMinutes) => newMinutes);

        let newHours = hours;
        if (minutesBefore === 60 - MINUTE_PRECISION)
            newHours = hoursTurnRight(false);

        submitTime(newMinutes, newHours);
    };

    const minutesTurnLeft = () => {
        const minutesBefore = minutes;
        const newMinutes = (minutes === null) ? null : (minutes === 0 ? 60 - MINUTE_PRECISION : minutes - MINUTE_PRECISION);
        setMinutes((prevMinutes) => newMinutes);

        let newHours = hours;
        if (minutesBefore === 0)
            newHours = hoursTurnLeft(false);

        submitTime(newMinutes, newHours);
    };

    const submitTime = (minutes: number | null, hours: number | null) => {
        if (hours !== null && minutes !== null) {
            const timeValue = hours + minutes / 60;
            onSubmit(timeValue);
        }
    };

    const clockBackgroundColor = isResultCorrect === true ? 'rgba(190, 243, 201, 0.4)' : isResultCorrect === false ? '#f8d7da' : '#f8f9fa';

    return (
        <View id="watchNavigationContainer" style={styles.watchNavigationContainer}>
            {editable &&
                <View id="hourContainer" style={styles.clockNavigationContainer}>
                    <Text style={styles.clockNavigationText}>Stunden</Text>
                    <TouchableOpacity onPress={() => hoursTurnRight(true)}>
                        <Image source={turnRightButton} resizeMode="contain" style={styles.clockNavigationButton} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => hoursTurnLeft(true)}>
                        <Image source={turnLeftButton} resizeMode="contain" style={styles.clockNavigationButton} />
                    </TouchableOpacity>
                </View>
            }
            <View id="clockWrapper" style={styles.clockWrapper}>
                <Svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                    {/* Zifferblatt Hintergrund */}
                    <Circle cx="100" cy="100" r="95" fill={clockBackgroundColor} stroke="#333" strokeWidth="2" />


                    {/* 5-Minuten-Raster (Strichmarkierungen) */}
                    <G id="ticks" stroke="#333" strokeWidth="2">
                        <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(0 100 100)" />
                        <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(30 100 100)" />
                        <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(60 100 100)" />
                        <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(90 100 100)" />
                        <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(120 100 100)" />
                        <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(150 100 100)" />
                        <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(180 100 100)" />
                        <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(210 100 100)" />
                        <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(240 100 100)" />
                        <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(270 100 100)" />
                        <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(300 100 100)" />
                        <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(330 100 100)" />
                    </G>

                    {/* Zahlen */}
                    <G fontFamily="Arial, sans-serif" fontSize="16" textAnchor="middle" fill="#333" fontWeight="bold">
                        <SvgText x="100" y="35">12</SvgText>
                        <SvgText x="165" y="105">3</SvgText>
                        <SvgText x="100" y="175">6</SvgText>
                        <SvgText x="35" y="105">9</SvgText>
                    </G>
                    {/* Zeiger */}
                    {/* Minutenzeiger */}
                    {isResultCorrect !== false && minutes !== null && (
                        <Line id="minute" x1="100" y1="100" x2="100" y2="40" stroke="#e2a457" strokeWidth="7" strokeLinecap="round" transform={`rotate(${minutes * 6} 100 100)`} />
                    )}
                    {/* Stundenzeiger */}
                    {isResultCorrect !== false && hours !== null && minutes !== null && (
                        <Line id="hour" x1="100" y1="100" x2="100" y2="50" stroke="#BE713A" strokeWidth="9" strokeLinecap="round" transform={`rotate(${(hours + minutes / 60) * 30} 100 100)`} />
                    )}

                    {/* Falls das Ergebnis falsch ist */}
                    {isResultCorrect === false && (
                        <>
                            <Line id="minute" x1="100" y1="100" x2="100" y2="40" stroke="#f16c62" strokeWidth="7" strokeLinecap="round" transform={`rotate(${resultTimeParts!.minutes * 6} 100 100)`} />
                            <Line id="hour" x1="100" y1="100" x2="100" y2="50" stroke="#ce1f13" strokeWidth="9" strokeLinecap="round" transform={`rotate(${(resultTimeParts!.hours + resultTimeParts!.minutes / 60) * 30} 100 100)`} />
                        </>
                    )}

                    {/* Mittelpunkt-Abdeckung */}
                    <Circle cx="100" cy="100" r="3" fill="#333" />
                </Svg>
            </View>
            {editable &&
                <View id="minutesContainer" style={styles.clockNavigationContainer}>
                    <Text style={styles.clockNavigationText}>Minuten</Text>
                    <TouchableOpacity onPress={minutesTurnRight}>
                        <Image source={turnRightButton} resizeMode="contain" style={styles.clockNavigationButton} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={minutesTurnLeft}>
                        <Image source={turnLeftButton} resizeMode="contain" style={styles.clockNavigationButton} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default AnalogWatch
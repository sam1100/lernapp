import { createStyles } from '@/assets/styles/styles';
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from "react-native";

export interface ProgressPart {
    start: number;
    width: number;
    colors: [string, string];
}

const ProgressBar = ({ progressParts, doneCount, totalCount }: { progressParts: ProgressPart[] | null; doneCount: number; totalCount: number }) => {
    const { colors: ColorScheme } = useTheme();

    const styles: ReturnType<typeof createStyles> = createStyles();

    return (
        <View id='progressContainer' style={styles.progressContainer}>
            <View id='progressBarContainer' style={styles.progressBarContainer}>
                <View id='progressBar' style={[styles.progressBar, styles.progressBarMathSubject]}>
                    {progressParts?.map((part, index) => (
                        <LinearGradient
                            key={index}
                            colors={part.colors}
                            style={[styles.progressFill, { left: `${part.start}%`, width: `${part.width}%` }]}
                        />))}
                </View>
                <Text style={styles.progressTextMathSubject}>{`${doneCount} von ${totalCount}`}</Text>
            </View>
        </View>
    );
};

export default ProgressBar;
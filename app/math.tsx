import { createStyles } from "@/assets/styles/styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, ImageBackground, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const workspaceImage = require('@/assets/images/workspace.png');


export default function MathSubject() {

    const { mathTheme } = useTheme();
    const styles = createStyles();

    return (
        <SafeAreaView style={styles.containerLayout} edges={[]}>
            <LinearGradient colors={mathTheme.gradients.header}>
                <View style={styles.headerSubject}>
                    <Image style={styles.subjectImage} resizeMode="contain" source={require('@/assets/images/mathe-button.png')} />
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.subjectSelectionContainer}>
                <ImageBackground source={workspaceImage} resizeMode="cover" style={{ flex: 1 }}>
                    <View style={[styles.workspace, styles.workspaceCentered]}>
                        <Link href="/math/multiplication" >
                            <Image source={require('@/assets/images/multiplication.png')} resizeMode="contain" style={styles.subjectButton} />
                        </Link>
                        <Link href="/math/division" >
                            <Image source={require('@/assets/images/division.png')} resizeMode="contain" style={styles.subjectButton} />
                        </Link>
                        <Link href="/math/addition" >
                            <Image source={require('@/assets/images/addition.png')} resizeMode="contain" style={styles.subjectButton} />
                        </Link>
                        <Link href="/math/subtraction" >
                            <Image source={require('@/assets/images/subtraction.png')} resizeMode="contain" style={styles.subjectButton} />
                        </Link>
                        <Link href="/math/addsubmixed" >
                            <Image source={require('@/assets/images/mixed1000.png')} resizeMode="contain" style={styles.subjectButton} />
                        </Link>
                        <Link href="/math/divisionremainder" >
                            <Image source={require('@/assets/images/divisionremainder.png')} resizeMode="contain" style={styles.subjectButton} />
                        </Link>

                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
}

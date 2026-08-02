import { StyleSheet } from "react-native";

const fontDefinitions = {
    sizeStandard: 16,
    sizeLarge: 24,
    fontFamilyFancy: 'whale',
    fontFamilyDigital: 'digital-7',
};

export const colorDefinitions = {
    correctAnswer: '#427e1a',
    correctAnswerBackground: 'rgba(34, 197, 94, 0.2)',
    wrongAnswer: '#C00000',
    wrongAnswerBackground: 'rgba(239, 68, 68, 0.2)',
    placeholderText: '#cc9979',
    redeemText: '#1e293b',
};

export const createStyles = () => {
    const styles = StyleSheet.create({
        containerLayout: {
            flex: 1,
            width: "100%",
            flexDirection: "column",
        },
        header: {
            height: 250,
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
            paddingLeft: 40,
            paddingRight: 20,
            paddingVertical: 32,
            paddingBottom: 24,
            borderBottomWidth: 2,
            borderBottomColor: '#30C3E4',
            gap: 20,
        },
        headerSubject: {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 20,
        },
        headerSubjectGradientBorder: {
            width: "100%",
            height: 2,
        },
        titleImage: {
            height: 180,
            aspectRatio: 400 / 455,
            boxShadow: "0 0 10px 10px rgba(102, 176, 211, 0.4)",
            transform: [{ rotate: "-10deg" }],
            borderRadius: 12,
            overflow: "hidden",
        },
        subjectSelectionContainer: {
            flex: 1,
        },
        subjectImage: {
            height: 75,
        },
        headerCoins: {
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
        },
        workspace: {
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            alignContent: "center",
            paddingTop: 50,
            gap: 15,
        },
        workspaceCentered: {
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 0,
        },
        horizontalContainer: {
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            marginTop: 0,
        },
        verticalContainer: {
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            marginTop: 10,
        },
        subjectWorkspace: {
            flex: 1,
            minHeight: "100%",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            alignContent: "center",
            overflow: "hidden",
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            marginTop: 30,
        },
        button: {
            width: 200,
            height: 75,
        },
        subjectButton: {
            marginTop: 0,
            marginBottom: 0,
            width: 200,
            height: 75
        },
        okNokButton: {
            marginTop: 50,
            marginBottom: 50,
            width: 120,
            height: 60,
        },
        collectButton: {
            marginTop: 14,
        },
        exerciseContainer: {
            marginTop: 0,
        },
        exercise: {
            paddingTop: 20,
            paddingBottom: 0,
            fontSize: 30,
            fontWeight: "bold",
            color: "#1e293b",
        },
        exerciseWrongAnswer: {
            color: colorDefinitions.wrongAnswer,
        },
        exerciseCorrectAnswer: {
            color: colorDefinitions.correctAnswer,
        },
        inputContainer: {
            marginTop: 20,
        },
        text: {
            fontSize: fontDefinitions.sizeStandard,
            fontFamily: fontDefinitions.fontFamilyFancy,
        },
        exerciseInput: {
            minWidth: 200,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: "#cccccc",
            marginRight: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontSize: 26,
            fontWeight: "bold",
            textAlign: "center",
        },
        exerciseInputMathSubject: {
            borderColor: "#BE7A4F",
            boxShadow: "0 0 6px 6px rgba(190, 122, 79, 0.2)",
        },
        emphasiseWordPart: {
            fontWeight: "bold",
            color: "#2f6d3a",
            textDecorationLine: "underline",
        },
        composedWordContainer: {
            flexDirection: "row",
            gap: 0,
        },
        progressContainer: {
            marginTop: 20,
            width: "95%",
        },
        progressBarContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
        },
        progressBar: {
            flex: 1,
            height: 20,
            overflow: "hidden",
            backgroundColor: "rgba(200,200,200,0.6)",
            borderRadius: 10,
        },
        progressFill: {
            position: "absolute",
            height: "100%",
        },
        progressText: {
            fontSize: fontDefinitions.sizeStandard,
            fontFamily: fontDefinitions.fontFamilyFancy,
            minWidth: 40,
            textAlign: "right",
            color: "#10b981",
        },
        progressTextMathSubject: {
            fontSize: fontDefinitions.sizeStandard,
            fontFamily: fontDefinitions.fontFamilyFancy,
            color: '#5f3419'
        },
        loadingContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        loadingText: {
            marginTop: 20,
            fontSize: fontDefinitions.sizeStandard,
            fontFamily: fontDefinitions.fontFamilyFancy,
            color: "#1e293b",
        },
        exerciseDoneContainer: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
        },
        exerciseDontText: {
            fontSize: 24,
            fontFamily: fontDefinitions.fontFamilyFancy,
            marginTop: 10,
        },
        collectRewardsText: {
            fontSize: 20,
            fontFamily: fontDefinitions.fontFamilyFancy,
            marginTop: 40,
        },
        rewardCoinImage: {
            width: 100,
            height: 100,
            marginVertical: 20,
        },
        rewardCoinsText: {
            fontSize: 36,
            fontFamily: fontDefinitions.fontFamilyFancy,
            color: "#7c3401",
        },

        watchNavigationContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
        },
        clockNavigationContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        clockNavigationButton: {
            width: 60,
            height: 50,
            marginTop: 10,
        },
        clockNavigationText: {
            fontFamily: fontDefinitions.fontFamilyFancy,
            fontSize: 16,
            color: "#333",
        },
        clockWrapper: {
            height: 150,
            flexGrow: 2,
        },


        analogWatchContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            gap: 0,
            paddingTop: 10,
            marginVertical: 10,
        },

        digitalWatchInput: {
            width: "100%",
            borderWidth: 2,
            borderRadius: 10,
            borderColor: "#bd8055",
            fontSize: 30,
            fontFamily: fontDefinitions.fontFamilyDigital,
            textAlign: "center",
            lineHeight: 30,
            alignSelf: "center",
        },
        digitalWatchInputDisabled: {
            backgroundColor: "rgba(189, 128, 85, 0.4)",
        },

        digitalWatchesContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            paddingVertical: 5,
        },

        digitalWatchElement: {
            flex: 1,
            flexGrow: 1,
            paddingHorizontal: 0,
        },
        digitalWatchAmPm: {
            fontSize: fontDefinitions.sizeStandard,
            fontFamily: fontDefinitions.fontFamilyFancy,
            textAlign: "left",
        },

        correctDigitalAnswer: {
            borderColor: colorDefinitions.correctAnswer,
            backgroundColor: colorDefinitions.correctAnswerBackground,
            borderWidth: 3,
        },
        wrongDigitalAnswer: {
            borderColor: colorDefinitions.wrongAnswer,
            backgroundColor: colorDefinitions.wrongAnswerBackground,
            borderWidth: 3,
        },

        watchExerciseAnswerCheckContainer: {
            width: "20%",
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "center",
        },

        coinContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 2,
        },
        coinText: {
            marginTop: 10,
            fontSize: 30,
            fontFamily: fontDefinitions.fontFamilyFancy,
            color: "#7c3401",
        },
        coinWrapper: {
            height: 80,
            width: 80,
        },
        coinBody: {
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
        },
        coin: {
            position: "absolute",
            backfaceVisibility: "hidden",
        },
        redeemListContainer: {
            flex: 1,
            width: '100%',
            paddingHorizontal: 50,
            paddingVertical: 50,
        },
        rewardRedeemIcon: {
            width: 60,
            height: 50,
            transform: [{ rotate: "0deg" }],
            overflow: "hidden",
        },
        redeemIcon: {
            width: 50,
            height: 40,
            transform: [{ rotate: "-10deg" }],
            overflow: "hidden",
        },
        redeemDescription: {
            textAlign: 'left',
            fontSize: fontDefinitions.sizeStandard,
            fontFamily: fontDefinitions.fontFamilyFancy,
            color: colorDefinitions.redeemText,
            fontWeight: "bold",
            includeFontPadding: false,
            lineHeight: fontDefinitions.sizeStandard + 2,
        },
        redeemCosts: {
            textAlign: 'left',
            fontSize: fontDefinitions.sizeStandard,
            fontFamily: fontDefinitions.fontFamilyFancy,
            color: colorDefinitions.redeemText,
            fontWeight: "bold",
            includeFontPadding: false,
            marginTop: 2,
            lineHeight: fontDefinitions.sizeStandard + 2,
        },
        redeemBackground: {
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            alignContent: "center",
            overflow: "hidden",
        }
    });

    return styles;
};
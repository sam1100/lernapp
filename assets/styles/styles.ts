import { StyleSheet } from "react-native";

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
            height: 120,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
            paddingVertical: 32,
            paddingBottom: 24,
            borderBottomWidth: 1,
            borderBottomColor: 'rgb(100,100,100)',
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
            paddingTop: 30,
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
        subjectWorkspace: {
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            alignContent: "center",
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
            marginTop: 50,
            marginBottom: 50,
            width: 200,
            height: 75,
        },
        okNokButton: {
            marginTop: 50,
            marginBottom: 50,
            width: 120,
            height: 60,
        },
        collectButton: {
            marginTop: 20,
        },
        exerciseContainer: {
            marginTop: 0,
        },
        exercise: {
            paddingTop: 20,
            paddingBottom: 0,
            fontSize: 30,
            fontWeight: "700",
            color: "#1e293b",
        },
        exerciseWrongAnswer: {
            color: "#C00000",
        },
        inputContainer: {
            marginTop: 20,
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
            marginTop: 30,
            width: "80%",
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
            backgroundColor: "#d5a47c",
            borderRadius: 10,
        },
        progressFill: {
            position: "absolute",
            height: "100%",
        },
        progressText: {
            fontSize: 16,
            fontWeight: "700",
            minWidth: 40,
            textAlign: "right",
            color: "#10b981",
        },
        progressTextMathSubject: {
            fontSize: 16,
            fontWeight: "bold",
            color: '#5f3419'
        },
        loadingContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        loadingText: {
            marginTop: 20,
            fontSize: 18,
            fontWeight: "500",
            color: "#1e293b",
        },
        exerciseDoneContainer: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
        },
        exerciseDontText: {
            fontSize: 20,
            marginTop: 10,
        },
        collectRewardsText: {
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 40,
        },
        rewardCoinImage: {
            width: 100,
            height: 100,
            marginVertical: 20,
        },
        rewardCoinsText: {
            fontSize: 30,
            fontWeight: "bold",
            color: "#7c3401",
        },

        watchNavigationContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 0,
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
            fontFamily: 'Comfortaa',
            fontSize: 16,
            fontWeight: "bold",
            color: "#333",
        },
        clockWrapper: {
            height: 200,
            flexGrow: 2,
        },
        digitalWatchInput: {
            minWidth: 150,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: "#cccccc",
            fontSize: 30,
            fontFamily: 'digital-7',
            textAlign: "center",
        },
        digitalWatchInputDisabled: {
            backgroundColor: "#f3f4f6",
        },

        digitalWatchesContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            padding: 0,
            margin: 0,
        },

        watchExceciseNavigationElement: {
            width: "20%",
            minHeight: 10,
            paddingHorizontal: 20,
        },
        watchExceciseInputElement: {
            flexGrow: 1,
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
            fontWeight: "bold",
            //            fontFamily: 'Whale I Tried',
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
    });

    return styles;
};
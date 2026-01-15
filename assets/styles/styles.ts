import { StyleSheet } from "react-native";

export const createStyles = () => {
    const styles = StyleSheet.create({
        containerLayout: {
            flex: 1,
            width: "100%",
            flexDirection: "column",
        },
        safeArea: {
            flex: 1,
        },
        header: {
            height: 250,
            width: "100%",
            alignItems: "flex-start",
            paddingHorizontal: 40,
            paddingVertical: 32,
            paddingBottom: 24,
            borderBottomWidth: 2,
            borderBottomColor: '#30C3E4',
        },
        headerSubject: {
            height: 150,
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
            height: "100%",
            aspectRatio: 400 / 455,
            boxShadow: "0 0 10px 10px rgba(102, 176, 211, 0.4)",
            transform: [{ rotate: "-10deg" }],
            borderRadius: 12,
            overflow: "hidden",
        },
        subjectImage: {
            width: "90%",
        },
        workspace: {
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            gap: 15,
        },
        workspaceHorizontal: {
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            marginTop: 20,
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
            justifyContent: "space-around",
            width: "100%",
            marginTop: 30,
        },
        subjectButton: {
            marginTop: 50,
            marginBottom: 50,
            width: 200,
            height: 75,
        },
        exerciseContainer: {
            flexDirection: "row",
            alignItems: "center",

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
        progressBarMathSubject: {
            backgroundColor: 'red   ',
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
    });

    return styles;
};
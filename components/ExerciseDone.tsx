import { createStyles } from '@/assets/styles/styles';
import { api } from '@/convex/_generated/api';
import { getCurrentTimestamp } from '@/utilities/timestamp';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from 'convex/react';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
const collectButton = require('@/assets/images/collect-rewards-buttons.png');
const coin = require('@/assets/images/coin_front.png');

const ExerciseDone = ({ correctAnswerCount, wrongAnswerCount, rewardCoins, reason, styles }: { correctAnswerCount: number, wrongAnswerCount: number, rewardCoins: number, reason: string, styles: ReturnType<typeof createStyles> }) => {

    const [rewards, setRewards] = React.useState<number | null>(null);

    const setRewardCoins = useMutation(api.coins.setRewardCoins);
    const rewardForSubject = useQuery(api.rewardsConfig.getRewardsForSubject, { reason, percentage: (correctAnswerCount / (correctAnswerCount + wrongAnswerCount)) * 100 });
    const navigation = useNavigation();

    const collectRewards = async () => {
        await setRewardCoins({
            amount: rewards!,
            date: getCurrentTimestamp(),
            reason: reason
        });

        //        console.log("Rewards collected:", rewards);
        navigation.goBack();
    }

    useEffect(() => {
        setRewards(rewardForSubject ?? null);
    }, [rewardForSubject]);

    //    console.log("Rewards to collect:", rewards);

    return (
        <View id='exerciseDoneContainer' style={styles.exerciseDoneContainer}>
            <View>
                <Text style={styles.exerciseDontText}>Geschafft! 🎉</Text>
                <Text style={styles.exerciseDontText}>{`Richtige Antworten: ${correctAnswerCount}`}</Text>
                <Text style={styles.exerciseDontText}>{`Falsche Antworten: ${wrongAnswerCount}`}</Text>
            </View>
            {rewards != null && rewards > 0 && (
                <Text style={styles.collectRewardsText}>Sammle deine Belohnungen ein:</Text>
            )}
            <Image source={coin} resizeMode="contain" style={styles.rewardCoinImage} />
            <Text style={styles.rewardCoinsText}>{rewards}</Text>
            {rewards != null && rewards > 0 && (
                <TouchableOpacity onPress={collectRewards}>
                    <Image source={collectButton} resizeMode="contain" style={[styles.button, styles.collectButton]} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default ExerciseDone
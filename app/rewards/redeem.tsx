import { createStyles } from "@/assets/styles/styles";
import IconCoinHeader from "@/components/IconCoinHeader";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { getCurrentTimestamp } from '@/utilities/timestamp';
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { Alert, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const workspaceImage = require('@/assets/images/redeem-background.png');

const owlIcon = require('@/assets/images/redeemrewards.png');
const redeemButton = require('@/assets/images/redeem.png');

type Coins = Doc<"coins">;

export default function Index() {
  const styles = createStyles();

  const setRewardCoins = useMutation(api.coins.setRewardCoins);

  const [rewardRedeems, setRewardRedeems] = useState<any[]>([]);
  const [amount, setAmount] = useState<Coins | null>(null);
  const [rewardIconEnumConfig, setRewardIconEnumConfig] = useState<any | null>(null);

  const coin = useQuery(api.coins.getAccountBalance);
  const rewardRedeemsList = useQuery(api.rewardsRedeem.getRewardsRedeems);

  async function redeemReward(rewardRedeem: any) {
    if (!amount || amount.total_amount < rewardRedeem.costs) {
      Alert.alert("Nicht genug Münzen", `Du hast nicht genügende Münzen, um diese Belohnung einzulösen.`);
      //      console.log("Not enough coins to redeem reward", rewardRedeem.costs, "coins for", rewardRedeem.description);
      return;
    } else {
      Alert.alert("Münzen einlösen", `Möchtest du ${rewardRedeem.costs} Münzen für ${rewardRedeem.description} einlösen?`, [
        {
          text: "Ja",
          onPress: async () => {
            //            await convex.mutation(api.rewardsRedeem.redeemReward, { rewardRedeemId: rewardRedeem._id });
            //            setAmount({ ...amount, total_amount: amount.total_amount - rewardRedeem.costs });
            console.log("Redeemed reward", rewardRedeem.costs, "coins for", rewardRedeem.description);
            await setRewardCoins({
              amount: rewardRedeem.costs * -1,
              date: getCurrentTimestamp(),
              reason: getEnumforRewardRedeem(rewardRedeem)
            });

          }
        },
        {
          text: "Nein",
          onPress: () => {
            console.log("Redemption cancelled for reward", rewardRedeem.costs, "coins for", rewardRedeem.description);
          },
          style: "cancel"
        }
      ]);
    }
  }

  useEffect(() => {
    setRewardRedeems(rewardRedeemsList || []);
    setAmount(coin ?? null);

    let rewardIconEnumConfigMap: Record<string, { icon: any; enum: string } | null> = {};
    if (rewardRedeemsList) {
      rewardRedeemsList.forEach((redeem) => {
        switch (redeem.icon) {
          case "Movie":
            rewardIconEnumConfigMap[redeem._id] = { icon: require('@/assets/images/movie.png'), enum: "SPENT_FILM" };
            break;
          case "BrawlPass":
            rewardIconEnumConfigMap[redeem._id] = { icon: require('@/assets/images/brawlPass.png'), enum: "BRAWL_PASS" };
            break;
          default:
            rewardIconEnumConfigMap[redeem._id] = { icon: null, enum: "UNDEFINED_REDEEM" };
        }
      });
    }
    setRewardIconEnumConfig(rewardIconEnumConfigMap);
  }, [coin, rewardRedeemsList]);

  function getIconforRewardRedeem(rewardRedeem: any) {
    return rewardIconEnumConfig && rewardIconEnumConfig[rewardRedeem._id] ? rewardIconEnumConfig[rewardRedeem._id].icon : null;
  }

  function getEnumforRewardRedeem(rewardRedeem: any) {
    return rewardIconEnumConfig && rewardIconEnumConfig[rewardRedeem._id] ? rewardIconEnumConfig[rewardRedeem._id].enum : null;
  }

  console.log("rewardRedeems", rewardRedeems);

  return (
    <SafeAreaView style={styles.containerLayout} edges={[]}>
      <IconCoinHeader icon={owlIcon} iconClickable={false} />
      <ScrollView contentContainerStyle={styles.subjectSelectionContainer}>
        <ImageBackground source={workspaceImage} resizeMode="cover" style={styles.redeemBackground}>
          <View style={styles.workspace}>
            <View style={styles.redeemListContainer}>
              {rewardRedeems.map((redeem) => (
                <View key={redeem._id} style={{ flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 0, borderBottomColor: '#e0e0e0', alignItems: 'center' }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image style={styles.rewardRedeemIcon} resizeMode="contain" source={getIconforRewardRedeem(redeem)} />
                  </View>
                  <View style={{ flex: 2, paddingLeft: 10, justifyContent: 'center' }}>
                    <Text style={styles.redeemDescription}>{redeem.description}</Text>
                    <Text style={styles.redeemCosts}>{redeem.costs} Münzen</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { redeemReward(redeem) }}><Image style={styles.redeemIcon} resizeMode="contain" source={redeemButton} /></TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

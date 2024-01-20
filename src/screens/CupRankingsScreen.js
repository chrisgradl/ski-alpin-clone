import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import CupRankingItem from "../components/CupRankingItem";

const data = require("../data/cup-rankings.json");

function CupRankingsScreen({ navigation, route }) {
  const [gender, setGender] = React.useState("female");

  const onPress = (cup) => {
    navigation.navigate("RankingsDetail", { cup });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        {data.map((cup) => (
          <CupRankingItem
            onPress={() => onPress(cup)}
            cup={cup}
            color={gender === "female" ? "orange" : "blue"}
          />
        ))}
      </ScrollView>
      <SegmentedButtons
        value={gender}
        onValueChange={setGender}
        buttons={[
          {
            value: "female",
            label: "DAMEN",
            checkedColor: "orange",
          },
          {
            value: "male",
            label: "HERREN",
            checkedColor: "blue",
          },
        ]}
      />
    </View>
  );
}

export default CupRankingsScreen;

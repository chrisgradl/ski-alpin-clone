import React from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import SiteHeader from "../components/SiteHeader";
import Tvthek from "../components/tvthekvideos";
import Stories from "../components/Stories";
import { useStories } from "../hooks/dataHooks";

const TvthekData = require("../data/tvthek-videos.json");

export default function HomeScreen() {
  const { data, isPending, error, refetch } = useStories();

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Error Loading Data: {error.message}</Text>
        <Button title="try again" onPress={refetch} />
      </View>
    );
  }

  if (!data) {
    return null;
  }


  return (
    <ScrollView>
      <SiteHeader storiesData={data} />
      <Tvthek TvthekData={TvthekData} />
      <Stories storiesData={data} />
    </ScrollView>
  );
}

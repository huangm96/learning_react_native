import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import LottieView from "lottie-react-native";
import axios from "axios";
const HomePage = ({ navigation }) => {
  const [breeds, setBreeds] = useState({});
  axios.get("https://dog.ceo/api/breeds/list/all").then(({ data }) => {
    const breedsObject = data.message;
    const breedKeys = Object.keys(breedsObject);
    const assembledBreedsObject = {};
    breedKeys.map(key => {
      if (breedsObject[key].length > 0) {
        breedsObject[key].forEach(subBreed => {
          assembledBreedsObject[key + "_" + subBreed] = key + "/" + subBreed;
        });
      } else {
        assembledBreedsObject[key] = key;
      }
    });
    setBreeds(assembledBreedsObject);
  });
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={{ flex: 1 }}>
        <LottieView
          source={require("../../image/doggie.json")}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
      </View>
      <View style={{ flex: 4, flexDirection: "row" }}>
        <FlatList
                  style={{ flex: 1 }}
                  keyExtractor={(item, index) => {
                      return 'dog-'+index
                  }}
          data={Object.keys(breeds)}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ flex: 1, padding: 10 }}
                onPress={() => {
                  navigation.navigate("DogPage", { breed: breeds[item] });
                }}
              >
                <Text>{breeds[item]}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

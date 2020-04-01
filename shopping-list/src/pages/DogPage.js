import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Image, Dimensions } from "react-native";
import axios from "axios";
import PlainText from "../components/PlainText";
const DogPage = ({ route, navigation }) => {
  const { width, height } = Dimensions.get("window");
    const [images, setImage] = useState([]);
    const [desc, setDesc]=useState()
  const breedName = route.params.breed;
  useEffect(() => {
    axios
      .get(`https://dog.ceo/api/breed/${breedName}/images`)
      .then(({ data }) => {
        setImage(data.message);
      });

       axios
         .get(
           `https://en.wikipedia.org/w/api.php?format=json&explaintext&prop=extracts&explaintext&exintro&action=query&list=search&srsearch=${breedName}%20dog`
         )
         .then((res) => {
             setDesc(res.data.query.search[0].snippet)
         });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => {
            return "image-" + index;
          }}
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={images}
          renderItem={item => {
            return (
              <View style={{ margin: 10 }}>
                <Image
                  source={{ uri: item.item }}
                  style={{ width: width - 20, height: height * 0.3 }}
                />
              </View>
            );
          }}
        />
      </View>
      <View style={{ flex: 1 ,padding:10}}>
              <PlainText text={desc}/>
      </View>
    </View>
  );
};
DogPage.options = ({ route, navigation }) => ({
    title: route.params.breed
})
export default DogPage;

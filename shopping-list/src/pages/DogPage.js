import React, { useState,useEffect } from "react";
import { Text } from "react-native";
import axios from "axios";
const DogPage = ({ breed }) => {
  const [image, setImage] = useState([]);
    const breedn = breed
    console.log(breedn)
    useEffect(() => {
      axios.get(`https://dog.ceo/api/breed/${breed}/images`).then(({ data }) => {
    setImage(data.message);
  });   
    },[])
 
    return <Text>{breed}</Text>;
};

export default DogPage;

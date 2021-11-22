import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";

import { getImages } from "../api/pexels";
import ImageList from "../components/ImageList";

const HomeScreen = ({ openSearch }) => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalResults, setTotalResults] = useState(null)

  const loadImages = async (searchTerm) => {
    const res = await getImages(searchTerm);
    setPhotos(res.data.photos);
    setTotalResults(res.data.total_results)
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleSearch = async () => {
      await loadImages(searchTerm)
  }

  return (
    <>
      {openSearch && (
        <View style={styles.searchContanier}>
          <Input
            leftIcon={{ type: "feather", name: "search", color: "white" }}
            leftIconContainerStyle={styles.searchLeftIcon}
            placeholder="Search a term"
            inputContainerStyle={styles.searchInput}
            style={styles.input}
            onChangeText={(value) => setSearchTerm(value)}
          />
          <Button title="Search" buttonStyle={styles.searchButton} onPress={() => handleSearch()} />
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.totalResultText}>Results: {totalResults}</Text>
        <ImageList photos={photos} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },
  totalResultText: {
    color: "#D0D0D0",
    textAlign: "right",
    width: "100%",
    marginTop: 20
  },
  searchContanier: {
    backgroundColor: "#0D0D0D",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 80,
    flex: 1 / 5,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#2c292c",
    borderBottomWidth: 0,
    paddingHorizontal: 4
    
  },
  input: {
    color: "#fff"
  },
  searchLeftIcon: {
    paddingStart: 10,
    marginRight: 7
  },
  searchButton: {
    backgroundColor: '#229783',
    marginBottom: 27
  }
});

export default HomeScreen;

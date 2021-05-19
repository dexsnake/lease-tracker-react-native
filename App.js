import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";

export default function App() {
  // Variables that calculate the max amount of miles that can be driven up until today
  const buyDate = new Date("October 28, 2019 12:00:00");
  const now = new Date();
  const days = Math.round((now - buyDate) / (1000 * 3600 * 24));
  const mpd = 32.87;
  const mileage = Math.round(days * mpd);

  // Setting the state for the input, available miles and a NaN error
  const [inputMiles, setInputMiles] = useState("");
  const [availableMiles, setAvailableMiles] = useState("");

  // If the enter key is pressed inside the input box, and there is a valid number, it will run the calculation, else it will throw an error
  const calculate = (e) => {
    if (inputMiles !== "") {
      const miles = mileage - inputMiles;
      setAvailableMiles(miles);
    } else {
      setAvailableMiles("");
    }
  };

  // Gives outputted numbers commas separators
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text style={styles.header}>Mileage Tracker</Text>
      </View>
      <View style={styles.mazdaContainer}>
        <Image
          source={require("./assets/mazda.png")}
          style={styles.mazdaImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.mileageInputContainer}>
        <TextInput
          keyboardType="number-pad"
          placeholder="Enter Mileage"
          value={inputMiles}
          onChangeText={(text) => setInputMiles(text)}
          onBlur={calculate}
          style={styles.mileageInput}
          returnKeyType="done"
        />
      </View>
      {availableMiles !== "" && (
        <View>
          {availableMiles > 0 ? (
            <View style={styles.outputContainer}>
              <Image
                source={require("./assets/check.png")}
                style={styles.outputImage}
                resizeMode="contain"
              />
              <Text style={styles.outputText}>
                You are {formatNumber(availableMiles)} miles under your target
              </Text>
            </View>
          ) : (
            <View style={styles.outputContainer}>
              <Image
                source={require("./assets/error.png")}
                style={styles.outputImage}
                resizeMode="contain"
              />
              <Text style={styles.outputText}>
                You are {formatNumber(Math.abs(availableMiles))} miles over your
                target
              </Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#002542",
    marginVertical: 40,
  },
  mazdaContainer: {
    width: "100%",
    alignItems: "center",
  },
  mazdaImage: { width: "80%", height: 160 },
  mileageInputContainer: {
    width: "100%",
    paddingHorizontal: 80,
    marginTop: 40,
  },
  mileageInput: {
    borderWidth: 1,
    borderColor: "#E0E1E4",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 24,
  },
  outputContainer: { alignItems: "center" },
  outputImage: { width: 100, height: 100, marginVertical: 20 },
  outputText: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    color: "#002542",
    paddingHorizontal: 30,
  },
});

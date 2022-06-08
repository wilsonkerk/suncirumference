import React, { useState, useEffect } from "react";
import { BigNumber } from "bignumber.js";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ActivityIndicator,
  TouchableHighlight,
  ScrollView,
} from "react-native";

// get data from this URL!
const url = "http://localhost:3000/api/pivalue";

const Separator = () => (
  <View style={{flexDirection: 'row', padding: 15}}>
    <View style={{backgroundColor: 'black', height: StyleSheet.hairlineWidth, flex: 1, alignSelf: 'center'}} />
    <View style={{backgroundColor: 'black', height: StyleSheet.hairlineWidth, flex: 1, alignSelf: 'center'}} />
</View>
);

const App = () => {
  // managing state with 'useState'
  const [isLoading, setLoading] = useState(true);
  const [piValue, setData] = useState(BigNumber(0));
  const [digit, setDigit] = useState(BigNumber(0));

  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(url)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        console.log(JSON.stringify(json));
        setData(json.value);
        setDigit(json.digit);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  }, []);

  // Also get call asynchronous function to update latest calculated pi value
  async function getDataAsync() {
    try {
      console.log('Function called')
      let response = await fetch(url);
      let json = await response.json();
      console.log(json.digit, json.value);
      setData(json.value);
      setDigit(json.digit);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* While fetching show the indicator, else show response*/}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View  style={styles.scrollView}>
           <ScrollView>
            <Text style={styles.contentText}>
              Number of Digit: {digit}{"\n"}{"\n"}
              PI Value = {piValue}{"\n"}
            </Text>
            </ScrollView>
        </View>
      )}
      <TouchableHighlight style ={styles.touchableHighlight}>
        <Button
          onPress={getDataAsync}  
          title="Get latest PI value and calculate sun circumference"
          color= "black"
          backgroundColor ="skyblue"
        />
        </TouchableHighlight> 
        <Separator />
          <View style={styles.scrollView}>
          <Text style={styles.title}>
            Sun Circumference: {calculateSunCircumference(piValue)}
            </Text>
          </View>
    </SafeAreaView>
  )
};

function calculateSunCircumference(piValue) {
  const diameterOfSun = BigNumber(1.391016*1000000) // 1.391016 million
  const SunCircumference = BigNumber(piValue) * diameterOfSun

  return SunCircumference + ' KM'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentText: {
    fontSize: 26,
    fontWeight: "200",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollView: {
    height: "70%",
    width: "95%",
  },
  touchableHighlight: {
    height: 40,
    width:400,
    borderRadius:10,
    backgroundColor : "skyblue",
    marginLeft :50,
    marginRight:50,
    marginTop :20
  }
});

export default App;
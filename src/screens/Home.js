import React, {Component} from 'react';  
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { 
  AdMobBanner, 
  AdMobInterstitial, 
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob'

import {Picker} from '@react-native-community/picker';



export default class Home extends Component {  
  constructor(props) {
    super(props);
    global.language = " ";
    this.state = {
     
    };
  }
  state = {
    fontsLoaded: false,
    language: null,
    
  };
  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });
  
  render() {  
    
    return (  
      <View style={styles.container}>
          <View
            style={{
              flex: 3,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/FLAGIN.png")}
              style={styles.image}
            />
          </View>

          <View
            style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={{ borderRadius: 10 }}
              onPress={() => this.props.navigation.navigate("Game")}
            >
              <Text style={styles.button}>PLAY</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Product-SansRegular",
                fontSize: 16,
                padding: 5,
                fontWeight: "700",
              }}
            >
              Stay Connected to the Internet!
            </Text>
          </View>
          <Picker
          
            selectedValue={global.language}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue) =>{
              this.setState({language: itemValue})
              global.language = itemValue
              console.log("global",global.language)
            }
              
            }>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Türkçe" value="tr" />
            <Picker.Item label="Français" value="fr" />
            <Picker.Item label="Deutsch" value="de" />
            <Picker.Item label="Español" value="es" />
            
          </Picker>
          
         

          <View style={styles.box}>
            <Image
              source={require("../assets/World-Flags-Digital-Paper-by-oldmarketdesigns-1.png")}
              style={styles.image1}
            />
          </View>
          <View style={{ flex: 1//admob banner
           }}>
              <AdMobBanner
              adSize="smartBannerPortrait"
              style={styles.bottomBanner}
              adUnitID="ca-app-pub-9243058106757495/1330961338" // Test ID, Replace with your-admob-unit-id
              setTestDeviceID="EMULATOR"
              didFailToReceiveAdWithError={this.bannerError}
            />
            
            
          </View>
        </View>
    );  
  }  
}  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
  },
  box: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
  },
  bottomBanner: {
    bottom: 0,
  },
  image: {
    flex: 0.5,
    resizeMode: "contain",
  },
  image1: {
    flex: 1,
    resizeMode: "center",
  },
  button: {
    fontFamily: "Product-SansRegular",
    fontSize: 16,
    padding: 10,
    marginTop: 10,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 5, //IOS
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2, // Android
  },
});
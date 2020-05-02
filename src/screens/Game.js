import React, { Component } from "react";
import {
  Image,
  StatusBar,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Platform } from "react-native";
import datas_t from "../lang/data_t";
import datas_e from "../lang/data_e";
import datas_f from "../lang/data_f";
import datas_s from "../lang/data_s";
import datas_g from "../lang/data_g";
import Swiper from "react-native-deck-swiper";
import { Transitioning, Transition } from "react-native-reanimated";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Overlay from "react-native-modal-overlay";
import { shuffle } from "lodash";
import CountDown from "react-native-countdown-component";
import { 
  AdMobBanner, 
  AdMobInterstitial, 
  PublisherBanner,
  AdMobRewarded,
  
} from 'react-native-admob';

const stackSize = 4;
const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
};


//console.disableYellowBox = true;
export default class Game extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleAlign: 'center',
    headerShown: null,
    headerTitle: () => (
      <Image
        resizeMode="contain"
        style={{
          width: 150,
          height: 36,
          alignSelf: "center",
        }}
        source={require("../assets/FLAGIN.png")}
      />
    ),
    //title:'FlagIn'
  });

  constructor(props) {
    super(props);
    global.kontrol = "1";
    global.correct=null;
    global.Rewarded=0;
    this.state = {
      data:null,
      count: 0,
      index: 0,
      fontsLoaded: false,
      timer: 10,
      running: true,
      cid: null,
      modalVisible: false,
      correct:null
    };
    AdMobRewarded.setAdUnitID('ca-app-pub-9243058106757495/8882842829');
  }
  



  componentDidMount() {
    //this._loadFontsAsync();

  
  
  }
  UNSAFE_componentWillUnmount() {
    AdMobRewarded.removeAllListeners();
    
  }

  UNSAFE_componentWillMount(){
    this.changeLanguage();
    AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
    AdMobRewarded.addEventListener('rewarded', reward =>{
      console.log('AdMobRewarded => rewarded', reward),
      //global.Rewarded=1;
      this.hideOverlay();
    }
  );
  AdMobRewarded.addEventListener('adLoaded', () =>
    console.log('AdMobRewarded => adLoaded'),
  );
  AdMobRewarded.addEventListener('adFailedToLoad', error =>
    console.log("asdasdas",error),
  );
  AdMobRewarded.addEventListener('adOpened', () =>
    console.log('AdMobRewarded => adOpened'),
  );
  AdMobRewarded.addEventListener('videoStarted', () =>{
    console.log('AdMobRewarded => videoStarted')
  }
    
  );
  AdMobRewarded.addEventListener('adClosed', () => {
    console.log('AdMobRewarded => adClosed');
  });
  AdMobRewarded.addEventListener('adLeftApplication', () =>
    console.log('AdMobRewarded => adLeftApplication'),
  );
  }



   
  showRewarded = async () => {
    try {
      
      await AdMobRewarded.requestAd()
     
      AdMobRewarded.showAd()
    } catch (e) {
      console.tron.log(e.message)
    }
  }


  changeLanguage(){
    console.log(global.language)
    switch(global.language) {
 
      case 'tr':
         this.state.data = shuffle(datas_t);
        break;
      
      case 'en':
         this.state.data = shuffle(datas_e);
        break;
 
      case 'de':
         this.state.data = shuffle(datas_g);
        break;
        
      case 'fr':
          this.state.data = shuffle(datas_f);
         break;

      case 'es':
          this.state.data = shuffle(datas_s);
         break;

      default:
         this.state.data = shuffle(datas_e);
        break;
    
      }
  }

  showOverlay() {
    this.setState({ modalVisible: true });
  }
  hideOverlay() {
    this.setState({ modalVisible: false });
  }



  onPress = () => {
    this.setState({ count: this.state.count + 1 });
    this.setState({ running: true });
    this.setState ({ cid: this.state.cid + " " });//DORGRUYSA TIMER BASA DON
    
  };
  clear = () => {
    this.setState({ count: (this.state.count = 0) });
  };
  bannerError = () => {
    console.log("banner ad not loading");
  };
  bannerAdReceived = () => {
    console.log("banner ad received");
  };

  render() {
   
      const ANIMATION_DURATION = 10;

      const transition = (
        <Transition.Sequence>
          <Transition.Out
            type="slide-bottom"
            durationMs={ANIMATION_DURATION}
            interpolation="easeIn"
          />
          <Transition.Together>
            <Transition.In type="fade" durationMs={ANIMATION_DURATION} />
            <Transition.In
              type="slide-bottom"
              durationMs={ANIMATION_DURATION}
              interpolation="easeOut"
            />
          </Transition.Together>
        </Transition.Sequence>
      );

      const swiperRef = React.createRef();
      const transitionRef = React.createRef();
      var degisken = "0";
      randomFunc = () => {
        //yazı tura fonksiyonu
        var RandomNumber = Math.floor(Math.random() * 2);
        console.log(RandomNumber);

        return RandomNumber;
      };

      SecimFunc = (index) => {
        degisken = randomFunc();
        global.correct = this.state.data[index].name;
        if (degisken == "1") {
          return this.state.data[index].name;
        } else {
          
          return chooseCountry(index);
        }
      };
      chooseCountry = (index) => {
        var newCountry = this.state.data[Math.floor(Math.random() * this.state.data.length)].name;
        while (newCountry == this.state.data[index].name) {
          newCountry = this.state.data[Math.floor(Math.random() * this.state.data.length)].name; //yanlış eşleşene kadar değiştir.
        }
       
        return newCountry;
      };

      onSwiped = () => {
        transitionRef.current.animateNextTransition();
        this.setState({ index: (this.state.index + 1) % this.state.data.length });
        
      };

      sayacArtir = () => {
        if (degisken == "1") {
          console.log("doğrusayacartır",this.state.index)
          return this.onPress();
        } else {
          this.setState({ running: false });
          return this.showOverlay();
        }
      };
      carpiArtır = () => {
        if (degisken == "0") {
          return this.onPress();
        } else {
          this.setState({ running: false });
          return this.showOverlay();
        }
      };

      Card = ({ card }) => {
        console.log(card.name);
        global.correct=card.name;
        
        return (
          <View style={styles.card}>
            
            <Image
              source={{
                uri:
                  "https://assets.thebasetrip.com/api/v2/countries/flags/" +
                  card.slug +
                  ".png",
              }}
              style={styles.cardImage}
            />
          </View>
        );
        
      };

      CardDetails = ({ index }) => (
        <View key={this.state.data[index].id} style={{ alignItems: "center" }}>
          <Text style={styles.countrycolor}>{SecimFunc(index)}</Text>
        </View>
      );

      OverlayButton = () => {
        if (global.kontrol == "1") {
          global.kontrol = "0";
          return (
            <TouchableOpacity
              onPress={() => {
                
                this.showRewarded();
                //this.hideOverlay();
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontFamily: "Product-SansRegular",
                }}
              >
                ONE MORE CHANCE
              </Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <Text
              style={{
                fontSize: 24,
                textAlign: "center",
                fontFamily: "Product-SansRegular",
              }}
            >
              OOPS!
            </Text>
          );
        }
      };

      return (
        <SafeAreaView style={styles.container}>
          
          <View
            style={styles.scoreHeader}
          >
            <View style={{ flex: 1.6, alignItems: "flex-end" }}>
              <Text style={styles.heading}>
                Score 
              </Text>
            </View>
            <View style={{ flex: 1,justifyContent:'center',height:'100%', alignItems: "center"}}>
              
              <CountDown
                id={this.state.cid}
                until={this.state.timer}
                onFinish={() => {
                  this.showOverlay();
                  
                  }}
                timeToShow={["S"]}
                timeLabels={{s: null}}
                digitStyle={{ backgroundColor: "#f8f8ff" }}
                size={20}
                running={this.state.running}
              />
            </View>
          </View>
          <View style={styles.counterContainer}>
          <Text style={styles.price}>{this.state.count}</Text>
          </View>

          <StatusBar hidden={false} />
          <View style={styles.swiperContainer}>
          
            <Swiper
              useViewOverflow={Platform.OS === "ios"}
              ref={swiperRef}
              cards={this.state.data}
              cardIndex={this.state.index}
              renderCard={(card) => <Card card={card} />}
              infinite
              backgroundColor={"transparent"}
              onSwipedLeft={() => {
                carpiArtır();
                onSwiped();
              }}
              onSwipedRight={() => {
                sayacArtir();
                onSwiped();
              }}
              //onSwiped={this.state.onSwiped}
              //onTapCard={() => swiperRef.current.swipeLeft()}
              cardVerticalMargin={0}
              stackSize={stackSize}
              stackScale={10}
              stackSeparation={10}
              animateOverlayLabelsOpacity
              animateCardOpacity
              disableTopSwipe
              disableBottomSwipe
              overlayLabels={{
                left: {
                  title: "FALSE",
                  style: {
                    label: {
                      backgroundColor: colors.red,
                      borderColor: colors.red,
                      color: colors.white,
                      borderWidth: 1,
                      fontSize: 24,
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      marginTop: 20,
                      marginLeft: -20,
                    },
                  },
                },
                right: {
                  title: "TRUE",
                  style: {
                    label: {
                      backgroundColor: colors.blue,
                      borderColor: colors.blue,
                      color: colors.white,
                      borderWidth: 1,
                      fontSize: 24,
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      marginTop: 20,
                      marginLeft: 20,
                    },
                  },
                },
              }}
            />
            
          </View>
          
          <View style={styles.bottomContainer}>
            
            <Transitioning.View
              ref={transitionRef}
              transition={transition}
              style={styles.bottomContainerMeta}
              
            >
              <CardDetails index={this.state.index} />
            </Transitioning.View>
            <View style={styles.bottomContainerButtons}>
              <MaterialCommunityIcons.Button
                name="close-circle"
                size={70}
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.3}
                color={colors.red}
                onPress={() => {
                  swiperRef.current.swipeLeft();
                  //carpiArtır();
                }}
              />
              <MaterialCommunityIcons.Button
                name="checkbox-marked-circle"
                size={70}
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.3}
                color={colors.blue}
                onPress={() => {
                  swiperRef.current.swipeRight();
                  //sayacArtir();
                }}
              />
              
            </View>
          </View>
          <View style={styles.bannerSide}>
          <AdMobBanner
              adSize="smartBannerPortrait"
              style={styles.bottomBanner}
              adUnitID="ca-app-pub-9243058106757495/2508311634" // Test ID, Replace with your-admob-unit-id
              setTestDeviceID="EMULATOR"
              didFailToReceiveAdWithError={this.bannerError}
            />
          </View>
         
          <Overlay
            visible={this.state.modalVisible}
            //closeOnTouchOutside
            animationType="zoomIn"
            containerStyle={{ backgroundColor: "rgba(37, 8, 10, 0.78)" }}
            childrenWrapperStyle={{
              backgroundColor: "#eee",
              height: "40%",
              borderRadius: 30,
            }}
          >
            <View style={{ alignItems: "center", height: "30%" }}>
              <Text style={[styles.text, styles.heading]}>
                Score: {this.state.count}
              </Text>
              <Text
                      style={{
                        fontSize: 24,
                        textAlign: "center",
                        fontFamily: "Product-SansRegular",
                        color:"#32cd32"
                      }}
                    >
                      Answer: {global.correct}
                    </Text>
            </View>

            <View style={styles.elementcontainer}></View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.touchable}>
                <View
                  style={{
                    width: 150,
                    height: 100,
                    backgroundColor: "white",
                    justifyContent: "center",
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Home");
                      this.clear;
                      this.hideOverlay();
                      global.kontrol = "1";
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        textAlign: "center",
                        fontFamily: "Product-SansRegular",
                      }}
                    >
                      END GAME
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.touchable}>
                <View
                  style={{
                    width: 150,
                    height: 100,
                    backgroundColor: "powderblue",
                    justifyContent: "center",
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <OverlayButton />
                </View>
              </View>
            </View>
           
          </Overlay>
        </SafeAreaView>
      );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
  },
  scoreHeader:{
    alignItems: "center",
    flexDirection: "row",
    flex:1,
  },
  counterContainer:{alignItems:"center",justifyContent:"center",flex:0.7},
  swiperContainer: {
    flex:6,
  },
  bottomContainer: {
    flex:3,
    justifyContent: "space-evenly",
  },
  bannerSide:{
    flex:1
  },
  touchable: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBanner: {
    bottom: 0,
  },
  bottomContainerMeta: {
    alignContent: "flex-end",
    alignItems: "center",
    flex:1,
  },
  bottomContainerButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex:2,
  },
  cardImage: {
    width: "55%",
    flex: 1,
    resizeMode: "contain",
  },
  card: {
    width:'100%',
    height:'45%',
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    
    alignItems: "center",
    backgroundColor: "#e6e6fa",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  text: {},
  heading: {
    fontSize: 32,
    color: colors.blue,
    fontFamily: "Product-SansRegular",
    
  },
  price: { color: colors.red, fontSize: 32, fontWeight: "500",},
  countrycolor: {
    fontSize: 32,
    color: colors.black,
    textAlign:'center',
    fontFamily:"Product-SansRegular"
  },
  elementcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});





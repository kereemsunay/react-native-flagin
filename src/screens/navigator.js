import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./Home";
import Game from "./Game";

const screens = {
  Home: {
    screen: Home
  },
  
  Game: {
    screen: Game,
  }
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

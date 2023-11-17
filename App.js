import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NowPlaying from "./NowPlaying";
import MyPurchase from "./MyPurchase";
import BuyTicket from "./BuyTicket";
import MovieDetail from "./MovieDetail";
import SignInScreen from './SignInScreen';
import SignOut from "./SignOut";
import Home from "./Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Movie Detail" component={MovieDetail} />
        <Stack.Screen name="Buy Ticket" component={BuyTicket} />
        <Stack.Screen name="Now Playing" component={NowPlaying} />
        <Stack.Screen name="My Purchase" component={MyPurchase} />
        <Stack.Screen name="Signout" component={SignOut} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



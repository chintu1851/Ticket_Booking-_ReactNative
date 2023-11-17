import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Configure/Firebaseconfig";
import NowPlaying from "./NowPlaying";
import MyPurchase from "./MyPurchase";
import Icon from "react-native-vector-icons/FontAwesome";
import SignOut from "./SignOut";

const Tab = createBottomTabNavigator();

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginuser, isLoginueser] = useState(false);

  useEffect(() => {
    //listener for any changes in the authentication status
    const listener = onAuthStateChanged(auth, (userFromFireAuth) => {
      if (userFromFireAuth) {
        isLoginueser(true)
        console.log(`userFromFireAuth : ${JSON.stringify(userFromFireAuth)}`);
        setLoggedInUser(userFromFireAuth);
      } else {
        isLoginueser(false)
        console.error(`There is no user signed in`);
        setLoggedInUser(null);
      }
    });
    return listener;
  }, []);

  return (
    <Tab.Navigator screenOptions={({route}) => ({
      "tabBarIcon": ( {focused, color, size} ) => {
          let iconName;

          if (route.name === "Now Playing"){
              iconName = focused ? 'list' : 'list';
          }else if (route.name === "My Purchase"){
              iconName = focused ? 'ticket' : 'ticket';
          }
          else if (route.name === "Signout"){
            iconName = focused ? 'user' : 'user';
        }

          return <Icon name={iconName} size={size} color={color}/>;

      }
  })}>
      <Tab.Screen name="Now Playing" component={NowPlaying} />
      <Tab.Screen name="My Purchase" 
        component={MyPurchase}
        options={{ user: loggedInUser }} />
        { loginuser &&
          <Tab.Screen name="Signout" component={SignOut} />
          
        }
    </Tab.Navigator>
  );
}

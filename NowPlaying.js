import { View, StyleSheet,Text,FlatList,Pressable, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { auth, db } from "./Configure/Firebaseconfig";
import {collection,query,getDocs,} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// 60b585beafa7206f4e33f66c158898d8

const ItemDivider = () => {
    return (
        <View style={{height: 1,width: "100%", backgroundColor: "#888"}}/>
    )
}

const NowPlaying = ({navigation}) => {

    const [myPlaying,setMoviesFromAPI] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=60b585beafa7206f4e33f66c158898d8&language=en-US&page=1&region=CA")
        .then((response) => response.json())
        .then((json) => {
            setMoviesFromAPI(json.results)
        })
        .catch((error) => {
            console.error(error);
        });
        }, [])
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
    const goToNextScreen = (movieDetail) =>{
        console.log(`${movieDetail.title}`)
        navigation.navigate("Movie Detail",{movie:movieDetail})
    }

    const renderItem = ({ item }) => {
        return (
          <TouchableOpacity onPress={() => goToNextScreen(item)}>
            <View style={styles.listcontainer}>
                <Text style={styles.listtitle}>{ item.title}</Text>
                <Text style ={styles.releasedate}>Release Date : {item.release_date}</Text>
            </View>
          </TouchableOpacity>
        );
      };

    return(
        <View>
            <FlatList
                data={myPlaying}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ItemDivider}
                contentContainerStyle={{paddingTop: 10, paddingBottom: 10}}
            />
        </View>
    );
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  releaseDateText: {
    color: "#555",
    fontSize: 16,
  },
  listtitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  releasedate: {
    fontSize: 19,
  },
  listcontainer: {
    backgroundColor: 'ghostwhite',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
 },
 
})
export default NowPlaying;
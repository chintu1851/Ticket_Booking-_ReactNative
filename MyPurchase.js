import React, { useState, useEffect } from "react";
import {View, Text,FlatList,StyleSheet, Pressable,Image} from "react-native";
import { auth, db } from "./Configure/Firebaseconfig";
import {collection,query,getDocs,} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const MyPurchase = ({ navigation, route }) => {
  const movie = route.params
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [movielist, setMovielist] = useState([]);
  const [loginuser, isLoginueser] = useState(false);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (userFromFireAuth) => {
      if (userFromFireAuth) {
        isLoginueser(true);
        console.log(`userFromFireAuth : ${JSON.stringify(userFromFireAuth)}`);
        setLoggedInUser(userFromFireAuth);
        onGetmovietickets();
      } else {
        isLoginueser(false);
        setLoggedInUser(null);
        console.error(`There is no user signed in`);
      }
    });
    return listener;
  });
const onLogin = () =>{
    navigation.navigate('Sign In',{screen:"My Purchase"})
}
  const onGetmovietickets = async () => {
    try {
      console.log("trying to fetch documents from collection");
      if (loggedInUser) {
        const q = query(collection(db, "movietickets", loggedInUser.uid, "ticketlist"));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs;
        setMovielist(documents);
      } else {
        setMovielist([]);
      }
    } catch (err) {
      console.error(`Error while getting all documents from collection : ${err}`);
      setMovielist([]);
    }
  };

  const renderMovielist = ({ item }) => (
    <View style={styles.movieContainer}>
      <View style={styles.movieContainer}>
       <Image
        style={styles.ticketlogo}
        source={{
          uri:'data:image/png;base64,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'
        }}
      /></View>
      <View>
      <Text style={styles.movieTitle}> Title: {item.data().movieName}</Text>
      <Text style={styles.movieticket}> Number of Tickets: {item.data().numofTickets}
      </Text>
      <Text style={styles.movieprice}> Price: {item.data().total}</Text>
      </View>
  </View>
  );

  return (
   <View>

     { loginuser &&
     <View>
        <View style={styles.container}></View>
        <FlatList
            data={movielist}
            renderItem={renderMovielist}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
        />
        </View>
     }
     { !loginuser &&
      <View>
          <Text style={styles.titlelog}>Please Login to see the history</Text>
          <Pressable onPress={()=>onLogin()} style={[styles.buttonStyle]}>
                <Text style={styles.buttonTextStyle}>Login</Text>
            </Pressable>
      </View>
     }
    </View>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  ticketlogo: {
    width: 50,
    height: 60,
  },
  titlelog:{
    fontSize: 28,
    color: 'chocolate',
    fontStyle: 'normal',
    fontWeight : 'bold',
    alignContent:'center',
    textAlign:'center',
    marginTop:20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 150,
  },
  movieContainer: {
  flexDirection: 'row',
  backgroundColor: 'ghostwhite',
  padding: 7,
  marginTop: 13,
  borderRadius: 5,
  },
  movieTitle: {
    fontSize: 23,
    fontWeight: 800,
    marginBottom: 5,
  },
  movieticket: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 5,
  },
  movieprice: {
    fontSize: 18,
    fontWeight: 400,
    marginBottom: 5,
    color:'blue'
  },
  buttonStyle: {
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width:230,
    padding: 12,
    backgroundColor:'darkcyan',
    marginTop:10,
    marginBottom: 5,
    marginLeft:90,
    textAlign:'center',
  },
  buttonTextStyle: {
    fontSize:20,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }, 
});

export default MyPurchase;
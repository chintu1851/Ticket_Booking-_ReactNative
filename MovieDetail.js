import { View, Text, Pressable,Image, LogBox } from "react-native";
import { StyleSheet} from "react-native";
import { useState,useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Configure/Firebaseconfig";
import Home from "./Home";
import { ScrollView } from "react-native-gesture-handler";

const MovieDetail = ({navigation, route}) => {

    const movie = route.params
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loginuser, isLoginueser] = useState(false)
    useEffect( () => {
        //listener for any changes in the authentication status
        const listener = onAuthStateChanged(auth, (userFromFireAuth) => {
            if (userFromFireAuth){
                isLoginueser(false)
                console.log(`userFromFireAuth : ${JSON.stringify(userFromFireAuth.uid)}`);
                setLoggedInUser(userFromFireAuth);
            }else{
                isLoginueser(true)
                setLoggedInUser(null);
                console.error(`There is no user signed in`);
               
            }
        });
        return listener;
    }, []);

    const onBook = () =>{
        console.log(route.params)
        navigation.navigate('Buy Ticket',{movie:route.params.movie,user:route.params.userName})
    }
    const onLogin = () =>{
        navigation.navigate('Sign In', {movie:route.params.movie,screen:"MovieDetail"})
    }
    const onSignout = () =>{
        navigation.navigate('Signout')
    }
    return(
        <ScrollView>
        <View>
            <Image style={styles.imagelogo}
            source={{uri: `https://image.tmdb.org/t/p/w500${route.params.movie.poster_path}`,}}
            resizeMode="contain"
            />
            <Text style ={styles.titleofvideo}>{route.params.movie.title}</Text>
            <Text style = {styles.releasedate}>{route.params.movie.release_date}</Text>
            <Text style = {styles.ratting}>{route.params.movie.vote_average}%⭐</Text>
            <Text style = {styles.descr}>{route.params.movie.overview}</Text>

            <Pressable onPress={()=>onBook()} style={[styles.buttonStyle]}>
                <Text style={styles.buttonTextStyle}>Buy Tickets</Text>
            </Pressable>
            { loginuser &&
            <Pressable onPress={()=>onLogin()} style={[styles.buttonStyle]}>
                <Text style={styles.buttonTextStyle}>Login</Text>
            </Pressable>
            }
            { !loginuser &&
             <Pressable onPress={()=>onSignout()} style={[styles.buttonStyle]}>
                <Text style={styles.buttonTextStyle}>SignOut</Text>
            </Pressable>
            }
        </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
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
    imagelogo:{
        width: '100%',
        height: 450,
        borderRadius: 1,
    },
    titleofvideo:{
        fontSize: 25,
        fontStyle: 'normal',
        fontWeight : 'bold',
        textAlign:'left',
        marginLeft: 10,
        marginTop: 10,
    },
    releasedate:{
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight : 'normal',
        textAlign:'left',
        marginLeft: 10,
        marginTop: 5,
    },
    ratting:{
        fontSize: 20,
        fontStyle:'italic',
        fontWeight:'700',
        textAlign:'left',
        marginTop: -57,
        marginLeft:350,
    },
    descr:{
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight : 'normal',
        textAlign:'left',
        marginTop:40,
        marginLeft: 10,
    }
});
export default MovieDetail;
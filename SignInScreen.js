import { useState } from "react";
import { TextInput, View, StyleSheet, Button, Alert, Text, Pressable } from "react-native";
import { auth,db } from "./Configure/Firebaseconfig";
import { collection, getDocs, where, query,addDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignInScreen = ({navigation, route}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onCreateAccountPressed = async() => {
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, username, password);
            console.log(`account created successfully : ${JSON.stringify(userCredentials)}`);
            console.log(`account created successfully : ${JSON.stringify(userCredentials.user.email)}`);
            const collectionRef = collection(db, "users_employees");
            const filter = where("email", "==", username);
            const q = query(collectionRef, filter);
            const querySnapshot = await getDocs(q);
            const documents = querySnapshot.docs;
            
            console.log(`Number of documents received : ${documents.length}`);

            if (documents.length > 0){
                for(let i = 0; i < documents.length; i++){
                    console.log(`doc ID : ${documents[i].id}`);
                    console.log(`doc data : ${JSON.stringify(documents[i].data())}`);
                }

                navigation.navigate("Home", {loggedInUserDocID: documents[0].id});
                console.log(documents[0].id)
            }else{
                console.log(`Successfully Sign UP`);
            }
        }catch(err){
            Alert.alert(`Error occurred : ${err.message}`);
        }    
    }
    const onSignInClicked = async() => {
        try{
            const userCredentials = await signInWithEmailAndPassword(auth, username, password);
            console.log(`Login successfully : ${JSON.stringify(userCredentials.user.email)}`);

            if(route.params.screen=="MovieDetail"){
                navigation.navigate("Movie Detail",{movie:route.params.movie,userName:username});
            }
            else{
                navigation.navigate("My Purchase");
            }
        }catch(err){
            Alert.alert(`Invalid username/password : ${err.message}`);
        }
    }
    return(
        <View style={styles.sectionContainer}>
        <Text style={styles.textStyle}>User Login</Text>
            <TextInput 
                style={styles.inputStyle}
                placeholder="Email Address"
                textContentType="emailAddress"
                autoCapitalize="none"
                returnKeyType="next"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput 
                style={styles.inputStyle}
                placeholder="Enter password"
                textContentType="password"
                autoCapitalize="none"
                returnKeyType="next"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <Pressable style={styles.buttonStyle} onPress={onSignInClicked}>
                <Text style={styles.buttonTextStyle}>Sign In</Text>
            </Pressable>

            <Pressable style={styles.buttonStyle} onPress={onCreateAccountPressed}>
                <Text style={styles.buttonTextStyle}>SignUp</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
  
    inputStyle: {
        width: '90%',
        height: 50,
        marginVertical: 10,
        padding: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: 'gray',
        fontSize: 18,
        marginLeft:18,
        marginTop:30,
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
        marginTop:13,
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
      textStyle : {
        fontSize: 30,
        color: 'chocolate',
        fontStyle: 'normal',
        fontWeight : 'bold',
        alignContent:'center',
        textAlign:'center',
        marginTop:20,
    },
});

export default SignInScreen;
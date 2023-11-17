import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { StackActions } from '@react-navigation/native';
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Configure/Firebaseconfig";


const SignOut = ({navigation}) => {
        const onLogoutPressed = async() => {
        try{
            await signOut(auth);
            navigation.dispatch(StackActions.popToTop());

        }catch(err){
            Alert.alert(`Error occurred : ${err.message}`);
        }
    }
    return(
        <View>
            <Text style={styles.signouttext}> Are You Sure Want to SignOut?</Text>
            <Pressable style={styles.buttonStyle} onPress={onLogoutPressed}>
                <Text style={styles.buttonTextStyle}>SignOut</Text>
            </Pressable>
        </View>
    );

}
const styles = StyleSheet.create({
    signouttext:{
        verticalAlign:'middle',
        fontSize: 25,
        fontStyle: 'normal',
        fontWeight : 'bold',
        textAlign:'left',
        marginTop:280,
        margin:10,
       textAlign:'center',
       color:'chocolate',

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
export default SignOut;
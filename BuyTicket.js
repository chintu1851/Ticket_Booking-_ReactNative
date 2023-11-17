import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, TextInput, Pressable, Alert} from "react-native";
import { auth,db } from "./Configure/Firebaseconfig";
import { collection, addDoc,doc } from "firebase/firestore";
import {StackActions} from '@react-navigation/native';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ScrollView } from "react-native-gesture-handler";

const BuyTicket = ({navigation , route}) => {

    const [name,username] = useState('')
    const [email,userEmail] = useState(route.params.user)
    const [ticket, onTicketchange] = useState(0)
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loginuser, isLoginueser] = useState(false)
    const [price, setPrice] = useState(12)
    const [movieid,movieId] = useState(route.params.movie.id)
    const [moviename,movieName] = useState(route.params.movie.title)
    const [total,totalPrice] = useState(0.0)
    const [subtotal,setsubtotal] = useState(0.0)
    const [tickettax,settax] = useState(0.0)
    const [id, storeId] = useState('')
    const [purchase,onpurchase] = useState(true)

    useEffect( () => {
        //listener for any changes in the authentication status
      
        const listener = onAuthStateChanged(auth, (userFromFireAuth) => {
            if (userFromFireAuth){
                isLoginueser(true)
                console.log(`userFromFireAuth : ${JSON.stringify(userFromFireAuth)}`);
                console.log(`this is firebase email ${JSON.stringify(userFromFireAuth.email)}`)
                userEmail(userFromFireAuth.email)
                setLoggedInUser(userFromFireAuth);
                storeId(userFromFireAuth.uid)
            }else{
                isLoginueser(false)
                console.error(`There is no user signed in`);
                setLoggedInUser(null);
            }
        });
        return listener;
    }, []);
    useEffect(()=>{
        if(loggedInUser){
        if(ticket>0){
            const calculateprice = ticket * 12;
            setsubtotal(calculateprice.toFixed(2))
            const tax = calculateprice * 0.13;
            settax(tax.toFixed(2))
            const ftotal = calculateprice + tax;
            totalPrice(ftotal.toFixed(2));
            onpurchase(true)
        }
    
        else{
            onpurchase(false)
        }
    }
    else{
        onpurchase(false)
    }
    })
    const onPlus = () =>{
        onTicketchange(ticket+ 1)
    }
    
    const onLess = () =>{
        onTicketchange(ticket-1)
    }
    const onLogin = () =>{
        navigation.navigate('Sign In', route.params.movie)
    }
    const onSignout = () =>{
        navigation.navigate('Signout')
    }
    const onConfirmpurchase = async () => {
        try {
          const calculateprice = ticket * 12;
          setsubtotal(calculateprice.toFixed(2))
          const tax = calculateprice * 0.13;
          settax(tax.toFixed(2))
          const ftotal = calculateprice + tax;
          totalPrice(ftotal.toFixed(2));

          if (loggedInUser) {
            if(ticket>0){
                if(name.length === 0){
                    Alert.alert('Alert Title', 'Please Enter Name', [
                        {text: 'OK'}
                    ]);
                }
                else{
                const usertoInsert = {
                movieId: movieid,
                movieName: moviename,
                nameOnPurchase: name,
                numofTickets: ticket,
                total: parseFloat(total),
                userId:id
            };
        
                const subcollection = collection(db,"movietickets",loggedInUser.uid, "ticketlist");
                const insertedDoc = await addDoc(subcollection, usertoInsert);
                console.log(`movietickets added successfully : ${insertedDoc.id}`);
                console.log(`uid of user: ${loggedInUser.uid}`)

                Alert.alert('Alert Title', 'Ticket purchase confirmed', [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate('Home');
                          },
                    }
                ]);
            }
            }
            else{
                Alert.alert('Alert Title', 'Please, purchase atleast a ticket', [
                    {
                      text: 'Cancel',style: 'cancel'
                    },
                    {text: 'OK'}
                ]);
            }

           
          }
        } catch (err) {
          console.error(`Error while saving document to collection : ${err}`);
        }
      };
      
    useEffect(()=>{
        console.log(`this is email ${route.params.user}`)
        console.log(`buy screen ${route.params.movie.title}`)
        console.log(`movie id is ${route.params.movie.id}`)
    })

    return(
        <ScrollView>
        <View>
            { !loginuser &&
                <View>
                    <Text style={styles.titleofvideo}>Please Login to Book a Ticket</Text>
                    <Pressable onPress={()=>onLogin()} style={[styles.buttonStyle]}>
                    <Text style={styles.buttonTextStyle}>Login</Text>
                    </Pressable>
                    
                </View>
            }
            { loginuser && 
                <View>
                    <Text style={styles.titleofvideo}>Buy Ticket</Text> 
                    <Text style={styles.movietitle}>{route.params.movie.title}</Text>
                    <TextInput 
                        style={styles.input2}
                        placeholder="Enter Email"
                        keyboardType = "ascii-capable"
                        keyboardAppearance="dark"
                        returnKeyType="next"
                        value={email}
                        onChangeText={userEmail}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Enter Name"
                        keyboardType = "ascii-capable"
                        keyboardAppearance="dark"
                        returnKeyType="next"
                        value={name}
                        onChangeText={username}
                    />

                     <Text style={styles.tickets}>Number of Tickets:</Text> 
                    <View style={styles.counter}>
                    <Pressable onPress={onLess}><Text style = {styles.minus}>-</Text></Pressable>
                        <Text style={styles.count}>{ticket}</Text>
                    <Pressable onPress={onPlus}><Text style ={styles.plus}>+</Text></Pressable>
                       
                    </View>
                    <Pressable onPress={()=>onConfirmpurchase()} style={[styles.buttonStyle]}>
                        <Text style={styles.buttonTextStyle}>Purchase</Text>
                    </Pressable>
                    <Pressable onPress={()=>onSignout()} style={[styles.buttonStyle]}>
                        <Text style={styles.buttonTextStyle}>SignOut</Text>
                    </Pressable>
                </View>
            }
            { purchase &&
            <View style={styles.calview}>
                <Text style={styles.order}>Order Summary</Text>
                <Text style={styles.output}>{route.params.movie.title}</Text>
                <Text style={styles.output}>Number of tickets: ${ticket}</Text>
                <Text style={styles.output}>Subtotal:{subtotal}</Text>
                <Text style={styles.output}>Tax:{tickettax}</Text>
                <Text style={styles.output}>Total:{total}</Text>
            </View>
            }
        </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    
    input: {
        width: '90%',
        height: 50,
        marginVertical: 10,
        padding: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: 'gray',
        fontSize: 18,
        marginLeft:18,
        marginTop:10,
    },
    input2: {
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
    output:{
        fontSize: 20,
        color: 'black',
        fontStyle: 'normal',
        fontWeight : 'bold',
        marginTop:5,
      },
      calview:{
        borderWidth:1,
        backgroundColor: 'linen',
        marginTop:18,
        padding:7,
        margin:7,
      },
      order:{
        fontSize: 20,
        fontStyle: 'normal',
        textAlign:'left',
        fontWeight:'800',
        marginLeft: 10,
        marginTop: 3,
        textAlign:'center',
        color:'blue', 

      },
    movietitle:{
        fontSize: 26,
        fontStyle: 'normal',
        fontWeight : 'bold',
        textAlign:'left',
        marginLeft: 10,
        marginTop: 10,
        textAlign:'center',
        color:'blue',  
    },
    tickets:{
        fontSize:23,
        fontStyle: 'normal',
        textAlign:'left',
        marginLeft: 18,
        marginTop: 10,
        color:'blue',  
    },
    titleofvideo:{
        fontSize: 28,
        color: 'chocolate',
        fontStyle: 'normal',
        fontWeight : 'bold',
        alignContent:'center',
        textAlign:'center',
        marginTop:20,
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
      plus: {
        color: 'black',
        fontSize: 25,
        marginLeft:10,
        marginTop:10,
        borderColor: 'darkcyan',
        paddingHorizontal: 9,
        borderWidth: 1.5,
        paddingVertical: 3,
        marginRight:10,
      },
      minus: {
        color: 'black',
        fontSize: 25,
        marginRight:10,
        marginLeft:20,
        marginTop:10,
        borderWidth: 1.5,
        borderColor: 'darkcyan',
        paddingHorizontal: 9,
        paddingVertical: 3,
        
      },
      count: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop:10,
      },
      counter:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      }
});

export default BuyTicket;

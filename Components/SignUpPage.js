import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TextInput, AsyncStorage, ScrollView, KeyboardAvoidingView} from 'react-native';
import { SocialIcon } from 'react-native-elements'
import {connect} from 'react-redux';
import ToggleHeader from "./ToggleHeader";

import { Button } from '@ant-design/react-native';

import {IpAdress} from '../config';
import SignInPage from './SignInPage';

function SignUp(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('');
   /*  const [signedIn, setSignedIn] = false ;
    const [name, setName] = "";
    const [photoUrl, setPhotoUrl] = ""; */

    /* var signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: "392552092001-e89sglqj3s7bpok9ojtd3i523hbnf57c.apps.googleusercontent.com",
        //iosClientId : "YOUR_CLIENT_ID_HERE",        
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
          setSignedIn({ signedIn: true})
          setName({ name:result.user.name })
          setPhoto({ photoUrl: result.user.photoUrl})
          console.log('console log result', result);
      } else {
        console.log("cancelled")
      } 
    } catch (e) {
      console.log("error", e)
    }
}
 */
    var handleSubmit = () => {
        //Récupere les infos des inputs
        var signupData = JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            tel: tel,
            password: password,
            homeaddress: null,
            officeaddress: null
          });

        //Requete avec la route Back
        fetch(`http://${IpAdress}:3000/users/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: signupData,
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            console.log(data)
            AsyncStorage.setItem('userVTC', JSON.stringify(data.user)); //Enregistre user dans local storage

            props.signUp(data.user._id, data.user.first_name, data.user.last_name, data.user.email, data.user.tel, data.user.password, data.user.homeaddress, data.user.officeaddress); //enregistre les données pour redux
            props.checkStatus(true); // Status Connecter

            console.log('Redux Signup', props.price )
            console.log('Redux Signup', props.distance )

            props.navigation.navigate('HomePage');
             
        })
        .catch(err => {
            console.log(err)
        })
    }

    return( 
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}} enabled > 
        <ScrollView style={{flex: 1}} scrollEnabled={true} >
          <View style={styles.container}>
              {/* Burger menu */}  
              <ToggleHeader  
              style={styles.toggle}     
              navigation={props.navigation}  /> 
              <Text style={{marginBottom: 15, marginTop: 20}} onPress={() => props.navigation.navigate('SignIn')}> Avez-vous un compte ? </Text>
              <View style={styles.separate} /> 
              
              <Text style={{marginBottom: 15}}> Connectez-vous avec : </Text>

              <SocialIcon
                  raised={false}
                  type='google'
                  button={true} 
                  style={styles.socialButton}
              />
              <SocialIcon
                  raised={false}
                  type='facebook'
                  button={true}
                  style={styles.socialButton}
              />
              <SocialIcon
                  raised={false}
                  type='linkedin'
                  button={true}
                  style={[styles.socialButton, {marginBottom: 30}]}
              />

              <View style={styles.separate} /> 
              <Text> ou </Text>
              <Text style={{marginBottom: 10}}> Créez un compte </Text>
              
              <TextInput style={styles.textForm} value={lastName} onChangeText={e => setLastName(e)} placeholder='Nom'/>
              <TextInput style={styles.textForm} value={firstName} onChangeText={e => setFirstName(e)} placeholder='Prenom'/>
              <TextInput style={styles.textForm} value={email} onChangeText={e => setEmail(e)} placeholder='Email'/>
              <TextInput style={styles.textForm} value={tel} onChangeText={e => setTel(e)} placeholder='Telephone'/>
              <TextInput style={styles.textForm} value={password} onChangeText={e => setPassword(e)} placeholder='Password' secureTextEntry={true} />

              <Button style={styles.button} onPress={() => handleSubmit()} > Confirmer </Button>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      //marginTop: 50
    },
    separate: {
        height: 1,
        backgroundColor: '#c6d0d3',
        width: '85%',
        marginBottom: 10
    },
    socialButton: {
        width: '70%',
        height: 30
    },
    button: {
        marginLeft: 200,
        marginTop: 20,
        height: 40,
        marginBottom: 40
    },
    textForm: {
        width: '70%',
        height: 35,
        borderBottomWidth: 1,
        marginBottom: 10,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        paddingLeft: 9
    }
  });


  function mapDispatchToProps(dispatch) {
    return {
      signUp: function(id, firstName, lastName, email, tel, password, homeaddress, officeaddress) {

        dispatch(
            {
                type: 'signUp',
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                tel: tel,
                password: password,
                homeaddress: homeaddress,
                officeaddress: officeaddress
            }
        )
      },
      checkStatus: function(isConnected) {
        dispatch({type: 'checkStatus', isConnected: isConnected})
      }
    }
  }

  function mapStateToProps(state) {
    return {
      price: state.Travel.price,
      distance: state.Travel.distance
    }
  }
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps
  ) (SignUp);
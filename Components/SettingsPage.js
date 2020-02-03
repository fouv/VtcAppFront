import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, AsyncStorage, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import { Input } from 'react-native-elements';

import { Button, } from '@ant-design/react-native';

import {IpAdress} from '../config';

function SettingPage(props) {
    var propsTel = props.tel.toString();

    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [tel, setTel] = useState(propsTel);
    const [password, setPassword] = useState(props.password);
    const [disabled, setDisabled] = useState(true);

    // if(firstName !== props.firstName) {
    //     setDisabled(false)
    // }

    // useEffect(() => {
    //     change
    // })
    return( 
        <ScrollView style={{flex: 1}} scrollEnabled={true}> 
            <View style={styles.container}>
                    <Text style={{marginBottom: 40, fontSize: 25}}> Modifier le Compte </Text>
                    <Button style={{marginLeft: 210}} disabled={disabled}> Save </Button>
                    <View style={styles.test}>
                        <Input label='Prenom' style={styles.textForm} value={firstName} onChangeText={e => setFirstName(e)} disabled />
                    </View>
                    <View style={styles.test}>
                        <Input label='Nom' style={styles.textForm} value={lastName} onChangeText={e => setLastName(e)} disabled /> 
                    </View>
                    <View style={styles.test}>
                        <Input label='Email' style={styles.textForm} value={email} onChangeText={e => setEmail(e)} disabled /> 
                    </View>
                    <View style={styles.test}>
                        <Input label='Tel' style={styles.textForm} value={tel} onChangeText={e => setTel(e)} disabled /> 
                    </View>
                    <View style={styles.test}>
                        <Input label='Password' secureTextEntry={true} style={styles.textForm} value={password} onChangeText={e => setPassword(e)} disabled /> 
                    </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 50
    },
    button: {
        marginTop: 20,
        height: 40,
        marginBottom: 25
    },
    test: {
        width: '85%',
        marginBottom: 30,
    }
  });


//   function mapDispatchToProps(dispatch) {
//     return {
//       signUp: function(id, firstName, lastName, email, tel, password) {

//         dispatch(
//             {
//                 type: 'sign',
//                 id: id,
//                 firstName: firstName,
//                 lastName: lastName,
//                 email: email,
//                 tel: tel,
//                 password: password
//             }
//         )
//       },
//       checkStatus: function(isConnected) {
//         dispatch({type: 'checkStatus', isConnected: isConnected})
//       }
//     }
//   }
  
  function mapStateToProps(state) {
      console.log('State in SettingPage -->');
      console.log(state)
    return {
        firstName: state.User.firstName,
        lastName: state.User.lastName,
        email: state.User.email,
        tel: state.User.tel,
        password: state.User.password
    }
  }
  export default connect(
    mapStateToProps,
    null
  ) (SettingPage);
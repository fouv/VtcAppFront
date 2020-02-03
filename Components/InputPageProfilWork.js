import React, {useState} from 'react';
import {View,TextInput, StyleSheet, Text, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {ApiAddressGoogle} from '../config';
import {IpAdress} from '../config';


import {Button} from 'react-native-elements';

function InputPageProfilWork(props) {
    const [officeaddress, setOfficeaddress] = useState('');
    const [predictions, setPredictions] = useState([]);

   var onChangeDestination = async (destination) => {
        // Change la valeur de l'input des que l'on ecrit
        setOfficeaddress(destination)
        apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ApiAddressGoogle}&input=${destination}&location=45.7711578, 4.8527353&radius=200000`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            console.log(json);
            //Stocke dans un tableau toutes les predictions de l'autocomplete
            setPredictions(json.predictions);
        } catch(err) {
            console.log(err);
        }
    }


    var handleSaveAddress = () => {
        fetch(`http://${IpAdress}:3000/addOfficeAddress?officeaddress=${officeaddress}&userid=${props.id}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Data REsponse ---->',data.response)
            if(data.response) {
                props.saveAdressOffice(officeaddress);
                let newOfficeAddress = {officeaddress: officeaddress}
                AsyncStorage.mergeItem('userVTC', JSON.stringify(newOfficeAddress));
                props.navigation.navigate('ProfilPage');
            }
        })
    }

    const predictionsAdress = predictions.map(predictions => (
        <Text style={styles.predictionsStyle} onPress={() => {setOfficeaddress(predictions.description), setPredictions([])}} key={predictions.id}>  {predictions.description} </Text>
      ))

    return(
        <View style={styles.container}> 
            <TextInput
                style={styles.input}
                placeholder='Ajouter une adesse'
                value={officeaddress}
                onChangeText={(e) => onChangeDestination(e)}
            />
            {predictionsAdress}
            <Button buttonStyle = {styles.submitButton} title='Valider' onPress={()=> handleSaveAddress()}> Valider </Button>
        </View>
         

    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 0,
      backgroundColor: '#222831'
    },

    input: {
      width: '100%', 
      marginTop: 8,
      height: 55,
      borderWidth: 0,
      backgroundColor: '#393e46',
      fontWeight: '400',
      padding: 10,
      borderRadius: 3,
      marginTop: 10,
      color: 'white'
   },
    predictionsStyle: {
        backgroundColor: '#393e46',
        color: 'white',
        padding: 10,
        fontSize: 16,
        borderWidth: 0.5,
        width: '100%'
    },
    submitButton: {
        width: '30%',
        backgroundColor: '#00adb5',
        marginLeft: 230,
        borderColor: '#00adb5',
        padding: 10,
        marginBottom: 15,
        height: 40,
        borderRadius: 3,
        marginTop: 30,
    }
 });

function mapDispatchToProps(dispatch) {
    return {
        saveAdressOffice: function(officeaddress) {
            dispatch(
                {
                    type: 'saveOfficeAddress',
                    officeaddress: officeaddress
                }
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        id: state.User.id
    }
} 


export default connect(
    mapStateToProps,
    mapDispatchToProps
) (InputPageProfilWork);


import React, {useState, Fragment} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import Modal from "react-native-modalbox";
import ToggleHeader from "./ToggleHeader"


import { Card, WingBlank, Button, InputItem } from '@ant-design/react-native';

import {IpAdress} from "../config";
function MapResult(props) {
    const [isVisible, setIsVisible] = useState(false);

    var handleClickModal = () => {
        setIsVisible(!isVisible);
    }

    var handleClickValidation = () => {
        var tripDatas = JSON.stringify({
            departure: props.departure,
            arrival: props.arrival,
            hourdeparture: props.hourdeparture,
            price: props.price,
            distance: props.distance,
            hourDeparture: props.hourDeparture,
            time: props.time
          });

        fetch(`http://${IpAdress}:3000/addTrip`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: tripDatas,
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            console.log('Data ---->')
            console.log(data)

            fetch(`http://${IpAdress}:3000/confirmTravel?id=${props.idUSer}&idTrip=${data.trip._id}`)
            .then(response => {
                return response.json();
            })
            .then( datas => {
                
                console.log('data addTravel --->', datas);
                props.tripConfirmed();

            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })  

        setIsVisible(!isVisible);
        props.navigation.navigate('HomePage');
    }
    return (
        <View style={styles.container}>
            {/* <ToggleHeader navigation={props.navigation}  title="Votre course"  />    */}
            <ScrollView style={{flex: 1}} scrollEnabled={true} >
                <View >
                        <WingBlank size='sm'>  
                            <Card style={{backgroundColor: '#eeeeee'}}>
                                <Text style={styles.titleCard}> Récapitulatif de la course</Text>
                                <Card.Body style={{backgroundColor: '#eeeeee'}}>
                                    <InputItem style={styles.textForm} value={props.departure} editable={false}> Départ : </InputItem>
                                    <InputItem style={styles.textForm} value={props.arrival} editable={false}> Arrivé : </InputItem>
                                    <InputItem style={styles.textForm} value={`${props.price} €`} editable={false}> Prix : </InputItem>
                                    <InputItem style={styles.textForm} value={`${props.distance} `} editable={false}> Km : </InputItem>
                                    <InputItem style={styles.textForm} value={`${props.time}`} editable={false}> Temps : </InputItem>
                                    <InputItem style={styles.textForm} value={props.date} extra={props.hourDeparture} editable={false}> Date : </InputItem>
                                </Card.Body>
                                <Card.Footer 
                                    extra={<Button style={{width: 120, height: 40, marginLeft: 40, backgroundColor: '#00adb5', borderColor: '#00adb5'}} type='primary' onPress={() => handleClickModal()} > Confirm </Button>}
                                />
                            </Card>
                        </WingBlank>     
                </View>
            </ScrollView> 
            <Modal isOpen={isVisible} position={"bottom"} style={[styles.modal, styles.modal4]}>
                <Text style={{marginLeft: 20, marginBottom: 25, color: 'green', fontSize: 20}}> Votre course a été validée <Ionicons name='md-checkmark-circle' size={25} color='green'/> </Text>
                <Button style={{width: '70%', height: 40, marginLeft: 20}} type='primary' onPress={() => handleClickValidation()} > Ok !</Button>
            </Modal>
        </View>  
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222831'
    },
    titleCard: {
       padding: 10,
       fontSize: 18,
       marginLeft: 40,
    },
    textForm: {
       padding: 10,
       opacity: 0.5,
       fontSize: 15,
    },
    textFormPrice: {
        padding: 10,
        fontSize: 21,
        marginRight: 5,
     },
     modal: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      modal4: {
        height: 200
      },
  });

  function mapDispatchToProps(dispatch) {
    return {
        tripConfirmed: function() {
            dispatch({type: 'travelConfirmed'})
        }
    }
  }

  function mapStateToProps(state) {
      console.log('State TripOverview ----->');
      console.log(state);
    return {
        idUSer: state.User.id,
        departure: state.Travel.departure,
        arrival: state.Travel.arrival,
        price: state.Travel.price,
        distance: state.Travel.distance,
        date: state.Travel.date,
        hourDeparture: state.Travel.hourDeparture,
        time: state.Travel.time
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  ) (MapResult);
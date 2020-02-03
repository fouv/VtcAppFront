
import React, {useState, useEffect, Component} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, AsyncStorage, ScrollView, StyleSheet, FlatList} from 'react-native';
import ToggleHeader from "./ToggleHeader";
import { Tile } from 'react-native-elements';
import imagetile from '../assets/taxi.jpg';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import _ from 'lodash';
import AntIcon from "react-native-vector-icons/AntDesign";
import {ApiAddressGoogle} from '../config';
import * as Location  from 'expo-location';
import * as Permissions from 'expo-permissions';
import {Ionicons} from '@expo/vector-icons';
import { Button } from 'react-native-elements';


var ladate=new Date();
var datedujour = ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();
var timeDay = ladate.getHours()+" h"+" "+ladate.getMinutes();

class HomePage extends Component {   


  constructor() {
    super()
    
      this.state = {
      departure: '',
      arrival: '',
      date: datedujour,
      hourDeparture: timeDay,
      positionDeparture: {lat: 0, long: 0},
      positionArrival: {lat: 0, long: 0},
      predictionsDeparture: [],
      predictionsArrival: [],
      location: null,
      errorMessage: null,  
      address: null,    
      
    }
  }

  _getLocationAsync = async () => {
    var { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
  }

  componentWillMount() {
    this._isMounted = false;
    this._getLocationAsync();
    
  }

  componentDidMount() {

    this._isMounted = true;
    Location.watchPositionAsync({distanceInterval: 5}, 
    (location) => {
      console.log('console log-->', location);
      if(this._isMounted){
          this.setState({location: location});
          console.log('location coords', location.coords.latitude);
          var lat = location.coords.latitude;
          var long = location.coords.longitude;
          console.log('console log long',long)
          fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${ApiAddressGoogle}`)
              .then(response => {
                return response.json();
               })
              .then(data => {
                console.log('MY GOOGLE lAT and LONG --------->', data.results[0].formatted_address);
                 var cpyLoc = {...this.state.departure};
                 cpyLoc = data.results[0].formatted_address ; 
                 this.setState({departure: cpyLoc});
                 console.log('console.log address',this.state.departure)
               })
              .catch(err => {
                console.log(err)
              })
    
            }      
         }
       )
    
      //asyncStorage keep info
      var ctx = this;
      AsyncStorage.getItem("userVTC",
      function(err, data) { 
        if(data) {
          var userData = JSON.parse(data); 

          console.log('userData --->', userData)

          ctx.props.sign(userData._id, userData.first_name, userData.last_name, userData.email, userData.tel, userData.password, userData.homeaddress, userData.officeaddress); //enregistre les données pour redux
          ctx.props.checkStatus(true); 
        

        } else {
          console.log('No user connected');
          ctx.props.checkStatus(false); 
        }
      } 
    )
  }

  getGeocoding = async () => {


    // Transformer Valeur input => 21 rue Test => 21+rue+Test
    var transformAddressDeparture = this.state.departure.split(' ').join('+');
    var transformAddressArrival = this.state.arrival.split(' ').join('+');

    //console.log('MY ADDRESS DEPARTURE -------------------->', transformAddressDeparture);
    //console.log('MY ADDRESS ARRIVAL -------------------->', transformAddressArrival);

    fetchDeparture = async () => {
      await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${transformAddressDeparture},+FR&key=${ApiAddressGoogle}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('MY GOOGLE API DATAS --------->', data);
  
       // console.log('TEST POSITION ---->', data.results[0].geometry.location.lat)
        //console.log('TEST POSITION ---->', data.results[0].geometry.location.lng)
        // Crée une copy du state
        var cpyState = {...this.state.positionDeparture};

       // console.log('MY CPY STATE ------->', cpyState)
        // Ajoute Latitude et Longitude dans la copy du state
        cpyState.lat = data.results[0].geometry.location.lat,
        cpyState.long = data.results[0].geometry.location.lng,
       // console.log('MY CPY STATE V2 ------->', cpyState)

        // modifie le state par la copy
        this.setState({positionDeparture: cpyState});

      
        //setPositionDeparture({...positionDeparture, lat: data.results[0].geometry.location.lat, long: data.results[0].geometry.location.lng })

        // setPositionDeparture(prevState => {
        //   // Object.assign would also work
        //   return {...prevState, ...cpyState};
        // });

       // console.log('MY STATE ------->', this.state.positionDeparture)

      })
      .catch(err => {
        console.log(err)
      })
    }

    fetchArrival = async () => {
       await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${transformAddressArrival},+FR&key=${ApiAddressGoogle}`)
      .then(resonse => {
        return resonse.json();
      })
      .then(data => {
  
        //console.log('TEST POSITION ---->', data.results[0].geometry.location.lat)
       // console.log('TEST POSITION ---->', data.results[0].geometry.location.lng)
        var cpyState = {...this.state.positionArrival};

       // console.log('MY CPY STATE ------->', cpyState)
        cpyState.lat = data.results[0].geometry.location.lat,
        cpyState.long = data.results[0].geometry.location.lng,
       // console.log('MY CPY STATE V2 ------->', cpyState)

        this.setState({positionArrival: cpyState});

      })
      .catch(err => {
        //console.log(err)
      })
    }
    await fetchDeparture()
    await fetchArrival()

    //Envoie dans redux les adresses, positions, date, heure de la course
    await this.props.searchTravel(this.state.departure, this.state.arrival, this.state.date, this.state.hourDeparture, this.state.positionDeparture.lat, this.state.positionDeparture.long, this.state.positionArrival.lat, this.state.positionArrival.long);
    this.setState({
      //departure: '',
      arrival: '',
      data: datedujour,
      hourDeparture: timeDay,
      positionDeparture: {lat: 0, long: 0},
      positionArrival: {lat: 0, long: 0},
      predictionsDeparture: [],
      predictionsArrival: []
    })

    this.props.navigation.navigate('MapResult');
  }

   onChangeDeparture = async (destination) => {
     // Change la valeur de l'input des que l'on ecrit
        this.setState({departure: destination});

        apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ApiAddressGoogle}&input=${destination}&location=45.7711578, 4.8527353&radius=200000`;
        try {
          const result = await fetch(apiUrl);
          const json = await result.json();
          console.log(json);
          //Stocke dans un tableau toutes les predictions de l'autocomplete
          this.setState({predictionsDeparture: json.predictions})
        } catch(err) {
          console.log(err);
        }
   }

   onChangeDestination = async (destination) => {
     // Change la valeur de l'input des que l'on ecrit
      this.setState({arrival: destination});
      apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ApiAddressGoogle}&input=${destination}&location=45.7711578, 4.8527353&radius=200000`;
      try {
        const result = await fetch(apiUrl);
        const json = await result.json();
       // console.log(json);
        //Stocke dans un tableau toutes les predictions de l'autocomplete
        this.setState({predictionsArrival: json.predictions})
      } catch(err) {
        console.log(err);
      }

   }
  

  

  render() {

   
        // Permet de crée un element text pour chaque predictions stocker dans le tableau predictionsDeparture
    const predictionsRenderDeparture = this.state.predictionsDeparture.map(predictions => (
      <Text style={styles.predictionsStyle} onPress={() => this.setState({departure: predictions.description, predictionsDeparture: []})} key={predictions.id}>  {predictions.description} </Text>
    ))

    const predictionsRenderArrival = this.state.predictionsArrival.map(predictions => (
      <Text style={styles.predictionsStyle} onPress={() => this.setState({arrival: predictions.description, predictionsArrival: []})} key={predictions.id}>  {predictions.description} </Text>
    ))


    return (
      // Keyboard params
      <KeyboardAvoidingView  style={{flex: 1}} enabled > 
        <ScrollView style={{flex: 1}} scrollEnabled={true} contentContainerStyle={styles.container} >

        <View style={{width: '100%', flex:1, alignItems: 'center', margin: 0, backgroundColor: '#222831'}}>  
          {/* Burger menu */}  
          <ToggleHeader  
            style={styles.toggle}     
            navigation={this.props.navigation} title="VTC-App"  /> 
          
          {/* image */}  
           
            <Tile 
              containerStyle={{height: 250}}
              imageContainerStyle={{height: 250}}
              titleStyle={{ color: 'black', fontSize: 55, }}
              imageSrc={imagetile}
              captionStyle={{ opacity: 2 }}
              title="Ou souhaitez-vous aller ?"
              featured          
            />
            <View style={{flex: 1, flexDirection: 'row', maxHeight: 50, marginTop: 20, marginBottom: 2}}>
            <TextInput style = {styles.specialInput}
                underlineColorAndroid = "transparent"
                placeholder = {this.state.departure}
                placeholderTextColor = "#393e46"
                autoCapitalize = "none"
                value= {this.state.departure}
                onChangeText={(e) => this.onChangeDeparture(e)}
              />
            <Ionicons onPress={() => this.setState({departure: ''})} style={{marginTop: 5, marginLeft: 8}} name='md-close-circle-outline' size={25} color='#eeeeee'/>
             </View>  
            
                {predictionsRenderDeparture}
           
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "  Ou allez-vous ?  "
                placeholderTextColor = "#393e46"
                autoCapitalize = "none"
                value= {this.state.arrival}
                onChangeText={(e) => this.onChangeDestination(e)}
              />
            
           
           
              {predictionsRenderArrival}
           <DatePicker
                style = {styles.datepicker}
                date={this.state.date}  //initial date from state
                mode="datetime" //The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-2019"
                maxDate="01-01-2021"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    width:38,
                    height: 40,
                    left: 0,
                    marginLeft: 0,
                    backgroundColor: '#222831'
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(dateChange, timeChange) => { 
                  this.setState({date: dateChange, hourDeparture: timeChange})
                  console.log(timeChange);
                  var timeNewDay = timeChange.getHours()+" h"+" "+timeChange.getMinutes();
                  console.log(timeNewDay);
                  timeNewDay.toString();
                  this.setState({hourDeparture: timeNewDay})
                }}
              />
          
          
           <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  value = {`${this.state.hourDeparture}`}
                  placeholderTextColor = "#393e46" 
                  autoCapitalize = "none"
                />
          
           <Button 
                  containerStyle = {styles.submitButton}
                  buttonStyle= {{backgroundColor: '#00adb5'}}
                  title = "Valider"
                  onPress={()=> {this.getGeocoding()}}
                />              
              

              {/* footer */}
             <View style = {styles.bottom}>
                <AntIcon name="car" color="#00adb5" size={35} />
                <Text style = {{color: 'white', fontSize:10}}> Choisissez votre course </Text>
          </View>   

          </View>   

         
          </ScrollView>
      </KeyboardAvoidingView>
    );
  } 
}




const styles = StyleSheet.create({
    toggle: {
      flex: 1,
      marginTop: 0,
     
    },
    container:{
   flex: 1,
   justifyContent: 'space-around',
},

    bottom : {
      width: '100%', 
      backgroundColor: '#222831', 
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: 20,
      
    },
     datepicker: {
      borderColor: '#222831',
      borderWidth: 0.2,
      width: '70%', 
      backgroundColor: '#eeeeee',
      marginBottom: 10,

    },

    input: {
      width: '70%', 
      height: 40,
      borderWidth: 0,
      backgroundColor: '#BBBBBB',
      fontWeight: '400',
      padding: 10,
      borderRadius: 3,
      textAlign:'center',
      marginBottom: 10,
      backgroundColor: '#eeeeee',
   },

   specialInput :{
      textAlign:'center',
      backgroundColor: '#BBBBBB',
      width: '70%',
      height: 40,
      padding: 2,
      fontSize: 11,
      marginLeft:  28,
      borderRadius: 3,
      backgroundColor: '#eeeeee',
   },
   submitButton: {
      width: '70%',
      marginTop: 20,
      borderRadius: 3,
      
      
   },
      predictionsStyle: {
      backgroundColor: '#eeeeee',
      padding: 8,
      fontSize: 16,
      borderWidth: 0.5,
      width: '70%',
    }
   
 });
  

 function mapDispatchToProps(dispatch) {
  return {
    searchTravel: function(departure, arrival, date, hourDeparture, latDeparture, longDeparture, latArrival, longArrival) {
        dispatch(
          {
            type: 'searchTravel',
            departure: departure,
            arrival: arrival,
            date: date,
            hourDeparture: hourDeparture,
            positionDeparture: {
              lat: latDeparture,
              long: longDeparture
            },
            positionArrival: {
              lat: latArrival,
              long: longArrival
            }
          }
        )
    },
    sign: function(id, firstName, lastName, email, tel, password, homeaddress, officeaddress) {
      dispatch(
          {
              type: 'sign',
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
   console.log(state)

   return {
    isConnected: state.UserStatus
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage); 
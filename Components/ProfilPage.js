import React from "react";
import {View, Text} from 'react-native';
import { Icon, ListItem } from 'react-native-elements'
import {connect} from 'react-redux';
import ToggleHeader from "./ToggleHeader";
import {Ionicons} from '@expo/vector-icons';


const ProfilPage = props => {
      let displayHomeAddress;
      let displayOfficeAddress;

      if(props.homeaddress) {
            displayHomeAddress =  <Text style={{marginLeft: 45, marginBottom: 20, fontSize: 15 ,opacity: 0.6}} onPress={() => props.navigation.navigate('InputPageProfilHome')}> <Ionicons style={{marginRight: 9}} name='md-home' size={15} color='black'/> {props.homeaddress}</Text>
      } else {
            displayHomeAddress =  <Text style={{color: '#006eff', marginLeft: 45, marginBottom: 20}} onPress={() => props.navigation.navigate('InputPageProfilHome')}> Ajouter un domicile </Text>
      }

      if(props.officeaddress) {
            displayOfficeAddress =  <Text style={{marginLeft: 45, marginBottom: 10, fontSize: 15 ,opacity: 0.6}} onPress={() => props.navigation.navigate('InputPageProfilWork')}> <Ionicons style={{marginRight: 9}} name='md-briefcase' size={15} color='black'/> {props.officeaddress}</Text>
      } else {
            displayOfficeAddress =  <Text style={{color: '#006eff', marginLeft: 45, marginBottom: 10}} onPress={() => props.navigation.navigate('InputPageProfilWork')}> Ajouter un lieu de travail </Text>
      }

      return (
            <View style={{width: '100%', height: '100%',flex:1, margin: 0}}>  
                  <ToggleHeader navigation={props.navigation} title="Votre profil" /> 
                  <View>
                        <ListItem
                        containerStyle={{height: 100}}
                        title={
                              <View style={{flex: 1, marginBottom:10 }}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                          <Ionicons style={{marginTop: 5}} name='md-person' size={19} color='black'/>
                                          <Text style={{fontSize: 22, paddingLeft: 5}}> {props.firstName} {props.lastName}</Text>
                                    </View>
                              </View>
                        }
                        subtitle={
                              <View style={{flex: 1}}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                          <Ionicons style={{marginTop: 3}} name='md-call' size={15} color='black'/>
                                          <Text style={{fontSize: 14, paddingLeft: 5, opacity: 0.5}}> {props.tel}</Text>
                                          <Ionicons style={{marginTop: 3, marginLeft: 15}} name='md-mail' size={15} color='black'/>
                                          <Text style={{fontSize: 14, paddingLeft: 5, opacity: 0.5}}> {props.email}</Text>
                                    </View>
                              </View>
                        }
                        bottomDivider
                        /> 
                  </View>   

                  <ListItem
                        containerStyle={{height: 140, marginTop: 30}}
                        title={
                              <View style={{ marginBottom: 20, flexDirection:'row'}}>
                                    <Ionicons style={{marginTop: 2}} name='md-star' size={22} color='black'/>
                                    <Text style={{fontSize: 20}}> Vos adresses :  </Text>
                              </View>
                        }
                        subtitle={
                              <View>
                                    {displayHomeAddress}
                                    {displayOfficeAddress}
                              </View>
                        }
                        bottomDivider
                        /> 

                        <View style={{ marginTop: 20, flexDirection:'row', marginLeft: 10}} >
                              <Icon name="settings"></Icon><Text style={{color: '#006eff', fontSize: 16}} onPress={() => props.navigation.navigate('SettingPage')}> Modifier vos paramètres </Text>
                        </View>

                        {/* <View style={{flex:1, flexDirection:'column', marginTop: 10}}>
                              <View style={{ marginBottom: 10, flexDirection:'row', marginLeft: 10}}>
                                    <Ionicons style={{marginTop: 2}} name='md-star' size={22} color='black'/>
                                    <Text style={{fontSize: 20}}> Vos adresses :  </Text>
                              </View>
                              <Text style={{marginLeft: 30, marginBottom: 10}}> Domicile :</Text>
                              {displayHomeAddress}

                              <Text style={{marginLeft: 30, marginBottom: 10}}> Travail :</Text>
                              {displayOfficeAddress}                
                        </View>  */}
            </View> 
      )
    }; 

    function mapStateToProps(state) {
      return {
            homeaddress: state.User.homeaddress,
            officeaddress: state.User.officeaddress,
            firstName: state.User.firstName,
            lastName: state.User.lastName,
            email: state.User.email,
            tel: state.User.tel
      }
    }
  

  export default connect(
      mapStateToProps,
      null
  ) (ProfilPage)


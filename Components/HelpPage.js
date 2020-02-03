import React from "react";
import {StyleSheet, View} from 'react-native';
import { Icon } from 'react-native-elements'
import A from 'react-native-a';
import ToggleHeader from "./ToggleHeader";


const ProfilPage = props => {
      return (
<View style={{width: '100%', height: '100%',flex:1, alignItems: 'center', margin: 0}}>  
 <ToggleHeader navigation={props.navigation} title="Help" />    
      <View style={{flex:1, flexDirection:'column',justifyContent: 'center', alignItems: 'center'}}>

           <View style={{ marginBottom: 20, flexDirection:'row'}}>
          <A href="#"> Trouver vos courses </A>
          </View>
          <View style={{ marginBottom: 20, marginTop: 10}}>
           <A href="#"> Quand annuler ma course ? </A>
          </View>
          <View style={{ marginTop: 20, flexDirection:'row'}} >
          <A href="#"> Qui appeler ? </A>
          </View>
      </View> 
</View> 
      )
    }; 

   
 

    export default ProfilPage;

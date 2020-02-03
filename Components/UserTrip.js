import React, { useEffect, useState } from "react";
import {Text, View, StyleSheet, ScrollView, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements'
import {IpAdress} from '../config';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import ToggleHeader from "./ToggleHeader";


const UserTrip = props => {
  const [userTrip, setUserTrip] = useState([]);

  useEffect(() => {
    function fetchRoute() {
      fetch(`http://${IpAdress}:3000/userTrip?id=${props.id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setUserTrip(data.userTrip.trips);
      })
      .catch(err => (
        console.log(err)
      ))
    }
    fetchRoute();
  }, [])


  if(userTrip.length < 1) {
     return (
      <View style={{flex: 1}}>

        <ToggleHeader navigation={props.navigation} title="Vos Courses" />
        <View style={{flex: 1,marginLeft: 40, marginTop: 200 ,justifyContent: 'center', alignItems: 'center', borderWidth:1, borderColor: 'grey', width: '80%', maxHeight: 100, borderRadius: 10}}>
            <Text> Vous n'avez pas de course </Text>
        </View>
      </View>

     );
  } else {

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{flex: 1, backgroundColor: '#eeeeee' }} scrollEnabled={true} >
        <ToggleHeader navigation={props.navigation} title="Vos Courses" />     
            {
              userTrip.map((element, i) => (
                <ListItem
                  containerStyle={{height: 130}}
                  key={i}
                  title={
                    <View style={{flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 4}}>
                      <Ionicons style={{marginTop: 3}} name='md-radio-button-on' size={16} color='#32a6ff'/>
                      <Text style={{fontSize: 14.5, paddingLeft: 5}}> {element.departure}</Text>
                    </View>
                  }
                  subtitle={
                    <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                      <Ionicons name='md-radio-button-on' size={16} color='#ea1919'/>
                      <Text style={{fontSize: 14.5, paddingLeft: 5}}> {element.arrival}</Text>
                    </View>
                  }
                  //rightTitle={`${element.price} €`}
                  rightTitle= {
                    <View style={{flex: 1, flexDirection: 'column', marginTop: 10}}>
                      <Text style={{fontSize: 17, opacity: 0.6}}> {`${element.distance}`} </Text>
                      <View style={styles.separate} /> 
                      <Text style={{fontSize: 17, opacity: 0.6}}> {`${element.price} €`} </Text>
                    </View>
                  }
                  bottomDivider
                  chevron
                /> 
              ))
            }
        </ScrollView>
      </View>
    )

  }
  
};

const styles = StyleSheet.create({
  header : {
    height: 100,
    backgroundColor: '#222831',
  },
  separate: {
    height: 1,
    backgroundColor: '#eaeaea',
    marginTop: 8,
    marginBottom: 8
  },
})

function mapStateToProps(state) {
  return {
    id: state.User.id
  }
}

export default connect(
  mapStateToProps,
  null
) (UserTrip);



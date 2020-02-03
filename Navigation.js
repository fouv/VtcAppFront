import React, {Fragment} from 'react';
import NavigationConnected from './NavigationConnected';
import NavigationNotConnected from './NavigationNotConnected';
import {connect} from 'react-redux';
import Travel from './Reducers/travel-reducer';
import User from './Reducers/user-reducer';
import UserStatus from './Reducers/userStatus-reducer';
import { ShadowPropTypesIOS } from 'react-native';

 function Navigation(props) {  
     if(props.isConnected) {
         return (
            <NavigationConnected/>                  
        );
     } else {
        return (
            <NavigationNotConnected/>         
        );

     }
}

function mapStateToProps(state) {
  return { isConnected: state.UserStatus }
}
  
export default connect(
  mapStateToProps, 
  null
)(Navigation);
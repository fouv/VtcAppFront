import React from "react";
import { Icon } from "react-native-elements";
import { DrawerActions } from "react-navigation-drawer"



const HamburgerMenu = props => {
      return (
        
    <Icon
      color="#fff"
      name="menu"
      size={30}
      onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer())}}
    />
   
  );
    };

    export default HamburgerMenu;

 
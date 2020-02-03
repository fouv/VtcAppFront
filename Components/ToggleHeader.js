import React from "react";
import { Header } from "react-native-elements";
import HamburgerMenu from "./HamburgerMenu";


const ToggleHeader = props => {
    
  return (
    <Header 
     backgroundColor = '#222831'
      leftComponent={<HamburgerMenu navigation={props.navigation} />}
      centerComponent={{
        text: props.title,
        style: { color: "#fff", fontWeight: "bold" }
      }}
      statusBarProps={{ barStyle: "light-content" }}
    />
  );
};
export default ToggleHeader;   
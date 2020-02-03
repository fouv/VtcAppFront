import React from "react";
import { createAppContainer } from 'react-navigation';
import HelpPage from './Components/HelpPage';
import SignIn from './Components/SignInPage';
import HomePage from './Components/HomePage';
import SignUp from './Components/SignUpPage';
import MapResult from './Components/MapResult';
import TripOverview from './Components/TripOverview';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator} from 'react-navigation-drawer';

 
const MainDrawer = createDrawerNavigator(
  {
  HomePage: {
  screen: HomePage,
  navigationOptions: () => ({
          header: null,
          title:'Accueil'
      })
  }, 

  SignIn: {
      screen: SignIn,
      navigationOptions: () => ({
          header: null,
          title:'Se connecter'
      })
    },

    SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
        header: null,
        title:'Créer un compte'
    })  
    }, 
  
  HelpPage: {
  screen: HelpPage, 
   navigationOptions: () => ({
        header: null,
        title:'Help' 
    })  
  }, 
  
})

const StackConnectedNavigator = createStackNavigator(
  {
      MainDrawer: {
        screen : MainDrawer,
        navigationOptions: () => ({
            header: null
        })
    },  
    MapResult : {
        screen: MapResult,
        navigationOptions: () => ({
            headerStyle: {
                backgroundColor: '#222831',
            },
            headerTintColor: '#eeeeee',
        })
    },

    TripOverview: {
        screen: TripOverview,
        navigationOptions: () => ({
            headerStyle: {
                backgroundColor: '#222831',
            },
            headerTintColor: '#eeeeee',
        })
    },
      
})



export default  Navigation = createAppContainer(StackConnectedNavigator)



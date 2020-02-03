import React from "react";
import { createAppContainer } from 'react-navigation';
import HelpPage from './Components/HelpPage';
import SignIn from './Components/SignInPage';
import UserTrip from './Components/UserTrip';
import HomePage from './Components/HomePage';
import ProfilPage from './Components/ProfilPage';
import SignUp from './Components/SignUpPage';
import MapResult from './Components/MapResult';
import TripOverview from './Components/TripOverview';
import SettingPage from './Components/SettingsPage';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator} from 'react-navigation-drawer';
import { HeaderBackButton } from 'react-navigation-stack';
import InputPageProfilHome from './Components/InputPageProfilDom';
import InputPageProfilWork from './Components/InputPageProfilWork';
import Logout from './Components/Logout';

 
const MainDrawer = createDrawerNavigator(
  {
    
  HomePage: {
  screen: HomePage,
  navigationOptions: () => ({
          header: null,
          title:'Accueil'
      })
  },
  ProfilPage: {
    screen: ProfilPage,
    navigationOptions: () => ({
            headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
            title:'Page profil'
    })
},
  UserTrip: {
    screen: UserTrip,
    navigationOptions: () => ({
        header: null,
        title: 'Vos courses'
    })
    },

    ProfilPage: {
        screen: ProfilPage,
        navigationOptions: () => ({
                headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
                title:'Page profil'
        })
    },

    HelpPage: {
    screen: HelpPage, 
    navigationOptions: () => ({
            header: null,
            title:'Help' 
        })  
    }, 
    Logout: {
        screen: Logout, 
        navigationOptions: () => ({
                header: null,
                title:'Deconnexion' 
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
    } , 

    ProfilPage: {
        screen: ProfilPage,
        navigationOptions: () => ({
            header: null,
            title: 'Profil'
        })
    },

    SignUp: {
        screen: SignUp,
        navigationOptions: () => ({
            header: null,
            title:'Créer un compte'
        })  
    }, 
    SignIn: {
        screen: SignIn,
        navigationOptions: () => ({
            header: null,
            title:'Se connecter'
        })
      },
    SettingPage:SettingPage, 

    InputPageProfilHome: {
        screen: InputPageProfilHome,
        navigationOptions: () => ({
            title:'Ajouter une adresse'
        })  
    },
    InputPageProfilWork: {
        screen: InputPageProfilWork,
        navigationOptions: () => ({
            title:'Ajouter une adresse'
        })  
    },
    
})

export default Navigation = createAppContainer(StackConnectedNavigator)



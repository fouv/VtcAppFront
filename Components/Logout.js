import React, { useEffect } from 'react';
import {View, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';

function Logout(props) {
    useEffect(() => {
        function logoutUser() {
            AsyncStorage.removeItem('userVTC');
            props.logout();
            props.logoutStatus()
            props.navigation.navigate('HomePage')
        }
        logoutUser();
    }, [])
    return(
        <View>

        </View>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        logout: function() {
            dispatch({type: 'logout'});
        },
        logoutStatus: function() {
            dispatch({type: 'logoutStatus'});
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
) (Logout)
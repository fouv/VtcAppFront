export default function UserIsConnected(isConnected = false, action) {
    if(action.type === 'checkStatus') {
        //console.log('Reducer Status');
        //console.log(isConnected)
        isConnected = action.isConnected;
       // console.log(isConnected)
        return isConnected
    } else if(action.type === 'logoutStatus') {
        isConnected = false;

        return isConnected;
    } else {
        return isConnected
    }
}
export default function User(userDatas = {}, action) {
    if(action.type === 'sign') {
       // console.log(userDatas)
        //console.log('Reducer: My action ---->' + action)
        //console.log(action)

        var cpyUser = {...userDatas}; 

        //Enregistre les infos user dans la copy du state userDatas
        cpyUser.id = action.id;
        cpyUser.firstName = action.firstName;
        cpyUser.lastName = action.lastName;
        cpyUser.email = action.email;
        cpyUser.tel = action.tel;
        cpyUser.homeaddress = action.homeaddress;
        cpyUser.officeaddress = action.officeaddress
        cpyUser.password = action.password


        //console.log('Reducer: My cpyUser ---->')
        //console.log(cpyUser);

       
        userDatas = cpyUser;

        return cpyUser
    } else if(action.type === 'saveHomeAddress') {
        var cpyUser = {...userDatas};
        cpyUser.homeaddress = action.homeaddress

        console.log('USER AFTER HOME ADDRESS ----->',cpyUser)
        userDatas = cpyUser;
        return cpyUser
    } else if(action.type === 'saveOfficeAddress') {
        var cpyUser = {...userDatas};
        cpyUser.officeaddress = action.officeaddress

        console.log('USER AFTER HOME ADDRESS ----->',cpyUser)
        userDatas = cpyUser;
        return cpyUser
    } else if(action.type === 'logout' ) {
        var resetUser = {};

        userDatas = resetUser;

        return resetUser;
    } else {
        return userDatas
    }
}
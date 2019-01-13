import { SIGN_IN, LOAD_USER, REGISTER, OPEN_PROFILE, CLOSE_PROFILE, UPDATE_PROFILE } from './constans';

const initialAuthenticate={
    isSignedIn: false,
    isRegistered: false,
    user:{
        id: 0,
        name: '',
    }
}

export const Authenticate=(state=initialAuthenticate, action:any={})=>{
    switch(action.type){
        case SIGN_IN:
            return Object.assign({}, state, { isSignedIn: true });
        case REGISTER:
            return Object.assign({}, state, { isRegistered: true });
        case LOAD_USER:
            return Object.assign({}, state, { user: action.payload });
        default:
            return state;
    }
}

const initialProfile={
    isProfileOpen: false,
    profile:{
        userId: '',
        userName: '',
    }
}

export const Profile=(state:any=initialProfile, action:any={})=>{
    switch(action.type){
        case OPEN_PROFILE:
            return Object.assign({}, state, { isProfileOpen: true })
        case CLOSE_PROFILE:
            return Object.assign({}, state, { isProfileOpen: false })
        case UPDATE_PROFILE:
            return Object.assign({}, state, { profile: action.payload })
        default:
            return state;
    }
}
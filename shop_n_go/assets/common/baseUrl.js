import {Platform} from 'react-native';

let baseURL = "";

{Platform.OS === 'android'
? baseURL = 'http://10.0.2.2:3000/api/v1/' // for android we can't put localhost as the host because it's used by android
: baseURL = 'http://localhost:3000/api.v1/'
}

export default baseURL;
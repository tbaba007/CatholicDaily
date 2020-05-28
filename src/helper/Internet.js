import NetInfo from "@react-native-community/netinfo";

const isConnected=()=>{
    return NetInfo.fetch();
}

export{
    isConnected
}
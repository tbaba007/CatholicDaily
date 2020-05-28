import AsyncStorage from '@react-native-community/async-storage';

const saveMessage=(id,text)=>{
    AsyncStorage.setItem(id,text)
    .then(success=>{
     //   console.log(success)
    }).catch(error=>{
     //   console.log(error.message)
    })
}

const getMessageById=(id)=>{
    return AsyncStorage.getItem(id);
}

const removeMessageById=(id)=>{
    return AsyncStorage.removeItem(id)
}

const removeAllKeys=(arr)=>{
    return AsyncStorage.multiRemove(arr)
}

const getAllMessages=()=>{
return AsyncStorage.getAllKeys()
}

export{
    getAllMessages,
    removeMessageById,
    getMessageById,
    saveMessage,
    removeAllKeys
}
import React,{useState,useEffect} from 'react'
import {Image,StyleSheet,SafeAreaView,Text,View} from 'react-native';
const Storage=require('../../helper/Storage');
export default function SplashScreen() {
    
    return (
        <SafeAreaView>
            <View style={{backgroundColor:'transparent'}}>
            <Image
            source={require('../../assets/images/catholicImage.png')}
            style={styles.Image}
            />
            <Text
            style={styles.Text}>
                Gospel Beyond Boundaries
            </Text>
            </View>
           
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    Image:{
        alignSelf:"center",
        marginTop:100
    },
    Text:{
        textAlign:"center"
    }
})
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './src/screens/home/SplashScreen';
import AppNav from './src/navigation/AppNav';
import IntroScreen from './src/screens/home/IntroScreen';
import Drawer from './src/navigation/AppNav';
const Storage=require('./src/helper/Storage');

const App: () => React$Node = () => {
  const [loading,setLoading]=useState(true);
  const [registered,setRegistered]=useState(false);
  const [user,setUser]=useState(null);
    const userRegistered=()=>{
        Storage.getMessageById('registered')
        .then(success=>{
            if(success!==null)
            {
              setUser(success);
                setRegistered(true);
            }
        }).catch(error=>{
            console.log(error.message);
        })
    }

    useEffect(()=>{
        userRegistered();
    },[]);

    const skip=()=>{
      setLoading(false);
      setRegistered(true);
    }
  setTimeout(()=>{
    setLoading(false)
  },5000)
  return (
    <>
      {
      loading?
      (
        <SplashScreen/>

      )
      :
      registered?
      (
        // <AppNav user={user}/>
        <Drawer user={user}/>
      )
      :
      (
        <IntroScreen skip={skip}/>
      )
      }
    </>
  );
};



export default App;

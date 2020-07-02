import React,{useState} from'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationActions, StackActions } from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './Menu';
import { SafeAreaView,Text,View,TouchableHighlight } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppHeader from './AppHeader';
import {Icon} from 'react-native-elements';
import DashBoard from '../screens/home/DashBoard';
import Index from '../screens/prayers/Index';
import HymnIndex from '../screens/hymns/HymnIndex';
import NovenaList from '../screens/prayers/traditional/TraditionalList';
import DisplayPrayer from '../screens/prayers/traditional/DisplayPrayer';
import RosaryList from '../screens/prayers/rosary/RosaryList';
import ShowHymn from '../screens/hymns/ShowHymn';
import DailyReadings from '../screens/readings/DailyReadings';
import StationsOfTheCross from '../screens/station_of_the_cross/StationsOfTheCross';
import SettingsList from '../screens/usersettings/SettingsList';
import Reminders from '../screens/usersettings/Reminders';
import OfflineReadings from '../screens/readings/OfflineReadings';
import DownloadReadings from '../screens/usersettings/DownloadReadings'; 
import DisplayReadings from '../screens/readings/DisplayReadings';
import RosaryOption from '../screens/prayers/rosary/RosaryOption';
import RosaryAudio from '../screens/prayers/rosary/RosaryAudio';
import HomilyList from '../screens/readings/HomilyList';
import AddHomily from '../screens/readings/AddHomily';
import EditHomily from '../screens/readings/EditHomily';
import DisplayHomily from '../screens/readings/DisplayHomily';
const Drawer = createDrawerNavigator();
const HymnStack=createStackNavigator();
const HomeStack=createStackNavigator();
const PrayerStack=createStackNavigator();
const DailyStack=createStackNavigator();
const StationStack=createStackNavigator();
const SettingsStack=createStackNavigator();
const BottomTabNavigator=createBottomTabNavigator();
 
const AppNav=(props)=>{
    const [navigation,setNavigation]=useState(null);

    const openDrawer=()=>{
        navigation.openDrawer();
    }
    const closeDrawer=()=>{
        navigation.closeDrawer();
    }

    const headerLeft=()=>{
      return  <View style={{paddingLeft: 5}}>
        <TouchableHighlight
        onPress={openDrawer}
        underlayColor="transparent">
        <Icon
      size={35}
      name="home"
      color="maroon"/>
        </TouchableHighlight>
      
      </View>
    }

const reset=(menu)=>{
    const resetAction = StackActions.reset({
        index: 0,
        key: null, // <-- this
        actions: [NavigationActions.navigate({ routeName: menu })]
    })
      navigation.dispatch(resetAction);
}

    const routeToScreen=(name)=>{
        switch (name) {
            case '0':
                navigation.navigate('Home'); 
               
                closeDrawer(); 
            break;
            case '1':
                navigation.navigate('prayer'); 
                closeDrawer(); 
            break;
            case '2':
               // reset('DailyReadings'); 
                navigation.navigate('DailyReadings'); 
                closeDrawer(); 
                break;
            case '3':
                navigation.navigate('hymn'); 
                closeDrawer(); 
                break;
            case '4':
                navigation.navigate('stationsOfTheCross'); 
                closeDrawer(); 
                break;
            case '6':
                navigation.navigate('UserPreferences'); 
                closeDrawer(); 
                break;
                
            default:
                break;
        }
    }

    const menu=()=>{
        return (
            <SafeAreaView>
                <Menu router={routeToScreen} user={props.user}/>
            </SafeAreaView>
        )
    }

    const Tabs=()=>{
        return <BottomTabNavigator.Navigator>
            <BottomTabNavigator.Screen name="Offline Readings" initialParams="0" component={OfflineReadings}
             options={{tabBarIcon:({tintColor})=>(  
                <Icon name="home" color={tintColor} size={25}/>  
            ),unmountOnBlur:true}}/>

            <BottomTabNavigator.Screen name="Homily" initialParams="0" component={HomilyList}
             options={{tabBarIcon:()=>(  
                <Icon name="book" color='green' size={25}/>  
            ),unmountOnBlur:true}}/>

            <BottomTabNavigator.Screen name="Online Readings" component={DailyReadings} 
            options={{tabBarIcon:()=>(  
                <Icon name="cloud" color='red' size={25}/>  
            ),unmountOnBlur:true}}
            />
        </BottomTabNavigator.Navigator>
    }


    

    const prayerScreen=()=>{
        
        return <PrayerStack.Navigator>
            <PrayerStack.Screen name="prayer" component={Index} options={{title:'Prayers',headerLeft:headerLeft}}/>
            <PrayerStack.Screen name="NovenaList" component={NovenaList} options={({route})=>({
                title:route.params.name
            })}/>
            <PrayerStack.Screen name="RosaryList" component={RosaryList} options={({route})=>({
                title:'Holy Rosary'
            })}/>
            <PrayerStack.Screen name="DisplayPrayer" component={DisplayPrayer} options={({route})=>({
                title:route.params.prayer.name
            })}/>
             <PrayerStack.Screen name="RosaryOption" component={RosaryOption} options={({route})=>({
                title:'Rosary Options'
            })}/>
            <PrayerStack.Screen name="RosaryAudio" component={RosaryAudio} options={({route})=>({
                title:'Rosary Audio'
            })}/>

        </PrayerStack.Navigator>
    }

    const stationsOfTheCross=()=>{
        return <StationStack.Navigator>
            <StationStack.Screen name="StationsOfTheCross" component={StationsOfTheCross} options={{title:'Stations of the cross',headerLeft:headerLeft}}/>
        </StationStack.Navigator>
    }

    const hymnScreen=()=>{
        return <HymnStack.Navigator>
            <HymnStack.Screen name="Catholic Hymn Book" component={HymnIndex} options={{headerLeft:headerLeft}}/>
            <HymnStack.Screen name="ShowHymn" component={ShowHymn} options={({route})=>(
                {
                    title:route.params.HymnName
                }
            )}/>
            </HymnStack.Navigator>
    }

    const settingsScreen=()=>{
        return <SettingsStack.Navigator>
            <SettingsStack.Screen name="SettingsList" component={SettingsList} 
            options={{title:'User Preferences',headerLeft:headerLeft}}/>
            <SettingsStack.Screen name="Reminders" component={Reminders}/>
            <SettingsStack.Screen name="DownloadReadings" component={DownloadReadings} options={{headerBackTitle:'Go Back', title:'Download Readings'}}/>
        </SettingsStack.Navigator>
    }

    const dailyReadings=()=>{
        return <DailyStack.Navigator>
            <DailyStack.Screen name="Daily Readings" component={Tabs} options={{headerLeft:headerLeft,
           
            }}/>

           <DailyStack.Screen name="EditHomily" component={EditHomily} options={{title:'Edit Homily'}}/>
           <DailyStack.Screen name="AddHomily" component={AddHomily} options={{title:'Add Homily'}}/>
           <DailyStack.Screen name="DisplayHomily" component={DisplayHomily} options={{title:'View Homily'}}/>
           
            <DailyStack.Screen name="Readings" component={DisplayReadings} options={({route})=>(
                {
                   
                }
            )}

            
        />

        </DailyStack.Navigator>
    }
    
    const homeScreen=({navigation})=>{
        
       setNavigation(navigation);

       return <HomeStack.Navigator>
           <HomeStack.Screen name="Home" component={DashBoard} options={{
               title:'Welcome',headerLeft:headerLeft
           }} />
       </HomeStack.Navigator>
        
    }

    
    return(
        <React.Fragment>
          
            <NavigationContainer>
              <Drawer.Navigator statusBarAnimation="none" drawerType="slide" drawerPosition="left"
                drawerStyle={{marginTop:1}} drawerContent={menu} initialRouteName="homeScreen"
                overlayColor="green" >
                <Drawer.Screen name="Home" component={homeScreen} options={{unmountOnBlur:true}} />
                <Drawer.Screen name="prayer" component={prayerScreen} options={{unmountOnBlur:true}}/>
                <Drawer.Screen name="DailyReadings" component={dailyReadings} options={{unmountOnBlur:true}}/>
                <Drawer.Screen name="stationsOfTheCross" component={stationsOfTheCross} options={{unmountOnBlur:true}}/>
                <Drawer.Screen name="hymn" component={hymnScreen} options={{unmountOnBlur:true}}/>
                <Drawer.Screen name="UserPreferences" component={settingsScreen} options={{unmountOnBlur:true}}/>
              </Drawer.Navigator>
            </NavigationContainer>
        </React.Fragment>
    )
}

export default AppNav;
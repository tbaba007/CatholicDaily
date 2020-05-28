import React from 'react'
import {ScrollView,
    View,
    SafeAreaView,
    Text,
StyleSheet} from 'react-native';
function DisplayPrayer(props) {
    let{prayer}=props.route.params.prayer;
    
    return (
        <SafeAreaView>
            <ScrollView>
             
            <Text style={style.DisplayPrayer}>{props.route.params.prayer.prayer}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}
const style=StyleSheet.create({
    DisplayPrayer:{
        textAlign:'left',
        marginTop:20,
        lineHeight:30,
        marginRight:20,
        marginLeft:20
    }
})
export default DisplayPrayer

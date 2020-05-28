import React from 'react';
import {View,
    SafeAreaView,
    Share,
    TouchableHighlight,
    StyleSheet,
    Text,
    Alert,
    YellowBox} from 'react-native';
import {Icon} from 'react-native-elements';

const DisplayHomily=(props)=>{
    YellowBox.ignoreWarnings(['componentWillReceiveProps']);
    let {response,date}=props.route.params.item;
    let {_delete}=props.route.params._delete;
    const deleteHomily=()=>{
        Alert.alert('Prompt','Are you sure you want to delete?',[{
            text:'No'
        },{
            text:'Yes',
            onPress:()=>{
                props.route.params._delete(date);
                props.route.params.homilyList.length=0;
                props.route.params.setDeleteID(Math.floor(Math.random() * 100) + 1)
                Alert.alert('Success','Homily Deleted Successfully!',[
                    {
                        text:'OK',
                        onPress:props.navigation.pop()
                    }
                ])

                
                }
        }])
    }

    const shareHomily=async(id)=>{
        try{
            const result=await Share.share({
                message:id
            });
            if(result.action===Share.sharedAction)
            {
                if(result.activityType)
                {

                }
                else
                {

                }
            }
         else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        }
        catch(error)
        {
            alert(error)
        }
    }
    return (
        <SafeAreaView>
            <View>
            <Text style={style.Header} selectable={true}> Title: {JSON.parse(response).title}</Text>
            <Text style={style.Body}>{JSON.parse(response).homily}</Text>
            <View style={style.View}>
            <TouchableHighlight style={style.Delete} onPress={()=>deleteHomily()}>
                    
                    <View style={{flexDirection:'row',marginLeft:10}}>
                    <Icon name="delete" color={style.Delete.color} containerStyle={{marginTop:10}}/>
                    <Text style={{color:style.Delete.color,marginTop:10}}>Delete</Text>
                    </View>
              
              
            </TouchableHighlight>

                <TouchableHighlight style={style.Share} onPress={()=>shareHomily(JSON.parse(response).homily)}>
                    
                        <View style={{flexDirection:'row',marginLeft:10}}>
                        <Icon name="share" color={style.Share.color} containerStyle={{marginTop:10}}/>
                        <Text style={{color:style.Share.color,marginTop:10}}>share</Text>
                        </View>
                  
                  
                </TouchableHighlight>
            </View>
            </View>

        </SafeAreaView>
    )
}

const style=StyleSheet.create({
    Header:{
        marginLeft:30,
        marginTop:30,
        fontWeight:"bold",
        fontSize:30,
        
    },
    Body:{
        fontWeight:"bold",
        fontSize:20,
        marginLeft:38,
        marginTop:10,
    },
    View:{
        flexDirection:'row',
        alignSelf:'center',
        marginTop:30
    },
    Delete:{
        marginRight:20,
        width:100,
        backgroundColor:'red',
        borderRadius:20,
        height:50,
        color:'white',
        textAlign:"center"
    },
    Share:{
        marginRight:20,
        width:100,
        backgroundColor:'green',
        borderRadius:20,
        height:50,
        color:'white',
        textAlign:"center"
    }
})

export default DisplayHomily;
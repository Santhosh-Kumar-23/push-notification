import React, {useState} from 'react';
import { View,Text } from 'react-native';


const ErrorMessageComponents =({name=""})=>{
    return(
        <View>
            <Text style={{color:"red",fontWeight:"600",marginTop:4}}>{name}</Text>

        </View>
    )
}

export default ErrorMessageComponents
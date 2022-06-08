import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

// icons
// https://icons.expo.fyi
import { Ionicons } from '@expo/vector-icons';

import { Colors, Metrics } from '../values'

export default props => {
  const { style, ...rest } = props

  const [escondido, setEscondido] = useState(true)

  return(
    <View style={ [Estilo.container, style] }> 

      <TextInput style={ Estilo.input } { ...rest }
                 secureTextEntry={ escondido }/>

      <TouchableOpacity onPress={ () => setEscondido(!escondido) }> 
        <Ionicons name={ escondido ? "eye-off-sharp" : "eye-sharp"  } 
                  size={24} 
                  color={ Colors.dark } />
      </TouchableOpacity>
     
    </View>
  )
}

const Estilo = StyleSheet.create(
  {
    container:{
      flexDirection: 'row',
      height: 48,
      borderWidth: 1,
      borderRadius: Metrics.radius.base,
      paddingHorizontal: Metrics.padding.base,
      backgroundColor: Colors.white,
      alignItems: 'center'
    },
    input: {
      flexGrow: 1,
      marginRight: Metrics.margin.small,
      paddingVertical: Metrics.padding.small
    }
  }
)
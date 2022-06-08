import React, { useState, useEffect} from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Colors, Metrics, Fonts } from '../values'

import { MyButton } from '../components'

// Icons https://icons.expo.fyi/
import { MaterialIcons } from '@expo/vector-icons';

export default props => {

  //console.log(Object.keys(props))
  //console.log(props.route.params)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [continente, setContinente] = useState('')

  // executa a função na abertura da tela de perfil
  useEffect(()=> carregaInformacoes())

  async function carregaInformacoes(){
    try{
      const cadastro = await AsyncStorage.getItem(props.route.params.email)

      const Usuario = JSON.parse(cadastro)

      setNome(`${Usuario.nome} ${Usuario.sobrenome}`)
      setEmail(Usuario.email)
      setContinente(Usuario.continente)
      
    }catch(err){
      console.log(err)
    }
  } 

  function confirmExit(){
    Alert.alert('Sair', 'Deseja realmente sair?', [
      {
        text:'Sim',
        onPress(){
          props.navigation.reset(
            {
              index: 0,
              routes:[{name:'LoginScreen'}]
            }
          )
        }
      },
      {
        text:'Não'
      }
    ])
  }

  return(
    <View style={ Estilo.container }> 
      <Text style={ Estilo.textTitle }> 
        Seja Bem Vindo(a)
      </Text>

      <View style={ Estilo.containerIconText }> 
        <MaterialIcons name="perm-identity" 
                       size={24} 
                       color={ Colors.white } />
        <Text style={ Estilo.text }> 
          {nome}
        </Text>
      </View>

      <View style={ Estilo.containerIconText }> 
        <MaterialIcons name="mail-outline" 
                       size={24} 
                       color={ Colors.white } />
        <Text style={ Estilo.text }> 
         {email}
        </Text>
      </View>

      <View style={ Estilo.containerIconText }> 
        <MaterialIcons name="language" 
                       size={24} 
                       color={ Colors.white } />
        <Text style={ Estilo.text }> 
          {continente}
        </Text>
      </View>

      <MyButton title='Site Cel.Lep' 
                style={ Estilo.button }
                onPress={()=> props.navigation.navigate('WebScreen')}
                />

      <MyButton title='Sair' 
                style={ Estilo.button }
                onPress={ confirmExit } />

    </View>
  )
}

const Estilo = StyleSheet.create(
  {
    container: {
      flexGrow: 1,
      backgroundColor: Colors.background,
      justifyContent: 'center',
      padding: Metrics.padding.base
    },
    textTitle: {
      fontSize: Fonts.title,
      color: Colors.white,
      marginBottom: Metrics.margin.base
    },
    text: {
      color: Colors.white,
      fontSize: Fonts.base,
      marginLeft: Metrics.margin.small
    },
    containerIconText: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Metrics.margin.base
    },
    button: {
      marginBottom: Metrics.margin.base
    }
  }
)
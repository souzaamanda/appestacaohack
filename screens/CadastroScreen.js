import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Colors, Metrics } from '../values'

// icons
// https://icons.expo.fyi
import { MaterialIcons } from '@expo/vector-icons';

import { MyButton, MyTextInput, MyPasswordInput } from '../components'

export default props => {

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [continente, setContinente] = useState('')

  const listaContinentes = [
    'América do Norte',
    'América central',
    'América do Sul',
    'Europa',
    'Ásia',
    'África',
    'Oceania',
    'Antártida'
  ]

  async function cadastrar(){
    // consistencia
    if(nome == '' || sobrenome == '' || email == '' || senha == '' || continente == ''){
      alert('Preencha todos os campos')
      return
    }

    const Usuario = {
      nome: nome,
      sobrenome: sobrenome,
      email: email.trim().toLowerCase(),
      senha: senha.trim(),
      continente: continente
    }

    try{
      const dados = await JSON.stringify(Usuario)

      // salva as informações do usuaário no arquivo com nome do email
      await AsyncStorage.setItem(Usuario.email, dados)

      // navegação para a tela de Perfil
      props.navigation.reset(
        {
          index: 0,
          routes: [ 
                    { 
                      name: 'PerfilScreen', 
                      params: { email: Usuario.email } 
                    } 
                  ]
        }
      )
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <ScrollView style={ Estilo.container }> 

      <View style={ Estilo.containerIcon }> 
        <MaterialIcons name="person-add" 
                       size={100} 
                       color={ Colors.white } />      
      </View>

      <MyTextInput placeholder='Nome' 
                   style={ Estilo.formItem }
                   value={ nome }
                   onChangeText={ char => setNome(char) }/>
      
      <MyTextInput placeholder='Sobrenome' 
                   style={ Estilo.formItem }
                   value={ sobrenome }
                   onChangeText={ char => setSobrenome(char) }/>
      
      <MyTextInput placeholder='E-mail' 
                   keyboardType='email-address'
                   style={ Estilo.formItem }
                   value={ email }
                   onChangeText={ char => setEmail(char) }/>

      <View style={ [Estilo.containerPicker, Estilo.formItem] }> 
        <Picker style={ Estilo.picker }
                selectedValue={ continente }
                onValueChange={ (value, index) => setContinente(value)}> 
          <Picker.Item value='' label='Continente' />
          {
            listaContinentes.map( (value, index) => (
                <Picker.Item value={ value } label={ value } />
              ) 
            )
          }
        </Picker>
      </View>
      
      <MyPasswordInput placeholder='Senha' 
                       keyboardType='numeric'
                       style={ Estilo.formItem }
                       value={ senha }
                       onChangeText={ char => setSenha(char) }/>

      <MyButton title='Cadastrar' 
                onPress={ cadastrar }/>
     
    </ScrollView>
  )
}

const Estilo = StyleSheet.create(
  {
    container: {
      flexGrow: 1,
      backgroundColor: Colors.background,
      padding: Metrics.padding.base
    },
    containerIcon:{
      alignItems: 'center'
    },
    formItem: {
      marginBottom: Metrics.margin.base
    },
    containerPicker: {
      borderWidth: 1,
      borderRadius: Metrics.radius.base,
      backgroundColor: Colors.white,
      justifyContent: 'center'
    },
    picker: {
      paddingVertical: Metrics.padding.small,
      paddingHorizontal: Metrics.padding.base,
      borderWidth: 0,
      backgroundColor: Colors.white
    }
  }
)
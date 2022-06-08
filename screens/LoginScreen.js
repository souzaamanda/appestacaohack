import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Colors, Metrics } from '../values'

import { MyButton, MyPasswordInput, MyTextInput } from '../components'

export default props => {

  //console.log(Object.keys(props))

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function fazerLogin(){
    // consistencias
    if(email == ''){
      alert('Preencha o E-mail')
      return
    } else if(senha == ''){
      alert('Preencha a senha')
      return
    }

    // validação e-mail e senha
    try{

      const cadastro = await AsyncStorage.getItem(email.trim().toLowerCase())

      const Usuario = JSON.parse(cadastro)

      if(Usuario == null){
        alert('Usuário não localizado')
      } else if(senha == Usuario.senha){
        // navegar para a tela de perfil, colocando ela como primeira da lista
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
      } else {
        alert('Usuário ou senha inválidos!')
      }
    } catch(err) {
      console.log(err)
    }

  }

  return(
    <View style={ Estilo.container }> 

      <View style={ Estilo.containerLogin }> 
        <View style={ Estilo.containerLogoCellep}> 
          <Image source={ require('../assets/logo_cellep.png') } />   
        </View>

        <MyTextInput placeholder='E-mail'
                     keyboardType='email-address'
                     style={ Estilo.formItem }
                     value={ email }
                     onChangeText={ char => setEmail(char) }/>

        <MyPasswordInput placeholder='Senha'
                         keyboardType='numeric'
                         style={ Estilo.formItem }
                         value={ senha }
                         onChangeText={ char => setSenha(char) }/>

        <MyButton title='Entrar'
                  style={ Estilo.formItem }
                  onPress={ fazerLogin }/>

        <View style={ Estilo.containerCadastro }> 
          <Text style={ Estilo.cadastroText }> 
            Não tem cadastro?
          </Text>
          <TouchableOpacity onPress={ () => props.navigation.navigate('CadastroScreen') }> 
            <Text style={ Estilo.cadastroTextLink }> 
              Clique Aqui
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>

      <View style={ Estilo.containerLogoHack}> 
        <Image source={require('../assets/logo_estacao_hack.png')} 
               style={ Estilo.logoEH }/>
      </View>
     
    </View>
  )
}

const Estilo = StyleSheet.create(
  {
    container: {
      flexGrow: 1,
      backgroundColor: Colors.background,
      padding: Metrics.padding.base 
    },
    containerLogin: {
      flexGrow: 1,
      justifyContent: 'center'
    },
    containerLogoCellep: {
      alignItems: 'center',
      marginBottom: Metrics.margin.base
    },
    formItem: {
      marginBottom: Metrics.margin.base
    },
    containerCadastro: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    cadastroText: {
      color: Colors.white
    },
    cadastroTextLink: {
      color: Colors.primary,
      fontWeight: 'bold',
      paddingLeft: Metrics.padding.small
    },
    logoEH: {
      width: 100,
      height: 100,
      resizeMode: 'contain'
    },
    containerLogoHack:{
      alignItems: 'flex-end'
    }
  }
)
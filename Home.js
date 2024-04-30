import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Cadastro from './Cadastro';
import Perfil from './Editar_Perfil';
import CadastroEscola from './Cadastro_Escola'; 
import CadastroAluno from './Cadastro_Aluno';

const Stack = createStackNavigator();

const WelcomeScreen = ({ navigation }) => {

  const mostrarPerfil = () => {
    navigation.navigate('Perfil');
  }

  const mostrarViagem = () => {
    navigation.navigate('Viagem');
  }

  const mostrarCadastro = () => {
    navigation.navigate('Cadastro');
  }

  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>Bem-vindo motorista</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon} onPress={mostrarPerfil}>
          <Image source={require('./assets/perfil_icon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={mostrarViagem}>
          <Image source={require('./assets/viagem_icon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Viagem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={mostrarCadastro}>
          <Image source={require('./assets/cadastro_icon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Início" component={WelcomeScreen} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="CadastroEscola" component={CadastroEscola} />
        <Stack.Screen name="CadastroAluno" component={CadastroAluno} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcomeTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  icon: {
    alignItems: 'center',
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  iconText: {
    marginTop: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

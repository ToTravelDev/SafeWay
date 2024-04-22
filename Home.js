import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = () => {

  const mostrarPerfil = () => {
    // Lógica para navegar para a tela de perfil
  }

  const mostrarViagem = () => {
    // Lógica para navegar para a tela de viagem
  }

  const mostrarCadastro = () => {
    // Lógica para navegar para a tela de cadastro
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
});

export default WelcomeScreen;

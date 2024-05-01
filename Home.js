import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = ({ navigation , userInfo  }) => {

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
      <Text style={styles.welcomeTitle}>Bem-vindo {userInfo.name}</Text>
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

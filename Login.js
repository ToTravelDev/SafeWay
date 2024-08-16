import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation, setUserInfo }) => {
  const [userInfo, setUserInfoState] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '1024782208301-qdolc7nipej618h19cn5gg2umeesfmd7.apps.googleusercontent.com',
    iosClientId: '1024782208301-0fldioc8l3mic9aa7sq3vt7756ki5eo9.apps.googleusercontent.com',
    webClientId: '1024782208301-1ifdiopbjfg791qnksiqge10iak35q1k.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem('@user');
    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfoState(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) {
      console.error('Token de acesso ausente');
      return;
    }
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Falha ao buscar informações do usuário');
      }
      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfoState(user);
      setUserInfo(user); // Set userInfo in App.js
      navigation.navigate('Início');
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  };

  const handleLoginButtonPress = async () => {
    await promptAsync();
  };

  const handleDefaultLoginButtonPress = async () => {
    if (username === 'Safe' && password === '1234') {
      const user = {
        name: username,
        email: 'safeway@example.com',
        picture: 'https://via.placeholder.com/150',
      };

      // Salve as informações do usuário no AsyncStorage
      await AsyncStorage.setItem('@user', JSON.stringify(user));

      // Atualize as informações do usuário no estado local do componente
      setUserInfoState(user);

      // Passe as informações do usuário para o componente pai (App.js)
      setUserInfo(user);

      // Navegue para a tela de boas-vindas
      navigation.navigate('Início');
    } else {
      console.error('Nome de usuário ou senha incorretos');
    }
  };

  const handleLogoutButtonPress = async () => {
    // Limpe os dados de usuário do AsyncStorage
    await AsyncStorage.removeItem('@user');
    // Limpe os dados de usuário do estado local do componente
    setUserInfoState(null);
    // Limpe os dados de usuário do componente pai (App.js)
    setUserInfo(null);
  };

  const handleCadastroButtonPress = () => {
    navigation.navigate('Registro');
  };

  return (
    <View style={styles.container}>
      {userInfo && (
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: userInfo.picture }} style={styles.userAvatar} />
          <View style={styles.userInfo}>
            <Text>Usuário: {userInfo.name}</Text>
            <Text>Email: {userInfo.email}</Text>
          </View>
          <Button title="Sair" onPress={handleLogoutButtonPress} />
        </View>
      )}
      <Button title="Login com Google" onPress={handleLoginButtonPress} />
      <Text>OU</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login Padrão" onPress={handleDefaultLoginButtonPress} />
      <Button title="Cadastrar-se" onPress={handleCadastroButtonPress} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Login;

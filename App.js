import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "1024782208301-qdolc7nipej618h19cn5gg2umeesfmd7.apps.googleusercontent.com",
    iosClientId: "1024782208301-0fldioc8l3mic9aa7sq3vt7756ki5eo9.apps.googleusercontent.com",
    webClientId: "1024782208301-1ifdiopbjfg791qnksiqge10iak35q1k.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type == "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) {
      console.error('Token de acesso ausente');
      return;
    }
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error('Falha ao buscar informações do usuário');
      }
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
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
        </View>
      )}
      <Text>Code with vitor</Text>
      <Button title="Login com Google" onPress={() => promptAsync()} />
      <Button
        title="Sair"
        onPress={() => AsyncStorage.removeItem("@user")}
      />
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
});

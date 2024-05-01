import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import WelcomeScreen from './Home';
import Perfil from './Editar_Perfil';
import Cadastro from './Cadastro';
import CadastroEscola from './Cadastro_Escola';
import CadastroAluno from './Cadastro_Aluno';

const Stack = createStackNavigator();

const App = () => {
  const [userInfo, setUserInfo] = React.useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {props => <Login {...props} setUserInfo={setUserInfo} />}
        </Stack.Screen>
        <Stack.Screen name="Welcome">
          {props => <WelcomeScreen {...props} userInfo={userInfo} />}
        </Stack.Screen>
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="CadastroEscola" component={CadastroEscola} />
        <Stack.Screen name="CadastroAluno" component={CadastroAluno} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

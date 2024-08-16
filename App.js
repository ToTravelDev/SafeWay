import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import WelcomeScreen from './Home';
import Perfil from './Editar_Perfil';
import Cadastro from './Cadastro';
import CadastroEscola from './Cadastro_Escola';
import CadastroAluno from './Cadastro_Aluno';
import AlunosCadastrados from './Alunos_Cadastrados';
import Registro from './Registro';
import Viagem from './Viagem';

const Stack = createStackNavigator();

const App = () => {
  const [userInfo, setUserInfo] = React.useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {props => <Login {...props} setUserInfo={setUserInfo} />}
        </Stack.Screen>

        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Viagem" component={Viagem} />
        <Stack.Screen name="Início">
          {props => <WelcomeScreen {...props} userInfo={userInfo} />}
        </Stack.Screen>

        <Stack.Screen name="Perfil" options={{headerShown: false}}>
          {props => <Perfil {...props} userInfo={userInfo} />}
        </Stack.Screen>

        <Stack.Screen name="Cadastro" component={Cadastro} />

        <Stack.Screen name="CadastroEscola" component={CadastroEscola} />

        <Stack.Screen name="CadastroAluno" component={CadastroAluno} />

        <Stack.Screen name="AlunosCadastrados" component={AlunosCadastrados} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default App;

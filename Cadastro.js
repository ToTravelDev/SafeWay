import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Cadastro = ({ navigation }) => {
  const irParaCadastroEscola = () => {
    navigation.navigate('CadastroEscola');
  };

  const irParaCadastroAluno = () => {
    navigation.navigate('CadastroAluno');
  };

  const irParaAlunosCadastrados = () => {
    navigation.navigate('AlunosCadastrados');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonAlunosCadastrados} onPress={irParaAlunosCadastrados}>
        <Text style={styles.buttonText}>Alunos cadastrados</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Escolha o tipo de cadastro:</Text>
      <TouchableOpacity style={styles.button} onPress={irParaCadastroEscola}>
        <Text style={styles.buttonText}>Cadastro Escola</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={irParaCadastroAluno}>
        <Text style={styles.buttonText}>Cadastro Aluno</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonAlunosCadastrados: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default Cadastro;

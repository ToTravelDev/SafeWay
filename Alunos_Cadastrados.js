import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const AlunosCadastrados = ({ navigation }) => {
  const [alunos, setAlunos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3001/usuario/');
      const alunosFiltrados = response.data.filter((aluno) => aluno.usuario_tipo === "Aluno");
      setAlunos(alunosFiltrados);
    } catch (error) {
      console.error('Erro ao obter alunos:', error);
    }
  };

  const handleAlunoPress = (aluno) => {
    setAlunoSelecionado(aluno);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alunos Cadastrados</Text>
      {alunoSelecionado ? (
        <View style={styles.alunoDetalhes}>
          <Text style={styles.alunoDetalhesText}>Nome: {alunoSelecionado.usu_nome}</Text>
          <Text style={styles.alunoDetalhesText}>Cidade: {alunoSelecionado.usu_cidade}</Text>
          <Text style={styles.alunoDetalhesText}>Estado: {alunoSelecionado.usu_uf}</Text>
          <Text style={styles.alunoDetalhesText}>Rua: {alunoSelecionado.usu_end_rua}</Text>
          <Text style={styles.alunoDetalhesText}>Número: {alunoSelecionado.usu_end_numero}</Text>
          <Text style={styles.alunoDetalhesText}>Complemento: {alunoSelecionado.usu_end_complemento}</Text>
          <Text style={styles.alunoDetalhesText}>CEP: {alunoSelecionado.usu_end_cep}</Text>
          {/* Adicione outras informações do aluno aqui */}
          <TouchableOpacity style={styles.button} onPress={() => setAlunoSelecionado(null)}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={alunos}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.alunoItem} onPress={() => handleAlunoPress(item)}>
              <Text>{item.usu_nome}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => (item.id ? item.id.toString() : item.usu_nome)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alunoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  alunoDetalhes: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  alunoDetalhesText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AlunosCadastrados;

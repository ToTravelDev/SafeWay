import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';

const Registro = ({ navigation }) => {
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');

  const formatarCPF = (value) => {
    // Remove caracteres não numéricos
    let cpfFormatado = value.replace(/\D/g, '');

    // Adiciona pontos e traço conforme o formato
    cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, '$1.$2');
    cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, '$1.$2');
    cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return cpfFormatado;
  };

  const formatarTelefone = (value) => {
    // Remove caracteres não numéricos
    let telefoneFormatado = value.replace(/\D/g, '');

    // Adiciona parênteses e traço conforme o formato
    telefoneFormatado = telefoneFormatado.replace(/^(\d{2})(\d)/g, '($1) $2');
    telefoneFormatado = telefoneFormatado.replace(/(\d)(\d{4})$/, '$1-$2');

    return telefoneFormatado;
  };

  const handleCepBlur = async () => {
    if (cep.length !== 8) {
      return;
    }
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        Alert.alert('CEP Inválido', 'Por favor, insira um CEP válido.');
      } else {
        setRua(response.data.logradouro);
        setCidade(response.data.localidade);
        setEstado(response.data.uf);
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o endereço. Por favor, tente novamente.');
    }
  };

  const handleSubmit = () => {
    // Validação dos campos
    if (!nome || !cpf || !cep || !numero || !cidade || !estado || !email || !senha || !telefone) {
      Alert.alert('Preencha todos os campos');
      return;
    }
   
    const usuario = {
      usu_nome: nome,
      usu_cpf: cpf,
      usuarioEndereco: {
        cep: cep,
        rua: rua,
        numero: numero,
        complemento: complemento,
      },
      usu_cidade: cidade,
      usu_uf: estado,
      tp_usu: "2", // Tipo motorista
      login: {
        email: email,
        senha: senha,
      },
      telefone: telefone,
    };
    // Enviar os dados para o servidor
    axios.post('http://10.0.2.2:3001/usuario/store', usuario)
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        Alert.alert('Usuário cadastrado com sucesso');
        // Limpar os campos após o cadastro
        setCep('');
        setRua('');
        setNumero('');
        setComplemento('');
        setCidade('');
        setEstado('');
        setNome('');
        setCpf('');
        setEmail('');
        setSenha('');
        setTelefone('');
      })
      .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente.');
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Registro</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={formatarCPF(cpf)}
            onChangeText={value => setCpf(formatarCPF(value))}
            keyboardType="numeric"
            maxLength={14}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={formatarTelefone(telefone)}
            onChangeText={value => setTelefone(formatarTelefone(value))}
            keyboardType="phone-pad"
            maxLength={15}
          />
          <TextInput
            style={styles.input}
            placeholder="CEP"
            value={cep}
            onChangeText={setCep}
            onBlur={handleCepBlur}
            keyboardType="numeric"
            maxLength={8}
          />
          {rua !== '' && (
            <TextInput
              style={styles.input}
              placeholder="Rua"
              value={rua}
              onChangeText={setRua}
              editable={false}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Número"
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Complemento"
            value={complemento}
            onChangeText={setComplemento}
          />
          {cidade !== '' && (
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              value={cidade}
              onChangeText={setCidade}
              editable={false}
            />
          )}
          {estado !== '' && (
            <TextInput
              style={styles.input}
              placeholder="Estado"
              value={estado}
              onChangeText={setEstado}
              editable={false}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Registro;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import axios from 'axios';

const CadastroEscola = () => {
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [nomeEscola, setNomeEscola] = useState('');
  const [telefone, setTelefone] = useState('');
  const [numero, setNumero] = useState('');
  const [cepDone, setCepDone] = useState(false);
  const [camposVazios, setCamposVazios] = useState([]);
 

  const handleCepBlur = () => {
    if (cep.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          Alert.alert('CEP Inválido', 'Por favor, insira um CEP válido.');
        } else {
          setRua(data.logradouro);
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf);
          setCepDone(true);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar endereço:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao buscar o endereço. Por favor, tente novamente.');
      });
  };

  const handleSubmit = () => {
    // Verificar se algum dos campos obrigatórios está vazio
    const camposObrigatorios = [{ nome: 'Nome da Escola', valor: nomeEscola }, { nome: 'CEP', valor: cep }];
    const camposVazios = camposObrigatorios.filter(campo => !campo.valor.trim());
    setCamposVazios(camposVazios.map(campo => campo.nome));

    if (camposVazios.length > 0) {
      Alert.alert('Preencha os campos obrigatórios');
      return;
    }

    const dadosEscola = {
      es_desc: nomeEscola,
      es_ativo: true, 
      es_cep: cep,
      es_rua: rua,
      es_numero: numero,
      es_complemento: telefone
    };

    // Fazer a requisição HTTP para a API
    axios.post('http://10.0.2.2:3001/escola/store', dadosEscola)
      .then(response => {
        // Manipular a resposta, se necessário
        console.log('Resposta da API:', response.data);
        setCep('');
        setRua('');
        setBairro('');
        setCidade('');
        setEstado('');
        setNomeEscola('');
        setTelefone('');
        setCepDone(false);
        setCamposVazios([]);
        // Exibir mensagem de sucesso
        Alert.alert('Cadastro realizado com sucesso!');
      })
      .catch(error => {
        // Tratar erros
        console.error('Erro ao cadastrar escola:', error);
        // Exibir mensagem de erro
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a escola. Por favor, tente novamente.');
      });
  };
  
  const formatPhoneNumber = (input) => {
    let phoneNumber = input.replace(/\D/g, '');
    phoneNumber = phoneNumber.substring(0, 11);
    phoneNumber = phoneNumber.replace(/^(\d{2})(\d)/g, '($1) $2');
    phoneNumber = phoneNumber.replace(/(\d)(\d{4})$/, '$1-$2');
    setTelefone(phoneNumber);
  };
  const formatCEP = (input) => {
    let formattedCEP = input.replace(/\D/g, ''); 
    formattedCEP = formattedCEP.substring(0, 9);
    if (formattedCEP.length > 5) {formattedCEP = formattedCEP.replace(/^(\d{5})(\d)/,'$1-$2');}
    setCep(formattedCEP);
  };
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Cadastro de Escola</Text>
          <TextInput
            style={[styles.input, camposVazios.includes('Nome da Escola') && styles.inputError]}
            placeholder="Nome da Escola"
            value={nomeEscola}
            onChangeText={setNomeEscola}
          />
          <TextInput
            style={[styles.input, styles.inputTelefone, camposVazios.includes('Telefone') && styles.inputError]}
            placeholder="Telefone"
            value={telefone}
            onChangeText={formatPhoneNumber}
            keyboardType="phone-pad"
            maxLength={15}
            returnKeyType="done"
          />
          
          <TextInput
            style={[styles.input, camposVazios.includes('CEP') && styles.inputError]}
            placeholder="CEP"
            value={cep}
            onChangeText={setCep}
            onBlur={handleCepBlur}
            keyboardType="numeric"
            maxLength={9}
            returnKeyType="done"
            onSubmitEditing={handleCepBlur}
          />
          {cepDone && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Rua"
                value={rua}
                onChangeText={setRua}
                editable={false}
              />
              <TextInput
                style={styles.input}
                placeholder="Bairro"
                value={bairro}
                onChangeText={setBairro}
                editable={false}
              />
              <TextInput
                style={styles.input}
                placeholder="Cidade"
                value={cidade}
                onChangeText={setCidade}
                editable={false}
              />
              <TextInput
                style={styles.input}
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
                editable={false}
              />
            </>
          )}
        <TextInput
  style={[styles.input, camposVazios.includes('Número') && styles.inputError]}
  placeholder="Número"
  value={numero}
  onChangeText={setNumero}
  keyboardType="numeric"
  maxLength={5}
  returnKeyType="done"
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
  inputError: {
    borderColor: 'red',
  },
  inputTelefone: {
    width: '100%',
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
  periodoButtonText: {
    fontSize: 16,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#ccc',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  
});

export default CadastroEscola;

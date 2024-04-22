import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Modal, Keyboard } from 'react-native';

const CadastroAluno = () => {
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [numero, setNumero] = useState('');
  const [referencia, setReferencia] = useState('');
  const [cepDone, setCepDone] = useState(false);
  const [camposVazios, setCamposVazios] = useState([]);
  const [modalEscolaVisible, setModalEscolaVisible] = useState(false);
  const [modalPeriodoVisible, setModalPeriodoVisible] = useState(false);
  const [escolaSelecionada, setEscolaSelecionada] = useState('');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('');
  
  const numeroInputRef = useRef(null);

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

  const formatPhoneNumber = (input) => {
    let phoneNumber = input.replace(/\D/g, '');
    phoneNumber = phoneNumber.replace(/^(\d{2})(\d)/g, '($1) $2');
    phoneNumber = phoneNumber.replace(/(\d)(\d{4})$/, '$1-$2');
    setTelefone(phoneNumber);
  };

  const handleSubmit = () => {
    const camposObrigatorios = [{ nome: 'Nome', valor: nome }, { nome: 'Idade', valor: idade }, { nome: 'Telefone', valor: telefone }, { nome: 'CEP', valor: cep }, { nome: 'Número', valor: numero }, { nome: 'Escola', valor: escolaSelecionada }, { nome: 'Período', valor: periodoSelecionado }];
    const camposVazios = camposObrigatorios.filter(campo => !campo.valor.trim());
    setCamposVazios(camposVazios.map(campo => campo.nome));

    if (camposVazios.length > 0) {
      Alert.alert('Preencha os campos obrigatórios');
      return;
    }

    console.log('Nome:', nome);
    console.log('Idade:', idade);
    console.log('Telefone:', telefone);
    console.log('Período:', periodoSelecionado);
    console.log('Rua:', rua);
    console.log('Bairro:', bairro);
    console.log('Cidade:', cidade);
    console.log('Estado:', estado);
    console.log('Número:', numero);
    console.log('Referência:', referencia);
    console.log('Escola:', escolaSelecionada);

    setCep('');
    setRua('');
    setBairro('');
    setCidade('');
    setEstado('');
    setNome('');
    setIdade('');
    setTelefone('');
    setPeriodoSelecionado('');
    setNumero('');
    setReferencia('');
    setEscolaSelecionada('');
    setCepDone(false);
    setCamposVazios([]);
    
    if (numeroInputRef.current) {
      numeroInputRef.current.blur();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Cadastro de Aluno</Text>
          <TextInput
            style={[styles.input, camposVazios.includes('Nome') && styles.inputError]}
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={[styles.input, camposVazios.includes('Idade') && styles.inputError]}
            placeholder="Idade"
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, camposVazios.includes('Telefone') && styles.inputError]}
            placeholder="Telefone para contato"
            value={telefone}
            onChangeText={formatPhoneNumber}
            keyboardType="phone-pad"
            maxLength={15}
          />
          <TextInput
            style={[styles.input, camposVazios.includes('CEP') && styles.inputError]}
            placeholder="CEP"
            value={cep}
            onChangeText={setCep}
            onBlur={handleCepBlur}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={handleCepBlur}
            maxLength={8}
          />
          {cepDone && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Rua"
                value={rua}
                onChangeText={setRua}
                editable={!cepDone}
              />
              <TextInput
                style={styles.input}
                placeholder="Bairro"
                value={bairro}
                onChangeText={setBairro}
                editable={!cepDone}
              />
              <TextInput
                style={styles.input}
                placeholder="Cidade"
                value={cidade}
                onChangeText={setCidade}
                editable={!cepDone}
              />
              <TextInput
                style={styles.input}
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
                editable={!cepDone}
              />
            </>
          )}
          <TextInput
            style={[styles.input, camposVazios.includes('Número') && styles.inputError]}
            placeholder="Número"
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
            returnKeyType="done"
            ref={numeroInputRef}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <TextInput
            style={styles.input}
            placeholder="Ponto de Referência"
            value={referencia}
            onChangeText={setReferencia}
          />
          <TouchableOpacity style={[styles.input, camposVazios.includes('Escola') && styles.inputError]} onPress={() => setModalEscolaVisible(true)}>
            <Text style={styles.periodoButtonText}>Escola: {escolaSelecionada ? escolaSelecionada : 'Selecione uma escola'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.input, camposVazios.includes('Período') && styles.inputError]} onPress={() => setModalPeriodoVisible(true)}>
            <Text style={styles.periodoButtonText}>Período: {periodoSelecionado ? periodoSelecionado : 'Selecione um período'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalEscolaVisible}
            onRequestClose={() => {
              setModalEscolaVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setEscolaSelecionada('Dom Pedro');
                    setModalEscolaVisible(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>Dom Pedro</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setEscolaSelecionada('São Lucas');
                    setModalEscolaVisible(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>São Lucas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalEscolaVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalPeriodoVisible}
            onRequestClose={() => {
              setModalPeriodoVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setPeriodoSelecionado('Manhã');
                    setModalPeriodoVisible(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>Manhã</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setPeriodoSelecionado('Tarde');
                    setModalPeriodoVisible(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>Tarde</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalPeriodoVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CadastroAluno;

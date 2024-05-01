import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, ScrollView } from 'react-native';

const PerfilScreen = () => {
    const initialValues = {
        nome: "João da Silva",
        email: "joao@example.com",
        telefone: "(11) 1234-5678"
    };

    const [fields, setFields] = useState(initialValues);
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldsChanged, setFieldsChanged] = useState(false);
    const [showNovaSenha, setShowNovaSenha] = useState(false);
    const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
    const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição

    const redefinirSenha = () => {
        setShowPasswordResetForm(!showPasswordResetForm);
        setErrorMessage('');
        checkFields();
    };

    const checkFields = () => {
        setFieldsChanged(true);
    };

    const salvarNovaSenha = () => {
        if (!fieldsChanged) {
            return;
        }

        if (senhaAtual !== 'senha123') {
            setErrorMessage('Senha atual incorreta.');
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setErrorMessage('As novas senhas não coincidem.');
            return;
        }

        console.log('Nova senha:', novaSenha);
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarSenha('');
        setErrorMessage('');
        setShowPasswordResetForm(false);
        setFieldsChanged(false);
        setEditMode(false); // Voltar ao modo de visualização
    };

    const toggleEditMode = () => {
        setEditMode(!editMode); // Alternar entre o modo de edição e visualização
    };

    const salvarPerfil = () => {
        const camposEditados = {};

        // Comparar valores dos campos editáveis com os valores iniciais
        if (fields.nome !== initialValues.nome) {
            camposEditados.nome = fields.nome;
        }
        if (fields.email !== initialValues.email) {
            camposEditados.email = fields.email;
        }
        if (fields.telefone !== initialValues.telefone) {
            camposEditados.telefone = fields.telefone;
        }

        // Lógica para enviar os campos editados (camposEditados)
        // Neste exemplo, apenas mostrando no console
        console.log('Campos editados:', camposEditados);

        // Aqui você pode enviar os camposEditados para onde for necessário, por exemplo, uma API

        setFieldsChanged(false);
        setEditMode(false); // Voltar ao modo de visualização
    };
    const cancelarEdicao = () => {
        // Restaurar os campos para os valores iniciais
        setFields(initialValues);
        setFieldsChanged(false);
        setEditMode(false); // Voltar ao modo de visualização
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Perfil do Usuário</Text>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    style={styles.input}
                    value={fields.nome}
                    onChangeText={value => {
                        setFields({ ...fields, nome: value });
                        checkFields(); // Ativar estado de campos alterados
                    }}
                    editable={editMode} // Definir se o campo é editável ou não com base no modo de edição
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={fields.email}
                    onChangeText={value => {
                        setFields({ ...fields, email: value });
                        checkFields(); // Ativar estado de campos alterados
                    }}
                    editable={editMode}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Telefone:</Text>
                <TextInput
                    style={styles.input}
                    value={fields.telefone}
                    onChangeText={value => {
                        setFields({ ...fields, telefone: value });
                        checkFields(); // Ativar estado de campos alterados
                    }}
                    editable={editMode}
                />
            </View>
            {editMode ? (
                <View style={styles.buttonGroup}>
                    <Button
                        title="Salvar Perfil"
                        onPress={salvarPerfil}
                    />
                    <Button
                        title="Cancelar"
                        onPress={cancelarEdicao}
                        color="red"
                    />
                </View>
            ) : (
                <View style={styles.formGroup}>
                    <Button
                        title="Editar Perfil"
                        onPress={toggleEditMode}
                    />
                </View>
            )}
            <View style={styles.formGroup}>
                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    style={styles.input}
                    value="******"
                    editable={false}
                />
                <Button
                    title={showPasswordResetForm ? 'Cancelar' : 'Redefinir Senha'}
                    onPress={redefinirSenha}
                />
            </View>
            {showPasswordResetForm && (
                <View style={styles.passwordResetForm}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Senha Atual:</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            value={senhaAtual}
                            onChangeText={setSenhaAtual}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nova Senha:</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                secureTextEntry={!showNovaSenha}
                                value={novaSenha}
                                onChangeText={setNovaSenha}
                            />
                            <TouchableOpacity onPress={() => setShowNovaSenha(!showNovaSenha)}>
                                <Image source={showNovaSenha ? require('./assets/eye_off.png') : require('./assets/eye_on.png')} style={styles.eyeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Repetir Senha:</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                secureTextEntry={!showConfirmarSenha}
                                value={confirmarSenha}
                                onChangeText={setConfirmarSenha}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmarSenha(!showConfirmarSenha)}>
                                <Image source={showConfirmarSenha ? require('./assets/eye_off.png') : require('./assets/eye_on.png')} style={styles.eyeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.formGroup}>
                        <Button
                            title="Salvar senha"
                            onPress={salvarNovaSenha}
                            disabled={!fieldsChanged}
                        />
                    </View>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 20,
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 10,
        width: '80%',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    eyeIcon: {
        width: 24,
        height: 24,
        marginLeft: 8,
    },
    passwordResetForm: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
    },
});

export default PerfilScreen;

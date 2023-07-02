import React, { useEffect, useState } from "react";
import { View, Image, ImageBackground, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

import styles from './estilo';
import styleGeral from '../estiloGeral/style'
import "../../AuthContext";
import { ChecarLoginUsuario, SalvarJWT } from "../../AuthContext";

export default function tLogin() {
    const navigation = useNavigation()

    const [login, setlogin] = useState("");
    const [senha, setSenha] = useState("");

    function Navegar(rota) {
        navigation.navigate(rota);
    }

    function Esqueci() {
        navigation.navigate('tEsqueciSenha');
    }

    function Criar() {
        navigation.navigate('tSelecaoUser');
    }

    useEffect(() => {
        verificarLogin();
    });

    async function verificarLogin() {
        const usuarioLogado = await ChecarLoginUsuario();

        if (usuarioLogado) {
            Navegar("Routes2");
        }
    };
    async function Login() {
        const formData = new URLSearchParams();
        formData.append('login', login);
        formData.append('senha', senha);
        console.log(formData);

        try {
            //const response = await axios.post('https://localhost:44396/api/loginusu/Login', formData.toString(), {
            //https://cuidadores.azurewebsites.net/api/
            const response = await axios.post('https://cuidadores.azurewebsites.net/api/loginusu/Login', formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            SalvarJWT(response.data);
            Navegar("Routes2");
        } catch (error) {
            console.log(error);

            try {
                //const response = await axios.post('https://localhost:44396/api/logincui/Login', formData.toString(), {
                const response = await axios.post('https://cuidadores.azurewebsites.net/api/logincui/Login', formData.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                SalvarJWT(response.data);
                Navegar("Routes3");
            } catch (error) {
                console.log(error);
                alert("Erro ao cadastrar resultado");
            }
        }
    }


    return (
        <ImageBackground style={styleGeral.container}>
            <View style={styles.main}>
                <Image style={{ width: 207, height: 225, marginTop: 200, marginLeft: 60 }}
                    source={require('../../assets/logo.png')} />
            </View>

            <View style={styles.footer}>
                <TextInput
                    style={styleGeral.input}
                    placeholder="Digite seu email ou CPF"
                    onChangeText={(texto) => setlogin(texto)}
                />
                <TextInput
                    style={styleGeral.input}
                    placeholder="Digite sua senha"
                    value={senha}
                    secureTextEntry={true}
                    onChangeText={(texto) => setSenha(texto)}
                />

                <TouchableOpacity style={styleGeral.button} onPress={Login}>
                    <Text style={styleGeral.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.main}>
                <Text style={styles.title}>Esqueci sua senha?
                    <TouchableOpacity onPress={Esqueci}>
                        <Text style={styles.hyperlinkStyle}>Clique aqui</Text>
                    </TouchableOpacity>
                </Text>

                <Text style={styles.title}>Não possui uma conta?
                    <TouchableOpacity onPress={Criar}>
                        <Text style={styles.hyperlinkStyle}>Clique aqui</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </ImageBackground>
    );
}
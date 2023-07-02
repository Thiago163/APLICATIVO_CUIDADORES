import { View, ImageBackground, Text,} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './estilo';
import styleGeral from '../estiloGeral/style'

export default function tSelecaoUser() {

    const navigation = useNavigation()

    function CriarUsuario() {
        navigation.navigate('tCadastroInfoU');
    }

    function CriarCuidador() {
        navigation.navigate('tCadastroInfoC');
    }

    function Voltar() {
        navigation.goBack()
    }

    return (
        <ImageBackground style={styleGeral.container}>
            <View style={styles.footer}>
                <RectButton style={styleGeral.button} onPress={CriarUsuario}>
                    <Text style={styleGeral.buttonText}>Cadastrar como Cliente</Text>
                </RectButton>
                <RectButton style={styleGeral.button} onPress={CriarCuidador}>
                    <Text style={styleGeral.buttonText}>Cadastrar como Cuidador(a)</Text>
                </RectButton>
                <RectButton style={styleGeral.buttonReturn} onPress={Voltar}>
                    <Text style={styleGeral.buttonText}>Voltar</Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
}


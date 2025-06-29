//Tela de login do Sistema
//Imports
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Input from '../components/Input'
import Botao from '../components/Botao'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth_module } from '../firebase/config'
import { useDispatch } from 'react-redux'
import { reducerSetUsuario } from '../../redux/usuarioSlice'

const Login = (props) => {
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const [validadeUsuario, setValidadeUsuario] = useState(true)
    const [validadeSenha, setValidadeSenha] = useState(true)

    const validaUsuario = () => {
        const usuarioRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        setValidadeUsuario(usuarioRegex.test(usuario))
    }
    const validaSenha = () => {
        setValidadeSenha(senha.length >= 6)
    }
    const navega = (pagina) => {
        props.navigation.navigate(`${pagina}`)
        setUsuario("")
        setSenha("")
    }
    const authUsuario = () => {
        if (validadeUsuario && validadeSenha) {
            signInWithEmailAndPassword(auth_module, usuario, senha)
            .then(() => {
                navega("DrawerNavigator")
            })
            .catch((error) => {
                Alert.alert(
                    "Erro: Autenticação",
                    "Usuário ou senha inválidos"
                )
                setSenha("")
            })
        } else {
            Alert.alert(
                "Erro: Dados inválidos",
                "Preencha os campos corretamente"
            )
        }
    }
    const dispatch = useDispatch()

    const atribuirEmail = () => {
        dispatch(reducerSetUsuario({ email: usuario }))
    }

    return (
        <View style={estilos.viewMae}>
            <View style={estilos.titulo}>
                <Text style={estilos.texto}>Satisfying.you</Text>
                <Icon name="emoticon-happy-outline" size={60} color="white" />
            </View>
            <View style={estilos.formulario}>
                <View style={{gap:2}}>
                    <Input label="E-mail" txt={usuario} setTxt={setUsuario} placeholder="usuario@email.com" color="grey" onBlur={validaUsuario}/>
                    {!validadeUsuario && <Text style={estilos.erro}>E-mail inválido</Text>}
                    <Input label="Senha" txt={senha} setTxt={setSenha} placeholder="******" color="grey" secureTextEntry onBlur={validaSenha}/>
                    {!validadeSenha && <Text style={estilos.erro}>Senha deve ter pelo menos 6 caracteres</Text>}
                </View>
                <Botao texto="Entrar" cor="#37BD6D" tamanho={32} onPress={() => {
                    atribuirEmail()
                    authUsuario()
                }} />
            </View>
            <View style={estilos.botoes}>
                <Botao texto="Criar minha conta" cor="#419ED7" tamanho={25} onPress={() => navega("NovaConta")}/>
                <Botao texto="Esqueci minha senha" cor="#B5C7D1" tamanho={25} onPress={() => navega("RecuperaSenha")}/>
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    viewMae: {
        backgroundColor: "#372775",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },
    texto: {
        color: "white",
        fontFamily: "AveriaLibre-Regular",
        fontSize: 50
    },
    botoes: {
        width: 600,
        gap: 3,
        paddingTop: 20
    },
    formulario: {
        width: 600,
        height: 210,
        gap: 10
    },
    titulo: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10, 
        marginTop:0
    },
    erro: {
        color: '#FD7979',
        fontFamily: "AveriaLibre-Regular",
        fontSize: 12
    }
})

//Export
export default Login
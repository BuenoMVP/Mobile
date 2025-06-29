//Tela de cadastro de nova pesquisa
//Imports
import { View, StyleSheet, Text, TextInput, ActivityIndicator, Alert, Pressable, Image } from 'react-native'
import { useState } from 'react'
import Input from '../components/Input'
import Botao from '../components/Botao'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getFirestore, collection, addDoc, doc, updateDoc} from "firebase/firestore";
import { app } from '../firebase/config'
import { launchImageLibrary } from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'


const NovaPesquisa = (props) => {
    const [nome, setNome] = useState("")
    const [data, setData] = useState("")
    const [validadeNome, setValidadeNome] = useState(true)
    const [validadeData, setValidadeData] = useState(true)
    const [imagem, setImagem] = useState()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const db = getFirestore(app);
    const pesquisaCollection = collection(db, "pesquisa")

    const validaNome = () => {
        if (!nome.trim()) {
            setValidadeNome(false)
        } else {
            setValidadeNome(true)
        }
    }

    const validaData = () => {
        if (!data.trim()) {
            setValidadeData(false)
        } else {
            setValidadeData(true)
        }
    }


    const addPesquisa = async () => {
        setIsLoading(true)
        setError(null)
        
        const docPesquisa = {
            nome: nome,
            data: data,
            respostas: {
                excelente: 0,
                bom: 0,
                neutro: 0,
                ruim: 0,
                pessimo: 0
            },
            imagem: imagem
        };

        try {
            console.log("Enviando dados para o Firestore:", docPesquisa);
            const docRef = await addDoc(pesquisaCollection, docPesquisa);
            console.log("Documento adicionado com ID: ", docRef.id);
            Alert.alert("Sucesso!", "Pesquisa cadastrada.");
            props.navigation.navigate("DrawerNavigator");
        } catch (e) {
            console.error("Erro ao adicionar documento:", e);
            setError("Falha ao cadastrar. Verifique sua conexão e as regras do Firebase.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCadastro = () => {
        validaNome();
        validaData();

        if (nome.trim() && data.trim()) {
            addPesquisa().then(props.navigation.navigate("DrawerNavigator"))
        } else {
            console.log("Cadastro bloqueado pela validação.");
            setError("Preencha todos os campos corretamente.");
        }
    }

    const convertURIToBase64 = async (uri) => {
        const resizeImage = await ImageResizer.createResizedImage(
            uri,
            700,
            700,
            'JPEG',
            100
        );

        const imageUri = await fetch(resizeImage.uri)
        const imagemBlob = await imageUri.blob()
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagem(reader.result)
        };

        reader.readAsDataURL(imagemBlob);
    }

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (result) => {
            if (result.assets && !result.didCancel) {
                convertURIToBase64(result.assets[0]?.uri);
            }
        })
    }

    return (
        <View style={estilos.viewMae}>
            <View style={estilos.formulario}>
                <View style={{ gap: 15 }}>
                    <Input label="Nome" txt={nome} setTxt={setNome} placeholder="Nome do Projeto" color="grey" onBlur={validaNome} />
                    {!validadeNome && <Text style={estilos.erro}>Preencha o nome da pesquisa</Text>}
                    
                    <View>
                        <Text style={estilos.texto}>Data</Text>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
                            <TextInput style={estilos.input} value={data} onChangeText={setData}
                                placeholder="DD/MM/AAAA" placeholderTextColor="grey" onBlur={validaData} />
                            <Icon style={estilos.icone} name="calendar-month-outline" size={30} color="grey" />
                        </View>
                        {!validadeData && <Text style={estilos.erro}>Preencha a data</Text>}
                    </View>
                    
                    <View style={estilos.imageContainer}>
                        <Pressable style={estilos.imagemButton} onPress= { pickImage }>
                            <Text>Escolha uma imagem</Text>
                        </Pressable>
                        {imagem && <Image source={{ uri: imagem }} style={estilos.imagem}/>}
                    </View>
                </View>

                {error && <Text style={estilos.erroGeral}>{error}</Text>}

                {isLoading ? (
                    <ActivityIndicator size="large" color="#49B976" style={{ marginTop: 20 }} />
                ) : (
                    <Botao texto="CADASTRAR" cor="#37BD6D" tamanho={35} onPress={handleCadastro} />
                )}
            </View>
        </View>
    )
}


const estilos = StyleSheet.create({
    viewMae: {
        flex: 1,
        backgroundColor: "#372775",
        width: "100%",
        alignItems: "center",
        justifyContent: 'center',
        padding: 20
    },
    formulario: {
        width: '100%',
        maxWidth: 600,
        gap: 15
    },
    input: {
        flex: 1,
        height: 45,
        backgroundColor: "white",
        color: "black",
        fontFamily: "AveriaLibre-Regular",
        paddingHorizontal: 10,
        fontSize: 16
    },
    texto: {
        color: "white",
        fontFamily: "AveriaLibre-Regular",
        fontSize: 20
    },
    icone: {
        position: "absolute",
        right: 10,
    },
    erro: {
        color: '#FD7979',
        fontFamily: "AveriaLibre-Regular",
        fontSize: 14,
        marginTop: -10
    },
    erroGeral: {
        color: '#FD7979',
        fontFamily: "AveriaLibre-Regular",
        fontSize: 16,
        textAlign: 'center',
        marginTop: 15,
    },
    imagemButton: {
        backgroundColor: "white",
        height: 50,
        width: 200,
        justifyContent: 'center'
    },
    imageContainer: {
        width: '100%',
        flexDirection: 'row'
    },
    imagem: {
        marginLeft: 20,
        height: 100,
        width: 100
    }
})

//Export
export default NovaPesquisa
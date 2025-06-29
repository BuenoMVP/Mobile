//Tela para modificar pesquisa
import { View, StyleSheet, Modal, Pressable, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { app } from '../firebase/config'
import Input from '../components/Input'
import InputImagem from '../components/InputImagem'
import Botao from '../components/Botao'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const ModificarPesquisa = ({ route, navigation }) => {
    const [nome, setNome] = useState()
    const [data, setData] = useState()
    const [visuModal, setVisuModal] = useState(false)

    const id = route?.params?.id
    const db = getFirestore(app)

    const changePesquisa = () => {
        const pesquisaRef = doc(db, "pesquisa", id)
        updateDoc(pesquisaRef, { nome, data })
        navigation.navigate("DrawerNavigator")
    }

    
    const deletarPesquisa = () => {
        deleteDoc(doc(db, "pesquisa", id))
        navigation.navigate("DrawerNavigator")
    }

    useEffect(() => {
        if (!id) return
        const docRef = doc(db, "pesquisa", id)
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const dados = docSnap.data()
                setNome(dados.nome)
                setData(dados.data)
            }
        })
    }, [id])

    const mostraPopup = () => setVisuModal(!visuModal)

    return (
        <View style={estilos.viewMae}>
            <View style={estilos.formulario}>
                <View style={{ gap: 10 }}>
                    <Input label="Nome" txt={nome} setTxt={setNome} placeholder="SECOMP 2023" color="grey" />
                    <Input label="Data" txt={data} setTxt={setData} placeholder="10/10/2023" color="grey" />
                    <Icon style={estilos.icone} name="calendar-month-outline" size={40} color="grey" />
                    <InputImagem
                        label="Imagem"
                        image="https://imgs.search.brave.com/Cneu7QLFmezkZ3jZEtqfv-m75wfiR0a3Kpvlr_UTACQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/aGFyZHdhcmUuY29t/LmJyL3dwLWNvbnRl/bnQvdXBsb2Fkcy9z/dGF0aWMvd3AvMjAy/Mi8wMS8yOC8xLTQu/anBn"
                    />
                </View>
                <Botao texto="SALVAR" cor="#37BD6D" tamanho={35} onPress={changePesquisa} />
            </View>
            <View style={{ justifyContent: "flex-end" }}>
                <View style={estilos.botao}>
                    <Pressable style={estilos.view} onPress={mostraPopup}>
                        <Icon name="trash-can-outline" size={40} color="white" />
                        <Text style={estilos.texto}>Apagar</Text>
                    </Pressable>
                </View>
            </View>
            <Modal visible={visuModal} transparent onRequestClose={mostraPopup}>
                <View style={estilos.background}>
                    <View style={estilos.viewPopup}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={estilos.texto}>Tem certeza de apagar essa</Text>
                            <Text style={estilos.texto}>pesquisa?</Text>
                        </View>
                        <View style={estilos.viewBotao}>
                            <TouchableOpacity
                                style={estilos.botaoPopup}
                                onPress={() => {deletarPesquisa}}>
                                <Text style={estilos.texto}>SIM</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[estilos.botaoPopup, { backgroundColor: "#3F92C5" }]}
                                onPress={mostraPopup}>
                                <Text style={estilos.texto}>CANCELAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const estilos = StyleSheet.create({
    viewMae: {
        backgroundColor: "#372775",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row"
    },
    formulario: {
        width: "80%",
        height: "100%",
        gap: 20,
        marginRight: 10,
        paddingLeft: 150,
        paddingRight: 70
    },
    botao: {
        width: 90,
        height: 90
    },
    texto: {
        fontFamily: "AveriaLibre-Regular",
        color: "white",
        fontSize: 20
    },
    view: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    background: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)"
    },
    viewPopup: {
        backgroundColor: "#372775",
        width: 350,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    botaoPopup: {
        backgroundColor: "#FF8383",
        width: 130,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    viewBotao: {
        display: "flex",
        flexDirection: "row",
        gap: 20
    },
    icone: {
        position: "absolute",
        right: 10,
        top: 108
    }
})

export default ModificarPesquisa

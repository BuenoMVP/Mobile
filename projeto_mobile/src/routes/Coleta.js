import { View, StyleSheet, Text } from 'react-native'
import BotaoColeta from '../components/BotaoColeta'
import { useEffect, useState } from 'react'
import { doc, getDoc, getFirestore, increment, updateDoc } from 'firebase/firestore'
import { app } from '../firebase/config'

const Coleta = ({ route, navigation }) => {
    const [nome, setNome] = useState("")
    const id = route?.params?.id
    const db = getFirestore(app)

    const coletarDados = (resposta) => {
        const pesquisaRef = doc(db, "pesquisa", id)
        updateDoc(pesquisaRef, { [`respostas.${resposta}`]: increment(1) }).then(() => {
            navigation.navigate("AgradecimentoParticipacao", { id })
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (!id) return
        const docRef = doc(db, "pesquisa", id)
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const dados = docSnap.data()
                setNome(dados.nome)
            }
        })
    }, [id])

    return (
        <View style={estilos.viewMae}>
            <View>
                <Text style={estilos.texto}>O que você acho do {nome}?</Text>
            </View>
            <View style={estilos.view}>
            <BotaoColeta onPress={() => coletarDados("pessimo")} icone="emoticon-angry-outline" cor="#D71616" texto="Péssimo" />
            <BotaoColeta onPress={() => coletarDados("ruim")} icone="emoticon-sad-outline" cor="#FF360A" texto="Ruim" />
            <BotaoColeta onPress={() => coletarDados("neutro")} icone="emoticon-neutral-outline" cor="#FFC632" texto="Neutro" />
            <BotaoColeta onPress={() => coletarDados("bom")} icone="emoticon-happy-outline" cor="#37BD6D" texto="Bom" />
            <BotaoColeta onPress={() => coletarDados("excelente")} icone="emoticon-excited-outline" cor="#25BC22" texto="Excelente" />
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
        gap: 40
    },
    texto: {
        fontFamily: "AveriaLibre-Regular",
        color: "white",
        fontSize: 40
    },
    view: {
        display: "flex",
        flexDirection: "row",
        gap: 20
    }
})

export default Coleta
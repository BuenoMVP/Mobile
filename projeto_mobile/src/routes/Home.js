import { View, StyleSheet, Text, TextInput, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import Botao from '../components/Botao'
import Card from '../components/Card'
import Icon from "react-native-vector-icons/MaterialIcons"
import { PaperProvider } from 'react-native-paper'
import { getFirestore, collection, query, onSnapshot} from "firebase/firestore";
import { app } from '../firebase/config'

const Home = (props) => {
    const [pesquisa, setPesquisa] = useState()
    const [listaPesquisas, setListaPesquisas] = useState([])

    const db = getFirestore(app);
    const pesquisaCollection = collection(db, "pesquisa")

    useEffect (() => {
        const q = query(pesquisaCollection)

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const pesquisas = []
            snapshot.forEach((doc) => {
                pesquisas.push({id: doc.id , ...doc.data() })
            })

            setListaPesquisas(pesquisas)
        })
    }, []) 

    return (
        <PaperProvider>

            <View style={estilos.viewMae}>
                <View style={estilos.conteudo}>
                    <View style={estilos.pesquisa}>
                        <Icon name="search" size={35} color="#8B8B8B"/>
                        <TextInput 
                            style={estilos.input} 
                            value={pesquisa} 
                            onChangeText={setPesquisa}
                            placeholder='Insira o termo de busca...' 
                            placeholderTextColor="#8B8B8B"
                        />
                    </View>
                        <FlatList 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 30 }} 
                            data={listaPesquisas} 
                            renderItem={({ item }) => (
                                <Card 
                                    pesq={{
                                        titulo: item.nome,
                                        imagem: item.imagem || "https://imgs.search.brave.com/_vbO3se_30_DzigSTppfpzGUVcr7PgrNjfiHqG4G5OM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I1L0MlQzMlQTJt/cHVzX0N1cml0aWJh/LmpwZw",
                                        data: item.data || "DD/MM/AAAA",
                                        id: item.id
                                    }}
                                    navigation={props.navigation}
                                />
                            )}
                            keyExtractor={item => item.id}
                        />
                    <Botao texto="NOVA PESQUISA" cor="#37BD6D" tamanho={32} onPress={() => props.navigation.navigate("NovaPesquisa")}/>
                </View>
            </View>
        </PaperProvider>
    )
}

const estilos  = StyleSheet.create({
    viewMae: {
        backgroundColor: "#372775",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    texto: {
        color: "white",
        fontFamily: "AveriaLibre-Regular",
        fontSize: 40
    },
    conteudo: {
        justifyContent: "center",
        alignItems: "center",
        height: "95%",
        width: "97%", 
        gap: 20
    },
    pesquisa: {
        backgroundColor: "white",
        alignItems: "center",
        width: "100%",
        height: 40,
        display: "flex",
        flexDirection: "row", 
    },
    input: {
        fontSize: 20, 
        fontFamily: "AveriaLibre-Regular",
        justifyContent: "center",
        color:"black", 
        paddingTop: 10,
        width: 786
    }
})


export default Home
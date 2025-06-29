//Tela de Ações das Pesquisas
//Imports
import { View, StyleSheet} from 'react-native'
import ItemAcao from '../components/ItemAcao'
import { useSelector } from 'react-redux'

//Aplicação
const AcoesPesquisa = ({ navigation }) => {
    const id = useSelector((state) => state.pesquisa.id)

    return (
        <View style={estilos.viewMae}>
            <ItemAcao id={id} texto="Modificar" cor="white" icone="file-document-edit-outline" tela="ModificarPesquisa" navigation={navigation} />
            <ItemAcao id={id} texto="Coletar Dados" cor="white" icone="checkbox-multiple-outline" tela="Coleta" navigation={navigation} />
            <ItemAcao id={id} texto="Relatório" cor="white" icone="checkbox-blank-circle-outline" tela="Relatorio" navigation={navigation} />
        </View>
    )
}

//Estilização
const estilos = StyleSheet.create({
    viewMae: {
        backgroundColor: "#372775",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 40, 
        display: "flex",
        flexDirection: "row"
    },
    texto: {
        color: "white",
        fontFamily: "AveriaLibre-Regular",
        fontSize: 40
    },
    botaoOk: {
        fontFamily: "AveriaLibre-Regular",
        height: 100,
        width: 100
    }
})

//Export
export default AcoesPesquisa
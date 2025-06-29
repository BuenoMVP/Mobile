import { Text, StyleSheet, View, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ItemAcao = (props) => {
    return (
        <Pressable style={estilos.botao} onPress={() => {props.navigation.navigate(props.tela, {id: props.id})}} >
            <View style={estilos.view}>
                <Icon name={props.icone} size={90} color={props.cor} />
                <Text style={estilos.texto}>{props.texto}</Text>
            </View>
        </Pressable>
    )
}

const estilos = StyleSheet.create({
    view: {
        backgroundColor: "#312464",
        height: 170,
        width: 210,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    texto: {
        fontFamily: "AveriaLibre-Regular",
        fontSize: 30,
        color: "white"
    },
    botao: {
        height: 170,
        width: 200
    }
})

export default ItemAcao
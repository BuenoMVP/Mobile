import { Text, StyleSheet, View, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const BotaoColeta = (props) => {
    return (
        <Pressable
            style={estilos.view}
            onPress={props.onPress}>
            <Icon name={props.icone} size={90} color={props.cor} />
            <Text style={estilos.texto}>{props.texto}</Text>
        </Pressable>
    )
}

const estilos = StyleSheet.create({
    view: {
        justifyContent: "center",
        alignItems: "center",
        height: 140, 
        width: 140
    },
    texto: {
        fontFamily: "AveriaLibre-Regular",
        color: "white",
        fontSize: 30
    }
})

export default BotaoColeta
import { TextInput, StyleSheet, Text, View } from "react-native";

const Input = (props) => {
    return (
        <View>
            <Text style={estilos.texto}>{props.label} </Text>
            <TextInput style={[estilos.input, {color: "black", fontFamily:"AveriaLibre-Regular"}]} value={props.txt} onChangeText={props.setTxt}
            placeholder={props.placeholder} placeholderTextColor={props.color} {...props} />
        </View>
    )
}

const estilos = StyleSheet.create({
    input: {
        width: "100%",
        backgroundColor: "white"
    },
    texto: {
        color: "white",
        fontFamily: "AveriaLibre-Regular",
        fontSize: 20
    }
})

export default Input
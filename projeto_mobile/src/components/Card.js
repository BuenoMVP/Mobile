import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const Card = (props) => {
    const imagem = props.pesq.imagem
    const id = props.pesq.id

    return (
        <View style={estilos.view}>
            <TouchableOpacity 
                style={estilos.botao} 
                onPress={() => {
                    props.navigation.navigate("AcoesPesquisa", { id: props.pesq.id })
                }}>
                <Image style={estilos.imagem} source={{ uri: imagem }} />
                <Text style={estilos.titulo}>{props.pesq.titulo}</Text>
                <Text style={estilos.data}>{props.pesq.data}</Text>
            </TouchableOpacity>
        </View>
    )
}


const estilos = StyleSheet.create({
    view: {
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        width: 230,
        height: 200,
        borderRadius: 10
    },
    titulo: {
        fontFamily: 'AveriaLibre-Regular',
        color: '#3F92C5',
        fontSize: 30,
        textAlign: 'center'
    },
    data: {
        fontFamily: 'AveriaLibre-Regular',
        color: '#8B8B8B',
        fontSize: 20,
        textAlign: 'center'
    },
    botao: {
        width: "100%",
        height: "100%",
        justifyContent: "center"
    },
    imagem: {
        width: 120,
        height: 120,
        alignSelf: "center"
    }
})

export default Card

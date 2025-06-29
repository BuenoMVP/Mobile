import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Drawer } from "react-native-paper"
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from "react-redux"

const CustomDrawer = (props) => {
    const email = useSelector((state) => state.usuario.email)
    return (
        <DrawerContentScrollView justifyContent='space-between' style={{height: "100%"}}>
            <View>
                <Drawer.Section showDivider="false" theme={{colors: {primary: "red"}}} style={estilos.viewMae}>
                    <Text style={estilos.texto}>{email}</Text>
                </Drawer.Section>
                <View flex={75} paddingTop={10} >
                    <DrawerItemList {...props} style={estilos.texto} />
                    <Icon style={estilos.iconePesquisa} name="file-document-outline" size={30} color="white"/>
                </View>
            </View>
            <View style={estilos.viewBotao}>
                <Icon style={estilos.iconeSair} name="exit-to-app" size={30} color="white"/>
                <DrawerItem labelStyle={[estilos.texto, {paddingLeft: 30, justifyContent: "flex-end"}]} label="Sair" onPress={() => { props.navigation.navigate("Login") }} />
            </View>
        </DrawerContentScrollView>
    )
}

const estilos = StyleSheet.create({
    viewMae: {
        width: "100%",
        alignItems: "center",
        paddingTop: 15,
        borderBottomColor: 'white',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    viewBotao: {
        justifyContent: "flex-end",
        height: 250
    },
    texto: {
        color: "white",
        fontFamily: "AveriaLibre-Regular",
        fontSize: 25,
        alignItems: 'center'
    },
    sair: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }, 
    iconeSair: {
        position: "absolute",
        left: 10,
        bottom: 15
    },
    iconePesquisa: {
        position: "absolute",
        left: 10,
        bottom: 15
    }
    
})

export default CustomDrawer
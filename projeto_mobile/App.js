//Navegação
//Imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, StatusBar } from "react-native";
import Login from "./src/routes/Login";
import AgradecimentoParticipacao from "./src/routes/AgradecimentoParticipacao";
import AcoesPesquisa from "./src/routes/AcoesPesquisa";
import DrawerNavigator from "./src/routes/DrawerNavigator";
import Coleta from "./src/routes/Coleta";
import NovaConta from "./src/routes/NovaConta";
import RecuperaSenha from "./src/routes/RecuperaSenha";
import NovaPesquisa from "./src/routes/NovaPesquisa";
import ModificarPesquisa from "./src/routes/ModificarPesquisa";
import Relatorio from "./src/routes/Relatorio";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const Stack = createStackNavigator()

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <StatusBar hidden={true} />
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTintColor: '#573FBA', headerTitleStyle: estilos.texto,  headerStyle: { backgroundColor: '#2B1D62' } }}>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="AcoesPesquisa" component={AcoesPesquisa} options={{ title: "Ação", }} />
                    <Stack.Screen name="AgradecimentoParticipacao" component={AgradecimentoParticipacao} options={{ headerShown: false }} />
                    <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="Coleta" component={Coleta} options={{ headerShown: false }} />
                    <Stack.Screen name="NovaConta" component={NovaConta} options={{ title: "Nova Conta", }} />
                    <Stack.Screen name="RecuperaSenha" component={RecuperaSenha} options={{ title: "Recuperação de senha", }} />
                    <Stack.Screen name="NovaPesquisa" component={NovaPesquisa} options={{ title: "Nova Pesquisa", }} />
                    <Stack.Screen name="ModificarPesquisa" component={ModificarPesquisa} options={{ title: "Modificar Pesquisa", }} />
                    <Stack.Screen name="Relatorio" component={Relatorio} options={{ title: "Relatório", }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

const estilos = StyleSheet.create({
    texto: {
        fontFamily: "AveriaLibre-Regular",
        fontSize: 30,
        color: "white"
    }
})

export default App
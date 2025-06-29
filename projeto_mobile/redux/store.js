import { configureStore } from "@reduxjs/toolkit";
import pesquisaSlice from "./pesquisaSlice";
import usuarioSlice  from "./usuarioSlice";

export const store = configureStore({
    reducer: {
        pesquisa: pesquisaSlice,
        usuario: usuarioSlice
    }
})
import { createSlice } from "@reduxjs/toolkit"

const initialValues = {
    email: null
}

export const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: initialValues,
    reducers: {
        reducerSetUsuario: (state, action) => {
            state.email = action.payload.email
        }
    }
})

export const { reducerSetUsuario } = usuarioSlice.actions

export default usuarioSlice.reducer
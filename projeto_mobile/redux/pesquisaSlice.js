import { createSlice } from "@reduxjs/toolkit"

const initialValues = {
    id: null
}

export const pesquisaSlice = createSlice({
    name: 'pesquisa',
    initialState: initialValues,
    reducers: {
        reducerSetPesquisa: (state, action) => {
            state.id = action.payload.id
        }
    }
})

export const { reducerSetPesquisa } = pesquisaSlice.actions

export default pesquisaSlice.reducer
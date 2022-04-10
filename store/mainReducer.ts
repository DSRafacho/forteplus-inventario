const initialState = {
    codigo: "",
    codigo_barras: "",
    descricao: "",
    descricao_unidade: "",
}

type actionType = 'SET_ALL' 

interface Action {
    payload: {
        codigo: string;
        codigo_barras: string;
        descricao: string;
        descricao_unidade: string;
    }
    type: actionType
}

function mainReducer(state=initialState, action:Action) {
    switch (action.type) {
        case "SET_ALL":
            console.log(action);
            
            return action.payload

        default:
            return state
    }
}

export default mainReducer
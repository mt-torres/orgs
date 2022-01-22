import { createContext, useContext, useState } from "react";

export const pagamentoContext = createContext();
pagamentoContext.displayName='pagamento'

export const PagamentoProvider = ({children}) => {
    const tiposPagamento = [{
        nome: 'Boleto',
        juros: 1,
        id: 1
    },{
        nome: 'Cartão de credito',
        juros: 1.3,
        id: 2
    },{ 
        nome: 'Pix',
        juros: 1,
        id: 3
    },{
        nome: 'Crediário',
        juros: 1.5,
        id: 4 
    }]

    const [formaPagamento, setFormaPagamento] = useState(tiposPagamento[0])

    return(
        <pagamentoContext.Provider 
        value={{
            tiposPagamento, 
            formaPagamento, 
            setFormaPagamento
            }}
        >
            {children}
        </pagamentoContext.Provider>
    )

}

export const usePagamentoContext = () => {
    const{
        tiposPagamento, 
        formaPagamento, 
        setFormaPagamento
    } = useContext(pagamentoContext);
    
    function mudaTipoPagamento(id){
       const novoTipo =  tiposPagamento.find(item => item.id === id);
       return setFormaPagamento(novoTipo);
    } 

    
    return {
        tiposPagamento, 
        formaPagamento,
        mudaTipoPagamento,
    }

} 
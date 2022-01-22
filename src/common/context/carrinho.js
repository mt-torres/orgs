import { createContext, useContext, useEffect, useState } from 'react';
import { usePagamentoContext } from './pagamento';
import { UsuarioContext } from './Usuario';

export const carrinhoContext = createContext();
carrinhoContext.displayName='carrinho';

export const CarrinhoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([])
    const [quantidade, setQuantidade] = useState(0)
    const [total, setTotal] = useState(0)
    return(
        <carrinhoContext.Provider 
        value={{
          quantidade, 
          setQuantidade, 
          carrinho, 
          setCarrinho,
          total,
          setTotal
        }}
        >
            {children}
        </carrinhoContext.Provider>
    )
}



export const useCarrinhoContext = () =>{
    const {
      quantidade, 
      setQuantidade,
      carrinho,
      setCarrinho,
      total,
      setTotal,

    } = useContext(carrinhoContext)

    const { formaPagamento } = usePagamentoContext();
    const { setSaldo } = useContext(UsuarioContext)

    function somaQuantidade(){
      let contador = 0
      carrinho.forEach(element => {
        contador = element.quantidade + contador
        
      });
      return contador;

    }

    function mudarQuantidade(id, quantidade){
      return setCarrinho(carrinhoAnterior => carrinhoAnterior.map(itemDoCarrinho => {
        if(itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade
        return itemDoCarrinho
      }))
    }

    function adicionarProduto(produto){
        const temOProduto = carrinho.some(itemDoCarrinho => itemDoCarrinho.id === produto.id);
        
        if(!temOProduto){
          produto.quantidade = 1;
          return setCarrinho(carrinhoAnterior => [...carrinhoAnterior, produto]);
        }
        
        mudarQuantidade(produto.id, 1)
    
      }

    function removeProduto(id){
      const produto = carrinho.find(item => item.id === id)
      
      if(produto.quantidade === 1){
        return setCarrinho(itemDoCarrinho => itemDoCarrinho.filter(item => item.id !== id) )
        
      }
      mudarQuantidade(produto.id, -1)

    }

    function finalizandoCompra(){
      setCarrinho([]);
      setSaldo(saldo => saldo - total);


    }
    
    useEffect(() => {
      let { total, quantidade} = carrinho.reduce((contador, produto) =>({
        quantidade: contador.quantidade + produto.quantidade,
        total: contador.total + (produto.quantidade * produto.valor),
      }), {
          quantidade:0,
          total:0,
        } )
      setQuantidade(quantidade);
      setTotal(total * formaPagamento.juros);
      
      
      
    },[carrinho,setQuantidade, setTotal, formaPagamento])

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removeProduto,
        somaQuantidade,
        quantidade, 
        setQuantidade,
        total,
        finalizandoCompra
    }
} 
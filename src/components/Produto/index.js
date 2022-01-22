import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCarrinhoContext } from 'common/context/carrinho';


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {
  const { carrinho, adicionarProduto, removeProduto } = useCarrinhoContext();
  const quantidadeItemCarrinho = carrinho.find(item => item.id === id) 

  return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            disabled={!quantidadeItemCarrinho}
            onClick={() => {
              removeProduto(id)

            }}
            color="secondary"
          >
            <RemoveIcon />  
          </IconButton> 
          {quantidadeItemCarrinho?quantidadeItemCarrinho.quantidade:0}
          <IconButton
            color='primary' 
            onClick={()=> {adicionarProduto({nome, foto, id, valor})}}
          >
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)
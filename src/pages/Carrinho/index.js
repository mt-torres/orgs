import { Button, Snackbar, InputLabel, Select, MenuItem} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCarrinhoContext } from 'common/context/carrinho';
import { usePagamentoContext } from 'common/context/pagamento';
import { UsuarioContext } from 'common/context/Usuario';
import Produto from 'components/Produto';
import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { carrinho, total, finalizandoCompra } = useCarrinhoContext();
  const history = useHistory();
  const {tiposPagamento ,formaPagamento, mudaTipoPagamento} = usePagamentoContext();
  const { saldo } = useContext(UsuarioContext);
  const saldoTotal = useMemo(()=>  saldo - total,[saldo, total]);
  return (
    <Container>
      <Voltar onClick={()=> history.goBack()} />
      <h2>
        Carrinho
      </h2>     
      {carrinho.map(item => 
          <Produto 
          {...item} 
          key={item.id}
      />)}

      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
          <Select 
            value={formaPagamento.id}
            onChange={(event)=> mudaTipoPagamento(event.target.value)}
          >
          {tiposPagamento.map(item => 
          <MenuItem 
            value={item.id} 
            key={item.id}
          >
            {item.nome}
          </MenuItem>)}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {total.toFixed(2)} </span>  
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {Number(saldo).toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo Total: =</h2>
            <span> R$ { saldoTotal.toFixed(2)} </span>
          </div>
        </TotalContainer>
      <Button
        disabled={saldoTotal <= 0 || carrinho.length === 0 }
        onClick={() => {
          setOpenSnackbar(true);  finalizandoCompra();
        }}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;
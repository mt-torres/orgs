import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "pages/Login";
import Feira from "pages/Feira";
import Carrinho from "pages/Carrinho";
import { UsuarioProvider } from "common/context/Usuario";
import { CarrinhoProvider } from "common/context/carrinho";
import { PagamentoProvider } from "common/context/pagamento";

function Router() {
     return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <UsuarioProvider>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <CarrinhoProvider>
                        <PagamentoProvider>
                            <Route path="/feira">
                                <Feira />
                            </Route>
                            <Route path="/carrinho">
                                <Carrinho/>
                            </Route>
                        </PagamentoProvider>
                    </CarrinhoProvider>    
                </UsuarioProvider>
                
            </Switch>
        </BrowserRouter>
                
    );
}

export default Router;

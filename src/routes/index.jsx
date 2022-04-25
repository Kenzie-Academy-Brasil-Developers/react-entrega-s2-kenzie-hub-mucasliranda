import { Switch, Route } from "react-router-dom";
import Login from "../Components/pages/Login";
import Register from "../Components/pages/Register";
import Home from "../Components/pages/Home";


export default function Routes({auth, setAuth}) {

  return(
    <Switch>

      <Route exact path={"/register"} >
        <Register/>
      </Route>

      <Route path={"/home"} >
        <Home auth={auth} setAuth={setAuth} />
      </Route>

      <Route path={"/"} >
        <Login auth={auth} setAuth={setAuth} />
      </Route>

    </Switch>
  )

}
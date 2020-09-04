import React from "react";
import { Button, Container } from "@material-ui/core";
import Header from "./components/fragments/Header";
import Menu from "./components/fragments/Menu";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Stock from "./components/pages/Stock";
import StockCreate from "./components/pages/StockCreate";
import StockEdit from "./components/pages/StockEdit";
import {useSelector, useDispatch} from "react-redux";
import Report from "./components/pages/Report";
import AboutUs from "./components/pages/AboutUs";

import * as loginActions from "./actions/login.action";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(20)
  }
}));

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} // pass path as props
    render={props =>
      // ternary condition
      loginActions.isLoggedIn() ? (<Component {...props} />) : (<Redirect to="/login" />)
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // ternary condition
      loginActions.isLoggedIn() ? (<Redirect to="/stock" />) : (<Login {...props} />)
    }
  />
);

export default function App() {

  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const [count, setCount] = React.useState(0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    //componentDidMount
    console.log("App created");
    dispatch(loginActions.reLogin());
  }, []);


  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  // call Reducer
  const loginReducer = useSelector(({loginReducer}) => loginReducer);

  return (
    <Router>

      { loginReducer.result && loginReducer.error !== true && (
        <Header handleDrawerOpen={handleDrawerOpen} open={openDrawer} count={count} setCount={setCount} />
      )}

      { loginReducer.result && loginReducer.error !== true && (
        <Menu open={openDrawer} handleDrawerClose={handleDrawerClose} />
      )}

      <Container className={classes.content}>
        <Switch>
          <LoginRoute path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <SecuredRoute path="/stock" component={Stock} />
          <SecuredRoute path="/stockCreate" component={StockCreate} />
          <SecuredRoute path="/stockEdit/:id" component={StockEdit} />
          <SecuredRoute path="/report" component={Report} />
          <SecuredRoute path="/aboutus" component={AboutUs} />
          <Route
            exact={true}
            path="/"
            component={() => <Redirect to="/login" />}
          />
        </Switch>
      </Container>

    </Router>
  );
}

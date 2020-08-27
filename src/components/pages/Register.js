import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Formik } from 'formik';

import Axios from "axios";
import { apiUrl } from "../../constrant/Constrant";

import Alert from '@material-ui/lab/Alert';

import { useDispatch, useSelector } from "react-redux";


import * as registerAction from "./../../actions/register.action";
import registerReducer from "./../../reducers/register.reducer";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 352,
  },
  media: {
    height: 200,
  },
  form: {
    width: 320,
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
}));



export default function Register(props) {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const registerReducer = useSelector(({registerReducer})=>registerReducer);

  //  function showForm(props){..
  function showForm( { values, handleChange, handleSubmit, setFieldValue, isSubmitting } ) {
    return (
      <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="username"
          value={values.username}
          onChange={handleChange}
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          autoComplete="email"
          autoFocus
          required
        />
        <TextField
          id="password"
          value={values.password}
          onChange={handleChange}
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          autoComplete="current-password"
          autoFocus
          required
        />

        {registerReducer.error && 
          <Alert severity="error" style={{margin:3}}>{registerReducer.result}</Alert>
        } 

        <Button type="submit" size="small" color="primary" variant="contained" style={{margin:3}}>
          Confirm
        </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"

          // history เป็น props ที่ Route ยิงมา
          onClick={() => props.history.goBack()}
        >
          Cancel
        </Button>
      </form>
    );
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        height={200}
        image={`${process.env.PUBLIC_URL}/images/authen_header.jpg`}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Register
            </Typography>

        <Formik 
          initialValues={{username:"admin",password:"1234"}} 
          onSubmit={(values,{setSubmitting})=>{
            setSubmitting(true);
            //alert(JSON.stringify(values));
            Axios.post("http://localhost:8085/api/v2/authen/register",values)
            .then(result => {
              setSubmitting(false);
              //alert(JSON.stringify(result.data));
              const {data} = result;
              if(data === 'ok'){

              }else{
                console.log(data.message);
                dispatch(registerAction.hasError(data.message));
              }

            })
            .catch(error => {
              setSubmitting(false);
              alert(JSON.stringify(error));
            });
          }}
        >
          {props => showForm(props)}

        </Formik>

      </CardContent>

    </Card>
  );
}

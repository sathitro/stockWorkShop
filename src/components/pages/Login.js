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

const useStyles = makeStyles(theme =>({
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
    margin: theme.spacing(3,0,2)
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [account, setAccount] = React.useState({
    username:"1234",
    password:"1234"
  })
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
                Login
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
            <TextField
                id="username"
                label="Username"
                // Subscipt value of state
                value = {account.username}
                // Input assign to State
                onChange={e=>
                  setAccount({...account,username:e.target.value})
                }
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="email"
                autoFocus
                required
            />
            <TextField
                id="password"
                label="Password"
                // Subscipt value of state
                value={account.password}
                // Input assign to State
                onChange={e=>
                  setAccount({...account,password:e.target.value})
                }
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="current-password"
                autoFocus
                required
            />
            #Debug = {JSON.stringify(account)}

            </form>
        </CardContent>

        <CardActions>
            <Button size="small" color="primary" variant="contained" >
                Submit
            </Button>
            <Button 
                size="small" 
                color="primary"
                variant="contained" 
                // history เป็น props ที่ Route ยิงมา
                onClick={()=>props.history.push('/register')} 
            >
                Register
            </Button>

            {/* 
            <Link to="/register">Register</Link> 
            */}

          
          

        </CardActions>
    </Card>
  );
}

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

const useStyles = makeStyles({
  root: {
    maxWidth: 352,
  },
  media: {
    height: 200,
  },
  form: {
    width: 320,
  },
});

export default function Login() {
  const classes = useStyles();

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
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="current-password"
                autoFocus
                required
            />
            </form>
        </CardContent>

        <CardActions>
            <Button size="small" color="primary">
            Submit
            </Button>
            <Button size="small" color="primary">
            Cancel
            </Button>
        </CardActions>
    </Card>
  );
}

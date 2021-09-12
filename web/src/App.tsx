import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  AccountCircle,
  Email,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUser } from './interface/User.interface';
import { IRandomUserResponse } from './interface/RandomUser.interface';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Avatar = styled.img`
  display: block;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin: 1em 0 0;
`;

export default function Album() {
  const classes = useStyles();
  const [users, setUsers] = useState<IUser[] | undefined>();

  useEffect(() => {
    const getUsers = async () => {
      // @TODO: Make it 50 users here
      const {
        data: { results },
      } = await axios.get<IRandomUserResponse>('https://randomuser.me/api/?results=12');
      setUsers(results);
    };
    getUsers();
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <AccountCircle className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Wilfred
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Secret profiles
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Here are all of our secret profiles, don't tell anyone...<br />
              🤫
            </Typography>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="lg">
          {users ? (
            <Grid container spacing={4}>
              {users.map((user, index) => (
                <Grid item key={++index} xs={12} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <Grid container justifyContent="center">
                      <Avatar
                        src={user.picture.large}
                      />
                    </Grid>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {user.name.first} {user.name.last}
                      </Typography>
                      <Typography>
                        {user.location.city}, {user.location.country}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        color="primary"
                        href={`mailto:${user.email}`}
                        size="small"
                        startIcon={<Email />}
                      >
                        Contact
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
          )}
        </Container>
      </main>

      <footer className={classes.footer}>
        <Typography variant="body2" color="textSecondary" align="center">
          Heavily inspired by templates, made by Erik 2021
        </Typography>
      </footer>
    </>
  );
}

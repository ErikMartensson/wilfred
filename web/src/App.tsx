import {
  AppBar,
  Box,
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
  Explore,
} from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { initProfiles, changePage } from './features/profiles/profilesSlice';

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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 1em 0 0;
`;

export default function Album() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const {
    profiles,
    status: profilesStatus,
    page,
    pages,
  } = useAppSelector(({ profiles }) => profiles);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(changePage(value));
  };

  useEffect(() => {
    dispatch(initProfiles());
  }, [dispatch])

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
          {profiles.length ? (
            <>
              <Grid container spacing={4}>
                {profiles.map((user, index) => (
                  <Grid item key={++index} xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
                      <Grid container justifyContent="center">
                        <Avatar
                          src={user.picture.large}
                        />
                      </Grid>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="body1" component="h2">
                          {user.name.first} {user.name.last}
                        </Typography>
                        <Typography variant="body2">
                          {user.location.city}, {user.location.country}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Box pl={1}>
                          <Button
                            color="primary"
                            href={`mailto:${user.email}`}
                            size="small"
                            startIcon={<Email />}
                          >
                            Contact
                          </Button>
                          <Button
                            color="primary"
                            href={`http://maps.google.com/maps?q=${user.location.coordinates.latitude},${user.location.coordinates.longitude}`}
                            size="small"
                            startIcon={<Explore />}
                            target="_blank"
                            rel="nofollow"
                          >
                            Location
                          </Button>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={4}
              >
                <Grid item>
                  <Box pt={3}>
                    <Pagination
                      // +1 So we always can go to the next page
                      count={pages + 1}
                      page={page}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                {profilesStatus === 'loading' && (
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                )}
              </Grid>
            </>
          ) : profilesStatus === 'loading' ? (
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
          ) : (
            <Typography>
              Something went wrong
            </Typography>
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

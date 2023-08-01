import {
  Avatar,
  Box,
  CardMedia,
  Grid,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Advert } from '../../@types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserAdverts } from '../../store/reducers/adverts';
import { findAdvert } from '../../store/selectors/adverts';
import { calculateTimeSpent } from '../../utils/date';
import ContentAdvert from '../Adverts/ContentAdvert/ContentAdvert';
import ContentUserAdvert from '../Adverts/ContentUserAdvert/ContentUserAdvert';
import FavouriteButton from '../Adverts/FavouriteButton/FavouriteButton';
import AppHeader from '../AppHeader/AppHeader';
import Menu from '../Menu/Menu';
import ContactButton from './ContactButton/ContactButton.ContactButton';
import SeparateBar from './SeparateBar/SeparateBar';

export default function Annonce({ id }: Advert) {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const advert = useAppSelector((state) =>
    findAdvert(state.adverts.list, slug as string)
  );
  const userId = advert?.advert_creator.id;

  if (!advert) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  useEffect(() => {
    dispatch(fetchUserAdverts(userId));
  }, [dispatch, userId]);

  const adverts = useAppSelector((state) => state.adverts.userAdverts);

  return (
    <>
      <AppHeader />
      <Menu />
      <Grid
        container
        sx={{
          height: '100vh',
          width: '100rem',
          position: 'relative',
          top: '12rem',
          margin: 'auto',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '82rem',
            mx: 'auto',
            borderRadius: '2rem',
            p: '2rem',
          }}
        >
          <Stack direction="column">
            <Stack
              direction="row"
              justifyContent="space-between"
              my="1rem"
              alignItems="center"
              alignSelf="stretch"
            >
              <Stack direction="row" alignItems="center" gap="1rem">
                <Avatar
                  alt="User-Avatar"
                  src={advert.advert_creator.thumbnail}
                  sx={{ width: 75, height: 75 }}
                />
                <Stack direction="column">
                  <Typography
                    sx={{
                      fontFamily: 'Manrope',
                      fontSize: '1.4rem',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: 'normal',
                      mb: '0.5rem',
                    }}
                  >
                    <Link
                      to={`/profil/${advert.advert_creator.slug}`}
                      style={{ textDecoration: 'none', color: '#000' }}
                    >
                      {advert.advert_creator.firstname}{' '}
                      {advert.advert_creator.lastname}
                    </Link>
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Manrope',
                      fontSize: '1rem',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    Il y a {calculateTimeSpent(advert.created_at)}
                  </Typography>
                </Stack>
              </Stack>
              <FavouriteButton id={id} />
            </Stack>
            <CardMedia
              component="img"
              sx={{ objectFit: 'contain' }}
              src={advert.images.map((image) => image.thumbnail)}
              alt="green iguana"
            />
            <Stack direction="row" justifyContent="space-between" m="1rem">
              <Paper
                sx={{
                  backgroundColor: '#F5F6FA',
                  width: '10rem',
                  p: '1rem',
                }}
              >
                <Stack direction="row" gap="1rem" justifyContent="center">
                  <Typography>Distance</Typography>
                  <Typography>1 km</Typography>
                </Stack>
              </Paper>
              <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {advert.title}
              </Typography>
              <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {advert.price} €
              </Typography>
            </Stack>
            <Typography
              sx={{ fontSize: '1.4rem', textAlign: 'center', mb: '1rem' }}
            >
              {advert.content}
            </Typography>

            <ContactButton />
          </Stack>
        </Paper>
        <SeparateBar />
        <ContentUserAdvert userAdverts={adverts} />
      </Grid>
    </>
  );
}

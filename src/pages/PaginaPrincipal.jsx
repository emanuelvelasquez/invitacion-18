// @mui material components
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// Material Kit 2 React components
import MKBox from '../components/MKBox'
import MKTypography from '../components/MKTypography'
import MKAvatar from '../components/MKAvatar'
import DefaultFooter from '../examples/Footers/DefaultFooter'
import CenteredBlogCard from '../examples/Cards/BlogCards/CenteredBlogCard'
import React from 'react'

import Confirma from './sections/Confirma'
import Ubicacion from './sections/Ubicacion'
// Images
import bgImage from '../assets/images/wallpaper.jpg'
//import avImage from 'assets/images/avatar.png'
import avImage from '../assets/images/avatar.png'

import dataFooter from './footer.routes'

function PaginaPrincipal() {
  return (
    <>
      <MKBox
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          display: 'grid',
          placeItems: 'center',
          minHeight: { xs: '50vh', lg: '55vh' },
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={2}
              align="center"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down('sm')]: {
                  fontSize: size['3xl'],
                },
              })}
              textTransform="capitalize"
              fontWeight="regular"
            >
              Mis 18 Años
            </MKTypography>
            <Grid container justifyContent="center">
              <MKAvatar
                src={avImage}
                alt="A"
                sx={{ height: '15vh', width: '15vh' }}
                shadow="xxl"
              />
            </Grid>
            <MKTypography
              color="white"
              mt={3}
              mb={3}
              variant="body2"
              align="center"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down('sm')]: {
                  fontSize: '0.8em',
                },
              })}
              textTransform="capitalize"
              fontWeight="regular"
            >
              En la vida he transitado por muchos caminos que me enseñaron
              muchas cosas, donde recolecte muchas amistades, comprendí que
              siempre hay que ir para adelante. Por eso quiero festejar este
              momento tan especial junto a ustedes.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>

      <Card
        sx={{
          pt: 2,
          pl: { xs: 2, lg: 5 },
          pr: { xs: 2, lg: 5 },
          pb: 6,
          mx: { xs: 1, lg: '20%' },
          width: { xs: '100', lg: '60%' },
          mt: { xs: -4, lg: -8 },
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
            rgba(white.main, 0.8),
          backdropFilter: 'saturate(1%) blur(100px)',
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <CenteredBlogCard
          title="Te espero el 14 de enero de 2023 a las 21:30 hs."
          image={bgImage}
          // description="asdasdas"
        />
        <Confirma />
        <Ubicacion />
      </Card>
      <MKBox
        pt={6}
        px={1}
        mt={6}
        sx={{ mx: { xs: 1, lg: '20%' }, width: { xs: '100', lg: '60%' } }}
      >
        <DefaultFooter content={dataFooter} />
      </MKBox>
    </>
  )
}

export default PaginaPrincipal

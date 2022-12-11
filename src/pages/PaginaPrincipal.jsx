// @mui material components
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// Material Kit 2 React components
import MKBox from '../components/MKBox'
import MKTypography from '../components/MKTypography'
import MKAvatar from '../components/MKAvatar'
import DefaultFooter from '../examples/Footers/DefaultFooter'
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
        minHeight="55vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          display: 'grid',
          placeItems: 'center',
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
            >
              Invitación 18 Años
            </MKTypography>
            <Grid container justifyContent="center">
              <MKAvatar
                src={avImage}
                alt="A"
                sx={{ height: '150px', width: '150px' }}
                shadow="xxl"
              />
            </Grid>
            <MKTypography
              variant="body2"
              color="white"
              mt={3}
              mb={3}
              align="center"
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit ac metus
              torquent tortor tristique ridiculus, ultrices porttitor odio
              platea justo lectus ullamcorper turpis conubia urna magnis.
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
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
            rgba(white.main, 0.8),
          backdropFilter: 'saturate(100%) blur(50px)',
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
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

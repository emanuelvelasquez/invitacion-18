/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from 'react'
// react-router-dom components
import { Link } from 'react-router-dom'

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types'

// @mui material components
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

// Material Kit 2 React components
import MKBox from '../../../components/MKBox'
import MKTypography from '../../../components/MKTypography'

function DefaultFooter({ content }) {
  const { brand, socials, menus, copyright } = content
  const diaActual = (separator = '/') => {
    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    return `${date}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`
  }

  return (
    <MKBox component="footer" mt={-10}>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sx={{ ml: 'auto', mb: 3 }}>
            <MKBox>
              <Link to={brand.route}></Link>
              <MKTypography variant="h5">Contactos:</MKTypography>
            </MKBox>
            <MKBox display="flex" alignItems="center" mt={3}>
              {socials.map(({ icon, link }, key) => (
                <MKTypography
                  key={link}
                  component="a"
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  variant="h5"
                  color="dark"
                  opacity={0.8}
                  mr={key === socials.length - 1 ? 0 : 2.5}
                >
                  {icon}
                </MKTypography>
              ))}
            </MKBox>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center', my: 1, mt: -3 }}>
            <MKTypography variant="body2">&copy; {diaActual()}</MKTypography>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  )
}

// Typechecking props for the DefaultFooter
DefaultFooter.propTypes = {
  content: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  ).isRequired,
}

export default DefaultFooter

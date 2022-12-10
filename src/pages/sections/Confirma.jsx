// react-router-dom components
import { Link } from 'react-router-dom'
import React, { useState } from 'react'

// @mui material components
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import FilledInput from '@mui/material/FilledInput'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import MKBox from '../../components/MKBox'
import MKAlert from '../../components/MKAlert'
import MKButton from '../../components/MKButton'
import MKBadge from '../../components/MKBadge'
import MKTypography from '../../components/MKTypography'
import MKInput from '../../components/MKInput'

function Confirma() {
  const [alert, setAlert] = useState(false)
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  return (
    <MKBox
      component="section"
      variant="contained"
      py={1}
      mb={5}
      sx={{ borderRadius: 2, boxShadow: ({ boxShadows: { xxl } }) => xxl }}
    >
      <Container>
        <Grid
          container
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: 'center', mx: 'auto', mb: 2 }}
        >
          <MKTypography
            variant="h2"
            fontWeight="bold"
            sx={({ breakpoints, typography: { size } }) => ({
              [breakpoints.down('sm')]: {
                fontSize: size['2xl'],
              },
            })}
          >
            Confirma Tu Asistencia
          </MKTypography>
          <MKTypography variant="body2" color="text" sx={{ marginBottom: 2 }}>
            Ingresa tu contraseña para podes seguir
          </MKTypography>
          <FormControl sx={{ m: 1, width: '26ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Contraseña
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              onkeyup="javascript:this.value=this.value.toUpperCase();"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <MKButton variant="contained" color="info">
            Ingresar
          </MKButton>
          {alert && (
            <MKAlert
              severity="error"
              alertStatus="fadeOut"
              color="error"
              sx={{
                mt: 2,
                width: 300,
                p: 0,
                justifyContent: 'center',
              }}
            >
              Verifica la contraseña
            </MKAlert>
          )}
        </Grid>
      </Container>
    </MKBox>
  )
}

export default Confirma

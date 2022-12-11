import React, { useEffect, useState } from 'react'

// @mui material components
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import MKBox from '../../components/MKBox'
import MKAlert from '../../components/MKAlert'
import MKButton from '../../components/MKButton'
import MKTypography from '../../components/MKTypography'

import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../lib/init-firebase'

function Confirma() {
  const [invitados, setInvitados] = useState([])

  const verificaInvitado = () => {
    if (invitados.some(e => e.id === values.password)) {
      console.log('si')
      setAlert(false)
    } else {
      console.log('nbo')

      setAlert(true)
    }
  }

  const [alert, setAlert] = useState(false)
  const [values, setValues] = useState({
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

  function getListaInvitados() {
    const invitadosCollection = collection(db, 'invitados')
    getDocs(invitadosCollection)
      .then(response => {
        //console.log(response);
        const invitadosDoc = response.docs.map(doc => {
          return {
            lista: doc.data().familia.map((fami, index) => ({
              ApellidoNombre: fami.ApellidoNombre,
              asistira: fami.asistira,
            })),
            id: doc.id,
          }
        })
        setInvitados(invitadosDoc)
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    getListaInvitados()
    return () => {}
  }, [])

  return (
    <MKBox
      component="section"
      variant="contained"
      py={1}
      mb={5}
      hight="50%"
      sx={{ borderRadius: 2, boxShadow: ({ boxShadows: { xxl } }) => xxl }}
    >
      <Container>
        <Grid
          container
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
          <MKButton
            disabled={values.password.length == 0}
            variant="contained"
            color="info"
            onClick={() => {
              verificaInvitado()
            }}
          >
            Ingresar
          </MKButton>
          {alert && values.password.length > 0 && (
            <MKAlert
              severity="error"
              color="error"
              sx={{
                mt: 2,
                width: 300,
                p: 1,
                justifyContent: 'center',
              }}
            >
              <MKTypography
                variant="body2"
                color="white"
                sx={{ fontSize: '0.9em' }}
              >
                Contraseña invalida
              </MKTypography>
            </MKAlert>
          )}
        </Grid>
      </Container>
    </MKBox>
  )
}

export default Confirma

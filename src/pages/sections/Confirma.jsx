import React, { useEffect, useState } from 'react'

// @mui material components
import Container from '@mui/material/Container'
import Collapse from '@mui/material/Collapse'
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
import Lista from '../components/Lista'

import { db } from '../../lib/init-firebase'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'

function Confirma() {
  //const [invitadosT, setInvitadosT] = useState([])
  const [invitados, setInvitados] = useState([])
  const [id, setId] = useState('')
  const [button, setButton] = useState({
    texto: 'CONTINUAR',
    btDisabled: true,
  })
  const [button1, setButton1] = useState({
    texto: 'CONFIRMAR',
    btDisabled: false,
    color: 'info',
  })
  const [button2, setButton2] = useState({
    texto: 'MODIFICAR',
    color: 'info',
    visible: false,
  })

  const modificar = () => {
    setButton1({
      texto: 'CONFIRMAR',
      btDisabled: false,
      color: 'info',
    })
    setButton2({ ...button2, visible: false })
  }

  const confirmaInv = async () => {
    debugger
    setButton1({ ...button1, texto: 'CONFIRMANDO...', btDisabled: true })
    const docRef = doc(db, 'invitados', id)
    const docSnap = await getDoc(docRef)
    let result = null
    if (docSnap.data().familia) {
      result = await updateDoc(docRef, { familia: invitados, verificado: true })
    } else {
      result = await updateDoc(docRef, { amigo: invitados, verificado: true })
    }
    setButton1({ color: 'success', texto: 'CONFIRMADO', btDisabled: true })
    setTimeout(() => {
      setButton2({ ...button2, visible: true })
    }, 1500)
  }

  const verificaInvitado = async () => {
    setButton({ texto: 'VERIFICANDO...', btDisabled: true })
    const docRef = doc(db, 'invitados', values.password)
    debugger
    const docSnap = await getDoc(docRef)
    let result = null
    if (docSnap.exists()) {
      result = docSnap.data().familia
        ? docSnap.data().familia
        : docSnap.data().amigo
      setValues({
        ...values,
        count: result.length,
      })
      const lista2 = result

      lista2.sort((a, b) => {
        if (a.ApellidoNombre.toLowerCase() < b.ApellidoNombre.toLowerCase()) {
          return -1
        }
        if (a.ApellidoNombre.toLowerCase() > b.ApellidoNombre.toLowerCase()) {
          return 1
        }
        return 0
      })
      if (docSnap.data().verificado) {
        setButton1({ color: 'success', texto: 'CONFIRMADO', btDisabled: true })
      }
      setInvitados(result)
      setButton2({ ...button2, visible: docSnap.data().verificado })
      setId(values.password)
      setOpen(true)
    } else {
      setButton({ texto: 'CONTINUAR', btDisabled: false })

      setAlert(true)
    }
  }

  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState(false)

  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    count: 0,
    showPassword: false,
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    if (event.target.value.length == 0) {
      setButton({ texto: 'CONTINUAR', btDisabled: true })
    } else {
      setButton({ texto: 'CONTINUAR', btDisabled: false })
    }
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

  // useEffect(() => {
  //   getListaInvitados()
  //   return () => {}0
  // }, [])

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
        </Grid>
        <Collapse in={!open} timeout="auto" unmountOnExit>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            sx={{ textAlign: 'center', mx: 'auto', mb: 2 }}
          >
            <MKTypography variant="body2" color="text" sx={{ marginBottom: 2 }}>
              Ingresa tu codigo para podes seguir
            </MKTypography>
            <FormControl sx={{ m: 1, width: '26ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Codigo
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
              disabled={button.btDisabled}
              variant="contained"
              color="info"
              onClick={() => {
                verificaInvitado()
              }}
            >
              {button.texto}
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
                  Codigo invalido
                </MKTypography>{' '}
              </MKAlert>
            )}
          </Grid>
        </Collapse>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            sx={{ textAlign: 'center', mx: 'auto', mb: 2 }}
          >
            <MKTypography variant="body2" color="text" sx={{ marginBottom: 2 }}>
              Total de Invitaciones a confirmar: {values.count}
            </MKTypography>
            <Lista
              invitados={invitados}
              modificado={button2.visible}
              changeAsistencia={setInvitados}
              id={id}
            />
            <Collapse in={!button2.visible} timeout="auto" unmountOnExit>
              <MKButton
                //endIcon={null}
                disabled={button1.btDisabled}
                variant="contained"
                color={button1.color}
                sx={{ mt: 2 }}
                onClick={() => {
                  confirmaInv()
                }}
              >
                {button1.texto}
              </MKButton>
            </Collapse>
            <Collapse in={button2.visible} timeout="auto" unmountOnExit>
              <MKButton
                //endIcon={null}
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => {
                  modificar()
                }}
              >
                {button2.texto}
              </MKButton>
            </Collapse>
          </Grid>
        </Collapse>
      </Container>
    </MKBox>
  )
}

export default Confirma

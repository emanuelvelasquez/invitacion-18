import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import MUIDataTable from 'mui-datatables'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import MKBox from '../components/MKBox'
import MKAlert from '../components/MKAlert'
import MKButton from '../components/MKButton'
import MKTypography from '../components/MKTypography'

import { db } from '../lib/init-firebase'
import { doc, getDocs, collection } from 'firebase/firestore'

export default function TablaInvitados(props) {
  const [invitados, setInvitados] = useState([])
  const [countSi, setCountSi] = useState(0)
  const [countNo, setCountNo] = useState(0)
  const [countTotal, setCountTotal] = useState(0)
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    showPassword: false,
  })
  const LoadTaBLA = async () => {
    const colRef = collection(db, 'invitados')
    const docsSnap = await getDocs(colRef)
    const lista = []
    docsSnap.docs.forEach((doc, index) => {
      if (doc.data().familia) {
        doc.data().familia.forEach(fami => {
          lista.push({
            nombre: fami.ApellidoNombre,
            asistira: fami.asistira ? 'Si' : 'No',
            tipo: 'Familiar',
          })
        })
      } else {
        doc.data().amigo.forEach(ami => {
          lista.push({
            nombre: ami.ApellidoNombre,
            asistira: ami.asistira ? 'Si' : 'No',
            tipo: 'Amigo/a',
          })
        })
      }
    })
    setInvitados(lista)
    debugger
    setCountTotal(lista.length)
    setCountSi(lista.filter(inv => inv.asistira == 'Si').length)
    setCountNo(lista.filter(inv => !inv.asistira == 'No').length)
  }

  const columns = [
    {
      name: 'nombre',
      label: 'Apellido, Nombre',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'tipo',
      label: 'Tipo',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'asistira',
      label: 'Asistencia',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value == 'Si') {
            return <CheckCircleOutlineIcon fontSize="medium" color="success" />
          } else {
            return <DoDisturbIcon color="error" fontSize="medium" />
          }
        },
      },
    },
  ]

  function verificaContraseña() {
    if (values.password == 'fernet2022') {
      setOpen(true)
    }
  }

  const [button, setButton] = useState({
    texto: 'CONTINUAR',
    btDisabled: false,
  })

  const options = {
    filterType: 'checkbox',

    selectableRows: false,
  }

  const [open, setOpen] = useState(false)

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
  useEffect(() => {
    LoadTaBLA()

    return () => {}
  }, [])

  return (
    <>
      <AppBar position="static" color="info">
        <Toolbar variant="dense">
          <MKTypography variant="h4" color="inherit" component="div">
            Listados de Invitados
          </MKTypography>
        </Toolbar>
      </AppBar>
      <Card
        sx={{
          pt: 2,
          pl: { xs: 2, lg: 5 },
          pr: { xs: 2, lg: 5 },
          pb: 6,
          mx: { xs: 1, lg: '20%' },
          width: { xs: '100', lg: '60%' },
          borderRadius: 0,
        }}
      >
        <Collapse in={open}>
          <Box sx={{ height: '100%', width: '100%' }}>
            <MKTypography variant="h6" color="text" sx={{ marginBottom: 2 }}>
              Total Invitados: {countTotal}
            </MKTypography>{' '}
            <MKTypography variant="h6" color="text" sx={{ marginBottom: 2 }}>
              Total Invitados que SI asisten: {countSi}
            </MKTypography>{' '}
            <MKTypography variant="h6" color="text" sx={{ marginBottom: 2 }}>
              Total Invitados que NO asisten: {countNo}
            </MKTypography>
            <MUIDataTable
              colors="info"
              title={'Invitados'}
              data={invitados}
              columns={columns}
              options={options}
            />
          </Box>
        </Collapse>
        <Collapse in={!open} timeout="auto" unmountOnExit>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            sx={{ textAlign: 'center', mx: 'auto', mb: 2 }}
          >
            <MKTypography variant="h4" color="text" sx={{ marginBottom: 2 }}>
              Ingresar clave
            </MKTypography>
            <FormControl sx={{ m: 1, width: '26ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Clave
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
                verificaContraseña()
              }}
            >
              {button.texto}
            </MKButton>
          </Grid>
        </Collapse>
      </Card>
    </>
  )
}

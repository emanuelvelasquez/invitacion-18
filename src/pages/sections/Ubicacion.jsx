// react-router-dom components
import React from 'react'

// Material Kit 2 React components
import MKBox from '../../components/MKBox'
import MKTypography from '../../components/MKTypography'

function Ubicacion() {
  return (
    <MKBox
      pt={2}
      pb={0}
      px={2}
      sx={{
        backgroundColor: '#25334a',
        textColor: 'white',
        margin: -1,
        borderRadius: 2,
        boxShadow: ({ boxShadows: { xxl } }) => xxl,
      }}
    >
      <MKTypography
        display="block"
        variant="body1"
        color="white"
        mt={-0.625}
        mb={2}
      >
        Se realizara el dia 26 de Enero, a las 21:00 Hs.
      </MKTypography>
      <MKTypography
        display="block"
        variant="h5"
        color="white"
        mt={-0.625}
        mb={2}
      >
        Ubicación:
        <MKTypography display="block" variant="body2" color="white" mt={-0.625}>
          Emilio Bottini 1816, San Salvador de Jujuy, Jujuy
        </MKTypography>
      </MKTypography>
      <iframe
        title="googleMaps"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d454.802033588074!2d-65.27548850181023!3d-24.227215473618813!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b06236165ca61%3A0x6d5a9435bcb66669!2sEmilio%20Bottini%201816%2C%20San%20Salvador%20de%20Jujuy%2C%20Jujuy!5e0!3m2!1ses-419!2sar!4v1670700741396!5m2!1ses-419!2sar"
        style={{
          border: 0,
          position: 'relative',
          height: '25vw',
          width: '100%',
          borderRadius: 5,
        }}
        loading="lazy"
      ></iframe>
    </MKBox>
  )
}

export default Ubicacion

import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'
import imgAvatar from '../../assets/images/avatarDefault.png'

export default function CheckboxListSecondary({
  invitados,
  modificado,
  changeAsistencia,
  id,
}) {
  const handleToggle = value => {
    debugger
    const invitados2 = invitados.filter(
      m => m.ApellidoNombre != value.ApellidoNombre,
    )
    invitados2.push({
      ApellidoNombre: value.ApellidoNombre,
      asistira: !value.asistira,
    })
    invitados2.sort((a, b) => {
      if (a.ApellidoNombre.toLowerCase() < b.ApellidoNombre.toLowerCase()) {
        return -1
      }
      if (a.ApellidoNombre.toLowerCase() > b.ApellidoNombre.toLowerCase()) {
        return 1
      }
      return 0
    })
    changeAsistencia([...invitados2])
  }

  return (
    <List dense sx={{ width: '100%', maxWidth: 400, p: 3 }}>
      {invitados.map(value => {
        const labelId = `checkbox-list-secondary-label-${value}`
        return (
          <ListItem
            key={value.ApellidoNombre}
            onClick={() => {
              debugger
              if (!modificado) {
                handleToggle(value)
              } else {
                return
              }
            }}
            disabled={modificado}
            secondaryAction={
              <Checkbox
                disabled={modificado}
                edge="end"
                //onChange={}
                checked={value.asistira}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={`Avatar`} src={imgAvatar} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={value.ApellidoNombre} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

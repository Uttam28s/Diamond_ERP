import { DeleteOutlined, EditOutlined, EyeOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Switch } from 'antd'
import React from 'react'

export const DeleteIconButton = ({ className , handleClick, buttonColor, disabled }) => {
  return (
    <Button danger disabled={disabled} className={` flex items-center mx-1 border-none ${className ? className : 'bg-red-100' } `} onClick={() => handleClick()}><DeleteOutlined className={`${buttonColor ? buttonColor   : 'text-red-600'}`} /></Button>
  )
}

export const EditIconButton = ({ handleClick }) => {
  return (
    <Button className='border-none bg-gray-200 text-black flex items-center hover:!text-black' onClick={() => handleClick()}><EditOutlined /></Button>
  )
}

export const ViewButton = ({ handleClick }) => {
  return (
    <Button className='border-none bg-gray-200 text-black flex items-center hover:!text-black' onClick={() => handleClick()}><EyeOutlined /></Button>
  )
}

export const CommonSwitch = ({ status, handleChange, disabled }) => {
  return (
    <Switch className='bg-gray-400' checked={status} onChange={() => handleChange()} disabled={disabled} />
  )
}

export const SaveIconButton = ({ handleClick }) => {
  return (
    <Button className='border-none bg-blue-500 text-white  flex items-center' onClick={() => handleClick()}><SaveOutlined /></Button>
  )
}
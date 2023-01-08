import { Button, Modal } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { FamilyDetailsForm } from './FamilyDetailsForm';
import { AddFamilyModalView } from './AddFamilyModalView';

export const AddFamilyBtn = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);


  return (
    <>
      <Button variant="contained" component="label" onClick={handleOpen} >
        Add Family
      </Button>
      
      <AddFamilyModalView open={open} setOpen={setOpen}/>
      
    </>
  )
}

'use client'

import SimpleMdeReact from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css';
import { TextField, Button} from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
            <TextField.Input placeholder='title'/>
        </TextField.Root>
        <SimpleMdeReact placeholder='description'/>
        <Button>Submit New Issue</Button>
      
    </div>
  )
}

export default NewIssuePage

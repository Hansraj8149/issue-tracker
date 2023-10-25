'use client'

import SimpleMdeReact from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css';
import { TextField, Button} from '@radix-ui/themes'
import React from 'react'
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueFormI {
    title:string;
    description:string;
}

const NewIssuePage = () => {

    const router = useRouter();

    const  {register, control, handleSubmit} = useForm<IssueFormI>();

  return (
    <form className='max-w-xl space-y-3' onSubmit={ handleSubmit(async (data) =>{
         await axios.post('/api/issues',data);
         router.push('/issues');

    } )}>
        <TextField.Root>
            <TextField.Input placeholder='title' {...register('title')}/>
        </TextField.Root>
        <Controller
        name='description'
        control={control}
        render={({field}) =><SimpleMdeReact placeholder='description' {...field}/> }
        />
        
        <Button>Submit New Issue</Button>
      
    </form>
  )
}

export default NewIssuePage

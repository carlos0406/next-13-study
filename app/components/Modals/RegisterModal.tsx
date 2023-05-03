"use client"

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { useCallback,useState } from 'react'
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import  {toast} from 'react-hot-toast'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import Modal from '.'
import Heading from '../Heading'
import Input from '../Inputs/Inputs'
import Button from '../Button'
import { signIn } from 'next-auth/react'

const RegisterModal = ()=>{
  const registerModal = useRegisterModal();
  const [isLoading,setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState:{
      errors
    }} = useForm<FieldValues>({
      defaultValues:{
        name: '',
        email: '',
        password: '',
      }
    });

  const onSubmit: SubmitHandler<FieldValues> = data=>{
    console.log("asqui")
    setIsLoading(true);
    axios.post('/api/register',data).then(()=>{
      registerModal.onClose()
    })
    .catch(error=>{toast.error("Alguma coisa está errada")})
    .finally( ()=>setIsLoading(false))
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={
        (<div className="flex flex-col gap-4">
         <Heading title='Welcome to Airbnb' subtitle='Create an account'/>
         <Input register={register} id="email" label='Email' disabled= {isLoading} erros={errors} required/>
         <Input register={register} id="name" label='Name' disabled= {isLoading} erros={errors} required/>
         <Input register={register} id="password" type="password" label='Password' disabled= {isLoading} erros={errors} required/>
        </div>
        )
      }

      footer={
        (
          <div className="flex flex-col gap-4">
            <hr/>
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={()=>{signIn('google')}}/>
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={()=>{signIn('github')}}/>
            <div className='text-neutral-500 text-center mt-4 font-light'>
              <div className='justify-center flex flex-row items-center gap-2'> 
                <div>Aleardy have an account?</div>
                <div className='text-neutral-800 cursor-pointer hover:underline' onClick={registerModal.onClose}>Log in</div>
              </div>
            </div>
          </div>
        )
      }
    />
  )
}

export default RegisterModal
"use client"

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { useCallback,useState } from 'react'
import {signIn} from 'next-auth/react'
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import  {toast} from 'react-hot-toast'

import Modal from '.'
import Heading from '../Heading'
import Input from '../Inputs/Inputs'
import Button from '../Button'
import useLoginModal from '@/app/hooks/useLoginModal'
import { useRouter } from 'next/navigation'

const LoginModal = ()=>{
  const router = useRouter()
  const loginModal = useLoginModal();
  const [isLoading,setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState:{
      errors
    }} = useForm<FieldValues>({
      defaultValues:{
        email: '',
        password: '',
      }
    });

  const onSubmit: SubmitHandler<FieldValues> = data=>{
    console.log("asqui")
    setIsLoading(true);
    signIn('credentials',{
      ...data,
      redirect:false
    }).then((callback)=>{
      setIsLoading(false)
      if(callback?.ok){
        toast.success('Welcome back!')
        loginModal.onClose()
        router.refresh()
      }

      if(callback?.error){
        toast.error(String(callback?.error))
      }
    })
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel='Login'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={
        (<div className="flex flex-col gap-4">
         <Heading title='Welcome back' subtitle='Login to your account'/>
         <Input register={register} id="email" label='Email' disabled= {isLoading} erros={errors} required/>
         <Input register={register} id="password" type="password" label='Password' disabled= {isLoading} erros={errors} required/>
        </div>
        )
      }

      footer={
        (
          <div className="flex flex-col gap-4">
            <hr/>
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={()=>signIn('google')}/>
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={()=>signIn('github')}/>
            <div className='text-neutral-500 text-center mt-4 font-light'>
              <div className='justify-center flex flex-row items-center gap-2'> 
                <div>Aleardy have an account?</div>
                <div className='text-neutral-800 cursor-pointer hover:underline' onClick={loginModal.onClose}>Log in</div>
              </div>
            </div>
          </div>
        )
      }
    />
  )
}

export default LoginModal
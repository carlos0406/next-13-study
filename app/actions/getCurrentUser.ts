import  prisma  from '@/app/libs/prismadb';
import {getServerSession} from 'next-auth/next'
import {authOptions} from "@/pages/api/auth/[...nextauth]"


export async function getSession(){
  return await getServerSession(authOptions)
}

export default async function getCurrentUser(){
  try{
    const session = await getSession()
    if(!session){
      return null
    }

    const user = await prisma.user.findUnique({
        where:{
          email:session?.user?.email as string
        }
      })
      
    if(!user){
      return null
    }
    return {
      ...user,
      createdAt:user.createdAt.toISOString(),
      updatedAt:user.updatedAt.toISOString(),
      emailVerified:user.emailVerified?.toISOString() || null
    }
  }catch(error:any){
    return null
  }
}
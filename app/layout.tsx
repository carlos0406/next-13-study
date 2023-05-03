import { Nunito } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import { Navbar } from './components/navbar'
import './globals.css'
import RegisterModal from './components/Modals/RegisterModal'
import ToasterProvider from './Providers/ToastProvider'
import LoginModal from './components/Modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font= Nunito({subsets:['latin']})

 const  RootLayout= async ({
  children,
}: {
  children: React.ReactNode
}) =>{
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
     
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <Navbar currentUser={currentUser}/>
          <RegisterModal/>
          <LoginModal/>
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
export default RootLayout;
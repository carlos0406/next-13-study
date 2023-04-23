'use client'

import Image from "next/image"
const Avatar = () => {

  return (
    <Image
      className="hidden md:block rounded-full"
      src="/images/placeholder.jpg"
      height={30}
      width={30}
      alt='avatar'
      />
  )
}

export default Avatar
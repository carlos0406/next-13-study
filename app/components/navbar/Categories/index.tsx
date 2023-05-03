"use client"

import {TbBeach} from 'react-icons/tb'
import {GiWindmill} from 'react-icons/gi'
import {MdOutlineVilla} from 'react-icons/md'
import CategoryBox from "./CategoryBox"
import Container from '../../Container'
export const categories = [
  {label:'Beach', icon: TbBeach, description: "This propety is close to the beach"},
  {label:'Windmills', icon: GiWindmill, description: "This propety is close to the beach"},
  {label:'Modern', icon: MdOutlineVilla, description: "This propety is close to the beach"}
]

const Categories = () => {
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-hidden">
        {categories.map(c => (
          <CategoryBox key= {c.label} label={c.label} description={c.description} icon={c.icon} />
        ))}
      </div>
    </Container>
  )
}

export default Categories
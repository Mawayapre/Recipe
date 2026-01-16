import React from 'react'
import Image  from 'next/image';
import styles from '../../../styles/page.module.css'
import Content from '../componet/content'

const Recipe = async ({params}) => {

    const {id} = await params;
    console.log('id', id)



  return (
        <>
        < Content id={id} />
        </>
    
  )
}

export default Recipe
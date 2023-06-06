import React, { useEffect, useState } from 'react'
import './style.scss'
import ContentWrapper from '../../../components/contentwrapper/contentwraper'
import Switchtabs from '../../../components/switchtabs/Switchtabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
function Popular() {
    const [endingpoint,setendingpoint]=useState('movie')
    const onTabChange=(tab)=>{
        if(tab=='Movies'){
            setendingpoint('movie')
        }else{
            setendingpoint('tv')
        }
        
    }
    const {loading,data}=useFetch(`/${endingpoint}/popular`)
    
  return (
    <div className='carouselSection' >
        <ContentWrapper>
            <span className='carouselTitle'>
                What's popular
            </span>
            <Switchtabs data={['Movies','TV shows']} onTabChange={onTabChange}/>
        </ContentWrapper>
        
        <Carousel data={data?.results} loading={loading} endingpoint={endingpoint} />
    </div>
  )
}

export default Popular
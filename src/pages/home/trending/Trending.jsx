import React, { useEffect, useState } from 'react'
import './style.scss'
import ContentWrapper from '../../../components/contentwrapper/contentwraper'
import Switchtabs from '../../../components/switchtabs/Switchtabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
function Trending() {
    const [endingpoint,setendingpoint]=useState('day')
    const [trendingData,setTrendingData]=useState({})
    const onTabChange=(tab)=>{
        if(tab=='Day'){
            setendingpoint('day')
        }else{
            setendingpoint('week')
        }
        
    }
    const {loading,data}=useFetch(`/trending/all/${endingpoint}`)
    
  return (
    <div className='carouselSection' >
        <ContentWrapper>
            <span className='carouselTitle'>
                Trending
            </span>
            <Switchtabs data={['Day','Week']} onTabChange={onTabChange}/>
        </ContentWrapper>
        
        <Carousel data={data?.results} loading={loading} endingpoint={endingpoint} />
    </div>
  )
}

export default Trending
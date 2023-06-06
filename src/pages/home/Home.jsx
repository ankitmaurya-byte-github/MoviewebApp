import React from 'react'
import Herobanner from './herobanner/Herobanner'
import { useSelector } from 'react-redux'
import Header from '../../components/header/Header'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
function Home() {
  const home=useSelector(state=>state.home)
  return (
    <div className='homePage'>
      
    <Herobanner/>
    <Trending/>
    <Popular/>
    <TopRated/>
    </div>
  )
}

export default Home
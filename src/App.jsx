import { useEffect, useState } from 'react'
// import './App.css'
import { fetchDataFromApi } from './utils/api'
import { getApiConfiguration,getGenres} from './store/homeSlice'
import { useSelector } from 'react-redux';
import Header from './components/header/Header';
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Details from './pages/details/Details';
import SearchResult from './pages/searchresult/SearchResult';
import PageNotFound from './pages/pageNOtFound/PageNotFound';
import Explore from './pages/explore/Explore';
function App() {
  const home=useSelector(state=>state.home)
  const dispatch=useDispatch()
  useEffect(()=>{

    fetchDataFromApi('/configuration').then(res=>{
      const url={
        backdrop:res.images.secure_base_url+'original',
        poster:res.images.secure_base_url+'original',
        profile:res.images.secure_base_url+'original'
      }
      dispatch(getApiConfiguration(url))
      genreCall()

    })

  },[])

  const genreCall=async()=>{
    let promises=[];
    let endpoint=['tv','movie']
    let allgenre={}

    endpoint.forEach(element=>{
      promises.push(fetchDataFromApi(`/genre/${element}/list`))
    });
      const data=await Promise.all(promises)
      data.map(({genres})=>{
        genres.map(list=>{
          allgenre[list.id]=list
        })
      })
    
      dispatch(getGenres(allgenre))
  }

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:mediatype/:id' element={<Details/>}/>
      <Route path='/search/:query' element={<SearchResult/>}/>
      <Route path="/explore/:mediaType" element={<Explore />} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
// 
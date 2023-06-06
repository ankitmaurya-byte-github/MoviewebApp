import axios from 'axios'

const BASE_URL='https://api.themoviedb.org/3'
const TMDB_TOKEN=import.meta.env.VITE_APP_TMDB_TOKEN
const headers= {
    Authorization: `Bearer ${TMDB_TOKEN}`,
} 
export const fetchDataFromApi=async(url,params)=>{
    try{
        const a= await axios.get(BASE_URL+url,{
            headers,
            params
        })
        return a.data
    }catch(e){
        console.log(e);
        return e
    }
}
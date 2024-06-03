import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'


const App = () => {
  const [countryList , setCountryList] = useState([])
  const [country , setCountry] = useState('')

  const [stateList , setStateList] = useState([])
  const [state , setState] = useState('')

  const [cityList , setCityList] = useState([])
  const [city , setCity] = useState('')

  useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get('https://crio-location-selector.onrender.com/countries')
          setCountryList(res.data)
        } catch (error) {
          console.error(error)
        }
      }
      fetchData()
  } , [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`)
        setStateList(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  } , [country])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
        setCityList(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    if(state && country){
      fetchData()
    }
  } , [state , country])

  return (
    <section className=' container'>
      <h1 className=' mt-5 font-medium text-[2rem] text-center mb-5' >Select Location</h1>
      <div className='grid grid-cols-3 m-auto gap-5'>
        <div className='border'>
          <select
            value = {country}
            onChange={(e) => setCountry(e.target.value)}
            className='w-full'
          >
            <option value="" disabled = {!country}> Select Country</option>
            {countryList.map((ele) => (
              <option key={ele} value={ele} >{ele}</option>
            ))}
          </select>
        </div>

        <div className=' border'>
          <select
            value = {state}
            onChange={(e) => setState(e.target.value)}
            className='w-full'
          >
            <option value="" disabled = {!state}> Select State</option>
            {stateList.map((ele) => (
              <option key={ele} value={ele} >{ele}</option>
            ))}
          </select>
        </div>



        <div className='border'>
          <select
            value = {city}
            onChange={(e) => setCity(e.target.value)}
            className='w-full'
          >
            <option value="" disabled>Select City</option>
            {cityList.map((ele) => (
              <option key={ele} value={ele} >{ele}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className=' text-center mt-5 text-[1.5rem] font-medium'>
        <p className={city == '' && "hidden" }>You Selected {city}, 
          {" "}<span className=' text-stone-500'>{state}</span>, 
          {" "}<span className=' text-stone-500'>{country}</span>
        </p>
      </div>
    </section>
  )
}

export default App
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
    fetchData()
  } , [state , country])

  return (
    <section className=' container'>
      <h1 className=' mt-5 font-medium text-[2rem] text-center mb-5' >Select Location</h1>
      <div className='grid grid-cols-3 m-auto'>
      <Select onValueChange={(e) => setCountry(e)} defaultValue={country}>
        <SelectTrigger className="w-[90%] m-auto">
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent>
          {countryList.length != 0 ? (
            countryList.map((ele) => (
              <SelectItem key={ele} value={ele}>{ele}</SelectItem>
            ))
          ) : (
            <h1>Loading..</h1>
          )}
        </SelectContent>
      </Select>

      <Select onValueChange={(e) => setState(e)} defaultValue={state}>
        <SelectTrigger className="w-[90%] m-auto">
          <SelectValue placeholder="Select State" />
        </SelectTrigger>
        <SelectContent>
          {stateList.length != 0 ? (
            stateList.map((ele) => (
              <SelectItem key={ele} value={ele}>{ele}</SelectItem>
            ))
          ) : (
            <h1>Loading..</h1>
          )}
        </SelectContent>
      </Select>

      <Select onValueChange={(e) => setCity(e)} defaultValue={city}>
        <SelectTrigger className="w-[90%] m-auto">
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
          {cityList.length != 0 ? (
            cityList.map((ele) => (
              <SelectItem key={ele} value={ele}>{ele}</SelectItem>
            ))
          ) : (
            <h1>Loading..</h1>
          )}
        </SelectContent>
      </Select>
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
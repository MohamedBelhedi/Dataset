import './App.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { SpinnerDotted } from 'spinners-react';
// import bootstrap from 'bootstrap';

export default function App() {

  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState("")
  const [datas, setDatas] = useState([])
  // const [textEnable, setTextEnable] = useState(false)
  const [color, setColor] = useState("")
  const load = () => {
    setIsLoading(false)
    setText("Laden bitte warten.....")
    setTimeout(() => {
      window.open("https://data.cityofchicago.org/")
      setIsLoading(true)
      setText(text)

    }, 5000)

  }
  const fetchtData = () => {

    axios.get("https://data.cityofchicago.org/resource/kn9c-c2s2.json")
      .then(res => {

        console.log(res.data)
        setDatas(res.data)

      })


  }
  useEffect(() => {
    setIsLoading(false)
    setTimeout(() => {

      setText("Hallo")
      fetchtData()
      setIsLoading(true)
    }, 5000)
    const uhr = new Date().getHours()

    { uhr > 12 ? setColor("325b7d") | setText("Guten Tag") : setColor("1a8b43") }



  }, [])
  return (
    <>
      <SpinnerDotted
        enabled={!isLoading}
        color={color}
        thickness={100}
        size={100}

      />
      {text ?
        <>

          <h1>{text}</h1>
          {isLoading ?
            <>
              <h3>Die Daten kommen aus der Chicago City Data</h3>
              <button
                onClick={load}

              >Infos</button>
              <table className='justify-content-between align-items-center center md-5'>
                <thead>
                  <th >Area</th>
                  <th >housholds below Porverty in %</th>
                  <th >unemployed under age 16 in %</th>
                  <th >person without High School degree under 25 in %</th>
                  <th>income in $ per annum</th>
                  <th >Hard Index </th>
                </thead>
                {
                  datas.map((crimeData) => (
                    <>
                      <tr>{crimeData.community_area_name}
                        <td >{crimeData.percent_households_below_poverty} %</td>
                        <td >{crimeData.percent_aged_16_unemployed} %</td>
                        <td >{crimeData.percent_aged_25_without_high_school_diploma} %</td>
                        <td >{crimeData.per_capita_income_} $</td>
                        <td >{crimeData.hardship_index} </td>
                      </tr>




                    </>
                  ))



                }
              </table>
            </>
            : null}

        </>

        :
        <>
          <SpinnerDotted className='layout'
            enabled={isLoading}
            color={color}
            thickness={100}
            size={100}

          />

        </>

      }

    </>

  )
}
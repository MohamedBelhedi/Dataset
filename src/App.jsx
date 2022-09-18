import './App.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { SpinnerDotted } from 'spinners-react';
// import bootstrap from 'bootstrap';

export default function App() {

  const [isLoading, setIsLoading] = useState(true)
  const [vis, setVis] = useState(true)
  const [text, setText] = useState("")
  const [text1, setText1] = useState([])
  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState("")

  const [color, setColor] = useState([])
  const [textColor, setTextColor] = useState({ color: "red" })
  const load = () => {
    setIsLoading(false)
    setText("Laden bitte warten.....")
    setTimeout(() => {
      window.open("https://data.cityofchicago.org/")
      setIsLoading(true)
      setText("")

    }, 5000)

  }
  const fetchtData = () => {

    axios.get("https://data.cityofchicago.org/resource/kn9c-c2s2.json")
      .then(res => {

        console.log(res.data)
        setDatas(res.data)
        setText1(res.data)

        // { res.data.percent_aged_16_unemployed > 18 ? setTextColor({ color: "red" }) : textColor }



      })


  }

  const arbeitslos = (e) => {

    if (e.key === "Enter") {

      setSearch(search)
      setVis(false)


    }



  }
  useEffect(() => {
    setIsLoading(false)
    setTimeout(() => {

      setText("Hallo")
      fetchtData()
      setIsLoading(true)
    }, 5000)
    const uhr = new Date().getHours()

    { uhr > 12 ? setColor("325b7d") | setText("Guten Tag") : setColor("1a8b43") | setText("Guten Morgen") }



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
                        <td style={textColor} >{crimeData.percent_aged_16_unemployed} %</td>
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
      <>
        <hr />
        <div>

          <input
            onChange={(e) => {
              setSearch(e.target.value)
              console.log(e.target.value)

            }}
            onKeyPress={arbeitslos}
            value={search}
            placeholder="Arbeitslos in%..."
            type="number" />

        </div>
        {vis ? <h1>hier kommen die Daten......</h1> :
          <table className='justify-content-between align-items-center center md-5'>
            <thead className='justify-content-between align-items-center center md-5'>

              <th className='justify-content-between align-items-center center md-5'>Area</th>

              <th>unemployed under age 16 in %</th>



            </thead>

            {


              text1.map((text1_1) => (

                text1_1.percent_aged_16_unemployed === search ?
                  <>

                    <tr style={{ margin: 20 }} className='justify-content-between align-items-center center md-5'>
                      <td>{text1_1.community_area_name}
                      </td>
                      <td>{text1_1.percent_aged_16_unemployed}</td>
                    </tr>

                  </>

                  : null


              ))



            }
          </table>
        }
      </>

    </>

  )
}


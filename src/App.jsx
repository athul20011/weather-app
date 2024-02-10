import './App.css';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

const [city,setcity]=useState('kochi')
    // create state
    const [details,setdetails]=useState([])
    const [cel,setcel]=useState('')
    const [loc,setloc]=useState('Location')
    const [country,setcountry]=useState('Country')
    

    // function for api fetching
   
    const fetchData=async()=>{
      try {
          const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cc826dabc06882bf8978496fac57b27c&units=metric`)
          setdetails(response.data);
      } catch (error) {
          toast.error(error?.response?.data?.message);
      }
    }

    

    console.log(city);

  useEffect(()=>{
   let cel1=Math.floor(details?.main?.temp)
   setcel(cel1);
   setloc(details?.name)
   setcountry(details.sys?.country)
  })
  


  return (
    <div className="App">
      <div className="container bg-dark">
        <div className="main-div">

          <div className="weather-head text-center">
            <h1>Weather App</h1>
          </div>

          <div className="input">

              <TextField
          label=""
          id="outlined-size-small"
          defaultValue=""
          size="small" onChange={(e)=>{setcity(e.target.value)}} className='textfield' placeholder='Enter City Name' />
          </div>
          <button className='btn btn-dark 'onClick={fetchData}>
              search</button>
          <div className="weather-img">
          </div>

          <div className="weather-details">
              <div className="main-details">
                  <h4>{loc?loc:'Location,Country'},{country}</h4>
                  <h3>{cel?cel:'0'}<span>&deg;c</span> </h3>
                  <h4>{details.weather ? details.weather[0].description:'weather'}</h4>
              </div>

              <div className="sub-details">



                  <h4>{details.weather ? details.weather[0].main: ' '}</h4>


              </div>
          </div>
          <ToastContainer />

          <div className='display'>   
            <h3>Feels like:&nbsp;{cel?cel:'0'}&deg;c</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

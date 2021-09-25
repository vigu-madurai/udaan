import { useEffect, useState } from 'react';
import './App.css';
import ListAccident from './components/ListAccident';
import ViewDetails from './components/ViewDetails';
import axios from 'axios';
import { baseUrl } from './configs/apiList';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [accidentList, setAccidentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accident, setAccident] = useState("");

  const fetchTrafficDetails = () => {
    axios.get(baseUrl, {
      params: {
        crash_date: `${selectedDate}T00:00:00.000`
      }

    })
      .then(function (response) {
        if (response.status === 200) {
          setAccidentList(response.data);
        } else {
          setAccidentList([])
        }
      })
      .catch(function (error) {
        console.log(error);
        setAccidentList([]);
      })
      .then(function () {
        setIsLoading(false);
      });
  }

  const renderAlist = () => {
    console.log("renderAlist", accidentList)
    return accidentList.map((accident) => {
      return (
        <div key={accident.collision_id} className="card-wrapper" onClick={() => { setAccident(accident) }}>
          <div className="car-names">Crashed Cars Type: {accident.vehicle_type_code1} & {accident.vehicle_type_code2}
          </div>
          <div className="details"><div>{accident.crash_date}
          </div> {accident.crash_time}</div>
        </div>
      )
    })
  }
  useEffect(() => {
    if (accidentList.length) {
      return renderAlist();
    }
  }, [accidentList]);

  useEffect(() => {
    if (selectedDate) {
      fetchTrafficDetails()
    }
  }, [selectedDate]);

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    setIsLoading(true);
    fetchTrafficDetails();
  }
  console.log(accident)
  return (
    <div className="App">
      <div className="filter-wrapper">
        <ListAccident handleSelectedDate={handleSelectedDate} />
        {!isLoading ?
          (<div className="crash-list-wrapper">
            {renderAlist()}
          </div>) : "Loading"
        }
      </div>
      {accident ? <ViewDetails data={accident} /> : ""}
    </div>
  );
}

export default App;

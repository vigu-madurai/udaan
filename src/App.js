import { useEffect, useState } from 'react';
import './App.css';
import ListAccident from './components/ListAccident';
import ViewDetails from './components/ViewDetails';
import axios from 'axios';
import { baseUrl } from './configs/apiList';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [accidentList, setAccidentList] = useState([]);

  const fetchTrafficDetails = () => {
    axios.get(baseUrl, {
      params: {
        crash_date: `${selectedDate}T00:00:00.000`
      }

    })
      .then(function (response) {
        if (response.status === 200) {
          setAccidentList(response.data);

        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        setAccidentList([]);
      });
  }

  const renderAlist = () => {
    console.log("renderAlist", accidentList)
        return accidentList.map((accident) => {
            return (<div key={accident.collision_id} className="card-wrapper">
                <div className="car-names">Crashed Cars Type: {accident.vehicle_type_code1} & {accident.vehicle_type_code2}
                </div>
                <div className="details"><div>{accident.crash_date}
                </div> {accident.crash_time}</div>
            </div>)
        })
}
  useEffect(() => {
    renderAlist();
  }, [accidentList])

  useEffect(() => {
    if (selectedDate) {
      fetchTrafficDetails()
    }
  }, [selectedDate]);

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    fetchTrafficDetails();
  }

  return (
    <div className="App">
      <div className="filter-wrapper">
        <ListAccident handleSelectedDate={handleSelectedDate} />
        {accidentList.length ? <div className="crash-list-wrapper">
            {renderAlist()}
        </div>: ""}
      </div>

      <ViewDetails  />
    </div>
  );
}

export default App;

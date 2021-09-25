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
  const [page, setPage] = useState(1);
  const [limitList, setLimitList] = useState(5);

  const fetchTrafficDetails = (offset = 1, limit = 5) => {
    axios.get(baseUrl, {
      params: {
        crash_date: `${selectedDate}T00:00:00.000`,
        $limit: limit,
        $offset: offset < 0 ? 0 : offset - 1
      }

    })
      .then(function (response) {
        if (response.status === 200 && response.data && response.data.length) {
          setAccidentList(response.data);
        } else {
          setAccidentList("No response found!")
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
    if (accidentList == "No response found!") {
      return "No response found! Please select a different date"
    }
    return accidentList.map((accidentEl) => {
      return (
        <div key={accidentEl.collision_id} className="card-wrapper" onClick={() => { setAccident(accidentEl) }}>
          <div className="car-names">
            {accidentEl.vehicle_type_code1 ? <div>Crashed Car Type 1: {accidentEl.vehicle_type_code1}</div> : ""}
            {accidentEl.vehicle_type_code2 ? <div>Crashed Car Type 2: {accidentEl.vehicle_type_code2}</div> : ""}
          </div>
          <div className="details">
            <div>Date: {accidentEl.crash_date}</div>
            <div>Time: {accidentEl.crash_time}</div>
          </div>
        </div >
      )
    })
  }

  const setPagination = (p) => {
    setPage(p);
    fetchTrafficDetails(p, limitList);
    setAccident("");
  }

  const setLimit = (l) => {
    setLimitList(l);
    fetchTrafficDetails(page, l);
    setAccident("");
  }

  const renderPagination = () => {
    return (
      <>
        <div className="limit-wrapper">
          Display
          <input type="number" minLength={5} value={limitList} onChange={(e) => { Number(e.target.value) <= 5 ? setLimit(5) : setLimit(Number(e.target.value)) }} />
          Results
        </div>
        <div className="pagination-wrapper">
          <button onClick={() => { setPagination(1) }}>First</button>
          <button onClick={() => { setPagination(page > 1 ? page - 1 : 1) }}>Previous</button>
          <input type="number" minLength={1} value={page} onChange={(e) => { setPagination(Number(e.target.value) <= 0 ? 1 : Number(e.target.value)) }} />
          <button onClick={() => { setPagination(page + 1) }}>Next</button>
          <button onClick={() => { setPagination(page + 10) }}>Next 10</button>
        </div>
      </>
    )
  }
  useEffect(() => {
    if (accidentList.length) {
      return renderAlist();
    }
  }, [accidentList]);

  const clearRecords = () => {
    fetchTrafficDetails();
    setAccident("");
  }

  useEffect(() => {
    if (selectedDate) {
      clearRecords();
    }
  }, [selectedDate]);

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    setIsLoading(true);
    fetchTrafficDetails();
  }

  return (
    <div className="App">
      <div className="filter-wrapper">
        <ListAccident handleSelectedDate={handleSelectedDate} />
        {!isLoading ?
          (
            <>
              <div className="crash-list-wrapper">
                {renderAlist()}
              </div>
              {accidentList == "No response found!" ? "" : accidentList.length ?
                renderPagination() : ""}
            </>
          ) : "Loading"
        }
      </div>
      {accident ? <ViewDetails data={accident} /> : ""}
    </div>
  );
}

export default App;

import React, { useState } from 'react';

const ListAccident = ({ handleSelectedDate }) => {
    const [date, setDate] = useState(null);
    const handleListAccident = () => {
        if (date) {
            setDate(date);
            handleSelectedDate(date)
        }
    }
    return (
        <>
            <div className="list-wrapper">

                <input className="inputs" type="date" onChange={(e) => { setDate(e.target.value) }} />
                <button className="inputs" onClick={() => { handleListAccident() }}>List Accident</button>
            </div>

        </>
    )
}

export default ListAccident;
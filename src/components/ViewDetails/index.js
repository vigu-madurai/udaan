import React, { useState } from 'react';
import './index.css';

const ViewDetails = ({ data }) => {

    const keys = Object.keys(data);
    const replaceUnderscore = (str) => {
        return str.replace(/_/g, " ").toUpperCase()
    }

    return (
        <>
            <div className="view-wrapper">
                <div className="view-inner-wrapper">
                    {keys.map((el, index) => {
                        return (<div className="row-wrapper" key={"view-" + index}>
                            <div className="title">{replaceUnderscore(el)}:{" "}</div>
                            {typeof data[el] !== "string" ? JSON.stringify(data[el]).replace(/\{"\}/g, ""):data[el] }
                        </div>)
                    })}
                </div>
            </div>
        </>
    )
}

export default ViewDetails;
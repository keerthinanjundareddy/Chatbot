import React, { useState, useEffect } from 'react';
import './Chatbotpistwo.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios'
import dropdownuparrows from '../Assets/up-arrow.png'
import dropdowndownarrows from '../Assets/arrow-down-sign-to-navigate.png'
import funding from '../Assets/Funding.png'

ChartJS.register(BarElement, LinearScale, CategoryScale);

const Chatbotapistwo = () => {
  const optionstwo = [
 'rachana',
 'keerthana',
 'digant',
 'kavya',
 'bhavya',
 'pradeepthi',
 'naghma',
 'suneel',
 'pannaga',
 'swaroop',
 'bharat',
 'nahusha',
'nandan',
 'nandeesha',

  ];

  const [selectedOption, setSelectedOption] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [summary, setSummary] = useState('');
  const[popupTwo,setPopuptwo]=useState(false)
  
// Copy code
const [optionSelected, setOptionSelected] = useState(false);


  const toggleDropdown = () => {
    setPopupOpen(!popupOpen);
  };
  const chartDataByEmployee = {
    rachana: [12, 19, 3, 5, 2],
    keerthana: [5, 10, 15, 20, 22],
    digant: [5, 10, 13, 22, 22],
    kavya: [8, 10, 5, 20, 10],
    bhavya: [5, 9, 15, 20, 15],
    pradeepthi: [5, 8, 15, 10, 22],
    naghma: [15, 10, 10, 20, 22],
    suneel: [5, 4, 15, 20, 5],
    pannaga: [15, 10, 15, 22, 22],
    swaroop: [5, 15, 15, 22, 10],
    bharat: [5, 10, 5, 20, 22],
    nahusha: [5, 6, 15, 23, 12],
    sharan: [5, 10, 5, 20, 18],
    nandeesha: [15, 12, 10, 20, 13],
    nandan: [8, 10, 12, 19, 14],

    // ... add data for other employees ...
  };

  const handleOptionClick = (option) => {
    console.log("option",option)
    setSelectedOption(option);
    setOptionSelected(true);
    console.log("selectedoption",selectedOption)
    setPopupOpen(false);
    setPopuptwo(true)
    setSummary(''); // newelyadded one
    const scrollableOptions = document.querySelector('.scrollable-options');
    scrollableOptions.classList.add('active');


    const headerObject = {
      'Content-Type':'application/json',
      "Accept":"*/*",
      }
      
    const dashboardsApi = "http://employee-dashboard.apprikart.com/api/query/";
  
    axios.post( dashboardsApi,{ text: `give me summary update of ${option}` },{headers: headerObject})
      .then((response) => {
        console.log("API Response:", response.data);
        setSummary(response.data.response); 
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          // Handle the 500 Internal Server Error here
          console.error("Internal Server Error:",err);
          setSummary("Internal Server Error");
        } else {
          // Handle other errors here
          console.error("Error:", err);
          setSummary("Internal Server Error");
        }
      });
    
    // Replace this with fetching data for the selected employee and updating the chart data.
    // Example data for the chart (replace with actual data)
   
    const data = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      datasets: [
        {
          label: `${option}'s Weekly Status`,
          data: chartDataByEmployee[option] || [],
          backgroundColor: 'rgba(225, 99, 132, 0.2)',
          borderColor: 'rgb(225, 99, 132)',
          borderWidth: 1,
          borderRadius: 4,
          categoryPercentage: 0.6,
          barPercentage: 0.5,
        },
      ],
    };

    setChartData(data);

  };

  useEffect(() => {
    // Fetch initial data or perform any other necessary initialization.
  }, []);

  return (
    <>
   <div className='voice-navbar-section'>
        <div className='voice-parent-div'>
        <div className='voice-image-div'>
           <img src={funding} alt="voiceicon" className='voice-image-div-section'/>
           </div>
       <div className='heading-text'><b>EMPLOYEE DASHBOARD</b></div>
       </div>
        </div>

    <div  style={{display:"flex",flexDirection:"column",flexWrap:"wrap",gap:"10px",marginTop:"80px"}}>
      <div style={{ textAlign: 'center', marginTop: '20px', textTransform: 'uppercase' }}>
        <b>Employee Weekly Status</b>
      </div>

      <div style={{ position: 'relative', marginTop: '5px'}}>
        <div onClick={toggleDropdown} className="parent-div"  style={{ border: '1px solid grey', width: '300px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between',borderRadius:"5px"}}>
          <div style={{padding:"10px"}} >{selectedOption || 'Select'}</div>
          <div>
            {popupOpen ? (
              <div style={{ width: '22px', height: '22px',paddingTop:"10px",paddingRight:"30px"}}>
                <img src={dropdownuparrows} alt="Dropdown Open" style={{width:"20px",height:"20px"}} />
              </div>
            ) : (
              <div style={{ width: '22px', height: '22px',paddingRight:"30px",paddingTop:"10px"}}>
                <img src={dropdowndownarrows} alt="Dropdown Closed"  style={{width:"20px",height:"20px"}} />
              </div>
            )}
          </div>
        </div>
       {popupOpen && (
    <div className="scrollable-options" >
      <div className="options-container">
        <ul className="options-list">
          {optionstwo.map((option, index) => (
            <li key={index} className="option" onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )}
      </div>
      {!summary ? (
        <div className={`selection-section ${optionSelected ? 'hidden' : ''}`} style={{ textAlign: "center" }}>
    <div className='data-section'>NO DATA</div>
    <div style={{paddingTop:"20px"}} className='drop-option-section'>Select an option from the above dropdown</div>
  </div>
) : null}

{popupTwo && (
  <div style={{marginTop:"100px",paddingRight:"20px",paddingLeft:"20px",width:"100%"}} className='summary-section'>
    <h2>Summary:</h2>
    {/* <p>The Samsung Galaxy S8 is a beautifully designed phone with a large, vibrant display and an impressive camera. But its high price tag and lackluster battery life are major drawbacks,
    The Samsung Galaxy S8 is a beautifully designed phone with a large, vibrant display and an impressive camera. But its high price tag and lackluster battery life are major drawbacks."

    </p> */}
     {summary && (
    <p>{summary}</p>
    )}
  </div>

)}

      <div style={{width:"100%" }} >
        {chartData && (
          <Bar
            height={300}
            width={100}
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  beginAtZero: true,
                  grid: {
                    display: true,
                  },
                  stacked: true,
                },
                y: {
                  display: true,
                  beginAtZero: true,
                  grid: {
                    display: true,
                  },
                  stacked: true,
                },
              },
              layout: {
                padding: {
                  left: 40,
                  right: 40,
                  top: 60,
                  bottom:5
                },
              },
              legend: {
                labels: {
                  fontSize: 0.1,
                },
              },
            }}
          />
        )}
      </div>
      </div>
    </>
  );
};

export default Chatbotapistwo;

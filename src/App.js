import React, { Component } from 'react';
import './App.css';

import Select from './components/Select/Select.js';
import MirroredBarChart from './components/MirroredBarChart/MirroredBarChart.js';

class App extends Component {
  state = {
    station:"12TH",
    year:2019,
    month:"Jan",
    dayofweek:"weekday",
    ridershipData: {},
    arrivalData:[],
    departData:[],
    years:["2019","2018","2017","2016","2015","2014",
                 "2015","2014","2013","2012","2011"],
    months:["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    scaleFactor:200/15000, //200px = 15000 riders.
    stations:{"12TH": "12th Street / Oakland City Center",
              "16TH": "16th Street Mission",
              "19TH": "19th Street Oakland",
              "24TH": "24th Street Mission",
              "ASHB": "Ashby",
              "BAYF": "Bayfair",
              "DBRK": "Berkeley",
              "BALB": "Balboa Park",
              "CIVC": "Civic Center",
              "COLS": "Coliseum",
              "COLM": "Colma",
              "CONC": "Concord",
              "CAST": "Castro Valley",
              "DALY": "Daly City",
              "DUBL": "Dublin/Pleasanton",
              "EMBR": "Embarcadero",
              "DELN": "El Cerrito Del Norte",
              "PLZA": "El Cerrito Plaza",
              "FRMT": "Fremont",
              "FTVL": "Fruitvale",
              "GLEN": "Glen Park",
              "HAYW": "Hayward",
              "LAFY": "Lafayette",
              "LAKE": "Lake Merritt",
              "MCAR": "MacArthur",
              "MLBR": "Millbrae",
              "MONT": "Montgomery Street",
              "NBRK": "North Berkeley",
              "NCON": "North Concord",
              "OAKL": "Oakland Int. Airport",
              "ORIN": "Orinda",
              "WOAK": "West Oakland",
              "PHIL": "Pleasant Hill",
              "POWL": "Powell Street",
              "RICH": "Richmond",
              "ROCK": "Rockridge",
              "SBRN": "San Bruno",
              "SHAY": "South Hayward",
              "SANL": "San Leandro",
              "SFIA": "San Francisco Int. Airport",
              "SSAN": "South San Francisco",
              "UCTY": "Union City",
              "WCRK": "Walnut Creek",
              "WDUB": "West Dublin/Pleasanton",
              "PITT": "Pittsburg/Bay Point",
              "WARM": "Warm Springs",
              "ANTC": "Antioch",
              "BERY": "Berryessa",
              "MLPT": "Milpitas",
              "PCTR": "Pittsburg Center",
            }
  }

  doFetch = () => {
    fetch("ridership_data.json", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => response.json()).then(json_data => {
      this.setState({ridership_data: json_data}, this.getGraphData);
    })
  }

   updateStation = (ev) => {
     const value = ev.target.value;
     this.setState({
       station: value,
     },this.getGraphData);
   }

   updateYear = (ev) => {
     const value = ev.target.value;
     this.setState({
       year: value,
     },this.getGraphData);

   }

   updateMonth = (ev) => {
     const value = ev.target.value;
     this.setState({
       month: value,
     },this.getGraphData);
   }

   updateDayofWeek = (ev) => {
     const value = ev.target.value;
     this.setState({
       dayofweek: value,
     },this.getGraphData);
   }

    componentDidMount() {
       this.doFetch();
    }

    getGraphData = () => {
      let arriving = this.state.ridership_data[this.state.year][this.state.month][this.state.station]['arriving'][this.state.dayofweek];
      let departing = this.state.ridership_data[this.state.year][this.state.month][this.state.station]['departing'][this.state.dayofweek];
      this.setState({
        arrival_data: arriving.map(x => Math.round(x*this.state.scaleFactor)),
        departData: departing.map(x => Math.round(x*this.state.scaleFactor))
      })
    }

    render() {
      return (
          <div className="Page">
            <div className="Header">
              <h1>Bart Ridership Data</h1>
            </div>
            <MirroredBarChart
              stations = {this.state.stations}
              station = {this.state.station}
              years = {this.state.years}
              months = {this.state.months}
              arrivalData = {this.state.arrivalData}
              departData = {this.state.departData}
              scaleFactor = {this.state.scaleFactor}
              updateStation = {this.updateStation}
              updateYear = {this.updateYear}
              updateMonth = {this.updateMonth}
              updateDayofWeek = {this.updateDayofWeek}
              ></MirroredBarChart>
          </div>
      );
    }
  }

  export default App;

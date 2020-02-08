import React, { Component } from 'react';
import './App.css';

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
    yAxisRange:15000,
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
        arrivalData: arriving.map(x => Math.round(x*this.state.scaleFactor)),
        departData: departing.map(x => Math.round(x*this.state.scaleFactor))
      })
    }

    render() {
      return (
          <div className="Page">
            <div className="Page-Header">
              <h1>Bart Ridership Data</h1>
            </div>
            <MirroredBarChart
              title={`${this.state.stations[this.state.station]}
                                 Station Arriving and Departing Passengers`}
              subtitle="(Monthly Average Pax per Hour)"
              controls={[
                          {name:"Stations",
                          items:this.state.stations,
                          changeFcn:this.updateStation,
                          },
                          {name:"Year",
                          items:this.state.years.reduce(function(o, val) { o[val] = val; return o; }, {}),
                          changeFcn:this.updateYear,
                          },
                          {name:"Month",
                          items:this.state.months.reduce(function(o, val) { o[val] = val; return o; }, {}),
                          changeFcn:this.updateMonth,
                          },
                          {name:"DayofWeek",
                          items:{'weekday':'Weekdays','weekend':'Weekends & Holidays'},
                          changeFcn:this.updateDayofWeek,
                          },
                         ]}
              upperData={this.state.arrivalData}
              lowerData={this.state.arrivalData}
              xAxisValue={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]}
              xAxisLabel={"(Hour of Day)"}
              yAxisLabelTop={"Arrivals"}
              yAxisLabelBottom={"Depatures"}
              scaleFactor={this.state.scaleFactor}
              yAxisRange={this.state.yAxisRange}
              ></MirroredBarChart>
          </div>
      );
    }
  }

  export default App;

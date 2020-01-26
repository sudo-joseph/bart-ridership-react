import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    station:"12TH",
    year:2019,
    month:"Jan",
    dayofweek:"weekday",
    ridership_data: {},
    arrival_data:[],
    depart_data:[],
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
      this.setState({ridership_data: json_data});
      this.getGraphData()
    })

  }

   updateStation = (ev) => {
     const value = ev.target.value;
     this.setState({
       station: value,
     });
     this.getGraphData()
   }

   updateYear = (ev) => {
     const value = ev.target.value;
     this.setState({
       year: value,
     });
     this.getGraphData()
   }

   updateMonth = (ev) => {
     const value = ev.target.value;
     this.setState({
       month: value,
     });
     this.getGraphData()
   }

   updateDayofWeek = (ev) => {
     const value = ev.target.value;
     this.setState({
       dayofweek: value,
     });
     this.getGraphData()
   }

    componentDidMount() {
       this.doFetch();
    }

    getGraphData = () => {
      console.log('getGraphData')
      let arriving = this.state.ridership_data[this.state.year][this.state.month][this.state.station]['arriving'][this.state.dayofweek];
      let departing = this.state.ridership_data[this.state.year][this.state.month][this.state.station]['departing'][this.state.dayofweek];
      this.setState({
        arrival_data: arriving.map(x => Math.round(x*this.state.scaleFactor)),
        depart_data: departing.map(x => Math.round(x*this.state.scaleFactor))
      })
      this.render()
    }

    render() {
      console.log('rendering')
      return (
          <div className="Page">
            <div className="Header">
              <h1>Bart Ridership Data</h1>
            </div>
            <div className="Content">
              <div className="Content-Title">
              </div>
              <div className="Content-Dataview-yAxis">
                <div className="Content-Dataview-yAxis-Top">
                  Arrivals
                </div>
                <div className="Content-Dataview-yAxis-Bottom">
                  Departures
                </div>
              </div>
              <div className="Content-Dataview">
                <div className="Content-Dataview-Controls">
                  <select className="Content-Dataview-Controls-Station"
                          onChange={this.updateStation}>
                  {
                    Object.entries(this.state.stations).map(([key, value]) => (
                      <option className="Content-Dataview-Controls-Option"
                               value= {key}> {value} </option>
                          ))
                  }
                  </select>
                  <select className="Content-Dataview-Controls-Year"
                          onChange={this.updateYear}>
                    {
                      this.state.years.map(year => (
                        <option className="Content-Dataview-Controls-Option"
                                value={year}> {year} </option>
                            ))
                    }
                  </select>
                  <select className="Content-Dataview-Controls-Month"
                          onChange={this.updateMonth}>
                    {
                      this.state.months.map(month => (
                        <option className="Content-Dataview-Controls-Option"
                                value={month}> {month} </option>
                            ))
                    }
                  </select>
                  <select className="Content-Dataview-Controls-DayofWeek"
                          onChange={this.updateDayofWeek }>
                    <option value="weekday"
                           >Weekdays
                    </option>
                    <option value="weekend"
                           >Weekends & Holidays
                   </option>
                  </select>
                </div>
                <div className="Content-Dataview-yAxis Content-Data-yAxis-Top">
                  <div className="">
                    &lt;
                  </div>
                  <div className="Content-Dataview-yAxis-Hr">
                    <hr />
                  </div>
                  <div>15000 Pax</div>
                  <div className="Content-Dataview-yAxis-Hr">
                    <hr />
                  </div>
                  <div className="">
                    &gt;
                  </div>
                </div>
                <div className="Content-Dataview-Top">
                  {
                    this.state.arrival_data.map(top => (
                       <div className="Content-Dataview-Data-Box"
                              style={{height: top,}}> {Math.round(top/this.state.scaleFactor)} </div>
                          ))
                  }
                </div>
                <div className="Content-Dataview-Bottom">
                  {
                    this.state.depart_data.map(bottom => (
                       <div className="Content-Dataview-Data-Box"
                              style={{height: bottom,}}> {Math.round(bottom/this.state.scaleFactor)} </div>
                          ))
                  }
                </div>
                <div className="Content-Dataview-yAxis Content-Data-yAxis-Bottom">
                  <div className="">
                    &lt;
                  </div>
                  <div className="Content-Dataview-yAxis-Hr">
                    <hr />
                  </div>
                  <div>15000 Pax</div>
                  <div className="Content-Dataview-yAxis-Hr">
                    <hr />
                  </div>
                  <div className="">
                    &gt;
                  </div>
                </div>
                <div className="Content-Dataview-xAxis">
                  {
                    this.state.arrival_data.map((hour,index) => (
                  <div className="Content-Dataview-xAxis-Box">
                    {index}
                  </div>
                ))}

                </div>
                <div className="Content-Dataview-xLabel">
                  (Hour of Day)
                </div>
              </div>
            </div>
          </div>
      );
    }
  }

  export default App;

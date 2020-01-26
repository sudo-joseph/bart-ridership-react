# Bart Ridership Data Visualization
This project visualizes the average volume of passengers arriving and departing for selected Bart Station, Year, Month, and day type over a 24 hour period. Data has been made available for 2011-2019. 2020 data will be updated once available.

## Data Source:
Bart provides various ridership data in .xlsx format. Data containing hourly trips between station pairs has been downloaded and is available in the data directory of this repo. Original data data can be found here:
 * [Bart Ridership Reports](https://www.bart.gov/about/reports/ridership)
 * [Hourly Ridership by Origin-Destination Pairs](http://64.111.127.166/origin-destination/)

## Data Visualization
Data is visualized as a Mirror Bar Chart that showcases the volume of arriving and departing passengers each hour. The x-axis of this chart will be the hour of the day, with the arrival and departure totals on the y-axis. Bars will be used allow for comparison of passengers arriving and leaving the chosen station hour by hour.

## Color Profile
Color profile was chosen to match the color scheme in the new Bart trains.
Colors Used:
* #0064a8 - Bart Blue
* #006A8E - Pantone Blue
* #B5BA05 - Pantone Green
* #B5B5B5 - Grey

## Notes
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

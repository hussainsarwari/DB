import {React} from 'react'

const donutSeries = [44, 33, 23];
const donutOptions = {
  labels: ["Product X", "Product Y", "Product Z"],
  colors: ["#3B82F6", "#60A5FA", "#93C5FD"],
  legend: { position: "bottom" },
  tooltip: { y: { formatter: (val) => `${val}%` } },
};

export default  React.memo(function ProductionShare() {
    return(
              <div className="p-6 bg-white shadow-md rounded-xl">
                <h2 className="mb-4 text-xl font-bold">Product Share</h2>
                <Chart options={donutOptions} series={donutSeries} type="donut" height={250} />
              </div>
      
    )
      
})
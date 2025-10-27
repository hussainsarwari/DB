import {React} from 'react'


const areaSeries = [{ name: "Inventory (Units)", data: [200, 180, 190, 170, 160, 180, 200] }];
const areaOptions = {
  chart: { id: "area-chart", toolbar: { show: true }, zoom: { enabled: true } },
  xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  stroke: { curve: "smooth" },
  fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
  colors: ["#3B82F6"],
  grid: { borderColor: "#E5E7EB" },
  dataLabels: { enabled: false },
};


export default  React.memo(function ProductionShare() {
    return(
                 <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-bold">Inventory Trend</h2>
          <Chart options={areaOptions} series={areaSeries} type="area" height={250} />
        </div>

      
    )
      
})
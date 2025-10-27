import {React} from 'react'

const barSeries = [{ name: "Consumption (Kg)", data: [40, 55, 30, 70, 60] }];
const barOptions = {
  chart: { id: "bar-chart", toolbar: { show: true } },
  xaxis: { categories: ["Material A", "Material B", "Material C", "Material D", "Material E"] },
  colors: ["#60A5FA"],
  grid: { borderColor: "#E5E7EB" },
  dataLabels: { enabled: false },
};

export default  React.memo(function MaterialConsumption() {
    return(

        <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-bold">Material Consumption</h2>
          <Chart options={barOptions} series={barSeries} type="bar" height={250} />
        </div>
    )
      
})
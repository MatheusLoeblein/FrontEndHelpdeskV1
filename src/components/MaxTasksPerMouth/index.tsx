import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false // This ensures the component is only rendered on the client side
});


export function MaxTasksPerMouth() {

  const options = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: ['Jan 23', 'Fev 23', 'Mar 23', 'Abr 23', 'Mai 23', 'Jun 23', 'Jul 23', 'Ago 23', 'Set 23', 'Out 23', 'Nov 23', 'Dez 23']
    },
    colors: ['#436EB3', '#c95e81']
  }
  const series = [
    {
      name: "Vendas",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    },
    {
      name: "Semaglutida",
      data: [60, 30, 40, 65, 80, 30, 10, 95]
    }
  ]


  return (
    <div className="flex justify-center items-center">
      <Chart options={options} series={series} type="bar" width="700" />
    </div>

  )
}
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query'
import { api } from '@/services/api';
import { parseCookies } from 'nookies';


const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false // This ensures the component is only rendered on the client side
});


export function Charts() {

  const {data, isLoading, isFetching, error} = useQuery({ 
    queryKey: 'FinalyTasksChart', 
    queryFn: async () => {

      const {'helpdeskauth.token': token} = parseCookies();
    
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const taskPerTipe = await api.get('/authors/api/graphs/tasks_per_tipe/', {headers})
      const createdTasks = await api.get('/authors/api/graphs/created-tasks-result/', {headers})
      const countStatusTask = await api.get('/authors/api/graphs/count-status-tasks/', {headers})
      const taskPerUser = await api.get('/authors/api/graphs/tasks_finalizadas_per_user/', {headers})
    
      return {
        taskPerTipe: taskPerTipe.data,
        createdTasks: createdTasks.data,
        countStatusTask: countStatusTask.data,
        taskPerUser: taskPerUser.data,
      }    
      },
    refetchOnWindowFocus: false,
  })


  useEffect(() => {
    console.log(data)

  }, [isFetching])
  

  const colors = ['#436EB3', '#c95e81']


  return (

    <div className="flex p-5 flex-col xl:flex-row xl:justify-between gap-5 z-0" id="graphs">
    <div className=" flex flex-col gap-4">

      <div className="flex flex-col border-b border-b-border-default">

        <h2 className="text-2xl font-medium">Tickets Status</h2>
        <p className="text-sm font-normal">Aqui estão quantidades de tickets por status ja abertos</p>
        <div className="flex gap-4 flex-col md:flex-row py-5">
          <div className="flex space-x-5 items-end">
            <div className="bg-status-ticket-open w-7 h-7 rounded-md relative -rotate-12">
              <div className="bg-status-ticket-open w-8 h-8 -top-4 -right-4 rounded-full absolute border-primary-bg border-4"></div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-800">{data?.countStatusTask.quantidades[0]} Tickets</span>
              <span className="text-sm">Abertos</span>
            </div>
          </div>
          <div className="flex space-x-5 items-end">
            <div className="bg-status-ticket-execut w-7 h-7 rounded-md relative -rotate-12">
              <div className=" bg-status-ticket-execut w-8 h-8 -top-4 -right-4  rounded-full absolute border-primary-bg border-4"></div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-800">{data?.countStatusTask.quantidades[1]} Tickets</span>
              <span className="text-sm">Em execução</span>
            </div>
          </div>

          <div className="flex space-x-5 items-end">
            <div className=" bg-status-ticket-waiting w-7 h-7 rounded-md relative -rotate-12">
              <div className=" bg-status-ticket-waiting  w-8 h-8  -top-4 -right-4 rounded-full absolute border-primary-bg border-4"></div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-800">{data?.countStatusTask.quantidades[2]} Tickets</span>
              <span className="text-sm">Aguardando retorno</span>
            </div>
          </div>

          <div className="flex space-x-5 items-end">
            <div className=" bg-status-ticket-finaly w-7 h-7 rounded-md relative -rotate-12">
              <div className="bg-status-ticket-finaly  w-8 h-8 -top-4 -right-4 rounded-full absolute border-primary-bg border-4"></div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-800">{data?.countStatusTask.quantidades[3]} Tickets</span>
              <span className="text-sm">Finalizados</span>
            </div>
          </div>
        </div>

      </div>
      <div className="">
        <h2 className="text-2xl font-medium">Total de tickets por mês</h2>
        <p className="text-sm font-normal">Aqui estão as quantidades de tickets mensal</p>

        <div className="flex justify-center items-center">
          { 
              !isFetching && data &&
              <Chart options={{
              xaxis: {
                categories: data?.taskPerTipe.tipes
              },
              colors
              }} series={[
                { 
                  data: data?.taskPerTipe.quantidades,
                }  
              ]} type="area" width="700" />            
          }
        </div>

      </div>
    </div>

    <div className="container flex flex-col gap-4 t">

      <div className="bg-white rounded-md shadow-md flex-col p-3 h-max justify-center items-center">
      <h3 className='text-lg font-medium'>
                Usuarios Finalizadores dos Tickets
              </h3>
        <p className='text-sm font-regular pb-5'>
          Relação de usuarios por quantidades de tickets finalizados
        </p>

        <div className="flex justify-center items-center self-center">

          { 
            !isFetching && data &&

            <div className=''>


            <Chart options={{
            labels: data?.taskPerUser.users,
            colors
            }} series={ data?.taskPerUser.tarefas_per_user } type="donut" width="400" />
            </div>
            
          }

        </div>

      </div>

      <div className="bg-white rounded-md shadow-md flex-col p-3 h-max justify-center items-center">

        <h3 className='text-lg font-medium'>
                  Total de tickets por mês
        </h3>
        <p className='text-sm font-regular pb-5'>
          Aqui estão as quantidades de tickets mensal
        </p>

        { 
        !isFetching && data &&

        <div className='flex justify-center items-center self-center'>


          <Chart options={{
          xaxis: {
            categories: data?.createdTasks.meses
          },
          dataLabels: {
            enabled: false,
          },
          colors
          }} series={[
            { 
              name: 'Tickets',
              data: data?.createdTasks.quantidade,
            
            }  
          ]} type="bar" width="400"/>
        </div>
              
        }

      </div>
      {/* <div className="bg-white rounded-md shadow-md flex h-max justify-center items-center">
      </div>
      <div className="bg-white rounded-md shadow-md flex h-max justify-center items-center">
      </div> */}
    </div>
  </div>



  )
}
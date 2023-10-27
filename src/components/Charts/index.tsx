import dynamic from 'next/dynamic';
import { useQuery } from 'react-query'
import { usePrivateApi } from '@/hooks/usePrivateApi';
import { motion } from 'framer-motion';


const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false // This ensures the component is only rendered on the client side
});


export function Charts() {

  
  const api = usePrivateApi()
  const {data, isLoading, isFetching, error} = useQuery({ 
    queryKey: 'FinalyTasksChart', 
    queryFn: async () => {
      
      const taskPerTipe = await api.get('/authors/api/graphs/tasks_per_tipe/')
      const createdTasks = await api.get('/authors/api/graphs/created-tasks-result/')
      const countStatusTask = await api.get('/authors/api/graphs/count-status-tasks/')
      const taskPerUser = await api.get('/authors/api/graphs/tasks_finalizadas_per_user/')
    
      return {
        taskPerTipe: taskPerTipe.data,
        createdTasks: createdTasks.data,
        countStatusTask: countStatusTask.data,
        taskPerUser: taskPerUser.data,
      }    
      },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const colors = ['#436EB3', '#c95e81']

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
    
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }  

  return (

    <div
    className="flex p-5 flex-col xl:flex-row xl:justify-between gap-5 z-0" id="graphs">
    <motion.div 
      className=" flex flex-col gap-4"
    >

      <motion.div 
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.3}}

      className="flex flex-col border-b border-b-border-default">

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

      </motion.div>

      <motion.div 
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.5}}
      className="">
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
      </motion.div>
    </motion.div>

    <div className="container flex flex-col gap-4 t">

      <motion.div 
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.7}}
      className="bg-white rounded-md shadow-md flex-col p-3 h-max justify-center items-center">
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

      </motion.div>

      <motion.div 
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 1}}
      className="bg-white rounded-md shadow-md flex-col p-3 h-max justify-center items-center">

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

      </motion.div>
      {/* <div className="bg-white rounded-md shadow-md flex h-max justify-center items-center">
      </div>
      <div className="bg-white rounded-md shadow-md flex h-max justify-center items-center">
      </div> */}
    </div>
  </div>



  )
}
import { MdModeEditOutline } from 'react-icons/md'
import { IoMdClose, IoMdAddCircle } from 'react-icons/io'
import { motion, AnimatePresence } from "framer-motion"
import { useContext } from 'react'
import { NewTaskContext } from '@/context/NewTaskContext'

function MenuMed({ title, displayName, dataKey, add = true}) {
  
  const { addtionalData, setEditIndex, setAddtionalData, setOpen } = useContext(NewTaskContext)

  function slicing(string){
    if(string.length > 14){
      let newString = string.slice(0, 14) + '...'
      return newString
    }
    return string
  }

  return(
    <div className='border-b border-b-border-default'>
      <div className='flex justify-between'>
        <span>{title}</span>
    {
      add &&
        <motion.div 
          className=' w-7 h-7 border border-border-default rounded-md shadow-md p-1 flex justify-center items-center text-primary-formedica cursor-pointer'
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={() => setOpen(true)}
        >
        <IoMdAddCircle size={20}/>
        </motion.div>
    }
      </div>

      <div className='grid grid-cols-2 py-2 max-w-full text-xs gap-2'>
        {
          addtionalData.map((data, index) => {
            return(
              <div className='flex flex-row border border-border-default rounded-md shadow-md justify-between' key={index}>
                <span className='border-r border-r-border-default py-1 px-2'>{displayName}</span>
                <span className='py-1 px-2'>{data[dataKey] && slicing(data[dataKey])}</span>
                <div className='flex justify-center items-center py-1 px-2 space-x-2'>
                  <motion.span 
                  className=' text-primary-formedica cursor-pointer'
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={() => {
                    setEditIndex(index)
                    console.log('INDENXXXX', index)
                  }}
                  ><MdModeEditOutline size={15}/></motion.span>
                  <motion.span 
                  className='text-red-500 cursor-pointer'
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={() => {
                    const updatedData = [...addtionalData];
                    updatedData.splice(index, 1);
                    setAddtionalData(updatedData);
                    if(updatedData.length < 1){
                      setOpen(true)
                    }
                  }}
                  >
                  <IoMdClose size={15}/></motion.span>
                  
                </div>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export function MiniMenu() {

  const { type } = useContext(NewTaskContext)

  const menuTypes = {
    "Fórmula Certa - (Cadastro Médicos).": <MenuMed title={"Medicos"} displayName={"CRM"} dataKey={"crm"}/>,
    "FC (Exclusão de Requisições)": <MenuMed title={"Requisições"} displayName={"REQS"} dataKey={"reqs"} add={false}/>,
    "Cadastro Novo(a) Colaborador(a)": <MenuMed title={"Colaboradores"} displayName={"Nome"} dataKey={"nome"}/>,
  }

  return(
    menuTypes[type]
  )
}

import { motion, AnimatePresence } from 'framer-motion'
import { BurredBackground } from '../../components/BurredBackground'
import { IoMdClose } from 'react-icons/io'
import { BiCopy, BiSolidCopy } from 'react-icons/bi'
import { useState } from 'react'

export function CardMedTicket({ medico }) {
  
  const [open, setOpen] = useState(false);
  const [oppened, setOppened] = useState(false);
  const [copied, setCopied] = useState([]);

  function handleOpen(){
    setOpen(true)
    setOppened(true)
  }

  function handleCopyLine(lineName:string){
  
    setCopied([...copied, lineName])
  }
  

  const handleCopyText = (text, linename) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Texto copiado para a área de transferência.');
      })
      .catch((err) => {
        console.error('Erro ao copiar texto: ', err);
      });

      handleCopyLine(linename)
  };


  return(
    <>            
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className={`flex border max-w-[200px] shadow-sm rounded-md px-2 space-x-2 items-center cursor-pointer ${oppened ? 'border-emerald-200' :  'border-border-default '}`}
        onClick={() => handleOpen()}
        >
          <span className={`text-xs border-r  pr-2 py-2 ${ oppened ? 'border-r-emerald-200  text-emerald-400 ' : ' border-r-border-default text-blue-400 '} `}>CRM</span>
          <span className='text-gray-500'>{medico.crm_uf}</span>
        </motion.div>

        <AnimatePresence>
          {

            open && 

            <BurredBackground>
            <div 
            className="flex flex-col bg-white border border-border-default p-4 rounded-md shadow-md gap-2">
                <div className='flex justify-between'>
                <div className='flex flex-col gap-1'>
                  
                  <span className='text-xs text-blue-400'>Nome</span> 
                  
                  <p className='flex gap-3 items-center'>
                    {medico.nome} 
                    
                    <span 
                    className='cursor-pointer'
                    
                    onClick={() => handleCopyText(medico.nome, 'Nome')}>

                      {
                        copied.includes('Nome') ?

                        <span className='text-blue-400'> <BiSolidCopy/> </span>

                        :

                        <BiCopy/>
                      }
                      
                    </span>
                  </p>

                </div>

                <motion.div 
                className='text-red-500 border border-border-default w-7 h-7 flex items-center rounded-md shadow-md cursor-pointer p-1'
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => setOpen(false)}
                >
                  <IoMdClose size={25} />
                </motion.div>
                </div>
                <div className='flex flex-col gap-1'><span className='text-xs text-blue-400'>CRM</span> 
                <p className='flex gap-3 items-center'>{medico.crm_uf}
                <span className='cursor-pointer'
                    onClick={() => handleCopyText(medico.crm_uf, "CRM")}>
                      {
                        copied.includes('CRM') ?
                        <span className='text-blue-400'> <BiSolidCopy/> </span>
                        :
                        <BiCopy/>
                      }
                </span>
                </p>
                </div>
                <div className='flex flex-col gap-1'><span className='text-xs text-blue-400'>CEP</span> 
                <p className='flex gap-3 items-center'>{medico.cep}
                <span className='cursor-pointer'
                    onClick={() => handleCopyText(medico.cep, 'CEP')}>
                      {
                        copied.includes('CEP') ?
                        <span className='text-blue-400'> <BiSolidCopy/> </span>
                        :
                        <BiCopy/>
                      }
                </span>
                </p></div>
                <div className='flex flex-col gap-1'><span className='text-xs text-blue-400'>Endereço</span> 
                <p className='flex gap-3 items-center'>{medico.endereco}
                <span className='cursor-pointer'
                    onClick={() => handleCopyText(medico.endereco, 'endereco')}>
                      {
                        copied.includes('endereco') ?
                        <span className='text-blue-400'> <BiSolidCopy/> </span>
                        :
                        <BiCopy/>
                      }
                </span>
                </p></div>
                <div className='flex flex-col gap-1'><span className='text-xs text-blue-400'>Telefone</span> 
                <p className='flex gap-3 items-center'>{medico.telefone}
                <span className='cursor-pointer'
                    onClick={() => handleCopyText(medico.telefone, 'telefone')}>
                      {
                        copied.includes('telefone') ?
                        <span className='text-blue-400'> <BiSolidCopy/> </span>
                        :
                        <BiCopy/>
                      }
                </span>
                </p></div>
                <div className='flex flex-col gap-1'><span className='text-xs text-blue-400'>Especialidade</span> 
                <p className='flex gap-3 items-center'>{medico.especialidade}
                <span className='cursor-pointer'
                    onClick={() => handleCopyText(medico.especialidade, 'especialidade')}>
                      {
                        copied.includes('especialidade') ?
                        <span className='text-blue-400'> <BiSolidCopy/> </span>
                        :
                        <BiCopy/>
                      }
                </span>
                </p></div>
                <div className='flex flex-col gap-1'><span className='text-xs text-blue-400'>E-Mail</span> 
                <p className='flex gap-3 items-center'>{medico.email}
                <span className='cursor-pointer'
                    onClick={() => handleCopyText(medico.email, 'email')}>
                      {
                        copied.includes('email') ?
                        <span className='text-blue-400'> <BiSolidCopy/> </span>
                        :
                        <BiCopy/>
                      }
                </span>
                </p></div>

            </div>
          </BurredBackground>
          }
        </AnimatePresence>

    </>
  )
}
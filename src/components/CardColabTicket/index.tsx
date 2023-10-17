import { motion, AnimatePresence } from 'framer-motion'
import { BurredBackground } from '../BurredBackground'
import { IoMdClose } from 'react-icons/io'
import { BiCopy, BiSolidCopy } from 'react-icons/bi'
import { useState } from 'react'
import { format } from 'date-fns'
export function CardColabTicket({ colab }) {
  
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

  const formattedDate = format(new Date(colab.contratacao), 'dd/MM/yyyy');

  return(
    <>            
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className={`flex border shadow-sm rounded-md px-2 space-x-2 items-center cursor-pointer ${oppened ? 'border-emerald-200' :  'border-border-default '}`}
        onClick={() => handleOpen()}
        >
          <span className={`text-xs border-r  pr-2 py-2 ${ oppened ? 'border-r-emerald-200  text-emerald-400 ' : ' border-r-border-default text-blue-400 '} `}>Nome</span>
          <span className='text-gray-500'>{colab.nome}</span>
        </motion.div>

        <AnimatePresence>
          {

            open && 

            <BurredBackground>
            <div 
            className="flex flex-col bg-white border border-border-default  min-w-[500px] p-4 rounded-md shadow-md gap-2">
                <div className='flex justify-between'>
                <div className='flex flex-col gap-1'>
                  
                  <span className='text-xs text-blue-400'>Nome</span> 
                  
                  <p className='flex gap-3 items-center'>
                    {colab.nome} 
                    
                    <span 
                    className='cursor-pointer'
                    
                    onClick={() => handleCopyText(colab.nome, 'Nome')}>

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
                <div className='flex flex-col gap-1'><span className='text-xs text-blue-400'>CPF</span> 
                <p className='flex gap-3 items-center'>{colab.cpf}
                <span className='cursor-pointer'
                    onClick={() => handleCopyText(colab.cpf, "cpf")}>
                      {
                        copied.includes('cpf') ?
                        <span className='text-blue-400'> <BiSolidCopy/> </span>
                        :
                        <BiCopy/>
                      }
                </span>
                </p>
                </div>
                <div className='flex flex-col gap-1'><span className='text-xs text-blue-400'>Contratação</span> 
                <p className='flex gap-3 items-center'>{formattedDate}
                <span className='cursor-pointer'
                    onClick={() => handleCopyText(colab.contratacao, 'contratacao')}>
                      {
                        copied.includes('contratacao') ?
                        <span className='text-blue-400'> <BiSolidCopy/> </span>
                        :
                        <BiCopy/>
                      }
                </span>
                </p></div>
                <div className='flex flex-col gap-1'><span className='text-xs text-blue-400'>Setor</span> 
                <p className='flex gap-3 items-center'>{colab.setor}
                <span className='cursor-pointer'
                    onClick={() => handleCopyText(colab.setor, 'setor')}>
                      {
                        copied.includes('setor') ?
                        <span className='text-blue-400'> <BiSolidCopy/> </span>
                        :
                        <BiCopy/>
                      }
                </span>
                </p></div>
                <div className='flex flex-col gap-1'><span className='text-xs text-blue-400'>Salario</span> 
                <p className='flex gap-3 items-center'>R$ {colab.salario},00
                <span className='cursor-pointer'
                    onClick={() => handleCopyText(colab.salario, 'salario')}>
                      {
                        copied.includes('salario') ?
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
import { AiOutlineCheck, AiOutlineInfoCircle, AiOutlineWarning, AiOutlineClose } from 'react-icons/ai';
import { VscError } from 'react-icons/vsc';
import {useEffect, useState, useContext} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { truncate } from 'fs';
import { AuthContext } from '@/context/AuthContext';

type MessageType = {
  type: string;
  message: string;
}

const types = {
  success: {
    style: 'bg-emerald-600',
    icon: <AiOutlineCheck/>

  },

  error: {
    style: 'bg-red-500',
    icon: <VscError/>
  },

  info: {
    style: 'bg-blue-500',
    icon: <AiOutlineInfoCircle/>
  },

  warning: {
    style: 'bg-yellow-500',
    icon: <AiOutlineWarning/>
  },

}

export function Message({type, message}:MessageType){

  const [close, setClose] = useState(false);
  const { messages, setMessages } = useContext(AuthContext);

  const messageType = types[type] || types.info;

  useEffect(() => {
    const interval = setInterval(() => {
      setClose(true)
      setMessages(null)
      console.log('CLOSE')
    }, 5000)

    return () => clearInterval(interval);
    
  }, [])

  return(
    <AnimatePresence>
      { !close &&
            
        <motion.div 
        className={` w-96 py-2 px-5 rounded-md border text-white border-border-default shadow-md flex text-sm items-center ${messageType.style} relative `}
        initial={{opacity:0, scale: 0}}
        animate={{
          opacity: 1,
          scale: 1, 
        }}
        transition={{
          duration: 0.3
        }}
        exit={{
          opacity: 0,
          scale: 0, 
        }}
        >
    
            <span className='text-lg '>
              {
              messageType.icon
              }
            </span>
    
          <p className={`px-5 `}>
            {message}
          </p>
    
          <AiOutlineClose size={15} className="absolute top-[8.5px] right-2 cursor-pointer " onClick={() => setClose(true)}/>
    
        </motion.div>  
  }
    </AnimatePresence>
  )
}


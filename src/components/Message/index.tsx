import { AiOutlineCheck, AiOutlineInfoCircle, AiOutlineWarning, AiOutlineClose } from 'react-icons/ai';
import { VscError } from 'react-icons/vsc';
import {useEffect, useState} from 'react'
import { motion } from 'framer-motion'

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
  const [hidden, setHidden] = useState(false);

  const messageType = types[type] || types.info;

  useEffect(() => {
    const interval = setInterval(() => {
      handleClose()
    }, 5000)

    return () => {
      clearInterval(interval);
    }
  }, [])


  function handleClose() {
    setClose(true)
    const interval = setInterval(() => {
      console.log('setado para ', hidden)
      setHidden(true)
      clearInterval(interval)
    }, 300)
  }

  return(

    <div className={`fixed right-5 bottom-5 flex flex-col gap-2 ${hidden && 'hidden'}`}>
    <motion.div 
    className={` w-96 py-2 px-5 rounded-md border text-white border-border-default shadow-md flex text-sm items-center ${messageType.style} relative `}
    initial={{opacity:0, scale: 0}}
    animate={{
      opacity: close? 0 : 1,
      scale: close? 0 : 1, 
    }}
    transition={{
      duration: 0.3
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

      <AiOutlineClose size={15} className="absolute top-[8.5px] right-2 cursor-pointer " onClick={() => handleClose()}/>

    </motion.div>  

    </div>
  )
}

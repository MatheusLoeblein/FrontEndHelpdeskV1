import { motion } from 'framer-motion'
import { useContext } from 'react'
import { LayoutContext } from '@/context/LayoutContext'

export function BurredBackground({children}) {

  const { menuOver } = useContext(LayoutContext);


  return(
    <motion.div 
    initial={{             
      opacity: 0,

    }}
    animate={{
      opacity: 1,
    }} 

    exit={{
      opacity: 0, 
    }}
  className={`fixed flex justify-center items-center mt-20 ${menuOver ? ' ml-16' : 'ml-72' } bottom-0 right-0 left-0 top-0 bg-[#0000006b] backdrop-opacity-100 backdrop-blur-lg px-7 py-2 border border-border-default shadow-md`}>
    {children}
  </motion.div>
  )
}
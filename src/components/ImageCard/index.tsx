import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'


export function Gallery({imageUrls}){  
  const [openGallery, setOpenGalley] = useState(false)
  const [currentImg, setCurrentImg] = useState(-1)

  function handleOpenGalleyWithImgIndex(index){
    setCurrentImg(index)
    setOpenGalley(true)
  }

  return(
<>
    <div className='w-full flex flex-col'>
        <h1 className=' text-md font-medium w-full py-3'>Fotos em anexo</h1>
        <motion.div className='w-full flex flex-row gap-1'
        >
          {
            imageUrls.map((imageUrl, index) => {
              return(
                <motion.div className='h-16 w-24 cursor-pointer shadow-md hover:shadow-xl'
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => handleOpenGalleyWithImgIndex(index)}
                >
                  <img 
                  src={imageUrl} 
                  key={index}
                  className='h-16 w-24 object-cover filter border border-gray-300 rounded-md'/>
                </motion.div>
              )
            })
          }
        

        {/* <div 
        className='h-6 px-3 rounded-lg bg-[#0000003d] absolute text-xs text-white flex items-center justify-center bottom-5 right-7'>
          Vizualizar imagem
          {counter}
        </div> */}

      </motion.div>
    </div>


    <AnimatePresence>
      {

      openGallery &&

      <div className='bg-[#0000007c] flex items-center justify-center fixed bottom-0 left-0 right-0 top-0 z-[60]'>
        <div className='max-h-[90%] max-w-[90%] relative flex'
        >
          <span
          className='text-xl font-black text-white absolute -top-10 right-0 cursor-pointer'
          onClick={() => setOpenGalley(false)}
          >X</span>

        {
          !(currentImg - 1 == -1) &&
          <button 
          className='absolute -left-8 cursor-pointer bottom-1/2 translate-y-1/2 text-4xl font-black text-white'
          onClick={() => setCurrentImg(currentImg - 1)}
          >
          {"<"}
          </button>
        }

          
        {          
        !(currentImg + 2 > imageUrls.length) &&
        <button
        className='absolute -right-8 cursor-pointer bottom-1/2 translate-y-1/2 text-4xl font-black text-white'
        onClick={() => setCurrentImg(currentImg + 1)}
        >
        {">"}
        </button>
        }

        <motion.img
        initial={{scale: 0}} 
        animate={{scale: 1}} 
        exit={{scale: 0.6}}
        src={imageUrls[currentImg]} 
        alt=""
        className='object-cover rounded-md' 
        />
        </div>
      </div>

      }
    </AnimatePresence>
</>


  )
}
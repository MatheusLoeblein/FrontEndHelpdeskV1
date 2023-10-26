import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { FaDownload } from 'react-icons/fa';

import Image from 'next/image'
import { clearTimeout } from 'timers';


type ImageInfoType = {
  size: string;
  name: string
};


export function Gallery({imageUrls, Author, authorImageUrl}){  
  const [openGallery, setOpenGalley] = useState(false)
  const [currentImg, setCurrentImg] = useState<number>(-1)
  const [imageInfo, setImageInfo] = useState<ImageInfoType | null>(null)
  const [showInfo, setShowInfo] = useState<boolean>(false)
  let timer;

  function handleOpenGalleyWithImgIndex(index){
    handleSetCurrentImg(index)
    setOpenGalley(true)
  }

  function handleSetCurrentImg(index){
    setCurrentImg(index)
    handleImgSize(imageUrls[index])
  }

  function handleImgSize(imageUrl:URL){
    fetch(imageUrl)
    .then((response) => {
      if (response.headers.get('content-length')) {
        const sizeInBytes = parseInt(response.headers.get('content-length'), 10);
        const sizeInKilobytes = sizeInBytes / 1024;
        const sizeInMegabytes = sizeInKilobytes / 1024;
        
        setImageInfo({
          size: sizeInKilobytes >= 1000 ? `${sizeInMegabytes.toFixed(3)} MB` : `${sizeInKilobytes.toFixed(3)} KB`,
          name: imageUrl.toString().split('/').slice(-1)
        }) 

      } else {
        console.log('Não foi possível obter o tamanho da imagem.');
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar a imagem:', error);
    });
  }

  function handleMouseLeave(){
    timer = setTimeout(() => {
      setShowInfo(false)
    }, 2000);
  }

  return(
<>
    <div className='w-full flex flex-col relative border-t border-t-border-default mt-10'>
        <h3 className=' text-md font-medium pr-2  bg-white position absolute -top-4 left-0 text-gray-600'><strong>Fotos anexadas</strong></h3>
        <motion.div className='w-full flex flex-row gap-1 pt-5'
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

      </motion.div>
    </div>

    <AnimatePresence>
      {

      openGallery &&

      <motion.div className='bg-[#0000007c] flex items-center justify-center fixed bottom-0 left-0 right-0 top-0 z-[60]'
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      exit={{opacity: 0}}
      onMouseEnter={() => {
        setShowInfo(true)
      }}
      onMouseLeave={handleMouseLeave}
      >
        <div className='max-h-[90%] max-w-[90%] relative flex'
        >
          <motion.span
          className='font-black text-white absolute -top-7 right-0 cursor-pointer'
          onClick={() => setOpenGalley(false)}
          whileHover={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <IoMdClose size={30}/>
          </motion.span>

        {
          !(currentImg - 1 == -1) &&
          <motion.button 
          className='absolute -left-8 cursor-pointer bottom-1/2 text-4xl font-black text-white'
          onClick={() => handleSetCurrentImg(currentImg - 1)}
          whileHover={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
          <IoIosArrowBack/>
          </motion.button>
        }

        {          
        !(currentImg + 2 > imageUrls.length) &&
        <motion.button
        className='absolute -right-8 cursor-pointer bottom-1/2 text-4xl font-black text-white'
        onClick={() => handleSetCurrentImg(currentImg + 1)}
        whileHover={{ scale: 1.3 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
        <IoIosArrowForward/>
        </motion.button>
        }

        <AnimatePresence>
          {
            <motion.img
            key={currentImg}
            initial={{opacity: 0}} 
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            src={imageUrls[currentImg]}
            alt=""
            className='object-cover rounded-md' 
            />
          }
        </AnimatePresence>

          <AnimatePresence>
            {
              showInfo &&
              <motion.div 
              initial={{opacity: 0}} 
              animate={{opacity: 1}}
              transition={{ delay: 0.5 }}
              exit={{opacity: 0}}
              className='flex justify-between text-xs text-white bg-[#2c2c2cda] w-full absolute p-2 rounded-t-md shadow-md items-center gap-4'>
                
                <div className='text-xs text-white flex gap-2 items-center'>
                  <div className='w-12 h-10 rounded-full flex justify-center items-center'>
                      <Image
                      src={authorImageUrl} 
                      alt=""
                      className='w-7 h-7 rounded-full object-cover'
                      width={500}
                      height={500}
                      
                      />
                </div>

                  <h3 className=' text-xs text-white font-medium w-full py-3' >{Author.first_name} {Author.last_name}</h3>
                </div>

                <div className='flex gap-4'>
                  <span>
                  {imageInfo?.name}
                  </span>
                  <span>
                  {imageInfo?.size}
                  </span>

                  <a
                  href={imageUrls[currentImg]}
                  download={imageInfo?.name}
                  target='_blank'
                  >
                    <FaDownload/>
                  </a>
                </div>

              </motion.div>
            }

          </AnimatePresence>
        </div>

      </motion.div>

      }
    </AnimatePresence>
</>


  )
}
import { BiSearchAlt } from 'react-icons/bi';
import { useState, useEffect, useRef } from 'react';
import { MainSearchResult } from '../MainSearchResult';
import { BurredBackground } from '../BurredBackground';
import { AiFillCloseCircle } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/router';


export function MainSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<string | null>(null);
  const inputRef = useRef(null);
  const { push } = useRouter();

  const handleInputFocus = async () => {
    await setIsOpen(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearchClose = () => {
    setIsOpen(false);
    setSearchParams(null)
  };


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearchParams(event.target.value)
    }
  };

  function handleNavigation(href){
    push(href);
    handleSearchClose();
    
  }


  return (
    <div className='hidden w-96 text-sm md:block'>


      <AnimatePresence>

        {
            !isOpen && 
            
            <motion.div  
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className='relative'
            onClick={handleInputFocus}
            >
              <input
                type="search"
                placeholder='Pequisar...'
                className='w-full border-x border-t outline-none py-1 px-3 right pr-8 border-border-default rounded-md border-b'

                />
              <span className='absolute top-1 right-2 cursor-pointer'>
                <BiSearchAlt
                  className={` w-5 h-5 text-gray-500`}
                  />
              </span>
            </motion.div>
          }
        </AnimatePresence>

        <AnimatePresence>
        
          {
            isOpen && 

            <BurredBackground>

              <motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className='w-3/4 self-start mt-10 z-10'>
                <motion.div className='relative'
                initial={{ top: '-100px', scaleX: 0.4}}
                animate={{ top: 'auto', scaleX: 1}}
                transition={{type:'tween'}}
                exit={{ top: '-100px', scaleX: 0.4}}
                >
                  <input
                    ref={inputRef}
                    type="search"
                    placeholder='Pequisar...'
                    className={`w-full border outline-none py-2 px-3 right pr-8 border-border-default rounded-md shadow-md`}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyPress}
                    onChange={() => {
                      searchParams != null &&
                      setSearchParams(null)
                    }}
                    />
                  <span className='absolute top-[5px] right-2 cursor-pointer w-7 h-7 hover:bg-gray-300 flex items-center justify-center rounded-full transition-colors'
                  onClick={handleSearchClose}
                  >
                    <AiFillCloseCircle className={` w-5 h-5 text-gray-700`}/>
                  </span>
                </motion.div>

                {
                  searchParams &&
                  <MainSearchResult searchParams={searchParams} onClick={handleNavigation}/> 
                }
            
              </motion.div>

            </BurredBackground>
          }

      </AnimatePresence>
    </div>
  ) 
}
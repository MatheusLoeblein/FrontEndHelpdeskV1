import { useRef, useState } from 'react';
import { GoPaperclip } from 'react-icons/go';
import { BsFillFileEarmarkCheckFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion'

export const FileUploader = () => {
  const [ fileInInput, setFileInInput ] = useState(null);
  const fileInputRef = useRef(null);


  const resetFileInput = () => {
    setFileInInput(null);
    // Reset the input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
      <div className='flex gap-3'>
        <motion.div 
          className='text-sm cursor-pointer flex border border-border-default rounded-md shadow-sm p-2' onClick={() => document.querySelector('#file-input').click()}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <GoPaperclip size={15}/>

        </motion.div>

          <input 
          type="file" 
          className="hidden" 
          id="file-input" 
          ref={fileInputRef}
          onChange={({target : { files }}) => {
            files[0] && setFileInInput(files[0].name)
            console.log(files)
          }}
          />
          {
            fileInInput &&
            <div className='text-xs p-2 grow border border-border-default rounded-md shadow-sm flex justify-between'>
              <motion.span 
                className='text-red-400 cursor-pointer'
                whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={resetFileInput}
              >
                <AiOutlineClose size={15}/>
              </motion.span>
              <span>
                {fileInInput}
              </span>
              <span className='text-primary-formedica'>
                <BsFillFileEarmarkCheckFill size={15}/>
              </span>
             </div>
          }

      </div>
      
  );

}
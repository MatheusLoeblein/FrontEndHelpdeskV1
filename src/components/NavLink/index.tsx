import { BiSolidRightArrow} from 'react-icons/bi';
import { motion } from 'framer-motion'
import Link from 'next/link';

interface NavLinkProps {
  visible: boolean;
  texts: {
    title: string;
    subtitles: {
      subtitle: string,
      link: string,
    };
    children: React.ReactNode;
  };
  onClick: () => void;
  sideOver: boolean;
  sideSubVisible: boolean;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}

export function NavLink({visible, texts, onClick, sideOver}: NavLinkProps) {
  const {title , subtitles = '', children } = texts;

  if(!sideOver) {
    return (
      <div>
        <motion.span
          initial={{opacity:0}}
          animate={{opacity: 1}}
          className={`flex gap-3 pl-6 py-2 cursor-pointer items-center rounded-md hover:bg-gray-200 relative`}
          onClick={onClick}
        >
          {subtitles && <BiSolidRightArrow className={`w-2 h-2 absolute left-3 ${visible ? 'rotate-90' : ''} `} /> }
            
          {children} 
          
          {title}
        </motion.span>
        <motion.ul 
        initial={{ opacity: 0, height: 0, scale: 0, x: '-10px'}}
        animate={{
          opacity: visible && subtitles ? 1 : 0,
          height: visible && subtitles ? 'auto' : 0,
          scale: visible && subtitles ? 1 : 0,
          x: visible && subtitles ? 0 : '-10px',
        }}
        transition={{ duration: 0.2 }}
  
        className='flex-col flex'>
            {subtitles && subtitles.map((obj: { subtitle: string, link: string,}) => {
            return(
              <Link  href={obj.link} as={obj.link}>
                  <li className='hover:bg-gray-200 pl-20 py-2 rounded-md cursor-pointer' key={obj.subtitle}>{obj.subtitle}</li>
              </Link>
            )
            })}
          </motion.ul>
      </div>
    );
  }else{

    return(
      <div className='w-full p-2 flex relative group'>
        <span className='p-3 hover:bg-gray-200 cursor-pointer rounded-md duration-300 ' title={title}  onClick={onClick}  >
          {children}
        </span>

        <motion.div 
        className='w-60 bg-white absolute border duration-300 border-border-default shadow-md rounded-md hidden group-hover:flex hover:flex -right-64 py-2 top-4 gap-2 flex-col z-50 transition-all'
        >
          
          <div className='absolute w-5 h-5 bg-white rotate-45 top-2 -left-[10.6px] border-b border-l border-b-border-default border-l-border-default rounded-bl-md z-20' >
          </div>
 
          <div className={`px-3 py-1 ${subtitles?.length > 0 && 'border-b'} z-50 text-md`}>
            {title}
          </div>
 
          { subtitles?.length > 0 &&
            <div >
            <ul className='flex gap-2 flex-col text-xs'>
            { subtitles.map((obj: { subtitle: string, link: string,}) => {
            return(
                <Link  href={obj.link} as={obj.link}>
                  <li key={obj.subtitle} className=' w-full px-3 py-2 pl-5 hover:bg-blue-100 cursor-pointer' >
                    {obj.subtitle}
                  </li>
                </Link>
            )
            })}
            </ul>
          </div>
          }
         
        </motion.div>

       

      </div>
    )
  }
}

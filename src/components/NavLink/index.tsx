import { BiSolidRightArrow} from 'react-icons/bi';


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

export function NavLink({visible, texts, onClick, sideOver, sideSubVisible, onMouseOver, onMouseLeave}: NavLinkProps) {
  const {title , subtitles = '', children } = texts;

  if(!sideOver) {
    return (
      <div>
        <span
          className={`flex gap-3 pl-6 py-2 cursor-pointer items-center rounded-md hover:bg-gray-200 relative `}
          onClick={onClick}
        >
          {subtitles && <BiSolidRightArrow className={`w-2 h-2 absolute left-3 ${visible ? 'rotate-90' : ''} `} /> }
            
          {children} 
          
          {title}
        </span>
    
        <ul className={`flex flex-col ${visible && subtitles  ? 'animate-menuDropDownIn' : 'hidden' }`}>
            {subtitles && subtitles.map((obj: { subtitle: string, link: string,}) => {
            return(
              <li className='hover:bg-gray-200 pl-20 py-2 rounded-md cursor-pointer' key={obj.subtitle}>{obj.subtitle}</li>
            )
            })}
          </ul>
      </div>
    );
  }else{
    return(
      <div className='w-full p-2 flex relative'>
        <span className='p-3 hover:bg-gray-200 cursor-pointer rounded-md' title={title} onMouseOver={onMouseOver} onClick={onClick} onMouseLeave={onMouseLeave}>
          {children}
        </span>

      
      { sideSubVisible &&

         <div className='w-60 bg-white absolute border  border-border-default shadow-md rounded-md -right-64 top-4 flex flex-col z-10'>
          
         <div className='absolute w-5 h-5 bg-white rotate-45 top-2 -left-[10.6px] z-0 border-b border-l border-b-border-default border-l-border-default  rounded-bl-md' >
         </div>

         <div className='p-3 border-b z-10'>
           {title}
         </div>

         <div >
           <ul>

           {subtitles && subtitles.map((obj: { subtitle: string, link: string,}) => {
           return(
             <li className='p-3 pl-5' key={obj.subtitle}>{obj.subtitle}</li>
           )
           })}
           </ul>
         </div>
        </div>

       }
      
        

      </div>
    )
  }
}

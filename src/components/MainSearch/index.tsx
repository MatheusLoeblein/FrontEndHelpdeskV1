import {BiSearchAlt} from 'react-icons/bi';
import {useState} from 'react';

export function MainSearch() {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
    console.log('focuuuusss')
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };


  return (
    <div className='hidden w-96 relative text-sm md:block'>
      <input
        type="search"
        placeholder='Pequisar...'
        className={`w-full border-x border-t outline-none py-1 px-3 right pr-8 ${
          isFocused ? ' rounded-t-md shadow-lg' : 'border-border-default rounded-md border-b'
        }`}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <span className='absolute top-1 right-2'>
        <BiSearchAlt
          className={` w-5 h-5 text-gray-500`}
        />
      </span>

      {

        isFocused && 
        <div className='absolute bg-white w-full rounded-b-md shadow-lg flex flex-col border text-xs z-10' >

          <div className='p-2 hover:bg-gray-200'>
            <span>
              Tickets
            </span>
            
          </div>
          <div className='p-2 hover:bg-gray-200'>
            <span>
              Protocolos
            </span>

          </div>
          <div className='p-2 hover:bg-gray-200 rounded-b-md'>
            <span>
             Endereçadores
            </span>

          </div>

        </div>
      }
    </div>
  ) 
}
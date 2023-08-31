import { NavLink } from '@/components/NavLink';
import { useState, useEffect, useContext } from 'react';
import { FaTruck, FaCodeBranch, FaFileImport } from 'react-icons/fa';
import { AiFillNotification } from 'react-icons/ai';
import { BiTask, BiSolidArrowToLeft } from 'react-icons/bi';
import { PiComputerTowerFill } from 'react-icons/pi';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { handleLogout } from '@/utils/logout';
import { LayoutContext } from '@/context/LayoutContext';


const navLinks = [
  {
    title: 'Tickets',
    subtitles: [
      { subtitle: 'Favoritos', link: 'link' },
      { subtitle: 'Finalizados', link: 'link' },
      { subtitle: 'Meus Tickets', link: 'link' }
    ],
    children: <BiTask className='w-5 h-5' />
  },
  {
    title: 'Logística',
    subtitles: [
      { subtitle: 'Cotações', link: 'link' },
      { subtitle: 'Endereçador', link: 'link' },
    ],
    children: <FaTruck className='w-5 h-5' />
  },
  {
    title: 'Relatórios',
    subtitles: [
      { subtitle: 'Médicos', link: 'link' },
      { subtitle: 'Produtos', link: 'link' },
    ],
    children: <FaFileImport className='w-5 h-5' />
  },
  {
    title: 'Protocolos',
    children: <FaCodeBranch className='w-5 h-5' />
  },
  {
    title: 'Comunicados',
    children: <AiFillNotification className='w-5 h-5' />
  },
  {
    title: 'Maquinas',
    children: <PiComputerTowerFill className='w-5 h-5' />
  },
  {
    title: 'Logout',
    children: <RiLogoutBoxFill className='w-5 h-5' />,
    link: handleLogout
  },
]

export function MenuSideBar() {

  const { menuOver, handleMenuOver } = useContext(LayoutContext);

  // const [siderOver, setSideOver] = useState(menuOver);


  // useEffect(() => {
  //   handleMenuOver(siderOver);
  //   console.log('MENU FECHADO', siderOver)

  // }, [setSideOver, siderOver])


  const [sideSubVisible, setSideSubVisible] = useState(-1);

  const [activeMenuIndex, setActiveMenuIndex] = useState(-1);

  const handleNavMouseLeave = () => {
    setSideSubVisible(-1); // Define o índice do submenu como -1 quando o mouse sai do nav
  };

  return (
    <nav
      className={`
    flex flex-col fixed h-full space-y-96 bg-white top-20
    z-50
  
    py-5 text-sm text-gray-700 border-r border-r-border-default 
    duration-300
    ${menuOver ? ' w-16' : 'w-72 pr-5  pl-5'}`}

    >
      <div className=''>

        {navLinks.map((navLink, index) => {
          return (
            <NavLink
              key={index}
              visible={index === activeMenuIndex}
              texts={navLink}
              onClick={() => navLink.link ? navLink.link() : setActiveMenuIndex(activeMenuIndex == index ? -1 : index)}
              sideOver={menuOver}
              sideSubVisible={index === sideSubVisible}
              onMouseOver={() => setSideSubVisible(index)}
              onMouseLeave={handleNavMouseLeave}
            />
          )
        })}
      </div>

      {
        menuOver ?
          <div className='px-2 py-2 bottom-5 w-16 cursor-pointer fixed'
            onClick={() => handleMenuOver(!menuOver)}>

            <span className='flex p-2 justify-center items-center cursor-pointer rounded-md hover:bg-gray-200'>
              <BiSolidArrowToLeft className="w-5 h-5 rotate-180 " />
            </span>

          </div>
          :
          <div className=' bottom-5 w-60 fixed'>
            <span className='flex gap-3  pl-6 py-2 items-center cursor-pointer rounded-md hover:bg-gray-200'
              onClick={() => handleMenuOver(!menuOver)}
            >
              <BiSolidArrowToLeft className="w-5 h-5" />
              Esconder
            </span>
          </div>
      }
    </nav>
  )
}
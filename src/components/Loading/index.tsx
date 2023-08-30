import Image from 'next/image'

export function loading() {
  return(
    <div className='relative h-screen'>

      <div className='bg-primary-bg absolute top-0 bottom-0 left-0 right-0 z-[9] flex items-center justify-center'>
          <Image 
          width={500}
          height={500}
          alt="helpicon.png"
          src="/assets/helpicon.png" className='w-10 h-10 animate-bounce'/>
      </div>

    </div>
  )
}
import { motion } from 'framer-motion';
import format from 'date-fns/format';
import { BsCalendar2Date } from 'react-icons/bs';
import { CgComment } from 'react-icons/cg';
import { verifyImagePrefix } from '@/utils/verifyImagePrefix';
import Image from 'next/image'
import { extractImageUrlsAndCleanHtml } from '@/utils/HtmlTextImageTools';
import { Gallery } from '../Gallery';


export function TicketComment({comment, variants}){

  const ProfileImgUrl = verifyImagePrefix(comment?.author?.profile?.cover_profile)

  const { imageUrls, cleanHtml } = extractImageUrlsAndCleanHtml(comment?.comment)

  return(
    <motion.div 
    className='grid grid-cols-[1fr,15fr] gap-20 my-12  relative ' 
    variants={variants}>

      <div className='w-60  h-10 text-center flex justify-between px-10 items-center bg-white rounded-md z-10 shadow-md text-sm'>
        <span >{format(new Date(comment.created_at), 'dd-MM-yyyy')} ás {format(new Date(comment.created_at), 'HH:mm')}</span>
        <span className="text-blue-400"><BsCalendar2Date size={14} /></span>
      </div>
      <span className='absolute bg-blue-400 w-20 h-1 left-60 top-4 z-0'>

      </span>
      <span className='absolute bg-blue-400 w-3 h-3 left-[314px] top-[11.5px] rotate-45 z-10'>
      </span>
    
      <div className='flex grow bg-white rounded-md p-5 space-x-4 shadow-md relative'>

        <h3 className='absolute top-5 right-5 text-xs text-blue-400 '> <CgComment size={18}/></h3>

        <div className='w-20 h-20'>
          <Image
          src={ProfileImgUrl} 
          alt=""
          className='w-16 h-16 rounded-full object-cover'
          width={500}
          height={500}
          />

        </div>

        <div className='flex flex-col justify-start w-full'>
          <h3 className='border-b border-b-border-default text-md font-medium w-full py-3 text-gray-600' >{comment.author.first_name} {comment.author.last_name}</h3>

          <div className='py-5'>
            <div className="break-all" dangerouslySetInnerHTML={{__html: cleanHtml}}></div>
          </div>

         {

          imageUrls.length > 0 &&
           <Gallery imageUrls={imageUrls} Author={comment.author} authorImageUrl={ProfileImgUrl} />
         }

        </div>
        

      </div> 
    </motion.div>
  )
}
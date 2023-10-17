import { motion, AnimatePresence} from 'framer-motion'
import { useEffect, useState, useContext } from 'react'
import dynamic from 'next/dynamic'
import { BurredBackground } from '../BurredBackground'
import { GoPaperclip } from 'react-icons/go'
import { CgComment } from 'react-icons/cg'
import { useMutation } from 'react-query'
import { usePrivateApi } from '@/hooks/usePrivateApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { AuthContext } from '@/context/AuthContext'


const Editor = dynamic(() => import('../Editor'), {
  ssr: false
});


export function NewComment({taskId}) {
  const [ open, setOpen ] = useState(false)
  const { setMessages } = useContext(AuthContext)

  const handleEditorChange = (html) => {
    setValue("comment", html);
  };

  function removeHTMLTags(input) {
    return input.replace(/<[^>]*>/g, '');
  }
  
  const schema = object({
    comment: string()
      .required("Campo obrigatório.")
      .test('minimum-text', 'Descrição deve conter pelo menos 25 caracteres.', (value) => {
        const textWithoutHTML = removeHTMLTags(value);
        return textWithoutHTML.length >= 25;
      })
  });
  
  const methods = useForm(
    {
      resolver: yupResolver(schema)
    }
  );

  const { register, handleSubmit, control, setValue, formState: { errors }, clearErrors, reset } = methods;

  const api = usePrivateApi()
  const {mutate, isLoading: postLoading, isSuccess} = useMutation('CreateComment', async (data) => {
    const response = await api.post('/api/comment/create/', data)
    
    return response.data
  }
  )

  useEffect(() => {
    if(!postLoading && isSuccess){
      setOpen(false)
      if (isSuccess){
        setMessages([{
          text: "Observação adicionada com sucesso!",
          type: "success"
        }])
      }
    }
  },
  [postLoading, isSuccess, setMessages]
  )


  function handleCreateComment(data){
    mutate({
      Tarefa: taskId,
      ...data
    })
    console.log('Comentario adicionado', {
      Tarefa: taskId,
      ...data
    })
  }



  return(
  <>
  {
    !open &&
    <motion.div 
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className='fixed bottom-10 right-10 bg-white px-7 py-2 border border-border-default rounded-lg shadow-md cursor-pointer'
    onClick={() => setOpen(true)}
    >
        <h2 className='text-lg text-primary-formedica font-medium flex items-center space-x-2'> <span>Anexar Tratativa</span> <CgComment/></h2>
    </motion.div>
  }


      <AnimatePresence>
      {
        open &&
        <BurredBackground>
          <div>
            <motion.form 
            className='flex flex-col w-[700px] h-[470px] bg-white rounded-md p-5 justify-between shadow-md'
            initial={{scale: 0}}
            animate={{scale: 1}}
            exit={{scale: 0}}
            onSubmit={handleSubmit(handleCreateComment)}
            >
            <FormProvider {...methods}>
            <div>
              <h2 className='text-lg text-primary-formedica font-medium flex items-center space-x-2'> <span>Anexar Tratativa</span> <CgComment/></h2>
              <p className="text-xs text-gray-500">Comentarios aqui adicionados seram vinculados a tarefa em observação</p>
            </div>

              <div className='h-52'>
                <Controller
                    name="comment"
                    control={control}
                    defaultValue=""
                    render={() => (
                      <Editor onEditorChange={handleEditorChange} />
                    )}
                    />
              </div>

              <div className='border border-border-default rounded-md shadow-md p-2 mt-5 w-max'>
                <GoPaperclip/>
              </div>


              <div className='flex gap-2 justify-end self-end'>
                <motion.button className='px-5 py-1 rounded-md'
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(false)
                  reset()
                  }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className='px-5 py-1 rounded-md text-white bg-primary-formedica flex'>
                  
                  {postLoading ? 
                    <span className=' w-5 h-5 border-2 border-border-default rounded-full border-t-pink-500 animate-spin'></span>
                    : 'Salvar'
                  }
                  
                </motion.button>
              </div>
              </FormProvider>


            </motion.form>

            { errors.comment &&
              <div className='mt-5 w-full bg-red-300 p-5 rounded-md border border-red-500 text-red-600 text-sm'>
              <ul className='list-disc px-5'>
                  <li>{errors?.comment?.message}</li>
              </ul>
            </div>
            }
          </div>

        </BurredBackground>
      }
      </AnimatePresence>
      
  </>

  )
}
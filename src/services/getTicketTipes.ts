import { useQuery } from 'react-query';
import { api } from './api';

export function getTicketTipes(){

  const query = useQuery('tipes', async () => {
    const response = await api.get('/api/tarefa/tipes/')
    return response.data
  },
  {
    refetchOnWindowFocus: false,
  }
  )

  return query
}
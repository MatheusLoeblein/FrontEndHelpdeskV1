import { api } from '@/services/api';
import { useMutation } from 'react-query';

export function usePostApi(name, url) {

  const query = useMutation(name, async (data) => {
    const response = await api.post(url, data)
    return response.data
  }
  )
  return query
}
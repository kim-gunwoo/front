import { useQuery } from '@tanstack/react-query';
import * as searchApi from '@/apis/searchApi';
import { ISearch } from './SearchPage';

const QueryKeys = {
  Search: ['search'],
  // Search : () => ['search']
};

// namespace QueryKey {
//     export const Search = ['search']
//     // export const Search = () => ['search']
// }

interface UseGetProps extends ISearch {}

export default function useGetQuery(request: UseGetProps) {
  return useQuery([QueryKeys.Search], async () => await searchApi.searchList(request), {
    enabled: false,
  });
}

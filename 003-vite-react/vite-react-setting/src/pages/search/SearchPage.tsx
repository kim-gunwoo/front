import * as searchApi from '@/apis/searchApi';
import { ISearchRes } from '@/apis/searchApi';
import { useCallback, useMemo, useState } from 'react';
import useGetQuery from './useGetQuery';

export type TSort = 'desc' | 'asc';

export type TDuplicate = 'yes' | 'no';

export interface ISearch {
  sort: TSort;
  duplicate: TDuplicate[];
  keyword: string;
}

export default function SearchPage() {
  const [search, setSearch] = useState<ISearch>({
    sort: 'desc',
    duplicate: ['yes', 'no'],
    keyword: '',
  });

  const [list, setList] = useState<ISearchRes[]>([]);
  const [selectedData, setSelectedData] = useState<ISearchRes>();
  const { data, refetch } = useGetQuery(search);

  const sortList = useMemo<TSort[]>(() => {
    return ['desc', 'asc'];
  }, []);
  const duplicateList = useMemo<TDuplicate[]>(() => {
    return ['yes', 'no'];
  }, []);

  const changeSearch = useCallback((changeValue: Partial<ISearch>) => {
    setSearch((prev) => ({
      ...prev,
      ...changeValue,
    }));
  }, []);

  const onSubmitAxios = useCallback(async () => {
    try {
      const res = await searchApi.searchList(search);
      setList(res.data);
    } catch {
      //
    }
  }, [search]);

  const onSubmitQuery = useCallback(() => {
    refetch();
  }, [refetch]);

  const onDataClick = useCallback((item: ISearchRes) => {
    setSelectedData(item);
  }, []);

  return (
    <div>
      <div>
        <div>
          <div>업로드 일자</div>
          <div>
            {sortList.map((options) => (
              <div key={options}>
                <label htmlFor={`search-sort-${options}`}>{options}</label>
                <input
                  id={`search-sort-${options}`}
                  type="radio"
                  name={options}
                  checked={search.sort === options}
                  onChange={() => changeSearch({ sort: options })}
                  role="sort"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>중복여부</div>
          <div>
            <div>
              <label htmlFor={`search-duplicate-all`}>전체</label>
              <input
                id="search-duplicate-all"
                type="checkbox"
                role="duplicate"
                name={'all'}
                checked={search.duplicate.length === duplicateList.length}
                onChange={(e) => {
                  changeSearch({
                    duplicate: e.target.checked ? duplicateList : [],
                  });
                }}
              />
            </div>
            {duplicateList.map((options) => (
              <div key={options}>
                <label htmlFor={`search-duplicate-${options}`}>{options}</label>
                <input
                  id={`search-duplicate-${options}`}
                  key={options}
                  type="checkbox"
                  role="duplicate"
                  name={options}
                  checked={search.duplicate.includes(options)}
                  onChange={(e) =>
                    changeSearch({
                      duplicate: e.target.checked ? [...search.duplicate, options] : search.duplicate.filter((v) => v !== options),
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <input
            type="text"
            role="keyword"
            name="keyword"
            placeholder="키워드를 입력해주세요."
            value={search.keyword}
            onChange={({ target: { name, value } }) => changeSearch({ [name]: value })}
          />
        </div>
      </div>
      <div>
        <button role="submit-search" aria-label="axios" onClick={onSubmitAxios}>
          onSubmitAxios
        </button>
        <button role="submit-search" aria-label="query" onClick={onSubmitQuery}>
          onSubmitQuery
        </button>
      </div>
      <div>
        {list.map((item, idx) => (
          <div key={idx}>{item.name}</div>
        ))}
        {data?.data.map((item, idx) => (
          <div key={idx} aria-label={item.name} role="query-data" onClick={() => onDataClick(item)}>
            <div>{item.name}</div>
            {selectedData?.name === item.name && 'isSelected'}
          </div>
        ))}
      </div>
    </div>
  );
}

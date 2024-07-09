import { useState, useCallback } from 'react';
import { useLoader } from './useLoader';

const useDataFetching = (fetchDataCallback) => {
    const [data, setData] = useState([]);
    const [loading, startLoading, stopLoading] = useLoader(false);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [offset,setOffset] = useState(0);


    const fetchData = useCallback(async (search = "", categoryId = null) => {
        startLoading();
        try {
            const params = { offset: 0, limit: 20, searchText: search, categoryId: categoryId }
            const fetchedData = await fetchDataCallback(params);
            setData(fetchedData);
            setAllDataLoaded(fetchedData.length === 0)
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            stopLoading();
        }
    }, [fetchDataCallback, stopLoading, startLoading]);

    const fetchMoreData = async (search = "", categoryId = null) => {
        if (loading || allDataLoaded) return;
        startLoading();
        try {
            const params = { offset: offset + 1, limit: 20, searchText: search, categoryId: categoryId };
            const fetchedData = await fetchDataCallback(params);
            if (fetchedData.length === 0) {
                setAllDataLoaded(true);
        } else {
                setData((prevData) => [...prevData, ...fetchedData]);
                setOffset((prevOffset) => prevOffset + 1);
            }
        } catch (error) {
            console.error('Error fetching more data:', error);
        } finally {
            stopLoading();
        }
    
    const handleSearchTextChange = debounce ((text)=> {
        fetchData(text);
        }, 1000 );
        return { data, loading, fetchData, handleSearchTextChange };
    }
}

export default useDataFetching;
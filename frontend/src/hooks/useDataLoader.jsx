import { useContext } from 'react';
import DataLoaderProvider from '../context/DataLoaderProvider';

const useDataLoader = () => {
  return useContext(DataLoaderProvider);
};

export default useDataLoader;

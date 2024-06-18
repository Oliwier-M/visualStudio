import React from 'react';
import List from '@mui/material/List';

interface GeneralListProps {
  children: React.ReactNode;
}

const GeneralList: React.FC<GeneralListProps> = ({ children }) => {
  return <List>{children}</List>;
};

export default GeneralList;
export {};

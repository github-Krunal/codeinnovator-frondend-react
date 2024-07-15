import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { RepositoryModel } from '../../model/repository.model';
import { useState } from 'react';
import { APIConstant } from '../../constant/api.constant';

interface Data {
  Name: string;
  Description: string;
  id: number;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

type Sample = [string, string];

const sample: readonly Sample[] = [
  ['Frozen yoghurt', 'Frozen yoghurt'],
];

function createData(
  id: number,
  Name: string,
  Description: string,
): Data {
  return { id, Name, Description};
}

const columns: ColumnData[] = [
  {
    width: 200,
    label: 'Name',
    dataKey: 'Name',
  },
  {
    width: 120,
    label: 'Description',
    dataKey: 'Description',
    numeric: true,
  },
 
];


// const rows: Data[] = sample.map((_,index)=>{
//   const randomSelection:Sample = sample[index];
//   return createData(index, ...randomSelection);
// })
 

// const rows: Data[] = Array.from({ length: 200 }, (_, index) => {
//   const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//   return createData(index, ...randomSelection);
// });

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Data) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function Repository() {
  const [repositoryList,setRepositoryList]=useState<any>([])

  React.useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async () => {
    const response = await fetch(APIConstant.GET_REPOSITORY);
    const result = await response.json();
    setRepositoryList(result);
  };

  return (
    <div>
       <div className='d-flex justify-content-between'>
       <h4>Repository</h4>
      <Link to={'add'}><Button variant="outlined">+ Repository</Button></Link> 
       </div>
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={repositoryList}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
    </div>

  );
}

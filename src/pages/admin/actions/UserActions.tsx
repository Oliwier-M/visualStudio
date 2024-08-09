import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../ApiProvider';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { UserDto } from '../../../dto/login.dto';

export default function UserActions() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [id, setId] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const apiClient = useApi();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', width: 100 },
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];

  async function fetchUsers() {
    const response = await apiClient.getUsers();
    if (response.success) {
      setUsers(response.data);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [apiClient]);

  console.log(users);

  async function deleteUser(id: number) {
    const response = await apiClient.deleteUser(id);
    if (response.success) {
      fetchUsers();
    }
  }

  async function handleDelete() {
    if (selectedIds.length > 0) {
      for (const id of selectedIds) {
        await deleteUser(id);
      }
      setSelectedIds([]);
    } else {
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        await deleteUser(parsedId);
      }
    }
  }

  return (
    <Box sx={{ flexGrow: 1, margin: 5 }}>
      <Box>
        <TextField
          id="id"
          label="User ID"
          variant="outlined"
          placeholder="Enter user ID"
          value={id}
          sx={{ width: 120 }}
          onChange={(e) => setId(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: 100, height: 55, marginLeft: 2 }}
          onClick={handleDelete}
        >
          <Typography>Delete</Typography>
        </Button>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(ids) => setSelectedIds(ids as number[])}
          sx={{ width: 800 }}
        />
      </Box>
    </Box>
  );
}

// import { useNavigate } from 'react-router-dom';
// import { useApi } from '../../../ApiProvider';
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { Box, Button, Stack, TextField, Typography } from '@mui/material';
// import { UserDto } from '../../../dto/login.dto';

// export default function UserActions() {
//   const [users, setUsers] = useState<UserDto[]>([]);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [id, setId] = useState('');
//   const apiClient = useApi();

//   const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', type: 'number', width: 100 },
//     { field: 'firstName', headerName: 'First Name', width: 200 },
//     { field: 'lastName', headerName: 'Last Name', width: 200 },
//     { field: 'email', headerName: 'Email', width: 200 },
//   ];

//   useEffect(() => {
//     async function fetchUsers() {
//       const response = await apiClient.getUsers();
//       if (response.success) {
//         setUsers(response.data);
//       }
//     }

//     fetchUsers();
//   }, [apiClient]);

//   console.log(users);

//   async function deleteUser(id: number) {
//     const response = await apiClient.deleteUser(id);
//     if (response.success) {
//       setUsers(users.filter((user) => user.id !== id));
//     }
//   }

//   async function deleteSelectedUsers() {
//     for (const id of selectedIds) {
//       await deleteUser(id);
//     }
//   }

//   // async function getuser(id: number) {
//   //   const response = await apiClient.getUser(id);
//   //   if (response.success) {
//   //     setUsers(response.data);
//   //   }
//   // }

//   return (
//     <Box sx={{ flexGrow: 1, margin: 5 }}>
//       <Box>
//         <TextField
//           id="id"
//           label="user ID"
//           variant="outlined"
//           placeholder="enter user ID"
//           value={id}
//           sx={{ width: 120 }}
//           onChange={(e) => setId(e.target.value)}
//         />
//         <Button
//           variant="contained"
//           sx={{ width: 100, height: 55, marginLeft: 2 }}
//           onClick={() => deleteUser(parseInt(id, 10))}
//         >
//           <Typography>Delete</Typography>
//         </Button>
//         {/* <Button
//           variant="contained"
//           sx={{ width: 100, height: 55, marginLeft: 2 }}
//           onClick={() => getuser(parseInt(id, 10))}
//         >
//           <Typography>View</Typography>
//         </Button>
//         <Button
//           variant="contained"
//           sx={{ width: 120, height: 55, marginLeft: 2 }}
//           onClick={}
//         >
//           <Typography>View all</Typography>
//         </Button> */}
//       </Box>
//       <Box sx={{ marginTop: 4 }}>
//         <DataGrid
//           rows={users}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 5 },
//             },
//           }}
//           pageSizeOptions={[5, 10]}
//           checkboxSelection
//           sx={{ width: 800 }}
//         />
//       </Box>
//     </Box>
//   );
// }

import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { userApi } from '../services/api';
import { User, CreateUserData } from '../types';

const Users: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<CreateUserData>({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const queryClient = useQueryClient();

  const { data: usersData, isLoading, error } = useQuery('users', userApi.getUsers);

  const createUserMutation = useMutation(userApi.createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      setOpen(false);
      setFormData({ name: '', email: '', password: '', role: 'user' });
    },
  });

  const deleteUserMutation = useMutation(userApi.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const handleOpen = () => {
    setOpen(true);
    setSelectedUser(null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setFormData({ name: '', email: '', password: '', role: 'user' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate(formData);
  };

  const handleRowClick = (params: GridRowParams) => {
    setSelectedUser(params.row as User);
    setFormData({
      name: params.row.name,
      email: params.row.email,
      password: '',
      role: params.row.role,
    });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUserMutation.mutate(id);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 120 },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(params.row._id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load users. Please check if the backend server is running.
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Users
        </Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add User
        </Button>
      </Box>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={usersData?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          onRowClick={handleRowClick}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required={!selectedUser}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={createUserMutation.isLoading}>
              {createUserMutation.isLoading ? 'Saving...' : 'Save'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Users;

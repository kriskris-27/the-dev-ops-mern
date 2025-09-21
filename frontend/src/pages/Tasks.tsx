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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { taskApi, userApi } from '../services/api';
import { Task, CreateTaskData, User } from '../types';

const Tasks: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<CreateTaskData>({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    user: '',
  });

  const queryClient = useQueryClient();

  const { data: tasksData, isLoading, error } = useQuery('tasks', taskApi.getTasks);
  const { data: usersData } = useQuery('users', userApi.getUsers);

  const createTaskMutation = useMutation(taskApi.createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      setOpen(false);
      setFormData({ title: '', description: '', status: 'pending', priority: 'medium', user: '' });
    },
  });

  const deleteTaskMutation = useMutation(taskApi.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const handleOpen = () => {
    setOpen(true);
    setSelectedTask(null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
    setFormData({ title: '', description: '', status: 'pending', priority: 'medium', user: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTaskMutation.mutate(formData);
  };

  const handleRowClick = (params: GridRowParams) => {
    setSelectedTask(params.row as Task);
    setFormData({
      title: params.row.title,
      description: params.row.description,
      status: params.row.status,
      priority: params.row.priority,
      user: typeof params.row.user === 'string' ? params.row.user : params.row.user._id,
    });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getPriorityColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: 'user',
      headerName: 'User',
      width: 150,
      valueGetter: (params) => {
        const user = params.row.user;
        return typeof user === 'string' ? user : user?.name || 'Unknown';
      },
    },
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
        Failed to load tasks. Please check if the backend server is running.
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Tasks
        </Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add Task
        </Button>
      </Box>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tasksData?.data || []}
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
          {selectedTask ? 'Edit Task' : 'Add New Task'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>User</InputLabel>
              <Select
                value={formData.user}
                label="User"
                onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                required
              >
                {usersData?.data.map((user: User) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                label="Priority"
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={createTaskMutation.isLoading}>
              {createTaskMutation.isLoading ? 'Saving...' : 'Save'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Tasks;

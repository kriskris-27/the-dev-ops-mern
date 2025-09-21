import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Paper,
  Box,
  Alert,
  CircularProgress,
  Chip,
  Grid,
} from '@mui/material';
import { useQuery } from 'react-query';
import { taskApi } from '../services/api';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: taskData, isLoading, error } = useQuery(
    ['task', id],
    () => taskApi.getTaskById(id!),
    { enabled: !!id }
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !taskData) {
    return (
      <Alert severity="error">
        Failed to load task details. Please check if the task exists.
      </Alert>
    );
  }

  const task = taskData.data;
  const user = typeof task.user === 'string' ? { name: 'Unknown User' } : task.user;

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

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Task Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Task Information
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                {task.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {task.description}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label={task.status}
                    color={getStatusColor(task.status) as any}
                    size="medium"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Priority
                  </Typography>
                  <Chip
                    label={task.priority}
                    color={getPriorityColor(task.priority) as any}
                    size="medium"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Assigned User
                  </Typography>
                  <Typography variant="body1">
                    {user.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Created At
                  </Typography>
                  <Typography variant="body1">
                    {new Date(task.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body1">
                    {new Date(task.updatedAt).toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Task Progress
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Current Status
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 8,
                    backgroundColor: 'grey.300',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      width: task.status === 'completed' ? '100%' : task.status === 'in-progress' ? '50%' : '0%',
                      height: '100%',
                      backgroundColor: task.status === 'completed' ? 'success.main' : task.status === 'in-progress' ? 'warning.main' : 'grey.400',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {task.status === 'completed' ? '100% Complete' : task.status === 'in-progress' ? '50% Complete' : '0% Complete'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Priority Level
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {task.priority === 'high' ? '🔴 High Priority' : 
                 task.priority === 'medium' ? '🟡 Medium Priority' : 
                 '🟢 Low Priority'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Task ID
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>
                {task._id}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskDetail;

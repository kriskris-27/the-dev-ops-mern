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
import { userApi, taskApi } from '../services/api';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: userData, isLoading: userLoading, error: userError } = useQuery(
    ['user', id],
    () => userApi.getUserById(id!),
    { enabled: !!id }
  );

  const { data: tasksData, isLoading: tasksLoading } = useQuery(
    ['tasks', 'user', id],
    () => taskApi.getTasksByUser(id!),
    { enabled: !!id }
  );

  if (userLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (userError || !userData) {
    return (
      <Alert severity="error">
        Failed to load user details. Please check if the user exists.
      </Alert>
    );
  }

  const user = userData.data;
  const tasks = tasksData?.data || [];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        User Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1">
                {user.name}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">
                {user.email}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Role
              </Typography>
              <Chip
                label={user.role}
                color={user.role === 'admin' ? 'primary' : 'default'}
                size="small"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Created At
              </Typography>
              <Typography variant="body1">
                {new Date(user.createdAt).toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Last Updated
              </Typography>
              <Typography variant="body1">
                {new Date(user.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Task Statistics
            </Typography>
            {tasksLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Tasks
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {tasks.length}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Completed Tasks
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {tasks.filter(task => task.status === 'completed').length}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    In Progress
                  </Typography>
                  <Typography variant="h4" color="warning.main">
                    {tasks.filter(task => task.status === 'in-progress').length}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Pending Tasks
                  </Typography>
                  <Typography variant="h4" color="text.secondary">
                    {tasks.filter(task => task.status === 'pending').length}
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Tasks
            </Typography>
            {tasksLoading ? (
              <CircularProgress />
            ) : tasks.length === 0 ? (
              <Typography color="text.secondary">
                No tasks found for this user.
              </Typography>
            ) : (
              <Box>
                {tasks.slice(0, 5).map((task) => (
                  <Box key={task._id} sx={{ mb: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1">
                        {task.title}
                      </Typography>
                      <Chip
                        label={task.status}
                        color={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'warning' : 'default'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {task.description}
                    </Typography>
                    <Box display="flex" gap={1} mt={1}>
                      <Chip
                        label={task.priority}
                        color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'success'}
                        size="small"
                      />
                      <Typography variant="caption" color="text.secondary">
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetail;

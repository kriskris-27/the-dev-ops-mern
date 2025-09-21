import React from 'react';
import { 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  Box 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { userApi, taskApi, healthApi } from '../services/api';

const Home: React.FC = () => {
  const { data: healthData } = useQuery('health', healthApi.check);
  const { data: usersData } = useQuery('users-count', userApi.getUsers);
  const { data: tasksData } = useQuery('tasks-count', taskApi.getTasks);

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to MERN DevOps Practice
      </Typography>
      
      <Typography variant="h6" component="p" gutterBottom align="center" color="text.secondary">
        A full-stack application for learning DevOps practices with MongoDB, Express, React, and Node.js
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* System Status */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                System Status
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {healthData?.status || 'Loading...'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Environment: {healthData?.environment || 'Loading...'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Uptime: {healthData?.uptime ? `${Math.floor(healthData.uptime)}s` : 'Loading...'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Users */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Users
              </Typography>
              <Typography variant="h4" component="p" color="primary">
                {usersData?.count || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total registered users
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/users">
                View Users
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Tasks */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Tasks
              </Typography>
              <Typography variant="h4" component="p" color="secondary">
                {tasksData?.count || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total tasks created
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/tasks">
                View Tasks
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              🚀 Modern Tech Stack
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Built with TypeScript, React, Express, and MongoDB
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              🐳 Docker Ready
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Containerized for easy deployment and scaling
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              🔧 DevOps Practices
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Includes CI/CD, monitoring, and best practices
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              📊 Real-time Data
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Live updates and comprehensive data management
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Home;

import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip as MuiTooltip,
  Tabs,
  Tab
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const mockData = {
  summary: {
    totalVariance: 45000,
    significantChanges: [
      {
        account: 'Accounts Receivable',
        variance: 30000,
        percentage: 25,
        trend: 'up',
        explanation: 'Driven by increased sales and improved collections'
      },
      {
        account: 'Payroll Expenses',
        variance: 5000,
        percentage: 6.67,
        trend: 'up',
        explanation: 'New hires and full month allocation'
      },
      {
        account: 'Inventory',
        variance: -10000,
        percentage: -15,
        trend: 'down',
        explanation: 'Reduced stock levels due to improved turnover'
      }
    ]
  },
  trends: {
    monthly: [
      { month: 'Jan', AR: 100000, Payroll: 70000, Inventory: 60000 },
      { month: 'Feb', AR: 120000, Payroll: 75000, Inventory: 55000 },
      { month: 'Mar', AR: 150000, Payroll: 80000, Inventory: 50000 }
    ],
    quarterly: [
      { quarter: 'Q1 2023', AR: 100000, Payroll: 70000, Inventory: 60000 },
      { quarter: 'Q2 2023', AR: 120000, Payroll: 75000, Inventory: 55000 },
      { quarter: 'Q3 2023', AR: 150000, Payroll: 80000, Inventory: 50000 }
    ]
  }
};

const Dashboard = () => {
  const [timePeriod, setTimePeriod] = React.useState('monthly');

  const handleTimePeriodChange = (event, newValue) => {
    setTimePeriod(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography color="text.secondary" gutterBottom>
              Total Revenue
            </Typography>
            <Typography variant="h4">
              $24,000
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              +12% from last month
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography color="text.secondary" gutterBottom>
              Expenses
            </Typography>
            <Typography variant="h4">
              $18,000
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              +8% from last month
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography color="text.secondary" gutterBottom>
              Net Income
            </Typography>
            <Typography variant="h4">
              $6,000
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              +20% from last month
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography color="text.secondary" gutterBottom>
              Cash Flow
            </Typography>
            <Typography variant="h4">
              $4,500
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              +15% from last month
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Activity Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography color="text.secondary">
              No recent activity to display
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Stack,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  AutoFixHigh as AutomationIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Assignment as AssignmentIcon,
  BarChart as ChartIcon,
  SettingsEthernet as IntegrationIcon,
} from '@mui/icons-material';

// Sample GL items with their specific workflows
const glItemWorkflows = {
  cash: {
    name: 'Cash and Cash Equivalents',
    steps: [
      {
        id: 1,
        title: 'Bank Statement Collection',
        description: 'Gather all bank statements and reconciliation reports',
        settings: {
          automate: true,
          notification: true,
          frequency: 'Daily',
          owner: 'Treasury Team',
          systems: ['banking-api', 'sap', 'excel'],
          dependsOn: []
        },
        details: 'This step automatically connects to the banking API to retrieve daily statements for all cash accounts. Data is then formatted and standardized into the cash reconciliation template for analysis.',
        integrations: [
          { name: 'Banking API', type: 'api', logo: '🏦' },
          { name: 'SAP', type: 'erp', logo: '🔄' },
          { name: 'Excel', type: 'file', logo: '📊' }
        ]
      },
      {
        id: 2,
        title: 'Cash Flow Variance',
        description: 'Calculate inflow/outflow variances and identify major movements',
        settings: {
          automate: true,
          notification: false,
          threshold: 10,
          owner: 'Financial Analyst',
          systems: ['tableau', 'power-bi', 'excel'],
          dependsOn: [1]
        },
        details: 'Compares daily, weekly, and monthly cash movements against forecasts and prior periods. Flags variances exceeding 10% threshold for review. Categorizes variances by operational, investing, and financing activities.',
        integrations: [
          { name: 'Tableau', type: 'bi', logo: '📈' },
          { name: 'Power BI', type: 'bi', logo: '📊' },
          { name: 'Excel', type: 'file', logo: '📑' }
        ]
      },
      {
        id: 3,
        title: 'Liquidity Analysis',
        description: 'Assess current and projected liquidity positions',
        settings: {
          automate: true,
          notification: true,
          threshold: 15,
          owner: 'Treasury Manager',
          systems: ['power-bi', 'excel', 'forecasting'],
          dependsOn: [2]
        },
        details: 'Calculates liquidity ratios and compares against targets. Projects cash flows for next 30, 60, and 90 days based on AR/AP aging, planned investments, and debt obligations. Identifies potential shortfalls requiring financing.',
        integrations: [
          { name: 'Power BI', type: 'bi', logo: '📊' },
          { name: 'Excel', type: 'file', logo: '📑' },
          { name: 'Forecasting Tool', type: 'tool', logo: '📅' }
        ]
      },
      {
        id: 4,
        title: 'Commentary Generation',
        description: 'Generate cash position and movement analysis',
        settings: {
          automate: false,
          notification: true,
          owner: 'Financial Analyst',
          systems: ['word', 'sharepoint'],
          dependsOn: [2, 3]
        },
        details: 'Creates detailed narrative explaining major cash movements, liquidity position changes, and recommendations. Includes charts showing trends and projections. Summarizes treasury actions taken or recommended in response to current position.',
        integrations: [
          { name: 'Word', type: 'file', logo: '📝' },
          { name: 'SharePoint', type: 'storage', logo: '☁️' }
        ]
      }
    ]
  },
  receivables: {
    name: 'Accounts Receivable',
    steps: [
      {
        id: 1,
        title: 'Aging Analysis',
        description: 'Review AR aging and identify overdue accounts',
        settings: {
          automate: true,
          notification: true,
          frequency: 'Weekly',
          owner: 'AR Team',
          systems: ['sap', 'crm', 'excel'],
          dependsOn: []
        },
        details: 'Extracts AR aging data from SAP and segments by customer, industry, and payment terms. Identifies accounts >30, >60, and >90 days overdue. Compares current aging profile to historical averages and flags deteriorations.',
        integrations: [
          { name: 'SAP', type: 'erp', logo: '🔄' },
          { name: 'CRM System', type: 'crm', logo: '👥' },
          { name: 'Excel', type: 'file', logo: '📊' }
        ]
      },
      {
        id: 2,
        title: 'Collection Metrics',
        description: 'Calculate DSO and collection efficiency ratios',
        settings: {
          automate: true,
          notification: true,
          threshold: 5,
          owner: 'Financial Analyst',
          systems: ['sap', 'tableau', 'excel'],
          dependsOn: [1]
        },
        details: 'Calculates Days Sales Outstanding, Average Collection Period, Collection Effectiveness Index, and AR Turnover. Performs trend analysis on collection metrics by business unit and customer segment. Highlights metrics exceeding thresholds.',
        integrations: [
          { name: 'SAP', type: 'erp', logo: '🔄' },
          { name: 'Tableau', type: 'bi', logo: '📈' },
          { name: 'Excel', type: 'file', logo: '📊' }
        ]
      },
      {
        id: 3,
        title: 'Bad Debt Assessment',
        description: 'Evaluate potential bad debts and provision requirements',
        settings: {
          automate: false,
          notification: true,
          threshold: 20,
          owner: 'AR Manager',
          systems: ['sap', 'credit-check', 'legal-db'],
          dependsOn: [1, 2]
        },
        details: 'Reviews accounts with severe aging issues and evaluates likelihood of collection. Incorporates credit score changes and payment history. Consults with legal regarding collection options for high-value accounts. Calculates required bad debt provisions based on historical recovery rates.',
        integrations: [
          { name: 'SAP', type: 'erp', logo: '🔄' },
          { name: 'Credit Check', type: 'service', logo: '✓' },
          { name: 'Legal Database', type: 'database', logo: '⚖️' }
        ]
      }
    ]
  },
  inventory: {
    name: 'Inventory',
    steps: [
      {
        id: 1,
        title: 'Stock Level Analysis',
        description: 'Compare inventory levels against targets',
        settings: {
          automate: true,
          notification: true,
          frequency: 'Weekly',
          owner: 'Inventory Control',
          systems: ['erp', 'wms', 'excel'],
          dependsOn: []
        },
        details: 'Downloads current inventory levels from Warehouse Management System by location, category, and SKU. Compares against safety stock levels, max/min targets, and demand forecasts. Identifies stockouts and excess inventory situations requiring action.',
        integrations: [
          { name: 'ERP System', type: 'erp', logo: '🔄' },
          { name: 'WMS', type: 'warehouse', logo: '🏭' },
          { name: 'Excel', type: 'file', logo: '📊' }
        ]
      },
      {
        id: 2,
        title: 'Turnover Calculation',
        description: 'Calculate inventory turnover ratios by category',
        settings: {
          automate: true,
          notification: false,
          threshold: 15,
          owner: 'Financial Analyst',
          systems: ['erp', 'tableau', 'power-bi'],
          dependsOn: [1]
        },
        details: 'Calculates inventory turnover ratio, days inventory outstanding, and GMROI (Gross Margin Return on Inventory) for each product category. Benchmarks against industry standards and historical performance. Identifies slow-moving categories.',
        integrations: [
          { name: 'ERP System', type: 'erp', logo: '🔄' },
          { name: 'Tableau', type: 'bi', logo: '📈' },
          { name: 'Power BI', type: 'bi', logo: '📊' }
        ]
      },
      {
        id: 3,
        title: 'Obsolescence Review',
        description: 'Identify slow-moving and obsolete inventory',
        settings: {
          automate: true,
          notification: true,
          threshold: 25,
          owner: 'Inventory Manager',
          systems: ['erp', 'wms', 'sales-system'],
          dependsOn: [2]
        },
        details: 'Identifies items with no movement in last 180 days. Compares against product lifecycle status and future sales forecasts. Calculates required provision for obsolete inventory based on potential recovery value.',
        integrations: [
          { name: 'ERP System', type: 'erp', logo: '🔄' },
          { name: 'WMS', type: 'warehouse', logo: '🏭' },
          { name: 'Sales System', type: 'sales', logo: '💰' }
        ]
      },
      {
        id: 4,
        title: 'Valuation Assessment',
        description: 'Review inventory valuation and cost variances',
        settings: {
          automate: false,
          notification: true,
          owner: 'Cost Accountant',
          systems: ['erp', 'excel', 'cost-system'],
          dependsOn: [3]
        },
        details: 'Compares standard costs to actual costs and identifies significant variances. Evaluates LCM (Lower of Cost or Market) considerations. Reconciles physical inventory to book values. Investigates discrepancies above threshold.',
        integrations: [
          { name: 'ERP System', type: 'erp', logo: '🔄' },
          { name: 'Excel', type: 'file', logo: '📊' },
          { name: 'Cost System', type: 'finance', logo: '💵' }
        ]
      }
    ]
  }
};

const Workflow = () => {
  const [selectedGLItem, setSelectedGLItem] = useState('cash');
  const [selectedStep, setSelectedStep] = useState(null);

  const currentWorkflow = glItemWorkflows[selectedGLItem];
  const automatedSteps = currentWorkflow.steps.filter(step => step.settings.automate).length;
  const automationRate = Math.round((automatedSteps / currentWorkflow.steps.length) * 100);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        GL Item Workflow Configuration
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Configure and monitor variance analysis workflow for specific GL items
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select GL Item</InputLabel>
              <Select
                value={selectedGLItem}
                label="Select GL Item"
                onChange={(e) => setSelectedGLItem(e.target.value)}
              >
                {Object.entries(glItemWorkflows).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom>
              {currentWorkflow.name} Workflow
            </Typography>

            <Stepper orientation="vertical">
              {currentWorkflow.steps.map((step) => (
                <Step key={step.id} active={true}>
                  <StepLabel>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <Typography variant="subtitle1">{step.title}</Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip 
                          label={step.settings.automate ? 'Automated' : 'Manual'} 
                          size="small" 
                          color={step.settings.automate ? 'success' : 'default'}
                        />
                        {step.settings.notification && (
                          <Chip 
                            label="Notifications" 
                            size="small" 
                            color="primary"
                            icon={<NotificationsIcon fontSize="small" />}
                          />
                        )}
                        <IconButton size="small" onClick={() => setSelectedStep(step.id)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Box>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" sx={{ mb: 1 }}>{step.description}</Typography>
                    
                    <Box sx={{ my: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Details:</Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {step.details}
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12} sm={6}>
                        {step.settings.threshold && (
                          <Box display="flex" alignItems="center" mb={1}>
                            <ChartIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body2">
                              Threshold: {step.settings.threshold}%
                            </Typography>
                          </Box>
                        )}
                        {step.settings.frequency && (
                          <Box display="flex" alignItems="center" mb={1}>
                            <TimeIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body2">
                              Frequency: {step.settings.frequency}
                            </Typography>
                          </Box>
                        )}
                        {step.settings.owner && (
                          <Box display="flex" alignItems="center">
                            <PersonIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body2">
                              Owner: {step.settings.owner}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {step.settings.dependsOn && step.settings.dependsOn.length > 0 && (
                          <Box display="flex" alignItems="flex-start" mb={1}>
                            <AssignmentIcon fontSize="small" sx={{ mr: 1, mt: 0.3, color: 'primary.main' }} />
                            <Typography variant="body2">
                              Dependencies: Steps {step.settings.dependsOn.join(', ')}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                    
                    <Divider sx={{ my: 1.5 }} />
                    
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Integrations:</Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                      {step.integrations.map((integration, index) => (
                        <Tooltip key={index} title={integration.name}>
                          <Chip
                            avatar={<Avatar>{integration.logo}</Avatar>}
                            label={integration.name}
                            variant="outlined"
                            size="small"
                          />
                        </Tooltip>
                      ))}
                    </Stack>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>Workflow Stats</Typography>
            <List>
              <ListItem>
                <ListItemIcon><AutomationIcon /></ListItemIcon>
                <ListItemText 
                  primary="Automation Rate" 
                  secondary={`${automationRate}% of steps automated`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><TimeIcon /></ListItemIcon>
                <ListItemText 
                  primary="Average Processing Time" 
                  secondary={currentWorkflow.steps.length * 0.5 + " hours"}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                <ListItemText 
                  primary="Success Rate" 
                  secondary="95% completion rate"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><IntegrationIcon /></ListItemIcon>
                <ListItemText 
                  primary="Systems Integrated" 
                  secondary={`${Array.from(new Set(currentWorkflow.steps.flatMap(step => 
                    step.settings.systems || []))).length} connected systems`}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Workflow; 
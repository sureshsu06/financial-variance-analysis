import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  Modal,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Help as HelpIcon,
  Chat as ChatIcon,
  ArrowForward as ArrowForwardIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  AccessTime as TimeIcon,
  AutoFixHigh as AutomationIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';

const mockData = {
  balanceSheet: {
    assets: [
      {
        account: "Cash and Cash Equivalents",
        currentMonth: 500000,
        previousMonth: 450000,
        variance: 50000,
        percentageChange: 11.1,
        trend: "up",
        shortComment: "Operating cash flow +$30K, new credit facility +$20K",
        analysisBreakdown: [
          {
            component: "Operating Activities",
            amount: 30000,
            details: [
              "Collection efficiency improvement: +$18,000 (DSO reduced by 5 days, Key accounts paid early: $12,000)",
              "Core business operations: +$12,000 (Strong margins, Favorable payment timing)"
            ]
          },
          {
            component: "Financing Activities",
            amount: 20000,
            details: [
              "New credit facility drawn: +$25,000 (Rate: 4.5%, 50 bps below market)",
              "Regular debt service: -$5,000"
            ]
          }
        ],
        metrics: [
          {
            name: "Current Ratio",
            value: "2.1x",
            change: 0.3
          },
          {
            name: "Days Cash",
            value: "52 days",
            change: 7
          },
          {
            name: "Cash Conversion",
            value: "32 days",
            change: -3
          }
        ],
        recommendations: [
          "Consider deploying excess cash in short-term investments to improve yield",
          "Review credit facility terms for potential refinancing opportunities",
          "Maintain strong collection practices to sustain improved DSO",
          "Evaluate potential for strategic investments or debt reduction"
        ]
      },
      {
        account: "Accounts Receivable",
        currentMonth: 150000,
        previousMonth: 120000,
        variance: 30000,
        percentageChange: 25,
        trend: "up",
        shortComment: "New customers +$12K, seasonal orders +$8K, delayed payments +$10K",
        analysis: `Waterfall Analysis: $120,000 → $150,000 (+$30,000)

Key Movement Factors:
1. New Business (+$12,000):
   • New customer acquisitions: +$8,000
     - 3 major contracts signed
     - Average deal size: $2,667
   • New product lines: +$4,000
     - Space tourism packages
     - Satellite services

2. Existing Customers (+$8,000):
   • Seasonal order increase: +$5,000
     - Holiday season preparation
     - Bulk ordering patterns
   • Regular growth: +$3,000
     - Price adjustments
     - Volume increases

3. Collection Timing (+$10,000):
   • Payment delays: +$15,000
     - 3 major accounts overdue
     - Average delay: 15 days
   • Early payments: -$5,000
     - Discount program impact

Current Aging Profile:
• Current (0-30d): $97,500 (65%)
• 30-60 days: $37,500 (25%)
• 60-90 days: $12,000 (8%)
• >90 days: $3,000 (2%)`,
        recommendations: `1. Implement immediate follow-up on the 3 major delayed accounts
2. Review credit terms for new customers to mitigate risk
3. Consider early payment incentives for accounts >60 days
4. Strengthen collection process for aging accounts
5. Monitor credit limits for rapidly growing customers`,
        analysisBreakdown: [
          {
            component: "New Business",
            amount: 12000,
            details: [
              "New customer acquisitions: +$8,000 (3 major contracts)",
              "New product lines: +$4,000 (Space tourism & Satellite services)"
            ]
          },
          {
            component: "Existing Customers",
            amount: 8000,
            details: [
              "Seasonal order increase: +$5,000 (Holiday preparation)",
              "Regular growth: +$3,000 (Price & volume adjustments)"
            ]
          },
          {
            component: "Collection Timing",
            amount: 10000,
            details: [
              "Payment delays: +$15,000 (3 major accounts, avg 15 days)",
              "Early payments: -$5,000 (Discount program impact)"
            ]
          }
        ],
        metrics: [
          {
            name: "Current (0-30d)",
            value: "$97,500",
            change: 5
          },
          {
            name: "30-60 days",
            value: "$37,500",
            change: -2
          },
          {
            name: "Collection Rate",
            value: "92%",
            change: -3
          }
        ],
        recommendations: [
          "Implement immediate follow-up on the 3 major delayed accounts",
          "Review credit terms for new customers to mitigate risk",
          "Consider early payment incentives for accounts >60 days",
          "Strengthen collection process for aging accounts",
          "Monitor credit limits for rapidly growing customers"
        ]
      },
      {
        account: "Inventory",
        currentMonth: 300000,
        previousMonth: 280000,
        variance: 20000,
        percentageChange: 7.1,
        trend: "up",
        shortComment: "New product launch stock +$10K, safety stock +$5K, bulk purchases +$5K",
        analysisBreakdown: [
          {
            component: "New Product Launch",
            amount: 10000,
            details: [
              "Raw materials: +$6,000 (Component stockpiling, Critical parts)",
              "WIP: +$4,000 (Production ramp-up, Testing materials)"
            ]
          },
          {
            component: "Strategic Stock Changes",
            amount: 5000,
            details: [
              "Safety stock adjustment: +$3,000 (Risk mitigation, Lead time coverage)",
              "Seasonal build-up: +$2,000 (Holiday preparation, Buffer stock)"
            ]
          },
          {
            component: "Procurement Strategy",
            amount: 5000,
            details: [
              "Bulk purchase savings: +$8,000 (Volume discounts, Price lock-in)",
              "Regular depletion: -$3,000 (Normal consumption, Obsolete disposal)"
            ]
          }
        ],
        metrics: [
          {
            name: "DIO",
            value: "45 days",
            change: 3
          },
          {
            name: "Turnover",
            value: "8.1x",
            change: -0.6
          },
          {
            name: "Obsolescence",
            value: "0.8%",
            change: 0
          }
        ],
        recommendations: [
          "Monitor inventory levels against demand forecasts",
          "Review safety stock levels for optimization",
          "Accelerate new product launch timeline",
          "Consider additional bulk purchase opportunities",
          "Implement cycle counting for high-value items"
        ]
      },
      {
        account: "Prepaid Expenses",
        currentMonth: 45000,
        previousMonth: 40000,
        variance: 5000,
        percentageChange: 12.5,
        trend: "up",
        shortComment: "Insurance prepayment +$3K, advance rent +$2K",
        analysisBreakdown: [
          {
            component: "Insurance Prepayments",
            amount: 3000,
            details: [
              "Annual insurance renewal: +$4,500 (Property: $2,500, Liability: $2,000)",
              "Monthly amortization: -$1,500 (Regular expense recognition)"
            ]
          },
          {
            component: "Rent & Services",
            amount: 2000,
            details: [
              "Advance rent payment: +$1,500 (Q3 facility payment)",
              "Service contracts: +$500 (IT maintenance: $300, Security: $200)"
            ]
          }
        ],
        metrics: [
          {
            name: "Prepaid Ratio",
            value: "3.0%",
            change: 0.2
          },
          {
            name: "Avg Amortization",
            value: "$1,500/mo",
            change: 0
          },
          {
            name: "Coverage Period",
            value: "4.2 months",
            change: 0.5
          }
        ],
        recommendations: [
          "Review insurance policy terms for potential consolidation",
          "Consider annual vs quarterly rent payments for better terms",
          "Implement prepayment monitoring system",
          "Evaluate service contract renewal dates",
          "Track amortization schedule compliance"
        ]
      },
      {
        account: "Fixed Assets",
        currentMonth: 850000,
        previousMonth: 800000,
        variance: 50000,
        percentageChange: 6.25,
        trend: "up",
        shortComment: "New equipment +$60K, depreciation -$10K",
        analysisBreakdown: [
          {
            component: "Asset Additions",
            amount: 60000,
            details: [
              "Manufacturing equipment: +$45,000 (Automation: $30K, Quality control: $15K)",
              "Office equipment: +$15,000 (Workstations: $10K, Network: $5K)"
            ]
          },
          {
            component: "Depreciation",
            amount: -10000,
            details: [
              "Equipment depreciation: -$7,000 (10-year straight-line)",
              "Office assets: -$3,000 (5-year depreciation)"
            ]
          }
        ],
        metrics: [
          {
            name: "Equipment Efficiency",
            value: "85%",
            change: 3
          },
          {
            name: "Capacity Usage",
            value: "75%",
            change: 5
          },
          {
            name: "ROA",
            value: "12.5%",
            change: 0.8
          }
        ],
        recommendations: [
          "Schedule preventive maintenance for new equipment",
          "Monitor utilization rates of automation line",
          "Review depreciation policies for optimization",
          "Plan phase 2 of automation project",
          "Evaluate training needs for new systems"
        ]
      },
      {
        account: "Investments",
        currentMonth: 200000,
        previousMonth: 180000,
        variance: 20000,
        percentageChange: 11.1,
        trend: "up",
        shortComment: "New market investments +$15K, fair value adj +$5K",
        analysisBreakdown: [
          {
            component: "New Investments",
            amount: 15000,
            details: [
              "Short-term securities: +$10,000 (T-bills: $6K, Corp bonds: $4K)",
              "Equity positions: +$5,000 (Tech ETFs, Blue-chip stocks)"
            ]
          },
          {
            component: "Value Adjustments",
            amount: 5000,
            details: [
              "Mark-to-market gains: +$3,000",
              "Interest accrual: +$2,000"
            ]
          }
        ],
        metrics: [
          {
            name: "Portfolio Yield",
            value: "4.2%",
            change: 0.3
          },
          {
            name: "Duration",
            value: "2.5 years",
            change: 0.2
          },
          {
            name: "Risk Rating",
            value: "Moderate",
            change: 0
          }
        ],
        recommendations: [
          "Review investment allocation strategy",
          "Consider increasing fixed income exposure",
          "Monitor market conditions for rebalancing",
          "Evaluate new investment opportunities",
          "Update investment policy guidelines"
        ]
      }
    ],
    liabilities: [
      {
        account: "Accounts Payable",
        currentMonth: 200000,
        previousMonth: 180000,
        variance: 20000,
        percentageChange: 11.1,
        trend: "up",
        shortComment: "Inventory purchases +$12K, OpEx +$5K, CapEx +$3K",
        analysisBreakdown: [
          {
            component: "Purchase Categories",
            amount: 20000,
            details: [
              "Inventory purchases: +$12,000 (Raw materials, Finished goods)",
              "Operating expenses: +$5,000 (Supplies, Services)",
              "Capital expenditures: +$3,000 (Equipment, Infrastructure)"
            ]
          },
          {
            component: "Payment Terms",
            amount: 0,
            details: [
              "Extended terms negotiated with top 3 suppliers (DPO: 35 → 40 days)",
              "Early payment discounts maintained"
            ]
          }
        ],
        metrics: [
          {
            name: "DPO",
            value: "40 days",
            change: 5
          },
          {
            name: "Early Pay Savings",
            value: "$3,200",
            change: 8
          },
          {
            name: "Vendor Score",
            value: "92%",
            change: -1
          }
        ],
        recommendations: [
          "Review payment terms for optimization opportunities",
          "Evaluate early payment discount benefits",
          "Monitor supplier relationship health",
          "Consider supply chain financing options",
          "Maintain strong communication with key vendors"
        ]
      },
      {
        account: "Short-term Debt",
        currentMonth: 100000,
        previousMonth: 120000,
        variance: -20000,
        percentageChange: -16.7,
        trend: "down",
        shortComment: "Operating cash paydown -$15K, working capital -$5K",
        analysisBreakdown: [
          {
            component: "Debt Reduction",
            amount: -20000,
            details: [
              "Operating cash flow paydown: -$15,000",
              "Working capital optimization: -$5,000"
            ]
          },
          {
            component: "Interest Impact",
            amount: -1200,
            details: [
              "Annual interest savings: -$1,200 (6% rate)",
              "No prepayment penalties incurred"
            ]
          }
        ],
        metrics: [
          {
            name: "Debt/EBITDA",
            value: "1.8x",
            change: -0.3
          },
          {
            name: "Interest Coverage",
            value: "4.5x",
            change: 0.5
          },
          {
            name: "Available Credit",
            value: "$200,000",
            change: 20
          }
        ],
        recommendations: [
          "Continue debt optimization strategy",
          "Monitor market rates for refinancing opportunities",
          "Maintain strong relationship with lenders",
          "Review covenants for potential flexibility",
          "Consider term-out options for remaining balance"
        ]
      },
      {
        account: "Accrued Expenses",
        currentMonth: 75000,
        previousMonth: 65000,
        variance: 10000,
        percentageChange: 15.4,
        trend: "up",
        shortComment: "Payroll accrual +$6K, utilities +$4K",
        analysisBreakdown: [
          {
            component: "Payroll Related",
            amount: 6000,
            details: [
              "Salary accrual: +$4,000 (Performance bonuses, Overtime pay)",
              "Benefits accrual: +$2,000 (Healthcare premiums, 401k matching)"
            ]
          },
          {
            component: "Operating Expenses",
            amount: 4000,
            details: [
              "Utilities: +$2,500 (Power consumption, Water services)",
              "Other services: +$1,500 (Maintenance contracts, Professional fees)"
            ]
          }
        ],
        metrics: [
          {
            name: "Settlement Time",
            value: "15 days",
            change: -2
          },
          {
            name: "Payment Schedule",
            value: "Optimized",
            change: 0
          },
          {
            name: "Cash Flow Impact",
            value: "Managed",
            change: 0
          }
        ],
        recommendations: [
          "Review accrual calculation methodology",
          "Optimize payment scheduling",
          "Monitor cash flow impact",
          "Update accrual policies",
          "Strengthen internal controls"
        ]
      },
      {
        account: "Long-term Debt",
        currentMonth: 400000,
        previousMonth: 420000,
        variance: -20000,
        percentageChange: -4.8,
        trend: "down",
        shortComment: "Principal payments -$25K, new draw +$5K",
        analysisBreakdown: [
          {
            component: "Debt Reduction",
            amount: -25000,
            details: [
              "Term loan payment: -$20,000 (Regular amortization, Extra principal)",
              "Equipment loans: -$5,000 (Monthly payments, Interest savings)"
            ]
          },
          {
            component: "New Borrowing",
            amount: 5000,
            details: [
              "Credit line draw: +$5,000 (Working capital, Seasonal adjustment)"
            ]
          }
        ],
        metrics: [
          {
            name: "Weighted Rate",
            value: "4.8%",
            change: -0.2
          },
          {
            name: "Debt Service Ratio",
            value: "1.8x",
            change: 0.3
          },
          {
            name: "Available Credit",
            value: "$100,000",
            change: 0
          }
        ],
        recommendations: [
          "Continue debt optimization strategy",
          "Monitor market rates for refinancing opportunities",
          "Maintain strong relationship with lenders",
          "Review covenants for potential flexibility",
          "Consider term-out options for remaining balance"
        ]
      }
    ]
  },
  profitAndLoss: {
    revenue: [
      {
        account: "Product Sales",
        currentMonth: 800000,
        previousMonth: 700000,
        variance: 100000,
        percentageChange: 14.3,
        trend: "up",
        shortComment: "Core products +$60K, new launches +$30K, pricing +$10K",
        analysisBreakdown: [
          {
            component: "Revenue Drivers",
            amount: 100000,
            details: [
              "Core product lines: +$60,000 (Volume: +8%, Price: +4%)",
              "New product launches: +$30,000 (3 new SKUs)",
              "Price optimization: +$10,000 (Mix improvement)"
            ]
          },
          {
            component: "Channel Performance",
            amount: 0,
            details: [
              "Direct sales: +18% growth ($450K total)",
              "Distribution: +12% growth ($250K total)",
              "E-commerce: +25% growth ($100K total)"
            ]
          }
        ],
        metrics: [
          {
            name: "Market Share",
            value: "23%",
            change: 2
          },
          {
            name: "Avg Order Value",
            value: "$2,800",
            change: 8
          },
          {
            name: "Customer CAC",
            value: "$350",
            change: -15
          }
        ],
        recommendations: [
          "Accelerate new product launches given success",
          "Expand e-commerce channel investment",
          "Review pricing strategy for mid-range products",
          "Strengthen distributor relationships",
          "Explore cross-selling opportunities"
        ]
      },
      {
        account: "Service Revenue",
        currentMonth: 200000,
        previousMonth: 180000,
        variance: 20000,
        percentageChange: 11.1,
        trend: "up",
        analysis: `Service revenue increase of $20,000 (11.1%) reflects strong performance in service delivery. Analysis shows:

1. Revenue Components:
   - New contracts: $8,000
   - Contract renewals: $7,000
   - Service upgrades: $5,000

2. Service Mix:
   - Maintenance contracts: 45%
   - Professional services: 35%
   - Support packages: 20%

Performance Metrics:
- Customer satisfaction score: 4.8/5.0
- Service delivery on-time rate: 98%
- Contract renewal rate: 92%

Growth Drivers:
- New service offerings launched
- Expanded geographic coverage
- Enhanced service level agreements`,
        recommendations: `1. Expand high-margin service offerings
2. Develop new service packages
3. Implement automated renewal reminders
4. Enhance customer success program
5. Consider service bundling options`
      },
      {
        account: "Subscription Revenue",
        currentMonth: 120000,
        previousMonth: 100000,
        variance: 20000,
        percentageChange: 20,
        trend: "up",
        shortComment: "New subscribers +$15K, upgrades +$5K",
        analysis: `Waterfall Analysis: $100,000 → $120,000 (+$20,000)

Key Movement Factors:
1. Subscriber Growth (+$15,000):
   • New accounts: +$10,000
     - Enterprise: 3 accounts
     - SMB: 25 accounts
   • Expansion: +$5,000
     - User additions
     - Module activation

2. Plan Changes (+$5,000):
   • Tier upgrades: +$3,000
     - Premium features
     - API access
   • Add-ons: +$2,000
     - Storage increase
     - Support packages

Metrics:
• MRR growth: 20%
• Churn rate: 2%
• ARPU: $250`
      },
      {
        account: "Licensing Revenue",
        currentMonth: 80000,
        previousMonth: 70000,
        variance: 10000,
        percentageChange: 14.3,
        trend: "up",
        shortComment: "New licenses +$8K, renewals +$2K",
        analysis: `Waterfall Analysis: $70,000 → $80,000 (+$10,000)

Key Movement Factors:
1. New Licenses (+$8,000):
   • Enterprise deals: +$5,000
     - Manufacturing sector
     - Healthcare clients
   • Standard licenses: +$3,000
     - Small business
     - Educational

2. Renewal Revenue (+$2,000):
   • Maintenance fees: +$1,200
   • Support contracts: +$800

License Metrics:
• Renewal rate: 92%
• ASP: $15,000
• Sales cycle: 45 days`
      }
    ],
    expenses: [
      {
        account: "Cost of Goods Sold",
        currentMonth: 600000,
        previousMonth: 550000,
        variance: 50000,
        percentageChange: 9.1,
        trend: "up",
        shortComment: "Materials +$30K, labor +$15K, overhead +$5K",
        analysisBreakdown: [
          {
            component: "Direct Costs",
            amount: 45000,
            details: [
              "Direct materials: +$30,000 (Raw material costs +3%)",
              "Direct labor: +$15,000 (Overtime, New hires)"
            ]
          },
          {
            component: "Overhead",
            amount: 5000,
            details: [
              "Manufacturing overhead: +$5,000",
              "Process automation benefits: -$3,000"
            ]
          }
        ],
        metrics: [
          {
            name: "Gross Margin",
            value: "25.8%",
            change: 0.6
          },
          {
            name: "Yield Rate",
            value: "94%",
            change: 2
          },
          {
            name: "Labor Efficiency",
            value: "102%",
            change: 2
          }
        ],
        recommendations: [
          "Review supplier contracts for cost optimization",
          "Expand automation initiatives",
          "Implement additional waste reduction measures",
          "Negotiate volume-based discounts",
          "Explore alternative suppliers for key materials"
        ]
      },
      {
        account: "Operating Expenses",
        currentMonth: 250000,
        previousMonth: 230000,
        variance: 20000,
        percentageChange: 8.7,
        trend: "up",
        analysis: `Operating expense increase of $20,000 (8.7%) reflects controlled growth. Breakdown:

1. Expense Categories:
   - Personnel: +$10,000 (planned hires)
   - Marketing: +$5,000 (new campaign)
   - Technology: +$3,000 (software upgrades)
   - Other: +$2,000 (miscellaneous)

2. Efficiency Metrics:
   - OpEx as % of revenue: 18.2% (improved from 18.5%)
   - Cost per employee: -2%
   - Marketing ROI: +15%

Productivity Indicators:
- Employee utilization rate: 85%
- System uptime: 99.9%
- Process automation savings: $3,000`,
        recommendations: `1. Continue process automation initiatives
2. Review subscription-based services
3. Implement zero-based budgeting
4. Optimize marketing spend allocation
5. Evaluate outsourcing opportunities`
      },
      {
        account: "Marketing Expenses",
        currentMonth: 40000,
        previousMonth: 35000,
        variance: 5000,
        percentageChange: 14.3,
        trend: "up",
        shortComment: "Digital campaigns +$3K, events +$2K",
        analysis: `Waterfall Analysis: $35,000 → $40,000 (+$5,000)

Key Movement Factors:
1. Digital Marketing (+$3,000):
   • PPC campaigns: +$2,000
     - Google Ads
     - Social media
   • Content creation: +$1,000
     - Blog posts
     - Video content

2. Event Marketing (+$2,000):
   • Trade shows: +$1,500
     - Booth fees
     - Materials
   • Webinars: +$500
     - Platform costs
     - Speaker fees

ROI Metrics:
• CAC: $250
• ROAS: 3.2x
• Lead conversion: 8%`
      },
      {
        account: "R&D Expenses",
        currentMonth: 60000,
        previousMonth: 50000,
        variance: 10000,
        percentageChange: 20,
        trend: "up",
        shortComment: "New project costs +$7K, equipment +$3K",
        analysis: `Waterfall Analysis: $50,000 → $60,000 (+$10,000)

Key Movement Factors:
1. Project Costs (+$7,000):
   • Personnel costs: +$4,000
     - Engineers
     - Research staff
   • Materials: +$3,000
     - Prototypes
     - Testing supplies

2. Infrastructure (+$3,000):
   • Equipment: +$2,000
     - Test systems
     - Development tools
   • Software: +$1,000
     - Licenses
     - Cloud services

Development Metrics:
• Project completion: 65%
• Patent applications: 2
• Time to market: -15%`
      }
    ]
  }
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 1200,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  p: 4,
  maxHeight: '90vh',
  overflow: 'auto'
};

const defaultWorkflow = {
  steps: [
    {
      id: 1,
      title: 'Data Collection',
      description: 'Gather current and previous month GL data',
      settings: {
        automate: true,
        notification: true,
        frequency: 'daily'
      }
    },
    {
      id: 2,
      title: 'Basic Variance Calculation',
      description: 'Calculate absolute and percentage variances',
      settings: {
        automate: true,
        notification: false,
        threshold: 5
      }
    },
    {
      id: 3,
      title: 'Trend Analysis',
      description: 'Determine trend direction and significance',
      settings: {
        automate: true,
        notification: true,
        threshold: 10
      }
    },
    {
      id: 4,
      title: 'Commentary Generation',
      description: 'Generate initial variance commentary',
      settings: {
        automate: false,
        notification: true,
        requireApproval: true
      }
    },
    {
      id: 5,
      title: 'Review & Approval',
      description: 'Final review by financial analyst',
      settings: {
        automate: false,
        notification: true,
        escalation: true
      }
    }
  ]
};

const WorkflowEditor = ({ account }) => {
  const [workflow, setWorkflow] = useState(defaultWorkflow);
  const [editingStep, setEditingStep] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditStep = (step) => {
    setEditingStep(step);
    setOpenDialog(true);
  };

  const handleSaveStep = (updatedSettings) => {
    setWorkflow(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === editingStep.id 
          ? { ...step, settings: updatedSettings }
          : step
      )
    }));
    setOpenDialog(false);
  };

  const handleAddStep = () => {
    const newStep = {
      id: workflow.steps.length + 1,
      title: 'New Step',
      description: 'Description',
      settings: {
        automate: false,
        notification: false,
        frequency: 'daily'
      }
    };
    setWorkflow(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Variance Analysis Workflow
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Customize how variance analysis is computed for {account.name}
      </Typography>

      <Stepper orientation="vertical">
        {workflow.steps.map((step) => (
          <Step key={step.id} active={true}>
            <StepLabel>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Typography variant="subtitle1">{step.title}</Typography>
                <IconButton size="small" onClick={() => handleEditStep(step)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">{step.description}</Typography>
              <Box sx={{ mt: 1, mb: 2 }}>
                <Chip 
                  label={step.settings.automate ? 'Automated' : 'Manual'} 
                  size="small" 
                  color={step.settings.automate ? 'success' : 'default'}
                  sx={{ mr: 1 }}
                />
                {step.settings.notification && (
                  <Chip 
                    label="Notifications" 
                    size="small" 
                    color="primary" 
                    sx={{ mr: 1 }}
                  />
                )}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      <Button
        startIcon={<AddIcon />}
        onClick={handleAddStep}
        sx={{ mt: 2 }}
      >
        Add Step
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Workflow Step</DialogTitle>
        <DialogContent>
          {editingStep && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Step Title"
                value={editingStep.title}
                onChange={(e) => setEditingStep(prev => ({ ...prev, title: e.target.value }))}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                value={editingStep.description}
                onChange={(e) => setEditingStep(prev => ({ ...prev, description: e.target.value }))}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editingStep.settings.automate}
                    onChange={(e) => setEditingStep(prev => ({
                      ...prev,
                      settings: { ...prev.settings, automate: e.target.checked }
                    }))}
                  />
                }
                label="Automate this step"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editingStep.settings.notification}
                    onChange={(e) => setEditingStep(prev => ({
                      ...prev,
                      settings: { ...prev.settings, notification: e.target.checked }
                    }))}
                  />
                }
                label="Enable notifications"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => handleSaveStep(editingStep.settings)} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const VarianceTable = ({ data, title }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDetailModalOpen(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account</TableCell>
              <TableCell align="right">Current Month</TableCell>
              <TableCell align="right">Previous Month</TableCell>
              <TableCell align="right">Variance</TableCell>
              <TableCell align="right">% Change</TableCell>
              <TableCell align="center">Trend</TableCell>
              <TableCell>Key Changes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow 
                key={row.account}
                hover
                onClick={() => handleRowClick(row)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <TableCell>{row.account}</TableCell>
                <TableCell align="right">{formatCurrency(row.currentMonth)}</TableCell>
                <TableCell align="right">{formatCurrency(row.previousMonth)}</TableCell>
                <TableCell align="right">{formatCurrency(row.variance)}</TableCell>
                <TableCell align="right">{row.percentageChange.toFixed(1)}%</TableCell>
                <TableCell align="center">
                  {row.trend === 'up' ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                    {row.shortComment}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {selectedRow?.account} - Variance Analysis
            </Typography>
            <Chip 
              label={`${selectedRow?.percentageChange.toFixed(1)}%`}
              color={selectedRow?.trend === 'up' ? 'success' : 'error'}
              icon={selectedRow?.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
            />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="subtitle2" color="text.secondary">Previous Month</Typography>
                  <Typography variant="h6">{selectedRow && formatCurrency(selectedRow.previousMonth)}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="subtitle2" color="text.secondary">Current Month</Typography>
                  <Typography variant="h6">{selectedRow && formatCurrency(selectedRow.currentMonth)}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, bgcolor: selectedRow?.trend === 'up' ? 'success.50' : 'error.50' }}>
                  <Typography variant="subtitle2" color="text.secondary">Variance</Typography>
                  <Typography variant="h6" color={selectedRow?.trend === 'up' ? 'success.main' : 'error.main'}>
                    {selectedRow && formatCurrency(selectedRow.variance)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            
            <Typography variant="h6" sx={{ mb: 2 }}>
              Waterfall Analysis
            </Typography>
            
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell width="30%">Component</TableCell>
                    <TableCell width="20%" align="right">Amount</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Starting Balance</TableCell>
                    <TableCell align="right">{selectedRow && formatCurrency(selectedRow.previousMonth)}</TableCell>
                    <TableCell>Previous month balance</TableCell>
                  </TableRow>
                  
                  {/* Dynamic rows based on analysis */}
                  {selectedRow?.analysisBreakdown?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ pl: 3 }}>
                        {item.component}
                      </TableCell>
                      <TableCell align="right" sx={{ color: item.amount >= 0 ? 'success.main' : 'error.main' }}>
                        {formatCurrency(item.amount)}
                      </TableCell>
                      <TableCell>
                        <Box component="ul" sx={{ m: 0, pl: 2 }}>
                          {item.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Ending Balance</TableCell>
                    <TableCell align="right">{selectedRow && formatCurrency(selectedRow.currentMonth)}</TableCell>
                    <TableCell>Current month balance</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Key Metrics
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {selectedRow?.metrics?.map((metric, index) => (
                <Grid item xs={4} key={index}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {metric.name}
                    </Typography>
                    <Typography variant="h6">
                      {metric.value}
                    </Typography>
                    {metric.change && (
                      <Typography variant="body2" color={metric.change >= 0 ? 'success.main' : 'error.main'}>
                        {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Recommendations
            </Typography>
            <List>
              {Array.isArray(selectedRow?.recommendations) 
                ? selectedRow?.recommendations?.map((recommendation, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <ArrowForwardIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={recommendation} />
                    </ListItem>
                  ))
                : selectedRow?.recommendations?.split('\n').map((recommendation, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <ArrowForwardIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={recommendation.replace(/^\d+\.\s/, '')} />
                    </ListItem>
                  ))
              }
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const historicalData = [
  { month: 'Nov 21', value: 2000 },
  { month: 'Dec 21', value: 15000 },
  { month: 'Jan 22', value: 22000 },
  { month: 'Feb 22', value: 20000 },
  { month: 'Mar 22', value: 58000 },
  { month: 'Apr 22', value: 62000 },
  { month: 'May 22', value: 80000 },
  { month: 'Jun 22', value: 110000 },
  { month: 'Jul 22', value: 60000 }
];

const VarianceAnalysis = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedView, setSelectedView] = useState('trends');
  const [workflowView, setWorkflowView] = useState('all');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      {/* Header */}
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between" 
        sx={{ 
          p: 2, 
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#fff'
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h6" sx={{ color: '#1a237e' }}>
            Interstellar Industries
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#666' }}>
            July 2024
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton size="small">
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton size="small">
            <KeyboardArrowRightIcon />
          </IconButton>
          <Chip label="25%" sx={{ ml: 2 }} />
        </Stack>
      </Stack>

      {/* Subheader */}
      <Box sx={{ px: 3, py: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6">
          MoM Income Statement (Consolidated)
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        {/* Tabs */}
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Balance Sheet" />
          <Tab label="Profit & Loss" />
        </Tabs>

        {/* Balance Sheet View */}
        {tabValue === 0 && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Galactic Space Corporation
            </Typography>
            
            <VarianceTable data={mockData.balanceSheet.assets} title="Assets" />
            <VarianceTable data={mockData.balanceSheet.liabilities} title="Liabilities" />

            {/* Add Workflow Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Variance Analysis Workflow
              </Typography>
              
              <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Button 
                    variant={workflowView === 'all' ? 'contained' : 'outlined'}
                    onClick={() => setWorkflowView('all')}
                  >
                    All GL Items
                  </Button>
                  <Button 
                    variant={workflowView === 'assets' ? 'contained' : 'outlined'}
                    onClick={() => setWorkflowView('assets')}
                  >
                    Assets
                  </Button>
                  <Button 
                    variant={workflowView === 'liabilities' ? 'contained' : 'outlined'}
                    onClick={() => setWorkflowView('liabilities')}
                  >
                    Liabilities
                  </Button>
                </Stack>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Stepper orientation="vertical">
                      {defaultWorkflow.steps.map((step) => (
                        <Step key={step.id} active={true}>
                          <StepLabel>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                              <Typography variant="subtitle1">{step.title}</Typography>
                              <Stack direction="row" spacing={1}>
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
                                  />
                                )}
                              </Stack>
                            </Box>
                          </StepLabel>
                          <StepContent>
                            <Typography variant="body2" sx={{ mb: 1 }}>{step.description}</Typography>
                            {step.settings.threshold && (
                              <Typography variant="body2" color="text.secondary">
                                Threshold: {step.settings.threshold}%
                              </Typography>
                            )}
                            {step.settings.frequency && (
                              <Typography variant="body2" color="text.secondary">
                                Frequency: {step.settings.frequency}
                              </Typography>
                            )}
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="h6" gutterBottom>Workflow Stats</Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon><AutomationIcon /></ListItemIcon>
                          <ListItemText 
                            primary="Automation Rate" 
                            secondary="60% of steps automated"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><TimeIcon /></ListItemIcon>
                          <ListItemText 
                            primary="Average Processing Time" 
                            secondary="2.5 hours"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                          <ListItemText 
                            primary="Success Rate" 
                            secondary="95% completion rate"
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Box>

            {/* Graph View */}
            <Box sx={{ mt: 4 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button 
                  variant={selectedView === 'trends' ? 'contained' : 'text'} 
                  size="small"
                  onClick={() => setSelectedView('trends')}
                >
                  Trends
                </Button>
                <Button
                  variant={selectedView === 'transactions' ? 'contained' : 'text'}
                  size="small"
                  onClick={() => setSelectedView('transactions')}
                >
                  Transactions
                </Button>
                <Button
                  variant={selectedView === 'tasks' ? 'contained' : 'text'}
                  size="small"
                  onClick={() => setSelectedView('tasks')}
                >
                  Tasks
                </Button>
              </Stack>
              
              {selectedView === 'trends' && (
                <Box sx={{ height: 300, width: '100%' }}>
                  <LineChart
                    width={800}
                    height={300}
                    data={historicalData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* P&L View */}
        {tabValue === 1 && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Galactic Space Corporation
            </Typography>
            
            <VarianceTable data={mockData.profitAndLoss.revenue} title="Revenue" />
            <VarianceTable data={mockData.profitAndLoss.expenses} title="Expenses" />

            {/* Add Workflow Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Variance Analysis Workflow
              </Typography>
              
              <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Button 
                    variant={workflowView === 'all' ? 'contained' : 'outlined'}
                    onClick={() => setWorkflowView('all')}
                  >
                    All GL Items
                  </Button>
                  <Button 
                    variant={workflowView === 'revenue' ? 'contained' : 'outlined'}
                    onClick={() => setWorkflowView('revenue')}
                  >
                    Revenue
                  </Button>
                  <Button 
                    variant={workflowView === 'expenses' ? 'contained' : 'outlined'}
                    onClick={() => setWorkflowView('expenses')}
                  >
                    Expenses
                  </Button>
                </Stack>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Stepper orientation="vertical">
                      {defaultWorkflow.steps.map((step) => (
                        <Step key={step.id} active={true}>
                          <StepLabel>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                              <Typography variant="subtitle1">{step.title}</Typography>
                              <Stack direction="row" spacing={1}>
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
                                  />
                                )}
                              </Stack>
                            </Box>
                          </StepLabel>
                          <StepContent>
                            <Typography variant="body2" sx={{ mb: 1 }}>{step.description}</Typography>
                            {step.settings.threshold && (
                              <Typography variant="body2" color="text.secondary">
                                Threshold: {step.settings.threshold}%
                              </Typography>
                            )}
                            {step.settings.frequency && (
                              <Typography variant="body2" color="text.secondary">
                                Frequency: {step.settings.frequency}
                              </Typography>
                            )}
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="h6" gutterBottom>Workflow Stats</Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon><AutomationIcon /></ListItemIcon>
                          <ListItemText 
                            primary="Automation Rate" 
                            secondary="60% of steps automated"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><TimeIcon /></ListItemIcon>
                          <ListItemText 
                            primary="Average Processing Time" 
                            secondary="2.5 hours"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                          <ListItemText 
                            primary="Success Rate" 
                            secondary="95% completion rate"
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Box>

            {/* Graph View */}
            <Box sx={{ mt: 4 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button 
                  variant={selectedView === 'trends' ? 'contained' : 'text'} 
                  size="small"
                  onClick={() => setSelectedView('trends')}
                >
                  Trends
                </Button>
                <Button
                  variant={selectedView === 'transactions' ? 'contained' : 'text'}
                  size="small"
                  onClick={() => setSelectedView('transactions')}
                >
                  Transactions
                </Button>
                <Button
                  variant={selectedView === 'tasks' ? 'contained' : 'text'}
                  size="small"
                  onClick={() => setSelectedView('tasks')}
                >
                  Tasks
                </Button>
              </Stack>
              
              {selectedView === 'trends' && (
                <Box sx={{ height: 300, width: '100%' }}>
                  <LineChart
                    width={800}
                    height={300}
                    data={historicalData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VarianceAnalysis; 
# Risepreneur - SaaS OS for Founders

A React + Vite demo web application for a SaaS startup targeting founders in Dhofar & Oman. This is a **prototype for a startup competition**, demonstrating an AI-driven SaaS platform with front-end mocked logic.

## 🚀 Features

### 1. AI Smart Review

- Instant analysis of SaaS ideas
- AI-powered risk assessment and unit economics calculations
- Dhofar/Oman market-specific recommendations
- Calculates CAC, LTV, LTV/CAC ratio, and payback period

### 2. Smart Plan Builder

- Auto-generated SWOT analysis for B2B SaaS in Dhofar
- Business Model Canvas tailored to Oman market
- 3-year financial projections in OMR
- AI tuning feature for plan optimization

### 3. Live SaaS Metrics Dashboard

- Interactive scenario switching (Healthy vs At-Risk)
- Real-time metrics visualization with Recharts
- KPI tracking: MRR, LTV, CAC, LTV/CAC ratio, Churn, Payback Period
- Contextual tooltips with metric formulas
- Insights tailored to Dhofar market conditions

### 4. Mentors & Investor Deck

- Grid of expert mentors focused on GCC/Oman market
- One-click investor deck generator
- Auto-populated slides with current scenario metrics
- Professional pitch deck structure

### 5. Journey Flow Visualization

- Lucidchart-style journey diagram
- Clear progression from Idea → AI Review → Plan → Metrics → Deck

## 🎨 Design

- **Dark, premium aesthetic** aligned with Risepreneur branding
- **Shadcn-inspired components** (clean, rounded corners, subtle shadows)
- **Color Palette**:
  - Background: `#000000`, `#0B0A14`, `#0D0834`
  - Accents: `#0FE2B4` (teal), `#329FBA` (cyan)
  - Text: `#DDDDE3` (main), `#9A9FB5` (muted)
- **Micro-animations** for AI feel (fade-in, scale, hover states)
- **Responsive design** for all screen sizes

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Recharts** - Charts and data visualization
- **Lucide React** - Icon library
- **CSS Modules** - Component styling

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Routes

- `/` - Landing page with hero, features, and CTAs
- `/idea-review` - AI-powered idea analysis form
- `/smart-plan` - SWOT, BMC, and financial projections
- `/metrics` - Interactive metrics dashboard with scenarios
- `/mentors-deck` - Mentors grid and investor deck generator

## 📊 Mock Data & Calculations

All data is **front-end only** using realistic formulas and mock datasets:

### Scenario 1: Successful SaaS (Dhofar B2B)

- **Product**: Maintenance & operations management for hotels, farms, warehouses
- **Metrics**: 6 → 58 customers, MRR 310 → 3,045 OMR, LTV/CAC 3.9x, Churn 2.8%
- **Status**: Healthy growth trajectory

### Scenario 2: At-Risk SaaS (Unfocused)

- **Product**: Generic local experiences booking
- **Metrics**: Fluctuating 15-25 customers, MRR stuck 250-450 OMR, LTV/CAC 1.3x, Churn 16.5%
- **Status**: Needs pivot or cost reduction

### Formulas Used

```javascript
// Customer Acquisition Cost
CAC = Marketing Spend ÷ New Customers

// Lifetime Value
LTV = ARPA × Gross Margin × Average Lifetime (months)

// LTV/CAC Ratio (healthy if ≥ 3)
LTV/CAC = LTV ÷ CAC

// Payback Period (months)
Payback = CAC ÷ Monthly Gross Profit per Customer

// Churn Rate (%)
Churn = (Customers Lost ÷ Total Customers) × 100
```

## 🎯 Key Components

### Layout

- `Header.jsx` - Logo, navigation
- `Footer.jsx` - Minimal footer with prototype label

### Common Components

- `Card.jsx` - Reusable card with hover effects
- `Tag.jsx` - Status tags (success, danger, warning, info)
- `KpiBox.jsx` - Metric display with tooltip support
- `ScenarioStatus.jsx` - Clickable scenario pill
- `Tooltip.jsx` - Hover + click tooltip for formulas
- `JourneyFlow.jsx` - Horizontal journey diagram

### Pages

- `Landing.jsx` - Hero, features, journey flow
- `IdeaReview.jsx` - Form and AI analysis results
- `SmartPlan.jsx` - SWOT, BMC, financial projections
- `MetricsDashboard.jsx` - Scenario switching, charts, KPIs
- `MentorsAndDeck.jsx` - Mentors grid, deck generator modal

## 🔄 Loading States

The app simulates AI processing with realistic loading states:

- "Analyzing unit economics..."
- "Checking SaaS benchmarks in Dhofar..."
- "Re-running Risepreneur insights..."
- "Recalculating forecast..."

All loading states use 800-1500ms delays for realistic feel.

## 💡 Future Integration Points

The codebase is structured to easily integrate real APIs:

1. **Idea Review**: Replace `estimateMetricsFromIdea()` with API call
2. **Smart Plan**: Fetch SWOT/BMC from AI service
3. **Metrics Dashboard**: Connect to real-time analytics backend
4. **Investor Deck**: Generate PDF using backend service
5. **Authentication**: Add user accounts and save state

## 📝 Notes

- All currency is in **OMR (Omani Rial)**
- All references are to **Dhofar & Oman** market
- Prototype labels appear subtly throughout
- Comments in code mark where real APIs would integrate

## 🏆 Competition Ready

This prototype is designed for **jury presentation** with:

- Professional, polished UI
- Smooth animations and transitions
- Realistic data and calculations
- Clear value proposition
- Dhofar/Oman market focus

## 📄 License

This is a prototype for a startup competition demonstration.

---

**Built for Risepreneur Startup Competition** 🚀
# abdullahMuflah

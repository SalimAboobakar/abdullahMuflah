# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open in Browser

Visit: `http://localhost:5173`

---

## 🎯 Demo Flow for Jury

### Recommended Presentation Order:

1. **Landing Page** (`/`)

   - Showcase hero with Risepreneur branding
   - Highlight 4 key features
   - Show journey flow diagram

2. **AI Smart Review** (`/idea-review`)

   - Fill in a sample SaaS idea:
     - Name: "OpsFlow"
     - Target: "Hotels and farms in Salalah"
     - Pricing: 50 OMR
     - Expected customers: 50
     - Operating cost: 1500 OMR
     - Marketing budget: 800 OMR
   - Click "Analyze My Idea"
   - Show AI loading state
   - Review results: CAC, LTV, LTV/CAC ratio, recommendations

3. **Smart Plan** (`/smart-plan`)

   - Show auto-generated SWOT analysis
   - Walk through Business Model Canvas
   - Highlight 3-year financial projections
   - Demo "Apply AI Tuning" button

4. **Metrics Dashboard** (`/metrics`) ⭐ **MOST IMPRESSIVE**

   - Show **Healthy Scenario** first:
     - Point out growing MRR chart
     - Highlight healthy LTV/CAC ratio (3.9x)
     - Note low churn (2.8%)
   - Click scenario toggle to switch to **At-Risk Scenario**:
     - Show loading state
     - Contrast with flat MRR
     - Point out LTV/CAC < 1.5 (red flag)
     - High churn (16.5%)
   - Toggle back to show smooth transitions

5. **Mentors & Investor Deck** (`/mentors-deck`)
   - Show mentor grid with GCC/Oman expertise
   - Click "Generate Investor Deck"
   - Show auto-populated slides with live metrics
   - Highlight dynamic content (Traction, Financial Highlights)

---

## 🎨 Key Demo Points to Emphasize

### 1. AI-Powered Intelligence

- Loading states with realistic messages
- Dynamic calculations based on user input
- Context-aware recommendations for Dhofar/Oman

### 2. Local Market Focus

- All currency in OMR (Omani Rial)
- Dhofar and Oman market references throughout
- Local partnerships (Salalah Chamber, Riyada)

### 3. Professional Design

- Dark, premium aesthetic
- Smooth animations and micro-interactions
- Hover tooltips with formulas
- Responsive across devices

### 4. Realistic Metrics

- Based on actual SaaS benchmarks
- Two contrasting scenarios (healthy vs at-risk)
- Interactive charts with Recharts
- Proper unit economics calculations

### 5. Jury-Ready Features

- Clear prototype labels (subtle, not intrusive)
- Complete user journey (Idea → Review → Plan → Metrics → Deck)
- Professional investor deck generation
- Mentor ecosystem integration

---

## 💡 Talking Points for Jury

### Problem Statement

"Founders in Dhofar lack data-driven tools to validate SaaS ideas and track performance. Most business planning is manual and doesn't account for local market conditions."

### Solution

"Risepreneur is an AI-powered SaaS OS that helps founders in Dhofar & Oman validate ideas, generate strategic plans, and monitor key metrics - all tailored to the local market."

### Differentiation

- **Local Focus**: First platform specifically for Dhofar/Oman SaaS founders
- **AI-Driven**: Automated analysis, planning, and insights
- **Comprehensive**: End-to-end journey from idea to investor pitch
- **Realistic**: Uses proven SaaS metrics and local market data

### Market Opportunity

- 800+ SMEs in Dhofar region
- Expanding to 15,000+ SMEs across Oman
- Growing startup ecosystem with government support (Vision 2040)
- Potential to expand to broader GCC market

### Traction (Demo Scenario)

- 58 customers after 12 months
- 3,045 OMR MRR
- 3.9x LTV/CAC ratio (healthy)
- 2.8% churn (industry-leading)

### Funding Ask

"Seeking 150,000 OMR to accelerate growth in Dhofar and expand to Muscat by Year 2"

---

## 🔧 Technical Highlights

- **React 18** + **Vite** for fast, modern development
- **React Router** for seamless navigation
- **Recharts** for professional data visualization
- **Lucide React** for consistent iconography
- **CSS Modules** for maintainable styling
- **Mock Data Architecture** ready for API integration

---

## 📱 Testing on Different Devices

The app is fully responsive. Test on:

- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

---

## ⚡ Quick Troubleshooting

### Port Already in Use?

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Dependencies Issue?

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build for Production?

```bash
npm run build
npm run preview
```

---

## 🎬 Best Practices for Demo

1. **Start with a fresh browser** (no console errors showing)
2. **Have form data ready** for Idea Review (copy-paste)
3. **Practice scenario toggle** for smooth transition
4. **Emphasize AI loading states** (shows "intelligence")
5. **Point out Dhofar/Oman references** throughout
6. **End with investor deck** (strong closing)

---

**Good luck with the competition! 🏆**

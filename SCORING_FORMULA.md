# EcoGuide Scoring Formula Documentation

## Overview
The EcoGuide scoring system evaluates environmental impact on a scale of 0-100, where **100 is the most eco-friendly** and **0 is the least eco-friendly**. Users start with a perfect score of 100 and lose points for environmentally harmful activities, but can gain bonus points for green behaviors.

---

## Daily Logs Scoring

### Base Formula
```
Final Score = 100 - Transport Penalty - Energy Penalty - Water Penalty + Green Bonuses
```

### Components Breakdown

#### 🚗 Transport (Max Penalty: 50 points)
| Activity | Formula | Points | Reasoning |
|----------|---------|--------|-----------|
| **Car travel** | `car_km × -2` | -2 per km | High carbon emissions from personal vehicles |
| **Public transport** | `public_km × -0.5` | -0.5 per km | Shared carbon footprint, more efficient |
| **Walk/Cycle** | `+10` | +10 bonus | Zero carbon emissions, promotes health |

**Example:**
- Drove 15km: -30 points
- Took bus 5km: -2.5 points
- Walked to store: +10 points
- **Transport subtotal: -22.5 points**

#### ⚡ Energy (Max Penalty: 30 points)
| Activity | Formula | Points | Reasoning |
|----------|---------|--------|-----------|
| **AC usage** | `ac_hours × -3` | -3 per hour | High electricity consumption |
| **Geyser/Water heater** | `-5` if used | -5 flat | Energy-intensive water heating |

**Example:**
- AC for 4 hours: -12 points
- Used geyser: -5 points
- **Energy subtotal: -17 points**

#### 💧 Water (Max Penalty: 20 points)
| Activity | Formula | Points | Reasoning |
|----------|---------|--------|-----------|
| **Long shower** | `-8` if yes | -8 flat | Excessive water waste (>10 min) |
| **Laundry** | `-5` if yes | -5 flat | Water consumption for washing |

**Example:**
- Took long shower: -8 points
- Did laundry: -5 points
- **Water subtotal: -13 points**

### Daily Score Example
```javascript
Base Score: 100

Transport:
  - Car 15km: -30
  - Public 5km: -2.5
  - Walked: +10
  Subtotal: -22.5

Energy:
  - AC 4 hours: -12
  - Geyser: -5
  Subtotal: -17

Water:
  - Long shower: -8
  - Laundry: -5
  Subtotal: -13

Final Score: 100 - 22.5 - 17 - 13 = 47.5 → 48/100
```

---

## Monthly Logs Scoring

### Base Formula
```
Final Score = 100 - Electricity Penalty - Water Penalty - Travel Penalty + Green Bonuses
```

### Components Breakdown

#### ⚡ Electricity (Max Penalty: 30 points)
| Activity | Formula | Points | Reasoning |
|----------|---------|--------|-----------|
| **Standard usage** | `min(units × -0.1, 30)` | -0.1 per kWh | Carbon emissions from grid power |
| **Solar panels** | `+15` | +15 bonus | Renewable energy reduces grid dependency |

**Example:**
- 250 kWh used: -25 points
- Has solar panels: +15 points
- **Electricity subtotal: -10 points**

#### 💧 Water (Max Penalty: 20 points)
| Activity | Formula | Points | Reasoning |
|----------|---------|--------|-----------|
| **Water bill** | `min(bill × -0.05, 20)` | -0.05 per ₹ | Water consumption indicator |
| **Conservation** | `+10` | +10 bonus | Rainwater harvesting, recycling |

**Example:**
- Water bill ₹800: -40 → capped at -20 points
- Has rainwater harvesting: +10 points
- **Water subtotal: -10 points**

#### ✈️ Travel (Max Penalty: 50 points)
| Activity | Formula | Points | Reasoning |
|----------|---------|--------|-----------|
| **Flights** | `flights × -15` | -15 per flight | Massive carbon footprint per flight |
| **Long road trips** | `trips × -5` | -5 per trip | Moderate carbon emissions |

**Example:**
- 2 flights: -30 points
- 3 road trips: -15 points
- **Travel subtotal: -45 points**

### Monthly Score Example
```javascript
Base Score: 100

Electricity:
  - 250 kWh: -25
  - Solar panels: +15
  Subtotal: -10

Water:
  - Bill ₹800: -20 (capped)
  - Rainwater harvesting: +10
  Subtotal: -10

Travel:
  - 2 flights: -30
  - 3 road trips: -15
  Subtotal: -45

Final Score: 100 - 10 - 10 - 45 = 35/100
```

---

## Score Interpretation

| Score Range | Rating | Feedback |
|-------------|--------|----------|
| **80-100** | 🎉 Excellent | Outstanding eco-warrior! Keep up the great work! |
| **60-79** | 👍 Good | Great job! Small improvements can make you perfect! |
| **40-59** | 💡 Fair | Consider walking more, reducing AC, or conserving water |
| **0-39** | 🌱 Needs Work | Let's work together to reduce your environmental impact |

---

## Data Storage Format

### Daily Logs JSON Structure
```json
{
  "username": [
    {
      "date": "2025-12-22",
      "data": {
        "transport": {
          "car": 15,
          "public": 5,
          "walk_cycle": 1
        },
        "energy": {
          "ac": true,
          "ac_hours": 4,
          "geyser": true
        },
        "water": {
          "long_shower": true,
          "laundry": true
        }
      },
      "score": 48,
      "scoreBreakdown": {
        "base": 100,
        "transport": {
          "carKm": 15,
          "carPenalty": -30,
          "publicKm": 5,
          "publicPenalty": -2.5,
          "walkCycle": 1,
          "walkBonus": 10,
          "subtotal": -22.5
        },
        "energy": {
          "acHours": 4,
          "acPenalty": -12,
          "geyser": true,
          "geyserPenalty": -5,
          "subtotal": -17
        },
        "water": {
          "longShower": true,
          "longShowerPenalty": -8,
          "laundry": true,
          "laundryPenalty": -5,
          "subtotal": -13
        }
      },
      "timestamp": "2025-12-22T10:30:00.000Z"
    }
  ]
}
```

### Monthly Logs JSON Structure
```json
{
  "username": [
    {
      "month": "December 2025",
      "data": {
        "electricity": {
          "units": 250,
          "solar": true
        },
        "water": {
          "bill": 800,
          "conservation": true
        },
        "travel": {
          "flights": 2,
          "long_trips": 3
        }
      },
      "score": 35,
      "scoreBreakdown": {
        "base": 100,
        "electricity": {
          "units": 250,
          "penalty": -25,
          "solar": true,
          "solarBonus": 15,
          "subtotal": -10
        },
        "water": {
          "bill": 800,
          "penalty": -20,
          "conservation": true,
          "conservationBonus": 10,
          "subtotal": -10
        },
        "travel": {
          "flights": 2,
          "flightsPenalty": -30,
          "longTrips": 3,
          "tripsPenalty": -15,
          "subtotal": -45
        }
      },
      "timestamp": "2025-12-22T10:30:00.000Z"
    }
  ]
}
```

---

## Implementation Files

### Frontend (Calculation)
- **[public/js/daily-logs.js](public/js/daily-logs.js)** - `calculateEcoScore()` method
- **[public/js/monthly-logs.js](public/js/monthly-logs.js)** - `calculateEcoScore()` method

### Backend (Storage)
- **[src/server.ts](src/server.ts)** - `/api/daily-log` and `/api/monthly-log` endpoints
- **[data/daily-logs.json](data/daily-logs.json)** - Daily tracking data storage
- **[data/monthly-logs.json](data/monthly-logs.json)** - Monthly tracking data storage

---

## Key Features

✅ **Transparent Scoring**: Users can see exactly why they got their score  
✅ **Comprehensive Breakdown**: Every point is tracked by category  
✅ **Penalty Caps**: Prevents unrealistic negative scores  
✅ **Green Bonuses**: Rewards eco-friendly behaviors  
✅ **Historical Tracking**: All scores saved with full breakdowns  
✅ **Console Logging**: Server logs show score components for debugging  

---

## Future Enhancements

- 📊 **Visual Charts**: Display score trends over time
- 🏆 **Achievements**: Unlock badges for eco-milestones
- 📈 **Comparative Analytics**: See how you compare to community average
- 💰 **Carbon Cost**: Convert score to estimated CO₂ emissions
- 🎯 **Smart Suggestions**: AI-powered tips based on your specific habits

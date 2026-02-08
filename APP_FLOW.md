# Hyrect - App Flow & Screenshots Guide

## 📱 Complete User Journey

### Authentication Flow

```
┌─────────────┐
│   SPLASH    │  • Animated logo (H+)
│   SCREEN    │  • App name: Hyrect
└─────┬───────┘  • Tagline
      │          • 2.5s auto-transition
      ↓
┌─────────────┐
│ ONBOARDING  │  Screen 1: Find Your Dream Job
│   3 SLIDES  │  Screen 2: Connect with Professionals
└─────┬───────┘  Screen 3: Grow Your Career
      │          • Pagination dots
      │          • Skip / Next buttons
      ↓
┌─────────────┐
│    ROLE     │  ┌──────────────────┐
│  SELECTION  │  │  Healthcare      │
└─────┬───────┘  │  Professional    │
      │          └──────────────────┘
      │          ┌──────────────────┐
      ├─────────→│  Hospital /      │
      │          │  Recruiter       │
      │          └──────────────────┘
      ↓
┌─────────────┐
│    LOGIN    │  • Email input
│     OR      │  • Password input
│  REGISTER   │  • Social login options
└─────┬───────┘  • Switch between login/register
      │
      ↓
┌─────────────┐
│   MAIN APP  │
└─────────────┘
```

---

## 🏥 Hospital/Recruiter Journey

### Dashboard Layout

```
╔═══════════════════════════════════════╗
║  🎨 GRADIENT HEADER                   ║
║  Welcome back, [Hospital Name]    🔔  ║
╚═══════════════════════════════════════╝

╔════════════╗ ╔════════════╗
║ Active     ║ ║ Total      ║
║ Jobs       ║ ║ Apps       ║
║    12  📈  ║ ║   156  📈  ║
╚════════════╝ ╚════════════╝

╔════════════╗ ╔════════════╗
║ Short-     ║ ║ Inter-     ║
║ listed     ║ ║ views      ║
║    24  📉  ║ ║     8  📈  ║
╚════════════╝ ╚════════════╝

Quick Actions
╔════╗ ╔════╗ ╔════╗ ╔════╗
║ 📝 ║ ║ 📋 ║ ║ 💬 ║ ║ 📊 ║
║Post║ ║Apps║ ║Chat║ ║Data║
╚════╝ ╚════╝ ╚════╝ ╚════╝

Recent Activity
╔═══════════════════════════════════╗
║ ✓ New Application                 ║
║   Dr. Sarah Johnson applied       ║
║   2 hours ago                     ║
╠═══════════════════════════════════╣
║ 📝 Job Posted                     ║
║   ICU Registered Nurse            ║
║   5 hours ago                     ║
╚═══════════════════════════════════╝
```

### Bottom Navigation (Hospital)

```
┌─────┬─────┬─────┬─────┬─────┐
│  🏠 │  💼 │  📋 │  💬 │  👤 │
│Dash │Jobs │Apps │Chat │Prof │
└─────┴─────┴─────┴─────┴─────┘
```

---

## 👨‍⚕️ Healthcare Professional Journey

### Dashboard Layout

```
╔═══════════════════════════════════════╗
║  🎨 GRADIENT HEADER                   ║
║  Hello, [Professional Name]   🔍  🔔  ║
╚═══════════════════════════════════════╝

Profile Completion
╔═══════════════════════════════════════╗
║ 👤 Complete Your Profile              ║
║ 85% complete • Stand out to employers ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░                 ║
║             [Complete Now →]          ║
╚═══════════════════════════════════════╝

Your Activity
╔══════╗ ╔══════╗ ╔══════╗ ╔══════╗
║  📋  ║ ║  ❤️  ║ ║  ✓   ║ ║  📅  ║
║  5   ║ ║  8   ║ ║  2   ║ ║  1   ║
║Applied║║Saved ║ ║Short║ ║Inter║
╚══════╝ ╚══════╝ ╚══════╝ ╚══════╝

Recommended for You
╔═══════════════════════════════════════╗
║ 🏥 City General Hospital          ❤️  ║
║ Senior Cardiologist                   ║
║ 📍 New York, NY                       ║
║ 💼 Doctor  ⏰ Day  📅 Full-time       ║
║                                       ║
║ 💰 $150k - $250k/year      ⭐ Featured║
╚═══════════════════════════════════════╝

Quick Actions
╔══════════════╗ ╔══════════════╗
║      ❤️      ║ ║      💼      ║
║ Saved Jobs   ║ ║      My      ║
║   8 jobs     ║ ║ Applications ║
╚══════════════╝ ╚══════════════╝
```

### Bottom Navigation (Professional)

```
┌─────┬─────┬─────┬─────┬─────┐
│  🏠 │  🔍 │  ❤️ │  📋 │  👤 │
│Home │Find │Saved│Apps │Prof │
└─────┴─────┴─────┴─────┴─────┘
```

---

## 💼 Job Detail Screen Flow

### Parallax Header

```
╔═══════════════════════════════════════╗
║         [Scrolls with parallax]       ║
║                                       ║
║            🏥 [Logo]                  ║
║                                       ║
║         Senior Cardiologist           ║
║      City General Hospital            ║
║         📍 New York, NY               ║
║                                       ║
╚═══════════════════════════════════════╝
        ↓ Scroll down ↓
╔═══════════════════════════════════════╗
║ [Header fades as you scroll]          ║
╚═══════════════════════════════════════╝
```

### Content Sections

```
Job Information
╔════════════╗ ╔════════════╗
║ 💰 Salary  ║ ║ 💼 Position║
║ $150k-250k ║ ║   Doctor   ║
╚════════════╝ ╚════════════╝

╔════════════╗ ╔════════════╗
║ ⏰ Shift   ║ ║ 📅 Type    ║
║    Day     ║ ║ Full-time  ║
╚════════════╝ ╚════════════╝

About the Job
╔═══════════════════════════════════════╗
║ We are seeking an experienced         ║
║ cardiologist to join our growing...   ║
╚═══════════════════════════════════════╝

Requirements
╔═══════════════════════════════════════╗
║ ✓ MD degree with specialization       ║
║ ✓ Board certification                 ║
║ ✓ 5+ years experience                 ║
╚═══════════════════════════════════════╝

Benefits
╔══════════╗ ╔══════════╗ ╔══════════╗
║✓ Health  ║ ║✓ Dental  ║ ║✓ 401k    ║
╚══════════╝ ╚══════════╝ ╚══════════╝

Bottom Action Bar
╔════╦══════════════════════════════════╗
║ ❤️ ║        [Apply Now →]             ║
╚════╩══════════════════════════════════╝
```

---

## 🎨 Component Showcase

### Button Variants

```
┌─────────────────┐
│   Primary 🎨    │  Gradient background
└─────────────────┘

┌─────────────────┐
│  Secondary 🔷   │  Solid color
└─────────────────┘

┌─────────────────┐
│   Outline 🔳    │  Border only
└─────────────────┘

┌─────────────────┐
│    Ghost 👻     │  Transparent
└─────────────────┘
```

### Input Fields

```
Email
╔═══════════════════════════════════════╗
║ 📧  user@example.com                  ║
╚═══════════════════════════════════════╝

Password
╔═══════════════════════════════════════╗
║ 🔒  ••••••••••••                  👁  ║
╚═══════════════════════════════════════╝
        Focus animation shows blue border
```

### Cards

```
Standard Card
╔═══════════════════════════════════════╗
║ Content goes here                     ║
║ • Rounded corners                     ║
║ • Drop shadow                         ║
║ • White background                    ║
╚═══════════════════════════════════════╝

Gradient Card
╔═══════════════════════════════════════╗
║ 🎨 Gradient background                ║
║ White text                            ║
║ Elevated appearance                   ║
╚═══════════════════════════════════════╝
```

---

## 🎬 Animation Highlights

### Entry Animations

```
Component appears with:
├─ FadeInDown (most common)
├─ FadeIn (subtle)
├─ Scale (dramatic)
└─ Spring physics
```

### Interaction Animations

```
Button Press:
Normal → Pressed (0.95x) → Released (1.0x)
   ↓         ↓                 ↓
 Spring animation with natural bounce
```

### Loading States

```
Skeleton Loader:
▓▓▓▓▓░░░░░  →  ░░░░░▓▓▓▓▓
Opacity pulse (0.3 → 1.0 → 0.3)
```

---

## 🎯 Key User Actions

### Professional: Apply for Job

```
1. Browse jobs on dashboard
   ↓
2. Tap job card to view details
   ↓
3. Review job information
   ↓
4. Tap "Apply Now"
   ↓
5. Loading animation (1.5s)
   ↓
6. Success! Return to dashboard
```

### Hospital: Review Application

```
1. See new application in activity feed
   ↓
2. Navigate to Applications tab
   ↓
3. View applicant details
   ↓
4. Take action (shortlist/reject/interview)
   ↓
5. Update reflected in stats
```

---

## 📊 Data Flow

### Redux State Structure

```
store/
├─ auth/
│  ├─ isAuthenticated
│  ├─ user
│  └─ userRole
├─ job/
│  ├─ jobs[]
│  ├─ savedJobs[]
│  ├─ filters{}
│  └─ selectedJob
└─ application/
   ├─ applications[]
   ├─ userApplications[]
   └─ selectedApplication
```

---

## 🎨 Color System

### Primary Palette

```
Primary:   ████ #00B4D8 (Bright Blue)
Secondary: ████ #48CAE4 (Light Blue)
Accent:    ████ #023E8A (Deep Blue)
```

### Status Colors

```
Success:   ████ #06D6A0 (Green)
Warning:   ████ #FFB703 (Orange)
Error:     ████ #EF476F (Red)
Info:      ████ #118AB2 (Blue)
```

---

## 📱 Responsive Design

### Layouts Adapt To:

- iPhone SE (small)
- iPhone 13/14 (standard)
- iPhone 14 Pro Max (large)
- iPad (tablet)
- Android phones (various sizes)

### Safe Areas:

- Top notch
- Bottom home indicator
- Curved edges
- Camera cutouts

---

## ✨ Polish Details

### Micro-interactions

- Button press feedback
- Card hover effects
- Tab bar animations
- Badge notifications
- Icon state changes

### Haptic Feedback (Ready)

- Button presses
- Toggle switches
- Success actions
- Error feedback

### Performance

- 60fps animations
- Smooth scrolling
- Instant responses
- Optimized renders

---

This visual guide shows the complete user experience and how all components work together to create a polished, professional healthcare recruitment app!

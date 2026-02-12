# Fullscreen Experiences - Website Customization Guide

## 📁 Project Structure

### Pages Overview

```
src/pages/
├── Index.tsx          # Homepage - Main landing page
├── About.tsx          # About Us page - Company story, values, team
├── Services.tsx       # Services page - What you offer
├── Portfolio.tsx      # Portfolio page - Project showcase
├── Experiences.tsx    # Experiences page - Experience categories
├── Technology.tsx     # Technology page - Tech stack showcase
├── Clients.tsx        # Clients page - Client testimonials & logos
├── Contact.tsx        # Contact page - Contact form & info
└── NotFound.tsx       # 404 Error page
```

### Components Structure

```
src/components/
│
├── Navigation.tsx        # Main navbar (desktop + mobile)
├── Footer.tsx            # Site footer
├── CustomCursor.tsx      # Custom cursor effect
├── Hero.tsx              # Homepage hero section
├── Experiences.tsx       # Homepage experiences preview
├── Showreel.tsx          # Homepage video showreel
├── Projects.tsx          # Homepage projects slider
├── Process.tsx           # Homepage process steps
├── Testimonials.tsx      # Homepage testimonials
├── Contact.tsx           # Homepage contact form
│
├── about/
│   ├── AboutHero.tsx     # About page hero
│   ├── BrandManifesto.tsx # Brand story section
│   ├── Timeline.tsx      # Company history timeline
│   ├── Values.tsx        # Company values
│   └── Team.tsx          # Team members section
│
├── services/
│   ├── ServicesHero.tsx  # Services page hero
│   ├── ServicesGrid.tsx  # Services cards grid
│   ├── ServiceCard.tsx   # Individual service card
│   ├── ServiceModal.tsx  # Service detail modal
│   └── ServicesCTA.tsx   # Call-to-action section
│
├── portfolio/
│   ├── PortfolioHero.tsx # Portfolio page hero
│   ├── PortfolioGrid.tsx # Project grid with modal
│   ├── PortfolioSlider.tsx # Horizontal project slider
│   └── CategoryFilter.tsx # Category filter buttons
│
├── experiences/
│   ├── ExperiencesHero.tsx # Experiences page hero
│   ├── ExperienceCategory.tsx # Category sections
│   └── HorizontalScroller.tsx # Horizontal scroll section
│
├── technology/
│   ├── TechnologyHero.tsx # Technology page hero
│   ├── TechStack.tsx     # Technology cards grid
│   └── TechShowcase.tsx  # Tech showcase slider
│
├── clients/
│   ├── ClientsHero.tsx   # Clients page hero
│   ├── LogoMarquee.tsx   # Scrolling brand logos
│   ├── ClientGrid.tsx    # Client cards grid
│   └── TestimonialSlider.tsx # Testimonial carousel
│
├── contact/
│   ├── ContactHero.tsx   # Contact page hero
│   └── ContactForm.tsx   # Contact form component
│
├── 3d/                   # 3D scene components
│   ├── AboutScene.tsx
│   ├── FloatingShapes.tsx
│   └── ServiceScene.tsx
│
└── ui/                   # Shadcn UI components
    └── [various UI components]
```

---

## 🎨 LOGO CUSTOMIZATION

### Current Logo Location
The logo is currently a **text-based logo** in the Navigation component.

### To Replace with Your Own Logo:

1. **Prepare your logo:**
   - Recommended format: SVG (for best quality) or PNG with transparency
   - Recommended size: 150-200px width, auto height
   - Save as: `logo.svg` or `logo.png`

2. **Upload your logo:**
   - Place your logo file in: `src/assets/` folder
   - Example: `src/assets/logo.svg`

3. **Edit Navigation.tsx:**
   
   Open `src/components/Navigation.tsx` and find this section (around line 68-72):
   ```tsx
   {/* Replace this text logo with your image logo */}
   <span className="text-2xl font-display font-bold text-gradient">
     Fullscreen Experiences
   </span>
   ```

   **Replace with:**
   ```tsx
   import logo from '@/assets/logo.svg';
   
   {/* Your image logo */}
   <img 
     src={logo} 
     alt="Fullscreen Experiences" 
     className="h-8 md:h-10 w-auto"
   />
   ```

4. **Edit Footer.tsx:**
   
   Open `src/components/Footer.tsx` and find similar text logo around line 45-47:
   ```tsx
   <span className="text-2xl font-display font-bold text-gradient">
     Fullscreen Experiences
   </span>
   ```
   
   Replace with the same image import as above.

---

## 🖼️ IMAGES & VIDEOS TO ADD

### Homepage (`src/components/`)

#### 1. Hero Section (`Hero.tsx`)
**No image slots** - Uses animated gradients and effects

#### 2. Experiences Section (`Experiences.tsx`)
**Lines 8-45** - Experience cards array
```tsx
const experiences = [
  {
    // ADD: image: '/images/experiences/gaming-zones.jpg',
    title: 'Gaming Zones',
    ...
  },
  // Repeat for each experience
];
```
**Images needed:** 6 experience category images (recommended: 600x400px)

#### 3. Showreel Section (`Showreel.tsx`)
**Line ~85** - Video placeholder
```tsx
{/* ADD YOUR SHOWREEL VIDEO HERE */}
<video 
  src="/videos/showreel.mp4"
  autoPlay 
  muted 
  loop 
  playsInline
  className="w-full h-full object-cover"
/>
```
**Video needed:** 1 showreel video (recommended: 1920x1080, MP4, under 50MB)

#### 4. Projects Section (`Projects.tsx`)
**Lines 9-65** - Projects array
```tsx
const projects = [
  {
    // REPLACE: image: '/images/projects/project-1.jpg',
    image: 'https://images.unsplash.com/...',  // ← Replace this
    title: 'Brand Experience Hub',
    ...
  },
];
```
**Images needed:** 6+ project images (recommended: 800x600px or 16:9 ratio)

#### 5. Testimonials Section (`Testimonials.tsx`)
**Lines 11-35** - Testimonials array
```tsx
const testimonials = [
  {
    // ADD: avatar: '/images/clients/avatar-1.jpg',
    quote: "...",
    author: "Sarah Chen",
    ...
  },
];
```
**Images needed:** Client avatar photos (recommended: 100x100px, circular)

---

### About Page (`src/components/about/`)

#### 1. Team Section (`Team.tsx`)
**Lines 4-23** - Team members array
```tsx
const teamMembers = [
  {
    name: 'Alex Rivera',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/...', // ← Replace with actual team photo
    bio: '...'
  },
];
```
**Images needed:** Team member photos (recommended: 400x500px, portrait orientation)

#### 2. Timeline Section (`Timeline.tsx`)
**Lines 6-49** - Timeline events
Currently no images, but you can add milestone images if desired.

---

### Portfolio Page (`src/components/portfolio/`)

#### 1. Portfolio Grid (`PortfolioGrid.tsx`)
**Lines 4-70** - Projects array
```tsx
const projects = [
  {
    id: 1,
    title: 'Nike Air Max Launch',
    category: 'ar-vr',
    image: 'https://images.unsplash.com/...', // ← Replace
    ...
  },
];
```
**Images needed:** 8+ portfolio project images (recommended: 800x600px)

#### 2. Portfolio Slider (`PortfolioSlider.tsx`)
**Lines 4-40** - Featured projects array
```tsx
const featuredProjects = [
  {
    title: 'Samsung Galaxy Experience',
    image: 'https://images.unsplash.com/...', // ← Replace
    ...
  },
];
```
**Images needed:** 5+ featured project images (recommended: 1200x800px, high quality)

---

### Technology Page (`src/components/technology/`)

#### 1. Tech Stack (`TechStack.tsx`)
Currently uses icons only. To add images:
```tsx
const technologies = [
  {
    // ADD: image: '/images/tech/unity-logo.png',
    icon: Cpu,
    title: 'Unity Engine',
    ...
  },
];
```
**Images needed (optional):** Technology/tool logos (recommended: 200x200px, PNG with transparency)

#### 2. Tech Showcase (`TechShowcase.tsx`)
**Lines 4-35** - Showcase items
```tsx
const showcaseItems = [
  {
    // ADD: image: '/images/tech/ar-demo.jpg',
    // ADD: video: '/videos/tech/ar-demo.mp4',
    title: 'Augmented Reality',
    ...
  },
];
```
**Images/Videos needed:** Tech demo visuals (recommended: 800x600px images or short video clips)

---

### Clients Page (`src/components/clients/`)

#### 1. Logo Marquee (`LogoMarquee.tsx`)
**Lines 3-6** - Brand names (currently text-only)
```tsx
const brands = ['Nike', 'Samsung', 'Google', ...];
```

**To add actual logos:**
```tsx
const brands = [
  { name: 'Nike', logo: '/images/clients/nike-logo.svg' },
  { name: 'Samsung', logo: '/images/clients/samsung-logo.svg' },
  ...
];
```
**Images needed:** Client/brand logos (recommended: SVG or 200x100px PNG with transparency)

#### 2. Client Grid (`ClientGrid.tsx`)
**Lines 4-17** - Clients array
```tsx
const clients = [
  {
    // ADD: logo: '/images/clients/nike-logo.svg',
    name: 'Nike',
    industry: 'Sports & Lifestyle',
    ...
  },
];
```

#### 3. Testimonial Slider (`TestimonialSlider.tsx`)
**Lines 4-35** - Testimonials array
```tsx
const testimonials = [
  {
    // ADD: avatar: '/images/testimonials/avatar-1.jpg',
    // ADD: companyLogo: '/images/clients/techcorp-logo.svg',
    quote: '...',
    author: 'Sarah Chen',
    ...
  },
];
```
**Images needed:** Client avatars and company logos

---

## ✏️ COMPANY INFORMATION TO EDIT

### 1. Company Name
**Files to edit:**
- `src/components/Navigation.tsx` - Line ~70: `"Fullscreen Experiences"`
- `src/components/Footer.tsx` - Line ~47: `"Fullscreen Experiences"`
- `src/components/Hero.tsx` - Any brand mentions
- `src/components/about/BrandManifesto.tsx` - Line ~35
- `src/components/contact/ContactForm.tsx` - Any mentions
- `index.html` - Line 5: `<title>` tag

### 2. Contact Information
**File:** `src/components/Contact.tsx` (Homepage)
**Lines ~20-35:**
```tsx
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'pratikbindworks@gmail.com', // ← Edit
    href: 'mailto:pratikbindworks@gmail.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567', // ← Edit
    href: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Los Angeles, CA', // ← Edit
  },
];
```

**File:** `src/components/Footer.tsx`
**Lines ~80-100:** Update email, phone, address

**File:** `src/components/contact/ContactForm.tsx`
Update any contact details shown on the Contact page.

### 3. Social Media Links
**File:** `src/components/Footer.tsx`
**Lines ~55-75:**
```tsx
const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/yourcompany' }, // ← Edit
  { icon: Twitter, href: 'https://twitter.com/yourcompany' },
  { icon: Linkedin, href: 'https://linkedin.com/company/yourcompany' },
  { icon: Youtube, href: 'https://youtube.com/@yourcompany' },
];
```

### 4. Services Offered
**File:** `src/components/services/ServicesGrid.tsx`
**Lines ~5-80:** Edit the `services` array with your actual services:
```tsx
const services = [
  {
    title: 'Your Service Name',
    description: 'Your service description...',
    icon: IconName,
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
];
```

### 5. Company Stats
**File:** `src/components/Hero.tsx` - Lines ~150-165
**File:** `src/pages/Portfolio.tsx` - Lines ~38-43
```tsx
{ value: '500+', label: 'Events' },      // ← Edit numbers
{ value: '10M+', label: 'Impressions' },
{ value: '200+', label: 'Brands' },
{ value: '50+', label: 'Cities' },
```

### 6. About Page Content
**File:** `src/components/about/BrandManifesto.tsx`
- Edit company story and manifesto text

**File:** `src/components/about/Timeline.tsx`
- Edit company history milestones

**File:** `src/components/about/Values.tsx`
- Edit company values

**File:** `src/components/about/Team.tsx`
- Edit team member information

### 7. SEO & Meta Information
**File:** `index.html`
```html
<title>Fullscreen Experiences | Experiential Events & Creative Tech</title>
<meta name="description" content="Your company description..." />
```

---

## 📂 Recommended Folder Structure for Assets

```
public/
├── images/
│   ├── projects/
│   │   ├── project-1.jpg
│   │   ├── project-2.jpg
│   │   └── ...
│   ├── team/
│   │   ├── member-1.jpg
│   │   └── ...
│   ├── clients/
│   │   ├── nike-logo.svg
│   │   ├── samsung-logo.svg
│   │   └── ...
│   ├── experiences/
│   │   └── ...
│   └── tech/
│       └── ...
├── videos/
│   ├── showreel.mp4
│   └── ...
└── ...

src/assets/
├── logo.svg          # Main logo
├── logo-white.svg    # White version for dark backgrounds
└── favicon.ico       # Browser tab icon
```

---

## 🚀 Quick Start Checklist

- [ ] Replace logo in Navigation and Footer
- [ ] Update company name everywhere
- [ ] Add contact email, phone, address
- [ ] Update social media links
- [ ] Add showreel video
- [ ] Replace project images (Portfolio, Homepage)
- [ ] Add team member photos
- [ ] Update services list
- [ ] Edit company stats
- [ ] Add client logos
- [ ] Update SEO meta tags in index.html

---

## 💡 Tips

1. **Image Optimization:** Compress images before uploading (use TinyPNG or similar)
2. **Video Optimization:** Keep videos under 50MB, use MP4 format with H.264 codec
3. **Logo Format:** SVG is best for logos (scales perfectly at any size)
4. **Consistency:** Use consistent image aspect ratios within each section
5. **Alt Text:** Add descriptive alt text for accessibility

---

*Last updated: January 2026*

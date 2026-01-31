# Design Document: The Pawlour Website

## Overview

The Pawlour Website is a conversion-focused Next.js application designed to showcase a premium pet grooming salon and drive bookings through WhatsApp integration. The design emphasizes trust-building, clear service presentation, and seamless mobile experience with a boutique aesthetic.

The application follows a simple four-page structure optimized for conversion: Home (conversion hub) → About (trust building) → Services (clarity) → Contact (action). Every design decision supports the primary goal of getting visitors to trust The Pawlour and book via WhatsApp.

## Architecture

### Technology Stack

**Frontend Framework:** Next.js 14 with App Router
- Static rendering for optimal performance
- Built-in image optimization
- SEO-friendly server-side rendering

**Styling:** Tailwind CSS
- Utility-first approach for rapid development
- Built-in responsive design utilities
- Custom color palette integration

**Deployment:** Static export compatible
- Can be deployed to any static hosting service
- Optimized for performance and SEO
- Enhanced security

### Project Structure

```
app/
├── layout.tsx              # Root layout with global styles
├── page.tsx               # Home page (conversion hub)
├── about/
│   └── page.tsx          # About page (trust building)
├── services/
│   └── page.tsx          # Services page (pricing clarity)
├── contact/
│   └── page.tsx          # Contact page (booking action)
└── globals.css           # Global styles and Tailwind imports

components/
├── layout/
│   ├── Navbar.tsx        # Sticky header navigation
│   ├── Footer.tsx        # Desktop footer
│   └── MobileFooter.tsx  # Sticky mobile WhatsApp footer
├── ui/
│   ├── WhatsAppButton.tsx    # Reusable WhatsApp CTA
│   ├── ServiceCard.tsx       # Service preview cards
│   ├── TrustSignalCard.tsx   # Trust building elements
│   └── TestimonialCard.tsx   # Customer testimonial display
└── forms/
    └── BookingForm.tsx   # Contact form with WhatsApp integration

public/
├── images/
│   ├── hero/             # Hero section images
│   ├── services/         # Service-related images
│   └── salon/           # Salon photos
└── icons/               # Social media and UI icons
```

## Components and Interfaces

### Core Layout Components

**Navbar Component**
```typescript
interface NavbarProps {
  currentPage?: string;
}

// Features:
// - Sticky positioning
// - Logo with home link
// - Navigation menu (Services, About, Contact)
// - Prominent WhatsApp button
// - Mobile hamburger menu
// - Smooth scroll to sections
```

**MobileFooter Component**
```typescript
interface MobileFooterProps {
  isVisible: boolean;
}

// Features:
// - Sticky bottom positioning on mobile only
// - "Book on WhatsApp" CTA button
// - Slides up/down based on scroll direction
// - High z-index to stay above content
```

### Content Components

**ServiceCard Component**
```typescript
interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href?: string;
  isPreview?: boolean;
}

// Features:
// - Hover effects and animations
// - Optional navigation link
// - Responsive image handling
// - Consistent styling across service types
```

**TrustSignalCard Component**
```typescript
interface TrustSignalCardProps {
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}

// Features:
// - Icon display (cage-free, certification, premium)
// - Consistent card styling
// - Optional highlighting for key signals
```

**WhatsAppButton Component**
```typescript
interface WhatsAppButtonProps {
  message?: string;
  phoneNumber: string;
  variant: 'primary' | 'secondary' | 'mobile';
  size?: 'sm' | 'md' | 'lg';
}

// Features:
// - Pre-filled message generation
// - Multiple visual variants
// - Phone number formatting
// - Analytics tracking ready
```

### Form Components

**BookingForm Component**
```typescript
interface BookingFormData {
  name: string;
  petBreed: string;
  preferredDate: string;
}

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
}

// Features:
// - Form validation
// - Date picker integration
// - WhatsApp message generation
// - Error handling and user feedback
```

## Data Models

### Business Information

```typescript
interface BusinessInfo {
  name: string;
  phone: string;
  whatsappNumber: string;
  address: {
    street: string;
    postal: string;
    area: string;
  };
  hours: {
    [day: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    google?: string;
  };
}
```

### Service Definitions

```typescript
interface Service {
  id: string;
  name: string;
  category: 'basic' | 'full' | 'spa' | 'addon';
  description: string;
  pricing: {
    small?: number;
    medium?: number;
    large?: number;
    fixed?: number;
  };
  duration: number; // minutes
  features: string[];
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];
}
```

### Content Models

```typescript
interface PageContent {
  hero: {
    headline: string;
    subtext: string;
    imageUrl: string;
    ctaText: string;
  };
  sections: ContentSection[];
}

interface ContentSection {
  id: string;
  type: 'trust-signals' | 'services' | 'about' | 'cta';
  title?: string;
  content: any; // Flexible content based on section type
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, here are the testable correctness properties:

### Property 1: Consistent Header Presence
*For any* page in the website, the sticky header should contain logo, navigation links, and WhatsApp button elements
**Validates: Requirements 1.2**

### Property 2: Mobile Footer Consistency
*For any* page viewed on mobile viewport, the sticky footer with "Book on WhatsApp" button should be present and properly positioned
**Validates: Requirements 1.3, 7.2**

### Property 3: Navigation Consistency
*For any* page in the website, the navigation structure and styling should be identical across all pages
**Validates: Requirements 1.4**

### Property 4: Navigation Link Functionality
*For any* navigation link clicked, the website should navigate to the correct corresponding page
**Validates: Requirements 1.5**

### Property 5: Service Card Navigation
*For any* service preview card clicked, the website should navigate to the services page
**Validates: Requirements 2.4**

### Property 6: WhatsApp CTA Prominence
*For any* page containing WhatsApp CTA buttons, the buttons should be visually prominent and properly styled
**Validates: Requirements 4.6**

### Property 7: Booking Form WhatsApp Integration
*For any* valid booking form submission, the website should open WhatsApp with pre-filled message containing the form data
**Validates: Requirements 5.3**

### Property 8: WhatsApp Message Format
*For any* booking form data, the generated WhatsApp message should follow the exact format: "Hello The Pawlour! My name is {Name}. I have a {Pet Breed}. I'd like to book an appointment on {Date}."
**Validates: Requirements 5.6**

### Property 9: Color Scheme Consistency
*For any* page element, the color usage should follow the defined scheme: warm cream backgrounds, white sections/cards, terracotta/forest green highlights, and soft gold CTAs
**Validates: Requirements 6.1, 6.2, 6.3, 6.4**

### Property 10: Typography Consistency
*For any* text element, headings should use Playfair Display and body text should use Inter or Geist fonts
**Validates: Requirements 6.5**

### Property 11: Visual Element Styling
*For any* visual element (cards, buttons, sections), they should have rounded corners and subtle shadows
**Validates: Requirements 6.7**

### Property 12: Design Constraint Compliance
*For any* page, no more than 2 font families and 3 main colors should be visible simultaneously
**Validates: Requirements 6.8**

### Property 13: Image Optimization
*For any* image element, it should use the Next.js Image component for optimization
**Validates: Requirements 7.3**

### Property 14: Smooth Scrolling
*For any* scroll interaction between sections, the scrolling behavior should be smooth and consistent
**Validates: Requirements 7.4**

### Property 15: Interactive Card Hover Effects
*For any* interactive card element, hover effects should be present and functional
**Validates: Requirements 7.5**

### Property 16: Meta Tag Presence
*For any* page, appropriate meta tags should be present in the document head
**Validates: Requirements 8.1**

### Property 17: SEO Keyword Integration
*For any* page content, the specified keywords ("Pet Grooming Hougang", "Cage-free dog grooming Singapore") should be naturally incorporated
**Validates: Requirements 8.3**

### Property 18: Page Metadata Completeness
*For any* page, descriptive page titles and meta descriptions should be present and meaningful
**Validates: Requirements 8.5**

<function_calls>
<invoke name="prework">
<parameter name="featureName">pawlour-website
## Error Handling

### Form Validation
- **Client-side validation**: Real-time validation for booking form fields
- **Required field validation**: Name, pet breed, and preferred date must be provided
- **Date validation**: Preferred date must be in the future
- **Input sanitization**: All form inputs sanitized before WhatsApp message generation

### Navigation Errors
- **404 handling**: Custom 404 page with navigation back to home
- **Broken link detection**: All internal links validated during build
- **External link safety**: WhatsApp and social media links validated

### Performance Fallbacks
- **Image loading**: Placeholder images while loading, fallback for failed loads
- **Font loading**: System font fallbacks if custom fonts fail to load
- **JavaScript disabled**: Core functionality (navigation, forms) works without JavaScript

### Mobile Compatibility
- **Viewport handling**: Graceful degradation for unsupported viewport sizes
- **Touch interaction**: Proper touch targets and hover state alternatives
- **Network conditions**: Optimized loading for slower mobile connections

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests**: Verify specific examples, edge cases, and error conditions
- Component rendering with specific props
- Form submission with known data sets
- Navigation between specific pages
- Error handling scenarios

**Property Tests**: Verify universal properties across all inputs
- Consistency across all pages and components
- Color scheme compliance across all elements
- Typography consistency across all text
- Responsive behavior across all viewport sizes

### Property-Based Testing Configuration

**Testing Library**: Jest with @fast-check/jest for property-based testing
- Minimum 100 iterations per property test
- Custom generators for form data, viewport sizes, and page content
- Each property test tagged with: **Feature: pawlour-website, Property {number}: {property_text}**

**Test Organization**:
```
__tests__/
├── components/
│   ├── Navbar.test.tsx
│   ├── ServiceCard.test.tsx
│   └── BookingForm.test.tsx
├── pages/
│   ├── home.test.tsx
│   ├── about.test.tsx
│   ├── services.test.tsx
│   └── contact.test.tsx
├── properties/
│   ├── navigation.property.test.tsx
│   ├── styling.property.test.tsx
│   ├── forms.property.test.tsx
│   └── seo.property.test.tsx
└── integration/
    ├── user-flows.test.tsx
    └── whatsapp-integration.test.tsx
```

### Testing Priorities

**Critical Path Testing**:
1. Home page conversion elements
2. WhatsApp integration functionality
3. Mobile responsiveness
4. Form submission and validation
5. Navigation consistency

**Visual Regression Testing**:
- Screenshot comparison for key pages
- Color scheme validation
- Typography consistency checks
- Mobile layout verification

**Performance Testing**:
- Page load times
- Image optimization verification
- Core Web Vitals compliance
- Mobile performance benchmarks

### Integration Testing

**WhatsApp Integration**:
- Message format validation with various form inputs
- URL generation and encoding
- Cross-platform compatibility

**SEO Validation**:
- Meta tag presence and content
- Structured data validation
- Keyword integration verification
- Local business schema compliance

**Accessibility Testing**:
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Color contrast validation
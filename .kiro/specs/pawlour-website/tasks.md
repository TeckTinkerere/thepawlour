# Implementation Plan: The Pawlour Website

## Overview

This implementation plan breaks down the development of The Pawlour website into discrete, manageable tasks. Each task builds incrementally toward a complete conversion-focused website with WhatsApp booking integration. The approach prioritizes core functionality first, followed by visual polish and optimization.

## Tasks

- [x] 1. Project Setup and Foundation
  - Initialize Next.js 14 project with App Router
  - Configure Tailwind CSS with custom color palette
  - Set up TypeScript configuration
  - Create basic project structure and folders
  - Install required dependencies (next/image, next/font)
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 1.1 Set up testing framework
  - Configure Jest and React Testing Library
  - Install @fast-check/jest for property-based testing
  - Create basic test configuration
  - _Requirements: All (testing foundation)_

- [ ] 2. Core Layout Components
  - [x] 2.1 Create root layout with global styles
    - Implement app/layout.tsx with metadata
    - Configure custom fonts (Playfair Display, Inter/Geist)
    - Set up global CSS with Tailwind imports
    - _Requirements: 6.5, 8.1, 8.5_

  - [x] 2.2 Build sticky navigation header
    - Create Navbar component with logo, navigation links, WhatsApp button
    - Implement responsive mobile hamburger menu
    - Add sticky positioning and smooth scroll behavior
    - _Requirements: 1.2, 1.4, 1.5, 7.4_

  - [x] 2.3 Write property test for navigation consistency
    - **Property 3: Navigation Consistency**
    - **Property 4: Navigation Link Functionality**
    - **Validates: Requirements 1.4, 1.5**

  - [x] 2.4 Create mobile sticky footer
    - Build MobileFooter component with WhatsApp CTA
    - Implement mobile-only visibility and sticky positioning
    - Add responsive behavior and proper z-index
    - _Requirements: 1.3, 7.2_

  - [x] 2.5 Write property test for mobile footer
    - **Property 2: Mobile Footer Consistency**
    - **Validates: Requirements 1.3, 7.2**

- [ ] 3. Reusable UI Components
  - [x] 3.1 Build WhatsApp integration component
    - Create WhatsAppButton with message pre-filling
    - Implement phone number formatting and URL generation
    - Add multiple visual variants (primary, secondary, mobile)
    - _Requirements: 4.6, 5.1, 5.3, 5.6_

  - [x] 3.2 Write property test for WhatsApp message formatting
    - **Property 8: WhatsApp Message Format**
    - **Validates: Requirements 5.6**

  - [x] 3.3 Create service and trust signal cards
    - Build ServiceCard component with hover effects
    - Create TrustSignalCard for credibility elements
    - Implement consistent styling with rounded corners and shadows
    - _Requirements: 2.2, 2.3, 6.7, 7.5_

  - [x] 3.4 Write property test for card interactions
    - **Property 5: Service Card Navigation**
    - **Property 15: Interactive Card Hover Effects**
    - **Validates: Requirements 2.4, 7.5**

- [ ] 4. Home Page Implementation
  - [x] 4.1 Build hero section
    - Create hero component with large image, headline, subtext
    - Implement WhatsApp CTA button integration
    - Add responsive image handling with next/image
    - _Requirements: 2.1, 7.3_

  - [x] 4.2 Implement trust signals section
    - Display three trust signal cards (cage-free, SKC certified, premium products)
    - Apply consistent styling and spacing
    - _Requirements: 2.2_

  - [x] 4.3 Create services preview section
    - Build three service preview cards (Basic, Full, Spa)
    - Implement navigation to services page
    - Add hover effects and animations
    - _Requirements: 2.3, 2.4_

  - [ ] 4.4 Add mini about and CTA sections
    - Create mini about section with link to full about page
    - Build call-to-action section with WhatsApp booking
    - _Requirements: 2.5, 2.6_

  - [ ] 4.5 Write unit tests for home page components
    - Test hero section rendering and CTA functionality
    - Test trust signals and service preview sections
    - _Requirements: 2.1, 2.2, 2.3_

- [ ] 5. About Page Implementation
  - [ ] 5.1 Create about page content structure
    - Build mission statement section
    - Implement business story section (home-based to boutique)
    - Add team credentials with SKC certification emphasis
    - Display business vision
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ] 5.2 Add testimonial placeholders
    - Create TestimonialCard component
    - Implement placeholder testimonials for future reviews
    - Style consistently with overall design
    - _Requirements: 3.5_

  - [ ] 5.3 Write unit tests for about page
    - Test content presence and structure
    - Test testimonial component rendering
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 6. Services Page Implementation
  - [ ] 6.1 Build services table layout
    - Create responsive table for grooming services by pet size
    - Organize by Small/Medium/Large categories
    - Display Full Grooming, Basic Grooming, Spa Treatments
    - _Requirements: 4.1, 4.2_

  - [ ] 6.2 Implement spa treatments and add-ons
    - Display spa treatment options (Microbubble, Ayurvedic Herb)
    - Create checklist-style add-on services
    - Add pricing disclaimer about breed/coat/temperament variations
    - _Requirements: 4.3, 4.4, 4.5_

  - [ ] 6.3 Add services page WhatsApp CTA
    - Implement prominent WhatsApp CTA button
    - Ensure consistent styling with other CTAs
    - _Requirements: 4.6_

  - [ ] 6.4 Write unit tests for services page
    - Test service table structure and content
    - Test spa treatments and add-ons display
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 7. Contact Page and Booking Form
  - [ ] 7.1 Create booking form component
    - Build form with name, pet breed, preferred date fields
    - Implement form validation and error handling
    - Add date picker for preferred date selection
    - _Requirements: 5.2_

  - [ ] 7.2 Implement WhatsApp form integration
    - Connect form submission to WhatsApp message generation
    - Format message according to specified template
    - Handle form data validation and sanitization
    - _Requirements: 5.3, 5.6_

  - [ ] 7.3 Write property test for booking form
    - **Property 7: Booking Form WhatsApp Integration**
    - **Validates: Requirements 5.3**

  - [ ] 7.4 Add contact page elements
    - Display prominent WhatsApp button
    - Embed Google Map with salon location
    - Add social media icons and links
    - _Requirements: 5.1, 5.4, 5.5_

  - [ ] 7.5 Write unit tests for contact page
    - Test booking form functionality
    - Test contact elements presence
    - _Requirements: 5.1, 5.2, 5.4, 5.5_

- [ ] 8. Checkpoint - Core Functionality Complete
  - Ensure all pages render correctly
  - Test navigation between all pages
  - Verify WhatsApp integration works
  - Ask the user if questions arise

- [ ] 9. Visual Design and Styling
  - [ ] 9.1 Implement color scheme consistency
    - Apply warm cream backgrounds throughout
    - Ensure white section/card backgrounds
    - Use terracotta/forest green for highlights
    - Apply soft gold to all CTA buttons
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ] 9.2 Write property test for color scheme
    - **Property 9: Color Scheme Consistency**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4**

  - [ ] 9.3 Ensure typography consistency
    - Apply Playfair Display to all headings
    - Use Inter/Geist for all body text
    - Maintain generous spacing and sizing
    - _Requirements: 6.5_

  - [ ] 9.4 Write property test for typography
    - **Property 10: Typography Consistency**
    - **Property 12: Design Constraint Compliance**
    - **Validates: Requirements 6.5, 6.8**

  - [ ] 9.5 Apply visual element styling
    - Add rounded corners to all cards and buttons
    - Implement subtle shadows consistently
    - Ensure proper whitespace and spacing
    - _Requirements: 6.7_

  - [ ] 9.6 Write property test for visual elements
    - **Property 11: Visual Element Styling**
    - **Validates: Requirements 6.7**

- [ ] 10. SEO and Performance Optimization
  - [ ] 10.1 Implement SEO meta tags
    - Add appropriate meta tags to each page
    - Create descriptive page titles and descriptions
    - Implement LocalBusiness JSON-LD schema
    - _Requirements: 8.1, 8.2, 8.5_

  - [ ] 10.2 Write property test for SEO elements
    - **Property 16: Meta Tag Presence**
    - **Property 18: Page Metadata Completeness**
    - **Validates: Requirements 8.1, 8.5**

  - [ ] 10.3 Optimize content for local SEO
    - Naturally incorporate target keywords in content
    - Ensure "Pet Grooming Hougang" and "Cage-free dog grooming Singapore" appear
    - Optimize for local search visibility
    - _Requirements: 8.3_

  - [ ] 10.4 Write property test for keyword integration
    - **Property 17: SEO Keyword Integration**
    - **Validates: Requirements 8.3**

  - [ ] 10.5 Performance optimization
    - Ensure all images use next/image optimization
    - Implement smooth scrolling behavior
    - Optimize for static rendering
    - _Requirements: 7.3, 7.4_

  - [ ] 10.6 Write property test for performance features
    - **Property 13: Image Optimization**
    - **Property 14: Smooth Scrolling**
    - **Validates: Requirements 7.3, 7.4**

- [ ] 11. Final Integration and Testing
  - [ ] 11.1 Cross-page consistency validation
    - Verify header consistency across all pages
    - Test mobile footer behavior on all pages
    - Ensure WhatsApp CTA prominence throughout
    - _Requirements: 1.2, 1.3, 4.6_

  - [ ] 11.2 Write comprehensive property tests
    - **Property 1: Consistent Header Presence**
    - **Property 6: WhatsApp CTA Prominence**
    - **Validates: Requirements 1.2, 4.6**

  - [ ] 11.3 Integration testing
    - Test complete user flow from home to booking
    - Verify WhatsApp integration end-to-end
    - Test responsive behavior across devices
    - _Requirements: All_

- [ ] 12. Final Checkpoint - Production Ready
  - Ensure all tests pass
  - Verify mobile responsiveness
  - Test WhatsApp message formatting
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Checkpoints ensure incremental validation and user feedback
- Focus on conversion optimization and mobile experience throughout
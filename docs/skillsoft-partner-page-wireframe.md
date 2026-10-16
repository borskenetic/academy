# Skillsoft Partner Page Wireframe

## Desktop Structure

```text
+--------------------------------------------------------------------------------+
| Header                                                                         |
| Logo                     Learn  Certifications  Institutions  Partners  Support |
|                                                        Search  Login  Register |
+--------------------------------------------------------------------------------+
| Hero                                                                           |
| Breadcrumb                                                                     |
| Our Learning Partner                                                           |
| Skillsoft                                                                      |
| Build job-ready digital, business, and leadership skills...                    |
| [Explore Skillsoft Courses] [View Certifications]                              |
|                                                        Partner image           |
+--------------------------------------------------------------------------------+
| Trust Markers                                                                  |
| Global Learning Library | Certification Support | Flexible Learning | Career    |
+--------------------------------------------------------------------------------+
| About Skillsoft                         | What You Get                         |
| Short partnership explanation           | Checklist of concrete benefits        |
| [Explore Skillsoft Courses]             |                                       |
+--------------------------------------------------------------------------------+
| Learn Across In-Demand Areas                                                   |
| Technology | Data | Cybersecurity | Cloud | Leadership | Business | DevOps | AI |
| [View All Learning Areas]                                                       |
+--------------------------------------------------------------------------------+
| Who Can Benefit?                       | Our Impact Together                    |
| Students                               | 30,000+ learners                       |
| Faculty                                | 550+ courses                           |
| Professionals                          | 15,000+ certifications                 |
| Institutions                           | 150+ academic partners                  |
+--------------------------------------------------------------------------------+
| Final CTA                                                                       |
| Start building future-ready skills with Skillsoft.      [Start Learning]        |
+--------------------------------------------------------------------------------+
| Footer                                                                          |
| Brand | Learn | Certifications | Institutions | About | Support | Newsletter    |
+--------------------------------------------------------------------------------+
```

## Mobile Structure

```text
+----------------------------------+
| Header                           |
| Logo                  Menu       |
+----------------------------------+
| Hero                             |
| Skillsoft                        |
| Short value statement            |
| [Explore Skillsoft Courses]      |
| [View Certifications]            |
+----------------------------------+
| Trust Markers                    |
| 1 card per row                   |
+----------------------------------+
| About Skillsoft                  |
| What You Get                     |
+----------------------------------+
| Learning Areas                   |
| 1 or 2 cards per row             |
+----------------------------------+
| Who Can Benefit?                 |
+----------------------------------+
| Impact Stats                     |
+----------------------------------+
| Final CTA                        |
+----------------------------------+
| Footer Accordions                |
+----------------------------------+
```

## Interaction Notes

- Header register remains the strongest persistent action.
- Hero CTA is the strongest page-level action.
- Learning-area cards should behave as links if destination pages exist.
- Carousel behavior should be removed unless there are multiple real testimonials.
- Newsletter form needs label, validation, loading, success, and error states.
- On mobile, navigation should collapse behind a menu button with clear focus handling.

## Component Inventory

- Site header
- Navigation menu
- Search control
- Button
- Hero section
- Trust marker item
- Content section
- Benefit checklist
- Learning-area card
- Audience item
- Impact stat
- Testimonial quote
- CTA band
- Footer link group
- Newsletter signup form

## Wireframe Acceptance Criteria

- The primary CTA appears in the first viewport.
- The page can be scanned section by section without repeated claims.
- The mobile layout avoids horizontal overflow.
- Every interactive element has a visible label or accessible name.
- Content sections map directly to reusable implementation components.

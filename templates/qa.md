# QA Spec: [Project Name]

**Version:** 1.0
**Last Updated:** [date]
**Target:** [URL or localhost:PORT]

---

## Overview

[Brief description of what this app/page does]

---

## Visual Checks

### Layout & Structure
- [ ] Page loads without errors
- [ ] No console errors/warnings
- [ ] Layout matches design intent
- [ ] Responsive: looks correct at mobile (375px), tablet (768px), desktop (1440px)
- [ ] No overlapping elements or clipped text
- [ ] Proper spacing and alignment

### Typography
- [ ] Headings are hierarchical (H1 → H2 → H3)
- [ ] Text is readable (contrast, size)
- [ ] No orphaned words or awkward line breaks
- [ ] Fonts load correctly (no FOUT/FOIT issues)

### Images & Media
- [ ] All images load
- [ ] Images have appropriate alt text
- [ ] No stretched or pixelated images
- [ ] Videos play correctly (if applicable)

### Branding
- [ ] Colors match brand palette
- [ ] Logo displays correctly
- [ ] Consistent styling throughout

---

## Functional Checks

### Navigation
- [ ] All links work (no 404s)
- [ ] Navigation is accessible via keyboard
- [ ] Current page is indicated in nav
- [ ] Back button works as expected

### Forms (if applicable)
- [ ] All fields accept input
- [ ] Validation messages appear correctly
- [ ] Submit button works
- [ ] Error states are clear
- [ ] Success states confirm action

### Interactive Elements
- [ ] Buttons are clickable and respond
- [ ] Hover states work
- [ ] Dropdowns/modals open and close
- [ ] Animations are smooth (no jank)

---

## Page-Specific Checks

### [Page Name 1]
- [ ] [Specific check for this page]
- [ ] [Another specific check]

### [Page Name 2]
- [ ] [Specific check]

---

## Known Issues / Exceptions

[List anything that's intentionally incomplete or known bugs to ignore]

---

## How to Run This QA

1. Open the target URL in browser
2. Take a browser snapshot or screenshot
3. Feed this spec + the snapshot to Claude
4. Ask: "Review this page against the QA spec. Report any failures."
5. Fix issues, repeat until all checks pass

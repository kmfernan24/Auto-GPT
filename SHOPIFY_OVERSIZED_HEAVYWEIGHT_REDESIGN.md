# Shopify Redesign Blueprint: Oversized Heavyweight Tees

## 1) Brand Positioning Shift

### New promise
- **Core statement:** "Heavyweight oversized tees built to hold shape, wash after wash."
- **Tone:** premium streetwear, confident, minimal hype language.
- **Primary audience:** customers who care about drape, structure, and durable fabric weight.

### Updated navigation
- Shop All
- Heavyweight Tees
- New Drops
- Best Sellers
- Size Guide
- Fabric & Fit
- Reviews

---

## 2) Homepage Redesign (Section-by-Section)

### Hero (Above the Fold)
- Headline: **"Oversized. Heavyweight. Built Different."**
- Subhead: "240–300 GSM cotton tees with structured drape and long-term durability."
- Primary CTA: **Shop Heavyweight Tees**
- Secondary CTA: **Find My Fit**
- Visual direction: close-up texture shot + full-body fit image.

### Trust Strip (Immediately under hero)
- "240–300 GSM fabric"
- "Pre-shrunk + garment washed"
- "Easy returns"
- "Fast shipping"

### Featured Collection
- Use a 4-column grid on desktop, 2-column on mobile.
- Product card badges:
  - "Heavyweight"
  - "Best Seller"
  - "New Color"

### Why Heavyweight Section
- 3 icon cards:
  1. **Structured drape** (boxy silhouette)
  2. **Durability** (retains shape)
  3. **Premium hand-feel** (thick, soft cotton)

### Fit Visual Explainer
- Side-by-side blocks:
  - "Regular tee fit"
  - "Our oversized fit"
- Add chest/body length overlays for visual comparison.

### Social Proof
- Pull top reviews with fit references (height/weight/size purchased).
- Add UGC row with real customers wearing the same SKU in different sizes.

### Final CTA Band
- Headline: "Find your oversized fit in 30 seconds"
- CTA buttons: **Take Fit Quiz** / **Shop Best Sellers**

---

## 3) Product Page Redesign (PDP)

### PDP structure
1. Image gallery (fabric texture first, then full body)
2. Product title + price
3. Color swatches
4. Size selector + fit recommendation
5. Add to cart
6. Shipping/returns microcopy
7. Fabric details
8. Size & fit section
9. Reviews with body metrics
10. Related products

### Copy blocks to add
- **Fit callout:** "Intentionally oversized with dropped shoulders and a boxy body."
- **Fabric callout:** "Heavyweight 100% cotton, 240–300 GSM depending on style."
- **Care callout:** "Cold wash, hang dry recommended to preserve structure."

### Variant UX improvements
- Show model sizing line under selector, e.g.:
  - "Model is 6'0 / 183 cm, 170 lb / 77 kg wearing L"
- Show "True-to-size for oversized fit" helper copy.

---

## 4) Collection Page Rules

### Filters
- Size
- Color
- Weight class (240 GSM, 270 GSM, 300 GSM)
- Fit (Oversized, Boxy Oversized)

### Sorting defaults
- Default sort: Best Selling
- Secondary recommendations: Newest, Price low-high

### Product card improvements
- Quick add size drawer
- "GSM" pill badge on cards
- Hover image = alternate angle or close-up fabric texture

---

## 5) Shopify Theme Implementation Notes

If you're using a Shopify 2.0 theme (Dawn-like structure), create reusable sections and blocks:

- `sections/heavyweight-hero.liquid`
- `sections/heavyweight-trust-strip.liquid`
- `sections/fit-comparison.liquid`
- `sections/fabric-spec-grid.liquid`

### Example: trust strip snippet

```liquid
<div class="trust-strip">
  <div class="trust-item">240–300 GSM Cotton</div>
  <div class="trust-item">Pre-Shrunk + Garment Washed</div>
  <div class="trust-item">Fast Shipping</div>
  <div class="trust-item">Easy Returns</div>
</div>
```

### Example CSS direction

```css
.heavyweight-title {
  font-size: clamp(2rem, 6vw, 4.5rem);
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.trust-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

@media (max-width: 768px) {
  .trust-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

---

## 6) Product Catalog Structure for Launch

Create at least 3 lead SKUs:
1. Oversized Heavyweight Tee — Core (270 GSM)
2. Oversized Heavyweight Tee — Vintage Wash (300 GSM)
3. Oversized Heavyweight Tee — Lightweight Heavy (240 GSM)

### Color strategy
- Start with high-conversion neutrals:
  - Black
  - Washed Black
  - White
  - Heather Grey
  - Navy

### Size range
- XS to 3XL if supply allows.
- Include garment measurements by size in a dedicated table.

---

## 7) Conversion Stack (Must-Have)

- Sticky add-to-cart on mobile PDP
- Back-in-stock capture for sold-out sizes
- Bundle offer:
  - "2 tees save 10%"
  - "3 tees save 15%"
- Review app widget filtered to "fit" and "quality" tags

---

## 8) Launch Copy Pack (Ready to Use)

### Homepage headline options
1. "Oversized Tees With Real Weight"
2. "Heavyweight Tees That Keep Their Shape"
3. "Built To Drape. Built To Last."

### PDP short description template
"A premium oversized tee made from heavyweight cotton for a structured fit and long-term durability. Designed with dropped shoulders, a boxy silhouette, and a substantial hand-feel that stands out from standard tees."

### Cart upsell copy
"Complete your rotation: add another heavyweight tee and save 10%."

---

## 9) 30-Day Optimization Roadmap

### Week 1
- Launch redesigned homepage + revised PDP template.
- Enable heatmaps/session replay.

### Week 2
- A/B test hero headline and first CTA wording.
- Test product card badge style ("Heavyweight" vs "270 GSM").

### Week 3
- A/B test size guide placement on PDP.
- Add 5–10 UGC assets to homepage and PDP.

### Week 4
- Review conversion by size/variant.
- Expand highest-converting colorways.

---

## 10) High-Impact Checklist

- [ ] Homepage communicates "oversized heavyweight" in first screen
- [ ] Every PDP includes GSM + fit notes + model size info
- [ ] Collection cards include GSM badge and quick add
- [ ] Mobile sticky ATC enabled
- [ ] Size guide is easy to find and measurement-based
- [ ] Review section includes customer height/weight/size context

Use this blueprint as your implementation brief for your designer/developer or to apply directly in your Shopify theme customizer and Liquid files.

# GYMRAT — Asset Manifest

All assets live under `public/assets/` and are referenced as `/assets/...` (no Base64).
Mapping in code: `client/src/data/assets.js`.

## Classification
- **Generated** — produced with the image-generation tool (hero photography).
- **Derived** — cropped/graded from Generated sources with `tools/derive-assets.sh` (same subject, garment, lighting).
- **Placeholder** — branded dark placeholder awaiting a dedicated generation. Replace by generating to the SAME path (prompt listed).

## Brand
| file | type | pages | source |
|---|---|---|---|
| brand/logo.svg | logo | all (header/footer) | vector reconstruction |
| brand/logo-mark.svg | logo | header mobile | vector reconstruction |
| brand/logo-mark-lime.svg | logo | accents | vector reconstruction |

## Heroes / Models (Generated)
| file | aspect | pages | note |
|---|---|---|---|
| heroes/home-slide-1.jpg | 1536x1024 | Home slide 1 | man on bench + duffel bag |
| heroes/home-slide-2.jpg | 1536x1024 | Home slide 2 | cable training |
| heroes/home-slide-3.jpg | 1536x1024 | Home slide 3 | black hoodie, garage |
| heroes/tshirts.jpg | 1536x1024 | Products/T-Shirts hero | black tee + chains |
| heroes/street.jpg | 1536x1024 | Street Discipline hero | hoodie, steps |
| heroes/performance.jpg | 1536x1024 | Performance hero | seated, cap |
| heroes/core.jpg | 1536x1024 | Core hero | zip jacket + headphones |
| heroes/about.jpg | 1024x1536 | About hero | portrait, gym |
| models/story-back.jpg | 1536x1024 | About story, banners | back print hoodie |

## Products (900x1200)
| file | source | status | replacement prompt (short) |
|---|---|---|---|
| products/core-tee.jpg | Generated | final | black tee, model torso, studio |
| products/motion-tee.jpg | Derived | replace | dark grey tee, model torso, studio |
| products/logo-tee.jpg | Derived | final-ish | back, big triangle logo print |
| products/essential-tee.jpg | — | Generated | done | off-white tee, model torso, studio |
| products/discipline-tee.jpg | Derived | replace | black tee back, "BUILT DIFFERENT" print |
| products/performance-tank.jpg | Derived | replace | black stringer tank, muscular model |
| products/minimal-tee.jpg | Derived | replace | charcoal tee, back, tiny neck logo |
| products/graphic-tee.jpg | — | Generated | done | black tee, white skull graphic back |
| products/oversized-tee.jpg | Derived | replace | black oversized tee, loose fit |
| products/street-graphic-tee.jpg | — | Generated | done | black tee, tiger graphic |
| products/long-sleeve-tee.jpg | — | Generated | done | black long sleeve tee |
| products/performance-tee.jpg | Derived | replace | fitted black training tee |
| products/compression-longsleeve.jpg | — | Generated | done | black compression longsleeve |
| products/training-tank.jpg | — | Generated | done | white training tank |
| products/discipline-hoodie.jpg | Derived | replace | black heavyweight hoodie |
| products/urban-hoodie.jpg | Derived | replace | grey hoodie, urban |
| products/graffiti-hoodie.jpg | Derived | replace | black hoodie, graffiti back print |
| products/zip-hoodie.jpg | Derived | replace | black zip hoodie |
| products/minimal-hoodie.jpg | Derived | replace | black minimal hoodie |
| products/essentials-hoodie.jpg | Derived | replace | grey essential hoodie |
| products/performance-hoodie.jpg | Derived | replace | grey tech hoodie |
| products/training-hoodie.jpg | Derived | replace | black training hoodie |
| products/cargo-pants.jpg | Derived | replace | black cargo pants on model |
| products/grind-pants.jpg | Derived | replace | black pants, sneakers |
| products/straight-pants.jpg | Derived | replace | grey straight pants |
| products/utility-cargo-pants.jpg | Derived | replace | stone/beige cargo pants |
| products/performance-pants.jpg | Derived | replace | grey tapered training pants |
| products/street-sweatpants.jpg | Derived | replace | black sweatpants |
| products/training-shorts.jpg | Derived | replace | black training shorts |
| products/rat-cap.jpg | Derived | replace | black cap flat-lay with triangle logo |
| products/street-cap.jpg | Derived | replace | black cap, flat-lay side |
| products/gym-duffle.jpg | Derived | replace | black duffel bag flat-lay |
| products/gym-socks.jpg | Derived | replace | black socks 3-pack flat-lay |

## Categories / Banners (Derived unless noted)
categories/tshirts.jpg, hoodies.jpg, pants.jpg, shorts.jpg, accessories.jpg —
banners/fabric-1.jpg, fabric-2.jpg, quality-detail.jpg, gym-to-streets.jpg,
more-than-clothes.jpg, limited.jpg, about-values.jpg, community-1..3.jpg,
cart-hero.jpg, contact-hero.jpg, register-hero.jpg, collections-hero.jpg,
cta-cap.jpg, about-story.jpg, hero-generic.jpg, ig-1..6.jpg.

## Replacement procedure
Run any generation to the exact path listed (overwrite). No code change needed.
Keep subject, palette (near monochrome, #111 ambience), and crop described above.

#!/usr/bin/env bash
# GYMRAT — derive-assets.sh
# Derives product/banner assets from the generated hero photography (ImageMagick).
# Each output is a standalone file at its FINAL path referenced by the app.
# Assets marked PLACEHOLDER in ASSETS_MANIFEST.md are to be replaced by dedicated
# generations when the image-generation budget allows (10 per turn).
set -e
PUB="/home/user/gymrat/public/assets"
H="$PUB/heroes"; M="$PUB/models"; PR="$PUB/products"; B="$PUB/banners"; C="$PUB/categories"; BR="$PUB/brand"
mkdir -p "$H" "$M" "$PR" "$B" "$C" "$BR"

SRC1="$H/home-slide-1.jpg"   # man on bench, black tee, cap, duffel bag
SRC2="$H/home-slide-2.jpg"   # man training, black tee, shorts
SRC3="$H/home-slide-3.jpg"   # man black hoodie, garage
SRCT="$H/tshirts.jpg"        # man black tee, chains, cap
SRCS="$H/street.jpg"         # man hoodie sitting steps
SRCP="$H/performance.jpg"    # man black tee sitting, cap
SRCC="$H/core.jpg"           # man black zip jacket, headphones
SRCA="$H/about.jpg"          # portrait, black tee, chains (1024x1536)
SRCB="$M/story-back.jpg"     # back view hoodie big logo

prod() { # src cropgeom modulate out
  convert "$1" -crop "$2" +repage -resize 900x1200^ -gravity center -extent 900x1200 -modulate "$3" -quality 88 "$PR/$4"
}
ph() { # filename label — branded dark placeholder 900x1200
  convert -size 900x1200 xc:'#141414' \
    -fill '#1d1d1d' -draw 'roundrectangle 30,30 870,1170 28,28' \
    -fill '#2e2e2e' -draw 'polygon 450,380 610,380 555,520 490,440 420,530 385,430' \
    -fill '#3a3a3a' -font DejaVu-Sans-Bold -pointsize 44 -gravity center -annotate +0+220 "$2" \
    -fill '#2a2a2a' -font DejaVu-Sans -pointsize 26 -annotate +0+290 'GYMRAT  •  ASSET PLACEHOLDER' \
    -quality 88 "$PR/$1"
}

# ---------- PRODUCTS: tees ----------
prod "$SRCT"   "520x693+250+120"  "100,55"   "motion-tee.jpg"          # grey-ish tee look
prod "$SRCB"   "620x826+200+180"  "100,60"   "logo-tee.jpg"            # back print
ph essential-tee.jpg "ESSENTIAL TEE"
prod "$SRCB"   "700x933+160+300"  "95,45"    "discipline-tee.jpg"      # back print close
prod "$SRC2"   "560x746+220+80"   "85,45"    "minimal-tee.jpg"
ph graphic-tee.jpg "GRAPHIC TEE"
prod "$SRCT"   "600x800+200+150"  "105,55"   "oversized-tee.jpg"
ph street-graphic-tee.jpg "STREET GRAPHIC TEE"
ph long-sleeve-tee.jpg "LONG SLEEVE TEE"
prod "$SRCP"   "540x720+240+100"  "100,55"   "performance-tee.jpg"
ph compression-longsleeve.jpg "COMPRESSION LS"
ph training-tank.jpg "TRAINING TANK"
prod "$SRCP"   "480x640+300+60"   "105,60"   "performance-tank.jpg"

# ---------- PRODUCTS: hoodies ----------
prod "$SRC3"   "560x746+230+90"   "100,55"   "discipline-hoodie.jpg"
prod "$SRCS"   "540x720+260+120"  "128,45"   "urban-hoodie.jpg"        # lighter grey
prod "$SRCB"   "620x826+180+150"  "90,50"    "graffiti-hoodie.jpg"
prod "$SRCC"   "540x720+250+90"   "100,55"   "zip-hoodie.jpg"
prod "$SRC3"   "520x693+260+110"  "82,45"    "minimal-hoodie.jpg"
prod "$SRCS"   "560x746+240+100"  "138,40"   "essentials-hoodie.jpg"   # grey hoodie
prod "$SRCS"   "520x693+280+140"  "120,35"   "performance-hoodie.jpg"
prod "$SRC3"   "580x773+210+70"   "95,50"    "training-hoodie.jpg"

# ---------- PRODUCTS: pants / shorts ----------
prod "$SRC1"   "470x626+380+400"  "100,55"   "cargo-pants.jpg"
prod "$SRC1"   "450x600+420+430"  "95,50"    "grind-pants.jpg"
prod "$SRCP"   "560x746+220+280"  "120,45"   "straight-pants.jpg"
prod "$SRC1"   "470x626+380+400"  "150,35"   "utility-cargo-pants.jpg"  # stone wash
prod "$SRCP"   "540x720+240+300"  "130,40"   "performance-pants.jpg"
prod "$SRC3"   "500x666+240+350"  "92,50"    "street-sweatpants.jpg"
prod "$SRC2"   "480x640+300+330"  "100,55"   "training-shorts.jpg"

# ---------- PRODUCTS: accessories ----------
prod "$SRC1"   "430x430+500+60"   "100,55"   "rat-cap.jpg"
prod "$SRC1"   "390x390+540+70"   "115,50"   "street-cap.jpg"
prod "$SRC1"   "520x390+930+420"  "100,55"   "gym-duffle.jpg"
prod "$SRC1"   "420x315+520+640"  "105,55"   "gym-socks.jpg"

# ---------- CATEGORY tiles (portrait cards 750x1000) ----------
cat() { convert "$1" -crop "$2" +repage -resize 750x1000^ -gravity center -extent 750x1000 -modulate "$3" -quality 86 "$C/$4"; }
cat "$SRCT" "620x826+220+100"  "100,55" "tshirts.jpg"
cat "$SRC3" "620x826+200+60"   "100,55" "hoodies.jpg"
cat "$SRC1" "520x693+360+340"  "100,55" "pants.jpg"
cat "$SRC2" "560x746+260+280"  "100,55" "shorts.jpg"
cat "$SRC1" "520x520+930+380"  "100,55" "accessories.jpg"

# ---------- BANNERS / SECTIONS ----------
ban() { convert "$1" -crop "$2" +repage -resize "$3^" -gravity center -extent "$3" -modulate "$4" -quality 86 "$B/$5"; }
ban "$PR/core-tee.jpg" "700x500+100+350"  "800x600"  "100,40" "fabric-1.jpg"
ban "$SRC3"            "700x500+250+250"  "800x600"  "100,40" "fabric-2.jpg"
ban "$SRCB"            "760x570+140+150"  "900x675"  "100,55" "quality-detail.jpg"
ban "$SRCS"            "1200x675+170+170" "1200x675" "95,50"  "gym-to-streets.jpg"
ban "$SRCB"            "1280x720+120+150" "1280x720" "90,45"  "more-than-clothes.jpg"
ban "$SRCB"            "900x675+100+300"  "900x675"  "85,40"  "limited.jpg"
ban "$SRCC"            "900x675+250+100"  "900x675"  "88,40"  "about-values.jpg"
ban "$SRC2"            "600x600+250+150"  "600x600"  "100,55" "community-1.jpg"
ban "$SRCS"            "600x600+250+150"  "600x600"  "100,55" "community-2.jpg"
ban "$SRCP"            "600x600+250+100"  "600x600"  "100,55" "community-3.jpg"
ban "$SRCA"            "1200x450+0+250"   "1400x500" "95,50"  "cart-hero.jpg"
ban "$SRCS"            "1200x675+170+120" "1400x700" "88,45"  "contact-hero.jpg"
ban "$SRCB"            "1000x560+130+250" "1400x600" "88,45"  "register-hero.jpg"
ban "$SRC3"            "1200x675+170+100" "1400x700" "92,50"  "collections-hero.jpg"
ban "$SRC1"            "500x400+480+50"   "1000x500" "100,55" "cta-cap.jpg"

# Instagram strip (square tiles)
ig() { convert "$1" -crop "$2" +repage -resize 500x500^ -gravity center -extent 500x500 -modulate "$3" -quality 85 "$B/$4"; }
ig "$SRCT" "500x500+280+150" "100,55" "ig-1.jpg"
ig "$SRC1" "500x500+450+100" "100,55" "ig-2.jpg"
ig "$SRCB" "500x500+220+250" "100,55" "ig-3.jpg"
ig "$SRC3" "500x500+260+150" "100,55" "ig-4.jpg"
ig "$SRCS" "500x500+280+180" "100,55" "ig-5.jpg"
ig "$SRCP" "500x500+280+120" "100,55" "ig-6.jpg"

# Extra hero crops reused as secondary page heroes
ban "$SRCA" "1024x576+0+200" "1400x700" "95,50" "about-story.jpg"
ban "$SRC3" "1200x675+170+200" "1200x675" "100,55" "hero-generic.jpg"

echo "Derived assets ready:"
find "$PUB" -type f | wc -l

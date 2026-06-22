#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "og")
W, H = 1200, 630

ARIAL_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
ARIAL = "/System/Library/Fonts/Supplemental/Arial.ttf"

ARCHETYPES = [
    {"slug": "desert-king", "name": "THE DESERT KING", "car": "Toyota Land Cruiser", "tagline": "Built for dunes, not driveways."},
    {"slug": "weekend-warrior", "name": "THE WEEKEND WARRIOR", "car": "Ford Raptor", "tagline": "Monday to Friday: normal. Saturday: send it."},
    {"slug": "practical-one", "name": "THE PRACTICAL ONE", "car": "Nissan Patrol", "tagline": "Big enough for the family, tough enough for the desert."},
    {"slug": "old-reliable", "name": "THE OLD RELIABLE", "car": "Toyota Camry", "tagline": "Never the loudest. Always the one that starts."},
    {"slug": "smooth-operator", "name": "THE SMOOTH OPERATOR", "car": "BMW 5 Series", "tagline": "Confidence at 120, calm at a red light."},
    {"slug": "show-stopper", "name": "THE SHOW STOPPER", "car": "Mercedes G-Wagon", "tagline": "Subtle was never the plan."},
    {"slug": "quiet-flex", "name": "THE QUIET FLEX", "car": "Lexus LX", "tagline": "Whisper quiet. Impossible to ignore."},
    {"slug": "city-hustler", "name": "THE CITY HUSTLER", "car": "Honda Civic Type R", "tagline": "Small footprint. Big appetite for speed."},
]

BLACK = (17, 17, 17)
WHITE = (255, 255, 255)
GRAY = (120, 120, 120)
LIGHT_GRAY = (228, 228, 228)


def wrap_text(draw, text, font, max_width):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        test = (line + " " + word).strip()
        if draw.textlength(test, font=font) <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def render(item):
    img = Image.new("RGB", (W, H), WHITE)
    draw = ImageDraw.Draw(img)

    margin = 48
    draw.rectangle([margin, margin, W - margin, H - margin], outline=BLACK, width=3)

    wordmark_font = ImageFont.truetype(ARIAL_BOLD, 26)
    draw.text((margin + 40, margin + 36), "GADI", font=wordmark_font, fill=BLACK)
    gadi_w = draw.textlength("GADI", font=wordmark_font)
    draw.text((margin + 40 + gadi_w, margin + 36), "MATCH", font=wordmark_font, fill=GRAY)

    label_font = ImageFont.truetype(ARIAL_BOLD, 18)
    label = "YOUR MATCH"
    label_w = draw.textlength(label, font=label_font)
    draw.text((W - margin - 40 - label_w, margin + 40), label, font=label_font, fill=GRAY)

    name_font = ImageFont.truetype(ARIAL_BOLD, 64)
    name_lines = wrap_text(draw, item["name"], name_font, W - 2 * (margin + 40))
    y = 220
    for line in name_lines:
        draw.text((margin + 40, y), line, font=name_font, fill=BLACK)
        y += 74

    car_font = ImageFont.truetype(ARIAL_BOLD, 30)
    draw.text((margin + 40, y + 6), item["car"], font=car_font, fill=GRAY)
    y += 56

    tagline_font = ImageFont.truetype(ARIAL, 26)
    tagline_lines = wrap_text(draw, item["tagline"], tagline_font, W - 2 * (margin + 40))
    for line in tagline_lines:
        draw.text((margin + 40, y), line, font=tagline_font, fill=BLACK)
        y += 34

    cta_font = ImageFont.truetype(ARIAL_BOLD, 22)
    cta_text = "TAKE THE QUIZ →"
    bbox = draw.textbbox((0, 0), cta_text, font=cta_font)
    cta_w = bbox[2] - bbox[0]
    cta_h = bbox[3] - bbox[1]
    box_pad_x, box_pad_y = 22, 16
    box_x0 = margin + 40
    box_y1 = H - margin - 30
    box_y0 = box_y1 - (cta_h + box_pad_y * 2)
    box_x1 = box_x0 + cta_w + box_pad_x * 2
    draw.rectangle([box_x0, box_y0, box_x1, box_y1], fill=BLACK)
    draw.text((box_x0 + box_pad_x - bbox[0], box_y0 + box_pad_y - bbox[1]), cta_text, font=cta_font, fill=WHITE)

    out_path = os.path.join(OUT_DIR, item["slug"] + ".jpg")
    img.save(out_path, "JPEG", quality=90)
    print("wrote", out_path)


def render_default():
    img = Image.new("RGB", (W, H), WHITE)
    draw = ImageDraw.Draw(img)
    margin = 48
    draw.rectangle([margin, margin, W - margin, H - margin], outline=BLACK, width=3)

    wordmark_font = ImageFont.truetype(ARIAL_BOLD, 26)
    draw.text((margin + 40, margin + 36), "GADI", font=wordmark_font, fill=BLACK)
    gadi_w = draw.textlength("GADI", font=wordmark_font)
    draw.text((margin + 40 + gadi_w, margin + 36), "MATCH", font=wordmark_font, fill=GRAY)

    hook_font = ImageFont.truetype(ARIAL_BOLD, 56)
    lines = wrap_text(draw, "WHAT DOES YOUR DRIVING SAY ABOUT YOU?", hook_font, W - 2 * (margin + 40))
    y = 240
    for line in lines:
        draw.text((margin + 40, y), line, font=hook_font, fill=BLACK)
        y += 66

    cta_font = ImageFont.truetype(ARIAL_BOLD, 22)
    cta_text = "TAKE THE QUIZ →"
    bbox = draw.textbbox((0, 0), cta_text, font=cta_font)
    cta_w = bbox[2] - bbox[0]
    cta_h = bbox[3] - bbox[1]
    box_pad_x, box_pad_y = 22, 16
    box_x0 = margin + 40
    box_y1 = H - margin - 30
    box_y0 = box_y1 - (cta_h + box_pad_y * 2)
    box_x1 = box_x0 + cta_w + box_pad_x * 2
    draw.rectangle([box_x0, box_y0, box_x1, box_y1], fill=BLACK)
    draw.text((box_x0 + box_pad_x - bbox[0], box_y0 + box_pad_y - bbox[1]), cta_text, font=cta_font, fill=WHITE)

    out_path = os.path.join(OUT_DIR, "default.jpg")
    img.save(out_path, "JPEG", quality=90)
    print("wrote", out_path)


if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    for item in ARCHETYPES:
        render(item)
    render_default()

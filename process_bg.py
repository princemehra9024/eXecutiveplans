from PIL import Image, ImageOps
import sys

def process_light(input_path, output_path):
    img = Image.open(input_path).convert('L') # Convert to grayscale
    # Image is dark lines on white background.
    # We want a transparent image where the lines are dark.
    # Alpha channel: white = 0 (transparent), black = 255 (opaque)
    alpha = ImageOps.invert(img)
    
    # Create a solid black (or dark brown) image for the color
    # Let's use a dark brown: #221a16
    color = Image.new('RGB', img.size, color=(34, 26, 22))
    
    # Put the alpha mask on the color image
    color.putalpha(alpha)
    color.save(output_path, 'PNG')

def process_dark(input_path, output_path):
    img = Image.open(input_path).convert('L') # Convert to grayscale
    # Image is light lines on black background.
    # Alpha channel: black = 0 (transparent), white = 255 (opaque)
    alpha = img
    
    # Create a solid light beige image for the color
    # Let's use #f5f0e6
    color = Image.new('RGB', img.size, color=(245, 240, 230))
    
    # Put the alpha mask on the color image
    color.putalpha(alpha)
    color.save(output_path, 'PNG')

if __name__ == "__main__":
    process_light(sys.argv[1], sys.argv[2])
    process_dark(sys.argv[3], sys.argv[4])

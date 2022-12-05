# pip install epub-conversion
# pip install xml-cleaner

from epub_conversion.utils import open_book, convert_epub_to_lines

book = open_book("84637573.epub")

lines = convert_epub_to_lines(book)
content = ""
for line in lines:
    content += line


f = open(content,'r').read()
# print(f)

# Save epub file
with open("zwzwzw.txt", "w") as file:
    file.write(f)

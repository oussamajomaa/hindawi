# from collections.abc import Iterable
from ebooklib import epub
import ebooklib
import urllib.request
import csv
import requests
import logging
from flask import Flask
from flask import request as req
from flask_cors import CORS
from bs4 import BeautifulSoup
import json
import webbrowser

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
# print(Iterable)

# ["id", "name", "pdf_url"]


@app.route('/')
def get_books():
    category = req.args.get('category')
    all_books = []
    pages = [f"https://www.hindawi.org/books/categories/{category}/{n}/" for n in range(1, 10)]
    for page in pages:
        logger.info(f"Entering {page}")

        resp = requests.get(page)
        soup = BeautifulSoup(resp.text, "html.parser")

        data = soup.findAll(class_="bookCover")
        # print(data)
        for div in data:
            links = div.findAll('a')
            for a in links:
                id = a['href'].split('/')[2].strip()
                img = a.find('img')
                title=img['alt'].replace(':', "").replace('كتاب بعنوان',"").replace('\u200e', "").strip()
                
                all_books.append({
                    "id": id,
                    "title": title
                })

    return all_books

from pathlib import Path
downloads_path = str(Path.home() / "Downloads")

@app.route('/downlaod')
def downlaod_file():
    ext = req.args.get('ext')
    id = req.args.get('id')
    title = req.args.get('title')
    myurl = f"https://www.hindawi.org/books/{id}.{ext}"
    urllib.request.urlretrieve(myurl, f"{downloads_path}/{title}.{ext}")
    # response = requests.get(myurl)
    # open(f"{id}.{ext}", "wb").write(response.content)
    # webbrowser.open(myurl)
    # with urllib.request.urlopen(myurl) as url:
    #     file = url.read()

    # Save epub file
    # with open(f"files/{id}.{ext}", "wb") as f:
    #     f.write(file)

    return json.dumps({"message":"Book was downloaded successfully!"})




if __name__ == '__main__':
    app.run(debug=True)

# SAVE EPUB ON LOCAL

# # Read epub file from url
# myurl = "https://www.hindawi.org/books/84130273.epub"
# with urllib.request.urlopen(myurl) as url:
#     s = url.read()

# # Save epub file
# with open(r"test.epub", "wb") as f:
#     f.write(s)


# CONVERT EPUB TO TXT

# def epub2thtml(epub_path):
#     book = epub.read_epub(epub_path)
#     chapters = []
#     for item in book.get_items():
#         if item.get_type() == ebooklib.ITEM_DOCUMENT:
#             chapters.append(item.get_content())
#     return chapters

# blacklist = [   '[document]',   'noscript', 'header',   'html', 'meta', 'head','input', 'script',   ]
# def chap2text(chap):
#     output = ''
#     soup = BeautifulSoup(chap, 'html.parser')
#     text = soup.find_all(text=True)
#     for t in text:
#         if t.parent.name not in blacklist:
#             output += '{} '.format(t)
#     return output

# def thtml2ttext(thtml):
#     Output = []
#     for html in thtml:
#         text =  chap2text(html)
#         Output.append(text)
#     return Output

# def epub2text(epub_path):
#     chapters = epub2thtml(epub_path)
#     ttext = thtml2ttext(chapters)
#     return ttext

# book_text = epub2text("test.epub")
# book = ""
# for line in book_text:
#     book += line.strip()


# with open('book.txt', 'w', encoding='utf-8') as f:
#     f.write(book)


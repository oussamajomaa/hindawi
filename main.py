from ebooklib import epub
import ebooklib
import urllib.request
import requests
from flask import Flask, request
from flask_cors import CORS
from bs4 import BeautifulSoup
import json


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def get_books():
    category = request.args.get('category')
    all_books = []
    pages = [f"https://www.hindawi.org/books/categories/{category}/{n}/" for n in range(1, 30)]
    for page in pages:
        # logger.info(f"Entering {page}")

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

    return json.dumps(all_books)


@app.route('/downlaod')
def downlaod_file():
    ext = request.args.get('ext')
    id = request.args.get('id')
    title = request.args.get('title')
    myurl = f"https://www.hindawi.org/books/{id}.{ext}"
    urllib.request.urlretrieve(myurl, f"files/{title}.{ext}")

    # book_text = epub2text(f"files/{title}.{ext}")
    # book = ""
    # for line in book_text:
    #     book += line.strip()


    return json.dumps("Books were downloded successfully!")


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

if __name__ == '__main__':
    # app.run()
    app.run('0.0.0.0',port=5555, debug=True, ssl_context=('cert.pem','key.pem'))



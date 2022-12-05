import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(hostname="obtic.sorbonne-universite.fr", username="osm", password="osm2021!", port=22)
sftp_client = ssh.open_sftp()
sftp_client.chdir("/home/osm/spacy-api/uploads")
sftp_client.get('اليهودية في العقيدة والتاريخ.pdf', '/home/osm/adam/new_file.pdf')
sftp_client.close()
ssh.close()

from pathlib import Path
import urllib.request as ur
import json
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/downlaod')
def downlaod_file():
    downloads_path = str(Path.home() / "Downloads") # Spécifier le path ou le fichier sera stocké
    ext = request.args.get('ext') 
    id = request.args.get('id')
    title = request.args.get('title')
    url = f"https://www.hindawi.org/books/{id}.{ext}" # Créer le URL
    ur.urlretrieve(url, f"{downloads_path}/{title}.{ext}") # Appeler le URL et sauvegarder le fichier
    return json.dumps({"message":"Book was downloaded successfully!"})


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)
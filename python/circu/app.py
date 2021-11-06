from flask import Flask, render_template
import os

app = Flask(__name__, static_url_path='/static')


@app.route('/')
def index():
    return render_template("/index.html")

@app.route('/form')
def contact_form():
    return render_template("/home/contact_form.html")



if __name__ == "__main__":
    port = int(os.environ.get('PORT', 80))
    app.run(debug=True, host="0.0.0.0", port=port)

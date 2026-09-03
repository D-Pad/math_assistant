from flask import Flask, jsonify
from os import environ
import logging 


logging.getLogger("werkzeug").disabled = True
app = Flask(__name__)
PORT = environ.get("MATH_BACKEND_PORT", 5000)


@app.route("/")
def index():
    return jsonify({
        "online": 1 
    })


@app.route("/check")
def health_check():
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)



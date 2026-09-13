from flask import Flask, jsonify, request
from os import environ
import logging 


logging.getLogger("werkzeug").disabled = True
app = Flask(__name__)
PORT = environ.get("MATH_BACKEND_PORT", 3000)


def parse_expr(expr):
    expr = expr.replace("^", " ** ")
    return expr


@app.route("/")
def index():
    return jsonify({
        "online": 1 
    })


@app.route("/check")
def health_check():
    return jsonify({"status": "ok"}), 200


@app.route("/limit", methods=['POST'])
def calculate_limit():

    data = request.json

    inputs = data.get("inputs")
    expr = parse_expr(data['fn'])

    if inputs is None or expr is None:
        return jsonify({"error": "Invalid input data"})

    def fn(x):
        result = None
        try:
            result = eval(expr) 
        except ZeroDivisionError:
            pass 
        except SyntaxError:
            pass
        return result
    
    results = [] 
    total = 0
    count = 0

    for i in inputs:
        
        y = fn(i)
        if y is None:
            continue  
        
        y = round(y, 5)
        total += y
        count += 1
        results.append([i, y])

    avg = None 
    if total > 0 and count > 0:
        avg = round(total / count, 2)
  
    return jsonify({"limit": avg, "results": results}) 


def run_server():
    app.run(host="0.0.0.0", port=PORT)


if __name__ == "__main__":
    run_server()


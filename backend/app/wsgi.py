from flask import Flask, jsonify, request
from os import environ
import logging 
import ast
import math


logging.getLogger("werkzeug").disabled = True
app = Flask(__name__)
PORT = environ.get("MATH_BACKEND_PORT", 3000)


ALLOWED_FUNCTIONS = {
    "abs": abs,
    "sqrt": math.sqrt,
    "sin": math.sin,
    "cos": math.cos,
    "tan": math.tan,
    "log": math.log,
    "exp": math.exp,
}

ALLOWED_NAMES = {
    "x",
    "pi",
    "e",
}


def parse_expr(expr):
    
    expr = expr.replace("^", "**")

    try:
        tree = ast.parse(expr, mode="eval")
    except SyntaxError:
        return None

    for node in ast.walk(tree):

        if isinstance(node, ast.Name):
            allowed_name = node.id not in ALLOWED_NAMES
            allowed_fn = node.id not in ALLOWED_FUNCTIONS
            if allowed_name and allowed_fn:
                return None

        elif isinstance(node, ast.Call):
            if not isinstance(node.func, ast.Name):
                return None

            if node.func.id not in ALLOWED_FUNCTIONS:
                return None

        elif isinstance(node, (
            ast.Expression,
            ast.Constant,
            ast.BinOp,
            ast.UnaryOp,
            ast.Add,
            ast.Sub,
            ast.Mult,
            ast.Div,
            ast.Pow,
            ast.USub,
            ast.UAdd,
            ast.Mod,
            ast.Call,
            ast.Name,
            ast.Load,
        )):
            pass

        else:
            return None

    return compile(tree, "<expr>", "eval")


def evaluate_expr(parsed_expr, x, y):
    
    return eval(
        parsed_expr,
        {"__builtins__": {}},
        {
            "x": x,
            "y", y,
            "pi": math.pi,
            "e": math.e,
            **ALLOWED_FUNCTIONS,
        }
    )


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

    results = [] 
    total = 0
    count = 0

    for x in inputs:
        
        try:
            # FIXME: Add support for second variable
            y = evaluate_expr(expr, x, None)
            y = round(y, 5)
            total += y
            count += 1
 
        except (ValueError, OverflowError, ZeroDivisionError):
            y = "undefined"

        results.append([x, y])

    avg = None 
    if total > 0 and count > 0:
        avg = round(total / count, 2)
  
    return jsonify({"limit": avg, "results": results}) 


def run_server():
    app.run(host="0.0.0.0", port=PORT)


if __name__ == "__main__":
    run_server()


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
            "y": y,
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

    ROUNDED_TO = 6
    data = request.json

    left_inputs = data.get("leftInputs")
    right_inputs = data.get("rightInputs")
    tolerance = data.get("tolerance")
    limit = data.get("limit")
    expr = parse_expr(data['fn'])

    if (
        left_inputs is None
        or right_inputs is None
        or limit is None
        or expr is None
    ):
        return jsonify({"error": "Invalid input values"}), 400

    left_results = []
    right_results = []
    limit_result = None

    for x in left_inputs:

        try:
            y = round(evaluate_expr(expr, x, None), ROUNDED_TO)

        except (ValueError, OverflowError, ZeroDivisionError):
            y = "undefined"

        left_results.append([x, y])

    for x in right_inputs:

        try:
            y = round(evaluate_expr(expr, x, None), ROUNDED_TO)

        except (ValueError, OverflowError, ZeroDivisionError):
            y = "undefined"

        right_results.append([x, y])

    try:
        limit_result = evaluate_expr(expr, limit, None)
    except (ValueError, OverflowError, ZeroDivisionError):
        limit_result = "undefined" 

    # Get the values closest to the limit.
    left_valid = [
        y for _, y in left_results
        if y != "undefined"
    ]

    right_valid = [
        y for _, y in right_results
        if y != "undefined"
    ]

    if not left_valid or not right_valid:
        return jsonify({
            "limitCalc": limit_result,
            "status": "undefined",
            "leftResults": left_results,
            "rightResults": right_results
        })

    left_estimate = left_valid[-1]
    right_estimate = right_valid[0]

    difference = abs(left_estimate - right_estimate)

    # Converging or diverging
    if difference <= tolerance:
        estimate = round((left_estimate + right_estimate) / 2, ROUNDED_TO)
        status = "Converging"
    else:
        estimate = None
        status = "Does not converge"

    response_data = {
        "limitCalc": limit_result,
        "status": status,
        "estimate": estimate,
        "tolerance": tolerance, 
        "leftEstimate": left_estimate,
        "rightEstimate": right_estimate,
        "difference": round(difference, ROUNDED_TO),
        "leftResults": left_results,
        "rightResults": right_results
    }

    return jsonify(response_data)


def run_server():
    app.run(host="0.0.0.0", port=PORT)


if __name__ == "__main__":
    run_server()


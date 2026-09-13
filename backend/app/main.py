import wsgi
from os import environ


def testing():
    pass


if __name__ == "__main__":
    if environ.get("MATH_TEST_MODE") == "1":
        testing()
    else:
        wsgi.run_server()


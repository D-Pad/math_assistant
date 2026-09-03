# ---------- BASE IMAGE ----------
FROM python:3.12-slim

# ---------- SYSTEM DEPENDENCIES ----------
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    libssl-dev \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# ---------- COPY APP & INSTALL PYTHON REQUIREMENTS ----------
COPY ./app /app
COPY ./setup_files/start.sh /start.sh

RUN pip install --upgrade pip setuptools wheel
RUN pip install -r /app/requirements.txt

# ---------- ENTRYPOINT ----------
ENTRYPOINT ["/start.sh"]


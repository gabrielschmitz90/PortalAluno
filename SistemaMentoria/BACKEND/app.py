from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text


app = Flask(__name__)

# --- Configurações do banco de dados --- #


USUARIO = 'root'
SENHA = 'Schmitz100@'
HOST = 'localhost'
PORTA = '3306'
BANCO = 'mentoria'
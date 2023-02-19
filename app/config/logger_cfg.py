import sys
import logging
from pathlib import Path
from logging.handlers import RotatingFileHandler
from flask import request

from .base import settings


class RequestFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        record.url = request.url
        record.remote_addr = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
        return super(RequestFormatter, self).format(record=record)


def console_logger():
    console_handler = logging.StreamHandler(sys.stderr)
    console_format = RequestFormatter(
        fmt='[%(remote_addr)s][%(asctime)s.%(msecs)03d][%(pathname)s:%(lineno)d][%(levelname)s] - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    console_handler.setFormatter(console_format)
    console_handler.setLevel(logging.DEBUG)
    return console_handler


def file_logger():
    log_path = settings.project_path.joinpath('app/logs/flask.log')
    log_path.parent.mkdir(parents=True, exist_ok=True)
    file_handler = RotatingFileHandler(log_path, maxBytes=1 * 10 ** 6, backupCount=10, encoding='UTF-8', delay=False)
    file_format = RequestFormatter(
        fmt='[%(remote_addr)s][%(asctime)s.%(msecs)03d][%(pathname)s:%(lineno)d][%(levelname)s] - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    file_handler.setFormatter(file_format)
    file_handler.setLevel(logging.DEBUG)
    return file_handler

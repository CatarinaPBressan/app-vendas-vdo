import uuid
import base64
from datetime import datetime


def datetime_now():
    return datetime.now()


def create_eid():
    return base64.b32encode(uuid.uuid4().bytes).decode()[:26]

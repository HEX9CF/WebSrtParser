import time

class Subtitle:
    def __init__(self, index=-1, start_time=time.time(), end_time=time.time(), content=""):
        self.index = index
        self.start_time = start_time
        self.end_time = end_time
        self.content = content

import os
import time

saved_path = 'saved'

def save_srt(subtitles):
    if not os.path.exists(saved_path):
        os.makedirs(saved_path)

    timestamp = str(int(time.time()))
    file_name = f"{timestamp}.srt"
    file_path = os.path.join(saved_path, file_name)
    with open(file_path, 'w', encoding='utf-8') as file:
        for subtitles in subtitles:
            file.write(f"{subtitles.index}\n")
            file.write(f"{subtitles.start_time} --> {subtitles.end_time}\n")
            file.write(f"{subtitles.content}\n\n")

# FFMPEG

- Convert Videos, Images, Audios

```s
# Crop
ffmpeg -i input.webm -filter:v crop="960:550:0:120" output.mp4

# Resize
ffmpeg -i input.mp4 -vf scale=480:-1 output.mp4 # -1 means keep the aspect ration

# Cut by time
ffmpeg -ss 00:01:12.000 -i output.mp4 -t 11 -c copy out.mp4
ffmpeg -ss 00:01:12.000 -i output.mp4 -to  00:01:28.000 -c copy out.mp4

# Resize & change fps
ffmpeg -i base_file.mp4 -vf scale=320:-1 -r 10 output.gif # frame rate 10
```

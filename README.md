
<h1><img src="src/icons/icon.png" align="right" width="120px">
OBS VLC - Runtime Overlay</h1>



**OBS VLC - Runtime Overlay** is a simple Utility Tool for **OBS** that displays **VLC** media running time on the screen by attaching a **`Text Source`**, which also supports additional formatting features that update in real-time upon modification.

### 🚀 Quickstart
<a href="#vlc-configuration">1. VLC Configuration</a>

<a href="#obs-configuration">2. OBS Configuration</a>

<a href="#-filters">3. Filters</a>

<a href="#-formatting">4. Formatting</a>

<h3 style="display: inline;">
<img src="src/icons/vlc.png" width="35px" style="display: inline; vertical-align: middle; padding-right: 20px; padding-bottom: 5px">VLC Configuration
</h3>
<hr>

- #### Go to Preferences in VLC
<img src="src/icons/VLC-1.png" width="375px">

- #### Check all on Show settings
<img src="src/icons/VLC-2.png" width="200px">

- #### Go to Main interfaces and check Web
<img src="src/icons/VLC-2.5.png " width="800px">

- #### Set your `Host`, `Password` and `Port` in the fields indicated below
<img src="src/icons/VLC-3.png">

#### Make sure the `host`, `port` and `password` coincides with the `settings.json` file.
<img src="src/icons/auth.png" width="40%">

<br>
<h3 style="display: inline;">
<img src="src/icons/obs.png" width="35px" style="display: inline; vertical-align: middle; padding-right: 20px; padding-bottom: 5px">OBS Configuration
</h3>
<hr>

- #### Add a Text Source and double click it
<img src="src/icons/OBS-Tutorial.png" width="375px">

- #### Check the Read from file box and click Browse
<img src="src/icons/OBS-Tutorial-2.png" width="500px">  

- #### Select the `movie.txt` file in the `logs/` directory.
<img src="src/icons/OBS-Tutorial-5.png" width="500px">
<img src="src/icons/OBS-Tutorial-3.png" width="500px">  
<img src="src/icons/OBS-Tutorial-4.png" width="500px">


## ✨ Filters
Elements within the filter array allows you to remove any unnecessary text.

```
"filters": [
    ".",
    "mp4",
    "BluRay",
    "BrRip",
    "x264",
    "EXTENDED",
    "1080p",
    "2160p",
    ...
]
``` 

## 🔧 Formatting

| Tag                  | Description                                   |
| -------------------- | --------------------------------------------- |
| **`{title}`**        | the title of the current movie                |
| **`{h:m:s}`**        | shows media runtime formatted as **HH:MM:SS** |
| **`{h:m:s-length}`** | shows media length formatted as **HH:MM:SS**  |
| **`{br}`**           | triggers a breakline at current position      |
| **...**              |                                               |


<img src="src/icons/Screenshot_1.png">

# Author
**large BIG snooze**
- Github: [largeBIGsnooze](https://github.com/largeBIGsnooze)
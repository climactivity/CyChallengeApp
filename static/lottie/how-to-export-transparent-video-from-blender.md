Chrome/Firefox/Capacitor auf Android können alle WebM/VP9 mit Alpha-Channel, Animation kann also aus Blender mit ffmpeg Video/Container = WebM/Codec = VP9 exportiert werden 

Safari/Capacitor auf iOS kann kein WebM weil Apple.
Dafür gibt es die möglichkeit ein HEVC Video in ein MP4 Container zu packen. Man findet online, dass MP4 keine Alpha-Channels kann, das ist aber falsch; H.264 kann keine Alpha-Channels H.265/HEVC schon. Aber nicht mit libx265, sondern nur mit Apples Video-Toolbox encoder. 
Dieser kann mit avconvert (auf einem Mac) aufgerufen werden, kann dann aber nur FullHD oder 4k mit Transparenz transkodieren. 
Es gibt ein Tool (https://www.shutterencoder.com/en/) welches diese Einschränkung umgehen kann, was aber in der aktuellen Version broken ist. 
Mit Version === 15.7 (zu finden hier https://www.shutterencoder.com/old%20versions/Mac/) kann man Videos mit Alpha-Channel und arbiträrer Größe transkodieren.
Aber nicht WebMs, welche dass einzige Video-Format mit Alpha-Support ist welches Blender direkt exportieren kann. 
Man muss also aus Blender eine Image-Sequenz exportieren, diese mit  ```ffmpeg -framerate 60 -pattern_type glob -i '*.png' -vcodec qtrle <dateiname>.mov``` in eine QuickTime-Animation mit Alpha-Channel encodieren und kann diese dann mit ShutterCoder zu MP4/H.265 mit Alpha-Channel transkodieren.

wat

# 3D Portfolio - by Isaac Kim


**Github:**
Spiritquazus
https://github.com/spiritquazus
**EdX:**
isaac_297

**City and country:**
Seoul, South-Korea

**Date of video recording:**
9/10/2024


**Video Demo**
<https://www.youtube.com/watch?v=1v40vasohtk&ab_channel=IsaacKim>

#Description:

**Intro**
This project was designed with continuation in mind, past submission to CS50 as final project.
I wanted to make a website that would allow me to host my current and future works whilst also showing some flashy animations. 
I initially wanted to complete it in vanilla JS or React, but given my interest in 3D, decided to make use of the wonderful Three JS framework to make a fully 3D environment.

Three JS is a vanilla JS (and by extension, React through React Three Fiber) framework that "transpiles" the otherwise complicated WebGL environment into something a lot more Javascript-like.
Whilst very complex and full of features, Three JS is so intuitive that it just took me 2 days of learning to get my first render, animation, scene and custom 3D model imported onto a website!



**Workflow**
After drawing up some design ideas on Figma, I wanted to make a rather interactive city scenery that would best represent my "aura" and preferences in as little written explanation as possible.
Having grown up in big cities with a love for night life and night vibes, I decided to go for a highly urban scenery as backdrop. 

It was important to first have models to work with, alongside understanding if they are technically compatible with the Three JS environment and more importantly, with browser environments.
This took me in a tangeant, or should I say, side-journey into exploring Blender, the 3D design tool, that taught me how to make meshes, modify textures, work with animation keyframes, create materials and shaders...etc.

After this sidetracking, I was able to fully optimize and shape 3D models I wanted to add to my scenery.
Now came the process to set everything up. Including model sizes, orientation, positionning, lightning, effects...etc.

Everytime I would bring modifications, the browser would reload. Something perfectly normal and needed to be done to effectively re-render the page right? 
It turned out to be not so effective when working with Three JS, as front-loading times would sometimes extend up to 10 seconds depending on how complex your 3D scene was.

So I decided to make my own GUI within my project that would allow me to modify the positions, rotations, and other features of individual models or lightnings within the scene without having to trigger a reload.

I would essentially give orders to the models directly, record their new values, and automatically copy them to my clipboard. Then when I was satisfied with the final calibrations, I would simply paste these new settings to my code.
I decided to call that framework KONTROLBOX. It is by no means very advanced or even close to be shareable with peers, and something I made for myself to facilitate my website building process.

The last and more complex part of the portfolio was to add interactivity. There are multiple ways to allow a 3D scene to "recognize" mouse or finger actions. 
The easiest one to set up was something called "ray-casting". 
Essentially, an infinitely long ray would be "cast" from the center of the camera, to where your last touch or your mouse cursor was, within the 3d environment. 
this Ray would act as a "collider", as in when it would collide with another object that has the ability to be "detected" by the ray (through your own settings), something would happen just the 
way you would trigger an event listener in vanilla JS.

With this, my portfolio's functionality were complete!
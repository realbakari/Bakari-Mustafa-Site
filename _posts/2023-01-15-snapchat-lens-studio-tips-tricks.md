---
title: Snapchat Lens Studio Tips & Tricks!
date: 2023-01-15 14:00:00 +0000
tags:
- Tips & Tricks
- Lens Studio
description: Whether you're a professional designer or just a hobbyist, Lens Studio
  makes it easy to bring your creative ideas to life.
image: ''

---
Snapchat Lens Studio is a powerful tool that allows users to create interactive 3D lenses for the popular social media platform. Whether you're a professional designer or just a hobbyist, Lens Studio makes it easy to bring your creative ideas to life.

One of the key features of Lens Studio is the [Tween System](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager). This powerful animation tool allows users to animate objects within the lens, adding movement and interactivity to their creations. The Tween System is intuitive and easy to use, making it a great option for both beginners and experienced designers.

* [Adding the Tween Package](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#adding-the-tween-package)
* [Adding Tweens](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#adding-tweens)
* [Tween Types](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#tween-types)
  * [Tween Transform](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#tween-transform)
  * [Tween Screen Transform](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#tweenscreentransform)
  * [Tween Color](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#tween-color)
  * [Tween Alpha](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#tween-alpha)
  * [Tween Billboard (Legacy)](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#tween-billboard-legacy)
  * [Tween Value](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#tween-value)
  * [Tween Chain](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#tween-chain)
* [Scripting Tweens](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#scripting-tweens)
  * [Start Tween](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#start-tween)
  * [Stop Tween](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#stop-tween)
  * [Pause Tween](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#pause-tween)
  * [Resume Tween](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#resume-tween)
  * [Get Generic Tween Value](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#get-generic-tween-value)
  * [Set Start Value](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#set-start-value)
  * [Set End Value](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#set-end-value)
  * [Reset Object](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/tween-manager#reset-object)

Another important feature of Lens Studio is the [UI System](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface). This powerful toolset allows users to add a variety of interactive elements to their lenses, such as color pickers, buttons, and toggles. This makes it easy to add interactive features to your lenses, such as allowing users to change the color of an object or toggle a feature on and off.

* [Using the UI System](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#using-the-ui-system)
  * [Adding UI](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#adding-ui)
  * [Adding Widgets](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#adding-widgets)
  * [**Repositioning and Resizing Widgets**](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#repositioning-and-resizing-widgets)
  * [Modifying Widgets](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#modifyingwidgets)
  * [Adding behaviors to your widgets](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#adding-behaviors-to-your-widgets)
  * [UI Affordance](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#ui-affordance)
  * [Example UI System](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#example-ui-system)
* [Common Scripting Interface](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#common-scripting-interface)
* [Available Widgets](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#available-widgets)
  * [Panel](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#panel)
  * [Button](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#button)
  * [**Color Picker / Slider**](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#color-picker--slider)
  * [**Toggle**](https://docs.snap.com/lens-studio/references/guides/lens-features/adding-interactivity/helper-scripts/user-interface#toggle)

For users who are new to Lens Studio, there are a variety of mini-tutorials available to help guide you through the process of creating lenses. These tutorials cover a wide range of topics, including adding interactivity to lenses, simulating world particles, and animating blendshapes using facial movements. These tutorials are a great way to get started with Lens Studio and learn the basics of creating interactive lenses.

#### **Mini-tutorials**

* [Make Things Change on Tap](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/115020451643-Make-Things-Change-on-Tap)
* [First Person Attached Object (smooth follow)](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360000015666-First-Person-Attached-Object)
* [Simulating World Particles](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360018308143/comments/360000808123)
* [Procedural Mesh Drawing](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/115020420083-Creating-a-Procedural-Mesh-Using-Mesh-Builder)
* [Animating Blendshape using Facial movements](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360042675692-BlendShape-Example)
* [Reveal under touches](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360042741091-How-can-I-make-an-object-appears-only-in-swiped-area-?page=1#community_comment_360005279411)
* [Animated UV Scrolling](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/115020392043-Animated-UV-Scrolling)
* ["From Camera" Reflections](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/115011858426--From-Camera-Reflections)
* [Slider Selector](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360050394251/comments/360008654031)
* [Optimizing 2D Textures Best Practices](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/115020415343-Optimizing-2D-Textures-Best-Practices)
* [Daz3D Export Guide](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360042188791-Daz3D-Export-Guide)
* [Chroma Key Shader / Material](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360000014683-Chroma-Key-Shader-Material)
* [Change the Sky with Sky Segmentation](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360018325303-Change-the-Sky-with-Sky-Segmentation-)

Additionally, the [Lens Studio community](https://community.snap.com/snapar/categories/general) is a great resource for users. The community features a variety of tips and tutorials shared by other users, as well as access to additional resources such as video tutorials. This community feature is a great way to connect with other designers and get inspiration for your own lenses.

* [Basics with Ben](https://www.youtube.com/playlist?list=PL0rDQ-c-_kxeOydIzcYAez1nFs0v7zBoa)
* [Show UI only while Snapping](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360060029351--Tutorial-How-to-Create-Different-Capture-and-Live-Target)
* [Animate using a drawn path](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360057819851-Animation-Tutorial)
* [How to Create Different Capture and Live Target](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360060029351--Tutorial-How-to-Create-Different-Capture-and-Live-Target)
* [Intro to Material Editor](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360060397011--Example-Project-Intro-to-Material-Editor)
* [Several different video tutorials](https://support.lensstudio.snapchat.com/hc/en-us/community/posts/360042584931-Lens-Studio-Tutorials-)
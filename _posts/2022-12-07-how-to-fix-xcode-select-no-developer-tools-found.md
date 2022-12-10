---
title: How to fix Xcode-select no developer tools found
date: 2022-12-07 14:00:00 +0000
tags:
- Mac
- Xcode
description: 'If you''re a Mac user who develops apps using Xcode, you may have encountered
  the error message "Xcode-select: no developer tools found."'
image: ''

---
If you're a Mac user who develops apps using Xcode, you may have encountered the error message "Xcode-select: no developer tools found." This error typically occurs when Xcode can't find the developer tools it needs to build and run your app.

Fortunately, there are a few simple steps you can follow to fix this issue and get your app running again. Here's what you need to do:

1. Open a Terminal window on your Mac. You can do this by searching for "Terminal" in Spotlight, or by going to the Applications folder and opening the Utilities folder.
2. In the Terminal window, run the following command:

       xcode-select --install

This will open a dialog window that asks you if you want to install the developer tools. Click "Install" to begin the installation process.

1. Wait for the installation to complete. This may take a few minutes, depending on your internet connection and the speed of your Mac.
2. Once the installation is complete, try running your app again. It should now be able to find the developer tools it needs and build and run without any errors.

If you continue to have issues, you may need to uninstall and reinstall Xcode. To do this, follow these steps:

1. In the Terminal window, run the following command:

       sudo /Developer/Library/uninstall-devtools --mode=all

This will uninstall all of the developer tools that are installed on your Mac.

1. After the uninstallation is complete, go to the App Store on your Mac and search for Xcode.
2. Click the "Get" button to download and install the latest version of Xcode.
3. Once the installation is complete, try running your app again. It should now be able to build and run without any errors.

if you see the error "Xcode-select: no developer tools found," you can fix it by running the **`xcode-select --install`** command and installing the developer tools. If this doesn't solve the issue, you may need to uninstall and reinstall Xcode. By following these steps, you should be able to get your app running again and avoid any further issues with Xcode.
---
title: 'Troubleshooting "No Such File or Directory" Error with SSH-Keygen'
date: 2023-05-06 14:00:00 +0000
tags:
- SSH-Keygen
- Troubleshooting
description: This guide provides solutions for fixing the "No Such File or Directory" error that can occur when using SSH-Keygen.
image: "/uploads/ttgl-700x450.jpg"

---

If you received an error message while trying to save your key, it's likely because the command was unable to determine your `$HOME` directory. To fix this, specify a file location where you have write access using the ssh-keygen command:

```
ssh-keygen -t rsa -b 4096 -C "email@bakarimustafa.com" -f /path/to/key
```

This will save your private key in `/path/to/key` and the public key in `/path/to/key.pub`. If successful, you'll see a message that your identification and public key have been saved, along with the key's fingerprint and random art image.

To make ssh look for the file at the custom location, use the `-i` flag:

```
ssh -i /path/to/key -vT git@github.com
```

Alternatively, you can add your key to an authentication agent with:

```
ssh-add /path/to/key
```

Once your key is stored by the agent, you can simply authenticate with:

```
ssh -T git@github.com
```

If everything is set up correctly, you should see a message that confirms you've successfully authenticated, and you can go ahead and clone your repository using git clone.

Finally, you can clone your repository with:
```
git clone git@github.com:USER/REPO
```

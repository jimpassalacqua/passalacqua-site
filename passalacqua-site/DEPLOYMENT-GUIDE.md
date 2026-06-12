# DEPLOYMENT GUIDE — passalacqua.net
# =============================================
# How to get your site live on Netlify
# using GitHub and your Squarespace domain
# =============================================


## STEP 1 — UPLOAD FILES TO GITHUB

1. Go to github.com and log in
2. Click the "+" icon top right, select "New repository"
3. Name it: passalacqua-site
4. Set to Public
5. Click "Create repository"
6. On the next screen click "uploading an existing file"
7. Drag your entire passalacqua-site folder contents into the window
   (index.html, css folder, js folder, images folder, IMAGE-GUIDE.md)
8. Scroll down, click "Commit changes"

Your files are now on GitHub.


## STEP 2 — DEPLOY ON NETLIFY

1. Go to netlify.com and log in (you signed up with GitHub so it's connected)
2. Click "Add new site" then "Import an existing project"
3. Click "GitHub"
4. Find and select "passalacqua-site"
5. Leave all settings as default
6. Click "Deploy site"

Netlify will give you a random URL like amazing-fox-123.netlify.app
Your site is live at that URL. Now connect your real domain.


## STEP 3 — CONNECT YOUR DOMAIN

In Netlify:
1. Go to Site Settings > Domain Management
2. Click "Add a domain"
3. Type: passalacqua.net
4. Click Verify and then Add domain

Netlify will show you two nameserver addresses like:
  dns1.p01.nsone.net
  dns2.p01.nsone.net
(yours will be slightly different — copy the exact ones Netlify gives you)


## STEP 4 — UPDATE DNS IN SQUARESPACE

1. Log into Squarespace
2. Go to Domains > passalacqua.net > DNS Settings
3. Look for Nameservers
4. Replace the existing nameservers with the two Netlify gave you
5. Save

DNS changes take 24-48 hours to fully propagate but usually work within an hour.
After that, passalacqua.net will show your new site.


## STEP 5 — ENABLE HTTPS (FREE)

Once your domain is connected in Netlify:
1. Go to Site Settings > Domain Management
2. Scroll to HTTPS
3. Click "Verify DNS configuration" then "Provision certificate"

This gives you the padlock in the browser bar. Free with Netlify.


## UPDATING YOUR SITE LATER

When you want to change something:
1. Edit the files on your computer
2. Go to your passalacqua-site repository on GitHub
3. Navigate to the file you want to update
4. Click the pencil icon to edit, or drag new files in
5. Netlify detects the change and republishes automatically within 1-2 minutes


## ADDING IMAGES

1. Prepare your images per the IMAGE-GUIDE.md specs
2. Go to github.com > passalacqua-site > images folder
3. Navigate to the right subfolder (hero, lucasarts, coppola, ongaro)
4. Click "Add file" > "Upload files"
5. Drag your images in
6. Name them exactly as specified in IMAGE-GUIDE.md
7. Commit — site updates automatically

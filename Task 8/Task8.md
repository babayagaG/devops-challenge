## Task 8

You are required to create a NGINX configuration file with the following requirements.

- Reverse proxy www.example.com/google to https://www.google.com
- Reverse proxy www.example.com/yahoo to https://www.yahoo.com
- Reverse proxy www.example2.com to https://www.github.com
- Serve webpages from `/home/nginx/` directory when users go to https://www.example4.com
- Redirect non-http request from http://www.example4.com to https://www.example4.com
- Rewrite URL from the directory `images` to the directory called `assets`. Example: https://www.example7.com/images/a.jpg to https://www.example7.com/assets/a.jpg

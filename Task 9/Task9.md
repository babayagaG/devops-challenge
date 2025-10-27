## Task 9

You are required to write a BASH script that will query https://www.example7.com 

The BASH script should query every 5 seconds and

- If the BASH script return error for consecutively 5 times then restart the NGINX service. Else, continue query the website every 5 seconds.

- If the BASH script do not return any error then continue to query the website https://www.example7.com every 5 seconds.

By using SYSTEMD, prepare a unit file to make the BASH script to run as a service similar like NGINX service.

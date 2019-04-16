**Market Data Platform**
-

This is Single Page Web Application built by ReactJS.
The application is hosted on nginx server. 
The nginx.conf and Dockerfile can be found under this directory. 

Nginx server proxies the API requests to backend server on port 9000.
A load balancer can easily be configured by duplicating backend servers 
and configuring the reverse proxies.  

The website is served on port 8080. 
The detailed information about how to run the whole app can be found on
README.md of trading service project folder. 


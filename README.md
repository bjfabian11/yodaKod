# yodaKod
Social media-like app developed to showcase code more visually than GitHub.

Followed a blog tutorial with node.js, express, and mongoDB; modified everything extensively to look similar to Instagram.
Used MongoDB Cloud Atlas as my backend with node.js to create a profile store for users
Welcome page has register and login and hashed the passwords with bcryptjs
Added a home page with bootstrap cards for all the users posts. When clicked it opens a post page
When user logins in the auth protected pages show and the user has options to view the feed page, create a post, or view their own profile and posts.
logout button, destroys session and clears cache so they cannot view data bg going back or changing URL
Returns user to welcome page.

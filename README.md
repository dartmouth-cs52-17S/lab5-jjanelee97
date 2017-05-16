# Heroku Server for blog

Jane Lee

Lab 5 - CS52

Set up a Heroku API server for blog at http://janelee-blog.surge.sh/

Hosted at https://janeblog.herokuapp.com/api/posts


https://janeblog.herokuapp.com/api redirects to the surge blog page

* node with babel
* expressjs
* airbnb eslint rules

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)


What worked and what didn't:

I think the main thing that didn't work was the last part in implementing the username to show up on posts.  Username was undefined, but it had to do with req.user.username, rather than req.body.username.  I think another hard part was understanding that one of my errors was having posts that were not associated with an account (from the previous lab), and this was interfering with my sign up accounts but mongodb wasn't telling me why.  
The rest of the authentication process was manageable and I didn't have too many problems.  

# Heroku Commands

```sh
heroku login

heroku apps # list apps
heroku apps:info -a myapp
heroku ps -a myapp

heroku ps:scale web=1

# Create the app
# These commands automatically add the git remote "heroku"
heroku create # app name & URL will be random
heroku create john-my-rails-app # app name & URL will be set this name

heroku open # open the app with browser

heroku run bash -a myapp

# logs
heroku logs
heroku logs --tail

# env var
heroku config # list all the vars
heroku config:set S3_KEY=8N029N81 S3_SECRET=9s83109d3+583493190 # set env var
heroku config:get S3_KEY

```

# Heroku Deploy

```sh
# Seemingly, Heroku recognize the "master" or "main" only as the deployable path.
# You can use arbitry branch name when you connect the Heroku to GitHub.
git push heroku master

```

# Heroku + Rails


```sh
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh 
heroku login # prompted to login on your browser
cd myapp # move to the root of the rails app
heroku create myapp-heroku # create the new heroku app

cd myapp # move to app root
touch Procfile
echo "web: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development}" >> Procfile

# config/environments/production.rb
# change the line below:
# This dynamic compilation will slow the app
config.assets.compile = true

# According to some sources, this is necessary for production env
# This may be better for app performance
rake assets:precompile RAILS_ENV=production

# This will automatically "bundle install" & "yarn install"
# This process fails when the "sqlite3" gem is included (because heroku doesn't support it)
git push heroku master 

heroku config:set S3_KEY=8N029N81 S3_SECRET=9s83109d3+583493190 # set env var
heroku run rails db:migrate
```

# Reduce slug size

[ref website](https://thoughtbot.com/blog/how-to-reduce-a-large-heroku-compiled-slug-size)

```sh
heroku plugins:install heroku-repo 
heroku repo:gc --app your-app-name
heroku repo:purge_cache --app your-app-name 
git push heroku
```
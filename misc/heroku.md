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

# run bash in the Heroku
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

# Change the line @config/environments/production.rb
# This dynamic compilation will slow the app.
config.assets.compile = true
config.time_zone = 'Tokyo'

# According to some sources, this is necessary for production env
# This may be better for app performance
rake assets:precompile RAILS_ENV=production
config.public_file_server.enabled = true # to use static files (such as images)

# This will automatically "bundle install" & "yarn install"
# This process fails when the "sqlite3" gem is included (because heroku doesn't support it)
git push heroku master 

# Config
heroku config:set S3_KEY=8N029N81 S3_SECRET=9s83109d3+583493190 # set env var
heroku config:add TZ=Asia/Tokyo
heroku config:set LANG=ja_JP.UTF-8


# when the DB reset is necessary
heroku pg:reset -a my_app

# deploy
heroku run rails db:migrate
heroku run rails db:seed

```

### Reading the 

```txt
git push heroku master

Enumerating objects: 33, done.
Counting objects: 100% (26/26), done.
Delta compression using up to 8 threads
Compressing objects: 100% (17/17), done.
Writing objects: 100% (17/17), 2.51 KiB | 321.00 KiB/s, done.
Total 17 (delta 12), reused 0 (delta 0)

remote: Compressing source files... done.
remote: Building source:
remote: 
remote: -----> Deleting 1 files matching .slugignore patterns.
remote: -----> Ruby app detected
remote: -----> Installing bundler 2.1.4
remote: -----> Removing BUNDLED WITH version in the Gemfile.lock
remote: -----> Compiling Ruby/Rails
remote: -----> Using Ruby version: ruby-2.7.2
remote: -----> Installing dependencies using bundler 2.1.4

remote:        Running: BUNDLE_WITHOUT='development:test' BUNDLE_PATH=vendor/bundle BUNDLE_BIN=vendor/bundle/bin BUNDLE_DEPLOYMENT=1 bundle install -j4

remote:        The dependency tzinfo-data (>= 0) will be unused by any of the platforms Bundler is installing for. Bundler is installing for ruby but the dependency is only for x86-mingw32, x86-mswin32, x64-mingw32, java. To add those platforms to the bundle, run `bundle lock --add-platform x86-mingw32 x86-mswin32 x64-mingw32 java`.

# 
# Install Gems
#
remote:        Fetching gem metadata from https://rubygems.org/............
remote:        Fetching rake 13.0.1
remote:        Installing rake 13.0.1
remote:        Fetching concurrent-ruby 1.1.7
remote:        Fetching thread_safe 0.3.6
remote:        Fetching minitest 5.14.2
remote:        Fetching ffi 1.13.1
remote:        Installing ffi 1.13.1 with native extensions
# gemのインストールが続く。中略
remote:        Bundle complete! 22 Gemfile dependencies, 68 gems now installed.
remote:        Gems in the groups development and test were not installed.
remote:        Bundled gems are installed into `./vendor/bundle`

remote:        Post-install message from i18n:
remote:        
remote:        HEADS UP! i18n 1.1 changed fallbacks to exclude default locale.
remote:        But that may break your application.
remote:        
remote:        If you are upgrading your Rails application from an older version of Rails:
remote:        
remote:        Please check your Rails app for 'config.i18n.fallbacks = true'.
remote:        If you're using I18n (>= 1.1.0) and Rails (< 5.2.2), this should be
remote:        'config.i18n.fallbacks = [I18n.default_locale]'.
remote:        If not, fallbacks will be broken in your app by I18n 1.1.x.
remote:        
remote:        If you are starting a NEW Rails application, you can ignore this notice.
remote:        
remote:        For more info see:
remote:        https://github.com/svenfuchs/i18n/releases/tag/v1.1.0
remote:        

remote:        Bundle completed (213.41s)
remote:        Cleaning up the bundler cache.


remote: -----> Installing node-v12.16.2-linux-x64
remote: -----> Installing yarn-v1.22.4
remote: -----> Detecting rake tasks

remote: -----> Preparing app for Rails asset pipeline
remote:        Running: rake assets:precompile
remote:        yarn install v1.22.4
remote:        [1/4] Resolving packages...
remote:        [2/4] Fetching packages...
remote:        info fsevents@2.1.3: The platform "linux" is incompatible with this module.
remote:        info "fsevents@2.1.3" is an optional dependency and failed compatibility check. Excluding it from installation.
remote:        info fsevents@1.2.13: The platform "linux" is incompatible with this module.
remote:        info "fsevents@1.2.13" is an optional dependency and failed compatibility check. Excluding it from installation.
remote:        [3/4] Linking dependencies...
remote:        warning " > webpack-dev-server@3.11.0" has unmet peer dependency "webpack@^4.0.0 || ^5.0.0".
remote:        warning "webpack-dev-server > webpack-dev-middleware@3.7.2" has unmet peer dependency "webpack@^4.0.0".
remote:        [4/4] Building fresh packages...
remote:        Done in 27.78s.
remote:        yarn install v1.22.4
remote:        [1/4] Resolving packages...
remote:        [2/4] Fetching packages...
remote:        info fsevents@2.1.3: The platform "linux" is incompatible with this module.
remote:        info "fsevents@2.1.3" is an optional dependency and failed compatibility check. Excluding it from installation.
remote:        info fsevents@1.2.13: The platform "linux" is incompatible with this module.
remote:        info "fsevents@1.2.13" is an optional dependency and failed compatibility check. Excluding it from installation.
remote:        [3/4] Linking dependencies...
remote:        warning " > webpack-dev-server@3.11.0" has unmet peer dependency "webpack@^4.0.0 || ^5.0.0".
remote:        warning "webpack-dev-server > webpack-dev-middleware@3.7.2" has unmet peer dependency "webpack@^4.0.0".
remote:        [4/4] Building fresh packages...
remote:        Done in 5.60s.
remote:        I, [2020-12-18T01:41:59.976457 #1597]  INFO -- : Writing /tmp/build_b0830d4b/public/assets/manifest-b4bf6e57a53c2bdb55b8998cc94cd00883793c1c37c5e5aea3ef6749b4f6d92b.js
remote:        I, [2020-12-18T01:41:59.976862 #1597]  INFO -- : Writing /tmp/build_b0830d4b/public/assets/manifest-b4bf6e57a53c2bdb55b8998cc94cd00883793c1c37c5e5aea3ef6749b4f6d92b.js.gz
remote:        I, [2020-12-18T01:41:59.977155 #1597]  INFO -- : Writing /tmp/build_b0830d4b/public/assets/application-3228b0f1d4ceb84992e8dec0024215e03b767f964980a53f461400d8fdd8aab0.css
remote:        I, [2020-12-18T01:41:59.977329 #1597]  INFO -- : Writing /tmp/build_b0830d4b/public/assets/application-3228b0f1d4ceb84992e8dec0024215e03b767f964980a53f461400d8fdd8aab0.css.gz
remote:        I, [2020-12-18T01:41:59.977564 #1597]  INFO -- : Writing /tmp/build_b0830d4b/public/assets/initial_surveys-5a3f5b98c79c7697cf07c4b4e68c04756c71959e62373fbb11a01b437691c9a1.css
remote:        I, [2020-12-18T01:41:59.977757 #1597]  INFO -- : Writing /tmp/build_b0830d4b/public/assets/initial_surveys-5a3f5b98c79c7697cf07c4b4e68c04756c71959e62373fbb11a01b437691c9a1.css.gz
remote:        I, [2020-12-18T01:41:59.977997 #1597]  INFO -- : Writing /tmp/build_b0830d4b/public/assets/pdfs-04024382391bb910584145d8113cf35ef376b55d125bb4516cebeb14ce788597.css
remote:        I, [2020-12-18T01:41:59.978160 #1597]  INFO -- : Writing /tmp/build_b0830d4b/public/assets/pdfs-04024382391bb910584145d8113cf35ef376b55d125bb4516cebeb14ce788597.css.gz
remote:        Compiling...
remote:        Compiled all packs in /tmp/build_b0830d4b/public/packs
remote:        Hash: 70501af34137c3e63b94
remote:        Version: webpack 4.44.2
remote:        Time: 15811ms
remote:        Built at: 12/18/2020 1:42:17 AM
remote:                                                     Asset       Size  Chunks                                Chunk Names
remote:                    js/application-a581b2b1f82494d29632.js    240 KiB       0  [emitted] [immutable]         application
remote:        js/application-a581b2b1f82494d29632.js.LICENSE.txt   1.94 KiB          [emitted]                     
remote:                 js/application-a581b2b1f82494d29632.js.br   59.5 KiB          [emitted]                     
remote:                 js/application-a581b2b1f82494d29632.js.gz     68 KiB          [emitted]                     
remote:                js/application-a581b2b1f82494d29632.js.map    999 KiB       0  [emitted] [dev]               application
remote:             js/application-a581b2b1f82494d29632.js.map.br    229 KiB          [emitted]                     
remote:             js/application-a581b2b1f82494d29632.js.map.gz    270 KiB          [emitted]              [big]  
remote:                                             manifest.json  364 bytes          [emitted]                     
remote:                                          manifest.json.br  127 bytes          [emitted]                     
remote:                                          manifest.json.gz  142 bytes          [emitted]                     
remote:        Entrypoint application = js/application-a581b2b1f82494d29632.js js/application-a581b2b1f82494d29632.js.map
remote:         [1] (webpack)/buildin/module.js 552 bytes {0} [built]
remote:         [3] ./app/javascript/packs/application.js 778 bytes {0} [built]
remote:         [5] (webpack)/buildin/global.js 905 bytes {0} [built]
remote:         [9] ./app/javascript/channels/index.js 205 bytes {0} [built]
remote:        [10] ./app/javascript/channels sync _channel\.js$ 160 bytes {0} [built]
remote:            + 6 hidden modules
remote:        
remote:        WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
remote:        This can impact web performance.
remote:        Assets: 
remote:          js/application-a581b2b1f82494d29632.js.map.gz (270 KiB)
remote:        
remote:        WARNING in webpack performance recommendations: 
remote:        You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
remote:        For more info visit https://webpack.js.org/guides/code-splitting/
remote:        
remote:        Asset precompilation completed (54.51s)
remote:        Cleaning assets
remote:        Running: rake assets:clean

remote: -----> Detecting rails configuration
remote: 
remote: 
remote: -----> Discovering process types
remote:        Procfile declares types     -> web
remote:        Default types for buildpack -> console, rake
remote: 
remote: -----> Compressing...
remote:        Done: 100.3M
remote: -----> Launching...
remote:        Released v15
remote:        https://my-app.herokuapp.com/ deployed to Heroku
remote: 
remote: Verifying deploy... done.
To https://git.heroku.com/my-app.git
```

# Reduce slug size

## A. Use heroku-repo plugin

- This didn't work for me.
- [ref website](https://thoughtbot.com/blog/how-to-reduce-a-large-heroku-compiled-slug-size)

```sh
heroku plugins:install heroku-repo 
heroku repo:gc --app your-app-name
heroku repo:purge_cache --app your-app-name 
git push heroku
```

## B. Use .slugignore

- This didn't work for me.

## C. Configure buildpack

- Heroku buildpack is responsible for converting the uploaded files into slugs.
- I needed to configure 


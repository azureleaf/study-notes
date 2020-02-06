# Laravel + Vue.js

1. `composer create-project --prefer-dist laravel/laravel my_app`
1. `composer require laravel/ui`
1. `php artisan ui vue --auth`
   - Install Vue & Laravel Auth function
1. `npm install`
1. ~~`npm install vue`~~ 不要？
1. `npm install vue-router`
1. `npm run dev`
1. `touch resources/js/components/MyComponent.vue` and edit it:

   ```javascript
   <template>
     <h1>Home Page</h1>
   </template>
   ```

1. Edit `resources/js/app.js`:
   - Register Vue Component: `Vue.component('my-component', require('./components/MyComponent.vue').default);`
   - Add Vue router: `import VueRouter from 'vue-router';` and `Vue.use(VueRouter);`
1. `touch resources/js/router.js` and edit it:

   ```javascript
   import Router from "vue-router";
   import Home from "./views/Home.vue";

   export default new Router({
     mode: "history",
     routes: [
       {
         path: "/",
         name: "home",
         component: Home
       }
     ]
   });
   ```

1. Add `<router-link>` and `<router-view>` to Blade file
1. `npm run watch`
1. `php artisan serve`

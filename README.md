# FE clone of truetraveller.com homepage with Gulp, PUG, SASS, Vanilla JS and Performance Optimization techniques for faster page load

This is a clone of a homepage that I like the layout of. It's purpose is to practice and sharpen my front-end skills.

## Local Resources Included:

- Normalize CSS for reset CSS on browsers.
- Skeleton CSS for grid layout (optional).

## Gulp Tasks:

On the gulp side there are utilities listed bellow

- compile sass
- live browser reload
- concat css into one file and minify it
- auto prefix css
- concat js into one file and minify it
- minify images
- cache minified images
- send all above into a dist folder + copy fonts
- clean unused files
- ESLint JavaScript code
- critical CSS

## How to use:

1. Clone to your desktop.
2. Run `npm install`.
3. Run `gulp` to generate the project and be able to make changes as needed.
4. Stop the gulp, and run `gulp build` to build your site.
5. Copy the dist directory to your server and you are set.
6. Deploy critical css:
- HTML in dist folder:
  + Remove line <link rel="stylesheet" type="text/css" href="css/criticalCSS.css"> on head
  + Copy all code inside "dist/css/criticalCSS.css" to <style></style> on head

## JS plugin listing to use:

1. Headroom:
http://wicky.nillia.ms/headroom.js/

2. Inview:
https://camwiegert.github.io/in-view/

3. Slider carousel:
https://github.com/glidejs/glide

4. Pikaday datepicker:
https://github.com/dbushell/Pikaday

5. BLazy - for lazy loading images:
https://github.com/dinbror/blazy

6. Moment JS - Parse, Validate and Manipulate dates and times:
https://github.com/moment/moment

7. Gmaps JS - for integration of Google Maps api and functionality
https://hpneo.github.io/gmaps/

## CSS / SASS Styleguide

1. Airbnb:
https://github.com/airbnb/css


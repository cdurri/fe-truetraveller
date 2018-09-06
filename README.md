# FE starter with Gulp, PUG, SASS

This is a Pug and Sass starter project using gulp for task automation.

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
https://github.com/ganlanyuan/tiny-slider

## CSS / SASS Styleguide

1. Airbnb:
https://github.com/airbnb/css


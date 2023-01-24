# Githb repository listing

It is a single page application for github repositories listing. The list of git hub repositories is fetched from an unauthenticated APIs. With the help of basic UI, user will be able to search, sort, order and paginate the search result. User can also interact with application by clicking on repository name which will redirect to original github repository profile.

The project is built upon, React Typescript, with basic css from TailwindCSS and little to none UI component from Antd UI library. This also includes few unit test to check if component are rendered properly.

## To start the project
> It is recommended to use your own access token to use [this api](https://api.github.com), for ease i've included the `.env` file 

clone this repository, and you can run:

### `yarn start`
 
This will open the app in the development in browser automatically \
or you can Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## How to use
Search any repository by name and result with best matched repository name are displayed. Result can be sorted on the basis of `stars` `updated at` `forks` `help wanted issue` in `asc` or `desc` order. Search result includes repository name and short description, author name, number of watchers, stars with well paginated 10, 25 or 50 results per page.  <br>
Detail information of repo can be viewed by clicking the repo name. Repo detail page consist additionl information like open issues and default branch. Redirection to original repo page and author are available. By clicking the repo title and author name, it will redirect to the original repo page and author page respectively.


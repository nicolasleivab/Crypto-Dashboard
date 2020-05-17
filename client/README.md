# Crypto Dashboard

Cryptocurrencies dashboard developed with the MERN stack that fetches updated data using [CoinCap](https://docs.coincap.io/?version=latest) and [CoinGecko](https://www.coingecko.com/api/documentations/v3) public APIs.

- Follow the recent performance of the top performant coins
- Compare the performance of different coins in several visualizations
- Sign up and keep your favorite coins in a watchlist
<br /><br />
<p align="center"><a href="https://crypto-performance.herokuapp.com/">Live</a></p>

## Built With

- [React](https://reactjs.org/)
- [d3js](https://d3js.org/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/cloud/atlas)

## Versioning

- [Git](https://git-scm.com) is used for version control.

## Authors

- **Nicolás Leiva Büchi** - [nicolasleivab](https://github.com/nicolasleivab)

## License

This project is licensed under the GNU General Public License - see the [LICENSE](LICENSE) file for details.

---

#### How to run this code

1. Make sure MongoDB is running on your system or connect to MongoDB Atlas
2. Clone this repository
3. Add config/config.js or default.json with your test values for Stripe API keys and Stripe Connect Client ID
4. Open command line in the cloned folder,
   - To install dependencies, run `npm install`
   - To run the application for development, run `npm run dev`
5. Open [localhost:3000](http://localhost:3000/) in the browser

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

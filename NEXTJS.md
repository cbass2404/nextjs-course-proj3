# NextJS

[Documentation](https://nextjs.org/)

## What is NextJS?

-   The react framework for production
-   Used to build large scale react applications production ready
-   A full stack react framework
-   Solves common problems and makes building React apps easier!
-   Doesn't require as many third party libraries to make an app
-   You still write react code, components, props, state, context etc...
-   lots of built-in features (e.g. routing) that help you solve common problems & clear guidance on how to use those features

## Server Side Rendering

-   prepares the content on the page on the server instead of the client
-   helps search engine crawlers find content on your page to send to searchers
    -   on client side rendering search engine crawlers only see the html skeleton
-   better user experience because there is no flicker
-   automatic page pre-rendering
    -   great for SEO and inital load
-   blends client-side and server-side
    -   fetch data on the server and render finished pages

## KEY FEATURES

-   file-based routing
    -   define pages and routes with files and folders instead of code
    -   less code, less work, highly understandable
    -   lets you go back to a more basic html type routing
    -   supports dynamic routes, slugs etc...
-   fullstack framework
    -   easily add backend server-side code to your next/react apps
    -   stores data, getting data, authentication etc. can be added to your react projects
-   nextjs allows you to decide when to allow server side rendering

## Routing

How File-based Routing Works...

-   /pages

    -   index.js
        -   main starting page "/"
    -   about.js
        -   about page "/about"
    -   /products
        -   index.js
            -   all products page "/products"
        -   [id].js
            -   dynamic route for product detail page "/products/${id}"
        -   [...slug].js
            -   dynamic route for slug parameters

-   index.js files are used as the base file for the folder route

-   nextjs gives a special hook and HOC to give access to routing in a component
    -   useRouter from 'next/router'
        -   for functional components
    -   withRouter from 'next/router'
        -   HOC for class based components

```javascript
import { useRouter } from 'next/router';

const PortfolioProjectPage = () => {
    const router = useRouter();

    // query property gives access to complete data in the url
    // can be used to send a req to a backend server
    // to fetch the piece of data with an id of router.query.projectid
    console.log(router.query);

    return (
        <div>
            <h1>The Portfolio Project Page</h1>
        </div>
    );
};

export default PortfolioProjectPage;
```

### Slug files

```javascript
// filename [...slug].js
import { useRouter } from 'next/router';

const BlogPostsPage = () => {
    const router = useRouter();

    // returns an array of the slug parameter
    // {slug: ['2019', '12']}
    console.log(router.query);

    return (
        <div>
            <h1>The Blog Posts</h1>
        </div>
    );
};

export default BlogPostsPage;
```

### Links

Next has a native Link import from 'next/Link' to navigate within the app, just as with React 'a' tags are only used to navigate away from the application.

```javascript
import Link from 'next/Link';

const HomePage = () => {
    return (
        <div>
            <h1>The Home Page</h1>
            <ul>
                <li>
                    <Link href="/portfolio">Portfolio</Link>
                </li>
            </ul>
        </div>
    );
};

export default HomePage;
```

-   Link has many props to use and improve its basic functionality
    -   replace
        -   makes the routes component replace the current component
    -   href
        -   gives the route to navigate to
    -   lots more

### Dynamic routes

```javascript
import Link from 'next/Link';

const ClientsPage = () => {
    const clients = [
        { id: 'max', name: 'Maximilian' },
        { id: 'manu', name: 'Manuel' },
    ];

    return (
        <div>
            <h1>The Clients Page</h1>
            <ul>
                {clients.map(({ id, name }) => (
                    <li key={id}>
                        <Link
                            href={{
                                pathname: 'clients/[id]',
                                query: { id },
                            }}
                        >
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientsPage;
```

### Programatic Routes

-   This is done through making use of an onClick handler or something equivalent and using the router.push function as below

```javascript
import { useRouter } from 'next/router';

const ClientProjectsPage = () => {
    const router = useRouter();

    console.log(router.query);

    const handleLoadProject = () => {
        router.push({
            pathname: '/clients/[id]/[clientproject]',
            query: { id: 'max', clientproject: 'projecta' },
        });
    };

    return (
        <div>
            <h1>The Projects of a Given Client</h1>
            <button onClick={handleLoadProject}>Load Project A</button>
        </div>
    );
};

export default ClientProjectsPage;
```

### NoMatch route

-   Nextjs makes this easy
    -   in pages route directory create a file called 404.js and design the page accordingly

```javascript
// /pages/404.js
const NotFoundPage = () => {
    return (
        <div>
            <h1>Page not found :(</h1>
        </div>
    );
};

export default NotFoundPage;
```

### Styling with Modules

-   Next and react have a native styling method for css
    -   convention is to name the file ComponentName.module.css
        _EventItem.module.css_
-   Importing it as class or style in your component gives it component specific class names to style those components
-   Same class names in files will not have any effect on other components with the same class name
-   Styling links, you need to add a anchor tag inside the link tag to add a style to it
    _Note: Link tags inheritly add an anchor tag behind the scenes and controls how they work, do not add a href to the anchor tag_

### Icons

-   create an icons folder in components directory
-   import the icon like normal
-   styles can be applied to icons through div/span/etc... tags like normal

### Navigation Bar / \_app.js

-   in components directory create a layout folder
-   create a Layout.js file and MainHeader.js file

-   the Layout component will work as a HOC to pass the Navigation bar to each child component of that file

```javascript
import { Fragment } from 'react';
import MainHeader from './MainHeader';

const Layout = (props) => {
    return (
        <Fragment>
            <MainHeader />
            <main>{props.children}</main>
        </Fragment>
    );
};

export default Layout;
```

-   next create your navbar in your MainHeader.js file as below, customizing for how you need it

```javascript
import Link from 'next/Link';

import classes from './MainHeader.module.css';

const MainHeader = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href="/">NextEvents</Link>
            </div>
            <nav className={classes.navigation}>
                <ul>
                    <li>
                        <Link href="/events">Browse All Events</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;
```

-   finally, in your \_app.js file in the main pages directory, import your Layout.js and wrap your component with it, passing the navigation tool to each child component inside it

```javascript
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />;
        </Layout>
    );
}

export default MyApp;
```

### Filtering in NextJS using a [...slug].js component

-   create your search parameter component

```javascript
import { props } from 'ramda';
import { useRef } from 'react';

import Button from '../ui/Button';

import classes from './EventsSearch.module.css';

const EventsSearch = (props) => {
    const yearInputRef = useRef();
    const monthInputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedYear = yearInputRef.current.value;
        const selectedMonth = monthInputRef.current.value;

        props.onSearch(selectedYear, selectedMonth);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label>
                        Year
                        <select id="year" ref={yearInputRef}>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                        </select>
                    </label>
                </div>
                <div className={classes.control}>
                    <label>
                        Month
                        <select id="month" ref={monthInputRef}>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </label>
                </div>
            </div>
            <Button>Find Events</Button>
        </form>
    );
};

export default EventsSearch;
```

-   import it into the proper spot in your pages folder
    _files that you only need the value of that one time can use the useRef hook as above instead of creating state_

```javascript
import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../dummy-data';
import EventsSearch from '../../components/events/EventsSearch';
import EventList from '../../components/events/EventList';

const AllEventsPage = () => {
    const events = getAllEvents();
    const router = useRouter();

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    };

    return (
        <Fragment>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList events={events} />
        </Fragment>
    );
};

export default AllEventsPage;
```

_the above example is using a programatic routing method to navigate to the parameters passed_

-   use the useRouter hook from next/router to get the parameters searched for in the slug component
    -   specifically use the query path to get the array of slug parameters
-   make sure your data types are right
-   pass in error checking functionality
-   query for the parameters

## Data Fetching

-   The problem with traditional react apps and data fetching

    -   There is no data pre-rendered in the application
    -   There are a few disadvantages:
        -   user has to wait for data to load
        -   there is no data for search engines to look through
        -   if you want search engines to show you in search responses there is nothing to show users in search results

-   How NextJS solves these problems

    -   when a request is made, NextJS sends back a pre-rendered page in html
    -   sends fully rendered and fully populated html documents
    -   can still be interactive by 'hydrating' the page with the necessary javascript once loaded preserving Reacts interactive nature
    -   only affects the initial load of the page then becomes a standard react app again

### Two forms of rendering data

```javascript
import path from 'path';
import fs from 'fs/promises';

const HomePage = ({ products }) => {
    return (
        <ul>
            {products.map(({ id, title }) => (
                <li key={id}>{title}</li>
            ))}
        </ul>
    );
};

export const getStaticProps = async () => {
    // export async function getStaticProps() {
    // cwd === current working directory
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    // fs === filesystem
    const jsonData = await fs.readFile(filePath);
    // JSON.parse === turning json data into javascript data
    const data = JSON.parse(jsonData);

    return {
        props: {
            products: data.products,
        },
    };
};

export default HomePage;
```

-   Static Generation

    -   recommended approach
    -   all pages are generated in advance at build time
    -   pre-generate page with data prepared on the server-side during build time
    -   pages are prepared ahead of time and can be cached by the server/cdn serving the app
    -   can only be used with files inside the pages folder
    -   it is async so returns a promise
    -   can run code that is server side or client side
    -   code inside the getStaticProps function will not be exposed on the client side
    -   only runs the static prop if it exists in that file
    -   getStaticProps must return a props object
    -   gives access to the filesystem library in the client component
    -   incremental static generation lets your static pre-generated page be updated every x seconds
    -   if request is made it generates the last existing page
        -   add the revalidate key with second value in seconds to enable incremental static generation
            _on development server it has no effect_

```javascript
export const getStaticProps = async () => {
    // export async function getStaticProps() {
    // cwd === current working directory
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    // fs === filesystem
    const jsonData = await fs.readFile(filePath);
    // JSON.parse === turning json data into javascript data
    const data = JSON.parse(jsonData);

    // can return a redirect object to another page if nothing is found
    if (!data) {
        return {
            redirect: {
                destination: '/no-data',
            },
        };
    }

    // can set page to show a 404 not found error page if notFound is true
    if (data.products.length === 0) {
        return { notFound: true };
    }

    return {
        props: {
            products: data.products,
        },
        // incremental static generation with seconds as value
        revalidate: 10,
    };
};
```

-   getStaticProps does get a prop called context
-   it can be used to get hold of the complete parent values
-   pre-rendering a page requires the use of context to get values, other methods will happen in the browser and not be pre-rendered

### getStaticPaths

-   pre-rendering dynamic pages will not work statically by default
-   dynamic pages ([id].js etc) don't just need data you also need to know which [id] values will be available
-   multiple concrete [id] page instances (e.g. id = 1, id = 2 etc.) are pre-generated

```javascript
export const getStaticProps = async (context) => {
    const { params } = context;

    const productId = params.pid;

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    const product = data.products.find((product) => product.id === productId);

    return {
        props: {
            loadedProduct: product,
        },
    };
};

export const getStaticPaths = async () => {
    return {
        paths: [
            { params: { pid: 'p1' } },
            { params: { pid: 'p2' } },
            { params: { pid: 'p3' } },
        ],
        fallback: false,
    };
};
```

-   fallback key can help you if you have a LOT of pages to pre-generate
    -   can be set to true and only pre-generate some pages
    -   it tells nextjs to pregenerate the specified page only but allow the generation of other links as well
    -   can lead to issue if you go directly to a non pre-generated address through the url bar (making a fresh request to a post-rendered address)
    -   be prepared to create a fallback component to accomadate the fallback: true
    -   nextjs will load the fallback component and then the actual component when it is ready

```javascript
import { Fragment } from 'react';
import path from 'path';
import fs from 'fs/promises';

const ProductDetailPage = ({ loadedProduct }) => {
    if (!loadedProduct) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
};

export const getStaticProps = async (context) => {
    const { params } = context;

    const productId = params.pid;

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    const product = data.products.find((product) => product.id === productId);

    return {
        props: {
            loadedProduct: product,
        },
    };
};

export const getStaticPaths = async () => {
    return {
        paths: [{ params: { pid: 'p1' } }],
        fallback: true,
    };
};

export default ProductDetailPage;
```

-   fallback with a string value of 'blocking' makes nextJS wait for the page to be generated and negates the need for a fallback component

### getStaticPaths dynamically

```javascript
const getData = async () => {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data;
};

export const getStaticPaths = async () => {
    const data = await getData();

    const ids = data.products.map((product) => product.id);
    const pathsWithParams = ids.map((id) => ({
        params: { pid: id },
    }));

    return {
        paths: pathsWithParams,
        fallback: false,
    };
};
```

### getStaticProps not found pages

-   setting fallback to true, makes it try to load a page that doesn't exist, causing a failure of the app
-   to get around this add in a notFound: true parameter in getStaticProps

```javascript
export const getStaticProps = async (context) => {
    const { params } = context;

    const productId = params.pid;

    const data = await getData();

    const product = data.products.find((product) => product.id === productId);

    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            loadedProduct: product,
        },
    };
};
```

### getServerSideProps

-   gives access to props for dynamic pages and server side rendering
-   do not mix serversideprops and staticprops
    -   they run at different points in time
-   uses all the same props as getStaticProps except the revalidate prop as it inherently gets re-rendered at load time each time it is called
-   context in serverSideProps gives access to the complete request object, unlike in getStaticProps
-   used when you never want an old pre-rendered page, it is always updated
-   used when dynamic data can change constantly

```javascript
const UserProfilePage = (props) => {
    return (
        <div>
            <h1>{props.username}</h1>
        </div>
    );
};

export default UserProfilePage;

export const getServerSideProps = async (context) => {
    // context gives access to everything getStaticProps plus request object and response object
    const { params, req, res } = context;

    return {
        props: { username: 'Max' },
    };
};
```

-   With Dynamic Routing

```javascript
const UserIdPage = (props) => {
    return <h1>{props.id}</h1>;
};

export default UserIdPage;

export const getServerSideProps = async (context) => {
    const { params } = context;

    const userId = params.userId;

    return {
        props: {
            id: 'userid-' + userId,
        },
    };
};
```

### Client-Side Data Fetching

-   Some data doesn't need to be or can't be pre-rendered
    -   data changes with high frequency (e.g. stock data)
    -   highly user-specific data (e.g. last orders in an online shop)
    -   partial data (e.g. data that's only used on a part of an page)
-   Some cases pre-fetching the data for page generation might not work or be required
-   'traditional' client-side data fetching (e.g. useEffect() with fetch() is fine)
-   these pages are still pre-rendered by nextjs, but without the data used in the page in api calls

### useSWR

[documentation](https://swr.vercel.app)

```
$ npm install swr
```

-   stands for stale-while-revalidate
-   takes two arguments, the url and how to use the url (fetcher function)
-   there are many other options you can use with useSWR like auto refetch on re-focus

```javascript
const { data, error } = useSWR(
    'https://nextjs-course-25052-default-rtdb.firebaseio.com/sales.json'
);

useEffect(() => {
    if (data) {
        const transformedSales = [];

        for (const key in data) {
            transformedSales.push({
                id: key,
                username: data[key].username,
                volume: data[key].volume,
            });
        }

        setSales(transformedSales);
    }
}, [data]);

if (error) {
    return <p>Failed to load...</p>;
}

if (!data || !sales) {
    return <p>Loading...</p>;
}

return (
    <ul>
        {sales.map((sale) => (
            <li key={sale.id}>
                {sale.username} - ${sale.volume}
            </li>
        ))}
    </ul>
);
```

### combining pre-rendering and fetch

```javascript
export const getStaticProps = async () => {
    return fetch(
        'https://nextjs-course-25052-default-rtdb.firebaseio.com/sales.json'
    )
        .then((res) => res.json())
        .then((data) => {
            const transformedSales = [];

            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            return { props: { sales: transformedSales }, revalidate: 10 };
        });
};
```

## Optimizing NextJS

-   Adding Meta and <head> tag data
-   re-using components, logic and configurations
-   optimizing images

### Configuring the head content

-   NextJS has a special Head tag used to create a head component for SEO

```javascript
import Head from 'next/head';

import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = ({ featuredEvents }) => {
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta
                    name="description"
                    content="Find a lot of great events to help you progress as a developer"
                />
            </Head>
            <EventList events={featuredEvents} />
        </div>
    );
};

export const getStaticProps = async () => {
    const featuredEvents = await getFeaturedEvents();

    return { props: { featuredEvents }, revalidate: 60 * 30 };
};

export default HomePage;
```

-   you can also inject content dynamically in the head tag from nextjs

```javascript
import { Fragment } from 'react';
import Head from 'next/head';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

const EventDetailPage = ({ event }) => {
    if (!event) {
        return (
            <div className="center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
};

export default EventDetailPage;

export const getStaticProps = async (context) => {
    const eventId = context.params.eventId;

    const event = await getEventById(eventId);

    return {
        props: {
            event,
        },
        revalidate: 30,
    };
};

export const getStaticPaths = async () => {
    const events = await getFeaturedEvents();
    const paths = events.map((event) => ({ params: { eventId: event.id } }));

    return {
        paths,
        fallback: 'blocking',
    };
};
```

-   Setting up reusable head content to avoid copy and pasting

```javascript
const pageHeadData = (
    <Head>
        <title>Filtered Events</title>
        <meta
            name="description"
            content={`All events for ${numMonth}/${numYear}`}
        />
    </Head>
);

if (!loadedEvents) {
    return (
        <Fragment>
            {pageHeadData}
            <p className="center">Loading...</p>;
        </Fragment>
    );
}
```

### working with the \_app.js file and why

-   it is rendered by every page
-   applies dynamically to every child component
-   nextjs automatically merges multiple head contents
-   always applies the merged content furthest down the chain
-   allows for a default head in case you forget to add a custom to the component

```javascript
import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Head>
                <title>Next Events</title>
                <meta name="description" content="NextJS Events" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
```

### Working with the \_document.js and why

-   allows you to customize ALL elements that make up a HTML document
-   it must extend something
-   the following code is the default structure of NextJS document, if you decide to overwrite something to be custom you must recreate the following pattern

```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
```

-   reasons to customize the document:
    -   apply a default lang property
    -   add an extra html element for porting modals or other things outside of the application

```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <div id="overlays" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
```

### Optimizing images for production

[documentation for image component](https://nextjs.org/docs/api-reference/next/image)

-   NextJS uses a Image from 'next/image' component to create multiple versions of an image on the fly
-   then checks the browser and sends the most optimized version of the image that the browser supports
-   images are lazy loaded by default (if image is not seen yet it does not load until it is needed)
-   image tag size only effects the max size of the image being loaded, css files still control the images styling

```javascript
<Image src={`/${image}`} alt={title} width={250} height={160} />
```

## Adding Backend Code with API Routes (Fullstack)

-   what are API routes?
    -   Application Programming Interface
    -   REST apis are the most popular
-   Adding and using API routes
-   Working with Requests and Responses in API routes
-   data is usually transfered in JSON format
-   api files HAVE to be in a folder called api to be treated in a special way
-   when accessing data from an internal api with getstaticprops or other rendering methods, always use the logic inside the render method, fetch/axios are only for external sources of data

```javascript
// /api/feedback
import fs from 'fs';
import path from 'path';

export const buildFeedbackPath = () => {
    return path.join(process.cwd(), 'data', 'feedback.json');
};

export const extractFeedback = (filePath) => {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
};

const handler = (req, res) => {
    if (req.method === 'POST') {
        const { email, feedback } = req.body;

        const newFeedback = {
            id: new Date().toISOString(),
            email,
            feedback,
        };

        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));

        res.status(201).json({ message: 'Success!', feedback: newFeedback });
    } else {
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        res.status(200).json({ data });
    }
};

export default handler;

// /pages/index
import { useRef, useState } from 'react';

function HomePage() {
    const [feedbackItems, setFeedbackItems] = useState([]);

    const emailInput = useRef();
    const feedbackInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = emailInput.current.value;
        const feedback = feedbackInput.current.value;

        const reqBody = { email, feedback };

        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const handleGetFeedback = () => {
        fetch('/api/feedback')
            .then((res) => res.json())
            .then((data) => setFeedbackItems(data.data));
    };

    return (
        <div>
            <h1>The Home Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Your Email Address
                        <input type="email" id="email" ref={emailInput} />
                    </label>
                </div>
                <div>
                    <label>
                        Your Feedback
                        <textarea
                            id="feedback"
                            rows="5"
                            ref={feedbackInput}
                        ></textarea>
                    </label>
                </div>
                <button>Send Feedback</button>
            </form>
            <hr />
            <button onClick={handleGetFeedback}>Load Feedback</button>
            {feedbackItems.map((item) => (
                <li key={item.id}>{item.feedback}</li>
            ))}
        </div>
    );
}

export default HomePage;

// /pages/feedback/index.js
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

const FeedbackPage = (props) => {
    return (
        <ul>
            {props.feedbackItems.map((item) => {
                <li key={item.id}>{item.feedback}</li>;
            })}
        </ul>
    );
};

export const getStaticProps = async () => {
    // do not use fetch to access internal api
    // only for external apis
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data,
        },
    };
};

export default FeedbackPage;
```

### Creating and using Dynamic API Routes

-   done in much the same way as nextjs frontend routing
-   can gain access to parameters through the req object just like in standard nodejs

```javascript
// /api/[feedbackId].js
import { buildFeedbackPath, extractFeedback } from './feedback';

const handler = (req, res) => {
    // req has body/method/query like standard nodejs
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback(filePath);
    const selectedFeedback = feedbackData.find(
        (feedback) => feedback.id === feedbackId
    );
    res.status(200).json({ feedback: selectedFeedback });
};

export default handler;

// /pages/feedback
import { useState, Fragment } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

const FeedbackPage = (props) => {
    const [feedbackData, setFeedbackData] = useState();

    const loadFeedbackHandler = (id) => {
        fetch(`/api/${id}`)
            .then((res) => res.json())
            .then((data) => setFeedbackData(data.feedback))
            .catch((err) => console.error(err));
    };

    return (
        <Fragment>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedbackItems.map((item) => (
                    <li key={item.id}>
                        {item.feedback}
                        <button
                            onClick={loadFeedbackHandler.bind(null, item.id)}
                        >
                            Show Details
                        </button>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
};

export const getStaticProps = async () => {
    // do not use fetch to access internal api
    // only for external apis
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data,
        },
    };
};

export default FeedbackPage;
```

-   alternatively you can use the spread operator on the slug api to become a catch all dynamic api

```
[...feedbackId].js
```

-   nextjs always prioritizes the most specific file over dynamic file names
-   there is some flexibility in structuring your api file structure, exactly the same as regular pages in nextjs

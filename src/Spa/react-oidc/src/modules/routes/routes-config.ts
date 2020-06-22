type Route = {
    text: string;
    url: string;
}

const routesConfig: Route[] = [
    {
        text: 'Home',
        url: '/'
    },
    {
        text: 'Public Page',
        url: '/public'
    },
    {
        text: 'Private Page',
        url: '/private'
    }
];

export { routesConfig };



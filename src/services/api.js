import apiRoute from '@/services/apiRoutes';

function findRouteNameRouter(object) {
    var name = object.name
    var params = object.params !== undefined ? object.params : {}
    var query = object.query !== undefined ? object.query : {}

    const findPath = (routes, currentPath = '') => {
        for (const route of routes) {
            const newPath = currentPath + route.path;

            if (route.name === name) {
                // Replace parameters in the path
                let pathWithParams = newPath

                for (const param in params) {
                    pathWithParams = pathWithParams.replace(`:${param}?`, params[param])
                    pathWithParams = pathWithParams.replace(`:${param}`, params[param])
                }

                // Build the final path with query parameters
                if (Object.keys(query).length > 0) {
                    const queryString = new URLSearchParams(query).toString()
                    
                    return `${pathWithParams}?${queryString}`
                }
  
                return pathWithParams
            }
            
            if (route.children) {
                const foundPath = findPath(route.children, newPath)

                if (foundPath) {
                    return foundPath
                }
            }
        }
  
        return null;
    }

    const BASE_URL = process.env.EXPO_PUBLIC_API_ENDPOINT;
  
    return 'http://' + BASE_URL + findPath(apiRoute)
}

function removeRouteNameRouter(route) {
    // Create a copy of the route object without the 'name' key
    const { name, ...routeWithoutName } = route;
  
    // If the route has children, recursively remove 'name' key from children
    if (routeWithoutName.children) {
        routeWithoutName.children = routeWithoutName.children.map(removeRouteNameRouter);
    }
  
    return routeWithoutName;
}

function routeName(object) {
    return findRouteNameRouter(object);
}

export {
    findRouteNameRouter,
    removeRouteNameRouter,
    routeName
};


import { Movies } from "../pages/Movies"
import { Movie } from "../pages/Movie"

export default {
    root: '$', // boot page 
    routes: [
        {
            path: '$',
            component: Movies,
        },
        {
            path: 'movies',
            component: Movies,
        },
        {
            path: 'movie',
            component: Movie,
            options: {
                preventStorage: true,
                clearHistory: true,
                reuseInstance: false
            }
        },
        {
            path: 'movie/:movieId',
            component: Movie,
            options: {
                preventStorage: true,
                clearHistory: true,
                reuseInstance: false
            }
        }
    ]
}
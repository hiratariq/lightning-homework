import { Lightning, Utils, Router } from "@lightningjs/sdk";
import { getConfiguration, getMovie, getImageUrl, getSimilarMovies } from "../lib/api";
import { MovieItem } from "../components/MovieItem";

export class Movie extends Lightning.Component {
    static _template() {
        return {
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff000000
            },
            Image: {
                x: 960,
                y: 100,
                w: 500,
                h: 750,
                mountX: 0.5,
                pivotY: 0,
                transitions:{ 'scale': { duration: .3 } }
            },
            Title: {
                x: 960,
                y: 750 + 100 + 5,
                w: 500,
                h: 48,
                mountX: 0.5,
                transitions:{ 'y': { duration: .3} },
                text: {
                    textAlign: 'center',
                    fontSize: 32
                }
            },
            MoreInfo: {
                x: 960,
                y: 750 + 100 + 5 + 32 + 20,
                w: 500,
                h: 48,
                mountX: 0.5,
                text: {
                    text: '[ Press enter to view more info]',
                    textAlign: 'center',
                    fontSize: 24
                }
            },
            ReleaseDate: {
                x: 960,
                y: 750 * .5 + 100 + 5 + 32 + 20,
                w: 1000,
                h: 48,
                mountX: 0.5,
                transitions:{ 'alpha': { delay: .3, duration: .3 } },
                alpha: 0,
                text: {
                    textAlign: 'center',
                    fontSize: 24
                }
            },
            PlotOverview: {
                x: 960,
                y: 750 * .5 + 100 + 5 + 32 + 20 + 32 + 10,
                w: 1500,
                h: 200,
                mountX: 0.5,
                transitions:{ 'alpha': { delay: .3, duration: .3 } },
                alpha: 0,
                text: {
                    textAlign: 'center',
                    fontSize: 24
                }
            },
            SimilarMovies: {
                rect: true,
                x: 100,
                y: 750 * .5 + 100 + 5 + 32 + 20 + 32 + 10 + 32 + 20,
                w: 1920-250,
                h: 400,
                clipping: true,
                color: 0xff000000,
                transitions:{ 'alpha': { delay: .3, duration: .3 } },
                alpha: 0,
                MoviesGrid: {
                    w: 1920-250,
                    x: 0,
                    y: 0,
                    flex: {
                        direction: 'row',
                        // wrap: true,
                        padding: 20
                    },
                },
                rtt: true,
                shader: {type: Lightning.shaders.FadeOut, fade: 40}
            }
        }
    }

    async _onActive() {
        this.config = await getConfiguration();
        this.movie = await getMovie(this.movieId);
        this.similar_movies = await getSimilarMovies(this.movieId);

        this.tag('Image').patch({
            src: getImageUrl(this.config.images.base_url, 'w500',  this.movie.poster_path),
        });

        this.tag('Title').patch({
            text: {text: this.movie.title}
        });

        this.tag('ReleaseDate').patch({
            text: {text: 'Release Date: ' + this.movie.release_date}
        });

        this.tag('PlotOverview').patch({
            text: {text: 'Plot Overview: ' + this.movie.overview}
        });

        this.movie_items = this.similar_movies.results.map(m => {
            return {
                type: MovieItem,
                imageW: 185,
                imageH: 265,
                image_url: getImageUrl(this.config.images.base_url, 'w185', m.poster_path),
                title: m.title,
                fontSize: 18,
                outline: false,
                movieId: m.id
            }
        });

        this.tag('MoviesGrid').patch({
            children: this.movie_items
        });
    }

    pageTransition() {
        return 'left'
    }

    _handleBack() {
        Router.navigate('movies');
    }

    _handleEnter() {
        this.tag('MoreInfo').patch({ visible: false });
        this.tag('Image').setSmooth('scale', 0.5);
        this.tag('Title').setSmooth('y', 750 * 0.5 + 100 + 5);
        this.tag('ReleaseDate').setSmooth('alpha', 1);
        this.tag('PlotOverview').setSmooth('alpha', 1);
        this.tag('SimilarMovies').setSmooth('alpha', 1);
    }

    set params(data) {
        this.movieId = data.movieId;
    }
}
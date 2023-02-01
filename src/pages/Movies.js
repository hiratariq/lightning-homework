import { Lightning, Utils, Router } from "@lightningjs/sdk";
import { getConfiguration, getImageUrl, getUpcomingMovies } from "../lib/api";
import { MovieItem } from "../components/MovieItem";

export class Movies extends Lightning.Component {
    static _template() {
        return {
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff222222
            },
            Title: {
                x: 960,
                y: 50,
                mount: 0.5,
                text: {
                    text: 'Upcoming Movies',
                    fontSize: 64
                }
            },
            Movies: {
                rect: true,
                x: 100,
                y: 50+64+3,
                w: 1920-250,
                h: 1080 - (50+64+32)*2,
                clipping: true,
                color: 0xff000000,
                MoviesGrid: {
                    w: 1920-250,
                    x: 0,
                    y: 0,
                    flex: {
                        direction: 'row',
                        wrap: true,
                        padding: 20
                    },
                },
                rtt: true,
                shader: {type: Lightning.shaders.FadeOut, fade: [40,40,80,40]}
            }
        }
    }

    async _init() {
        this.config = await getConfiguration();
        this.movies = await getUpcomingMovies();

        this.movie_items = this.movies.results.map(m => {
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

        this.movie_items[0].outline = true;

        this.tag('MoviesGrid').patch({
            children: this.movie_items
        });
    }

    pageTransition() {
        if (Router.getActiveHash() == 'movie') {
            return 'right';
        }
        return 'fade';
    }

    _handleEnter() {
        Router.navigate('movie', { movieId: this.tag('MoviesGrid').children.find(m => m.outline).movieId });
    }

    _handleUp() {
        let y = this.tag('MoviesGrid').y + 10;
        this.tag('MoviesGrid').patch({
            y: Math.min(0, y)
        });
    }

    _handleDown() {
        let y = this.tag('MoviesGrid').y - 10;

        this.tag('MoviesGrid').patch({
            y: Math.max(-(this.tag('MoviesGrid').finalH - this.tag('Movies').h), y)
        });
    }

    _handleRight() {
        let selectedIndex = this.tag('MoviesGrid').children.findIndex(m => m.outline);
        this.tag('MoviesGrid').children[selectedIndex].outline = false;
        this.tag('MoviesGrid').children[Math.min(selectedIndex + 1,this.movies.results.length - 1)].outline = true;
        
    }

    _handleLeft() {
        let selectedIndex = this.tag('MoviesGrid').children.findIndex(m => m.outline);
        this.tag('MoviesGrid').children[selectedIndex].outline = false;
        this.tag('MoviesGrid').children[Math.max(selectedIndex - 1, 0)].outline = true;
    }
}
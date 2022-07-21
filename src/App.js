import React from 'react';
import 'antd/dist/antd.css';
import { Spin, Alert, Input, Pagination, Tabs } from 'antd';
import debounce from 'lodash.debounce';
import Movie from './components/movie';
import MovieService from './movieservice';
import { GenresProvider } from './components/context';

const { TabPane } = Tabs;
const movieService = new MovieService();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      currentPage: 1,
      totalResults: 0,
      searchLine: '',
      ratedMovies: [],
      currentRatedPage: 1,
      totalRatedResults: 0,
      ratingStorage: [],
      isLoading: false,
      error: false,
      gotInternet: true,
      genresList: [],
    };
  }

  componentDidMount() {
    movieService.createGuestSession();
    movieService.getGenres().then((genres) => {
      this.setState({ genresList: genres });
    });
    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
    this.getInput('terminator');
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'offline') {
      this.setState({ gotInternet: false });
    } else {
      this.setState({ gotInternet: true });
    }
  };

  getInput = (string, page = 1) => {
    this.setState({ isLoading: true, error: false });
    movieService
      .getMovie(string, page)
      .then((data) => {
        this.setState({
          movies: data.results,
          currentPage: page,
          totalResults: data.total_results,
          searchLine: string,
          isLoading: false,
        });
      })
      .catch(this.onError);
  };

  rateMovie = (val, id) => { // eslint-disable-line
    movieService.setRating(val, id);
  };

  showMovies = (movieList) => {
    const { ratingStorage } = this.state;
    if (movieList.length === 0) {
      return <Alert message="No matches" type="info" style={{ width: '100%' }} />;
    }
    return movieList.map((ele) => (
      <Movie
        key={ele.id}
        {...ele}
        rateMovie={this.rateMovie}
        saveRating={this.saveRating}
        savedRating={ratingStorage}
      />
    ));
  };

  getRatedMovies = (page = 1) => {
    this.setState({ isLoading: true, error: false });
    movieService
      .getRated(page)
      .then((data) => {
        this.setState({
          ratedMovies: data.results,
          currentRatedPage: page,
          totalRatedResults: data.total_results,
          isLoading: false,
        });
      })
      .catch(this.onError);
  };

  saveRating = (ratingData) => {
    this.setState((state) => ({
      ratingStorage: [...state.ratingStorage, ratingData],
    }));
  };

  onError = () => {
    this.setState({ error: true, isLoading: false });
  };

  render() {
    const onChangeDebounced = debounce(this.getInput, 800);
    const {
      isLoading,
      error,
      currentPage,
      totalResults,
      currentRatedPage,
      totalRatedResults,
      movies,
      ratedMovies,
      gotInternet,
      searchLine,
      genresList,
    } = this.state;

    const display = (movieList) => {
      if (isLoading) {
        return (
          <div className="spinner">
            <Spin size="large" />
          </div>
        );
      }
      if (error) {
        return <Alert message="Something went wrong" description="Try reloading the page" type="error" />;
      }
      return <div className="movies-container"> {this.showMovies(movieList)} </div>;
    };

    return (
      <div className="content">
        {!gotInternet && <Alert message="Lost internet connection" type="error" style={{ width: '100%' }} />}
        <GenresProvider value={genresList}>
          <Tabs
            centered
            defaultActiveKey="1"
            onChange={(tabKey) => {
              if (tabKey === '2') {
                this.getRatedMovies();
              }
            }}
          >
            <TabPane tab="Search" key="1">
              <div className="input-container">
                <Input
                  placeholder="Type to search..."
                  onChange={(event) => {
                    onChangeDebounced(event.target.value);
                  }}
                />
              </div>
              {display(movies)}
              <Pagination
                showSizeChanger={false}
                defaultPageSize={20}
                hideOnSinglePage
                current={currentPage}
                total={totalResults}
                onChange={(page) => this.getInput(searchLine, page)}
              />
            </TabPane>
            <TabPane tab="Rated" key="2">
              {display(ratedMovies)}
              <Pagination
                showSizeChanger={false}
                defaultPageSize={20}
                hideOnSinglePage
                current={currentRatedPage}
                total={totalRatedResults}
                onChange={(page) => this.getRatedMovies(page)}
              />
            </TabPane>
          </Tabs>
        </GenresProvider>
      </div>
    );
  }
}

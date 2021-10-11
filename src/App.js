import React, {Suspense} from "react";
import Layout from "./components/Layout";
import { Route, Switch } from "react-router";
import Search from "./components/Search/Search";
import Histoy from "./components/History/History";
import Statistics from "./components/Statistics/Statistics";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import SearchResult from "./components/Search/SearchResult";

// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMusicData } from "./store/music-actions";

function App() {

  // const dispatch = useDispatch()

  // const music = useSelector(state => state.music.music)

  // useEffect(()=>{

  //   dispatch(fetchMusicData())

  // }, [dispatch])


  // let musicArr = []

  // for(let key in music[0]){

  //         musicArr.push(
  //             {
  //                 ...music[0][key]
  //             }
  //         )
  // }


  return (

        <Layout>

          <Suspense fallback={<LoadingSpinner/>}>

            <Switch>

              <Route path='/' exact>
                <Search />
              </Route>

              <Route path='/history' exact>
                <Histoy />
              </Route>

              <Route path='/statistics' exact>
                <Statistics />
              </Route>

              <Route path='/search-result' exact>
                <SearchResult />
              </Route>

              <Route path='*'>
                <h1>Page not found!</h1>
              </Route>

            </Switch>

          </Suspense>

        </Layout>


  );
}

export default App;

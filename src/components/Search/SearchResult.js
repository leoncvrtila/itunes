import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchFirebaseData } from "../../store/music-actions";
import { URL, DELETE_URL } from "../../config/api";

import heart from '../../assets/images/heart.svg'
import heartRed from '../../assets/images/heart-red.svg'



const SearchResult = () => {

    const history = useHistory()

    const dispatch = useDispatch()

    const searchResults = useSelector(state => state.music.searchResults)

    const firebaseData = useSelector(state => state.music.firebaseData)

    const [searchResultsState, setSearchResults] = useState([])

    const searchValue = useSelector(state => state.music.searchValue)

    let searchData = []

            
    for (let key in searchResults) {

        searchData.push({
            ...searchResults[key],
            like: false
        })  

    }


     for (let i in searchData) { 

        for (let key in firebaseData) {

            if (firebaseData[key].trackId === searchData[i].trackId) {


                searchData.splice(i, 1, {
                    ...firebaseData[key],
                    like: true,
                    firebaseId: firebaseData[key].firebaseId
                })


            }
    
        }

    }

    useEffect(() => {
    
        setSearchResults(searchData)

    }, [searchResults, firebaseData])

    const backHandler = () => {

        history.push('/')

    }

    const likeSongHandler = (e, song, index) => {

        let newArr = []

        if (song.like) {

            for (let key in searchResultsState) {

                newArr.push({
                    ...searchResultsState[key],
                    like: +key === +index || !searchResultsState[key].like ? false : true
                })

            }

            fetch(DELETE_URL + song.firebaseId + '.json', {
                    method: 'DELETE', 
                    headers: {
                        'Content-Type': 'application/json',
                    }
                    })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data)
                    })
                .catch((error) => {
                    console.error('Error:', error)
                    });

        } else {

            for (let key in searchResultsState) {

                newArr.push({
                    ...searchResultsState[key],
                    like: +key === +index || searchResultsState[key].like ? true : false
                })

            }

            const songData = {
                ...song,
                like: true
            }

            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(songData),
                })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
                dispatch(fetchFirebaseData())
                })
            .catch((error) => {
                console.error('Error:', error)
                });

        }


        setSearchResults(newArr)


    }

    let mapResults = []

    if (searchResultsState.length > 0) {

        mapResults = searchResultsState.map((r, index) => {

            return (

                <tr key={r.trackId + Math.random()}>

                    <td className='ResultIndex'>{index + 1}</td>

                    <td className='ResultImg'>
                        
                        <div onClick={(e) => likeSongHandler(e, r, index)}>  

                            <img src={r.like ? heartRed : heart} />

                        </div>

                    </td>

                    <td className='ResultTitle'>{r.trackName}</td>
                    
                </tr>

            )

        })

    } else {

        mapResults = []

    }

    return (

        <div className='SearchResultsWrapp'>

            <div className='SearchResultsTop'>

                <button onClick={backHandler}>Back</button>

                <h1>You searched for: {searchValue}</h1>

            </div>



            <div className='SearchResults'>

            {
            
                searchResultsState.length > 0 ? 
            

                <table>

                    <thead>

                        <tr>
                            <th>#</th>
                            <th>SAVE</th>
                            <th>SONG</th>
                        </tr>

                    </thead>

                    <tbody>

                        {mapResults}

                    </tbody>

                </table>
            
            
                : <h2>There isn't any song like that.</h2>
            
            }



                

            </div>

        </div>

    )

}

export default SearchResult
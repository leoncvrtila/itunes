import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFirebaseData } from "../../store/music-actions";
import { DELETE_URL } from "../../config/api";
import LoadingSpinner from '../UI/LoadingSpinner'

import heart from '../../assets/images/heart.svg'
import heartRed from '../../assets/images/heart-red.svg'

const Histoy = () => {

    const dispatch = useDispatch()

    const historyData = useSelector(state => state.music.firebaseData)

    useEffect(() => {

        dispatch(fetchFirebaseData())

    }, [])


    const likeSongHandler = (e, song, index) => {

        fetch(DELETE_URL + song.firebaseId + '.json', {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json',
                }
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

    let mapResults = []

    if (historyData.length > 0) {

        mapResults = historyData.map((r, index) => {

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

            <h1>History</h1>

        </div>



        <div className='SearchResults'>

        {
        
            historyData.length > 0 ? 
        

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
        
        
            : <LoadingSpinner />
        
        }



            

        </div>

    </div>

    )

}

export default Histoy
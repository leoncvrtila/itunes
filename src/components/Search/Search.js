import React, { Fragment, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import Video from '../../assets/video/bg.mp4'
import VideoMob from '../../assets/video/mob-bg.mp4'
import { musicActions } from "../../store/music";
import { fetchMusicData, fetchFirebaseData } from "../../store/music-actions";

const innerWidth = window.innerWidth

const Search = () => {

    const refValue = useRef('')

    const dispatch = useDispatch()

    const history = useHistory()

    const enterHandler = (e) => {

        if(e.key === 'Enter') {

            if (refValue.current.value !== '') {
   
                dispatch(musicActions.setSearchValue(refValue.current.value))

                dispatch(fetchMusicData(refValue.current.value))

                dispatch(fetchFirebaseData())
                
                history.push('/search-result')

            }

        }

    }

    const enterAfterClickHandler = (e) => {

        if(e.key === 'Enter') {

            refValue.current.value = ''

        }

    }

    return (

        <Fragment>

            <div className='VideoWrapp'>

                <div className='VideoOverColor'></div>

                <video autoPlay={true} muted={true} loop={true} src={innerWidth < 1080 ? VideoMob : Video} type="video/mp4" />

            </div>

            <div className='Search'>

                <input placeholder='Search' ref={refValue} onKeyDown={(e) => enterHandler(e)} onKeyUp={(e) => enterAfterClickHandler(e)} />

            </div>

        </Fragment>



    )

}

export default Search
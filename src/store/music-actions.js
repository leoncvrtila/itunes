import { musicActions } from "./music"

export const fetchMusicData = (value) => {

    return async dispatch => {

        const fetchData = async () => {

            const response = await fetch('https://itunes.apple.com/search?term=' + value)

            if(!response.ok){
                throw new Error('Could not fetch data!')
            }

            const data = await response.json()

            return data

        }

        try{

           const musicData = await fetchData()

           dispatch(musicActions.setMusic(musicData))

        } catch (error) {



        }
    }
}

export const fetchFirebaseData = () => {

    return async dispatch => {

        const fetchData = async () => {

            const response = await fetch('https://itunes-6585e-default-rtdb.firebaseio.com/history.json')

            if(!response.ok){
                throw new Error('Could not fetch data!')
            }

            const data = await response.json()

            return data

        }

        try{

           const musicData = await fetchData()

           dispatch(musicActions.setFirebaseData(musicData))

        } catch (error) {



        }
    }
}

export const fetchAlbumData = (value) => {

    return async dispatch => {

        const fetchData = async () => {

            const response = await fetch('https://itunes.apple.com/lookup?id=' + value + '&entity=album')

            if(!response.ok){
                throw new Error('Could not fetch data!')
            }

            const data = await response.json()

            return data

        }

        try{

           const musicData = await fetchData()

           dispatch(musicActions.setAlbumData(musicData))

        } catch (error) {


        }
    }
}
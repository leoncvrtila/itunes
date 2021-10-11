import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    music: [], 
    searchValue: '',
    searchResults: [], 
    firebaseData: [], 
    albumData: []
}

const musicSlice = createSlice({
    name: 'music',
    initialState: initialState,
    reducers: {
        setMusic(state, action) {

            let searchArr = []

            for (let key in action.payload.results) {

                if (action.payload.results[key].kind === 'song') {

                    searchArr.push({
                        ...action.payload.results[key]
                    })

                }

            }

            state.searchResults = [...searchArr]

        },
        setSearchValue(state, action){

            state.searchValue = action.payload

        },
        setFirebaseData(state, action){

            let dataArr = []
            
            for (let key in action.payload) {

                dataArr.push({
                    ...action.payload[key],
                    firebaseId: key
                })
            }

            state.firebaseData = [...dataArr]

        },
        setAlbumData(state, action) {

            let dataArr = []
            
            const albums = action.payload.results.slice(1, action.payload.results.length-1)

            dataArr.push({
                    artistName: action.payload.results[0].artistName,
                    albums: [...albums]
            })

            state.albumData = state.albumData.concat(dataArr)

        }
    }
})

export const musicActions = musicSlice.actions

export default musicSlice.reducer
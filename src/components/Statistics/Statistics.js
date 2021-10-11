import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFirebaseData, fetchAlbumData } from "../../store/music-actions";

const Statistics = () => {

    const dispatch = useDispatch()

    const historyData = useSelector(state => state.music.firebaseData)

    const albumData = useSelector(state => state.music.albumData)

    const [artistsData, setArtistsData] = useState([])

    const [checkSetState, setCheckState] = useState(false)

    useEffect(() => {

        dispatch(fetchFirebaseData())

    }, [])


    if (!checkSetState) {

        setTimeout(() => {

            setCheckState(true)

            let historyDataMerged = []

            for (let key in historyData) {

                historyDataMerged.push({
                    artistName: historyData[key].artistName,
                    artistId: historyData[key].artistId,
                    albums: [
                        {
                            collectionName: historyData[key].collectionName,
                            songs: [{trackName: historyData[key].trackName}]
                        }
                    ]
                })
            }

            const mergeData = (data) => {

                const out = []

                for (const entry of data) {

                const existingEntry = out.find(o => o.artistName === entry.artistName)

                const existingEntryAlbum = out.find(o => o.collectionName === entry.collectionName)

                if (existingEntry) { // check if artist is the same

                    if (existingEntryAlbum) { // check if album is the same

                        for (const album of entry.albums) {

                            for (const existingAlbum of existingEntryAlbum.albums) {

                                existingAlbum.songs = existingAlbum.songs.concat(album.songs)

                            }

                        }

                    } else {

                        existingEntry.albums = existingEntry.albums.concat(entry.albums)

                    }

                } else {

                    out.push(entry)

                    }

                }

                return out;

            }

            let data = mergeData(historyDataMerged).slice(0, 5)

            for (let key in data) {
                
                dispatch(fetchAlbumData(data[key].artistId))
                
            }


            setArtistsData([...data])

        }, 1000);

    }

    console.log(albumData)

    const mapArtistsData = albumData.map(artist => {

        return (

            <div key={artist.artistName} className='ArtistTable'>

                <h3>{artist.artistName}</h3>

                <table>

                    <thead>

                        <tr>

                            <th>Album name</th>
                            <th>Number of songs</th>
                            <th>Album price</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            artist.albums.map(album => {

                                return (

                                    <Fragment key={album.collectionName + Math.random()}>
                                        
                                        {
                                            album.trackCount > 1 &&

                                            <tr>

                                                <td>{album.collectionName}</td>

                                                <td>{album.trackCount}</td>

                                                <td>${album.collectionPrice}</td>

                                            </tr>
                                        }

                                    </Fragment>

                                )

                            })
                        }

                    </tbody>

                </table>

            </div>

        )

   })
  



    return (

        <section>

            <h1>Statistics</h1>

            <div>

                {
                    mapArtistsData
                }

            </div>


        </section>

    )

}

export default Statistics
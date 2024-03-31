import { useUser } from "../providers/UserProvider";
import { useEffect, useState } from "react";
import axios from "axios";

export const MusicPlayer = (props) => {

  const { title, thumbnail, audio_url, songId } = props;
  const { getToken } = useUser();
  const [getWatchList, setWatchList] = useState(false);

  useEffect(()=>{
     setWatchList(false);
  },[props])

  const onClickHandler = (songId) => {
    axios.patch('https://academics.newtonschool.co/api/v1/music/favorites/like', { songId: songId }, {
      headers: {
        projectID: 'pn53rgkr4qkm',
        Authorization:`Bearer ${getToken}`
      }
    }).then((result) => {
      console.log(result);
      setWatchList(true);
    }).catch((error) => {
      console.log(error);
    })

  }

  return (<>
    <section className="music-player">
      <img
        src={thumbnail}
        height={"50"}
        width={"50"}
        className="bannerImg"
      />
      <div className="music-title">{title}</div>
      <audio controls src={audio_url} />
      {getToken && !getWatchList && <i onClick={() => onClickHandler(songId)} className="fa-regular fa-heart"></i>}
      {getToken && getWatchList && <i style={{ color: 'white' }} className="fa-solid fa-heart"></i>}
    </section>
  </>
  )


}
export default MusicPlayer;
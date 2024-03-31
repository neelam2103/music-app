import Sidebar from "../component/Sidebar";
import MusicCard from "../component/MusicCard";
import { useState, useEffect } from 'react';
import axios from 'axios';
import MusicPlayer from "../component/MusicPlayer";

function Home() {

  const [getData, setData] = useState([]);
  const [getMusic, setMusic] = useState(null);

  useEffect(() => {
    musicList();
  }, [])

  const musicList = async () => {
    try {
      const response = await axios.get('https://academics.newtonschool.co/api/v1/music/song', {
        headers: {
          projectID: 'pn53rgkr4qkm'

        }
      })
      console.log(response.data.data);
      setData(response.data.data);

    } catch (err) {
      console.log(err);
    }
  }

  const onMusicHandler = (index) => {

    console.log(index);
    let list = getData[index];
    setMusic(list);

  }

  return (<>
    <div className="global-container">
      <div className="left-sidebar">
        <Sidebar />
      </div>
      <div className="right-sidebar">
        <div className="music-container">
          {
            getData.map((obj, index) => {
              return (
                <MusicCard
                  key={index}
                  title={obj.title}
                  thumbnail={obj.thumbnail}
                  artist={obj.artist}
                  id={index}
                  onMusicHandler={onMusicHandler}

                />
              )
            })
          }
        </div>
      </div>
    </div>
    <div>
      {
        getMusic && (<MusicPlayer
          title={getMusic.title}
          thumbnail={getMusic.thumbnail}
          songId={getMusic._id}
          audio_url={getMusic.audio_url}
        />)
      }

    </div>

  </>)
}
export default Home;
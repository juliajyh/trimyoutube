/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import {useState} from 'react'
import formatTime from './../utils/formatTime'
import {BiShuffle, BiChevronDown, BiChevronUp} from 'react-icons/bi'
import {MdRepeatOne, MdRepeat} from 'react-icons/md'

const LOOP_STATUS_MAPPERS = {
  LOOP_VIDEO: 'video',
  LOOP_PLAYLIST: 'playlist',
  PLAY_PLAYLIST: 'off',
}

const Playlistvideos = ({
  videoId,
  videoNumber,
  playlistName,
  playlistVideos,
  loopStatus,
  shuffle,
  onVideoClick,
  onLoopClick,
  onShuffleClick,
}) => {
  const [expand, setExpand] = useState(true)
  const dynamicBorderRadius = expand
    ? {
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
      }
    : {
        borderRadius: '15px',
      }
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        ml: 3,
        p: 0,
        width: '400px',
        border: '1px solid gray',
        borderRadius: '15px',
        '@media (max-width: 79rem)': {
          my: 5,
          mx: 'auto',
          minWidth: '300px',
          maxWidth: '100%',
        },
      }}>
      <div
        sx={{
          bg: 'muted',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 5,
          ...dynamicBorderRadius,
        }}>
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <h3
            sx={{
              variant: 'heading',
              lineHeight: 1,
            }}>
            {playlistName}
          </h3>
          <div
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}>
            {loopStatus === 'LOOP_VIDEO' && (
              <MdRepeatOne
                sx={{fontSize: 5, cursor: 'pointer'}}
                title='Loop Playlist'
                aria-label='Loop Playlist'
                onClick={() =>
                  onLoopClick(LOOP_STATUS_MAPPERS['LOOP_PLAYLIST'])
                }
              />
            )}
            {loopStatus === 'LOOP_PLAYLIST' && (
              <MdRepeat
                sx={{fontSize: 5, cursor: 'pointer'}}
                title='Play Playlist'
                aria-label='Play Playlist'
                onClick={() =>
                  onLoopClick(LOOP_STATUS_MAPPERS['PLAY_PLAYLIST'])
                }
              />
            )}
            {loopStatus === 'PLAY_PLAYLIST' && (
              <MdRepeat
                sx={{
                  fontSize: 5,
                  color: 'rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                }}
                title='Loop Video'
                aria-label='Loop Video'
                onClick={() => onLoopClick(LOOP_STATUS_MAPPERS['LOOP_VIDEO'])}
              />
            )}
            <BiShuffle
              sx={{
                ml: 3,
                fontSize: '28px',
                color: shuffle ? '' : 'rgba(0,0,0,0.5)',
                cursor: 'pointer',
              }}
              title={`${shuffle ? 'Not' : ''} Shuffle Playlist`}
              aria-label={`${shuffle ? 'Not' : ''} Shuffle Playlist`}
              onClick={() => onShuffleClick(!shuffle)}
            />
          </div>
        </div>
        <div sx={{textAlign: 'center'}}>
          <p sx={{mb: 3}}>
            {videoNumber}&nbsp;/&nbsp;{playlistVideos.length}
          </p>
          {expand ? (
            <BiChevronUp
              sx={{fontSize: 5, mt: 1, cursor: 'pointer'}}
              title='Collapse List'
              aria-label='Collapse videos list'
              onClick={() => setExpand(false)}
            />
          ) : (
            <BiChevronDown
              sx={{fontSize: 5, mt: 1, cursor: 'pointer'}}
              title='Expand List'
              aria-label='Expand videos list'
              onClick={() => setExpand(true)}
            />
          )}
        </div>
      </div>
      {expand && (
        <div sx={{height: '600px', overflowY: 'auto'}}>
          {playlistVideos.map(({id, snippet, start, end}, index) => (
            <div
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                my: 1,
                px: 2,
                width: '100%',
                borderRadius: '15px',
                bg: id === videoId ? 'search' : 'background',
                '&:hover': {
                  bg: 'search',
                  cursor: 'pointer',
                },
              }}
              onClick={() =>
                onVideoClick({
                  id,
                  start,
                  end,
                  loopValue: LOOP_STATUS_MAPPERS[loopStatus],
                })
              }
              key={`${id}-${index}`}>
              <img
                src={snippet.thumbnails.medium.url}
                alt={snippet.title}
                title={snippet.title}
                sx={{
                  width: '150px',
                  height: '120px',
                }}
                className='video-list-thumbnail'
              />
              <div
                sx={{
                  p: 2,
                  lineHeight: 1.25,
                  fontSize: [0, 1],
                  color: 'gray',
                }}>
                <p
                  sx={{
                    variant: 'medium',
                  }}>
                  {snippet.title}
                </p>
                <p>{snippet.channelTitle}</p>
                <p sx={{color: 'text'}}>
                  Start:{' '}
                  <span sx={{color: 'secondary'}}>
                    {formatTime(start, 'Both')}
                  </span>
                  &nbsp;&nbsp; End:{' '}
                  <span sx={{color: 'secondary'}}>
                    {formatTime(end, 'Both')}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Playlistvideos

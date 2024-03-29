import React from 'react'

export const ProfileBio = ({currentProfile}) => {
  return (
    <div>
      <div>
      {
        currentProfile?.tags.length !==0 ?(
          <><h4> Tags watched</h4>
          {
            currentProfile?.tags.map((tag)=>(
              <p key={tag}>{tag} </p>
            ))
          }

          </>
        ):(
          <>
          <p> 0 Tags watched</p>
          </>
        )
      }
      </div>
      <div>
        {
          currentProfile?.about ? (
          <>
          <h4>About</h4>
          <p>{currentProfile?.about}</p>
          
          </>):(<>
          <p>No bio</p>
          </>)
        }
      </div>
    </div>
  )
}

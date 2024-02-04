import React from 'react'
import  moment  from 'moment'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'

const DisplayAnswer = ({question,handleShare}) => {
  return (
    <div>
        {
            question.answer.map((ans)=>(
                <div className='display-ans' key={ans._id}>
                    <p>{ans.answerBody}</p>
                    <div className="question-actions-user">
                    <div>
                            <button type='button' onClick={handleShare}>share</button>
                            <button type='button'>Delete</button>
                            </div>
                                <div>
                                    <p>answer {moment(ans.answeredOn).fromNow()}</p>
                                    <Link to={`/User/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                    <Avatar backgroundColor='orange' px='8px' py='5px'> {question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                    <div>
                                                        {question.userPosted}
                                                    </div>

                                    </Link>
                            </div>
                    </div>
                </div>
            ))
        }
     
    </div>
  )
}

export default DisplayAnswer

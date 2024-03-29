import React, {useState} from 'react'
import copy from 'copy-to-clipboard'
import moment from 'moment'
import upvote from '../../assets/sort-up.svg'
import downvote from'../../assets/sort-down.svg'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import './Question.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer';
import {useDispatch, useSelector} from 'react-redux';
import {deleteQuestion, postAnswers, voteQuestion} from '../../actions/question'

const QuestionDetails = () => {
    const { id } = useParams();
    const questionList =useSelector(state =>state.questionsReducer)

  /*   var questionList = [{
        _id:'1',
        upVotes:4,  
        votes:3,
        noOfAnswers:2,
        questionTitle:"What is a function?",
        questionBody:"It meant to be",
        questionTags:['java ','node js','react js','mongo'],
        userPosted:'mano',
        userId:1,
        answer:[{
            answerBody:'Answer',
            usrAnswered :'kumar',
            answeredOn:'jan 2',
            userId:2      
        }],
        time:'jan 1'
      },{
        _id:'2',
        upVotes:4,
        votes:2,
        noOfAnswers:0,
        questionTitle:"What is a function?",
        questionBody:"It meant to be",
        questionTags:['javascript','R','python'],
        userPosted:'mano',
        userId:2,
        answer:[{
          answerBody:'Answer',
          userAnswered :'kumar',
          answeredOn:'jan 2',
          userId:2      
      }],
        time:'jan 1'
      },{
        _id:'3',
        upVotes:4,
        votes:1,
        noOfAnswers:0,
        questionTitle:"What is a function?",
        questionBody:"It meant to be",
        questionTags:['javascript','R','python'],
        userPosted:'mano',
        answer:[{
          answerBody:'Answer',
          userAnswered :'kumar',
          answeredOn:'jan 2',
          userId:2      
      }],
        userId:1,
        time:'jan 1'
      }]; */
     
      const location = useLocation()

      const url ="https://stack-overflow-clone-project-ba3c.onrender.com/"
      const dispatch =useDispatch()
      const Navigate =useNavigate()
      const User = useSelector((state)=>(state.currentUserReducer))
      const [Answer,setAnswer] = useState('')


      const handlePosAns = (e,answerLength) =>{
        e.preventDefault()
        if(User ===null){
            alert('Login or Signup to answer')
            Navigate('/Auth')
        }
        else{
            if(Answer === ''){
                alert('Enter an answer before submitting')
            }
            else{
                dispatch(postAnswers({id , noOfAnswers:answerLength+1,answerBody:Answer,userAnswered: User.result.name,userId: User?.result?._id}))
            }
        }
      }
      
      const handleShare =() =>{
        copy(url+location.pathname)
        alert('Copied url : '+url+location.pathname)
      }

      const handledelete= ()=>{
        dispatch(deleteQuestion(id))
        Navigate('/')
      }
      const handleupvote = ()=>{
        dispatch(voteQuestion(id,'upVote',User?.result?._id))
      }
      const handledownvote = ()=>{
        dispatch(voteQuestion(id,'downVote',User?.result?._id))
      }

  return (
    <div className='question-details-page'>
        
        {
            questionList?.data === null  ?
            <h1>Loading..</h1>:
            <>
                {
                    questionList?.data.filter(question=>question._id === id).map(question=>(
                        <div key= {question._id }> 
                            {
                                console.log(question)
                            }
                            <section className="question-details-container" >
                                <h1>{question.questionTitle}</h1>
                                <div className="question-details-container-2">
                                    <div className="question-votes">
                                        <img src={upvote} className='votes-icon' alt='' width='18px' onClick={handleupvote}/>
                                        <p>{question?.upVote?.length - question?.downVote?.length}</p>
                                        <img src={downvote} className='votes-icon' alt='' width='18px' onClick={handledownvote}/>
                                    </div>
                                    <div style={{width:'100%'}}>
                                        <p className="question-body">{question.questionBody}</p>
                                        <div className="question-details-tags">
                                            {
                                                question.questionTags.map((tag) => (
                                                    <p key={tag}>{tag}</p>
                                                ))
                                            }
                                        </div>
                                        <div className="question-actions-user">
                                        <div>
                                                <button type='button' onClick={handleShare}>share</button>
                                                {
                                                    User?.result?._id === question?.userId && (
                                                        <button type='button' onClick={handledelete}>Delete</button>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <p>asked {moment(question.time).fromNow()}</p>
                                                <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                                    <Avatar backgroundColor='orange' px='8px' py='5px'> {question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                    <div>
                                                        {question.userPosted}
                                                    </div>

                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                question.noOfAnswers !== 0 && (
                                    <section>
                                        <h3>
                                            {question.noOfAnswers} answers
                                        </h3>
                                        <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                    </section>
                                )
                            }
                            <section className='post-ans-container'>
                                <h3>
                                    Your Answer
                                </h3>
                                <form onSubmit={(e)=>{handlePosAns(e,question.answer.length)}}> 
                                    <textarea name=""  cols="30"  rows="10" onChange={e=>setAnswer(e.target.value)}></textarea><br   />
                                    <input type='submit' className='post-ans-btn' value='Post Your Answer' />
                                </form>
                                <p className='bottom'>
                                    Browse other Question tagged 
                                    {
                                        question.questionTags.map((tag)=>(
                                            <Link to='/Tags' key={tag} className='ans-tags'>{tag}</Link>
                                        ))
                                    }
                                    or
                                    <Link to='/AskQuestion' style={{textDecoration:'none',color:"#009dff"}}> ask your own question </Link>
                                </p>
                            </section>

                        </div>
                    ))
                }

            </>
        }
       
    </div>

  )
}

export default QuestionDetails
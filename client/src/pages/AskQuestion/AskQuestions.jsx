import React, {useState} from 'react'
import './AskQuestion.css'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate } from 'react-router-dom'
import {askQuestion} from '../../actions/question'



const AskQuestion = () => {

  const dispatch =useDispatch()
  const navigate =useNavigate()
  const [questionTitle,setquestionTitle] = useState('')
  const [questionBody,setquestionBody] = useState('')
  const [questionTags,setquestionTags] = useState('')

  const User =useSelector((state)=>(state.currentUserReducer))

  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(askQuestion({questionTitle,questionBody,questionTags, userPosted : User.result.name,userId: User?.result?._id},navigate))
  }

  const handleEnter=(e)=>{
    if(e.key === 'Enter'){
      setquestionBody(questionBody+'\n')
    }
  }
  return (
    <div className='ask-question'>
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>Be specific and imagine you're asking a question to another person</p>
              <input type="text"  id='ask-ques-title' onChange={(e)=>{setquestionTitle(e.target.value)}} placeholder='e.g. Is there an R function for finding the index of an element in a vector?' />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>Include all the information someone would need to answer your question</p>
              <textarea type="text"  id='ask-ques-body' onChange={(e)=>{setquestionBody(e.target.value)}}  onKeyPress={handleEnter}/>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input type="text"  id='ask-ques-tags'placeholder='te.g. (xml typescript wordpress)' onChange={(e)=>{setquestionTags(e.target.value.split(' '))}} />
            </label>

          </div>
          <input type='submit' value='Review your question'/>
        </form>
      </div>
    </div>
  )
}

export default AskQuestion

import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {db} from '../firebase.config'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
// import OAuth from '../components/OAuth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'

import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth';

function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  
  const {name, email, password} = formData
  const navigate = useNavigate();
  

  const onSubmit = async (e) => {
    e.preventDefault()

    try{
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
      toast.success('User Created')
    } catch (error) {
      toast.error('Something went wrong, contact support!')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Welcome Back!
          </p>
        </header>

        <form onSubmit={onSubmit}>
        <input type="text" 
            className='nameInput'
            placeholder='name'
            id='name'
            value={name}
            onChange={onChange}
            />
          <input type="email" 
            className='emailInput'
            placeholder='email'
            id='email'
            value={email}
            onChange={onChange}
            />
            <div className="passwordInputDiv">
            <input 
            type={showPassword ? 'text' : 'password'}
            className='passwordInput'
            placeholder='password'
            id='password'
            value={password}
            onChange={onChange}
            />
            <img
            src={visibilityIcon}
            className='showPassword'
            onClick={() => setShowPassword((prevState) => !prevState)}
            />
            </div>
            <Link
            to='/forgot-password'
            className='forgotPasswordLink'
            >
            Forgot password
            </Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon
                fill='#ffffff'
                width='34px'
                />
              </button>
            </div>
        </form>
        
        <OAuth/>

        <Link
        to='/sign-in'
        className='registerLink'
        >Sign In Instead</Link>
      </div>
    </>
  )
}

export default SignUp
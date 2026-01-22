import React from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signupWithEmail, isAuthenticated } from '../utils/auth'

const SignUp = () => {
  const [email,setEmail] = useState('')
  const [showPass,setShowPass] = useState(false)
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/chat'

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate(from, { replace: true })
    }
  }, [from, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (email && password) {
        await signupWithEmail({ email })
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError("Sign up failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#E0F7FA] via-white to-[#F3E5F5] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className='bg-white rounded-2xl shadow-2xl border border-gray-100 p-8'>
          <div className='text-center mb-8'>
            <h3 className='text-3xl text-gray-900 font-bold mb-2'>Welcome Back</h3>
            <p className='text-gray-600'>Sign in to continue</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm mx-7">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-y-1 mt-6'>
              <label htmlFor="email" className='mx-7 text-gray-700 font-medium '>Email Address</label>
              <input 
                id="email"
                type="email"
                placeholder='you@example.com'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className='mx-7 bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent transition-all' 
                required
              />
            </div>

            <div className='mt-3 flex flex-row justify-between mx-7'>
              <label htmlFor='password' className='text-gray-700 font-medium mt-4'>Password</label>
              <a href='#' className='text-[#20B2AA] mt-4 hover:underline text-sm'>Forgot Password?</a>
            </div>

            <div className='mx-7 relative'>
              <input 
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent transition-all' 
                required
                type={showPass ? "text" : "password"} 
              />

              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
              >
                {showPass ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 5C7 5 2.73 8.11 1 12.46c1.73 4.35 6 7.54 11 7.54s9.27-3.19 11-7.54C21.27 8.11 17 5 12 5zm0 12.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 8.5 12 8.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.83 9L15.23 12.39c.04-.2.07-.41.07-.62 0-1.66-1.34-3-3-3-.21 0-.42.02-.62.07zm7.08-2.32c.46.66.87 1.33 1.2 2.02C21.27 8.11 17 5 12 5c-1.3 0-2.57.22-3.79.64l2.25 2.25c.67-.35 1.41-.54 2.19-.54 2.49 0 4.5 2.01 4.5 4.5 0 .78-.19 1.52-.54 2.19l2.97 2.97zM2 4.27l2.28 2.28l.46.46A11.804 11.804 0 0 0 1 12c1.73 4.35 6 7.54 11 7.54c2.04 0 4.05-.45 5.8-1.3l.5.5L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05-.2-.08-.41-.08-.65 0-1.66 1.34-3 3-3 .24 0 .45.03.65.08zm5.31-1.78l2.15 2.15c.05-.22.08-.45.08-.68 0-2.49-2.01-4.5-4.5-4.5-.23 0-.46.03-.68.08z" />
                  </svg>
                )}
              </button>
            </div>

            <div className='mt-4 mx-7'>
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className='text-gray-700 font-medium'>Remember me</label>
            </div>

            <div className='mt-4 mx-7'>
              <button 
                type="submit" 
                className='w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 font-semibold'
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing up...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <div className="my-6 flex items-center gap-4 mx-7">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="space-y-3 px-7 pb-5">
            <button
              type="button"
              disabled
              title="Coming soon"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 text-gray-700 font-medium opacity-60 cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              disabled
              title="Coming soon"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 text-gray-700 font-medium opacity-60 cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#20B2AA] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp

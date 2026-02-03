import React from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginWithEmail, isAuthenticated } from '../utils/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/chat'

  // If already signed in, don't show login screen
  // (navigate in an effect to avoid rendering side-effects)
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
        await loginWithEmail({ email, password })
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError("Login failed. Please try again.")
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
            <p className='text-gray-600'>Sign in to continue to smartlearn</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-y-2 mb-4'>
              <label htmlFor="email" className='text-gray-700 font-medium'>Email Address</label>
              <input
                id="email"
                type="email"
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent transition-all'
                required
              />
            </div>

            <div className='flex flex-col gap-y-2 mb-6'>
              <div className='flex flex-row justify-between items-center'>
                <label htmlFor='password' className='text-gray-700 font-medium'>Password</label>
                <a href='#' className='text-[#20B2AA] hover:underline text-sm'>Forgot Password?</a>
              </div>
              <input
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent transition-all'
                required
                type="password"
              />
            </div>

            <div className='mb-6'>
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className='text-gray-700'>Remember me</label>
            </div>

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
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#20B2AA] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

function Login() {
    const handleLogin = () => {
      console.log('Logging in!');
      // Redirect to the backend login route
      window.location.href = 'http://localhost:3001/auth/login';
    };
  
    return (
      <div>
        <button onClick={handleLogin}>Login with Spotify</button>
      </div>
    );
  }
  
  export default Login;
  
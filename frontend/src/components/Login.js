import { Button, Box } from '@chakra-ui/react';

function Login() {
  const handleLogin = () => {
    console.log('Logging in!');
    // Redirect to the backend login route
    window.location.href = 'http://localhost:3001/auth/login';
  };

  return (
    <Box bg="gray.800" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Button colorScheme="primary" size="lg" onClick={handleLogin}>
        Login with Spotify
      </Button>
    </Box>
  );
}

export default Login;

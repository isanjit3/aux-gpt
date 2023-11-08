// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'gray.800',
        color: 'white',
      },
      // styles for the `button`
      button: {
        colorScheme: 'whiteAlpha',
      },
    },
  },
  colors: {
    // Gren color pallette from Chakra UI site
    primary: {
      50 : '#F0FFF4',
      100: '#C6F6D5',
      200: '#9AE6B4',
      300: '#68D391',
      400: '#48BB78',
      500: '#38A169',
      600: '#2F855A',
      700: '#276749',
      800: '#22543D',
      900: '#1C4532',
    },
  },
});

export default theme;

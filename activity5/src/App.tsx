import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { TodoApp } from './TodoApp';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <TodoApp />
    </ChakraProvider>
  );
}

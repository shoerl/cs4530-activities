import * as React from 'react';
import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AiFillHeart, AiOutlineDelete, AiOutlineHeart } from 'react-icons/ai';
import { networkInterfaces } from 'os';

type TodoItem = {
  title: string;
  id: number;
};

function TodoItemComponent({ item, deleteItem }: { item: TodoItem; deleteItem: () => void }) {
  const [isLiked, setLiked] = useState<boolean>(false);
  let likeButton;
  if (isLiked) {
    likeButton = (
      <IconButton
        aria-label='unlike'
        icon={<AiFillHeart />}
        onClick={() => {
          setLiked(false);
        }}
      />
    );
  } else {
    likeButton = (
      <IconButton aria-label='like' icon={<AiOutlineHeart />} onClick={() => setLiked(true)} />
    );
  }
  return (
    <Text>
      {' '}
      {item.title}
      <Button onClick={deleteItem}>
        <AiOutlineDelete />
      </Button>
      {likeButton}
    </Text>
  );
}
export function TodoApp() {
  const [currentId, setCurrentId] = useState<number>(0);
  const [items, setItems] = useState<TodoItem[]>([{ title: 'Add your first item', id: 0 }]);
  const [newItemText, setNewItemText] = useState<string>('');

  return (
    <VStack>
      <Heading>TODO List with Extensions</Heading>
      <FormControl id='itemDesc' isRequired>
        <FormLabel>TODO item:</FormLabel>
        <Input
          value={newItemText}
          onChange={event => setNewItemText(event.target.value)}
          name='itemDesc'
          placeholder='Put TODO description here'
        />
      </FormControl>
      <Button
        type='submit'
        onClick={() => {
          setItems([...items, {title: newItemText, id: currentId}]);
          setCurrentId(currentId + 1)
        }}>
        Add TODO item
      </Button>
      {items.map(eachItem => (
        <TodoItemComponent
          item={eachItem}
          key={eachItem.id}
          deleteItem={() => {
            setItems(items.filter((item, idx) => item.id !== eachItem.id));
          }}
        />
      ))}
      <Button
        type='button'
        onClick={() => setItems([])}>
        Delete All
      </Button>
    </VStack>
    
  );
}

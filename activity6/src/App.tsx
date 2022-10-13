/* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  ChakraProvider,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  HStack,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  Text,
  SimpleGrid,
  Divider
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import './App.css';
import { addGrade, getAllTranscripts, addStudent } from './lib/client';
import { CourseGrade, Transcript } from './types/transcript';
import { useToast } from '@chakra-ui/react';



function GradeView({ grade }: { grade: CourseGrade}) {
  return (
    <Stat mt={1} mb={1}>
      <SimpleGrid columns={2} spacing={2} width="350px">
      <StatLabel width="140px" display={"flex"} justifyContent={"end"} alignItems={"center"}>{grade.course}: </StatLabel>
      <StatNumber width="100px">
        <Editable
          defaultValue={`${grade.grade}`}
          onSubmit={newValue => {
            grade.grade = Number(newValue);
            console.log(`Want to update grade to ${newValue}`);
          }}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </StatNumber> 
      </SimpleGrid>

    </Stat>
  );
}

function NewStudentView() {
  const [name, setName] = useState<string>("");

  return (
    <Box boxSize='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Heading as='h4' m={2}>
        <FormControl id='name'>
        <Text mb={3}>New Student</Text>
        <Divider m={2}/>
        <FormLabel>Student Name</FormLabel>

        <Input isRequired
          value={name}
          onChange={event => setName(event.target.value)}
          name='course'
          placeholder='John Doe'
        />
        </FormControl>
        <Button
          mt={3}
          type="submit"
          onClick={() => {
            async function addTheStudent() {
              await addStudent(name);
            }
            const id = addTheStudent();
            setName("");
           
          }}
        >Add Student</Button>
      </Heading>
    </Box>
  );
}




function TranscriptView({ transcript }: { transcript: Transcript }) {
  const toast = useToast();
  const [newCourse, setNewCourse] = useState<string>("");
  const [newGrade, setNewGrade] = useState<string>("");
  
  return (
    <Box boxSize='sm' borderWidth='1px' borderRadius='lg' overflow='scroll'>
      <Heading as='h4' m={2}>
        {transcript.student.studentName} #{transcript.student.studentID}
        <Divider m={2}/>
        <VStack>
          {transcript.grades.map((eachGrade, eachGradeIndex) => (
            <GradeView key={eachGradeIndex} grade={eachGrade} />
          ))}
        </VStack>
        <Divider m={2}/>

        <FormControl id='grade'>
        <FormLabel m={1}>Add grade</FormLabel>
        <Input isRequired
          value={newCourse}
          onChange={event => setNewCourse(event.target.value)}
          name='course'
          placeholder='Enter Course Name'
        />
        <Input isRequired
          value={newGrade}
          onChange={event => setNewGrade(event.target.value)}
          name='grade'
          placeholder='Enter Grade Value'
        />
        <Button mt={2}
          type="submit"
          onClick={() => {
            async function addCourseGrade(){
              try {
                await addGrade(transcript.student.studentID, newCourse, parseInt(newGrade));
                toast({
                  title: 'Grade added',
                  description: 'Grade has been added',
                  status: 'success',
                  duration: 4000,
                  isClosable: true
                })
                setNewCourse("");
                setNewGrade("");
                //window.location.reload();
              } catch {
                toast({
                  title: 'Error',
                  description: 'Grade must be a number',
                  status: 'error',
                  duration: 4000,
                  isClosable: true
                })
              }
              
            }
            addCourseGrade();
          }}
        >Submit</Button>
      </FormControl>

      </Heading>
    </Box>

  );
}


function App() {
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [sortBy, setSortBy] = useState<string>('id');
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  async function sort() {
    function compare(a: Transcript, b: Transcript) {
      if (sortOrder === 'desc') {
        const temp = a;
        a = b;
        b = temp;
      }

      switch(sortBy) {
        case 'id':
          return a.student.studentID - b.student.studentID;
          break;
        case 'name':
          return a.student.studentName.localeCompare(b.student.studentName)
          break;
        case 'average':
          // eslint-disable-next-line no-case-declarations
          const averageA = (a.grades.reduce((gradeA, gradeB) => gradeA + gradeB.grade, 0) / a.grades.length);
          // eslint-disable-next-line no-case-declarations
          const averageB = (b.grades.reduce((gradeA, gradeB) => gradeA + gradeB.grade, 0) / b.grades.length);
          return averageA - averageB;
          break;
        default:
          return 0;
      }

    }
    setTranscripts([...transcripts.sort(compare)]);
  }
  
  useEffect(() => {
    async function fetchTranscripts() {
      setTranscripts(await getAllTranscripts());
    }
    fetchTranscripts();
  }, []);


  useEffect(() => { sort() }, [sortBy, sortOrder]);

  return (
    <div className='App'>
      <ChakraProvider>
        <HStack spacing='24px'>
          <span>Sort by:</span>
          <Select
            placeholder='Select a sort order'
            onChange={async option => {
              setSortBy(option.target.value);
              console.log(`Selected sort order ${option.target.value}`);
            }}>
            <option value='id'>Student ID</option>
            <option value='name'>Student name</option>
            <option value='average'>Average Grade</option>
          </Select>
          <Select
            onChange={async option => {
              setSortOrder(option.target.value);
              console.log(`Selected sort order ${option.target.value}`);
            }}>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </Select>
        </HStack>
        <Wrap>
          <NewStudentView/>
          {transcripts.map(eachTranscript => (
            <WrapItem key={eachTranscript.student.studentID}>
              <TranscriptView transcript={eachTranscript} />
            </WrapItem>
          ))}
        </Wrap>
      </ChakraProvider>
    </div>
  );
}

export default App;

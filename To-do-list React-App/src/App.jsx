import Header from './components/Header';
import ToDoContainer from './components/ToDoContainer';

function App() {
  return (
    <>
      <Header />
      <div className='w-[95%] flex flex-col m-auto mt-12 bg-white rounded-md md:w-[80%] lg:w-1/2'>
        <ToDoContainer />
      </div>
    </>
  );
}

export default App;

import Navbar from './components/Navbar';
import Block from './components/Block';
import Form from './components/Form';
import UserServices from './services/UserServices';
import './App.css';

function App() {
  return (
    <div>
      <Navbar/>
      <UserServices/>
      {/* <Block/> 
      <Form/>*/} 
    </div>
  );
}

export default App;

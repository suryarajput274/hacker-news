import React, {Component} from 'react';
import axios from 'axios'; // 18th Implementation:: Step1- install axiom in folder<hackernews> and run command "npm install axios" Step2- import axiom in your App component
//import logo from './logo.svg';
import './App.css';
//import { render } from 'react-dom';

//12th implementation:: API-Fetching Data-Step1
const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100'; // 14th implementation:: Step15- Try to "More" button, fetches a few list
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE= 'page=';
const PARAM_HPP= 'hitsPerPage='; // 14th implementation:: Step15- try to add more composable path constants 

 const largeColumn ={
   width: '40%',
 }
 const midColumn ={
   width: '30%',
 }
 const smallColumn={
   width: '10%',
 }
 /* Already given function */
/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

/* First implement */
/*
class App extends Component{
  render(){
    var karo='Welcome to the React';
    return(
      <div className= "App">
       <h2>{karo}</h2>
      </div> 
    );
  }
}*/

// 2nd Implementation:: Creating a list 
/*const list =[
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]
*/

/* Third implement:: map function*/
/*class App extends Component{
  render(){
    return(
      <div className="App">
        {list.map(function(item){
          return <div>{item.title}</div>;
        })}
      </div>  
    );
  }
}*/

/*Fourth implementation:: item's property*/
/*class App extends Component{
  render(){
    return(
      <div className="App">
        {list.map(function(item){
          return(
            /*By assigning a key attribute*/
  /*          <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              </div> 
          );
          })}
      </div>    
    );
  }
}*/

/*5th Implementation:: Local component state-constructor and super*/
/*class App extends Component{ /*The App component is a subclass of Component, so the extends Component is in the App component declaration */
/*  constructor(props){ /*The constructor is called only once, when the component initializes: */
/*    super(props); /*It sets this.props in your constructor in case you want to access them there. */

/*    this.state = { 
      list:list, /*ES5 */ /*ES6:: this.state={ list, }; */
/*    };
    /*6th implementation:: Unidirectional dataflow :::The 'this' object is your class instance. In order to define the onDismiss() as class method, you have to bind it in the constructor: */
/*    this.onDismiss = this.onDismiss.bind(this);
  }

  /* 6th implementation:: next step 1:: define  onDismiss Functionality*/
/*  onDismiss(id){
   /* 6th implementation:: step 2:: we extract the function and pass it to the filter function: by using arrow function */
/*   const updatedList = this.state.list.filter( item => item.objectID !== id) ;
   /* 6th implementation:: step 3:: Use the setState() class method to update the list in the local component state  */
/*    this.setState({list: updatedList });
  }
  render() {
    return(
      <div className="App"  >
        {this.state.list.map(item =>{
          /*7th implementation:: Event handler */
/*          const onHandleDismiss = () => 
/*          this.onDismiss(item.objectID);  /* 7th implementation:: Step1 message=onClick handler of your button. */
        
/*          return(
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span> 
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>  
       
              <span>
                <button 
                    onClick={onHandleDismiss} /*7th implementation:: Step2 message=onClick handler of your button. */
                   /* onClick = {() => this.onDismiss(item.objectID)} */
/*                    type="button"
                    >
                  Dismiss
                </button>
              </span>
           </div> 
          );     
        }
       )}
      </div>  
    );
  }
}
*/  

/* 8th Implementation:: interactions with forms and events */

// Step7::  define the higher-order function outside of your App component; refer page no. 68
// ES5
/*function isSearched(searchTerm) {
        return function(item) {
          //some condition which returns true or false
          return item.title.toLowerCase().includes(SearchTerm.toLowerCase());
        }
} */
//ES6
/*const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  
  constructor(props){
   super(props);

    this.state = {
      list,
      searchTerm:'', // Step6:: define the initial state for the searchTerm property in the constructor
    }; 


     //Step3:: function bound the component and define the method:  
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
   
  // Step4:: The event has the value of the input field in its target object 
  onSearchChange(event) {
   // Step5:: you can update the local state with a search term using this.setState(). 
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updateList = this.state.list.filter(isNotId);
    this.setState({ list: updateList });
  }

  render() { 
    const { searchTerm, list } = this.state;
  return( // Step1:: we define a form with an input field in JSX:
    <div className="App"> 
                      
          <form>         
            <input type="text"
             value = {searchTerm}
              onChange={this.onSearchChange}  // Step2:: Lets define onChange handler for input field
             />
          </form>
             
             {list.filter(isSearched(searchTerm)).map(item =>
            <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                Dismiss
              </button>
            </span>
            </div>
          )}
    </div>    
  );
 } 
} // Change Line no.197  {this.state.list.map(item =>
  //Change Line no.203 {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => 
*/

// 9th Implementation:: Split Up Components
//const isSearched = searchTerm => item =>  //14th implementation:: Step9- removing 
//  item.title.toLowerCase().includes(searchTerm.toLowerCase()); ////14th implementation:: Step10- removing 

class App extends Component {
  
  constructor(props){
   super(props);

    this.state = {
     // list,
     // searchTerm:'',
     // 12th implementation ::Step2- 'result' and 'searchTerm'
     result: null, //16th Implementation(Client Cache):: Step1- rename the "result" object to "results" in the initial component state
     searchKey: '', // 16th Implementation:: Step2-  define a temporary "searchKey" to store each result
     searchTerm: DEFAULT_QUERY, 
     error: null, //17th implementation(Error Handling):: Step1-
    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this); // //16th implementation:: Step12
   // 12th implementation:: Step3- 'this.setSearchTopStories'::entire data fetch process
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this); // 14th implementation:: Step3:: Add an additional button to trigger the search request explicitly
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this); // 14th Implementation(Client-or Server-side Search) &(15th-Paginated):: Step1- this fetches the result from Hackernews Api 
    this.onDismiss = this.onDismiss.bind(this);
  }
   
  //16th implementation:: Step13-
  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
    }
    
  // 12th implementation:: Step4
  setSearchTopStories(result) {
    //this.setState({ result }); //14th implementation:: Step14- removing and adding new data rather than override it
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]// 16th implementation:: Step4- removing "const oldHits = page !== 0" 
        ? results[searchKey].hits //16th Implementation:: Step5-"? this.state.result.hits"
        : [];
      const updatedHits = [
        ...oldHits,
        ...hits
      ];
    this.setState({
      results:{ 
        ...results,
       [searchKey]: { hits: updatedHits, page }
      } 
    });

  }

  //14th Implementation:: Step2- Declaration of "onSearchSubmit"
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm}); //16th Implementation:: Step2- Retrieve the 
    
    if (this.needsToSearchTopStories(searchTerm)){ //16th implementation:: Step14-
     this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
    
  } 

  //14 implementation:: Step4- Defining "fetchSearchTopStories"
  fetchSearchTopStories(searchTerm, page = 0) { //14th implementation:: Step10- "fetchSearchTopStories()" method take second argument now fallback to 0 page
    //18th implementation:: Step3- removing below 3 lines 
     //fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`) //14th Implementation:: Step11- adding here "&${PARAM_PAGE}${page}"
    //.then(response => response.json())
    //.then(result => this.setSearchTopStories(result))

    //18th implementation:: Step4- adding below 2 lines
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
     .then(result => this.setSearchTopStories(result.data))
     .catch(error => this.setState({error})); //17th implementation:: Step2- adding "this.setState"
  }
//12th implementation:: Step5
  componentDidMount() { //"lifecycle method"
    const { searchTerm } = this.state;

    //fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)  //"defined in:: fetchSearchTopStories"
    //    .then(response => response.json())
    //    .then(result => this.setSearchTopStories(result))
    //    .catch(error => error);
    
    //16th Implementation:: Step3- retrieve the correct result from the map of results
    this.setState({ searchKey: searchTerm })
    //14th implementation:: Step5- using "this.fetch"
     this.fetchSearchTopStories(searchTerm);    
  }
  onSearchChange(event) {
   this.setState({ searchTerm: event.target.value });
  }

  //13th implementation:: ES6 Spread Operators-here we are not able to use Dismiss button  
  onDismiss(id) {
    const { searchKey, results } = this.state; //16th implementation:: Step7
    const { hits, page } = results[searchKey]; //16th implementation:: Step8

    const isNotId = item => item.objectID !== id;
    //const updateList = this.state.list.filter(isNotId); -13th Step1
    //this.setState({ list: updateList }); - 13th Step1
    
    const updatedHits = hits.filter(isNotId); //16th implementation:: Step9- removing "const updatedHits = this.state.result.hits.filter(isNotId);"
    
    this.setState({ //16th implementation:: Step10-adding
      results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
      }
      //16th implementation:: Step11-removing
    /*this.setState({
      //result: Object.assign({}, this.state.result, { hits: updateHits }) //JavaScript ES6, called operator
      result: { ...this.state.result, hits: updatedHits }
     */
    });
  }

  render() { 
   // 12 implementation:: Step6- const{searchTerm, list}- changing into- const{searchTerm, list}
    const {
       searchTerm, 
       results,
       searchKey,
       error // 17th Implementation:: Step4-adding here "error"
       } = this.state;
    const page = (
      results && 
      results[searchKey] &&
      results[searchKey].page
      ) || 0; // 14th implementation:: Step12- "default to page 0"
    const list=(
      results&&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];
    
    //17th Implementation:: Step5-adding here "if condition"
    if (error) {
      return <p>Something went wrong.</p>;
      }
    // if (!result) { return null; } -- in 13th implementation(conditional rendering)::now everything else should be displayed  
    return(
    // Step1:: Creating a seprate Components for search and the items list
    // Step2:: Pass the properties managed in local state and its class methods
    // after implementation in App.css and index.css change in line no. 266 className="App"
    // and add a div tag in line no. 267
  <div className="page"> 
    <div className="interactions">
      <Search 
        value={searchTerm}              //9th Step2 line no. 267 to 268
        onChange={this.onSearchChange}  
        onSubmit = {this.onSearchSubmit} // 14 implementation:: Step6- "pass the onSearchSubmit() method to your Search component"
      >
       Search 
      </Search> 
    </div>
    
    { //17th Implementation:: Step6-adding here "error"
     error
        ? <div className="interactions">
          <p>Something went wrong.</p>
        </div>
          : <Table
              list={list}
              onDismiss={this.onDismiss}
            />
    } 
       
      <Table // 16th implementation:: Step5
        list={list}
        onDismiss={this.onDismiss}
      /*  
      { // 13th Implementation:: step1- express to conditional rendering or AND rendering
        result
          && <Table 
            //12th implementation:: step7- list={list}- changing into- list={result.hits}
            //  list={list}                     //9th Step2 line no. 271 to 273
            list= {result.hits}
            //  pattern={searchTerm} //14th implementation:: Step9- removing "pattern"
            onDismiss={this.onDismiss}
          />
          //: null //13th implementation:: Step1- "when apply to AND rendering then removing it, it will only in conditional rendering"
      }
      */
      />
     <div className="interactions"> 
     <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)} //16th implementation:: Step6- adding "searchKey"
       /*<Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
       //14th Implementation:: Step13- defining the "onClick() handler" which takes the current search term and the next page
       > */
       > 
        More
       </Button> 
     </div>   
  </div> 
  );
 }
} //9th Step2:: End here

// 9th Step3:: Implement the search Component
//class Search extends Component{
//  render(){
    //const {value, onChange} = this.props; message= 11th implementation:: Component Declaration  Step 1
   // function Search(props) {
   //   const {value, onChange, Children } = props; // 11th Step1:: End Here
     
   /*   function Search ({ value, onChange, children})// 11th Step1:: ES6 destructuring
    {
     return(
       <form>
         {children}
         <input 
           type="text"
           value={value}
           onChange={onChange}
          />
       </form>
     );   
   }// Step3:: End here
   */
  
   // 11th Step2:: Search Component Declaration
   // 14th Implementation:: Step7- Introduce a button(submit) in your Search component
   const Search = ({ value, onChange, onSubmit, children}) =>
   <form onSubmit={onSubmit}>
     <input
        type="text"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        {children}
      </button>
   </form>
 

// Step4:: Implement the Table Component
/*class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return(
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          
          <div key = {item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span> 
                   
            <span>
              <button onclick={() => onDismiss (item.objectID)}
              // type="button" ::while implementing button component(10th reusable component)
                >
                Dismiss
              </button> 
            </span>
          </div>  
          )}
      </div>
    );
  }
}*/
// Step4:: end here

//11th Step3:: Table Component Declaration
  const Table =({ list, onDismiss }) => //14th implementation:: Step8- removing "pattern"
  //-after implementing in App.css and index.css then add className="table" in line no.350
  
<div className="table">
      {list.map(item => //14th implementation:: Step7- removing in table  filter functionality-"{list.filter(isSearched(pattern)).map(item =>"
     //-- here also adding className="table-row"
      //---width flexible by using inline style(usually span tag)
      <div key ={item.objectID} className="table-row">
        <span style={ largeColumn }>
          <a href={item.url}> {item.title} </a>
        </span>
        <span style={ midColumn }> {item.author}</span>
        <span style={ smallColumn }>{item.num_comments}</span>
        <span style={ smallColumn }>{item.points}</span>
        <span style= { smallColumn }>
          
          <Button onClick ={() => onDismiss(item.objectID)}
          //-- here also adding className="button-inline"
          className="button-inline"
          >
            Dismiss    
          </Button>
        </span>  
      </div>     
    )}
  </div>

// 10th Implementation:: Reusable Components
/*class Button extends Component {

  render() {
    const {
      onClick,
      className ='',
      children,
    } = this.props;

    return(
      <button
        onClick ={onClick}
        className={className}
        type = "Button"
      >
        {children}
      </button>  
    );
  }
}
*/
// 11th Step4:: Button Component Declaration
  const Button = ({
    onClick,
    className = '',
    children,
  }) =>

    <button
      onClick={onClick}
      className= {className}
      type="button"
      >
        {children}
      </button>
export default App;